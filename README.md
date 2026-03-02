# SteelFasad Engineering — корпоративный сайт-каталог (Astro)

Многостраничный B2B-сайт в инженерной подаче: системы металлокассет (открытая/закрытая), решения по типам объектов, технический раздел (узлы/схемы/требования/сертификаты), реализованные объекты и формы заявок без корзины и оплаты.

## Запуск

```bash
npm install
npm run dev
```

По умолчанию dev-сервер: `http://localhost:4321`.

## Формы заявок (email через SMTP)

Эндпоинт: `POST /api/lead` (используется всеми формами на сайте).

1) Скопируйте `ENV.example` в локальный файл окружения (например, `.env` у себя) и заполните параметры SMTP:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- (опционально) `SMTP_FROM`, `LEADS_TO_EMAIL`

2) Перезапустите dev-сервер.

Если SMTP не настроен — формы будут работать в режиме разработки (заявка принимается и идёт редирект на `/spasibo/?mock=1`, письма не отправляются).

## Контент (что редактировать)

- **Общие данные компании/контакты/меню**: `src/data/site.json`
- **Документы / сертификаты / узлы / схемы**: `src/data/documents.json`
- **Реализованные объекты**: `src/data/projects.json`
- **PDF**: складывайте в `public/docs` или `public/uploads/docs` и указывайте путь в `src/data/documents.json` (поле `file`).
- **Фото объектов**: складывайте в `public/uploads/projects` и указывайте пути в `src/data/projects.json` (поле `images`).

## Админ-панель (Decap CMS)

Путь: `/admin` (файлы в `public/admin`).

Примечание: Decap CMS требует настроенного Git-backend (обычно Netlify Identity + Git Gateway) или локального сервера.
Для локальной проверки UI можно использовать:

```bash
npx decap-server
```

## Сборка

```bash
npm run build
npm run preview
```

Проект собран в режиме `output: "server"` (см. `astro.config.mjs`), чтобы формы работали на сервере.
