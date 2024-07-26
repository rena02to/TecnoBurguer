from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('get_user_from_token', views.get_user_from_token, name="get_user_from_token"),
]
