from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager


# Create your models here.

class User(AbstractBaseUser):
    gender_choices = (
        ('m', 'male'),
        ('f', 'female'),
        ('n', None)
    )
    username = models.CharField(max_length=100, unique=True)
    national_code = models.CharField(max_length=10, unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=11, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True, max_length=200)
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    birthday_date = models.DateTimeField(null=True, blank=True)
    gender = models.CharField(max_length=100, choices=gender_choices, default='n')
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    avatar = models.ImageField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    personal_code = models.CharField(max_length=8, null=True, blank=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["phone_number", "email"]

    objects = UserManager()

    def __str__(self):
        return f'{self.first_name}-{self.last_name}-{self.national_code} - {self.id}'

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Role(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()


class Operation(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()


class RoleOperation(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="role")
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, related_name="operation")


class Teacher(User):
    field = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    Level_of_education = models.CharField(max_length=200)


class OfficeManager(User):
    region = models.PositiveSmallIntegerField()


class School(models.Model):
    title_choices = (
        ('k', 'kar-danesh'),
        ('f', 'fani'),
        ('d', 'dabirestan'),
        ('n', None)
    )
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    established_year = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    city = models.CharField(max_length=200)
    region = models.PositiveSmallIntegerField()
    capacity = models.PositiveSmallIntegerField(default=0)
    manager = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(choices=title_choices, default='n', max_length=100)
    teacher = models.ManyToManyField(Teacher, related_name='teacher_to_school')
    office_manager = models.ForeignKey(OfficeManager, on_delete=models.CASCADE, related_name='office_to_school')


    def __str__(self):
        return f'{self.name} - {self.capacity}-{self.id}'


class StudentActivity(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    content = models.FileField()
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student_to_activity")
    is_done = models.BooleanField(default=False)


class Professor(User):
    professor_id = models.CharField(max_length=10)
    is_science_committee = models.BooleanField(default=False)


class Student(User):
    student_id = models.CharField(max_length=10)
    field = models.CharField(max_length=200)
    professor2 = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='professor_to_student')
    school2 = models.ForeignKey(School, on_delete=models.CASCADE, related_name='school_to_student', null=True, blank=True)
    teacher2 = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_to_student', null=True, blank=True)





