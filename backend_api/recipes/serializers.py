from rest_framework import serializers

from .models import Category, Recipe


class RecipeSerializer(serializers.ModelSerializer):
    # список категорий, принятый сервером
    category = serializers.ListField(write_only=True)
    # список категорий в ответе сервера
    category_data = serializers.SerializerMethodField()

    def validate(self, attrs):
        request = self.context.get('request')
        if request:
            # получаем список категорий в виде строки и превращаем в список
            categories_data_str = attrs.get('category')
            categories_data = [name.strip() for name in categories_data_str[0].split(",")]

            # ищем объекты 'category' по имени и складываем в список, создаем если не найдено
            categories = []
            for category_name in categories_data:
                category, created = Category.objects.get_or_create(name=category_name)
                categories.append(category)

            attrs['category'] = categories
            return attrs

    def get_category_data(self, instance):
        return instance.category.values_list('name', flat=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category_data'] = self.get_category_data(instance)
        return representation

    class Meta:
        model = Recipe
        fields = ('id',
                  "name",
                  'description',
                  'category',
                  'image',
                  'cooking_instructions',
                  'cooking_time_in_minutes',
                  'category_data',
                  )

        read_only_fields = ('id', "category_data", "published_at")
