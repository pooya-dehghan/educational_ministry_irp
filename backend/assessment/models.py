from django.db import models
from accounts.models import Student, Teacher, School
# Create your models here.



class AssessmentStudentFromTeacher(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name="معلم")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="دانشجو")
    file = models.FileField(upload_to="assesment/student_from_teacher", verbose_name="فایل")

    def __str__(self):
        return f'{self.teacher} assesment form for {self.student}'
    

class AssesmentStudentFromSchool(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, verbose_name="مدرسه")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="دانشجو")
    file = models.FileField(upload_to="assesment/student_from_school", verbose_name="فایل")

    def __str__(self):
        return f'{self.school} assesment form for {self.student}'
    

class AssesmentInternship(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="دانشجو")
    file = models.FileField(upload_to="assesment/internship", verbose_name="فایل")




