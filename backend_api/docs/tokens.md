<a name="get-access_token"></a>
## Получение access-токена.

Для получения access-токена необходимо сделать запрос `POST http://127.0.0.1:8000/api/token`

**Запрос**

Указываем в запросе учетные данные уже [зарегестрированного](users#register) пользователя.

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

**Ответ**

Получаем [access-токен](#use-access_token) и [refresh-токен](#use-refresh_token).

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjQyNjQ2NiwiaWF0IjoxNzA2MzQwMDY2LCJqdGkiOiJiYzZhYTAyNzQ1YmE0ZjczODFkOGY4MzNmOWZmMzUwYiIsInVzZXJfaWQiOjJ9.1qGtt-ial3F5vH2nmOZhwk2DQcvZPWwxyW7IceMbo20",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQwMzY2LCJpYXQiOjE3MDYzNDAwNjYsImp0aSI6IjAzNmRhN2VkNTVjNTQ0YmU5MGY2ODhjYjcxM2FhOGVhIiwidXNlcl9pZCI6Mn0.QYt_JOm20yXTP7bfpzdbMGn3ddsYzPgOaLDx_34p7nE"
}
```

**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - Пользотель с такмми учетными данными не зарегестрирован.

---

<a name="check-access_token"></a>

## Проверка access-токена.


```
`POST http://127.0.0.1:8000/api/token/verify`
```

**Запрос**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQxMDQxLCJpYXQiOjE3MDYzNDA3NDEsImp0aSI6ImJiZjc4ZGQxMGI2NzQ5NTlhZjY1MzM1ZjZmNDBjNWIzIiwidXNlcl9pZCI6Mn0.pird2eYS2VCfeycWJMFFdVOIgDrTHRyF2CJQbnmY6mA"
}
```

**Ответ**

Если токен прошел проверку придет пустой JSON со статус кодом `200`  


**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.

---

<a name="use-access_token"></a>
## Использование access-токена.

Необходимо использовать [полученный](#get-access_token) `access_token` для авторизации,
передавая его в заголовке в формате:

```Authorization: Bearer ACCESS_TOKEN```

---

<a name="lifetime"></a>
## Время жизни токенов.

`access-токен` имеет срок жизни `5 минут` и при его истечении необходимо сделать запрос с `refresh_token` для получения
нового access токена.  

`refresh-токен` имеет срок жизни `24 часа`.

---

<a name="use-refresh_token"></a>
## Использование refresh токена.

```
`POST http://127.0.0.1:8000/api/token/refresh`
```

**Запрос**

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQxMDQxLCJpYXQiOjE3MDYzNDA3NDEsImp0aSI6ImJiZjc4ZGQxMGI2NzQ5NTlhZjY1MzM1ZjZmNDBjNWIzIiwidXNlcl9pZCI6Mn0.pird2eYS2VCfeycWJMFFdVOIgDrTHRyF2CJQbnmY6mA"
}
```

**Ответ**

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQwMzY2LCJpYXQiOjE3MDYzNDAwNjYsImp0aSI6IjAzNmRhN2VkNTVjNTQ0YmU5MGY2ODhjYjcxM2FhOGVhIiwidXNlcl9pZCI6Mn0.QYt_JOm20yXTP7bfpzdbMGn3ddsYzPgOaLDx_34p7nE"
}
```

**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.

