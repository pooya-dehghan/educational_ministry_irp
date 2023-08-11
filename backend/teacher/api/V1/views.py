from rest_framework.views import APIView
from accounts.models import Teacher, School
from rest_framework.response import Response
from .serializers import TeacherSerializer
from rest_framework import status
from .permissions import IsSuperuserOrSchoolManager, IsSuperuser, IsSuperuserOrOwnTeacher


class TeacherGet(APIView):
    def get(self, request, pk):
        if Teacher.objects.filter(id=pk).exists():
            teacher = Teacher.objects.get(id=pk)
            ser_data = TeacherSerializer(instance=teacher)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this teacher does not exist'})


class TeacherList(APIView):

    def get(self, request):
        teacher = Teacher.objects.all()
        ser_data = TeacherSerializer(instance=teacher, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class TeacherCreate(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    def post(self, request):
        ser_data = TeacherSerializer(data=request.POST)
        if ser_data.is_valid():
            teacher = ser_data.save()
            if School.objects.filter(manager=request.user).exists():
                school = School.objects.get(manager=request.user)
                school.teacher.add(teacher)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnTeacher]

    def put(self, request, pk):
        teacher = Teacher.objects.get(pk=pk)
        self.check_object_permissions(request, teacher)
        ser_data = TeacherSerializer(instance=teacher, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherDelete(APIView):
    permission_classes = [IsSuperuser]

    def delete(self, request, pk):
        teacher = Teacher.objects.get(pk=pk)
        teacher.delete()
        return Response({'message': 'deleted successfully'})
