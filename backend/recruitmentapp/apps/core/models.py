from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Used for authentication of all users."""

    def __str__(self):
        return self.username

    @property
    def is_recruiter(self):
        return hasattr(self, 'recruiter') and self.recruiter is not None

    @property
    def is_applicant(self):
        return hasattr(self, 'applicant') and self.applicant is not None


class Applicant(models.Model):
    """A person who is applying for a job."""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    social_security_number = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username


class Recruiter(models.Model):
    """A person who is recruiting from among the applicants."""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    def __str__(self):
        return self.user.username
