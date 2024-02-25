
from django.db import models
from django.core import validators


from services.services import generate_filename, validate_file_size
from users.models import User





class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # при удалении данного юзера, удалятся все, связанные с ним рецепты.
    description = models.TextField(max_length=1500)
    image = models.ImageField(upload_to=generate_filename,
                              validators=[
                                  validators.FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                  validate_file_size])
    ingredients = models.TextField(max_length=1500)
    cooking_instructions = models.TextField(max_length=1500)
    cooking_time_in_minutes = models.IntegerField(
        default=0,
        validators=[validators.MinValueValidator(1), validators.MaxValueValidator(1440)])
    published_at = models.DateTimeField(auto_now_add=True)
    # category = models.ManyToManyField(Category)

    def __str__(self):
        return self.name
