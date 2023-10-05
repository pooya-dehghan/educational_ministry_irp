from rest_framework import serializers
from accounts.models import Professor, User
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework.validators import UniqueValidator




class ProfessorSerializerForCreate(serializers.Serializer):
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
    professor_id = serializers.IntegerField(validators=[
            UniqueValidator(
                queryset=Professor.objects.all(),
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


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
