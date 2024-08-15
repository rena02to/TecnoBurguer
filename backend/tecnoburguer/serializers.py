from rest_framework import serializers
from .models import User, Store, StoreHour, Food
from django.db.models import Avg
import pytz
from datetime import datetime, timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'telephone', 'language', 'darkmode', 'type', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            telephone=validated_data['telephone'],
            language=validated_data['language'],
            darkmode=validated_data['darkmode'],
            type=validated_data['type'],
            password=validated_data['password']
        )
        return user

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'desc', 'amount', 'value', 'state', 'image']

class StoresOpenSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    opening_hours = serializers.SerializerMethodField()
    is_open_now = serializers.SerializerMethodField()
    foods = serializers.SerializerMethodField()

    class Meta:
        model = Store
        fields = ['name', 'locale', 'min_order', 'id', 'foods']

    class Meta:
        model = Store
        fields = ['id', 'name', 'min_order', 'average_rating', 'opening_hours', 'is_open_now', 'foods']

    def get_foods(self, obj):
        request = self.context.get('request')
        query = request.GET.get('q', '')
        foods = obj.food.filter(name__icontains=query)
        return FoodSerializer(foods, many=True, read_only=True).data
    
    def get_average_rating(self, obj):
        average_rating = obj.assessments.aggregate(Avg('stars'))['stars__avg']
        return float(round(average_rating, 1)) if average_rating is not None else float(0)

    def get_opening_hours(self, obj):
        current_day = datetime.now()
        try:
            store_hours = obj.hours.get()
            store_timezone = pytz.timezone(store_hours.timezone)
            open_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_open")
            close_time = getattr(store_hours, f"{current_day.strftime('%A').lower()}_close")
            now = datetime.now(pytz.utc).astimezone(store_timezone)
            if (open_time and close_time) and (open_time != close_time):
                close_time = store_timezone.localize(datetime.combine(now.date(), close_time))
                open_time = store_timezone.localize(datetime.combine(now.date(), open_time))
                if now < open_time:
                    return {'status' : 'close', 'day': 'today', 'hours_open' : open_time.strftime("%H:%M")}
                else:
                    return {'status' : 'open', 'hours_close' : close_time.strftime("%H:%M")}
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