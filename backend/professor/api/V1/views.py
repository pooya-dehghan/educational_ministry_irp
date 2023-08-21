from rest_framework.views import APIView
from accounts.models import Professor
from rest_framework.response import Response
from .serializers import ProfessorSerializer, ProfessorSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuser, IsSuperuserOrOwnProfessor
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update


class ProfessorGet(APIView):
    def get(self, request, pk):
        if Professor.objects.filter(id=pk).exists():
            professor = Professor.objects.get(id=pk)
            ser_data = ProfessorSerializer(instance=professor)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this professor does not exist'}, status=status.HTTP_404_NOT_FOUND)


class ProfessorList(APIView):

    def get(self, request):
        professor = Professor.objects.all()
        ser_data = ProfessorSerializer(instance=professor, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class ProfessorCreate(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(
        manual_parameters=swagger_parameters
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
        manual_parameters=swagger_parameters_update
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

    def delete(self, request, pk):
        professor = Professor.objects.get(pk=pk)
        professor.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)
