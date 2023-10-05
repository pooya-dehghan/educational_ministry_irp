from ...models import Student, User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Professor
from rest_framework.authtoken.serializers import AuthTokenSerializer


class UserRegisterSerializer(serializers.Serializer):
    # password_confirmation = serializers.CharField(max_length=255, write_only=True)

    # class Meta:
    #     model = Student
    #     fields = ["username", "password", "password_confirmation", "studentUniqueCode", 'professor2']  # , "field", "professor2"]
    username = serializers.CharField(error_messages={
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
            'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
        })
    password = serializers.CharField(error_messages={
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
            'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
        })
    password_confirmation = serializers.CharField( error_messages= {
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
            'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
        })
    studentUniqueCode =  serializers.CharField( error_messages={
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
            'max_length': 'حداکثر طول مجاز 255 کاراکتر است.',
        })
    professor = serializers.ModelSerializer(instance=Professor, error_messages={
        'required': 'فیلد الزامی است.',
        'blank': 'نمی‌تواند خالی باشد.',
    })

    def validate(self, attrs):
        password_confirmation = attrs.get("password_confirmation")
        password = attrs.get("password")
        username = attrs.get("username")
        professor = attrs.get('professor2')
        if password != password_confirmation:
            raise serializers.ValidationError("passwords must be match")
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        if "@" in username:
            raise serializers.ValidationError("Email addresses are not allowed as usernames")
        if professor is None:
            raise serializers.ValidationError("professor 2 is required")
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop("password_confirmation", None)
        return Student.objects.create(**validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        validated_data = super().validate(attrs)
        validated_data["user-id"] = self.user.id
        validated_data["username"] = self.user.username
        return validated_data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=100)
    new_password_confirm = serializers.CharField(max_length=100)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True}
        }



class UserProfileAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar',)  # Include other fields as needed

class ChangePasswordSerializerOriginal(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    old_password = serializers.CharField(max_length=100)
    new_password = serializers.CharField(max_length=100)
    new_password_confirm = serializers.CharField(max_length=100)

    def validate(self,attrs):
        new_password = attrs.get("new_password")
        new_password_confirm = attrs.get("new_password_confirm")
        if new_password != new_password_confirm:
            raise serializers.ValidationError("passwords must be match")
        try:
            validate_password(new_password)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return attrs

