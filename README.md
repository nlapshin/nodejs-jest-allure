# nodejs-prepare-http-request


### Какие методы HTTP запросов вы знаете?

GET - Получение данных. Как передать параметры? Query String - мы передаем параметры ?kasdf=sdsbsd&asdf=bbb
POST - Создание чего либо. Body - для передачи параметров. Сontent-Type: "application/json".
PUT - Используем обновление через замену.
PATCH - Используем обновление через extend/merge(к текущим данным добавляем).
DELETE - Для удаления.

OPTIONS - CORS

### Какие статусы ответов вы знаете?

1xx - 5xx

2xx - все ок(в какой-то вариации)
3xx - переадресация
4xx - ошибка клиента. 400 Bad request.
5xx - ошибка сервера. 500 Internal Server Error.

### Какие библиотеки на JS трогали уже.

- jest
- fetch
- axios
- supertest
