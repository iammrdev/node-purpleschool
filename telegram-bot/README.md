## APP Reference

#### Step 1

-   перейти в папку `cd telegram-bot`
-   добавить переменные окружения согласно .env.example
-   установить зависимости `npm i`
-   установить docker

#### Step 2

-   запустить docker `docker-compose up -d`
-   запустить миграции:

```bash
  npm run migrate
```

#### Step 3

-   запустить проект в режиме разработки:

```bash
  npm run watch  (1 окно терминала)
  npm run dev    (2 окно терминала)
```
