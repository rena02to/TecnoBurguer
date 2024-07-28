from django.contrib import admin

from .models import Food

class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'value', 'stock', 'status')

admin.site.register(Food, FoodAdmin)