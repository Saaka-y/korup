from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt import exceptions as jwt_exp
from rest_framework import response, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.settings import api_settings as jwt_settings


COOKIE_HTTPONLY = True
COOKIE_SAMESITE = "Lax"
COOKIE_PATH = "/"


def _cookie_secure() -> bool:
    return not settings.DEBUG


def _set_token_cookie(response_obj, key: str, value: str, max_age: int) -> None:
    response_obj.set_cookie(
        key,
        value,
        max_age=max_age,
        httponly=COOKIE_HTTPONLY,
        secure=_cookie_secure(),
        samesite=COOKIE_SAMESITE,
        path=COOKIE_PATH,
    )


def _delete_token_cookie(response_obj, key: str) -> None:
    response_obj.delete_cookie(
        key,
        samesite=COOKIE_SAMESITE,
        path=COOKIE_PATH,
    )


class TokenObtainView(jwt_views.TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = response.Response({}, status=status.HTTP_200_OK)
        access_lifetime = int(jwt_settings.ACCESS_TOKEN_LIFETIME.total_seconds())
        refresh_lifetime = int(jwt_settings.REFRESH_TOKEN_LIFETIME.total_seconds())

        _set_token_cookie(res, "access_token", serializer.validated_data["access"], access_lifetime)
        _set_token_cookie(res, "refresh_token", serializer.validated_data["refresh"], refresh_lifetime)

        return res


class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"detail": "Refresh token not found."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
        except TokenError:
            return Response({"detail": "Refresh token is invalid."}, status=status.HTTP_401_UNAUTHORIZED)

        res = Response({}, status=status.HTTP_200_OK)
        access_lifetime = int(jwt_settings.ACCESS_TOKEN_LIFETIME.total_seconds())
        _set_token_cookie(res, "access_token", str(refresh.access_token), access_lifetime)
        return res



class LogoutView(APIView):
    def post(self, request):
        response = Response(
            {"message": "Logged out"},
            status=status.HTTP_200_OK
        )

        # refresh tokenをブラックリストに入れる
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass

        _delete_token_cookie(response, "access_token")
        _delete_token_cookie(response, "refresh_token")

        return response
