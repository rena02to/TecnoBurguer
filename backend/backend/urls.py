from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect


urlpatterns = [
    path('admin/', admin.site.urls),
    path('favicon.ico', lambda _ : redirect('static/images/favicon.ico', permanent=True)),
    path('', include('home.urls')),
    path('api/', include('api.urls')),
]
