from django.urls import path
from .views import TokenObtainView, LogoutView, TokenRefreshView

urlpatterns = [
    path('jwt/create/', TokenObtainView.as_view(), name='token_obtain'),
    path('jwt/logout/', LogoutView.as_view(), name='token_logout'),
    path('jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]