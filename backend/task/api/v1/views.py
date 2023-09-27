from rest_framework import status
from rest_framework.views import APIView
from accounts.models import Professor, Student
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from ...models import Task
from .serializers import TaskSerializer
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
                Notification.objects.create(sender=request.user, receiver=student, code=300, title=task.title, body=f"استاد {professor.username} تکیف جدیدی به نام {task.title}ایجاد نموده است و تا تاریخ {task.deadline}فرصت دارید تا آن را انجام دهید.")
            return Response({"message":"تکلیف شما با موفقیت ساخته شد و برای دانش آموزان اطلاعیه ارسال شد"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"data":ser_data.errors}, status=status.HTTP_400_BAD_REQUEST)
