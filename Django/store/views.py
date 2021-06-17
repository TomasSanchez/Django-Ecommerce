from rest_framework import generics
from rest_framework.response import Response

from cart.models import Cart
from .models import Product
from .serializers import ProductSerializer


class ProductList(generics.ListAPIView):
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Product.postobjects.all()
    serializer_class = ProductSerializer


# This could be done in the front end by filterin on field is popular
class PopularProductList(generics.ListAPIView):
    queryset = Product.popularprodobjects.all()
    serializer_class = ProductSerializer


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


class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class AddToBasket(generics.RetrieveUpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = ProductSerializer

    def update(self, request, *args, **kwargs):
        user = self.request.user
        print(user)
        pk = self.kwargs['pk'] #TODO
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


    # TotoBasket = Cart.objects.get(id=1)
    # Prod1 = Product.objects.get(id=1)
    # TotoBasket.products.add(Prod1)