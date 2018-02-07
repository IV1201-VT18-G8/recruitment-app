from django.urls import path
from rest_framework import routers

from recruitmentapp.apps.api.v1.views import ApplicantViewSet

router = routers.SimpleRouter()
router.register(r'applicants', ApplicantViewSet)

urlpatterns = []

urlpatterns += router.urls
