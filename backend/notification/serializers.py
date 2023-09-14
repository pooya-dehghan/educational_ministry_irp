from rest_framework import serializers
from request.serializers import RequestSerializer


class NotificationSerializer(serializers.Serializer):
    content = serializers.CharField()
    request = RequestSerializer()
