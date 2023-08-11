from rest_framework import serializers
from accounts.models import School, OfficeManager


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"


class SchoolSerializerByOfficeManager(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        extra_kwargs = {
            'office_manager': {'read_only': True}
        }


class SchoolSerializerBySchoolManager(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        extra_kwargs = {
            'office_manager': {'read_only': True},
            'manager': {'read_only': True},
        }
