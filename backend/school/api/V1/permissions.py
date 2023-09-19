from rest_framework import permissions
from accounts.models import OfficeManager
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a superuser or official manager
        return request.user.is_admin  # or request.user.is_official manager
        # we should complete this code after fixing registrations


class IsSuperuserOrOfficeManager(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and OfficeManager.objects.filter(id=request.user.id).exists():
            return True
        else:
            return False


class IsSuperuserOrOwnOfficeManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and OfficeManager.objects.filter(
                id=request.user.id).exists() and obj.id == request.user.id:
            return True
        else:
            return False


class IsSuperuserOrOwnOfficeManagerOrOwnSchoolManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        office_manager = obj.office_manager
        if request.method in SAFE_METHODS:
            return True
        elif request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and OfficeManager.objects.filter(
                id=request.user.id).exists() and office_manager.id == request.user.id:
            return True
        elif request.user.is_authenticated and obj.id == request.user.id:
            return True
        else:
            return False

