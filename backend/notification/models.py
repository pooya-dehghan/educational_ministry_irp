from django.db import models
from request.models import User


# Create your models here.


class Notification(models.Model):
    code = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notif_sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notif_receiver')
    seen_choices = (
        ('s', 'seen'),
        ('u', 'unseen')
    )
    view = models.CharField(max_length=100, choices=seen_choices, default='u')

