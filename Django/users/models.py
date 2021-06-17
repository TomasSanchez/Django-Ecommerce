from django.db import models
from django.db.models.fields.related import ForeignKey
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, first_name, last_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, last_name, password, **other_fields)

    def create_user(self, email, first_name, last_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email_address'), unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    start_date = models.DateTimeField(auto_now_add=True)
    is_staff =  models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

# TODO Create new app with payment functionallity
# class Payment(models.Model):
#   user = models.ForeignKey(User, on_delete=models.CASCADE )  
#   card_number = models.IntegerField

# TODO continue and finish
# class Address(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE )
#     street = 
#     number
#     appartment
