from rest_framework.views import APIView
from accounts.models import School, OfficeManager
from rest_framework.response import Response
from .serializers import SchoolSerializer, SchoolSerializerForOfficeManager, SchoolCapacitySerializer, \
    SchoolSerializerAll, SchoolSerializerAllOffice
from rest_framework import status
from .permissions import IsSuperuserOrOfficeManager, IsSuperuserOrOwnOfficeManager, \
    IsSuperuserOrOwnOfficeManagerOrOwnSchoolManager
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update, swagger_parameters_set_capacity
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg import openapi
from student.api.V1.serializers import StudentSerializer
from django.core.cache import cache


class SchoolGet(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to get all of information of one school.

                The request should include the id of school.

                The response will contain a success message including these fields:
                    - username
                    - professor_id
                    - email
                    - name
                    - capacity
                    - office_manager
                    - teachers
                    - first_name
                    - last_name
                    - manager
                    - and all of information 
                    """,
        operation_summary="endpoint for get all of one school information",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        if School.objects.filter(id=pk).exists():
            school = School.objects.get(id=pk)
            ser_data = SchoolSerializerAll(instance=school)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'این مدرسه وجود ندارد'}, status=status.HTTP_403_FORBIDDEN)


class SchoolList(APIView):
    permission_classes=[IsSuperuserOrOfficeManager]
    @swagger_auto_schema(
        operation_description="""This endpoint allows users to list of all school information.


                    The response will contain a success message including these fields:
                    - username
                    - professor_id
                    - email
                    - name
                    - capacity
                    - office_manager
                    - teachers
                    - first_name
                    - last_name
                    - manager
                    - and all of information of all school""",
        operation_summary="endpoint for list of school information",
        responses={
            '200': 'ok',
        }
    )
    def get(self, request):
        school_list = cache.get('school_list')
        if school_list is None:
            school_list = School.objects.all()
            cache.set('school_list', school_list)
        ser_data = SchoolSerializerAll(instance=school_list, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class SchoolCreate(APIView):
    permission_classes = [IsSuperuserOrOfficeManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters,
        operation_description="""This endpoint allows admin to create a one school.

                    The request should include the school information in the request body.

                    The response will contain a success message including these fields:
                        - username
                        - city
                        - name
                        - region
                        - manager
                        """,
        operation_summary="endpoint for create school",
        request_body=openapi.Schema(
            'School',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, default="pourya"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'password_confirmation': openapi.Schema(type=openapi.TYPE_STRING, default="1234"),
                'name': openapi.Schema(type=openapi.TYPE_STRING, default="khaje"),
                'city': openapi.Schema(type=openapi.TYPE_STRING, default="tehran"),
                'manager': openapi.Schema(type=openapi.TYPE_STRING, default="ahmadi"),
                'region': openapi.Schema(type=openapi.TYPE_NUMBER, default="10"),
            },
            required=['username', 'password', 'password_confirmation', 'name', 'city', 'manager', 'region', ],
        ),
        responses={
            '201': 'created',
            '400': 'bad request'
        }
    )
    def post(self, request):
        if OfficeManager.objects.filter(id=request.user.id).exists():
            office_manager = OfficeManager.objects.get(id=request.user.id)
            ser_data = SchoolSerializerForOfficeManager(data=request.data)
            if ser_data.is_valid():
                school = School.objects.create(
                    username=ser_data.validated_data["username"],
                    name=ser_data.validated_data["name"],
                    city=ser_data.validated_data["city"],
                    manager=ser_data.validated_data["manager"],
                    region=office_manager.region,
                    office_manager=office_manager,
                    email=ser_data.validated_data["email"]
                )
                school.set_password(ser_data.validated_data["password"])
                school.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            else:
                return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            ser_data = SchoolSerializer(data=request.data)
            if ser_data.is_valid():
                try:
                    OfficeManager.objects.get(region=ser_data.validated_data["region"])
                except OfficeManager.DoesNotExist:
                    return Response({'message': 'office_manger with this region does not exist'},
                                    status=status.HTTP_404_NOT_FOUND)
                school = School.objects.create(
                    username=ser_data.validated_data["username"],
                    name=ser_data.validated_data["name"],
                    city=ser_data.validated_data["city"],
                    manager=ser_data.validated_data["manager"],
                    region=ser_data.validated_data["region"],
                    email=ser_data.validated_data["email"],
                    office_manager=OfficeManager.objects.get(region=ser_data.validated_data["region"])
                )
                school.set_password(ser_data.validated_data["password"])
                school.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            else:
                return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)



class SchoolUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManagerOrOwnSchoolManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters_update,
        operation_description="""This endpoint allows admin to update one school .

                    The request should include the school id and some field of school  in the request body.

                    The response will contain a success message including these fields:
                        - username
                        - email
                        - firs_name
                        - last_name
                        - name
                        - title
                        - established_year
                        -capacity
                        and all of school information""",
        operation_summary="endpoint for update school",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def put(self, request, pk):
        try:
            school = School.objects.get(pk=pk)
        except School.DoesNotExist:
            return Response({'message': 'school does not exist'}, status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, school)

        if request.user.is_admin:
            ser_data = SchoolSerializerAll(instance=school, data=request.data, partial=True)

        else:
            ser_data = SchoolSerializerAllOffice(instance=school, data=request.data, partial=True)

        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class SchoolDelete(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    @swagger_auto_schema(
        operation_description="""This endpoint allows admin to delete one school.

                   The request should include the school id.
                   """,
        operation_summary="endpoint for delete school",
        responses={
            '200': 'ok',
        }
    )
    def delete(self, request, pk):
        try:
            school = School.objects.get(pk=pk)
            office_manager = school.office_manager
            self.check_object_permissions(request, office_manager)
            school.delete()
            return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'fuck your bullshit request this school does not exists'},
                            status=status.HTTP_400_BAD_REQUEST)


class StudentList(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows school manager to get list of student in his school.

                     """,
        operation_summary="endpoint for school get student list",
        responses={
            '200': 'ok',
            '404': 'not found',
        }
    )
    def get(self, request):
        try:
            school = School.objects.get(id=request.user.id)
        except School.DoesNotExist:
            return Response({'message': 'you are not school manager'},status=status.HTTP_404_NOT_FOUND)
        students = school.school_to_student
        ser_data = StudentSerializer(instance=students, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)

