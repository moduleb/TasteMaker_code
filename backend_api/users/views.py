from rest_framework import generics

from .serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):
    """Оправляет POST запрос для регистрации пользователя в БД"""
    serializer_class = UserSerializer
