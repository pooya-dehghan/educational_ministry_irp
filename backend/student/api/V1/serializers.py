from rest_framework import serializers
from accounts.models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True}
        }