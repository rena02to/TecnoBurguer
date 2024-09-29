from rest_framework import serializers
from .models import User, Store, StoreHour, Food
from django.db.models import Avg
import pytz
from datetime import datetime, timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'telephone', 'darkmode', 'type', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            telephone=validated_data['telephone'],
            darkmode=validated_data['darkmode'],
            type=validated_data['type'],
            password=validated_data['password']
        )
        return user

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'desc', 'amount', 'value', 'state', 'image']

class StoresSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    opening_hours = serializers.SerializerMethodField()
    is_open_now = serializers.SerializerMethodField()
    average_price = serializers.SerializerMethodField()

    class Meta:
        model = Store
        fields = ['id', 'name', 'min_order', 'average_rating', 'opening_hours', 'is_open_now', 'average_price']
    
    def get_average_rating(self, obj):
        average_rating = obj.assessments.aggregate(Avg('stars'))['stars__avg']
        return float(round(average_rating, 1)) if average_rating is not None else float(0)

    def get_opening_hours(self, obj):
        try:
            store_hours = obj.hours.get()
            store_timezone = pytz.timezone(store_hours.timezone)
            current_day = datetime.now(store_timezone)
            open_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_open")
            close_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_close")
            now = datetime.now(pytz.utc).astimezone(store_timezone)
            if (open_time and close_time) and (open_time != close_time):
                close_time = store_timezone.localize(datetime.combine(now.date(), close_time))
                open_time = store_timezone.localize(datetime.combine(now.date(), open_time))
                if now >= open_time and now <= close_time:
                    return {'status' : 'open', 'hours_close' : close_time.strftime("%H:%M")}
                else:
                    return {'status' : 'close', 'day': 'today', 'hours_open' : open_time.strftime("%H:%M")}
            else:
                for i in range(1, 8):
                    next_day = (current_day + timedelta(days=i)).strftime('%A').lower()
                    next_day_open = getattr(store_hours, f'{next_day}_open')
                    next_day_close = getattr(store_hours, f'{next_day}_close')
                    if (next_day_open and next_day_close) and (next_day_open != next_day_close):
                        open_time = store_timezone.localize(datetime.combine(now.date(), next_day_open))
                        return {'status': 'close', 'day' : 'tomorrow' if i == 1 else next_day, 'hours_open' : open_time.strftime("%H:%M")}
                return {'status': 'close week'}
        except StoreHour.DoesNotExist:
            return {'status': 'not hours'}
    
    def get_is_open_now(self, obj):
        opening_hours = self.get_opening_hours(obj)
        return opening_hours['status'] == 'open'

    def get_average_price(self, obj):
        foods = obj.food.all()
        if foods:
            average_price = foods.aggregate(Avg('value'))['value__avg']
            return round(average_price, 2)
        return 0.0

class ItemsAvaliableSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    opening_hours = serializers.SerializerMethodField()
    is_open_now = serializers.SerializerMethodField()
    foods = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()

    class Meta:
        model = Store
        fields = ['id', 'name', 'min_order', 'average_rating', 'opening_hours', 'is_open_now', 'foods', 'min_price']
    
    def get_average_rating(self, obj):
        average_rating = obj.assessments.aggregate(Avg('stars'))['stars__avg']
        return float(round(average_rating, 1)) if average_rating is not None else float(0)

    def get_opening_hours(self, obj):
        try:
            store_hours = obj.hours.get()
            store_timezone = pytz.timezone(store_hours.timezone)
            current_day = datetime.now(store_timezone)
            open_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_open")
            close_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_close")
            now = datetime.now(pytz.utc).astimezone(store_timezone)
            if (open_time and close_time) and (open_time != close_time):
                close_time = store_timezone.localize(datetime.combine(now.date(), close_time))
                open_time = store_timezone.localize(datetime.combine(now.date(), open_time))
                if now >= open_time and now <= close_time:
                    return {'status' : 'open'}
            return {'status' : 'close'}
        except StoreHour.DoesNotExist:
            return {'status': 'close'}
    
    def get_is_open_now(self, obj):
        opening_hours = self.get_opening_hours(obj)
        return opening_hours['status'] == 'open'
    
    def get_foods(self, obj):
        query = self.context['request'].query_params.get('q', '')
        foods = obj.food.filter(name__icontains=query)
        return FoodSerializer(foods, many=True).data
    
    def get_min_price(self, obj):
        query = self.context['request'].query_params.get('q', '')
        foods = obj.food.filter(name__icontains=query)
        if foods.exists():
            min_price = min(float(food.value) for food in foods)
        return min_price