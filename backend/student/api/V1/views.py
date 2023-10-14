from rest_framework.views import APIView
from accounts.models import Student, OfficeManager, User
from rest_framework.response import Response
from .serializers import StudentSerializer, StudentSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuserOrOwnStudent, IsSuperuser, IsSuperuserOrStudent
from request.models import Request
from notification.serializers import NotificationSerializer
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update
from notification.models import Notification
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
                                             studentUniqueCode=ser_data.validated_data['studentUniqueCode'], email=ser_data.validated_data["email"])
            student.set_password(ser_data.validated_data['password'])
            student.save()

            return Response({'data':ser_data.data}, status=status.HTTP_201_CREATED)
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
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response({'message': 'student does not exist'}, status=status.HTTP_404_NOT_FOUND)
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
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response({'message': 'student does not exist'}, status=status.HTTP_404_NOT_FOUND)
        student.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)




