import os
import beerbowling.settings.base

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'x$y%kf7=26xc0inkgomaz94pbke-(i=vh8yw65h5_@$80j132q'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, '../../db.sqlite3'),
    }
}
