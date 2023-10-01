from rest_framework.permissions import BasePermission
from accounts.models import Professor


class IsSuperuser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin


class IsSuperuserOrOwnProfessor(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and obj.id == request.user.id:
            return True
        else:
            return False


class IsSuperuserOrProfessor(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and Professor.objects.filter(id=request.user.id).exists():
            return True
        return False