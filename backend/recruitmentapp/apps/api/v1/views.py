from django.db import IntegrityError
from django.utils.translation import ugettext_lazy as _
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from recruitmentapp.apps.api.v1.permissions import IsRecruiterOrSelfOrStaff, \
    IsApplicantSelfOrRecruiterOrStaff
from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant


class ApplicantViewSet(viewsets.GenericViewSet):
    """Viewset for recruiters to manage applicants/applications, and for
    applicants to manage their own data.
    """

    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action in [
                'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsApplicantSelfOrRecruiterOrStaff]
        else:
            permission_classes = [IsRecruiterOrSelfOrStaff]
        return [permission() for permission in permission_classes]

    def retrieve(self, request, pk=None):
        """Retrieve a single applicant.

        ### Permissions
        User must be the applicant themselves, a recruiter or staff member.
        """

        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        self.check_object_permissions(request, applicant)
        serializer = self.get_serializer_class()(applicant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        """Update a single applicant.

        ### Permissions
        User must be the applicant themselves, a recruiter or staff member.
        """

        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        self.check_object_permissions(request, applicant)
        serializer = self.get_serializer_class()(
            applicant,
            data=request.data,
            partial=True
        )
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        """Delete a single applicant and their user account.

        ### Permissions
        User must be the applicant themselves, a recruiter or staff member.
        """

        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        self.check_object_permissions(request, applicant)
        applicant.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request):
        """List all applicants.

        ### Permissions
        User must be a recruiter or staff member.
        """

        applicants = self.get_queryset()
        serializer = self.get_serializer_class()(applicants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """Create an applicant.

        ### Permissions
        All have access.
        """

        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except IntegrityError:
            return Response(
                data={
                    'detail': _(
                        'Failed to register applicant. The '
                        'specified username or email address may be taken.'
                    )
                },
                status=status.HTTP_409_CONFLICT,
            )
        return Response(
            data=serializer.data,
            status=status.HTTP_201_CREATED
        )
