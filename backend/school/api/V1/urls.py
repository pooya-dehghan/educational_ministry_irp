from django.urls import path
from .views import SchoolView
app_name = "api-v1"


urlpatterns = [
    path("list/", SchoolView.as_view(), name="list-post"),
    path("list/<int:pk>/", SchoolView.as_view(), name="update-delete")
]