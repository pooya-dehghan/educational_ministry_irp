from rest_framework.views import APIView
from accounts.models import OfficeManager
from rest_framework.response import Response
from .serializers import OfficeManagerSerializer
from rest_framework import status
from .permissions import IsSuperuser, IsSuperuserOrOwnOfficeManager


class OfficeManagerGet(APIView):
    def get(self, request, pk):
        if OfficeManager.objects.filter(id=pk).exists():
            office_manager = OfficeManager.objects.get(id=pk)
            ser_data = OfficeManagerSerializer(instance=office_manager)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this office manager does not exist'})


class OfficeManagerList(APIView):

    def get(self, request):
        office_manager = OfficeManager.objects.all()
        ser_data = OfficeManagerSerializer(instance=office_manager, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class OfficeManagerCreate(APIView):
    permission_classes = [IsSuperuser]

    def post(self, request):
        ser_data = OfficeManagerSerializer(data=request.POST)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class OfficeManagerUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    def put(self, request, pk):
        office_manager = OfficeManager.objects.get(pk=pk)
        self.check_object_permissions(request, office_manager)
        ser_data = OfficeManagerSerializer(instance=office_manager, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class OfficeManagerDelete(APIView):
    permission_classes = [IsSuperuser]

    def delete(self, request, pk):
        office_manager = OfficeManager.objects.get(pk=pk)
        office_manager.delete()
        return Response({'message': 'deleted successfully'})
