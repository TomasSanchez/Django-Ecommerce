from django.urls import path
from .views import CartView, AddItemToCart, ItemsList

app_name = 'cart'

urlpatterns = [
    path('', CartView.as_view(), name='cart_view'), 
    path('add', AddItemToCart.as_view(), name='add_to_cart'),
    path('items', ItemsList.as_view(), name='items_list'), #REMOVE Testing only
]