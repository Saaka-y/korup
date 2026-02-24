from django.urls import path
from .views import TokenObtainView

urlpatterns = [
    path('jwt/create/', TokenObtainView.as_view(), name='token_obtain'),
]