# Generated by Django 4.2 on 2023-04-12 17:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0007_remove_order_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='products',
        ),
    ]
