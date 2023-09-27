from rest_framework import status
from rest_framework.views import APIView
from accounts.models import Professor, Student
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from ...models import Task, RenderTask
from .serializers import TaskSerializer, RenderTaskUploadingSerializer
from notification.models import Notification


class TaskCreationView(APIView):
    def post(self, request):
        try:
            professor = Professor.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return Response({"message": "invalid professor"})

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
            return Response({"message": "تکلیف شما با موفقیت ساخته شد و برای دانش آموزان اطلاعیه ارسال شد"},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({"data": ser_data.errors}, status=status.HTTP_400_BAD_REQUEST)


class RenderTaskCreationView(APIView):
    def post(self, request, task_id):
        task = Task.objects.get(id=task_id)
        try:
            student = Student.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return Response({"data": "invalid student"}, status=status.HTTP_400_BAD_REQUEST)

        ser_data = RenderTaskUploadingSerializer(data=request.data)
        if ser_data.is_valid():
            rt = RenderTask.objects.create(
                file=ser_data.validated_data["file"],
                student=student,
                task=task
            )
            Notification.objects.create(sender=student, receiver=student.professor2, code=250, title="انجام تکلیف",
                                        body=f"دانشجو{student.username} تکلیف {task.title} را در تاریخ {rt.delivery_date} آپلود کرده است")

            return Response({"message": "تکلیف شما با موفقیت آپلود شد"},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({"data": ser_data.errors}, status=status.HTTP_400_BAD_REQUEST)
