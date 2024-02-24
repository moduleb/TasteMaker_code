from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer




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