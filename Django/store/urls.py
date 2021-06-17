from django.urls import path
from .views import PopularProductList, ProductList, CategoryProductsList, TagProductsList, ProductDetail, ProductCreate

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name='products_list'),
    path('<int:pk>', ProductDetail.as_view(), name='product_create'),
    path('popular', PopularProductList.as_view(), name='popular_products_list'),
    path('tag/<int:pk>', TagProductsList.as_view(), name='category_products_list'),
    path('category/<int:pk>', CategoryProductsList.as_view(), name='category_products_list'),
    
    path('create', ProductCreate.as_view(), name='product_create'),
]
