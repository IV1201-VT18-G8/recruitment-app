from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, \
    verify_jwt_token

from recruitmentapp.apps.api.v1.views import ApplicantViewSet

router = routers.SimpleRouter()
router.register(r'applicants', ApplicantViewSet)

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('login-refresh', refresh_jwt_token),
    path('login-verify/', verify_jwt_token),
]

urlpatterns += router.urls
