from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from users.models import User


class UserTests(APITestCase):

    def setUp(self):

        self.test_user = User.objects.create_user(email="user1@mail.ru", password="12345678")
        self.test_user.save()
        print(self.test_user.id)

    def test_get_user(self):
        """Проверка на status_code_200 и существование пользователя по email"""

        response = self.client.get(f'/api/user/{self.test_user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'user1@mail.ru')

    def test_positive_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_email(self):
        """
        Проверка email на количество символов до @ при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'us@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_positive_email(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_positive_min_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_min_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        import string
        import random

        psw = ''
        gen = string.ascii_letters + string.digits + string.punctuation
        for char in range(7):
            psw += random.choice(gen)
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '1234567'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_positive_max_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        import string
        import random

        psw = ''
        gen = string.ascii_letters + string.digits + string.punctuation
        for char in range(64):
            psw += random.choice(gen)
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': psw}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
