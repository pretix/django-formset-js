DEBUG = True
TEMPLATE_DEBUG = DEBUG

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite',
    }
}

SECRET_KEY = 'not secret at all'

ROOT_URLCONF = 'example.urls'
WSGI_APPLICATION = 'example.wsgi.application'

INSTALLED_APPS = (
    # `INSTALLED_APPS` must contain `djangoformsetjs` and `jquery`
    'djangoformsetjs',
    'jquery',

    'example',
    'django.contrib.staticfiles',
)

STATIC_URL = '/static/'
