from django.urls import path

from views import UserCreatView

urlpatterns = [
    path('registration', UserCreatView.as_view()),
]