from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Report
from .serializers import ReportSerializer


class LatestReportView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "student" or not hasattr(user, "student_profile"):
            return Response({"error": "Unauthorized"}, status=403)
        report = (
            Report.objects.filter(student=user.student_profile)
            .order_by("-created_at")
            .first()
        )
        if report:
            serializer = ReportSerializer(report)
            return Response(serializer.data)
        else:
            return Response({"error": "Report not found"}, status=404)
