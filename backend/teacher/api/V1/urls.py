from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.TeacherView.as_view()),
    path('list/<int:pk>/', views.TeacherView2.as_view()),
]
