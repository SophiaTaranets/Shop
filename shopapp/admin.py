from django.contrib import admin

# Register your models here.
from shopapp.models import Product, Order, ShoppingCart, User

admin.site.register(Product)
admin.site.register(Order)

# @admin.register(ShoppingCart)
# class ShoppingCartAdmin(admin.ModelAdmin):
#     list_display = ['title', 'price', 'description']
admin.site.register(ShoppingCart)
admin.site.register(User)
