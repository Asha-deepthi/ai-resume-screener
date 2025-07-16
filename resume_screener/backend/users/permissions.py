from rest_framework.permissions import BasePermission

class IsHRUser(BasePermission):
    """
    Allows access only to users with role='hr' (case-insensitive).
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role.lower() == 'hr'
        )
