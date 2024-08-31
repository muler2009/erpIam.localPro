import os
from pathlib import Path
from datetime import timedelta
from django_auth_ldap.config import LDAPSearch, LDAPSearchUnion, LDAPGroupQuery, PosixGroupType
import ldap
# from ..utils.LDAPBackendAuthenticator import ERPBackendAuthenticator


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-#(7+4q331*zwy*w88%j8@%fczhg*9po5=j&zug)6)pt6l_@4*w'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

BASE_URL = 'http://127.0.0.1:8000'



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
    'iam',
    'iam.users',
    'iam.user_profile',
    'iam.groups',
    'iam.role',
    'iam.ldap_integration.apps.LdapIntegrationConfig',
    'dmsmodule',
    'dmsmodule.folder',
    'dmsmodule.file_mangement',
    'workflow_manager',  
    'notification',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'rest_framework_simplejwt.middleware.JWTAuthenticationMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'utils.ConnectionMiddleware.LDAPConnectionMiddleware',  
]


ROOT_URLCONF = 'api.urls'

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

WSGI_APPLICATION = 'api.wsgi.application'

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

# app use LDAP for authenticating users by default


from iam.ldap_integration.ldap_config import *

AUTH_LDAP_SERVER_URI = LDAP_URI 
AUTH_LDAP_BIND_DN = LDAP_BIND_DN
AUTH_LDAP_BIND_PASSWORD = LDAP_PASSWORD

# LDAP user search configuration
AUTH_LDAP_USER_SEARCH = LDAPSearchUnion(
    LDAPSearch("ou=admin,ou=erpIam,dc=local", ldap.SCOPE_SUBTREE, "(cn=%(user)s)"),
    LDAPSearch("ou=users,ou=iam,dc=erpIam,dc=local",ldap.SCOPE_SUBTREE, "(uid=%(user)s)"),
)

# AUTH_LDAP_USER_DN_TEMPLATE = "cn=%(user)s,ou=users,ou=iam,dc=erpIam,dc=local"

# Defining the LDAP search for posixGroup
AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
    "ou=groups,ou=iam,dc=erpIam,dc=local",  # Base DN for group search
    ldap.SCOPE_SUBTREE,             # Search the entire subtree
    "(objectClass=posixGroup)"      # Filter for posixGroup object class
)

# Set the group type to PosixGroupType
AUTH_LDAP_GROUP_TYPE = PosixGroupType()

AUTH_LDAP_REQUIRE_GROUP = (
    LDAPGroupQuery("cn=active,ou=groups,ou=iam,dc=erpIam,dc=local")
    | LDAPGroupQuery("cn=admin,ou=groups,ou=iam,dc=erpIam,dc=local") 
    | LDAPGroupQuery("ou=admin,dc=erpIam,dc=local")
) & ~LDAPGroupQuery("cn=disabled,ou=groups,ou=groups,ou=iam,dc=erpIam,dc=local") 

# LDAP attribute mappings

AUTH_LDAP_USER_ATTR_MAP = {
    'username': 'uid',  # Replace with your LDAP username attribute
    'first_name': 'givenName',  # Replace with your LDAP first name attribute
    'last_name': 'sn',  # Replace with your LDAP last name attribute
    'email': 'mail',  # Replace with your LDAP email attribute
    'password': 'userPassword'
}

AUTH_LDAP_USER_FLAGS_BY_GROUP = {
    "active": "cn=active,ou=groups,dc=erpIam,dc=local",
    # "is_staff": (LDAPGroupQuery("cn=staff,ou=groups,dc=erpIam,dc=local") | LDAPGroupQuery("cn=admin,ou=groups,dc=erpIam,dc=local")),
    # "is_superuser": "cn=superuser,ou=groups,dc=erpIam,dc=local",
}

AUTHENTICATION_BACKENDS = [
    'django_auth_ldap.backend.LDAPBackend',
    'django.contrib.auth.backends.ModelBackend',   
]

CORS_ORIGIN_WHITELIST = ["http://localhost:3000", ]


# Django REST_FRAMEWORK Configuration 
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ], 
    'EXCEPTION_HANDLER': 'utils.custom_exception_handler.custom_exception_handler'
}

CUSTOM_PERMISSION_EXCEPTIONS = {
    'PermissionDenied': 'utils.permissions_exception_handler',
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




