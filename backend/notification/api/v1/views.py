from rest_framework.views import APIView
from ...models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({'message': 'همچین شخصی وجود ندارد', 'Success': False}, status=status.HTTP_404_NOT_FOUND)
        seen_param = request.query_params.get('seen')
        unseen_param = request.query_params.get('unseen')
        print(seen_param)
        print(unseen_param)

        queryset = Notification.objects.filter(receiver=request.user)

        if seen_param == '1':
            print("seen")
            queryset = Notification.objects.filter(view="s", receiver=request.user)

        elif unseen_param == '1':
            print("unseen")
            queryset = Notification.objects.filter(view="u", receiver=request.user)

        elif seen_param == '1' and unseen_param == '1':
            print("all")

        ser_data = NotificationSerializer(queryset, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class NotificationGet(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to see one of his notification.

            The request should include the id of notification

            """,
        operation_summary="endpoint for see one of notification",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, pk):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({'message': 'همچین شخصی وجود ندارد', 'Success': False}, status=status.HTTP_404_NOT_FOUND)
        notification = Notification.objects.filter(receiver=user, id=pk)
        ser_data = NotificationSerializer(notification, many=True)
        if notification.count() > 0:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": " شما همجین  درخواستی در سیستم ندارید", 'Success': False}, status=status.HTTP_404_NOT_FOUND)


class SeenNotification(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows user to seen a notification.

            The request should include the id of notification

            """,
        operation_summary="endpoint for seen notification",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def post(self, request, pk):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({'message': 'همچین شخصی وجود ندارد', 'Success': False}, status=status.HTTP_404_NOT_FOUND)
        notification = Notification.objects.filter(receiver=user, id=pk).first()
        if notification:
            notification.view = 's'
            notification.save()
            return Response({'message':'نوتیفیکیشن سین شد', 'Success': True}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'همچین نوتیفیکیشنی وجود ندارد', 'Success': False}, status=status.HTTP_404_NOT_FOUND)


