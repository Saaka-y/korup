from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class AccountInfoView(APIView):
    
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            student_id = None
            tutor_id = None
            user_id = None
        else:
            return Response({"error": "User not authenticated"}, status=401)


        if  hasattr(user, 'student_profile'):
            student_id = user.student_profile.student_id
        elif hasattr(user, 'tutor_profile'):
            tutor_id = user.tutor_profile.tutor_id
        else:
            user_id = user.id


        user_info = {
            "id": student_id or tutor_id or user_id,  # 学生IDまたは講師ID、どちらもない場合はユーザーID
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        }

        return Response(user_info)
    
