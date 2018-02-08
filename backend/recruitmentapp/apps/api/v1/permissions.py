from rest_framework.permissions import BasePermission


class IsRecruiter(BasePermission):
    """The user is a recruiter."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_recruiter
