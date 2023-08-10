from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from accounts.models import Teacher, OfficeManager, School, Student
from .serializers import LoginSerializer
from rest_framework.views import APIView
from ...models import User
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
        user = User.objects.get(username=username, password=password)
        if user:
            if Teacher.objects.filter(pk=user.pk).exists():
                type = "teacher"
            elif Student.objects.filter(pk=user.pk).exists():
                type = "student"
            elif OfficeManager.objects.filter(pk=user.pk).exists():
                type = "office manager"
            elif School.objects.filter(pk=user.pk).exists():
                type = "School"
            elif user.is_superuser:
                type = "superuser"
            else:
                type="anonmous"
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.pk,
                'type': type
            })
        else:
            return Response({'error': 'Unable to log in with provided credentials.'}, status=400)