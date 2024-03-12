from datetime import timedelta
from django.db import models
from services.services import generate_filename
from users.models import User


class Recipe(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(max_length=1500, null=True)
    image = models.ImageField(upload_to=generate_filename)
    cooking_instructions = models.TextField(max_length=1500)
    cooking_time = models.DurationField(default=timedelta(minutes=0))
    published_at = models.DateTimeField(auto_now_add=True)

class Step(models.Model):
    order = models.IntegerField()
    text = models.CharField(max_length=150)
    image = models.ImageField(null=True, upload_to=generate_filename)
    recipe = models.ForeignKey(Recipe, related_name='steps', on_delete=models.CASCADE)
    class Meta:
        unique_together = ['recipe', 'order']
        ordering = ['order']

class Ingredient(models.Model):
    name = models.CharField(max_length=150)

class Measure(models.Model):
    name = models.CharField(max_length=150)

class RecipeIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.CharField(max_length=150)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    measure = models.ForeignKey(Measure, on_delete=models.CASCADE)
    class Meta:
        unique_together = ['recipe', 'ingredient']
