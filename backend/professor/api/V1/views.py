from rest_framework.views import APIView
from accounts.models import Professor
from rest_framework.response import Response
from .serializers import ProfessorSerializer, ProfessorSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuser, IsSuperuserOrOwnProfessor
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update
from drf_yasg import openapi


class ProfessorGet(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to get all of information of one professor.

                The request should include the id of professor.

                The response will contain a success message including these fields:
                    - username
                    - professor_id
                    - email
                    - first_name
                    - last_name
                    - and all of information 
                    """,
        operation_summary="endpoint for get all of one professor information",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        if Professor.objects.filter(id=pk).exists():
            professor = Professor.objects.get(id=pk)
            ser_data = ProfessorSerializer(instance=professor)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this professor does not exist'}, status=status.HTTP_404_NOT_FOUND)


class ProfessorList(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows users to list of all professor information.


                The response will contain a success message including these fields:
                    - username
                    - professor_id
                    - email
                    - last_name
                    - first_name
                    of all professor""",
        operation_summary="endpoint for list of professor information",
        responses={
            '200': 'ok',
        }
    )
    def get(self, request):
        professor = Professor.objects.all()
        ser_data = ProfessorSerializer(instance=professor, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class ProfessorCreate(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows admin to create a one professor.

                The request should include the professor information in the request body.

                The response will contain a success message including these fields:
                    - id
                    - professor_id
                    """,
        operation_summary="endpoint for create professor",
        request_body=openapi.Schema(
            'Professor',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'password_confirmation': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'professor_id': openapi.Schema(type=openapi.TYPE_STRING, default="10"),
            },
            required=['username', 'password', 'password_confirmation', 'professor_id'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request'
        }
    )
    def post(self, request):
        ser_data = ProfessorSerializerForCreate(data=request.data)
        if ser_data.is_valid():
            professor = Professor.objects.create(username=ser_data.validated_data['username'],
                                                 professor_id=ser_data.validated_data['professor_id'])
            professor.set_password(ser_data.validated_data['password'])
            professor.save()

            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessorUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnProfessor]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_update,
        operation_description="""This endpoint allows admin to update one professor .

                The request should include the professor id and some field of professor  in the request body.

                The response will contain a success message including these fields:
                    - username
                    - email
                    - firs_name
                    - last_name
                    and all of professor information""",
        operation_summary="endpoint for update professor",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def put(self, request, pk):
        professor = Professor.objects.get(pk=pk)
        self.check_object_permissions(request, professor)
        ser_data = ProfessorSerializer(instance=professor, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessorDelete(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        operation_description="""This endpoint allows admin to delete one professor.

               The request should include the professor id.
               """,
        operation_summary="endpoint for delete professor",
        responses={
            '200': 'ok',
        }
    )
    def delete(self, request, pk):
        professor = Professor.objects.get(pk=pk)
        professor.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)
