from django.http import Http404
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404

from rest_framework.response import Response


from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant


class ApplicantViewSet(viewsets.GenericViewSet):

    queryset = Applicant.objects.all()
    serializer = ApplicantSerializer

    def retrieve(self, request, pk=None):
        applicant = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer()
        serializer(applicant)
        return Response(serializer.data)

    def list(self):
        applicants = self.get_queryset()
        serializer = self.get_serializer()
        serializer(applicants, many=True)
        return Response(serializer.data)


