from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator, FileExtensionValidator
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


from backend_api.recipes.models import validate_file_size


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
    email = models.EmailField(
        verbose_name="email address",
        max_length=100,
        unique=True,
        validators=[RegexValidator(r"^[-a-zA-Z0-9_]{3,}")]  # Минимальное кол-во символов 3(до "@")
    )
    password = models.CharField(max_length=64, validators=[MaxLengthValidator(limit_value=64),
                                                           MinLengthValidator(limit_value=8)])
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    last_login = None

    # Доп поля для модели "Пользователь"
    about_me = models.CharField(max_length=1000, blank=False, null=True)
    at_registration = models.DateTimeField(auto_now_add=True)  # Дата регистрации "Пользователя"
    foto = models.ImageField(upload_to='',
                             validators=[FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                         validate_file_size],
                             null=True)  # Поле для пути к фото для аватар "Пользователя"
    # Согласовать папку для загрузки изображений для фото пользователей
    nickname = models.CharField(max_length=30,
                                validators=[MinLengthValidator(limit_value=1)])

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
