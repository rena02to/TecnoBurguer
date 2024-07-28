from django.db import models

class Food(models.Model):
    status=(
        ('Avaliable', 'Available'),
        ('Unavailable', 'Unavailable')
    )

    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    stock = models.IntegerField()
    status = models.CharField(max_length=12, choices=status, default='Available')