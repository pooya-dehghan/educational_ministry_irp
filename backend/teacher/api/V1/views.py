from rest_framework.views import APIView
from accounts.models import Teacher, School
from rest_framework.response import Response
from .serializers import TeacherSerializer
from rest_framework import status
from .permissions import IsSuperuserOrSchoolManager, IsSuperuser, IsSuperuserOrOwnTeacher
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters


class TeacherGet(APIView):
    def get(self, request, pk):
        if Teacher.objects.filter(id=pk).exists():
            teacher = Teacher.objects.get(id=pk)
            ser_data = TeacherSerializer(instance=teacher)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)


class TeacherList(APIView):

    def get(self, request):
        teacher = Teacher.objects.all()
        ser_data = TeacherSerializer(instance=teacher, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class TeacherCreate(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters
    )
    def post(self, request):
        ser_data = TeacherSerializer(data=request.POST)
        if ser_data.is_valid():
            teacher = Teacher.objects.create(username=ser_data.validated_data['username'],
                                             field=ser_data.validated_data['field'])
            teacher.set_password(ser_data.validated_data['password'])
            teacher.save()
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
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)
