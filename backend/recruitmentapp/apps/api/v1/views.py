from django.db import IntegrityError, transaction
from django.utils.translation import ugettext_lazy as _
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from recruitmentapp.apps.api.v1.permissions import IsRecruiterOrStaff, \
    IsApplicantSelfOrRecruiterOrStaff
from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer, \
    CompetenceSerializer
from recruitmentapp.apps.core.models import Applicant, Competence


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
            permission_classes = [IsRecruiterOrStaff]
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

        ### Notes
        - The list of `availabilities` will, if present (even if empty),
        completely replace all existing availabilities.
        - The list of `competences` will, if present (event if empty),
        completely replace (or update, where appropriate) all existing
        competence profiles.

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
        with transaction.atomic():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        """Delete a single applicant and their user account.

        ### Permissions
        User must be the applicant themselves, a recruiter or staff member.
        """

        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        self.check_object_permissions(request, applicant)
        with transaction.atomic():
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
        with transaction.atomic():
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


class CompetenceViewSet(viewsets.ModelViewSet):
    """Viewset for applicants and recruiters to view competences.
    """

    queryset = Competence.objects.all()
    serializer_class = CompetenceSerializer

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.action == 'create':
            permission_classes.append(IsRecruiterOrStaff)
        return [permission() for permission in permission_classes]

    def list(self, request):
        """List all competences.

        ### Permissions
        All authenticated users.
        """

        queryset = Competence.objects.all()
        serializer = CompetenceSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Retrieve a single competence.

        ### Permissions
        All authenticated users.

        """

        queryset = Competence.objects.all()
        competence = get_object_or_404(queryset, pk=pk)
        serializer = CompetenceSerializer(competence)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """Create a new competence.

        ### Permissions
        All authenticated recruiters and staff.
        """

        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
