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
            self.title = 'درخواست مدرسه توسط دانشجو'
            self.body = f'دانشجوی {self.sender.username} به شما درخواست داده است لطفا بررسی کنید'
        elif self.code == 401:
            self.title = 'رد شدن درخواست'
            self.body = f'آقای {self.sender.username} درخواست شما را رد کرده است '
        elif self.code == 501:
            self.title = 'تایید شدن درخواست'
            self.body = f'آقای {self.sender.username} درخواست شما را تایید کرده است '

        super().save(*args, **kwargs)


