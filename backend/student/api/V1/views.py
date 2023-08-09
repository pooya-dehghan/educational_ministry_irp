from rest_framework.views import APIView
from accounts.models import Student
from rest_framework.response import Response
from .serializers import StudentSerializer
from rest_framework import status
from .permissions import IsSuperuserOrOwnStudent, IsSuperuser


class StudentGet(APIView):
    def get(self, request, pk):
        if Student.objects.filter(id=pk).exists():
            student = Student.objects.get(id=pk)
            ser_data = StudentSerializer(instance=student)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this student does not exist'})



class StudentList(APIView):

    def get(self, request):
        students = Student.objects.all()
        ser_data = StudentSerializer(instance=students, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class StudentCreate(APIView):
    permission_classes = [IsSuperuser]

    def post(self, request):
        ser_data = StudentSerializer(data=request.POST)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnStudent]

    def put(self, request, pk):
        student = Student.objects.get(pk=pk)
        self.check_object_permissions(request,student)
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
        return Response({'message': 'deleted successfully'})
