from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from accounts.models import Student


class IsSuperuserOrStudent(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and Student.objects.filter(manager=request.user).exists():
            # Check if the requesting user is a manager of any school
            return True
        else:
            return False
