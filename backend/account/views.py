from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class AccountInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        student_number = None
        if hasattr(user, "student_profile"):
            student_number = user.student_profile.student_number
        tutor_number = None
        if hasattr(user, "tutor_profile"):
            tutor_number = user.tutor_profile.tutor_number

        user_info = {
            "student_number": student_number,
            "tutor_number": tutor_number,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        }

        return Response(user_info)
