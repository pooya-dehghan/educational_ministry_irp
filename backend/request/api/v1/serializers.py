from rest_framework import serializers
from ...models import Request


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'
