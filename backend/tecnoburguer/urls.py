from django.urls import path
from .views import Register, Stores
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('register/', Register.as_view(), name="register"),
    path('stores/', Stores.as_view(), name='stores'),
]