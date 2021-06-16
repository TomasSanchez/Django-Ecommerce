from django.contrib import admin
from .models import Product, Tags, Category, ProductImage

admin.site.register(Product)
admin.site.register(Tags)
admin.site.register(Category)
admin.site.register(ProductImage)