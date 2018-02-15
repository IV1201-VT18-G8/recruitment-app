from rest_framework.permissions import BasePermission


class IsRecruiterOrStaff(BasePermission):
    """The user is a recruiter or staff member."""

    def has_permission(self, request, view):
        return request.user.is_authenticated \
               and (request.user.is_recruiter or request.user.is_staff)
