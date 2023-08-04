from django.urls import path, include

app_name = "teacher"


urlpatterns = [
    path("api/v1/", include("teacher.api.V1.urls", namespace="api-v1"))
]