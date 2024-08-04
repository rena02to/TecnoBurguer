from rest_framework import serializers
from .models import User, Store, StoreHour
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

class StoresOpenSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    opening_hours = serializers.SerializerMethodField()
    
    class Meta:
        model = Store
        fields = ['id', 'name', 'locale', 'min_order', 'average_rating', 'opening_hours']
    
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
            if (open_time and close_time) and (open_time != close_time): 
                now = datetime.now(pytz.utc).astimezone(store_timezone)
                close_time = store_timezone.localize(datetime.combine(now.date(), close_time))
                return {'status' : 'open', 'hours_close' : close_time.strftime("%H:%M")}
            else:
                for i in range(1, 8):
                    next_day = (current_day + timedelta(days=i)).strftime('%A').lower()
                    next_day_open = getattr(store_hours, f'{next_day}_open')
                    next_day_close = getattr(store_hours, f'{next_day}_close')
                    if (next_day_open and next_day_close) and (next_day_open != next_day_close):
                        now = datetime.now(pytz.utc).astimezone(store_timezone)
                        open_time = store_timezone.localize(datetime.combine(now.date(), next_day_open))
                        return {'status': 'close', 'day' : 'tomorrow' if i == 1 else next_day, 'hours_open' : open_time.strftime("%H:%M")}
                return {'status': 'close week'}
        except StoreHour.DoesNotExist:
            return {'status': 'not hours'}