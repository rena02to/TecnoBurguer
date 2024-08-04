from rest_framework import serializers
from .models import User, Store

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'telephone', 'language', 'darkmode', 'type', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            telephone=validated_data['telephone'],
            language=validated_data['language'],
            darkmode=validated_data['darkmode'],
            type=validated_data['type'],
            password=validated_data['password']
        )
        return user

class StoresOpenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['name', 'locale', 'min_order', 'id']