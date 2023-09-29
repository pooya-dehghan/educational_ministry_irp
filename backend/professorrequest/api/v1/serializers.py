from rest_framework import serializers
from ...models import ProfessorRequest


class ProfessorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessorRequest
        fields = '__all__'
