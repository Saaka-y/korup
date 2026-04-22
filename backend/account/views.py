from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class AccountInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        user_info = {
            "username": user.username,
            "role": user.role,
        }

        return Response(user_info)
