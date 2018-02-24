from django.contrib.auth import get_user_model
from rest_framework import serializers

from recruitmentapp.apps.core.models import Applicant, Competence, \
    Availability, CompetenceProfile

User = get_user_model()


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = ('id', 'name')


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('start', 'end')


class CompetenceProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetenceProfile
        fields = ('competence', 'experience')


class ApplicantSerializer(serializers.Serializer):
    """Combines fields from a User and an associated Applicant.

    Should be given an Applicant when instantiated.
    """

    username = serializers.CharField(
        source='user.username',
        max_length=150,
    )
    password = serializers.CharField(source='user.password')
    first_name = serializers.CharField(
        source='user.first_name',
        max_length=30,
        required=False,
        allow_blank=False,
    )
    last_name = serializers.CharField(
        source='user.last_name',
        max_length=150,
        required=False,
        allow_blank=False,
    )
    email = serializers.EmailField(source='user.email')
    social_security_number = serializers.CharField(max_length=20)
    competences = CompetenceProfileSerializer(
        many=True,
        required=False,
        read_only=False,
    )
    availabilities = AvailabilitySerializer(
        many=True,
        required=False,
        read_only=False,
    )

    def create(self, validated_data):
        """Create a new applicant from validated data."""

        user = User.objects.create_user(
            username=validated_data['user']['username'],
            password=validated_data['user']['password'],
            first_name=validated_data['user'].get('first_name', ''),
            last_name=validated_data['user'].get('last_name', ''),
            email=validated_data['user']['email'],
        )
        applicant = Applicant.objects.create(
            user=user,
            social_security_number=validated_data["social_security_number"]
        )

        # Availabilities and competences
        self._update_availabilities(applicant, validated_data)
        self._update_competences(applicant, validated_data)

        return applicant

    def update(self, instance, validated_data):
        """Update an existing applicant with validated data."""

        # User fields
        self._update_user(instance.user, validated_data)

        # Availabilities and competences
        self._update_availabilities(instance, validated_data)
        self._update_competences(instance, validated_data)

        # Applicant fields
        instance.social_security_number = validated_data.get(
            "social_security_number",
            instance.social_security_number
        )
        instance.save()

        return instance

    def _update_user(self, user, validated_data):
        """Update user with validated applicant data."""

        if 'user' not in validated_data:
            return
        user_data = validated_data['user']

        user.username = user_data.get("username", user.username)
        if "password" in user_data:
            user.set_password(user_data["password"])
        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.email = user_data.get("email", user.email)
        user.save()

    def _update_availabilities(self, instance, validated_data):
        """Update availabilities of applicant with validated data."""

        if 'availabilities' not in self.initial_data:
            return
        instance.availabilities.all().delete()
        for availability in validated_data['availabilities']:
            serializer = AvailabilitySerializer(data=availability)
            serializer.is_valid()
            serializer.save(applicant=instance)

    def _update_competences(self, instance, validated_data):
        """Update competences of applicant with validated data."""

        if 'competences' not in self.initial_data:
            return

        existing = {c.competence.pk: c for c in instance.competences.all()}
        new = {c['competence'].pk: c for c in validated_data['competences']}

        # Create new and update existing competence profiles
        for competence, competence_profile in new.items():
            # Set to pk instead of Competence instance
            competence_profile['competence'] = competence
            if competence in existing:
                serializer = CompetenceProfileSerializer(
                    existing[competence],
                    data=competence_profile
                )
            else:
                serializer = CompetenceProfileSerializer(
                    data=competence_profile
                )
            serializer.is_valid()
            serializer.save(applicant=instance)

        # Delete competence profiles
        for competence, competence_profile in existing.items():
            if competence not in new:
                competence_profile.delete()
