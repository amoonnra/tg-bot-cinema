# Онлайн-кинотеатр в телеграмм боте

В данном проекте был разработан telegram bot на typescript и nodejs, для интеграции с telegram была использована библиотека https://grammy.dev/.


<img src="https://user-images.githubusercontent.com/104252639/221547995-072c28eb-8c99-455b-aba8-96efb71de60e.png" width="70%">
Бот предоставляет возможность искать фильмы / сериалы по названию или ссылке с КиноПоиска. Также поиск возможен по голосовому вводу. Для этого была осуществлена интеграция с https://wit.ai/


Другие интересные возможности бота:

- Подборки видеоматериалов по темам и жанрам
- Функция «Мои закладки»
- Уведомления о выходе новых серий сериалов в закладках.

<img src="https://user-images.githubusercontent.com/104252639/221548067-0835f8c0-03cd-4428-b12b-bb67c7d30688.png" width="70%">
Для хранения информации о пользователях была выбрана БД MongoDB.

После нажатия на кнопку “смотреть”, осуществляется переход на сайт с плеерами, разработанный на react.

Вся информация о фильмах и сериалах берется из открытых api.

Демо: https://t.me/cinemagicBot_bot
