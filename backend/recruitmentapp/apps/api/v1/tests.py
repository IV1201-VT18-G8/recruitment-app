from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

from recruitmentapp.apps.core.models import Applicant, Recruiter

User = get_user_model()


class ApplicantTests(APITestCase):

    def setUp(self):
        self.url = "/api/v1/applicants/"

    def test_list_applicants_as_recruiter(self):
        """Recruiters can list applicants."""

        applicant = User.objects.create_user(
            username="applicant", password="pass")
        Applicant.objects.create(
            user=applicant, social_security_number="123412343")

        recruiter = User.objects.create_user(
            username="recruiter", password="pass")
        Recruiter.objects.create(user=recruiter)
        self.client.force_authenticate(user=recruiter)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_applicants_as_applicant(self):
        """Applicants cannot list applicants."""

        user = User.objects.create_user(username="user1", password="pass")
        Applicant.objects.create(user=user, social_security_number="12341234")
        self.client.force_authenticate(user=user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_applicants_unauthenticated(self):
        """Unauthenticated users cannot list applicants."""

        user = User.objects.create_user(username="user1", password="pass")
        Applicant.objects.create(user=user, social_security_number="12341234")
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
