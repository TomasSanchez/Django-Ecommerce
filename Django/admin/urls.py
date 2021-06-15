from django.urls import path
from django.conf import settings
from django.contrib import admin
from django.urls.conf import include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/store/', include('store.urls', namespace='store'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)