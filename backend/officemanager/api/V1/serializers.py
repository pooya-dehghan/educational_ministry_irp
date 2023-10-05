from rest_framework import serializers
from accounts.models import OfficeManager, School, User
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework.validators import UniqueValidator


class OfficeManagerSerializerForCreate(serializers.Serializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message='این فیلد تکراری است.'
            )
        ],
        error_messages={
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
            'max_length': 'حداکثر طول مجاز 255 کاراکتر است.'
        }
    )
    password = serializers.CharField(error_messages={
        'required': 'فیلد الزامی است.',
        'blank': 'نمی‌تواند خالی باشد.',
        'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
    },write_only=True)
    password_confirmation = serializers.CharField(error_messages={
        'required': 'فیلد الزامی است.',
        'blank': 'نمی‌تواند خالی باشد.',
        'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
    },write_only=True)
    region = serializers.IntegerField(validators=[
            UniqueValidator(
                queryset=OfficeManager.objects.all(),
                message='این فیلد تکراری است.'
            )
        ], error_messages={
        'required': 'فیلد الزامی است.',
        'blank': 'نمی‌تواند خالی باشد.',
        'invalid': 'یک عدد صحیح معتبر مورد نیاز است.'
    })

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
        fields = ('city', 'capacity', 'username', 'manager', 'id', 'name')

class SchoolSerializer(serializers.ModelSerializer):  # Nested serializer for User model

    class Meta:
        model = School
        fields = "__all__"  # Include all school fields you want
        extra_kwargs = {
            'password': {'write_only': True}
        }