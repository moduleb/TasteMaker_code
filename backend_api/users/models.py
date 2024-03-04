from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator, FileExtensionValidator
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from services.services import validate_file_size, generate_filename_upload_photo


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=100,
                              verbose_name="email address",
                              unique=True,
                              )
    password = models.CharField(max_length=64)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    last_login = None

    # Доп поля для модели "Пользователь"
    about_me = models.CharField(max_length=1500, blank=True,)
    at_registration = models.DateTimeField(auto_now_add=True)  # Дата регистрации "Пользователя"
    photo = models.ImageField(upload_to=generate_filename_upload_photo, blank=True)
    nickname = models.CharField(max_length=30, default='Пользователь', blank=False)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


def __str__(self):
    return self.email


def has_perm(self, perm, obj=None):
    "Does the user have a specific permission?"
    # Simplest possible answer: Yes, always
    return True


def has_module_perms(self, app_label):
    "Does the user have permissions to view the app `app_label`?"
    # Simplest possible answer: Yes, always
    return True


@property
def is_staff(self):
    "Is the user a member of staff?"
    # Simplest possible answer: All admins are staff
    return self.is_admin
