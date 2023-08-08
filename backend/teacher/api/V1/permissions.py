from rest_framework.permissions import BasePermission, SAFE_METHODS
from accounts.models import School, Teacher


class IsSuperuserOrSchoolManager(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and School.objects.filter(manager=request.user).exists():
            # Check if the requesting user is a manager of any school
            return True
        else:
            return False


class IsSuperuser(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user.is_authenticated and request.user.is_admin


class IsSuperuserOrOwnTeacher(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        elif request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and obj.id == request.user.id:
            return True
        else:
            return False


