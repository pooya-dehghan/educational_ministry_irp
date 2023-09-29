from django.db import models
from accounts.models import Student, Professor
# Create your models here.


class ProfessorRequest(models.Model):
    receiver = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='register_request_professor')
    sender = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='register_request_student')
    body = models.CharField(max_length=200)
    code = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.receiver} and id = {self.id}'