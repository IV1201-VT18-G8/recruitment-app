from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404

from rest_framework.response import Response

from recruitmentapp.apps.api.v1.permissions import IsRecruiterOrStaff
from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant


class ApplicantViewSet(viewsets.GenericViewSet):
    """Viewset for recruiters to manage applicants/applications, and for
    applicants to manage their own data.
    """

    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = (IsRecruiterOrStaff,)

    def retrieve(self, request, pk=None):
        """Retrieve a single applicant.

        ### Permissions
        User must be a recruiter or staff member.
        TODO: Enable applicants to retrieve their own data.
        """

        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer_class()(applicant)
        return Response(serializer.data)

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

        """
