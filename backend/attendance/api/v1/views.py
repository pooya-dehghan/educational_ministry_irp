from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import Student
from .permissions import IsSuperuserOrSchoolManager
from rest_framework import status
from .serializers import DateSerializer
from attendance.models import Attendance
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters


class FillAttendance(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows school manager to fill attendance of  one student

                    The request should include the student id and date of day

                        """,
        operation_summary="endpoint for fill attendance",
        responses={
            '201': 'created',
            '400': 'bad request'
        }
    )

    def post(self, request, pk):
        student = Student.objects.filter(id=pk).first()
        self.check_object_permissions(request,student)
        if student:
            ser_data = DateSerializer(data=request.data)
            if ser_data.is_valid():
                date = ser_data.validated_data['date']
                if Attendance.objects.filter(student=student, date=date).exists():
                    return Response({'message': 'you filled before'})
                Attendance.objects.create(student=student, date=date)
                return Response({'message': f'attendance set in time {date} for student {student.username}'})
            else:
                return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)