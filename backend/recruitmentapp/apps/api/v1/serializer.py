from rest_framework import serializers

from backend.recruitmentapp.apps.core.models import User, Applicant


class ApplicantSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField()
    first_name = serializers.CharField(max_length=30,required=False,allow_blank=False)
    last_name = serializers.CharField(max_length=150,required=False,allow_blank=False)
    email = serializers.EmailField()
    social_security_number = serializers.CharField(max_length=20)

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data["username"],
                                        password=validated_data["password"],
                                        first_name=validated_data.get("first_name",""),
                                        last_name=validated_data.get("last_name", ""),
                                        email=validated_data["email"],
                                 )
        Applicant.object.create(user=user,
                                social_security_number=validated_data["social_security_number"])
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username),
        if "password" in validated_data:
            instance.make_password(password=validated_data["password"])
        instance.first_name = validated_data.get("first_name", instance.first_name),
        instance.last_name = validated_data.get("last_name", instance.last_name),
        instance.email = validated_data.get("email", instance.email),
        instance.save()
        instance.applicant.social_security_number = validated_data.get("social_secutiry_number", instance.applicant.social_security_number)
        instance.applicant.save()