from rest_framework import serializers
from accounts.models import Teacher
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


class TeacherSerializerForCreate(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = Teacher
        fields = ('username', 'email','password', 'password_confirmation', 'field')
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


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
