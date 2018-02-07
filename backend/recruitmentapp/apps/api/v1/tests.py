from django.contrib.auth import get_user_model
from django.test import TestCase

# Create your tests here.
from rest_framework import status
from rest_framework.test import APITestCase

from recruitmentapp.apps.core.models import Applicant

User=get_user_model()


class ApplicantTests(APITestCase):

    def setUp(self):
        self.url = "/api/v1/applicants/"

    def test_get_applicant(self):
        user = User.objects.create_user(username="Kim", password="Kim")
        Applicant.objects.create(user=user, social_security_number="199202103132")
        self.client.force_authenticate(user=user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
