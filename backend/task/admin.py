from django.contrib import admin
from .models import Task, RenderTask
# Register your models here.
admin.site.register(Task)
admin.site.register(RenderTask)
