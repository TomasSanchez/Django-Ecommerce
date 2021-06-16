from rest_framework import serializers
from .models import Product, Category, ProductImage
from cart.models import Cart

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
    in_bags = serializers.SerializerMethodField('get_in_basket_count') #FIX
    price = serializers.SerializerMethodField('get_price')
    tags = serializers.SerializerMethodField('get_tags')

    def get_tags(self, product):
        return product.tags.values()

    # FIX
    def get_in_basket_count(self, product):
        return product.cart_products.count()

    class Meta:
        model = Product
        fields = ('title', 'is_popular', 'price', 'size', 'color', 'paper_type', 'category', 'tags', 'in_bags', 'product_image', 'large_price', 'medium_price', 'small_price')
