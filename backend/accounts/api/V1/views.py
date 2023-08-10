from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer
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
from django.contrib.auth import authenticate


class ApiUserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {
                "username": serializer.validated_data["username"],
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

            if Teacher.objects.filter(pk=user.pk).exists():
                z = 1
                type = "teacher"
            elif Student.objects.filter(pk=user.pk).exists():
                type = "student"
                z = 1
            elif OfficeManager.objects.filter(pk=user.pk).exists():
                type = "office manager"
                z = 1
            elif School.objects.filter(manager=user).exists():
                type = "school manager"
                z = 1
            elif Professor.objects.filter(pk=user.pk).exists():
                type = "professor"
                z = 1
            elif user.is_admin:
                type = "superuser"
                z = 1
            else:
                type = "anonymous"
                z = 1
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.pk,
                'type': type
            })

        user = User.objects.get(username=username, password=password)
        if user:

            if Teacher.objects.filter(pk=user.pk).exists():
                z = 1
                type = "teacher"
            elif Student.objects.filter(pk=user.pk).exists():
                type = "student"
                z = 1
            elif OfficeManager.objects.filter(pk=user.pk).exists():
                type = "office manager"
                z = 1
            elif School.objects.filter(manager=user).exists():
                type = "school manager"
                z = 1
            elif Professor.objects.filter(pk=user.pk).exists():
                type = "professor"
                z = 1
            elif user.is_admin:
                type = "superuser"
                z = 1
            else:
                type = "anonymous"
                z = 1
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.pk,
                'type': type
            })
        if z == 0:
            return Response({'error': 'Unable to log in with provided credentials.'}, status=400)
