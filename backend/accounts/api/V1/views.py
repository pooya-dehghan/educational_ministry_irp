from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, EmailSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from accounts.models import Teacher, OfficeManager, School, Student, Professor
from .serializers import LoginSerializer
from rest_framework.views import APIView
from ...models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from .serializers import EmailSerializer, ChangePasswordSerializer


class ApiUserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            data = {
                "username": serializer.validated_data["username"],
                'type': 'student',
                'id': student.id,

            }
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


#
# class CustomObtainAuthToken(ObtainAuthToken):
#     serializer_class = UserLoginSerializer
#
#     # serializer_class = CustomTokenObtainSerializer
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         print(serializer.validated_data)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         if request.user.is_superuser:
#             type = 'admin'
#         elif user in Student.objects.all():
#             type = "student"
#         elif user in OfficeManager.objects.all():
#             type = "Office manager"
#         elif user in Teacher.objects.all():
#             type = "Teacher"
#         elif user in School.objects.all():
#             type = "School"
#         else:
#             type = "anonymous"
#
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'type': type
#         })

class UserLogoutAPIView(APIView):
    def post(self, request):
        # Get the user's token from the request headers
        token_value = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]

        # Find the token and delete it from the database
        token = Token.objects.get(key=token_value)
        token.delete()

        return Response({'message': 'Logged out successfully'})


class UserLoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        print(username)
        print(password)
        z = 0
        user = User.objects.get(username=username)
        if user and check_password(password, user.password):
            z = 1
        if z == 0:
            user = User.objects.get(username=username, password=password)
            if user:
                z = 1

        if z == 1:
            if School.objects.filter(manager=user).exists():
                type = "school manager"
            elif user.is_admin:
                type = "superuser"
            if Teacher.objects.filter(pk=user.pk).exists():
                type = "teacher"
            elif Student.objects.filter(pk=user.pk).exists():
                type = "student"
            elif OfficeManager.objects.filter(pk=user.pk).exists():
                type = "office manager"
            elif Professor.objects.filter(pk=user.pk).exists():
                type = "professor"
            else:
                type = "anonymous"
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.pk,
                'type': type
            })
        else:
            return Response({'error': 'Unable to log in with provided credentials.'}, status=400)


class ForgetPassword(APIView):
    def post(self, request):
        # Validate the user's email
        ser_data = EmailSerializer(data=request.POST)
        if ser_data.is_valid():
            email = ser_data.validated_data['email']
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'user with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # Generate a unique token for email verification
        token, created = Token.objects.get_or_create(user=user)

        subject = 'Reset Password'
        reset_url = request.build_absolute_uri(f"/accounts/api/v1/reset/?token={token.key}")
        message = f'Click the link below to reset your password:\n\n{reset_url}'
        send_mail(subject, message, 'InterShip', [email])

        return Response({'message': 'send email successfully'}, status=status.HTTP_200_OK)


# You can use this view to verify the token and change the password
# You can use this view to verify the token and change the password
class ResetPassword(APIView):
    def post(self, request):
        # Get the token and new password from the request data
        token = request.GET.get('token')
        try:
            user_token = Token.objects.get(key=token)
            user = user_token.user
        except Token.DoesNotExist:
            return Response({'message': 'not exist user whit this token'}, status=status.HTTP_400_BAD_REQUEST)
        # Check if the token is valid

        # Validate the new password and confirmation
        ser_data = ChangePasswordSerializer(data=request.POST)
        if ser_data.is_valid():
            new_password = ser_data.validated_data['new_password']
            new_password_confirm = ser_data.validated_data['new_password_confirm']
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

        if new_password != new_password_confirm:
            return Response({'message': 'password and confirm password not match'}, status=status.HTTP_400_BAD_REQUEST)
        # Change the user's password
        user.set_password(new_password)
        user.save()
        user_token.delete()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'message': 'password change successfully'}, status=status.HTTP_200_OK)
