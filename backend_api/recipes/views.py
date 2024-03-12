
from rest_framework import status, generics
from rest_framework.exceptions import ValidationError

from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import viewsets, parsers, status
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.response import Response

from .models import Recipe, Ingredient, Measure
from .serializers import FormDataSerializer, RecipeSerializer, IngredientSerializer, MeasureSerializer


class IngredientModelView(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class MeasureModelView(generics.ListAPIView):
    queryset = Measure.objects.all()
    serializer_class = MeasureSerializer


@extend_schema_view(
    create=extend_schema(summary='Создание рецепта', tags=['Рецепты']),
    list=extend_schema(summary='Получение всех рецептов', tags=['Рецепты']),
    retrieve=extend_schema(summary='Получение одного рецептов', tags=['Рецепты']),
    update=extend_schema(summary='Полное редактирование рецепта', tags=['Рецепты']),
    partial_update=extend_schema(summary='Частичное редактирование рецепта', tags=['Рецепты']),
    destroy=extend_schema(summary='Удаление рецепта', tags=['Рецепты']),
)

class RecipeModelViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def find_image_file(self, value, images):
        for file in images:
            if str(file) == value:
                return file

    def replace_filenames_with_files(self, data, images):
        """Ищет все ключи image и заменяет имена файлов, реальными файлами из массива."""
        for key, value in data.items():
            if key == 'image':
                file = self.find_image_file(value, images)
                if not file:
                    raise ValueError(value)
                data[key] = file
            elif isinstance(value, dict):
                self.replace_filenames_with_files(value, images)
            elif isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        self.replace_filenames_with_files(item, images)
        return data

    def create(self, request, *args, **kwargs):

        serializer = FormDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        images = data.pop('files')
        data = data.pop('json')

        try:
            data = self.replace_filenames_with_files(data, images)
        except ValueError as e:
            raise ValidationError(f"The file '{e}' was not found in the files array under the key 'files'.")

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        serializer = FormDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        images = data.pop('files')
        data = data.pop('json')

        try:
            data = self.replace_filenames_with_files(data, images)
        except ValueError as e:
            raise ValidationError(f"The file '{e}' was not found in the files array under the key 'files'.")

        instance = self.get_object()

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


    def get_permissions(self):
        """Установка разных уровней доступа для методов"""
        if self.request.method == 'GET':
            permission_classes = [AllowAny]  # Метод GET доступен всем
        else:
            permission_classes = [IsAuthenticated]  # Остальные методы требуют авторизации
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """Автоматически определяем user id и вставляем в соответствующее поле при создании рецепта"""
        serializer.save(user=self.request.user)
