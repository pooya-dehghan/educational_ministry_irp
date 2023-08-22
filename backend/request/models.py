from django.db import models
from accounts.models import Student, OfficeManager


# Create your models here.

class Request(models.Model):
    sender = models.ForeignKey(Student, on_delete=models.CASCADE)
    receiver = models.ForeignKey(OfficeManager, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.receiver}'


class Notification(models.Model):
    title_choices = (
        ('u', 'Unseen'),
        ('p', 'Pending'),
        ('n', 'not confirmed'),
        ('c', 'Connecting')
    )
    request = models.OneToOneField(Request, on_delete=models.CASCADE)
    status = models.CharField(choices=title_choices, default='u', max_length=100)

    def __str__(self) -> str:
        return f'{self.request} in status {self.status}'
