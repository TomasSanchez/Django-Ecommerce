from rest_framework import serializers
from .models import Product, Category, ProductImage
from cart.models import Cart

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "is_feature"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["title"]


class ProductSerializer(serializers.ModelSerializer):
    
    product_image = ImageSerializer(many=True, read_only=True)
    tags = serializers.SerializerMethodField('get_tags')
    category = serializers.SerializerMethodField('get_category')

    def get_category(self, product):
        return product.category.title

    def get_tags(self, product):
        return product.tag.values()

    class Meta:
        model = Product
        fields = ('id', 'large_price', 'medium_price', 'small_price', 'title', 'created_at', 'is_active', 'is_popular', 'category', 'tags', 'product_image')
