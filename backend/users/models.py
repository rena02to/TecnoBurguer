from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    types=(
        ('sudo', 'Superuser'),
        ('admin', 'Administrador'),
        ('employee', 'Funcionário'),
        ('client', 'Cliente'),
    )

    name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    telephone = models.CharField(max_length=15, blank=False)
    address = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=9, choices=types, default='client')

    REQUIRED_FIELDS = ['name', 'email', 'telephone', 'type']
    last_name=None
    first_name=None