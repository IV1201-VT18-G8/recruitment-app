from recruitmentapp.settings.base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', os.environ['DJANGO_HOST_NAME']]
CSRF_TRUSTED_ORIGINS = [os.environ['DJANGO_HOST_NAME']]

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['PSQL_NAME'],
        'USER': os.environ['PSQL_USER'],
        'PASSWORD': os.environ['PSQL_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'PORT': '',
    }
}

STATIC_ROOT = '/static/'
STATIC_URL = '/static/'

CORS_ORIGIN_WHITELIST = (
    os.environ['DJANGO_CORS_HOST_NAME'],
)
