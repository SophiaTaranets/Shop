# Generated by Django 4.2 on 2023-04-11 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0003_shoppingcart_amount'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name_plural': 'products'},
        ),
        migrations.AlterField(
            model_name='shoppingcart',
            name='products',
            field=models.ManyToManyField(related_name='products', to='shopapp.product'),
        ),
    ]
