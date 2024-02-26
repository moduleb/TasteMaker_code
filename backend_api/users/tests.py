from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User


class UserTests(APITestCase):

    def setUp(self):

        User.objects.create(email='user1@mail.ru', password='12345678')

    # def test_get_user(self):
    #     response = self.client.get(reverse('registr'))
    #     self.assertEqual(response.data, {'email': 'user1@mail.ru',
    #                                      'password': '12345678'})

    def test_positive_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('registr')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('registr')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_email(self):
        """
        Проверка email на количество символов до @ при создании пользователя
        """
        url = reverse('registr')
        data = {'email': 'us@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_positive_email(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('registr')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_positive_min_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('registr')
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
        url = reverse('registr')
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
        url = reverse('registr')
        data = {'email': 'user2@mail.ru',
                'password': psw}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
