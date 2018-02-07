from django.urls import path

from recruitmentapp.apps.api.v1.views import ApplicantViewSet

urlpatterns = [
    path('applicants/', ApplicantViewSet.as_view({'get':'list'}))
]