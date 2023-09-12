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
    seen_choices = (
        ('s', 'seen'),
        ('u', 'unseen')
    )
    view = models.CharField(max_length=100, choices=seen_choices, default='u')
    status = models.CharField(max_length=100, choices=status_choices, default='s')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_receiver')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.sender} sent request to {self.receiver}'
