from django.urls import path, include

app_name = "student"


urlpatterns = [
    path("api/v1/", include("student.api.V1.urls", namespace="api-v1"))
]