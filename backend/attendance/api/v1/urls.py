from django.urls import path
from . import views
app_name = 'api-v1'


urlpatterns = [
    path('fill/<int:pk>/', views.FillAttendance.as_view()),
]