from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.StudentList.as_view()),
    path('create/', views.StudentCreate.as_view()),
    path('update/<int:pk>/', views.StudentUpdate.as_view()),
    path('delete/<int:pk>/', views.StudentDelete.as_view()),
]
