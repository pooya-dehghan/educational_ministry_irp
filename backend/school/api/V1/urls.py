from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path("list/", views.SchoolList.as_view()),
    path('create/', views.SchoolCreate.as_view()),
    path('update/<int:pk>/', views.SchoolUpdate.as_view()),
    path('delete/<int:pk>/', views.SchoolDelete.as_view()),
    path('get/<int:pk>/', views.SchoolGet.as_view()),
]
