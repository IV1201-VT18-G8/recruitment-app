from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline, TabularInline
from django.contrib.auth.admin import UserAdmin
from parler.admin import TranslatableAdmin

from .models import User, Applicant, Recruiter, Competence, \
    CompetenceProfile, Availability


admin.site.register(Recruiter, ModelAdmin)


@admin.register(Competence)
class CompetenceAdmin(TranslatableAdmin):
    pass


class CompetenceProfileInline(TabularInline):
    model = CompetenceProfile


class AvailabilityInline(TabularInline):
    model = Availability


@admin.register(Applicant)
class ApplicantAdmin(ModelAdmin):
    inlines = [
        CompetenceProfileInline,
        AvailabilityInline,
    ]


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass
