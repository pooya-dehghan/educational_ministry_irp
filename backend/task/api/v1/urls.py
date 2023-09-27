from .views import TaskCreationView, RenderTaskCreationView
from django.urls import path

app_name = 'api-v1'

urlpatterns = [
    path('create/', TaskCreationView.as_view(), name='create'),
    path('upload/<int:task_id>/', RenderTaskCreationView.as_view(), name="upload")
]
