from rest_framework.serializers import ModelSerializer

from models import User


class AutorSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('login',
                  'password',
                  'email',)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
