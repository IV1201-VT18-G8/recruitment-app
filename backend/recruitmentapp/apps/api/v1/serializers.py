from django.contrib.auth import get_user_model
from rest_framework import serializers

from recruitmentapp.apps.core.models import Applicant, Competence, Availability, CompetenceProfile

User = get_user_model()


class ApplicantSerializer(serializers.Serializer):
    """Combines fields from a User and an associated Applicant.

    Should be given an Applicant when instantiated.
    """

    username = serializers.CharField(
        source='user.username',
        max_length=150
    )
    password = serializers.CharField(source='user.password')
    first_name = serializers.CharField(
        source='user.first_name',
        max_length=30,
        required=False,
        allow_blank=False
    )
    last_name = serializers.CharField(
        source='user.last_name',
        max_length=150,
        required=False,
        allow_blank=False
    )
    email = serializers.EmailField(source='user.email')
    social_security_number = serializers.CharField(max_length=20)

    def create(self, validated_data):
        """Create a new applicant from validated data."""

        user = self._create_or_update_user(validated_data)
        applicant = Applicant.objects.create(
            user=user,
            social_security_number=validated_data["social_security_number"]
        )

        return applicant

    def update(self, instance, validated_data):
        """Update an existing applicant with validated data."""

        # User fields
        self._update_user(instance.user, validated_data)

        # Applicant fields
        instance.social_security_number = validated_data.get(
            "social_security_number",
            instance.social_security_number
        )

        instance.save()
        return instance

    def _create_or_update_user(self, validated_data):
        """Update existing User with username
        `validated_data['user']['username']` or create a new user if no such
        user exists.
        """

        try:
            # Update User
            user = User.objects.get(
                username__exact=validated_data['user']['username']
            )
            self._update_user(user, validated_data)
            return user
        except User.DoesNotExist:
            # Create User
            return User.objects.create_user(
                username=validated_data['user']['username'],
                password=validated_data['user']['password'],
                first_name=validated_data['user'].get('first_name', ''),
                last_name=validated_data['user'].get('last_name', ''),
                email=validated_data['user']['email'],
            )

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

# Alternative fields variable in all ModelSerializers below:
# fields = '__all__'


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = ('id', 'name')


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('applicant', 'start', 'end')


class CompetenceProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetenceProfile
        fields = ('applicant', 'competence', 'experience')
