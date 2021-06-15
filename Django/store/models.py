from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _

User = settings.AUTH_USER_MODEL

class Product(models.Model):

    class ProdObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_active=True)

    class PopularProdObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_active=True).filter(is_popular=True)


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

    title = models.CharField(max_length=250)
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

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    size = models.CharField(max_length=10, choices=sizes_options, default='M')
    color = models.CharField(max_length=10, choices=color_options, default='White')
    paper_type = models.CharField(max_length=10, choices=paper_options, default='Mate')
    category = models.ForeignKey('Category', related_name='prod_category', blank=True, null=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField('Tag', related_name='prod_tags', blank=True)

    objects = models.Manager()  # default manager
    postobjects = ProdObjects()  # custom manager
    popularprodobjects = PopularProdObjects()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title 


class Basket(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_basket')
    products = models.ManyToManyField(Product, related_name='basket_products', blank=True)


class Tag(models.Model):

    tag = models.CharField(max_length=40)
    
    def __str__(self):
        return self.tag


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

def post_user_created_signal(sender, instance, created, **kwargs):
    if created:
        Basket.objects.create(user=instance, products=[])

post_save.connect(post_user_created_signal, sender=User)