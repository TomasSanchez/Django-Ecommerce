from django.urls import path
from .views import UserList

app_name = 'user'

urlpatterns = [
    path('view', UserList.as_view(), name='products_list'),
    # path('create', ProductCreate.as_view(), name='product_create'),
    # path('view/<int:pk>', Product.as_view(), name='product_create'),
]