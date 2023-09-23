from django.db import models
from request.models import User


# Create your models here.


class Notification(models.Model):
    code = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notif_sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notif_receiver')
    title = models.CharField(max_length=200)
    body = models.CharField(max_length=200)

    seen_choices = (
        ('s', 'seen'),
        ('u', 'unseen')
    )
    view = models.CharField(max_length=100, choices=seen_choices, default='u')

    def save(self, *args, **kwargs):
        if self.code == 301:
            self.title = 'student request'
            self.body = f'the {self.sender.username} send a request to you to find a school for he'
        elif self.code == 401:
            self.title = 'reject request'
            self.body = f'{self.sender.username} rejected your request'
        elif self.code == 501:
            self.title = 'accept request'
            self.body = f'{self.sender.username} accept your request and assign you to one school'

        super().save(*args, **kwargs)


