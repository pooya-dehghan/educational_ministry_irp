from django.urls import path, include
from . import views
app_name = "accounts"

urlpatterns = [
    path("api/v1/", include("accounts.api.V1.urls", namespace="api-V1")),
    path('officemanager/', views.OfficeManagerView.as_view()),
    path('officemanager/<int:pk>/', views.OfficeManagerView.as_view()),
    path('professor/', views.ProfessorView.as_view()),
    path('professor/<int:pk>/', views.ProfessorView.as_view()),
    path('teacher/', views.TeacherView.as_view()),
    path('teacher/<int:pk>/', views.TeacherView.as_view()),


]
