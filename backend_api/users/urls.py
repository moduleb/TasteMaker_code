from django.urls import path

from .views import UserCreatView

urlpatterns = [
    path('register', UserCreatView.as_view()),
]