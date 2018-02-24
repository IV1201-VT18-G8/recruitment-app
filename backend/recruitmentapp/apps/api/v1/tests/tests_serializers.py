import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase

from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant, Availability, \
    CompetenceProfile, Competence

User = get_user_model()


class ApplicantSerializerTests(TestCase):
    def setUp(self):
        self.serializer_class = ApplicantSerializer
        self.competence1 = Competence.objects.create(name='competence1')

    def test_deserialize_create(self):
        data = {
            'username': 'testuser',
            'password': 'testpass',
            'first_name': 'First',
            'email': 'test@example.com',
            'social_security_number': '123456789',
            'availabilities': [
                {
                    'start': '2018-02-24',
                    'end': '2018-03-24',
                },
            ],
        }
        serializer = self.serializer_class(data=data)
        serializer.is_valid()
        serializer.save()
        applicant = Applicant.objects.get(user__username=data['username'])

        self.assertEqual(applicant.user.username, data['username'])
        self.assertEqual(applicant.user.email, data['email'])
        self.assertEqual(
            applicant.social_security_number,
            data['social_security_number']
        )
        self.assertEqual(applicant.availabilities.count(), 1)

        self.assertNotEqual(applicant.user.password, 'testpass')
        self.assertNotEqual(applicant.user.password, '')
        self.assertNotEqual(applicant.user.password, None)

    def test_serialize(self):
        user = User.objects.create(
            username='testuser',
            first_name='First',
        )
        user.set_password('testpass')
        user.save()
        applicant = Applicant.objects.create(
            user=user,
            social_security_number='123456789'
        )
        Availability.objects.create(
            applicant=applicant,
            start=datetime.datetime(year=2018, month=5, day=4),
            end=datetime.datetime(year=2018, month=7, day=3),
        )
        Availability.objects.create(
            applicant=applicant,
            start=datetime.datetime(year=2019, month=5, day=4),
            end=datetime.datetime(year=2019, month=7, day=3),
        )
        competence_profile = CompetenceProfile.objects.create(
            applicant=applicant,
            competence=self.competence1,
            experience=2,
        )

        serializer = self.serializer_class(applicant)

        self.assertEqual(len(serializer.data), 8)
        self.assertEqual(serializer.data['username'], 'testuser')
        self.assertNotEqual(serializer.data['password'], 'testpass')
        self.assertNotEqual(serializer.data['password'], '')
        self.assertNotEqual(serializer.data['password'], None)
        self.assertEqual(
            serializer.data['social_security_number'],
            '123456789'
        )
        self.assertEqual(len(serializer.data['competences']), 1)
        self.assertEqual(
            serializer.data['competences'][0]['experience'],
            2
        )
        self.assertEqual(len(serializer.data['availabilities']), 2)

    def test_update(self):
        user = User.objects.create(
            username='testuser',
            first_name='First',
        )
        user.set_password('testpass')
        user.save()
        applicant = Applicant.objects.create(
            user=user,
            social_security_number='123456789'
        )
        Availability.objects.create(
            applicant=applicant,
            start=datetime.datetime(year=2019, month=5, day=4),
            end=datetime.datetime(year=2019, month=7, day=3),
        )

        oldpass = user.password

        data = {
            'last_name': 'Last',
            'password': 'newpass',
            'social_security_number': '987654321',
            'availabilities': [
                {
                    'start': '2018-02-24',
                    'end': '2018-03-24',
                },
            ],
        }

        serializer = self.serializer_class(applicant, data=data, partial=True)
        serializer.is_valid()
        serializer.save()

        applicant = Applicant.objects.get(user__username='testuser')

        self.assertEqual(applicant.user.last_name, data['last_name'])
        self.assertEqual(applicant.social_security_number, '987654321')
        self.assertEqual(applicant.availabilities.count(), 1)
        self.assertEqual(applicant.availabilities.first().start.year, 2018)
        self.assertEqual(applicant.availabilities.first().start.month, 2)
        self.assertEqual(applicant.availabilities.first().start.day, 24)
        self.assertNotEqual(applicant.user.password, oldpass)
        self.assertNotEqual(applicant.user.password, 'testpass')
        self.assertNotEqual(applicant.user.password, 'newpass')
        self.assertNotEqual(applicant.user.password, '')
        self.assertNotEqual(applicant.user.password, None)
