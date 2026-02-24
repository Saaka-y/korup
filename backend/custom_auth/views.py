from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt import exceptions as jwt_exp
from rest_framework import response, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class TokenObtainView(jwt_views.TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = response.Response({}, status=status.HTTP_200_OK)

        res.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 15,
            httponly=True,
            secure=False, # 本番環境ではTrueにする
            samesite="Lax",
        )
        res.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            max_age=60 * 60 * 24 * 30,
            httponly=True,
            secure=False, # 本番環境ではTrueにする
            samesite="Lax",
        )

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

        response.delete_cookie(
            "access_token",
            samesite="Lax",
            )
        response.delete_cookie(
            "refresh_token",
            samesite="Lax",
            )

        return response
