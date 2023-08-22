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
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist
from .swagger_info import swagger_parameters_login, swagger_parameters_forgot, swagger_parameters_reset
from drf_yasg.utils import swagger_auto_schema


class ApiUserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            student = Student.objects.create(username=serializer.validated_data['username']
                                             , studentUniqueCode=serializer.validated_data['studentUniqueCode'])
            student.set_password(serializer.validated_data['password'])
            student.save()
            user = User.objects.get(pk=student.id)
            if user:
                refresh = RefreshToken.for_user(user=user)
                data = {
                    "username": serializer.validated_data["username"],
                    'type': 'student',
                    'id': student.id,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),

                }
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserLogoutAPIView(APIView):
    def post(self, request):
        token = request.data.get('refresh_token')
        if token:
            token_obj = RefreshToken(token)
            token_obj.blacklist()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Refresh token is not provided.'}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_login
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        try:
            user = User.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response({'username': 'Error500Server'}, status=status.HTTP_404_NOT_FOUND)
        if user and check_password(password, user.password):
            if School.objects.filter(manager=user).exists():
                type = "school manager"
            elif user.is_admin:
                type = "superuser"
            elif Teacher.objects.filter(pk=user.pk).exists():
                type = "teacher"
            elif Student.objects.filter(pk=user.pk).exists():
                type = "student"
            elif OfficeManager.objects.filter(pk=user.pk).exists():
                type = "office manager"
            elif Professor.objects.filter(pk=user.pk).exists():
                type = "professor"
            else:
                type = "anonymous"
            refresh = RefreshToken.for_user(user=user)
            return Response({
                'id': user.pk,
                'type': type,
                'username': user.username,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'username': 'Error500Server'}, status=status.HTTP_404_NOT_FOUND)


class ForgetPassword(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_forgot
    )
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
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_reset
    )
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


class DashBordList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        TeacherList = ['دیدن لیست دانشجوهای خودش', 'دیدن پروفایل', 'دادن نمره به دانشجو ها',
                       'پرکردن گزارش راجب دانشجوها']
        ProfessorList = ['دیدن لیست دانشجو های خودش', 'ثبت نمره برای دانشحوها', 'چک کردن تکالیف دانشجویان',
                         'چک کردن حضور وغیاب دانشحویان', 'دیدن پروفایل']
        StudentList = ['دیدن لیست مناطق', 'ایجاد گزارش برای مدرسه و معلم', 'تحویل تکالیف استاد',
                       'دیدن وضعیت حضور و غیاب خودش', 'دیدن نمره خود', 'دیدن پروفایل',
                       'درخواست به مسئول اداره و بررسی وضعیت درخواست']
        OfficeManagerList = ['فرستادن یک دانشجو به یک مدرسه', 'دیدن پروفایل', 'استعلام گزارش ها راجب مدارس',
                             'دیدن لیست مدارس']

        SchoolManagerList = ['ثبت ظرفیت مدرسه', 'پر کردن و حضور و غیاب  و نمایش حضور و غیاب دانشجویان',
                             'دیدن لیست دانش آموزان', 'دیدن لیست معلم ها', 'دیدن پروفایل']
        SuperuserList = ['دیدن لیست مدارس', 'ثبت ظرفیت مدرسه', 'دیدن لیست معلم ها', 'دیدن پروفایل',
                         'فرستادن یک دانشجو به یک مدرسه', 'استعلام گزارش ها راجب مدارس', 'دیدن لیست مناطق',
                         'ایجاد گزارش برای مدرسه و معلم', 'دیدن لیست دانشجوها', 'دادن نمره به دانشجو هاو دیدن نمره',
                         'چک کردن تکالیف دانشجویان', 'پر کردن و حضور و غیاب  و نمایش حضور و غیاب دانشجویان',
                         'درخواست به مسئول اداره و بررسی وضعیت درخواست', 'پرکردن گزارش راجب دانشجوها']
        if Teacher.objects.filter(pk=user.id).exists():
            return Response({'list': TeacherList, 'type': 'Teacher'}, status=status.HTTP_200_OK)
        elif Professor.objects.filter(pk=user.id).exists():
            return Response({'list': ProfessorList, 'type': 'Professor'}, status=status.HTTP_200_OK)
        elif Student.objects.filter(pk=user.id).exists():
            return Response({'list': StudentList, 'type': 'Student'}, status=status.HTTP_200_OK)
        elif OfficeManager.objects.filter(pk=user.id).exists():
            return Response({'list': OfficeManagerList, 'type': 'OfficeManager'}, status=status.HTTP_200_OK)
        elif School.objects.filter(manager=user).exists():
            return Response({'list': SchoolManagerList, 'type': 'SchoolManager'}, status=status.HTTP_200_OK)
        elif user.is_admin:
            return Response({'list': SuperuserList, 'type': 'Superuser'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'not type user'}, status=status.HTTP_404_NOT_FOUND)



######################################################################
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from rest_framework import generics, status




class PasswordResetView(APIView):
    serializer_class = EmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"http://example.com/reset-password/{uid}/{token}/"
        send_mail(
            'Password Reset',
            f'Click the link to reset your password: {reset_link}',
            'from@example.com',
            [email],
            fail_silently=False,
        )
        return Response({'message': 'Password reset link sent.'}, status=status.HTTP_200_OK)