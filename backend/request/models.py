from django.db import models
from accounts.models import Student, OfficeManager, User


# Create your models here.

class Request(models.Model):
    status_choices = (
        ('n', 'not sent'),
        ('s', 'Sent'),
        ('p', 'Pending'),
        ('na', 'not accepted'),
        ('a', 'Accepted')
    )
    status = models.CharField(max_length=100, choices=status_choices, default='s')
    sender = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='request_sender')
    receiver = models.ForeignKey(OfficeManager, on_delete=models.CASCADE, related_name='request_receiver')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    body = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        self.body = f'آقای {self.sender.username} با شماره دانشجویی {self.sender.studentUniqueCode} از دانشگاه تربیت دبیر شهید رجایی به اداره منطقه {self.receiver.region} درخواست داده است '
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.receiver} and id = {self.id}'
