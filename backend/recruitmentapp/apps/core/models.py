from django.contrib.auth.models import AbstractUser
from django.db import models
from parler.models import TranslatedFields, TranslatableModel


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
    applicant = models.ForeignKey(
        Applicant,
        on_delete=models.CASCADE,
        related_name="availabilities"
    )
    start = models.DateField(
        verbose_name="Start date",
        null=False,
        blank=False)
    end = models.DateField(verbose_name="End date", null=True, blank=True)

    def __str__(self):
        return str(self.applicants) + " Start date: " + self.start \
               + " End date: " + self.end


class Competence(TranslatableModel):
    """The work competence an applicant has."""

    translations = TranslatedFields(
        name=models.CharField(max_length=80)
    )

    def __str__(self):
        return self.name


class CompetenceProfile(models.Model):
    """Specifies the number of years of experience that an Applicant has for
    a particular competence.

    Many-to-many intermediate model between Competence and Applicant.
    """

    class Meta:
        unique_together = (('applicant', 'competence'),)

    applicant = models.ForeignKey(
        Applicant,
        related_name='competences',
        on_delete=models.CASCADE,
    )
    competence = models.ForeignKey(
        Competence,
        related_name='profiles',
        on_delete=models.PROTECT,
    )
    experience = models.FloatField(
        verbose_name="Years of experience",
        default=0,
    )

    def __str__(self):
        return '{applicant} - {competence} - {experience} years'.format(
            applicant=str(self.applicant),
            competence=self.competence.name,
            experience=str(self.experience),
        )
