from rest_framework import serializers
from ...models import AssessmentStudentFromTeacher, AssesmentStudentFromSchool, AssesmentInternship



class AssessmentStudentFromTeacherSerializer(serializers.ModelField):
    class Meta:
        model=AssessmentStudentFromTeacher
        fields = "__all__"


class AssessmentStudentFromSchoolSerializer(serializers.ModelField):
    class Meta:
        model=AssesmentStudentFromSchool
        fields = "__all__"


class AssessmentInternshipSerializer(serializers.ModelField):
    class Meta:
        model=AssesmentInternship
        fields = "__all__"