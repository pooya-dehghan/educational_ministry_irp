from django.db import models
from accounts.models import Student, School, Teacher
from datetime import datetime
from django.utils import timezone
# Create your models here.



class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='دانشجو')
    school_name = models.CharField(max_length=200, verbose_name='نام مدرسه')
    school_manager = models.ForeignKey(School, on_delete=models.CASCADE, verbose_name='نام مدیر')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='نام معلم') 
    is_present = models.BooleanField(default=False, verbose_name='حاضر ؟')
    date = models.DateField(default=timezone.now, verbose_name='تاریخ')
    enterance_time = models.TimeField(null=True, blank=True, verbose_name='زمان ورود به مدرسه')
    exit_time = models.TimeField(null=True, blank=True, verbose_name='زمان خروج از مدرسه')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student} - {self.is_present} - {self.id}"
