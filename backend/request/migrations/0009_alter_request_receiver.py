# Generated by Django 4.1.7 on 2023-09-12 11:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('request', '0008_alter_request_receiver_alter_request_sender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_receiver', to=settings.AUTH_USER_MODEL),
        ),
    ]