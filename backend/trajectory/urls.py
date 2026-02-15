from django.urls import path
from .views import LatestReportView

urlpatterns = [
    path('latest_report/<int:id>', LatestReportView.as_view(), name='latest_report'),
]