import os
from datetime import timedelta
from config.env import BASE_DIR, env



# Take environment variables from .env file
env.read_env(os.path.join(BASE_DIR, '.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DJANGO_DEBUG', default=True)

ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'easyaudit',
   

    
    'iam',
    'iam.users',
    'iam.user_profile',
    'iam.groups',
    'iam.role',
    'iam.policy',
    'delegation',
    'iam.ldap_integration.apps.LdapIntegrationConfig',
    'dmsmodule',
    'dmsmodule.folder',
    'dmsmodule.document_repository',
    'workflow_manager',  
    'workflow_service',
    'notification',
    'rest_access_policy',
    'taf'
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'easyaudit.middleware.easyaudit.EasyAuditMiddleware', 
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'utils.ConnectionMiddleware.LDAPConnectionMiddleware',  
]


ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'erp_db',
        'USER': 'erpuser',
        'PASSWORD': 'root$Password1',
        'HOST': 'localhost',
        'PORT': '3306',
    },
    
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'OPTIONS': {
            'user_attributes': ('username', 'email', 'first_name', 'last_name')
        }
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
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# DEFAULT_AUTO_FIELD = 'utils.CustomPKField.DefaultPrimaryKeyField'


# Password Security (List of password hasher)

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
    "django.contrib.auth.hashers.ScryptPasswordHasher",
]

# Media related configuration
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')   # the path on the disk where the media (such as uploaded files) will be stored.
MEDIA_URL = '/media/'  # it’s the URL that should be used to serve media.

###################### Project specific configuration ########################

AUTH_USER_MODEL = 'iam.UserAccountsModel'

AUTHENTICATION_BACKENDS = [
    'django_auth_ldap.backend.LDAPBackend',
    'django.contrib.auth.backends.ModelBackend',   
]

# Django REST_FRAMEWORK Configuration 
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.AllowAny',
        'rest_access_policy.AccessPolicy'
    ], 
    'EXCEPTION_HANDLER': 'utils.custom_exception_handler.custom_exception_handler'
}

# Project Configuration for JWT Authentication
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "TOKEN_OBTAIN_SERIALIZER": "account.serializers.authSerializer.UserTokenObtainPairSerializer",
    # 'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'USER_ID_FIELD': 'username',
    'USER_ID_CLAIM': 'username',
}

from config.settings.cors import *
from config.settings.celery import *
from config.settings.ldap import *





