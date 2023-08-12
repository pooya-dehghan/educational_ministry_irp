from django.db import models
from accounts.models import Student, OfficeManager
# Create your models here.

class Request(models.Model):
    status_level = (
        ('d', 'در حال بررسی'),
        ('t', 'تایید شده')
    )
    sender   = models.ForeignKey(Student, on_delete=models.CASCADE)
    reciever = models.ForeignKey(OfficeManager, on_delete=models.CASCADE)
    created  = models.DateTimeField(auto_now_add=True)
    updated  = models.DateTimeField(auto_now=True)
    status   = models.CharField(max_length=200, choices=status_level, default='d')


    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.reciever}'