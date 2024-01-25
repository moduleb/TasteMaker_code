from rest_framework import generics


from .serializers import UserSerializer


class UserCreatView(generics.CreateAPIView):
    """Оправляет POST запрос для регистрации пользователя в БД"""
    serializer_class = UserSerializer