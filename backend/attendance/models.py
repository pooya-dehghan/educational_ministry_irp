from django.db import models
from accounts.models import Student, School, Teacher
from datetime import datetime
from django.utils import timezone
# Create your models here.


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='دانشجو')
    date = models.DateField(default=timezone.now, verbose_name='تاریخ')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student}  - {self.id}"
