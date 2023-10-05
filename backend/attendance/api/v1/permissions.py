from rest_framework import permissions
from accounts.models import Student


class IsSuperuserOrSchoolManager(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        elif request.user.is_authenticated and Student.objects.filter(id=obj.id).exists() and \
                obj.school2 is not None and obj.school2.id == request.user.id:
            return True
        return False
