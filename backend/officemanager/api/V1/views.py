from rest_framework.views import APIView
from accounts.models import OfficeManager
from rest_framework.response import Response
from .serializers import OfficeManagerSerializer
from rest_framework import status


class OfficeManagerView(APIView):
    def get(self, request):
        office_manager = OfficeManager.objects.all()
        ser_data = OfficeManagerSerializer(instance=office_manager, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        ser_data = OfficeManagerSerializer(data=request.POST)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        office_manager = OfficeManager.objects.get(pk=pk)
        ser_data = OfficeManagerSerializer(instance=office_manager, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        office_manager = OfficeManager.objects.get(pk=pk)
        office_manager.delete()
        return Response({'message': 'deleted successfully'})

