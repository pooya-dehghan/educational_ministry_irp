from django.urls import path
from .views import ApiUserRegistrationView, CustomTokenObtainPairView, UserLoginAPIView, UserLogoutAPIView \
    , ForgetPassword, ResetPassword, DashBordList, DeleteProfile, ProfileView, NotificationList, NotificationGet, SeenNotification
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

app_name = 'api-v1'

urlpatterns = [
    path('registration/', ApiUserRegistrationView.as_view(), name='api-user-register'),
    # login jwt
    path('jwt/create/', CustomTokenObtainPairView.as_view(), name="jwt-token-create"),
    path('jwt/verify/', TokenVerifyView.as_view(), name="jwt-token-verify"),
    path('jwt/refresh/', TokenRefreshView.as_view(), name="jwt-token-refresh"),
    # login drf token
    path("login/", UserLoginAPIView.as_view(), name="login-token"),
    path('logout/', UserLogoutAPIView.as_view()),
    path('forgot/', ForgetPassword.as_view()),
    path('reset/', ResetPassword.as_view()),
    path('dashbordlist/', DashBordList.as_view()),
    path('deleteprofile/<int:pk>/', DeleteProfile.as_view()),
    path('profile/<int:id>/', ProfileView.as_view(), name='profile'),
    path('notification/list/', NotificationList.as_view()),
    path('notification/list/<int:pk>/', NotificationGet.as_view()),
    path('notification/seen/<int:pk>/', SeenNotification.as_view()),
]
