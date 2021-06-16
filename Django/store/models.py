from cart.models import Item
from django.db import models
from django.utils.translation import gettext_lazy as _


class Product(models.Model):

    class ProdObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_active=True)

    class PopularProdObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_active=True).filter(is_popular=True)
        # TODO test if Product.postobjects.all().filter(is_popular=True) works the same

    large_price = models.DecimalField(
        verbose_name=_("Large price"),
        help_text=_("Maximum 9999.99"),
        error_messages={
            "name": { "max_length": _("The price must be between 0 and 9999.99")}},
        max_digits=6,
        decimal_places=2,
    )
    medium_price = models.DecimalField(
        verbose_name=_("Medium price"),
        help_text=_("Maximum 9999.99"),
        error_messages={
            "name": { "max_length": _("The price must be between 0 and 9999.99")}},
        max_digits=6,
        decimal_places=2,
    )
    small_price = models.DecimalField(
        verbose_name=_("Small price"),
        help_text=_("Maximum 9999.99"),
        error_messages={
            "name": { "max_length": _("The price must be between 0 and 9999.99")}},
        max_digits=6,
        decimal_places=2,
    )
    title = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    category = models.ForeignKey('Category', related_name='prod_category', blank=True, null=True, on_delete=models.SET_NULL)
    tag = models.ManyToManyField('Tags', related_name='prod_tags', blank=True)
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, blank=True, null=True, related_name='item_product')

    objects = models.Manager()  # default manager
    postobjects = ProdObjects()  # custom manager
    popularprodobjects = PopularProdObjects()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title 


class Tags(models.Model):

    title = models.CharField(max_length=40)
    
    def __str__(self):
        return self.title


class Category(models.Model):

    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")


class ProductImage(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_image")
    image = models.ImageField(
        verbose_name=_("image"),
        help_text=_("Upload a product image"),
        upload_to="images/",
        default="images/default.png",
    )
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name = _("Product Image")
        verbose_name_plural = _("Product Images")
