from django.urls import path
from .views import LatestGoalView, LatestReportView

urlpatterns = [
    path('latest_goal/<int:id>', LatestGoalView.as_view(), name='latest_goal'),
    path('latest_report/<int:id>', LatestReportView.as_view(), name='latest_report'),
]