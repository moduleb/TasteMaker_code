from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer


@extend_schema_view(
    post=extend_schema(summary='Регистрация пользователя', tags=['Аутентификация & Авторизация'])
)
class UserCreateView(generics.CreateAPIView):
    """Оправляет POST запрос для регистрации пользователя в БД"""
    serializer_class = UserSerializer


    def create(self, request, *args, **kwargs):
        """Метод возвращает статус POST запроса"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(status=status.HTTP_201_CREATED)