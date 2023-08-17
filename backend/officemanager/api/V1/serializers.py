from rest_framework import serializers
from accounts.models import OfficeManager, School, User
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


class OfficeManagerSerializerForCreate(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = OfficeManager
        fields = ("username", "password", "password_confirmation", "region")
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


class OfficeManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeManager
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class SchoolListSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('name', 'id')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'first_name', 'last_name',
                  'personal_code']  # Include all user fields you want


class SchoolSerializer(serializers.ModelSerializer):
    manager = UserSerializer(read_only=True)  # Nested serializer for User model

    class Meta:
        model = School
        fields = ['name', 'city', 'region', 'capacity', 'title', 'manager']  # Include all school fields you want
