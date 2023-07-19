from django.urls import path
from .views import StudentView
app_name = "api-v1"


urlpatterns = [
    path("list/", StudentView.as_view(), name="list-post"),
    path("list/<int:pk>/", StudentView.as_view(), name="update-delete")
]