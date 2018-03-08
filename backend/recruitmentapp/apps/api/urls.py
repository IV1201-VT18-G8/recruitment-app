from django.urls import path, include


urlpatterns = [
    path('v1/', include('recruitmentapp.apps.api.v1.urls')),
]
