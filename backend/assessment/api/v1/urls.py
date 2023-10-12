from django.urls import path
from .views import UploadingAssesmentStudentFromSchoolView


app_name="api-v1"


urlpatterns = [
    path("uploading-from-school/", UploadingAssesmentStudentFromSchoolView.as_view(), name="uploading-school"),
    
]