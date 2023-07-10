from django.urls import path, include

app_name = "accounts"


urlpatterns = [
    path("api/v1/",include("accounts.api.V1.urls" ,namespace="api-V1")),
]