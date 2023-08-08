from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.ProfessorList.as_view()),
    path('create/', views.ProfessorCreate.as_view()),
    path('update/<int:pk>/', views.ProfessorUpdate.as_view()),
    path('delete/<int:pk>/', views.ProfessorDelete.as_view()),
]
