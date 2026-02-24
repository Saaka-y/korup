from django.urls import path
from .views import TokenObtainView, LogoutView

urlpatterns = [
    path('jwt/create/', TokenObtainView.as_view(), name='token_obtain'),
    path('jwt/logout/', LogoutView.as_view(), name='token_logout')
]