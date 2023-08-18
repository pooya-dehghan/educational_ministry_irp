from rest_framework.views import APIView
from accounts.models import Student, OfficeManager
from rest_framework.response import Response
from .serializers import StudentSerializer, StudentSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuserOrOwnStudent, IsSuperuser
from request.models import Request
from request.serializers import RequestSerializer
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters


class StudentGet(APIView):
    def get(self, request, pk):
        if Student.objects.filter(id=pk).exists():
            student = Student.objects.get(id=pk)
            ser_data = StudentSerializer(instance=student)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this student does not exist'}, status=status.HTTP_404_NOT_FOUND)


class StudentList(APIView):

    def get(self, request):
        students = Student.objects.all()
        ser_data = StudentSerializer(instance=students, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class StudentCreate(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters
    )
    def post(self, request):
        ser_data = StudentSerializerForCreate(data=request.data)
        if ser_data.is_valid():
            student = Student.objects.create(username=ser_data.validated_data['username'],
                                             studentUniqueCode=ser_data.validated_data['studentUniqueCode'])
            student.set_password(ser_data.validated_data['password'])
            student.save()

            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnStudent]

    def put(self, request, pk):
        student = Student.objects.get(pk=pk)
        self.check_object_permissions(request, student)
        ser_data = StudentSerializer(instance=student, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDelete(APIView):
    permission_classes = [IsSuperuser]

    def delete(self, request, pk):
        student = Student.objects.get(pk=pk)
        student.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)


class RequestForSchool(APIView):
    # permission_classes = [IsSuperuser]

    def get(self, request, pk):
        office_manager = OfficeManager.objects.get(id=pk)
        student = Student.objects.get(id=request.user.pk)
        print(student)
        print(office_manager)
        req = Request.objects.create(sender=student, reciever=office_manager)
        return Response({'message': 'request sent successfully', 'request id': req.id}, status=status.HTTP_201_CREATED)
