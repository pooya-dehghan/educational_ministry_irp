from .views import TaskCreationView, GetTaskView, ListAllTaskView, UploadingTask
from django.urls import path

app_name = 'api-v1'

urlpatterns = [
    path('create/', TaskCreationView.as_view(), name='create'),
    path('list/', ListAllTaskView.as_view(), name="list"),
    path('get/<int:id>/', GetTaskView.as_view(), name="get"),
    path('upload/<int:id>/', UploadingTask.as_view(), name="upload")
]
