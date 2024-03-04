from drf_spectacular.utils import extend_schema_view, extend_schema
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, parsers, status
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Recipe
from .serializers import RecipeSerializer




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

    # @swagger_auto_schema(auto_schema=None)
    # def partial_update(self, request, *args, **kwargs):
    #     return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

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
