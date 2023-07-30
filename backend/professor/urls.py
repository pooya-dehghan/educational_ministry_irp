from django.urls import path, include

app_name = "professor"


urlpatterns = [
    path("api/v1/", include("professor.api.V1.urls", namespace="api-v1"))
]