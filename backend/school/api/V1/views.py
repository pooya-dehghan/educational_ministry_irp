from rest_framework.views import APIView
from accounts.models import School, OfficeManager
from rest_framework.response import Response
from .serializers import SchoolSerializer, SchoolSerializerByOfficeManager, SchoolSerializerBySchoolManager \
    , SchoolCapacitySerializer
from rest_framework import status
from .permissions import IsSuperuserOrOfficeManager, IsSuperuserOrOwnOfficeManager, \
    IsSuperuserOrOwnOfficeManagerOrOwnSchoolManager
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters


class SchoolGet(APIView):
    def get(self, request, pk):
        if School.objects.filter(id=pk).exists():
            school = School.objects.get(id=pk)
            ser_data = SchoolSerializer(instance=school)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this school does not exist'}, status=status.HTTP_404_NOT_FOUND)


class SchoolList(APIView):

    def get(self, request):
        professor = School.objects.all()
        ser_data = SchoolSerializer(instance=professor, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class SchoolCreate(APIView):
    permission_classes = [IsSuperuserOrOfficeManager]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters
    )
    def post(self, request):
        if OfficeManager.objects.filter(id=request.user.id).exists():
            ser_data = SchoolSerializerByOfficeManager(data=request.data)
            if ser_data.is_valid():
                ser_data.validated_data['office_manager'] = OfficeManager.objects.get(id=request.user.id)
                ser_data.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            ser_data = SchoolSerializer(data=request.data)
            if ser_data.is_valid():
                ser_data.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class SchoolUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManagerOrOwnSchoolManager]

    def put(self, request, pk):
        school = School.objects.get(pk=pk)
        self.check_object_permissions(request, school)
        if OfficeManager.objects.filter(id=request.user.id).exists():
            ser_data = SchoolSerializerByOfficeManager(instance=school, data=request.data, partial=True)
        elif school.manager.id == request.user.id:
            ser_data = SchoolSerializerBySchoolManager(instance=school, data=request.data, partial=True)
        else:
            ser_data = SchoolSerializer(instance=school, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class SchoolDelete(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    def delete(self, request, pk):
        school = School.objects.get(pk=pk)
        office_manager = school.office_manager
        self.check_object_permissions(request, office_manager)
        school.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)


class SetCapacity(APIView):
    def post(self, request):
        if School.objects.filter(manager=request.user).exists():
            school = School.objects.get(manager=request.user)
            ser_data = SchoolCapacitySerializer(data=request.POST)
            if ser_data.is_valid():
                school.capacity = ser_data.validated_data['capacity']
                school.save()
                return Response({'message': 'capacity is set'}, status=status.HTTP_200_OK)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'this user not a school manager'}, status=status.HTTP_404_NOT_FOUND)
