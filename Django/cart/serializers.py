from rest_framework import serializers

from store.serializers import ProductSerializer

from .models import Cart, Item

class ItemSerializer(serializers.ModelSerializer):
    
    image = serializers.SerializerMethodField('get_feature_image')
    product = ProductSerializer(read_only=True)    

    def get_feature_image(self, item):
        for image in item.product.product_image.values():
            if image['is_feature']:
                return image
        return 'No images to display' # FIX There should always be an image to display
        # Item.product.product_image.values()[0]['image'] or

    class Meta:
        model = Item
        fields = ('id', 'product', 'size', 'color', 'paper_type', 'quantity', 'image', 'price')
        extra_kwargs = {"price": {"required": False, "allow_null": True}}

class CartSerializer(serializers.ModelSerializer):

    items_total = serializers.SerializerMethodField('get_items_total')
    # items = serializers.SerializerMethodField('get_items')
    total = serializers.SerializerMethodField('get_total')

    def get_items(self, cart):
        return cart.cart_item.values()

    def get_items_total(self, cart):
        total = 0
        for item in cart.cart_item.values():
            total += (item['price'])*item['quantity']
        return total
    
    def get_total(self, cart):
        total = self.get_items_total(cart)
        # FIX delivery cost should be estimated either by user imput in early stages or MercadoEnvios API
        delivery_cost = 0
        if cart.with_delivery:
            total += delivery_cost
        return total

    class Meta:
        model = Cart
        fields = ('user', 'paid', 'with_delivery', 'items_total', 'total')
