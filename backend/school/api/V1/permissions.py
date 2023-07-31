from rest_framework import permissions


class IsSuperuserOrOfficialManager(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a superuser or official manager
        return request.user.is_admin  # or request.user.is_official manager
        # we should complete this code after fixing registrations
