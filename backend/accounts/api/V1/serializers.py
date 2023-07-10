from ...models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer


class UserRegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ["username", "password", "password_confirmation"]

    def validate(self, attrs):
        password_confirmation = attrs.get("password_confirmation")
        password = attrs.get("password")
        username = attrs.get("username")
        if password != password_confirmation:
            raise serializers.ValidationError("passwords must be match")
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        
        if "@"  in username:
            raise serializers.ValidationError("Email addresses are not allowed as usernames")

        return super().validate(attrs)


    def create(self, validated_data):
        validated_data.pop("password_confirmation", None)
        return User.objects.create_user(**validated_data)



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        validated_data =  super().validate(attrs)
        validated_data["user-id"] = self.user.id
        validated_data["username"] = self.user.username
        return validated_data


# class CustomTokenObtainSerializer(AuthTokenSerializer):
#     def validate(self, attrs):
#         validated_data = super().validate(attrs)
#         validated_data["user-id"] = attrs.get("username")
#         validated_data["username"] = attrs.get("username")
#         return validated_data