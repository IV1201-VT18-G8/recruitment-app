from django.contrib.auth import get_user_model
from django.test import TestCase

from recruitmentapp.apps.api.v1.serializers import ApplicantSerializer
from recruitmentapp.apps.core.models import Applicant

User = get_user_model()


class ApplicantSerializerTests(TestCase):
    def setUp(self):
        self.serializer_class = ApplicantSerializer

    def test_deserialize_create(self):
        data = {
            'username': 'testuser',
            'password': 'testpass',
            'first_name': 'First',
            'email': 'test@example.com',
            'social_security_number': '123456789',
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

        self.assertNotEqual(applicant.user.password, 'testpass')
        self.assertNotEqual(applicant.user.password, '')
        self.assertNotEqual(applicant.user.password, None)

    def test_deserialize_create_with_existing_user(self):
        data = {
            'username': 'testuser',
            'password': 'testpass',
            'first_name': 'First',
            'last_name': 'Last',
            'email': 'test@example.com',
            'social_security_number': '123456789',
        }

        user = User.objects.create(
            username=data['username'],
            password=data['password']
        )

        serializer = self.serializer_class(data=data)
        serializer.is_valid()
        serializer.save()

        applicant = Applicant.objects.get(pk=user.pk)

        self.assertEqual(applicant.user.username, data['username'])
        self.assertEqual(applicant.user.email, data['email'])
        self.assertEqual(
            applicant.social_security_number,
            data['social_security_number']
        )

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

        oldpass = user.password

        data = {
            'last_name': 'Last',
            'password': 'newpass',
            'social_security_number': '987654321',
        }

        serializer = self.serializer_class(applicant, data=data, partial=True)
        serializer.is_valid()
        serializer.save()

        applicant = Applicant.objects.get(user__username='testuser')

        self.assertEqual(applicant.user.last_name, data['last_name'])
        self.assertEqual(applicant.social_security_number, '987654321')
        self.assertNotEqual(applicant.user.password, oldpass)
        self.assertNotEqual(applicant.user.password, 'testpass')
        self.assertNotEqual(applicant.user.password, 'newpass')
        self.assertNotEqual(applicant.user.password, '')
        self.assertNotEqual(applicant.user.password, None)
