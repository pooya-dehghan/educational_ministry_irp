from django.urls import path, include

app_name = "school"


urlpatterns = [
    path("api/v1/", include("school.api.V1.urls", namespace="api-v1"))
]