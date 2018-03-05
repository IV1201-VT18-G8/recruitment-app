from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import routers, permissions
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, \
    verify_jwt_token

from recruitmentapp.apps.api.v1.views import ApplicantViewSet, \
    CompetenceViewSet

schema_view = get_schema_view(
   openapi.Info(
      title="Recruitment API",
      default_version='v1',
      description="",
      terms_of_service="",
      contact=openapi.Contact(email=""),
      license=openapi.License(name=""),
   ),
   validators=[],
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.SimpleRouter()
router.register(r'applicants', ApplicantViewSet)
router.register(r'competences', CompetenceViewSet)

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('login-refresh', refresh_jwt_token),
    path('login-verify/', verify_jwt_token),
    url(
        r'^swagger(?P<format>.json|.yaml)$',
        schema_view.without_ui(cache_timeout=None),
        name='schema-json',
    ),
    url(
        r'^swagger/$',
        schema_view.with_ui('swagger', cache_timeout=None),
        name='schema-swagger-ui',
    ),
    url(
        r'^redoc/$',
        schema_view.with_ui('redoc', cache_timeout=None),
        name='schema-redoc',
    ),
]

urlpatterns += router.urls
