import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'izw*txo3#x#5xlo5!l8b_or$zll7#%ki91((e@yejn)-hni25g'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'security_admin.apps.SecurityAdminConfig',
    'nomenclador.apps.NomencladorConfig',
    'tarea_operativa.apps.TareaOperativaConfig'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app_tarea_op.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'security_admin/templates'),
            os.path.join(BASE_DIR, 'tarea_operativa/templates')
        ]
        ,
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

WSGI_APPLICATION = 'app_tarea_op.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'tarea_operativa_etecsa_db',
        'USER': 'cdnt_usr',
        'PASSWORD': 'Cub2*2018',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Password validation
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
LANGUAGE_CODE = 'es-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app_tarea_op', 'static'),
    os.path.join(BASE_DIR, 'security_admin', 'static'),
    os.path.join(BASE_DIR, 'nomenclador', 'static'),
    os.path.join(BASE_DIR, 'tarea_operativa', 'static')
]
STATIC_URL = '/static/'

# Login config
LOGIN_URL = '/security_admin/login'
AUTH_USER_MODEL = 'security_admin.User'
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 3600

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
MEDIA_ROOT = os.path.join(BASE_DIR, 'app_tarea_op', 'uploads')
MEDIA_URL = '/app_tarea_op/uploads/'

# 5MB - 5242880
MAX_UPLOAD_SIZE = "5242880"

# email
EMAIL_HOST = 'mail.etecsa.cu'
EMAIL_PORT = 25
EMAIL_USER = 'tarea.operativa@etecsa.cu'

DEFAULT_CONTENT_TYPE = 'text/html'

# LDAP
# Baseline configuration.
LDAP_HOST = "ds.etecsa.cu"
LDAP_USER = "uid=rouser,ou=Special Users,dc=etecsa,dc=cu"
LDAP_PASS = "r0us3r"
LDAP_SEARCH = "ou=etecsa.cu,ou=People,dc=etecsa,dc=cu"


