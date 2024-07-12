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

    username=None
    name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    telephone = models.CharField(max_length=15, blank=False)
    address = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=9, choices=types, default='client')
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['name', 'telephone', 'type']
    last_name=None
    first_name=None
    objects = UserManager()