from django.contrib import admin
from django.urls import path, include, re_path
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


urlpatterns = [
    path('admin/', admin.site.urls),
    path('favicon.ico', lambda _ : redirect('static/images/favicon.ico', permanent=True)),
    path('', include('home.urls')),
    path('api/', include('api.urls')),
    re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {
                "document_root": settings.MEDIA_ROOT,
            },
        ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)