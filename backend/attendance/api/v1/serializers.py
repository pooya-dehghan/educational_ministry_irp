from rest_framework import serializers
from attendance.models import Attendance


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('date',)
