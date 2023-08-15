from rest_framework import serializers
from accounts.models import Professor


class ProfessorSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = Professor
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }