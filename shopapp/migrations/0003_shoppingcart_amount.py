# Generated by Django 4.2 on 2023-04-11 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0002_rename_prodact_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppingcart',
            name='amount',
            field=models.IntegerField(default=1),
        ),
    ]