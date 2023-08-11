from rest_framework import serializers
from accounts.models import OfficeManager


class OfficeManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeManager
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
