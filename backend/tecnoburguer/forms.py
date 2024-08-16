from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User, Food
from django import forms
from cloudinary.uploader import upload

class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('name', 'email', 'telephone', 'language', 'darkmode', 'type')

class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('name', 'email', 'telephone', 'language', 'darkmode', 'type')
