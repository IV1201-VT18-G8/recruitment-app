from recruitmentapp.settings.base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'jmzr5&jds6!^#9bkogrq#p=)n=$i5&jes-e21xk56mqhe+&9)4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# CORS development settings - DO NOT USE IN PRODUCTION
CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
    '127.0.0.1:3000',
)
