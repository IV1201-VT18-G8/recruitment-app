from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

from recruitmentapp.apps.core.models import Applicant, Recruiter

User = get_user_model()


class LoginTests(APITestCase):
    def setUp(self):
        self.url = "/api/v1/login/"

    def test_login_applicant(self):
        username = 'testuser'
        password = 'asdfasdf'

        user = User.objects.create_user(
            username=username, password=password)
        Applicant.objects.create(
            user=user, social_security_number="123412343")

        self.client.force_authenticate(user=None)
        response = self.client.post(
            self.url,
            {
                'username': username,
                'password': password,
            }
        )
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.data['user_id'], user.pk)
        self.assertEqual(response.data['is_applicant'], True)
        self.assertEqual(response.data['is_recruiter'], False)

    def test_login_recruiter(self):
        username = 'testuser'
        password = 'asdfasdf'

        user = User.objects.create_user(
            username=username, password=password)
        Recruiter.objects.create(user=user)

        self.client.force_authenticate(user=None)
        response = self.client.post(
            self.url,
            {
                'username': username,
                'password': password,
            }
        )
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.data['user_id'], user.pk)
        self.assertEqual(response.data['is_applicant'], False)
        self.assertEqual(response.data['is_recruiter'], True)


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

    def test_retrieve_applicant(self):
        """An applicant can be retrieved."""

        applicant = User.objects.create_user(
            username="applicant", password="pass")
        Applicant.objects.create(
            user=applicant, social_security_number="123412343")
        recruiter = User.objects.create_user(
            username="recruiter", password="pass")
        Recruiter.objects.create(user=recruiter)

        self.client.force_authenticate(user=recruiter)
        response = self.client.get(self.url + str(applicant.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_applicant_as_applicant(self):
        """An applicant cannot retrieve other applicants."""

        applicant = User.objects.create_user(
            username="applicant", password="pass")
        Applicant.objects.create(
            user=applicant, social_security_number="123412343")
        applicant2 = User.objects.create_user(
            username="applicant2", password="pass")
        Applicant.objects.create(
            user=applicant2, social_security_number="123412343")

        self.client.force_authenticate(user=applicant2)
        response = self.client.get(self.url + str(applicant.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_applicant_as_self(self):
        """An applicant can retrieve themselves."""

        applicant = User.objects.create_user(
            username="applicant", password="pass")
        Applicant.objects.create(
            user=applicant, social_security_number="123412343")

        self.client.force_authenticate(user=applicant)
        response = self.client.get(self.url + str(applicant.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_applicant_not_found(self):
        """404 is returned if applicant is not found."""

        recruiter = User.objects.create_user(
            username="recruiter", password="pass")
        Recruiter.objects.create(user=recruiter)

        self.client.force_authenticate(user=recruiter)
        response = self.client.get(self.url + '4/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_applicant(self):
        """An applicant can be created."""

        data = {
            'username': 'testuser',
            'password': 'testpass',
            'first_name': 'First',
            'last_name': 'Last',
            'email': 'test@example.com',
            'social_security_number': '123456789',
        }

        self.client.force_authenticate(user=None)
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_applicant_username_exists(self):
        """Two applicants cannot have the same username."""

        user = User.objects.create_user(
            username="testuser", password="pass")
        data = {
            'username': 'testuser',
            'password': 'testpass',
            'first_name': 'First',
            'last_name': 'Last',
            'email': 'test@example.com',
            'social_security_number': '123456789',
        }

        self.client.force_authenticate(user=None)
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
