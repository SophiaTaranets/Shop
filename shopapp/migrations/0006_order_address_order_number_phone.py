# Generated by Django 4.2 on 2023-04-12 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0005_remove_shoppingcart_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.CharField(default='adress', max_length=255),
        ),
        migrations.AddField(
            model_name='order',
            name='number_phone',
            field=models.CharField(default='', max_length=10),
        ),
    ]