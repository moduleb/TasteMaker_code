## Запуск приложения

> Загрузка проекта
```bash
https://github.com/Danspb77/TasteMaker_code.git
cd TasteMaker_code/backend_api
```
## Установка зависимостей

> Установка библиотеки __poetry__
```bash
pip install poetry
```
> Установка всех зависимостей приложения
```bash
poetry install
```
> Активирование вертуальной среды
```bash
poetry shell
```
> Установка миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

> Предварительная загрузка информации в базу данных
```bash
python3 manage.py loaddata fixture-ingredients.json fixture-measures.json
```

> Запуск сервера
```bash
python manage.py runserver
```
Открыть приложение в браузере по адресу **localhost:8000**

>При запущенном сервере доступна интерактивная документация Swagger [http://127.0.0.1:8000/api/schema/swagger-ui/]http://127.0.0.1:8000/api/schema/swagger-ui/)


## Запуск приложения через Docker

Для локальной разработки бэкэнда(из TasteMaker_code)

```bash
docker-compose -f docker-compose.yml --env-file ./backend_api/.env up -d --build
```
## Архитектура приложения

```
< PROJECT ROOT >
   |
   |-- backend_api/                 
   |    |-- backend_api/             # Настройки проекта 
   |    |      |-- settings.py
   |    |      |-- asgi.py
   |    |      |-- wsgi.py     
   |    |      |-- urls.py     
   |    |
   |    |-- users/
   |    |   |--migrations/
   |    |    |-- admin.py
   |    |    |-- apps.py
   |    |    |-- models.py
   |    |    |-- serializers.py
   |    |    |-- test.py
   |    |    |-- urls.py
   |    |    |-- views.py
   |    |  
   |    |-- .env                    # файл с настройками проетка
   |    |-- .gitignore              
   |    |-- docker-compose.yml      # Docker             
   |    |-- Dockerfile              # Docker
   |    |-- manage.py               # точка входа Django 
   |    |-- poetry.lock             # файл зависимостей приложения 
   |    |-- pyproject.toml          # файл зависимостей приложения 
   |    |-- README.md
   |    |-- start-web.sh            # точка входа
   |
   |                   
   |-- frontend           
   |
   |
   |--.gitignore 
   |-- README.md
   |-- ************************************************* 
```