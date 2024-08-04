from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Store, StoreHour, Food, Order, OrderItem, Coupon, UserCoupon, Assessment
from .forms import UserCreationForm, UserChangeForm

class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User

    list_display = ('name', 'email', 'telephone', 'language', 'darkmode', 'type', 'is_staff')
    list_filter = ('is_staff', 'is_active', 'type')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'telephone', 'language', 'darkmode', 'type',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'email', 'password1', 'password2', 'telephone', 'language', 'darkmode', 'type'),
        }),
    )
    search_fields = ('name', 'email')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['title'] = 'User list'
        return super(UserAdmin, self).changelist_view(request, extra_context=extra_context)

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'locale', 'state')
    search_fields = ('name', 'locale', 'state')

@admin.register(StoreHour)
class StoreHoursAdmin(admin.ModelAdmin):
    list_display = ('store', 'timezone', 'monday_open', 'monday_close', 'tuesday_open', 'tuesday_close', 'wednesday_open', 'wednesday_close', 'thursday_open', 'thursday_close', 'friday_open', 'friday_close', 'saturday_open', 'saturday_close', 'sunday_open', 'sunday_close')
    search_fields = ('store__name',)

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'store', 'amount', 'value', 'state')
    search_fields = ('name', 'store__name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('store', 'user', 'created_at', 'total_value')
    search_fields = ('store__name', 'user__email')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'food', 'quantity', 'total')
    search_fields = ('order__id', 'food__name')

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('store', 'code', 'discount', 'expiry_date')
    search_fields = ('store', 'code', 'discount', 'expiry_date')

@admin.register(UserCoupon)
class UserCouponAdmin(admin.ModelAdmin):
    list_display = ('user', 'coupon', 'used')
    search_fields = ('user', 'coupon', 'used')

@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('store', 'stars')
    search_fields = ('store', 'stars')


admin.site.register(User, UserAdmin)
admin.site.site_title = 'TecnoBurguer'
admin.site.index_title = 'Administrative Area'
admin.site.site_header = 'Administrative Area'