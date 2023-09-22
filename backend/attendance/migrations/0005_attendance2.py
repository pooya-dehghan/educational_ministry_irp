# Generated by Django 4.1.7 on 2023-09-21 17:56

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0020_alter_school_office_manager_alter_school_teacher'),
        ('attendance', '0004_remove_attendance_enterance_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now, verbose_name='تاریخ')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.student', verbose_name='دانشجو')),
            ],
        ),
    ]