from django.urls import path
from .views import AllProducts, PopularProductList, ProductList, CategoryProductsList, TagProductsList, ProductDetail, ProductCreate, Categories

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name='products_list'),                                   # returns all products
    path('<int:pk>', ProductDetail.as_view(), name='product_create'),                        # returns single product
    path('categories', Categories.as_view(), name='categories_list'),                        # returns all categories
    path('popular', PopularProductList.as_view(), name='popular_products_list'),             # returns all products labeled as popular for a store front view
    path('tag/<int:pk>', TagProductsList.as_view(), name='tag_products_list'),               # returns all products of a single tag
    path('category/<int:pk>', CategoryProductsList.as_view(), name='category_products_list'),# returns all products of a single category
    
    path('create', ProductCreate.as_view(), name='product_create'),                          # for admint to create new products
    path('allproducts', AllProducts.as_view(), name='all_products'),                          # for admint to create new products
]
