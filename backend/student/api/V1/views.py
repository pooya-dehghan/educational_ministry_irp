from rest_framework.views import APIView
from accounts.models import Student, OfficeManager, User
from rest_framework.response import Response
from .serializers import StudentSerializer, StudentSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuserOrOwnStudent, IsSuperuser
from request.models import Request
from request.serializers import RequestSerializer
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update
from notification.models import SchoolRequestNotification
from drf_yasg import openapi


class StudentGet(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to get all of information of one student.

                    The request should include the id of student.

                    The response will contain a success message including these fields:
                        - username
                        - StudentUniqueCode
                        - email
                        - first_name
                        - last_name
                        - and all of information 
                        """,
        operation_summary="endpoint for get all of one student information",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        if Student.objects.filter(id=pk).exists():
            student = Student.objects.get(id=pk)
            ser_data = StudentSerializer(instance=student)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this student does not exist'}, status=status.HTTP_404_NOT_FOUND)


class StudentList(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows users to list of all student information.


                    The response will contain a success message including these fields:
                        - username
                        - StudentUniqueCode
                        - email
                        - last_name
                        - first_name
                        of all student""",
        operation_summary="endpoint for list of student information",
        responses={
            '200': 'ok',
        }
    )
    def get(self, request):
        students = Student.objects.all()
        ser_data = StudentSerializer(instance=students, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class StudentCreate(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows admin to create a one student.

                    The request should include the student information in the request body.

                    The response will contain a success message including these fields:
                        - id
                        - StudentUniqueCode
                        """,
        operation_summary="endpoint for create student",
        request_body=openapi.Schema(
            'Student',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'password_confirmation': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'StudentUniqueCode': openapi.Schema(type=openapi.TYPE_STRING, default="10"),
            },
            required=['username', 'password', 'password_confirmation', 'StudentUniqueCode'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request'
        }
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

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_update,
        operation_description="""This endpoint allows admin to update one student .

                    The request should include the student id and some field of student  in the request body.

                    The response will contain a success message including these fields:
                        - username
                        - email
                        - firs_name
                        - last_name
                        and all of student information""",
        operation_summary="endpoint for update student",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
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

    @swagger_auto_schema(
        operation_description="""This endpoint allows admin to delete one student.

                   The request should include the student id.
                   """,
        operation_summary="endpoint for delete student",
        responses={
            '200': 'ok',
        }
    )
    def delete(self, request, pk):
        student = Student.objects.get(pk=pk)
        student.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)


class RequestForSchool(APIView):
    # permission_classes = [IsSuperuser]
    @swagger_auto_schema(
        operation_description="""This endpoint allows student  to send a request to office_manager.

            The request should include the office_manager id.

            """,
        operation_summary="endpoint for send request to office_manager",
        responses={
            '201': 'created',
        }
    )
    def get(self, request, pk):
        if OfficeManager.objects.filter(id=pk).exists() and Student.objects.filter(id=request.user.pk).exists():
            sender = User.objects.get(id=request.user.pk)
            receiver = User.objects.get(id=pk)
            if Request.objects.filter(sender=sender).exists():
                return Response({'message': 'you have request been before'})
            req = Request.objects.create(sender=sender, receiver=receiver)
            notification = SchoolRequestNotification.objects.create(request=req)
            notification.content = f"{sender.username} requested for school"
            notification.save()
            return Response({'message': 'request sent successfully', 'notification id': notification.id},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'office_manager not exist'}, status=status.HTTP_400_BAD_REQUEST)


class StudentGetRequestStatus(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows student to get status of his request.


            The response will contain a success message including these fields:
                - view seen - unseen
                - status send - not send - pending - not accepted - accepted
                when status is pending or accepted or not accepted means view is seen  
                when status is not send means view is not seen 
                when status is send sometime view is seen and sometime view is not seen  
                
                
                """,
        operation_summary="endpoint for get status of request",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request):
        student = User.objects.get(pk=request.user.id)
        stu_request = Request.objects.get(sender=student)
        if stu_request:
            if stu_request.status == "s":
                if stu_request.view == "s":
                    return Response({'status': "ارسال شده و در حال انتظار", 'view': "دیده شده"}, status=status.HTTP_200_OK)
                else:
                    return Response({'status': "ارسال شده و در حال انتظار", 'view': "دیده نشده"}, status=status.HTTP_200_OK)
            if stu_request.status == "n":
                return Response({'status': "ارسال نشده", 'view': "دیده نشده"}, status=status.HTTP_200_OK)
            if stu_request.status == "na":
                return Response({'status': "عدم تایید", 'view': "دیده شده"}, status=status.HTTP_200_OK)
            if stu_request.status == "a":
                return Response({'status': "تایید", 'view': "دیده شده"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'you do not have any request'}, status=status.HTTP_404_NOT_FOUND)
