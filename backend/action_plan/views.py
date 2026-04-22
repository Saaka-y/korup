from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ActionPlan, Milestone, Action

# Create your views here.

class ActionPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "student" or not hasattr(user, "student_profile"):
            return Response({"error": "Unauthorized"}, status=403)
        action_plan = ActionPlan.objects.filter(student=user.student_profile).first()
        if not action_plan:
            return Response({"error": "Action plan not found"}, status=404)

        milestones = Milestone.objects.filter(action_plan=action_plan).order_by("order")
        milestones_data = []
        for milestone in milestones:
            actions = Action.objects.filter(milestone=milestone)
            actions_data = [
                {"content": action.content, "is_important": action.is_important}
                for action in actions
            ]
            milestones_data.append(
                {
                    "label": milestone.label,
                    "due_date": milestone.due_date,
                    "goal_description": milestone.goal_description,
                    "self_study_note": milestone.self_study_note,
                    "advice": milestone.get_advice_display(),
                    "actions": actions_data,
                }
            )

        final_actions = Action.objects.filter(action_plan=action_plan, milestone__isnull=True)
        final_actions_data = [
            {"content": action.content, "is_important": action.is_important}
            for action in final_actions
        ]

        data = {
            "final_goal": action_plan.final_goal,
            "final_goal_due": action_plan.final_goal_due,
            "overall_advice": action_plan.overall_advice,
            "milestones": milestones_data,
            "final_actions": final_actions_data,
        }

        if data:
           return Response(data)