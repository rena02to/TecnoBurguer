from django.urls import path
from .views import Register, get_user_from_token
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('register', Register.as_view(), name="register"),
    path('get_user_from_token', get_user_from_token, name="get_user_from_token"),
]