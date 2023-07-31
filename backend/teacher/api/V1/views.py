from rest_framework.views import APIView
from accounts.models import Teacher
from rest_framework.response import Response
from .serializers import TeacherSerializer
from rest_framework import status
from .permissions import IsSuperuserOrSchoolManager, IsSuperuser
from rest_framework.permissions import IsAuthenticated


class TeacherView(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    def get(self, request):
        teacher = Teacher.objects.all()
        ser_data = TeacherSerializer(instance=teacher, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        ser_data = TeacherSerializer(data=request.POST)
        if ser_data.is_valid():
            teacher = ser_data.save()
            if request.user.school_set.filter(manager=request.user).exists():
                school = request.user.school_set.filter(manager=request.user).first()
                school.teacher.add(teacher)
                teacher.school.add(school)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherView2(APIView):
    permission_classes = [IsSuperuser]

    def put(self, request, pk):
        teacher = Teacher.objects.get(pk=pk)
        ser_data = TeacherSerializer(instance=teacher, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        teacher = Teacher.objects.get(pk=pk)
        teacher.delete()
        return Response({'message': 'deleted successfully'})
