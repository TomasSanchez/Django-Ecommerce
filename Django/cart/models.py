from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator

from store.models import Product


User = settings.AUTH_USER_MODEL

class Cart(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_cart')
    paid = models.BooleanField(default=False)
    with_delivery = models.BooleanField(default=False)


class Item(models.Model):
    
    sizes_options = (
        ('L', 'Large'),
        ('M', 'Medium'),
        ('S', 'Small'),
    )

    color_options = (
        ('White', 'white'),
        ('Black', 'black'),
        ('Wood', 'wood'),
    )

    paper_options = (
        ('Glossy', 'glossy'),
        ('Mate', 'mate')
    )

    price = models.DecimalField(
        help_text=_("Maximum 9999.99"),
        error_messages={
            "name": { "max_length": _("The price must be between 0 and 9999.99")}},
        max_digits=6, decimal_places=2,
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_item')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_item')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    size = models.CharField(max_length=10, choices=sizes_options, default='M')
    color = models.CharField(max_length=10, choices=color_options, default='Black')
    paper_type = models.CharField(max_length=10, choices=paper_options, default='Glossy')
    # FIX Maybe add options from 1 to 10 as a dropdown
    quantity = models.IntegerField(help_text=_("Maximum 10"),
        error_messages={
            "name": { "max_length": _("The price must be between 0 and 9999.99")}},
        default=1,
        validators=[MaxValueValidator(10), MinValueValidator(1)]
            )
    
    # class Meta:
    #     constraints = [
    #         models.CheckConstraint(
    #             check=models.Q(quantity__gte=1) & models.Q(quantity__lte=10),
    #             name="A quantity value is valid between 1 and 10",
    #         )
    #     ]

def post_user_created_signal(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)

post_save.connect(post_user_created_signal, sender=User)