# Generated by Django 4.2 on 2023-04-12 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0006_order_address_order_number_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='owner',
        ),
    ]
