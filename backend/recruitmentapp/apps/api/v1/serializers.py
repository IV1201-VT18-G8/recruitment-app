from rest_framework import serializers

from recruitmentapp.apps.core.models import User, Applicant, Competence


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

        # TODO: Add error handling for if create_user() fails.
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            email=validated_data["email"],
        )
        applicant = Applicant.object.create(
            user=user,
            social_security_number=validated_data["social_security_number"]
        )
        return applicant

    def update(self, instance, validated_data):
        """Update an existing applicant from validated data."""

        # User fields
        user = instance.user
        user.username = validated_data.get(
            "username", user.username
        ),
        if "password" in validated_data:
            user.make_password(password=validated_data["password"])
        user.first_name = validated_data.get(
            "first_name", user.first_name),
        user.last_name = validated_data.get(
            "last_name", user.last_name),
        user.email = validated_data.get("email", user.email),
        user.save()

        # Applicant fields
        instance.social_security_number = validated_data.get(
            "social_security_number",
            instance.social_security_number
        )
        instance.save()


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = ('name')
