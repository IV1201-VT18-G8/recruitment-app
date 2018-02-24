import datetime

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from recruitmentapp.apps.core.models import Applicant, Recruiter, \
    Availability, Competence, CompetenceProfile

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

    def test_destroy_applicant_as_recruiter(self):
        """An applicant can be deleted."""

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        recruiter = User.objects.create_user(
            username="recruiter", password="pass")
        Recruiter.objects.create(user=recruiter)

        self.client.force_authenticate(user=recruiter)
        response = self.client.delete(self.url + str(applicant_user.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Applicant.DoesNotExist):
            self.assertTrue(Applicant.objects.get(pk=applicant_user.pk))
        with self.assertRaises(User.DoesNotExist):
            self.assertTrue(User.objects.get(pk=applicant_user.pk).empty())

    def test_destroy_applicant_as_self(self):
        """An applicant can delete themselves."""

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")

        self.client.force_authenticate(user=applicant_user)
        response = self.client.delete(self.url + str(applicant_user.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Applicant.DoesNotExist):
            self.assertTrue(Applicant.objects.get(pk=applicant.pk))
        with self.assertRaises(User.DoesNotExist):
            self.assertTrue(User.objects.get(pk=applicant_user.pk).empty())

    def test_destroy_applicant_other(self):
        """An applicant cannot delete another applicant."""

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        applicant2_user = User.objects.create_user(
            username="applicant2", password="pass")
        applicant2 = Applicant.objects.create(
            user=applicant2_user, social_security_number="345634563456")

        self.client.force_authenticate(user=applicant2_user)
        response = self.client.delete(self.url + str(applicant_user.pk) + '/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_applicant_self(self):
        """An applicant can update their own data."""

        data = {
            'first_name': 'First',
            'social_security_number': '1337',
            'password': '1337',
        }

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")

        self.client.force_authenticate(user=applicant_user)
        response = self.client.patch(
            self.url + str(applicant_user.pk) + '/',
            data=data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'First')
        self.assertEqual(response.data['social_security_number'], '1337')
        self.assertNotEqual(response.data['password'], 'pass')
        self.assertNotEqual(response.data['password'], '1337')
        self.assertNotEqual(response.data['password'], '')
        self.assertNotEqual(response.data['password'], None)

    def test_partial_update_applicant_as_recruiter(self):
        """A recruiter can update an applicant."""

        data = {
            'first_name': 'First',
            'social_security_number': '1337',
            'password': '1337',
        }

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        recruiter = User.objects.create_user(
            username="recruiter", password="pass")
        Recruiter.objects.create(user=recruiter)

        self.client.force_authenticate(user=recruiter)
        response = self.client.patch(
            self.url + str(applicant_user.pk) + '/',
            data=data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'First')
        self.assertEqual(response.data['social_security_number'], '1337')
        self.assertNotEqual(response.data['password'], 'pass')
        self.assertNotEqual(response.data['password'], '1337')
        self.assertNotEqual(response.data['password'], '')
        self.assertNotEqual(response.data['password'], None)

    def test_partial_update_applicant_other(self):
        """An applicant cannot update another applicant."""

        data = {
            'first_name': 'First',
            'social_security_number': '1337',
            'password': '1337',
        }

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        applicant2_user = User.objects.create_user(
            username="applicant2", password="pass")
        applicant2 = Applicant.objects.create(
            user=applicant2_user, social_security_number="345634563456")

        self.client.force_authenticate(user=applicant2_user)
        response = self.client.patch(
            self.url + str(applicant_user.pk) + '/',
            data=data
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_availabilities_self(self):
        """An applicant can update their availabilities."""

        data = {
            'availabilities': [
                {
                    'start': '2018-02-24',
                    'end': '2018-03-24',
                }
            ],
        }

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        Availability.objects.create(
            applicant=applicant,
            start=datetime.datetime(year=2018, month=5, day=2),
            end=datetime.datetime(year=2018, month=6, day=2),
        )

        self.client.force_authenticate(user=applicant_user)
        response = self.client.patch(
            self.url + str(applicant_user.pk) + '/',
            data=data,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['availabilities']), 1)
        self.assertEqual(
            response.data['availabilities'][0]['start'],
            '2018-02-24'
        )

    def test_update_competences_self(self):
        """An applicant can update their competences."""

        competence1 = Competence.objects.create(name='competence1')
        competence2 = Competence.objects.create(name='competence2')

        data = {
            'competences': [
                {
                    'competence': competence2.pk,
                    'experience': 2,
                },
            ],
        }

        applicant_user = User.objects.create_user(
            username="applicant", password="pass")
        applicant = Applicant.objects.create(
            user=applicant_user, social_security_number="123412343")
        CompetenceProfile.objects.create(
            applicant=applicant,
            competence=competence1,
            experience=2.3,
        )

        self.client.force_authenticate(user=applicant_user)
        response = self.client.patch(
            self.url + str(applicant_user.pk) + '/',
            data=data,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['competences']), 1)
        self.assertEqual(
            response.data['competences'][0]['competence'],
            competence2.pk
        )
