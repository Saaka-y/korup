from django.urls import path
from .views import ActionPlanView

urlpatterns = [
    path("", ActionPlanView.as_view(), name="action_plan"),
]
