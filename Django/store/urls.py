from django.urls import path
from .views import ProductList, ProductCreate, Product

app_name = 'store'

urlpatterns = [
    path('view', ProductList.as_view(), name='products_list'),
    path('create', ProductCreate.as_view(), name='product_create'),
    path('view/<int:pk>', Product.as_view(), name='product_create'),
]
