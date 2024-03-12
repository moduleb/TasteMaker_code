from django.core import validators
from django.db import transaction
from rest_framework import serializers, fields
from rest_framework.exceptions import ValidationError

from .models import Recipe, Step, Ingredient, RecipeIngredient, Measure


# ------------ FORM-DATA SERIALIZER ------------
class FormDataSerializer(serializers.Serializer):
    json = fields.JSONField()
    files = serializers.ListField(child=serializers.ImageField(
        max_length=(1024 * 1024 * 2),
        validators=[validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]
    ))


# ------------ INGREDIENT SERIALIZER ------------
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']

    def validate(self, data):
        try:
            ingredient_name = data.get("name")
            ingredient_obj = Ingredient.objects.get(name=ingredient_name)
            return ingredient_obj
        except Exception:
            raise ValidationError(f"Ingredient with name: '{ingredient_name}' does not exist")

    def to_representation(self, instance):
        # Получаем оригинальное представление
        ret = super().to_representation(instance)

        # удаляем ключ 'name' и возвращаем только его значение
        return ret.pop('name')


# ------------ MEASURE SERIALIZER ------------
class MeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measure
        fields = ['name']

    def validate(self, data):
        try:
            measure_name = data.get("name")
            measure_obj = Measure.objects.get(name=measure_name)
            return measure_obj
        except Exception:
            raise ValidationError(f"Ingredient with name: '{measure_name}' does not exist")

    def to_representation(self, instance):
        # Получаем оригинальное представление
        ret = super().to_representation(instance)

        # удаляем ключ 'name' и возвращаем только его значение
        return ret.pop('name')


# ------------ STEP SERIALIZER ------------
class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['order', 'text', 'image', ]


# ------------ RECIPE INGREDIENT SERIALIZER ------------
class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'amount', 'measure']

    ingredient = IngredientSerializer()
    measure = MeasureSerializer()

    def to_internal_value(self, data):
        if data.get("name"):
            ingredient = data.pop('name')
            data['ingredient'] = {"name": ingredient}
        else:
            raise ValidationError("Missing required field 'name'")

        if data.get('measure'):
            measure = data.pop('measure')
            data['measure'] = {"name": measure}

        super().to_internal_value(data)
        return data


# ------------ RECIPE SERIALIZER ------------
class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True)
    ingredients = RecipeIngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id',
                  "name",
                  'description',
                  'ingredients',
                  'image',
                  'cooking_instructions',
                  'cooking_time',
                  'steps',
                  )

        read_only_fields = ('id', "published_at")

    @transaction.atomic
    def create(self, validated_data):

        steps_data = validated_data.pop('steps')
        ingredients_data = validated_data.pop('ingredients')

        recipe = super().create(validated_data)
        for step_data in steps_data:
            Step.objects.create(recipe=recipe, **step_data)

        for ingredient_data in ingredients_data:
            measure_name = ingredient_data.get("measure").get("name")
            measure = Measure.objects.get(name=measure_name)
            ingredient_name = ingredient_data.get("ingredient").get("name")
            ingredient = Ingredient.objects.get(name=ingredient_name)

            RecipeIngredient.objects.create(
                recipe=recipe,
                amount=ingredient_data.get('amount'),
                measure=measure,
                ingredient=ingredient
            )

        return recipe

    def update(self, instance: Recipe, validated_data):
        is_partial = self.partial
        existed_steps_list = Step.objects.filter(recipe=instance)
        new_steps_list = []
        if validated_data.get('steps'):
            steps_data = validated_data.pop('steps')

            for step_data in steps_data:
                order = step_data.get('order')
                if not order:
                    raise ValidationError("Missing required field 'order'")

                step, created = Step.objects.get_or_create(order=order, recipe=instance)

                for attr, value in step_data.items():
                    setattr(step, attr, value)
                step.save()
                new_steps_list.append(step)

        if not is_partial:
            steps_for_delete = []
            for item in existed_steps_list:
                if item not in new_steps_list:
                    steps_for_delete.append(item)
            for item in steps_for_delete:
                item.delete()


        if validated_data.get('ingredients'):
            ingredients_data = validated_data.pop('ingredients')
            for ingredient_data in ingredients_data:

                ingredient_name = ingredient_data.get("ingredient").get("name")
                ingredient = Ingredient.objects.get(name=ingredient_name)
                ingredient_data['ingredient'] = ingredient

                if 'measure' in ingredient_data:
                    measure_name = ingredient_data.get("measure").get("name")
                    measure = Measure.objects.get(name=measure_name)
                    ingredient_data['measure'] = measure

            existed_ingredients_list = RecipeIngredient.objects.filter(recipe=instance)
            new_ingredients_list = []

            for ingredient_data in ingredients_data:
                recipe_ingredient = None
                try:
                    recipe_ingredient:RecipeIngredient = RecipeIngredient.objects.get(ingredient=ingredient_data.get('ingredient'),
                                                                     recipe=instance)
                except:
                    pass

                if recipe_ingredient:
                    amount = ingredient_data.get('amount')
                    measure = ingredient_data.get('measure')
                    if amount:
                        recipe_ingredient.amount = amount
                    if measure:
                        recipe_ingredient.measure = measure
                    recipe_ingredient.save()

                    new_ingredients_list.append(recipe_ingredient)

                else:
                    amount = ingredient_data.get('amount')
                    measure = ingredient_data.get('measure')
                    ingredient = ingredient_data.get('ingredient')
                    if not amount:
                        raise ValidationError("Missing required field 'amount'")
                    if not measure:
                        raise ValidationError("Missing required field 'measure'")

                    recipe_ingredient = RecipeIngredient.objects.create(
                        recipe=instance,
                        amount=amount,
                        measure=measure,
                        ingredient=ingredient
                    )
                    new_ingredients_list.append(recipe_ingredient)
                    recipe_ingredient.save()

            if not is_partial:
                ingredients_for_delete = []

                for item in existed_ingredients_list:
                    if item not in new_ingredients_list:
                        ingredients_for_delete.append(item)
                for item in ingredients_for_delete:
                    item.delete()

        instance = super().update(instance, validated_data)
        return instance

