from django.core.validators import RegexValidator, FileExtensionValidator, MinLengthValidator
from rest_framework import serializers
from services.services import validate_file_size, generate_filename_upload_photo

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[
        RegexValidator(
            r"^[-a-zA-Z0-9_]{3,}")], write_only=True)  # Минимальное кол-во символов 3(до "@")
    password = serializers.CharField(min_length=8, write_only=True)
    about_me = serializers.CharField(read_only=True)
    photo = serializers.ImageField(validators=[FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                              validate_file_size], read_only=True)
    # Поле для пути к фото для аватар "Пользователя"
    # Согласовать папку для загрузки изображений для фото пользователей
    nickname = serializers.CharField(min_length=3, read_only=True)

    class Meta:
        model = User
        exclude = ['is_active', 'is_admin']

    def create(self, validated_data):
        """Создаем хешируемый пароль пользователя"""
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Позволяет частично редактировать данные в личном кабинете пользователя"""

    class Meta:
        model = User
        fields = ('about_me',
                  'nickname',
                  'photo')


class UserSerializer(serializers.ModelSerializer):
    """Получаем данные о пользователе"""

    class Meta:
        model = User
        exclude = ['is_active', 'is_admin', 'password']
