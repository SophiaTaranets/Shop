from django.db.migrations import serializer
from django.http import Http404
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings


from shopapp.models import Product, ShoppingCart, Order
from shopapp.permissions import IsAdminOrIfAuthentificateReadOnly, IsAdminOrIfAuthentificate
from shopapp.serealizers import ProdactSerializer, ShoppingCartSerializer, ShoppingCartListSerializer, OrderSerializer, UserSerializer, OrderListSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProdactSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminOrIfAuthentificateReadOnly,)

    # def get_permissions(self):
    #     if self.action in ("create", "update", "partial_update", "destroy"):
    #         return [IsAdminUser()]
    #     return super().get_permissions()

class ShoppingCartViewSet(viewsets.ModelViewSet):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ShoppingCartListSerializer
        return ShoppingCartSerializer

    def list(self, request, *args, **kwargs):
        queryset = ShoppingCart.objects.filter(status='active').all()
        serializer = ShoppingCartListSerializer(queryset, many=True)
        return Response(serializer.data)

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminOrIfAuthentificate,)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminOrIfAuthentificate, )

    def get_serializer_class(self):
        if self.action == "list":
            return OrderListSerializer
        return OrderSerializer


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

class CreateTokenView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

