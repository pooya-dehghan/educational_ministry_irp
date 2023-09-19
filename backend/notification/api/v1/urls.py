from django.urls import path
from . import views
app_name = 'api-v1'


urlpatterns = [
    path('list/', views.NotificationListView.as_view(), name="list"),
    path('get/<int:pk>/', views.NotificationGet.as_view()),
    path('seen/<int:pk>/', views.SeenNotification.as_view()),
]