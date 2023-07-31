from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsSuperuserOrSchoolManager(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif request.user.is_authenticated and request.user.is_superuser:
            return True
        elif request.user.is_authenticated and request.user.school_set.filter(manager=request.user).exists():
            # Check if the requesting user is a manager of any school
            return True
        else:
            return False


class IsSuperuser(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user.is_superuser


