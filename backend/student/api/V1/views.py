from rest_framework.views import APIView
from accounts.models import Student
from rest_framework.response import Response
from .serializers import StudentSerializer
from rest_framework import status
from .permissions import IsSuperuserOrStudent



class StudentView(APIView):
    permission_classes = [IsSuperuserOrStudent]
    def get(self, request):
        students = Student.objects.all()
        ser_data = StudentSerializer(instance=students, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        ser_data = StudentSerializer(data=request.POST)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        student = Student.objects.get(pk=pk)
        ser_data = StudentSerializer(instance=student, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = Student.objects.get(pk=pk)
        student.delete()
        return Response({'message': 'deleted successfully'})