from pathlib import Path
from dotenv import load_dotenv
import environ
import os

load_dotenv()

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


# Build paths inside the project like this: BASE_DIR / 'subdir'... // note 'parent.parent.parent' rather than 'parent.parent' default,yes due to the subdir of settings
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SECRET_KEY = env('SECRET_KEY')
# DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG') == 'True' # DEBUG is a boolean with a default as false. If string returns 'False' in the .env file, then it doesn't return True.

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'corsheaders',
    'rest_framework',
    'jwt_auth',
    'api'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.middleware.cache.CacheMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # https://docs.djangoproject.com/en/dev/ref/settings/#dirs
        # 'DIRS': [os.path.join(BASE_DIR, 'client')],
        'DIRS': [BASE_DIR.as_posix() + '/client'],
        # https://docs.djangoproject.com/en/dev/ref/settings/#app-dirs
        'APP_DIRS': True,
        'OPTIONS': {
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DBNAME'),
        'USER': env('DBUSER'),
        'PASSWORD': env('DBPASS'),
        'HOST': env('DBHOST'),
        'PORT': 5432,
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
TIME_ZONE = "UTC"

LANGUAGE_CODE = "en-us"

SITE_ID = 1

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = (BASE_DIR.as_posix() + '/static')

STATICFILES_DIRS = (
    BASE_DIR.as_posix() + '/client' + '/build' + '/static',
)

# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# FRONTEND_DIR = os.path.join(BASE_DIR, 'client')
# STATIC_URL = 'static/'
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
# STATICFILES_DIRS = [
#     os.path.join(FRONTEND_DIR, 'build', 'static')
# ]




DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'jwt_auth.User'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'jwt_auth.authentication.JWTAuthentication',
    ),
}


WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        # 'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'STATS_FILE': BASE_DIR.as_posix() + 'webpack-stats.json',
        'POLL_INTERVAL': 0.1,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
    }
}


# TO REVIEW.......... **********************************

# CORS_ORIGIN_ALLOW_ALL = True

# CORS_ORIGIN_WHITELIST = [
#     'http://localhost:3000'
# ]


# REST_FRAMEWORK = {
#     'DEFAULT_RENDERER_CLASSES': [
#         'rest_framework.renderers.JSONRenderer',
#         'rest_framework.renderers.BrowsableAPIRenderer'
#     ],
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'jwt_auth.authentication.JWTAuthentication'
#     ]
# }

# WEBPACK_LOADER = {
#     'DEFAULT': {
#         'CACHE': not DEBUG,
#         'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
#         'POLL_INTERVAL': 0.1,
#         'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
#     }
# }

# HTTPS
#  Need to review this with a specialist. Currently stored with Memcached
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.PyMemcacheCache',
#         'LOCATION': '127.0.0.1:8000',
#     }
# }

#  Need to review this with a specialist. Currently stored with Memcached
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True

# SECURE_HSTS_SECONDS = 31536000
# SECURE_SSL_REDIRECT = True
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True




#  Need to review this with a specialist. Currently stored with Memcached

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'root': {
#         'handlers': ['console'],
#         'level': 'WARNING',
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console'],
#             'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
#             'propagate': False,
#         },
#     },
# }



# ADMINS = [('Kate', 'kate.e.oboyle@gmail.com'), ('AS', 'ameliastudios.azure@gmail.com')]
# MANAGERS = ADMINS



# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': env('AZURE_DBNAME'),
#         'HOST': env('AZURE_HOST'),
#         'PORT': 5432,
#         'USER': env('AZURE_DBUSER'),
#         'PASSWORD': env('AZURE_DBPASS')
#     }
# }

# Azure database settings
# if 'AZURE_HOST' in os.environ:
#     DATABASES['default'] = {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': config('AZURE_DBNAME'),
#         'USER': config('AZURE_DBUSER'),
#         'PASSWORD': config('AZURE_DBPASS'),
#         'HOST': config('AZURE_HOST'),
#         'PORT': config('AZURE_PORT', cast=int),
#     }

# if os.environ.get('GITHUB_WORKFLOW'):
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.postgresql_psycopg2',
#             'NAME': 'github_actions',
#             'USER': 'postgres',
#             'PASSWORD': 'postgres',
#             'HOST': '127.0.0.1',
#             'PORT': '5432',
#         }
#     }