
from rest_framework.views import APIView
from rest_framework.response import Response

class AccountInfoView(APIView):
    
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            user_id = user.id
            student_id = None
            if hasattr(user, 'student_profile'):
                student_id = user.student_profile.id
            tutor_id = None
            if hasattr(user, 'tutor_profile'):
                tutor_id = user.tutor_profile.id
        else:
            return Response({"error": "User not authenticated"}, status=401)

        user_info = {
            "id": user_id,  
            "student_id": student_id,
            "tutor_id": tutor_id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        }

        return Response(user_info)
    
