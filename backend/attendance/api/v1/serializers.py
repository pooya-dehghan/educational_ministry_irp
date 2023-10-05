from rest_framework import serializers


class DateSerializer(serializers.Serializer):

    date = serializers.DateField(error_messages={
            'required': 'فیلد الزامی است.',
            'blank': 'نمی‌تواند خالی باشد.',
        })