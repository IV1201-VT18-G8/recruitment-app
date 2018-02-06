from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin
from .models import User, Applicant, Recruiter

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Applicant, ModelAdmin)
admin.site.register(Recruiter, ModelAdmin)
