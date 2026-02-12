from django.urls import path
from .views import AccountInfoView

urlpatterns = [
    path('me/', AccountInfoView.as_view(), name='account_info'),
]