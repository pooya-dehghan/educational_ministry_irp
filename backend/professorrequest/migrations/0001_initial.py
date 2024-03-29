# Generated by Django 4.2.6 on 2023-10-12 21:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfessorRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(max_length=200)),
                ('code', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('status', models.CharField(choices=[('n', 'not sent'), ('s', 'Sent'), ('na', 'not accepted'), ('a', 'Accepted')], default='s', max_length=100)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='register_request_professor', to='accounts.professor')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='register_request_student', to='accounts.student')),
            ],
        ),
    ]
