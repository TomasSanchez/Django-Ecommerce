from rest_framework import serializers
from .models import Cart

class CartSerializer(serializers.ModelSerializer):

    total = serializers.SerializerMethodField('get_total')

# REMOVE FIX
    def get_total(self, cart):
        total = 0
        for item in self.product:
            total += item.price.value()

    class Meta:
        model = Cart
        fields = ('user', 'products')