from django.urls import path
from .views import NotificationListView
app_name = 'api-v1'


urlpatterns = [
    path('list/', NotificationListView.as_view(), name="list")
]