
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username, phone_number,email, password):
        if not password:
            return ValueError("user must have a password")
        if not phone_number:
            return ValueError("user must have a phone number")
        if not username:
            return ValueError("user must have a username")
        if not email:
            return ValueError("user must have a email")
        
        user = self.model(username=username, phone_number=phone_number, email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, phone_number,email, password):
        user = self.create_user(username, phone_number,email, password)
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user



