from django.urls import path
from .views import LatestGoalView, LatestReportView

urlpatterns = [
    path('latest_goal', LatestGoalView.as_view(), name='latest_goal'),
    path('latest_report', LatestReportView.as_view(), name='latest_report'),
]