from rest_framework.views import APIView
from accounts.models import OfficeManager
from rest_framework.response import Response
from .serializers import OfficeManagerSerializer, SchoolListSerializer, SchoolSerializer, \
    OfficeManagerSerializerForCreate
from rest_framework import status
from .permissions import IsSuperuser, IsSuperuserOrOwnOfficeManager
from drf_yasg.utils import swagger_auto_schema
from .swagger_info import swagger_parameters, swagger_parameters_update
from request.models import Request
from request.serializers import RequestSerializer
from django.core.exceptions import ObjectDoesNotExist
from notification.models import SchoolRequestNotification


class OfficeManagerGet(APIView):
    def get(self, request, pk):
        if OfficeManager.objects.filter(id=pk).exists():
            office_manager = OfficeManager.objects.get(id=pk)
            ser_data = OfficeManagerSerializer(instance=office_manager)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'this office manager does not exist'}, status=status.HTTP_404_NOT_FOUND)


class OfficeManagerList(APIView):

    def get(self, request):
        office_manager = OfficeManager.objects.all()
        ser_data = OfficeManagerSerializer(instance=office_manager, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class OfficeManagerCreate(APIView):
    permission_classes = [IsSuperuser]

    @swagger_auto_schema(

        manual_parameters=swagger_parameters

    )
    def post(self, request):
        ser_data = OfficeManagerSerializerForCreate(data=request.data)
        if ser_data.is_valid():
            office_manager = OfficeManager.objects.create(username=ser_data.validated_data['username'],
                                                          region=ser_data.validated_data['region'])
            office_manager.set_password(ser_data.validated_data['password'])
            office_manager.save()

            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class OfficeManagerUpdate(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    @swagger_auto_schema(

        manual_parameters=swagger_parameters_update

    )
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
        return Response({'message': 'deleted successfully'}, status=status.HTTP_200_OK)


class SchoolList(APIView):
    def get(self, request):
        office_manager = OfficeManager.objects.get(id=request.user.id)
        school = office_manager.office_to_school
        ser_data = SchoolListSerializer(instance=school, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class SchoolGet(APIView):
    def get(self, request, pk):
        office_manager = OfficeManager.objects.get(id=request.user.id)
        if office_manager.office_to_school.filter(pk=pk).exists():
            school = office_manager.office_to_school.get(pk=pk)
            ser_data = SchoolSerializer(instance=school)
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'not exist school in this region with this id'},
                            status=status.HTTP_404_NOT_FOUND)


class SeenRequest(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    def post(self, request, pk):
        office_manager_notification = SchoolRequestNotification.objects.get(pk=pk)
        office_manager = office_manager_notification.request.receiver
        self.check_object_permissions(request, office_manager)
        if office_manager_notification.request.view == 'u':
            office_manager_notification.request.view = 's'
            office_manager_notification.save()
            return Response({'message': 'notification seen'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'notification seen before'}, status=status.HTTP_400_BAD_REQUEST)


# class ChangeRequestToPending(APIView):
#     permission_classes = [IsSuperuserOrOwnOfficeManager]
#
#     def post(self, request, pk):
#         notification = Notification.objects.get(pk=pk)
#         office_manager = notification.request.receiver
#         self.check_object_permissions(request, office_manager)
#         if notification.status == 'u' or notification.status == 's':
#             notification.status = 'p'
#             notification.save()
#             return Response({'message': 'notification pending'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'notification pending before or connecting or not confirmed before'},
#                             status=status.HTTP_400_BAD_REQUEST)


# class RejectRequest(APIView):
#     permission_classes = [IsSuperuserOrOwnOfficeManager]
#
#     def post(self, request, pk):
#         notification = Notification.objects.get(pk=pk)
#         office_manager = notification.request.receiver
#         self.check_object_permissions(request, office_manager)
#         if notification.status != 'c':
#             notification.status = 'n'
#             notification.save()
#             return Response({'message': 'notification reject'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'notification connecting before'},
#                             status=status.HTTP_400_BAD_REQUEST)


class ListRequest(APIView):
    def get(self, request):
        officemanager = OfficeManager.objects.get(id=request.user.id)
        requests = Request.objects.filter(receiver=officemanager)
        ser_data = RequestSerializer(requests, many=True)
        if requests.count() > 0:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "شما در حال حاضر درخواستی در سیستم ندارید"}, status=status.HTTP_404_NOT_FOUND)


class GetRequest(APIView):
    def get(self, request, id):
        try:
            stu_request = Request.objects.get(id=id)
            ser_data = RequestSerializer(stu_request)
            return Response(data=ser_data.data, status=status.HTTP_404_NOT_FOUND)
        except ObjectDoesNotExist:
            return Response({"message": "not found"}, status=status.HTTP_404_NOT_FOUND)