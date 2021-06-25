from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'first_name',)
    list_filter = ('email', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'first_name', 'id', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name','last_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
