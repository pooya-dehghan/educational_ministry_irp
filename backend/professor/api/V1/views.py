from rest_framework.views import APIView
from accounts.models import Professor
from rest_framework.response import Response
from .serializers import ProfessorSerializer
from rest_framework import status
from .permissions import IsSuperuser


class ProfessorList(APIView):

    def get(self, request):
        professor = Professor.objects.all()
        ser_data = ProfessorSerializer(instance=professor, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class ProfessorCreate(APIView):
    permission_classes = [IsSuperuser]

    def post(self, request):
        ser_data = ProfessorSerializer(data=request.POST)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessorUpdate(APIView):
    permission_classes = [IsSuperuser]

    def put(self, request, pk):
        professor = Professor.objects.get(pk=pk)
        ser_data = ProfessorSerializer(instance=professor, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessorDelete(APIView):
    permission_classes = [IsSuperuser]

    def delete(self, request, pk):
        professor = Professor.objects.get(pk=pk)
        professor.delete()
        return Response({'message': 'deleted successfully'})
