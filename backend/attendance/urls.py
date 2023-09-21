from django.urls import path, include

app_name = "attendance"


urlpatterns = [
    path('api/v1/', include('attendance.api.v1.urls', namespace='api-v1'))
]