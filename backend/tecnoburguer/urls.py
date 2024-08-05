from django.urls import path
from .views import Register, get_user_from_token, get_stores_open, search
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('user/login', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('user/register', Register.as_view(), name="register"),
    path('user/get_user_from_token', get_user_from_token, name="get_user_from_token"),
    path('stores/open', get_stores_open, name='get_stores_open'),
    path('stores/search/', search, name='store-search'),
]
