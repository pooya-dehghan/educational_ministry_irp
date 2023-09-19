from django.urls import path, include

app_name = "request"


urlpatterns = [
    path('api/v1/', include('request.api.v1.urls', namespace='api-v1'))
]