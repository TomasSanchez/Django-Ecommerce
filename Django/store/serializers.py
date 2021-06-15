from rest_framework import serializers
from .models import Product, Basket, Tag, Category, ProductImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["title"]

class ProductSerializer(serializers.ModelSerializer):
    
    product_image = ImageSerializer(many=True, read_only=True)
    in_bags = serializers.SerializerMethodField('get_in_basket_count')

    def get_in_basket_count(self, product):
        return product.basket_products.count()

    class Meta:
        model = Product
        fields = ('title', 'large_price', 'medium_price', 'small_price', 'is_popular',
                    'size', 'color', 'paper_type', 'category', 'tags', 'in_bags', 'product_image')





# class CommentSerializer(serializers.ModelSerializer):

#     user_name = serializers.SerializerMethodField('get_username_from_author')
#     likes = serializers.SerializerMethodField('get_number_of_likes')
#     likes_usernames = serializers.SerializerMethodField('get_username_from_postLikes')

#     class Meta:
#         model = Comment
#         fields = ('id', 'content', 'user_name', 'likes', 'likes_usernames')

#     def get_username_from_author(self, post):
#         user_name = post.author.user_name
#         return user_name

#     def get_number_of_likes(self, post):
#         likes = post.likes.all()
#         return post.number_of_likes()
    
#     def get_username_from_postLikes(self, post):
#         likes = post.likes.all()
#         return [like.user_name for like in likes]