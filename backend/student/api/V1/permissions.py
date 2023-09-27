from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from accounts.models import Student


class IsSuperuserOrOwnStudent(BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and obj.id == request.user.id:
            return True
        else:
            return False


class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a superuser or official manager
        return request.user.is_authenticated and request.user.is_admin  # or request.user.is_official manager
        # we should complete this code after fixing registrations


class IsSuperuserOrStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and Student.objects.filter(id=request.user.id).exists():
            return True
        return False
