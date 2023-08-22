from rest_framework import serializers
from accounts.models import School, OfficeManager
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

class SchoolSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = School
        fields = ('username', 'password', 'password_confirmation', 'name', 'city', 'region', 'manager',
                  'office_manager')
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


class SchoolSerializerByOfficeManager(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = School
        fields = ('username', 'password', 'password_confirmation', 'name', 'city', 'region', 'manager')
        extra_kwargs = {
            'office_manager': {'read_only': True},
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


class SchoolCapacitySerializer(serializers.Serializer):
    capacity = serializers.IntegerField()


class SchoolSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class SchoolSerializerAllOffice(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        extra_kwargs = {
            'office_manager': {'read_only': True},
            'password': {'write_only': True}
        }