# Generated by Django 4.2.6 on 2023-10-13 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professorrequest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professorrequest',
            name='username',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
