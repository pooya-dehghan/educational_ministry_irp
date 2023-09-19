from django.urls import path, include

app_name = "notification"


urlpatterns = [
    path('api/v1/', include('notification.api.v1.urls', namespace='api-v1'))
]