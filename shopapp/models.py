from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


# Створити базову модель для товарів (назва, ціна, опис та інші поля за необхідності).
class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "products"

    def __str__(self):
        return str(f"{self.title}, {self.price}, {self.description}")

class User(AbstractUser):
    pass


class Order(models.Model):
    products = models.ManyToManyField(Product)
    # owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_date = models.DateField()
    number_phone = models.CharField(max_length=10, default="")
    address = models.CharField(max_length=255, default="adress")

class ShoppingCartStatus(models.TextChoices):
    CLOSED = "closed"
    ACTIVE = "active"


class ShoppingCart(models.Model):
    products = models.ManyToManyField(Product, related_name='products')
    amount = models.IntegerField(default=1)
    status = models.CharField(
        choices=ShoppingCartStatus.choices,
        default=ShoppingCartStatus.CLOSED,
    )
    def __str__(self):
        return str(f"{self.amount}, {self.products}")

