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
        """Проверяем существование ингредиента с таким 'name' в бд."""
        ingredient_name = data.get("name")
        try:
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
        """Проверяем существование measure с таким 'name' в бд."""
        measure_name = data.get("name")
        try:
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
        """
        Добавляем ключи 'name' для правильной валидации
        Название ингредиента должно быть передано обязательно, 
        а меру можно опустить в случае частичного редактирования
        """
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
        
        # создаем новый рецепт        
        recipe = super().create(validated_data)
        
        # создаем все шаги
        for step_data in steps_data:
            Step.objects.create(recipe=recipe, **step_data)
        
        """получаем из бд сущности 'ingredients' and 'measure'
        в сериалайзере уже проверили что они существуют"""
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
        # проверяем, это полное обновление или частичное (PUT или PATCH)
        is_partial = self.partial
        
        # список всннех шагов данного рецепта, которые есть в бд
        existed_steps_list = Step.objects.filter(recipe=instance)
        
        # обновленный список шагов
        new_steps_list = []

        if validated_data.get('steps'):
            steps_data = validated_data.pop('steps')

            """ищем шаги у заданного рецепта с переданными номерами. 
            если таких шагов нет, создаем,
            если есть, обновляем
            при отсутвии поля 'order' будет ошибка валидации"""
            for step_data in steps_data:
                order = step_data.get('order')
                if not order:
                    raise ValidationError("Missing required field 'order'")

                step, created = Step.objects.get_or_create(order=order, recipe=instance)

                for attr, value in step_data.items():
                    setattr(step, attr, value)
                step.save()
                new_steps_list.append(step)
        
        """при полном обновлении
        если какой то шаг вообще не передан в запросе, а в базе данных он есть, то удаляем"""
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

                # заменяем сущностями информацию об ингредиентах
                ingredient_name = ingredient_data.get("ingredient").get("name")
                ingredient = Ingredient.objects.get(name=ingredient_name)
                ingredient_data['ingredient'] = ingredient

                # заменяем сущностями информацию о мерах (проверка нужно для частичного обновления, там можнет не быть мер)
                if 'measure' in ingredient_data:
                    measure_name = ingredient_data.get("measure").get("name")
                    measure = Measure.objects.get(name=measure_name)
                    ingredient_data['measure'] = measure

            # список ингредиентав данного рецепта, которые есть в бд
            existed_ingredients_list = RecipeIngredient.objects.filter(recipe=instance)
            
            # обновленный список новых ингредиентов
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

            """при полном обновлении
            если какой то ингредиент вообще не передан в запросе, а в базе данных он есть, то удаляем"""
            if not is_partial:
                ingredients_for_delete = []

                for item in existed_ingredients_list:
                    if item not in new_ingredients_list:
                        ingredients_for_delete.append(item)
                for item in ingredients_for_delete:
                    item.delete()
        
        instance = super().update(instance, validated_data)
        return instance

