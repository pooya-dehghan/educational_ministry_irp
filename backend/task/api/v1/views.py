from rest_framework import status
from rest_framework.views import APIView
from accounts.models import Professor, Student
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from ...models import Task
from .serializers import TaskSerializer
from notification.models import Notification
import os
from django.core.files.storage import default_storage
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters_task, swagger_parameters_upload_task
from drf_yasg import openapi
from notification.models import Notification
from datetime import datetime
from jalali_date import datetime2jalali
from core.settings import persian_months
from django.utils import timezone








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
            date = ser_data.validated_data["deadline"]
            datetime_object = datetime.strptime(date, '%Y-%m-%d')
            jalali_date = datetime2jalali(datetime_object).strftime('%y-%m-%d')
            year,month,date = jalali_date.split('-')
            year = "14"+year
            month = persian_months[int(month)-1]
            final_date = f"{date} {month} {year}"
            students = Student.objects.filter(professor2=professor)
            for student in students:
                task = Task.objects.create(
                title=ser_data.validated_data["title"],
                description=ser_data.validated_data["description"],
                professor=professor,
                deadline=final_date
            )
                task.student = student
                task.save()
                Notification.objects.create(sender=request.user, receiver=student, code=300, title=task.title,
                                            body=f"استاد {professor.username} تکیف جدیدی به نام {task.title}ایجاد نموده است و تا تاریخ {task.deadline}فرصت دارید تا آن را انجام دهید.")
            return Response(
                {"message": "تکلیف شما با موفقیت ساخته شد و برای دانش آموزان اطلاعیه ارسال شد", 'Success': True},
                status=status.HTTP_201_CREATED)
        else:
            return Response({"message": ser_data.errors, 'Success': False}, status=status.HTTP_400_BAD_REQUEST)


# class RenderTaskCreationView(APIView):
#     @swagger_auto_schema(
#         manual_parameters=swagger_parameters_upload_task,
#         operation_description="""This endpoint allows students to upload his/her tasks
#         """,
#         operation_summary="endpoint for upload task",
#         request_body=openapi.Schema(
#             'user',
#             type=openapi.TYPE_OBJECT,
#             properties={
#                 'file': openapi.Schema(type=openapi.TYPE_STRING, default="gozaresh.docx"),
#             },
#             required=['file'],
#         ),
#         responses={
#             '200': 'ok',
#             '400': 'bad request',
#             '404': 'not found'

#         }
#     )
    
#     def post(self, request, task_id):
#         task = Task.objects.get(id=task_id)
#         try:
#             student = Student.objects.get(id=request.user.id)
#         except ObjectDoesNotExist:
#             return Response({"message": "همچین دانشجویی وجود ندارد", 'Success': False},
#                             status=status.HTTP_400_BAD_REQUEST)

#         ser_data = RenderTaskUploadingSerializer(data=request.data)
#         if ser_data.is_valid():
#             uploaded_file = ser_data.validated_data["file"]
#             file_extension = os.path.splitext(uploaded_file.name)[1]
#             new_file_name = f"{student.username}_task{file_extension}"  # Customize the naming convention as needed
#             new_file_path = os.path.join("tasks", new_file_name)  # 'avatars' is the media subdirectory
#             default_storage.save(new_file_path, uploaded_file)
#             if RenderTask.objects.filter(task=task, student=student).exists():
#                 for rt in RenderTask.objects.filter(task=task, student=student):
#                     rt.delete()
#             RenderTask.objects.create(
#                 task=task,
#                 file=ser_data.validated_data["file"],
#                 student=student,
#             )
#             Notification.objects.create(sender=student, receiver=student.professor2, code=250, title="انجام تکلیف",
#                                         body=f"دانشجو{student.username} تکلیف {task.title} را در تاریخ {timezone.now()} آپلود کرده است")

#             return Response(
#                 {"message": "تکلیف شما با موفقیت آپلود شد", "location": f"backend/media/{new_file_name}",
#                  'Success': True},
#                 status=status.HTTP_201_CREATED)
#         else:
#             return Response({"message": ser_data.errors, 'Success': False}, status=status.HTTP_400_BAD_REQUEST)


# class ListAllTaskView(APIView):
#     def get(self, request):
#         try:
#             student = Student.objects.get(id=request.user.id)
#         except:
#             return Response({"data":"دانشجوی نامعتبر درخواست ارسال نموده است", "success":False}, status=status.HTTP_403_FORBIDDEN)
#         tasks = Task.objects.filter(professor=student.professor2)
#         for task in tasks:
#             if RenderTask.objects.filter(task=task, student=student).exists():
#                 rt = RenderTask.objects.get(task=task, student=student)
#                 task.location = rt.file.name
#         ser_data = TaskSerializer(tasks, many=True)
#         return Response({"data":ser_data.data, "success":True}, status=status.HTTP_200_OK)
    



class GetTaskView(APIView):
    def get(self, request, id):
        pass
        # task = Task.objects.get(id=id)
        # ser_data = TaskSerializer(task)
        # if RenderTask.objects.filter(task=task).exists():
        #     file = RenderTask.objects.get(task=task).file
        #     return Response({"data":ser_data.data, "success":True, 'location':file.name, 'status':'شما قبلا فایلی ارسال نموده اید'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({"data":ser_data.data, "success":True, 'status':'تاکنون فایلی ارسال نشده است'}, status=status.HTTP_200_OK)