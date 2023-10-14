from rest_framework import serializers
from ...models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ("professor",)


class TaskUploadingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=("file",)
