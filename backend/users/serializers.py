from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'telephone', 'address', 'language', 'darkmode', 'type', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            telephone=validated_data['telephone'],
            address=validated_data.get('address', ''),
            language=validated_data['language'],
            darkmode=validated_data['darkmode'],
            type=validated_data['type'],
            password=validated_data['password']
        )
        return user
