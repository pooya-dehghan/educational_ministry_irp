from rest_framework import status
from rest_framework.views import APIView
from accounts.models import Professor, Student
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from ...models import Task, RenderTask
from .serializers import TaskSerializer, RenderTaskUploadingSerializer
from notification.models import Notification
import os
from django.core.files.storage import default_storage
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters_task, swagger_parameters_upload_task
from drf_yasg import openapi
from notification.models import Notification

class TaskCreationView(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_task,
        operation_description="""This endpoint allows users to change his password.

        The request should include the username and old_password new_password and new_password_confirm

        """,
        operation_summary="endpoint for create task",
        request_body=openapi.Schema(
            'user',
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING, default="ali"),
                'description': openapi.Schema(type=openapi.TYPE_STRING, default="6789"),
                'deadline': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
            },
            required=['title', 'description', 'deadline'],
        ),
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'

        }
    )
    def post(self, request):
        try:
            professor = Professor.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return Response({"message": "همچین استادی وجود ندارد", 'Success': False})

        ser_data = TaskSerializer(data=request.data)
        if ser_data.is_valid():
            task = Task.objects.create(
                title=ser_data.validated_data["title"],
                description=ser_data.validated_data["description"],
                professor=professor,
                deadline=ser_data.validated_data["deadline"]
            )
            students = Student.objects.filter(professor2=professor)
            for student in students:
                Notification.objects.create(sender=request.user, receiver=student, code=300, title=task.title,
                                            body=f"استاد {professor.username} تکیف جدیدی به نام {task.title}ایجاد نموده است و تا تاریخ {task.deadline}فرصت دارید تا آن را انجام دهید.")
            return Response(
                {"message": "تکلیف شما با موفقیت ساخته شد و برای دانش آموزان اطلاعیه ارسال شد", 'Success': True},
                status=status.HTTP_201_CREATED)
        else:
            return Response({"message": ser_data.errors, 'Success': False}, status=status.HTTP_400_BAD_REQUEST)


class RenderTaskCreationView(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_upload_task,
        operation_description="""This endpoint allows students to upload his/her tasks
        """,
        operation_summary="endpoint for upload task",
        request_body=openapi.Schema(
            'user',
            type=openapi.TYPE_OBJECT,
            properties={
                'file': openapi.Schema(type=openapi.TYPE_STRING, default="gozaresh.docx"),
            },
            required=['file'],
        ),
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'

        }
    )
    
    def post(self, request, task_id):
        task = Task.objects.get(id=task_id)
        try:
            student = Student.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return Response({"message": "همچین دانشجویی وجود ندارد", 'Success': False},
                            status=status.HTTP_400_BAD_REQUEST)

        ser_data = RenderTaskUploadingSerializer(data=request.data)
        if ser_data.is_valid():
            uploaded_file = ser_data.validated_data["file"]
            file_extension = os.path.splitext(uploaded_file.name)[1]
            new_file_name = f"{student.username}_task{file_extension}"  # Customize the naming convention as needed
            new_file_path = os.path.join("tasks", new_file_name)  # 'avatars' is the media subdirectory
            if RenderTask.objects.filter(student=student, task=task).exists():
                for rt in RenderTask.objects.filter(student=student, task=task):
                    default_storage.delete(rt.file.name)
                    rt.delete()

            default_storage.save(new_file_path, uploaded_file)
            Notification.objects.create(sender=student, receiver=student.professor2, code=250, title="انجام تکلیف",
                                        body=f"دانشجو{student.username} تکلیف {task.title} را در تاریخ {last_rt.delivery_date} آپلود کرده است")

            return Response(
                {"message": "تکلیف شما با موفقیت آپلود شد", "location": f"backend/media/{last_rt.file.name}",
                 'Success': True},
                status=status.HTTP_201_CREATED)
        else:
            return Response({"message": ser_data.errors, 'Success': False}, status=status.HTTP_400_BAD_REQUEST)
