from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.TeacherList.as_view()),
    path('create/', views.TeacherCreate.as_view()),
    path('update/<int:pk>/', views.TeacherUpdate.as_view()),
    path('delete/<int:pk>/', views.TeacherDelete.as_view()),
    path('get/<int:pk>/', views.TeacherGet.as_view()),
]
