from django.urls import path
from .views import CreateFood

urlpatterns = [
    path('create-food', CreateFood.as_view(), name="create-food")
]