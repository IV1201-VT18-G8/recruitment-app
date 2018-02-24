from rest_framework.permissions import BasePermission


class IsRecruiterOrSelfOrStaff(BasePermission):
    """The user is a recruiter or staff member."""

    def has_permission(self, request, view):
        return request.user.is_authenticated \
            and (
                request.user.is_recruiter
                or request.user.is_staff
            )


class IsApplicantSelfOrRecruiterOrStaff(BasePermission):
    """The user is the applicant themselves, a recruiter or staff member."""

    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated \
            and (
                request.user.is_recruiter
                or request.user.is_staff
                or request.user == obj.user
            )
