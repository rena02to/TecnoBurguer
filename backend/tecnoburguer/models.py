from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

class User(AbstractUser):
    types=(
        ('sudo', 'Superuser'),
        ('admin', 'Administrador'),
        ('attendant', 'Atendente'),
        ('cashier', 'Caixa'),
        ('chef', 'Cozinheiro'),
        ('deliveryman', 'Entregador'),
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
    type = models.CharField(max_length=11, choices=types, default='client')
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['name', 'telephone', 'language', 'darkmode', 'type']
    last_name=None
    first_name=None
    objects = UserManager()

class Store(models.Model):
    States = (
        ('open', 'Aberta'),
        ('close_today', 'Fechada hoje'),
        ('close_temporarily', 'Fechada temporariamente'),
        ('close_permanently', 'Fechada permanentemente')
    )

    name = models.CharField(max_length=50)
    locale = models.CharField(max_length=255)
    states = models.CharField(max_length=17, choices=States, default='open')
    admins = models.ManyToManyField(User, related_name='admin_stores', limit_choices_to={'type': 'admin'})
    employees = models.ManyToManyField(User, related_name='employee_stores', limit_choices_to={'type': 'employee'})

class StoreHour(models.Model):
    store = models.ForeignKey(Store, related_name='hours', on_delete=models.CASCADE)
    monday_open = models.TimeField()
    monday_close = models.TimeField()
    tuesday_open = models.TimeField()
    tuesday_close = models.TimeField()
    wednesday_open = models.TimeField()
    wednesday_close = models.TimeField()
    thursday_open = models.TimeField()
    thursday_close = models.TimeField()
    friday_open = models.TimeField()
    friday_close = models.TimeField()
    saturday_open = models.TimeField()
    saturday_close = models.TimeField()
    sunday_open = models.TimeField()
    sunday_close = models.TimeField()
    def __str__(self):
        return f"Hours for {self.store.name}"

class Food(models.Model):
    States = (
        ('avaliable', 'Disponível'),
        ('unavaliable', 'Indisponível'),
    )

    store = models.ForeignKey(Store, related_name="food", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    desc = models.CharField(max_length=255)
    amount = models.IntegerField()
    value = models.DecimalField(max_digits=6, decimal_places=2)
    states = models.CharField(max_length=12, choices=States, default='avaliable')
    image = models.ImageField(upload_to='images/')

class Order(models.Model):
    store = models.ForeignKey(Store, related_name="order", on_delete=models.PROTECT)
    user = models.ForeignKey(User, related_name='orders', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    total_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    name_store = models.CharField(max_length=50, blank=True)

    def save(self, *args, **kwargs):
        self.name_store = self.store.name
        if not self.total_value:
            total = sum(item.total for item in self.items.all())
            self.total_value = total
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.PROTECT)
    food = models.ForeignKey(Food, related_name='order_items', on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        # Calcula o total do item antes de salvar
        self.total = self.food.price * self.quantity
        super().save(*args, **kwargs)