# Generated by Django 4.1.7 on 2023-09-29 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professorrequest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professorrequest',
            name='status',
            field=models.CharField(choices=[('n', 'not sent'), ('s', 'Sent'), ('na', 'not accepted'), ('a', 'Accepted')], default='s', max_length=100),
        ),
    ]