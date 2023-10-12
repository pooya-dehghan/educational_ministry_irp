from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import Student
from .permissions import IsSuperuserOrSchoolManager
from rest_framework import status
from .serializers import DateSerializer
from attendance.models import Attendance
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters
from jalali_date import datetime2jalali
from core.settings import persian_months
from datetime import datetime
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
            '400': 'bad request',
            '404': 'not found'
        }
    )
    def post(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({'message': 'همچین دانشحویی وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, student)

        ser_data = DateSerializer(data=request.data)
        if ser_data.is_valid():
            date = ser_data.validated_data['date']

            #date = datetime2jalali(date).strftime('%y-%m-%d')

            if Attendance.objects.filter(student=student, date=date).exists():
                return Response({'message': 'شما قبلا این تاریخ را برای این دانشحو پر کرده اید', 'Success': False})
            Attendance.objects.create(student=student, date=date)
            return Response(
                {'message': f'حضور دانشجو{student.username} در تاریخ {date}با موفقید ثبت شد ', 'Success': True})
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAttendance(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows to get get attendance of one student
                        should input student_id
                        """,
        operation_summary="endpoint for get attendance",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({'message': 'همچین دانشحویی وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        attendance = Attendance.objects.filter(student=student)
        ser_data = DateSerializer(instance=attendance, many=True)
        list_of_date = []
        for data in ser_data.data[:]:
            datetime_object = datetime.strptime(data["date"], '%Y-%m-%d')
            jalali_date = datetime2jalali(datetime_object).strftime('%y-%m-%d')
            year,month,date = jalali_date.split('-')
            year = "14"+year
            month = persian_months[int(month)-1]
            # list_of_date.append(f"{int(year)} month {int(date)}")
            list_of_date.append(f"{year} {month}"+ f"{date}")
        # date = datetime2jalali(ser_data.data[0]['date']).strftime('%y-%m-%d')
        return Response({'data':list_of_date, 'success':True}, status=status.HTTP_200_OK)
