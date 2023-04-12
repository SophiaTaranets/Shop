from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from shopapp.views import ProductViewSet, ShoppingCartViewSet, OrderViewSet, UserCreateView, CreateTokenView,ManageUserView

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("shoppingcart", ShoppingCartViewSet)
router.register("order", OrderViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserCreateView.as_view(), name="createuser"),
    path('login/', CreateTokenView.as_view(), name="token"),
    path('me/', ManageUserView.as_view(), name='profile'),
]
app_name = "shopapp"