import django_filters

from recipes.models import Ingredient, RecipeIngredient


class IngredientFilter(django_filters.FilterSet):

    ingredient_name = django_filters.CharFilter(method='filter_ingredient_name')

    class Meta:
        model = Ingredient
        fields = ['ingredient_name']

    def filter_ingredient_name(self, queryset, name, value):
        # Преобразование значения в нижний регистр
        value = value.lower()
        # Использование преобразованного значения для фильтрации
        return queryset.filter(name__istartswith=value)


    """ iexact для регистронезависимого точного совпадения
    iendswith для регистронезависимого поиска по концу строки
    istartswith для регистронезависимого поиска по началу строки
    icontains для регистронезависимого поиска по содержимому"""