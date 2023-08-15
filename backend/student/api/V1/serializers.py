from rest_framework import serializers
from accounts.models import Student


class StudentSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = Student
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True}
        }