# Generated by Django 4.2 on 2023-04-12 09:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0004_alter_product_options_alter_shoppingcart_products'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingcart',
            name='owner',
        ),
    ]
