from rest_framework.views import APIView
from accounts.models import School, OfficeManager
from rest_framework.response import Response
from .serializers import SchoolSerializer, SchoolSerializerByOfficeManager
from rest_framework import status
from .permissions import IsSuperuserOrOfficeManager, IsSuperuserOrOwnOfficeManager


class SchoolList(APIView):

    def get(self, request):
        professor = School.objects.all()
        ser_data = SchoolSerializer(instance=professor, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class SchoolCreate(APIView):
    permission_classes = [IsSuperuserOrOfficeManager]

    def post(self, request):
        if OfficeManager.objects.filter(id=request.user.id).exists():
            ser_data = SchoolSerializerByOfficeManager(data=request.POST)
            if ser_data.is_valid():
                ser_data.validated_data['office_manager'] = OfficeManager.objects.get(id=request.user.id)
                ser_data.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            ser_data = SchoolSerializer(data=request.POST)
            if ser_data.is_valid():
                ser_data.save()
                return Response(ser_data.data, status=status.HTTP_201_CREATED)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class SchoolUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    def put(self, request, pk):
        school = School.objects.get(pk=pk)
        office_manager = school.office_manager
        self.check_object_permissions(request, office_manager)
        if OfficeManager.objects.filter(id=request.user.id).exists():
            ser_data = SchoolSerializerByOfficeManager(instance=school, data=request.data, partial=True)
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
        return Response({'message': 'deleted successfully'})
