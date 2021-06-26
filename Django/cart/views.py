from django.shortcuts import redirect

from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from store.models import Product

from .models import Cart, Item
from .serializers import CartSerializer, ItemSerializer


class CartView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Cart.objects.filter(user=user)
        return queryset


class AddItemToCart(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]    
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        product = Product.objects.get(id=request.data['product'])
        # check quantity
        if not(int(request.data['quantity'][0]) in range(0,11)):
            return Response({'error': 'quantity must be between 1 and 10 inclusive'}, status=status.HTTP_400_BAD_REQUEST)
        # price based on size
        if request.data['size'] == 'L':
            price = product.large_price
        elif request.data['size'] == 'M':
            price = product.medium_price
        elif request.data['size'] == 'S':
            price = product.small_price
        else:
            return Response({'error': 'size appears to not be declared'},status=status.HTTP_400_BAD_REQUEST)
        user = self.request.user
        cart = Cart.objects.get(user=user)
        # checking if item related to product is already in cart
        for item in Item.objects.filter(cart=cart):
            if item.product==product:
                return Response({'error': 'item already in cart'},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(price=price, cart=cart)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# FIX / REMOVE Testing only
class ItemsList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())

    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset, many=True)
    #     return redirect('http://localhost:3000/')