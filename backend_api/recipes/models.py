import uuid
from django.db import models
from django.core import validators
from rest_framework.exceptions import ValidationError

from users.models import User


def generate_filename(instance, filename):
    """Функция для генерации имени файла на основе UUID."""
    extension = filename.split('.')[-1]  # получаем расширение файла
    filename = f'images/{uuid.uuid4().hex}.{extension}'  # создаем новое имя файла
    return filename


def validate_file_size(value):
    """Валидатор размера загружаемого изображения"""
    filesize = value.size

    if filesize > 2 * 1024 * 1024:
        raise ValidationError("Максимальный размер файла 2 МБ.")


class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # при удалении данного юзера, удалятся все, связанные с ним рецепты.
    description = models.TextField(max_length=1500)
    category = models.ManyToManyField(Category)
    image = models.ImageField(upload_to=generate_filename,
                              validators=[
                                  validators.FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                  validate_file_size])

    cooking_instructions = models.TextField(max_length=1500)
    cooking_time_in_minutes = models.IntegerField(
        default=0,
        validators=[validators.MinValueValidator(1), validators.MaxValueValidator(1440)])
    published_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
