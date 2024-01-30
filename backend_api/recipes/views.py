from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Recipe
from .serializers import RecipeSerializer


# def perform_create(self, serializer):
#     serializer.save(user=self.request.user)

class RecipeModelViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    # Установка разных уровней доступа для методов
    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         permission_classes = [AllowAny]  # Метод GET доступен всем
    #     else:
    #         permission_classes = [IsAuthenticated]  # Остальные методы требуют авторизации
    #     return [permission() for permission in permission_classes]
