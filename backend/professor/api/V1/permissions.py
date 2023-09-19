from rest_framework.permissions import BasePermission


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
