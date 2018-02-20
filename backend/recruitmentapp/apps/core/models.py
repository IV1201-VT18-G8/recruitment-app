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


class Availability(models.Model):
    """The dates an applicant is available to work."""
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name="availabilities")
    start = models.DateField(verbose_name="Start date", null=False, blank=False)
    end = models.DateField(verbose_name="End date", null=True, blank=True)

    def __str__(self):
        return str(self.applicants) + self.start + "-" + self.end


class Competence(models.Model):
    """The work competence an applicant has."""
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name
