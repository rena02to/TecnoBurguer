from django.db import models

class UsersData(models.Model):
    types = (
        ('admin', 'Administrador'),
        ('employee', 'Funcionário'),
        ('client', 'Cliente')
    )
    
    login = models.CharField(unique=True, max_length=14)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telephone = models.CharField(unique=True, max_length=15)
    adress = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(
        max_length=8,
        choices=types,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)