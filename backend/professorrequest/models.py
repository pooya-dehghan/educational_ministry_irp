from django.db import models
from accounts.models import Student, Professor


# Create your models here.


class ProfessorRequest(models.Model):
    status_choices = (
        ('n', 'not sent'),
        ('s', 'Sent'),
        ('na', 'not accepted'),
        ('a', 'Accepted')
    )
    receiver = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='register_request_professor')
    sender = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='register_request_student')
    body = models.CharField(max_length=200)
    code = models.CharField(max_length=50, null=True, blank=True, unique=True)
    status = models.CharField(max_length=100, choices=status_choices, default='s')

    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.receiver} and id = {self.id}'

    def save(self, *args, **kwargs):
        self.body = f'آقای {self.sender.username} با شماره دانشجویی {self.sender.studentUniqueCode} از دانشگاه تربیت دبیر شهید رجایی ادعا کرده است دانشجوی شما هست  '
        super().save(*args, **kwargs)
