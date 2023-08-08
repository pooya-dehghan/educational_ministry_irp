from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.OfficeManagerList.as_view()),
    path('create/', views.OfficeManagerCreate.as_view()),
    path('update/<int:pk>/', views.OfficeManagerUpdate.as_view()),
    path('delete/<int:pk>/', views.OfficeManagerDelete.as_view()),
]
