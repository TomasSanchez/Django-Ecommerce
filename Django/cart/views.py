from django.http import response
from django.shortcuts import redirect

from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from store.models import Product

from .models import Cart, Item
from .serializers import CartSerializer, ItemSerializer


# REMOVE Unsued
class CartRetrieveView(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        for field in self.multiple_lookup_fields:
            filter[field] = self.kwargs[field]

        obj = generics.get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj


class CartView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
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
        if not(int(request.data['quantity']) in range(0,11)):
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
                return Response({'error': 'item already in cart'},status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(price=price, cart=cart, product=product)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ItemsList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        cart = Cart.objects.get(user=request.user.id)
        queryset = queryset.filter(cart=cart.id)

        serializer_cart = CartSerializer(cart)
        serializer = self.get_serializer(queryset, many=True)
        response = {'cart_info': serializer_cart.data,'items': serializer.data}
        return Response(response)
    
    
class UpdateDeleteItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        pk = kwargs.pop('pk')
        attr = kwargs.pop('attr')
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        print('-------------------------------1---------------------------------')
        print(request.data)
        print('-------------------------------1---------------------------------')
        serializer.is_valid(raise_exception=True)
        serializer.save(update_fields=[attr])
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)        


