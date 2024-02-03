![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# TasteMaker API v1  

>При запущенном сервере доступна интерактивная документация Swagger [http://127.0.0.1:8000/swagger](http://127.0.0.1:8000/swagger)

## Работа с пользователями
* [Регистрация нового пользователя](#register)

## Работа с рецептами
* [Создание нового рецепта](#create_recipe)
* [Редактирование рецепта](#edit_recipe)
* [Просмотр одного рецепта](#view_recipe)
* [Просмотр всех рецептов](#view_all_recipes)
* [Удаление рецепта](#delete_recipe)

## Работа с токенами
* [Получение access-токена](#get-access_token)
* [Проверка access-токена](#check-access_token)
* [Использование access-токена](#use-access_token)
* [Время жизни токенов](#lifetime)
* [Использование refresh-токена](#use-refresh_token)

---


<a name="create_recipe"></a>
## Создание рецепта.

> требуется наличие [access-токена](#use-access_token) в заголовке авторизации, 


### Запрос

Формат запроса: `form-data`  
`POST http://127.0.0.1:8000/api/recipes`  


Список ключей:

|                    Ключ | Данные                                         | Тип данных | Max значение |
|------------------------:|------------------------------------------------|------------|--------------|
|                    name | Название рецепта                               | string     |  150 зн.     |
|             description | Описание рецепта                               | string     | 1500 зн.       |
|             ingredients | Список ингредиентов в свободном формате        | string     | 1500 зн.       |
|    cooking_instructions | Инструкция приготовления                       | string     | 1500 зн.       |
| cooking_time_in_minutes | Время приготовления в минутах (просто число)   | integer    | 1440 (24 часа) |
|                   image | Изображение в формате `jpeg`, `jpg` или `png` | file       | 2мб       |

### Ответ

```json
{
  "id": 1,
  "name": "Рецепт",
  "description": "Описание рецепта",
  "ingredients": "Ингредиенты",
  "cooking_instructions": "Инструкция приготовления",
  "cooking_time_in_minutes": 60,
  "image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
}
```

---

<a name="edit_recipe"></a>
## Редактирование рецепта.

Запрос к серверу и ответ идентичен [созданию рецепта.](#create_recipe)  
Разница в том, что нужно указать id рецепта в адресе:

`POST http://127.0.0.1:8000/api/recipes/{ID Рецепта}/`  
Например:  
`POST http://127.0.0.1:8000/api/recipes/1/`

---

<a name="view_recipe"></a>
## Просмотр одного рецепта.

### Запрос
`GET http://127.0.0.1:8000/api/recipes/{ID Рецепта}/`  
Например:  
`GET http://127.0.0.1:8000/api/recipes/1/`

### Ответ

```json
{
  "id": 1,
  "name": "Рецепт",
  "description": "Описание рецепта",
  "ingredients": "Ингредиенты",
  "cooking_instructions": "Инструкция приготовления",
  "cooking_time_in_minutes": 60,
  "image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
}
```

---

<a name="view_all_recipes"></a>
## Просмотр всех рецептов.

### Запрос
`GET http://127.0.0.1:8000/api/recipes/`

### Ответ

```json
[
  {
  "id": 1,
  "name": "Рецепт",
  "description": "Описание рецепта",
  "ingredients": "Ингредиенты",
  "cooking_instructions": "Инструкция приготовления",
  "cooking_time_in_minutes": 60,
  "image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
},
  {
  "id": 2,
  "name": "Рецепт",
  "description": "Описание рецепта",
  "ingredients": "Ингредиенты",
  "cooking_instructions": "Инструкция приготовления",
  "cooking_time_in_minutes": 60,
  "image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
  }
]
```

---

<a name="delete_recipe"></a>
## Удаление рецепта.

### Запрос

> требуется наличие [access-токена](#use-access_token) в заголовке авторизации.

`DELETE http://127.0.0.1:8000/api/recipes/{ID Рецепта}/`  
Например:  
`DELETE http://127.0.0.1:8000/api/recipes/1/`  

### Ответ

При успешном удалении придет пустое тело ответа и статус:
`204 No Content`.

---

<a name="register"></a>
## Регистрация нового пользователя.

Для создания нового пользователя необходимо сделать запрос `POST http://127.0.0.1:8000/api/register`

#### Запрос

```json
{
  "password": "string",
  "email": "user@example.com"
}
```

#### Ответ

Получаем учетные данные зарегистрированного пользователя.

```json
{
  "password": "pbkdf2_sha256$720000$7mIMfGeEUYHZVAZrO6vkOh$Jx/pM7ZBYzrLF3AuUAFRztl30BvVnOeh5xoazC8Ir+0=",
  "email": "user@example.com"
}
```

#### Ошибки

* `400 Bad Request` – ошибка в параметрах запроса.

---

<a name="get-access_token"></a>
## Получение access-токена.

Для получения access-токена необходимо сделать запрос `POST http://127.0.0.1:8000/api/token`

#### Запрос

Указываем в запросе учетные данные уже [зарегестрированного](#register) пользователя.

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

#### Ответ

Получаем [access-токен](#use-access_token) и [refresh-токен](#use-refresh_token).

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjQyNjQ2NiwiaWF0IjoxNzA2MzQwMDY2LCJqdGkiOiJiYzZhYTAyNzQ1YmE0ZjczODFkOGY4MzNmOWZmMzUwYiIsInVzZXJfaWQiOjJ9.1qGtt-ial3F5vH2nmOZhwk2DQcvZPWwxyW7IceMbo20",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQwMzY2LCJpYXQiOjE3MDYzNDAwNjYsImp0aSI6IjAzNmRhN2VkNTVjNTQ0YmU5MGY2ODhjYjcxM2FhOGVhIiwidXNlcl9pZCI6Mn0.QYt_JOm20yXTP7bfpzdbMGn3ddsYzPgOaLDx_34p7nE"
}
```

#### Ошибки

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - Пользотель с такмми учетными данными не зарегестрирован.

---

<a name="check-access_token"></a>

## Проверка access-токена.


```
`POST http://127.0.0.1:8000/api/token/verify`
```

### Запрос

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQxMDQxLCJpYXQiOjE3MDYzNDA3NDEsImp0aSI6ImJiZjc4ZGQxMGI2NzQ5NTlhZjY1MzM1ZjZmNDBjNWIzIiwidXNlcl9pZCI6Mn0.pird2eYS2VCfeycWJMFFdVOIgDrTHRyF2CJQbnmY6mA"
}
```

### Ответ

Если токен прошел проверку придет пустой JSON со статус кодом `200`  


#### Ошибки

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.

---

<a name="use-access_token"></a>
## Использование access-токена.

Необходимо использовать полученный `access_token` для авторизации,
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

### Запрос

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQxMDQxLCJpYXQiOjE3MDYzNDA3NDEsImp0aSI6ImJiZjc4ZGQxMGI2NzQ5NTlhZjY1MzM1ZjZmNDBjNWIzIiwidXNlcl9pZCI6Mn0.pird2eYS2VCfeycWJMFFdVOIgDrTHRyF2CJQbnmY6mA"
}
```

### Ответ

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQwMzY2LCJpYXQiOjE3MDYzNDAwNjYsImp0aSI6IjAzNmRhN2VkNTVjNTQ0YmU5MGY2ODhjYjcxM2FhOGVhIiwidXNlcl9pZCI6Mn0.QYt_JOm20yXTP7bfpzdbMGn3ddsYzPgOaLDx_34p7nE"
}
```

#### Ошибки

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.

