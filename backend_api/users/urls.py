from django.urls import path

from .views import UserCreateView

urlpatterns = [
    path('api/register', UserCreateView.as_view(), name='registr'),
]