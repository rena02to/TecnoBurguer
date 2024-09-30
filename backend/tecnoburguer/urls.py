from django.urls import path
from .views import User, Stores
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('user/', User.as_view(), name="user"),
    path('stores/', Stores.as_view(), name='stores'),
]