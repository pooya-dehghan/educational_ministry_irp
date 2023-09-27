from .views import TaskCreationView
from django.urls import path
app_name = 'api-v1'


urlpatterns = [
    path('create/', TaskCreationView.as_view(), name='create')
]