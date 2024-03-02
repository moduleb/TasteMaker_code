from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserCreateView, UserRUDView

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name='register'),
    path('api/user/<int:pk>/', UserRUDView.as_view(), name='user-detail'),
]

