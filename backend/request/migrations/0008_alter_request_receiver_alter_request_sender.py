# Generated by Django 4.1.7 on 2023-09-12 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0020_alter_school_office_manager_alter_school_teacher'),
        ('request', '0007_request_view'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_receiver', to='accounts.officemanager'),
        ),
        migrations.AlterField(
            model_name='request',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_sender', to=settings.AUTH_USER_MODEL),
        ),
    ]
