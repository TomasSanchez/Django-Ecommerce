from django.urls import path
from .views import CartRetrieveView, CartView, AddItemToCart, ItemsList, UpdateDeleteItem

app_name = 'cart'

urlpatterns = [
    # path('', CartView.as_view(), name='cart_view'), REMOVE Unused
    path('', ItemsList.as_view(), name='items_list'),
    path('add', AddItemToCart.as_view(), name='add_to_cart'),
    path('<int:pk>', UpdateDeleteItem.as_view(), name='update_delete_item')
]