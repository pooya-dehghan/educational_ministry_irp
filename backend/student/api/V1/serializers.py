from rest_framework import serializers
from accounts.models import Student
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


class StudentSerializerForCreate(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = Student
        fields = ('username', 'password', 'password_confirmation', 'studentUniqueCode')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password_confirmation = attrs.get("password_confirmation")
        password = attrs.get("password")
        if password != password_confirmation:
            raise serializers.ValidationError("passwords must be match")
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return super().validate(attrs)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
