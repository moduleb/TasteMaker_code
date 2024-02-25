from rest_framework import serializers
from django.core.validators import RegexValidator, MaxLengthValidator, MinLengthValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100,
                                   validators=[
                                       RegexValidator(r"^[-a-zA-Z0-9_]{3,}")],)  # Минимальное кол-во символов 3(до "@")
    password = serializers.CharField(min_length=8)
    class Meta:
        model = User
        fields = ('email',
                  'password',
                  )

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserRUDSerializer(serializers.ModelSerializer):
    """Серализатор для чтения/обновления/удалени данных User`а"""

    class Meta:
        model = User
        fields = '__all__'

    pass
