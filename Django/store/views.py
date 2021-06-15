from django.shortcuts import render
from rest_framework import generics

from .models import Product, Basket, Tag, Category, ProductImage
from .serializers import ProductSerializer

class ProductList(generics.ListAPIView):
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class Product(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer