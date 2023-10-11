from .views import TaskCreationView, RenderTaskCreationView, ListAllTaskView, GetTaskView
from django.urls import path

app_name = 'api-v1'

urlpatterns = [
    path('create/', TaskCreationView.as_view(), name='create'),
    path('upload/<int:task_id>/', RenderTaskCreationView.as_view(), name="upload"),
    path('list/', ListAllTaskView.as_view(), name="list"),
    path('get/<int:id>/', GetTaskView.as_view(), name="get")
]
