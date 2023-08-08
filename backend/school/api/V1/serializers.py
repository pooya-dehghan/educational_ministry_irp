from rest_framework import serializers
from accounts.models import School, OfficeManager


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"


class SchoolSerializerByOfficeManager(serializers.ModelSerializer):
    class Meta:
        model = School
        exclude = ['office_manager']
