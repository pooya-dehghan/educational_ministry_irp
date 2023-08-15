from rest_framework import serializers
from accounts.models import OfficeManager, School, User


class OfficeManagerSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

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
