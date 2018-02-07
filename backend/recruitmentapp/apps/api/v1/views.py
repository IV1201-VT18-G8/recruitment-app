from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404

from rest_framework.response import Response

from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant


class ApplicantViewSet(viewsets.GenericViewSet):

    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def retrieve(self, request, pk=None):
        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer_class()
        serializer(applicant)
        return Response(serializer.data)

    def list(self, request):
        applicants = self.get_queryset()
        serializer = self.get_serializer_class()(applicants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
