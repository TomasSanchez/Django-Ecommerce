from django.urls import path
from .views import login_set_cookie, get_csrf, login_view, logout_view

app_name = 'user'

urlpatterns = [
    path('login_set_cookie', login_set_cookie, name='login_set_cookie'),
    path('get_csrf', get_csrf, name='get_csrf'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
]