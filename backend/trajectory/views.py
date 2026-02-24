from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Report
from .serializers import ReportSerializer


class LatestGoalView(APIView):

    def get(self, request, id):
        report = Report.objects.filter(student_id=id).order_by("-created_at").first()
        if report:
            data = {
                "goal": report.goal,
                "action_item_1": report.action_item_1,
                "action_item_2": report.action_item_2,
            }

            return Response(data)
        else:
            return Response({"error": "Goal not found"}, status=400)



class LatestReportView(APIView):

    def get(self, request, id):
        report = Report.objects.filter(student_id=id).order_by("-created_at").first()

        if report:
            serializer = ReportSerializer(report)
            return Response(serializer.data)
        else:
            return Response({"error": "Report not found"}, status=404)
