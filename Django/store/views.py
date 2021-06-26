from django.conf import settings

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from cart.models import Cart
from store.pagination import get_response_in_pages

from .models import Product, Category
from .serializers import CategorySerializer, ProductSerializer


items_per_page = settings.ITEMS_PER_PAGE


class ProductList(generics.ListAPIView):
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Product.postobjects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        
        response = get_response_in_pages(items_per_page, serializer)
        return Response(response)
        # return Response(serializer.data)


# This could be done in the front end by filterin on field is popular
class PopularProductList(generics.ListAPIView):
    queryset = Product.popularprodobjects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        
        response = get_response_in_pages(items_per_page, serializer)
        return Response(response)


class Categories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    
class CategoryProductsList(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Product.postobjects.filter(category=pk)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        response = get_response_in_pages(items_per_page, serializer)
        return Response(response)



class TagProductsList(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Product.postobjects.filter(tag=pk)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        response = get_response_in_pages(items_per_page, serializer)
        return Response(response)


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductCreate(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer




# Development only REMOVE
class AllProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer