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
    
    liked_posts = serializers.SerializerMethodField('get_liked_posts')
    user_posts = serializers.SerializerMethodField('get_user_posts')

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_name', 'start_date', 'about', 'liked_posts', 'user_posts')

    def get_liked_posts(self, user):
        return user.post_likes.all().values()
    
    def get_user_posts(self, user):
        return user.post_author.all().values()