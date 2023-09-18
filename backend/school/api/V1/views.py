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
            return Response({'message': 'this school does not exist'}, status=status.HTTP_404_NOT_FOUND)


class SchoolList(APIView):
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
        professor = School.objects.all()
        ser_data = SchoolSerializerAll(instance=professor, many=True)
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
                    office_manager=office_manager
                )
                school.set_password(ser_data.validated_data["password"])
                school.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            else:
                return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            ser_data = SchoolSerializer(data=request.data)
            if ser_data.is_valid():
                school = School.objects.create(
                    username=ser_data.validated_data["username"],
                    name=ser_data.validated_data["name"],
                    city=ser_data.validated_data["city"],
                    manager=ser_data.validated_data["manager"],
                    region=ser_data.validated_data["region"],
                    office_manager=OfficeManager.objects.get(region=ser_data.validated_data["region"])
                )
                school.set_password(ser_data.validated_data["password"])
                school.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            else:
                return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        # if OfficeManager.objects.filter(id=request.user.id).exists():
        #     ser_data = SchoolSerializerByOfficeManager(data=request.data)
        #     if ser_data.is_valid():
        #         school = School.objects.create(username=ser_data.validated_data['username'],
        #                                        region=ser_data.validated_data['region'],
        #                                        name=ser_data.validated_data['name'],
        #                                        city=ser_data.validated_data['city'],
        #                                        manager=ser_data.validated_data['manager'],
        #                                        )
        #         school.set_password(ser_data.validated_data['password'])
        #         office_manager = OfficeManager.objects.get(reqion=ser_data.validated_data['region'])
        #         school.office_manager = office_manager
        #         school.save()
        #         return Response(ser_data.data, status=status.HTTP_201_CREATED)
        #     return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     ser_data = SchoolSerializer(data=request.data)
        #     if ser_data.is_valid():
        #         school = School.objects.create(username=ser_data.validated_data['username'],
        #                                        region=ser_data.validated_data['region'],
        #                                        name=ser_data.validated_data['name'],
        #                                        city=ser_data.validated_data['city'],
        #                                        manager=ser_data.validated_data['manager'],
        #                                        )
        #         school.set_password(ser_data.validated_data['password'])
        #         office_manager = OfficeManager.objects.get(reqion=ser_data.validated_data['region'])
        #         school.office_manager = office_manager
        #         school.save()
        #         return Response(ser_data.data, status=status.HTTP_201_CREATED)
        #     return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


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
                        and all of school information""",
        operation_summary="endpoint for update school",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def put(self, request, pk):
        school = School.objects.get(pk=pk)
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


class SetCapacity(APIView):
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_set_capacity,
        operation_description="""This endpoint allows school manager to set capacity of school .

            The request should include the capacity in the request body.

            """,
        operation_summary="endpoint for cet school capacity",
        request_body=openapi.Schema(
            'School',
            type=openapi.TYPE_OBJECT,
            properties={
                'capacity': openapi.Schema(type=openapi.TYPE_INTEGER, default="10"),
            },
            required=['capacity'],
        ),
        responses={
            '201': 'created',
            '400': 'bad request',
            '404': 'not found'
        }
    )
    def post(self, request):
        if School.objects.filter(id=request.user.id).exists():
            school = School.objects.get(id=request.user.id)
            ser_data = SchoolCapacitySerializer(data=request.POST)
            if ser_data.is_valid():
                school.capacity = ser_data.validated_data['capacity']
                school.save()
                return Response({'message': 'capacity is set'}, status=status.HTTP_200_OK)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'this user not a school manager'}, status=status.HTTP_404_NOT_FOUND)
