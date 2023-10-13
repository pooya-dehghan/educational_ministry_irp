from django.contrib import admin
from .models import AssesmentInternship, AssesmentStudentFromSchool, AssessmentStudentFromTeacher
# Register your models here.

admin.site.register(AssessmentStudentFromTeacher)
admin.site.register(AssesmentStudentFromSchool)
admin.site.register(AssesmentInternship)