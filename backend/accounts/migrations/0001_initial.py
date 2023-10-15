# Generated by Django 4.2.6 on 2023-10-12 21:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('national_code', models.CharField(blank=True, max_length=10, null=True, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=11, null=True, unique=True)),
                ('email', models.EmailField(max_length=200, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=200, null=True)),
                ('last_name', models.CharField(blank=True, max_length=200, null=True)),
                ('birthday_date', models.DateTimeField(blank=True, null=True)),
                ('gender', models.CharField(choices=[('m', 'male'), ('f', 'female'), ('n', None)], default='n', max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('is_admin', models.BooleanField(default=False)),
                ('personal_code', models.CharField(blank=True, max_length=8, null=True, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Operation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='OfficeManager',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('region', models.PositiveSmallIntegerField(unique=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('professor_id', models.CharField(max_length=10, unique=True)),
                ('is_science_committee', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=200, null=True)),
                ('established_year', models.DateField(blank=True, null=True)),
                ('city', models.CharField(max_length=200)),
                ('region', models.PositiveSmallIntegerField()),
                ('capacity', models.PositiveSmallIntegerField(default=0)),
                ('manager', models.CharField(max_length=200)),
                ('title', models.CharField(choices=[('k', 'kar-danesh'), ('f', 'fani'), ('d', 'dabirestan'), ('n', None)], default='n', max_length=100)),
                ('office_manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='office_to_school', to='accounts.officemanager')),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('field', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=200, null=True)),
                ('Level_of_education', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
        migrations.CreateModel(
            name='StudentActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('content', models.FileField(upload_to='')),
                ('is_done', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_to_activity', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoleOperation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='operation', to='accounts.operation')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='role', to='accounts.role')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('studentUniqueCode', models.CharField(max_length=10, unique=True)),
                ('field', models.CharField(blank=True, default='computer', max_length=200, null=True)),
                ('is_reject', models.BooleanField(default=False)),
                ('rejected_professors', models.CharField(blank=True, max_length=10000, null=True)),
                ('professor2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='professor_to_student', to='accounts.professor')),
                ('school2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='school_to_student', to='accounts.school')),
                ('teacher2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='teacher_to_student', to='accounts.teacher')),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
        migrations.AddField(
            model_name='school',
            name='teacher',
            field=models.ManyToManyField(blank=True, null=True, related_name='teacher_to_school', to='accounts.teacher'),
        ),
    ]