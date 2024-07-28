from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

class User(AbstractUser):
    types=(
        ('sudo', 'Superuser'),
        ('admin', 'Administrador'),
        ('employee', 'Funcionário'),
        ('client', 'Cliente'),
    )

    languages=(
        ('pt', 'Português'),
        ('en', 'Inglês'),
        ('es', 'Espanhol'),
    )

    dark=(
        ('Yes', 'Yes'),
        ('No', 'No'),
    )

    username=None
    name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    telephone = models.CharField(max_length=15, blank=False, unique=True)
    language=models.CharField(max_length=2, choices=languages, blank=False, default='pt')
    darkmode=models.CharField(max_length=3, choices=dark, blank=False, default='No')
    type = models.CharField(max_length=9, choices=types, default='client')
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['name', 'telephone', 'language', 'darkmode', 'type']
    last_name=None
    first_name=None
    objects = UserManager()