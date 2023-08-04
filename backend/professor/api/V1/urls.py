from django.urls import path
from . import views
app_name = "api-v1"


urlpatterns = [
    path('list/', views.ProfessorView.as_view()),
    path('list/<int:pk>/', views.ProfessorView.as_view()),
]