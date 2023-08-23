from django.db import models
from request.models import Request
# Create your models here.


class SchoolRequestNotification(models.Model):
    request = models.OneToOneField(Request, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

