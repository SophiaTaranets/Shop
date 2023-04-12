from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers

from shopapp.models import Product, ShoppingCart, Order, User


class ProdactSerializer(serializers.ModelSerializer):
    class Meta:

        model = Product
        fields = ('title', 'price', "id", "description",)




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'email')
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {'password':
                            {'write_only': True, 'min_length': 5}
                        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user



class ShoppingCartSerializer(serializers.ModelSerializer):
    # products = ProdactSerializer(many=True, read_only=False)
    class Meta:
        model = ShoppingCart
        fields = ('id', 'amount', 'products', 'status')

class ShoppingCartListSerializer(ShoppingCartSerializer):
    products = ProdactSerializer(many=True, read_only=True)




class OrderSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ('products', 'order_date', 'number_phone', 'address', 'id')


class OrderListSerializer(serializers.ModelSerializer):
    products = ProdactSerializer(many=True, read_only=False)
