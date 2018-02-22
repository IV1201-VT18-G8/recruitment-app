from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline
from django.contrib.auth.admin import UserAdmin
from parler.admin import TranslatableAdmin

from .models import User, Applicant, Recruiter, Competence

admin.site.register(Applicant, ModelAdmin)
admin.site.register(Recruiter, ModelAdmin)

@admin.register(Competence)
class CompetenceAdmin(TranslatableAdmin):
    model = Competence

# class ApplicantInline(StackedInline):
#     model = Applicant
#
# class RecruiterInline(StackedInline):
#     model = Recruiter

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # inlines = [
    #     ApplicantInline,
    #     RecruiterInline,
    # ]
    pass
