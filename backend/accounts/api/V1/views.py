from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, EmailSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, UserProfileAvatarSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from accounts.models import Teacher, OfficeManager, Student, Professor, School
from .serializers import LoginSerializer
from rest_framework.views import APIView
from ...models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from .serializers import EmailSerializer, ChangePasswordSerializer, ChangePasswordSerializerOriginal
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist
from .swagger_info import swagger_parameters_login, swagger_parameters_forgot, swagger_parameters_reset, \
    swagger_parameters_register, swagger_parameters_change, swagger_parameters_avatar
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from student.api.V1.serializers import StudentSerializer
from teacher.api.V1.serializers import TeacherSerializer
from officemanager.api.V1.serializers import OfficeManagerSerializer
from school.api.V1.serializers import SchoolSerializerAll
from professor.api.V1.serializers import ProfessorSerializer
from ..V1.serializers import UserSerializer
from notification.models import Notification
from notification.serializers import NotificationSerializer
from django.core.files.storage import default_storage
import os
from django.http import FileResponse


class DeleteProfile(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows to admin to delete user profile.

            The request should include the user's id.

            """,
        operation_summary="endpoint for delete User profile",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def post(self, request, pk):
        if User.objects.filter(id=pk).exists():
            user = User.objects.get(id=pk)
            user.is_active = False
            user.save()
            return Response({'message': 'user profile deleted'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'user whit this id does not exist'}, status=status.HTTP_404_NOT_FOUND)


class ApiUserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_register,
        operation_description="""This endpoint allows users to register a new account.

        The request should include the user's information in the request body.

        The response will contain a success message including these fields:
            - username
            - type
            - id
            - refresh
            - access""",
        operation_summary="endpoint for User register",
        request_body=openapi.Schema(
            'Student',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'password_confirmation': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'studentUniqueCode': openapi.Schema(type=openapi.TYPE_STRING, default="3981231026"),
            },
            required=['username', 'password', 'password_confirmation', 'studentUniqueCode'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request'
        }
    )
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

    @swagger_auto_schema(
        operation_description="""This endpoint allows users to logout from account.

        The request should login when use this function this function give token and block refresh token to dont use
         from all function.""",
        operation_summary="endpoint for User logout",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
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
        manual_parameters=swagger_parameters_login,
        operation_description="""This endpoint allows users to log in and obtain an authentication token.

        The request should include the user's credentials in the request body.
        and user should is_active 
        The response will contain an authentication token that can be used for subsequent API calls.

        Note: The authentication token should be included in the headers of all authenticated requests as a Bearer 
        token. """,
        operation_summary="endpoint for User login",
        request_body=openapi.Schema(
            'Student',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
            },
            required=['username', 'password'],
        ),
        responses={
            '200': 'ok',
            '404': 'not found'
        }
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
        if user and check_password(password, user.password) and user.is_active:
            if School.objects.filter(id=user.id).exists():
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
        manual_parameters=swagger_parameters_forgot,
        operation_description="""This endpoint allows users when forget password use this function.

        The request should include the email and when email is correct send a email to user and after when user click to
         link send he to reset password function.""",
        operation_summary="endpoint for forgot password",
        request_body=openapi.Schema(
            'user',
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, default="ali@gmail.com"),
            },
            required=['email'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request',
            '404': 'not found',
        }
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
        manual_parameters=swagger_parameters_reset,
        operation_description="""This endpoint allows users to resset password when forget password.

        The request should include the new password and newpassword_confirm
        when user use forget password and with link use this view 
        """,
        operation_summary="endpoint for User resset password",
        request_body=openapi.Schema(
            'user',
            type=openapi.TYPE_OBJECT,
            properties={
                'new_password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'new_password_confirm': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
            },
            required=['new_password', 'new_password_confirm'],
        ),
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
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
        ser_data = ChangePasswordSerializer(data=request.data)
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

    @swagger_auto_schema(
        operation_description="""This endpoint send a dashboard list for admin """,
        operation_summary="endpoint for dashboard list",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
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
        elif School.objects.filter(id=user.id).exists():
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


# class PasswordResetView(APIView):
#     serializer_class = EmailSerializer
#
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         email = serializer.validated_data['email']
#         user = User.objects.get(email=email)
#         token = default_token_generator.make_token(user)
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         reset_link = f"http://example.com/reset-password/{uid}/{token}/"
#         send_mail(
#             'Password Reset',
#             f'Click the link to reset your password: {reset_link}',
#             'from@example.com',
#             [email],
#             fail_silently=False,
#         )
#         return Response({'message': 'Password reset link sent.'}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    def get(self, request, id):
        global ser_data
        user_type = "anonymous"
        try:
            user = User.objects.get(pk=id)
        except ObjectDoesNotExist:
            return Response({"message": "not found user", "type": user_type}, status=status.HTTP_404_NOT_FOUND)

        if Teacher.objects.filter(pk=user.id).exists():
            teacher = Teacher.objects.get(id=user.id)
            ser_data = TeacherSerializer(teacher)
            user_type = "teacher"
        elif Student.objects.filter(pk=user.id).exists():
            student = Student.objects.get(id=user.id)
            ser_data = StudentSerializer(student)
            print(ser_data)
            user_type = "student"
        elif OfficeManager.objects.filter(pk=user.id).exists():
            office_manager = OfficeManager.objects.get(id=user.id)
            ser_data = OfficeManagerSerializer(office_manager)
            user_type = "office manager"
        elif School.objects.filter(pk=user.id).exists():
            school = School.objects.get(id=user.id)
            ser_data = SchoolSerializerAll(school)
            user_type = "school"
        elif Professor.objects.filter(pk=user.id).exists():
            professor = Professor.objects.get(id=user.id)
            ser_data = ProfessorSerializer(professor)
            user_type = "professor"
        elif user.is_admin:
            ser_data = UserSerializer(user)
            user_type = "super user"
        return Response({"data": ser_data.data, "type": user_type}, status=status.HTTP_200_OK)


class UploadAvatarView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_avatar,
        operation_description="""This endpoint allows users to upload an image for their profile
        """,
        operation_summary="endpoint for upload avatar",
        request_body=openapi.Schema(
            'avatar',
            type=openapi.TYPE_OBJECT,
            properties={
                'avatar': openapi.Schema(type=openapi.TYPE_FILE, default="image.png"),
            },
            required=['avatar'],
        ),
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'

        }
    )
    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
        except:
            return Response({"message": "کاربر شناسایی نشده(نا معتبر)"}, status=status.HTTP_404_NOT_FOUND)
        ser_data = UserProfileAvatarSerializer(data=request.data)
        if ser_data.is_valid():
            uploaded_avatar = ser_data.validated_data["avatar"]
            file_extension = os.path.splitext(uploaded_avatar.name)[1]
            new_file_name = f"{user.username}_avatar{file_extension}"  # Customize the naming convention as needed
            new_file_path = os.path.join("avatars", new_file_name)  # 'avatars' is the media subdirectory
            # Save the uploaded file with the new name
            if user.avatar:
                default_storage.delete(user.avatar.name)
            default_storage.save(new_file_path, uploaded_avatar)
            # Update the user's 'avatar' field with the new file path
            user.avatar = new_file_path
            print(file_extension)
            user.save()
            return Response(
                {"message": "آواتار شما با موفقیت آپلود شد", 'location': f'backend/media/{user.avatar.name}'},
                status=status.HTTP_200_OK)

        else:
            return Response({"message": "متاسفانه فایل آپلود شده شما نا معتبر است"},
                            status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_change,
        operation_description="""This endpoint allows users to change his password.

        The request should include the username and old_password new_password and new_password_confirm

        """,
        operation_summary="endpoint for change password",
        request_body=openapi.Schema(
            'user',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="ali"),
                'old_password': openapi.Schema(type=openapi.TYPE_STRING, default="6789"),
                'new_password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'new_password_confirm': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
            },
            required=['username', 'old_password', 'new_password', 'new_password_confirm'],
        ),
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'

        }
    )
    def post(self, request):
        ser_data = ChangePasswordSerializerOriginal(data=request.data)
        if ser_data.is_valid():
            username = ser_data.validated_data['username']
            old_password = ser_data.validated_data['old_password']
            new_password = ser_data.validated_data['new_password']
            try:
                user = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return Response({'username': 'Error500Server'}, status=status.HTTP_404_NOT_FOUND)
            if user and check_password(old_password, user.password) and user.is_active:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'password changed'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'username or old_password the mistake'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
