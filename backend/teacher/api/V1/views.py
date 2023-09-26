from rest_framework.views import APIView
from accounts.models import Teacher, School
from rest_framework.response import Response
from .serializers import TeacherSerializer, TeacherSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuserOrSchoolManager, IsSuperuser, IsSuperuserOrOwnTeacher
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .swagger_info import swagger_parameters, swagger_parameters_update


class TeacherGet(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to get all of information of one teacher.

                The request should include the id of teacher.

                The response will contain a success message including these fields:
                    - username
                    - field
                    - email
                    - first_name
                    - last_name
                    - and all of information 
                    """,
        operation_summary="endpoint for get all of one teacher information",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        if Teacher.objects.filter(id=pk).exists():
            teacher = Teacher.objects.get(id=pk)
            ser_data = TeacherSerializer(instance=teacher)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)


class TeacherList(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows users to list of all teacher information.


                    The response will contain a success message including these fields:
                        - username
                        - field
                        - email
                        - last_name
                        - first_name
                        of all teacher""",
        operation_summary="endpoint for list of teacher information",
        responses={
            '200': 'ok',
        }
    )
    def get(self, request):
        teacher = Teacher.objects.all()
        ser_data = TeacherSerializer(instance=teacher, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class TeacherCreate(APIView):
    permission_classes = [IsSuperuserOrSchoolManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows admin to create a one teacher.

                    The request should include the teacher information in the request body.

                    The response will contain a success message including these fields:
                        - id
                        - field
                        """,
        operation_summary="endpoint for create teacher",
        request_body=openapi.Schema(
            'teacher',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'password_confirmation': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'field': openapi.Schema(type=openapi.TYPE_STRING, default="computer"),
            },
            required=['username', 'password', 'password_confirmation', 'field'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request'
        }
    )
    def post(self, request):
        ser_data = TeacherSerializerForCreate(data=request.data)
        if ser_data.is_valid():
            teacher = Teacher.objects.create(username=ser_data.validated_data['username'],
                                             field=ser_data.validated_data['field'])
            teacher.set_password(ser_data.validated_data['password'])
            teacher.save()
            if School.objects.filter(id=request.user.id).exists():
                school = School.objects.get(id=request.user.id)
                school.teacher.add(teacher)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnTeacher]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_update,
        operation_description="""This endpoint allows admin to update one teacher .

                The request should include the teacher id and some field of teacher  in the request body.

                The response will contain a success message including these fields:
                    - username
                    - email
                    - firs_name
                    - last_name
                    and all of teacher information""",
        operation_summary="endpoint for update teacher",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def put(self, request, pk):
        try:
            teacher = Teacher.objects.get(pk=pk)
        except Teacher.DoesNotExist:
            return Response({'message': 'teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, teacher)
        ser_data = TeacherSerializer(instance=teacher, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherDelete(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        operation_description="""This endpoint allows admin to delete one teacher.

                   The request should include the teacher id.
                   """,
        operation_summary="endpoint for delete teacher",
        responses={
            '200': 'ok',
        }
    )
    def delete(self, request, pk):
        try:
            teacher = Teacher.objects.get(pk=pk)
        except Teacher.DoesNotExist:
            return Response({'message': 'teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)
        teacher.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)
