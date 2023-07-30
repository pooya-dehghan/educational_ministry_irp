from django.urls import path, include

app_name = "officemanager"


urlpatterns = [
    path("api/v1/", include("officemanager.api.V1.urls", namespace="api-v1"))
]