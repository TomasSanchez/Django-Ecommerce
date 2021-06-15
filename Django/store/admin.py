from django.contrib import admin
from .models import Product, Basket, Tag, Category, ProductImage

admin.site.register(Product)
admin.site.register(Basket)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(ProductImage)