from rest_framework import serializers
from ...models import Task, RenderTask


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ("professor",)


class RenderTaskUploadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RenderTask
        fields = ("file",)
