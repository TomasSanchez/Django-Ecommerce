from rest_framework import generics, serializers
from rest_framework.response import Response

from cart.models import Cart

from .models import Product, Category
from .serializers import CategorySerializer, ProductSerializer


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
        
        # IMPROVE
        
        items_per_page = 6
        data = []
        page_index = 0
        page_data = []
        for index in range(len(serializer.data)):
            if ((index  % items_per_page == 0) and index != 0) or ():
                data.insert(page_index, {'page':page_index,'data':page_data})
                page_index += 1
                page_data = []
            page_data.append(serializer.data[index])
        data.insert(page_index, {'page':page_index,'data':page_data})        
        # print('--------------------------------------------- ---------------------------------------------')
        response = {'meta': {
            'totalCount': len(serializer.data),
            'pageCount': len(data),
            'items_per_page': items_per_page,
            },
            'data': data}
        # print('--------------------------------------------- ---------------------------------------------')
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
        
        # IMPROVE
        items_per_page = 6
        data = []
        page_index = 0
        page_data = []
        for index in range(len(serializer.data)):
            if ((index  % items_per_page == 0) and index != 0) or ():
                data.insert(page_index, {'page':page_index,'data':page_data})
                page_index += 1
                page_data = []
            page_data.append(serializer.data[index])
        data.insert(page_index, {'page':page_index,'data':page_data})        
        # print('--------------------------------------------- ---------------------------------------------')
        response = {'meta': {
            'totalCount': len(serializer.data),
            'pageCount': len(data),
            'items_per_page': items_per_page,
            },
            'data': data}
        # print('--------------------------------------------- ---------------------------------------------')
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


class TagProductsList(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Product.postobjects.filter(tag=pk)
        return queryset


# FIX For creating a product, this should be available only to admin
class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
