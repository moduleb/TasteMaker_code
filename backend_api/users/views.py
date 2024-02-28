from rest_framework import generics, status, permissions
from rest_framework.response import Response

from .models import User
from .serializers import RegistrationSerializer, UserUpdateSerializer, UserSerializer


class UserCreateView(generics.CreateAPIView):
    """Оправляет POST запрос для регистрации пользователя в БД"""
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Создать пользователя могут не авторизированные пользователи

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(status=status.HTTP_201_CREATED)


class UserRUDView(generics.RetrieveUpdateAPIView):
    """Представление модели Пользователя"""
    queryset = User.objects.all()

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(status=status.HTTP_201_CREATED)

