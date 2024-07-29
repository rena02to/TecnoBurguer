from django.urls import path
from .views import CreateFood, ListFood

urlpatterns = [
    path('create-food', CreateFood.as_view(), name="create-food"),
    path('list-food', ListFood.as_view(), name="create-food"),
]