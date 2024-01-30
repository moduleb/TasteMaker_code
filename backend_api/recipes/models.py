from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # при удалении данного юзера, удалятся все, связанные с ним рецепты.
    description = models.TextField(max_length=1500)
    category = models.ForeignKey(Category, on_delete=models.PROTECT) # категорию невозможно удалить пока есть связанные с ней рецепты
    cooking_instructions = models.TextField(max_length=1500)
    ingredients = models.TextField(max_length=1500)
    cooking_time_in_minutes = models.IntegerField(
        default=0,
        validators=[MinValueValidator(1), MaxValueValidator(1440)])
    published_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
