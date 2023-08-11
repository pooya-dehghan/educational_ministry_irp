from django.db import models
from accounts.models import Student, Professor
# Create your models here.


class Report(models.Model):
    name = models.CharField(max_length=200)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    report_file = models.FileField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.student} - {self.name} - {self.id}'

