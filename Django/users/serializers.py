from rest_framework import serializers
from .models import User

class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    user_basket = serializers.SerializerMethodField('basket')

    def basket(self, user):
        return user.user_basket.products.values()
        # .products.all().values()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_name', 'start_date', 'user_basket')