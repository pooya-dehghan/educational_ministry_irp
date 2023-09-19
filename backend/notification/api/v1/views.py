from rest_framework.views import APIView
from ...models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from rest_framework.permissions import IsAuthenticated

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(id=request.id)
        except:
            return Response({"message":"this user does not exists"})
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
