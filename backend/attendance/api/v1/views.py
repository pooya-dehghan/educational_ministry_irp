from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import Student
from .permissions import IsSuperuserOrSchoolManager
from rest_framework import status
from .serializers import DateSerializer
from attendance.models import Attendance


class FillAttendance(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    def post(self, request, pk):
        student = Student.objects.filter(id=pk).first()
        if student:
            ser_data = DateSerializer(data=request.data)
            if ser_data.is_valid():
                date = ser_data.validated_data['date']
                Attendance.objects.create(student=student, date=date)
                return Response({'message': f'attendance set in time {date} for student {student.username}'})
            else:
                return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)