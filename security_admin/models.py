from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from nomenclador.models import Trabajador, NivelAcceso
import datetime


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        user = self.model(
            username=username,
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        user = self.model(username=username)
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_complete_user(self, username, trabajador):
        user = self.model(username=username)
        user.email = str(username) + "@etecsa.cu"
        user.set_password("Etecsa*{0}".format(str(datetime.datetime.now().year)))
        user.is_superuser = False
        user.trabajador = trabajador
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.TextField(max_length=25, unique=True)
    email = models.EmailField(max_length=255, unique=True, null=True)
    last_login = models.DateTimeField(null=True)
    is_active = models.BooleanField(default=False)
    trabajador = models.ForeignKey(Trabajador, null=True, on_delete=models.SET_NULL)
    access_level = models.ForeignKey(NivelAcceso, null=True, on_delete=models.SET_NULL)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'
