# Деплой Steel

Проект настроен на **Vercel** (адаптер @astrojs/vercel). API-маршруты `/api/lead` и `/api/ai-chat` работают как serverless-функции.

---

## Подключение домена steelfas.ru (Reg.ru → Vercel)

Домен куплен на Reg.ru. DNS-серверы Reg.ru: `ns1.hosting.reg.ru`, `ns2.hosting.reg.ru`.

### Шаг 1: Добавить домен в Vercel

1. Зайдите в [vercel.com](https://vercel.com) → ваш проект Steel
2. **Settings** → **Domains** → **Add**
3. Введите `steelfas.ru` и `www.steelfas.ru`
4. Vercel покажет, какие DNS-записи нужно создать

### Шаг 2: Настроить DNS в Reg.ru

1. Войдите в [reg.ru](https://www.reg.ru) → **Мои домены** → **steelfas.ru**
2. Откройте **DNS-серверы и управление зоной** (или **Управление зоной**)
3. Убедитесь, что используются DNS Reg.ru: `ns1.hosting.reg.ru`, `ns2.hosting.reg.ru`
4. Добавьте записи:

| Тип | Имя/Хост | Значение | TTL |
|-----|-----------|----------|-----|
| **A** | `@` (или пусто) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

- **@** — корневой домен (steelfas.ru)
- **www** — поддомен (www.steelfas.ru)

### Шаг 3: Проверка

- Распространение DNS: 15 минут — 48 часов
- Проверить: [whatsmydns.net](https://www.whatsmydns.net/) — введите `steelfas.ru`
- В Vercel статус домена должен стать **Valid**

### Шаг 4: Обновить site.json

```json
"siteUrl": "https://steelfas.ru"
```

## Яндекс Метрика

В `site.json` в блоке `yandexMetrika` укажите номер счётчика:

```json
"yandexMetrika": {
  "counterId": "12345678"
}
```

Номер счётчика берётся в [metrika.yandex.ru](https://metrika.yandex.ru) → Настройки → Счётчик.

## Заявки на почту

### Вариант 1: Web3Forms (рекомендуется)

1. Зайдите на [web3forms.com](https://web3forms.com/)
2. Введите email и получите access key
3. В `site.json` → `form`:

```json
"form": {
  "web3formsAccessKey": "ВАШ_ACCESS_KEY",
  "email": "2512017@mail.ru"
},
"siteUrl": "https://ваш-домен.ru",
```

### Вариант 2: FormSubmit.co

```json
"form": {
  "useFormSubmit": true,
  "email": "2512017@mail.ru"
},
```

**Важно:** при первой отправке FormSubmit пришлёт письмо с подтверждением. Проверьте папку «Спам».

### Что приходит в письме

Все поля формы: тип заявки, контекст, страница, имя, компания, телефон, email, сообщение. Файлы (PDF, DWG и т.п.) — вложениями.

---

## Хостинг — варианты для РФ

### 1. Cloudflare Pages (рекомендуется)

- Бесплатно
- Обычно доступен из России
- Подходит для статического сайта

**Шаги:**

1. Репозиторий на GitHub
2. [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Connect to Git
3. Выберите репозиторий
4. Build: `npm run build`, Output: `dist`

### 2. GitHub Pages

- Бесплатно
- Только статика (без API)

Используйте `npm run build:gh` — см. `GH_PAGES.md`

### 3. Российский хостинг (Timeweb, Beget, Selectel)

- Статику можно выложить на shared-хостинг
- Загрузите содержимое папки `dist` в корень сайта

---

## AI-чат

AI-чат (`/api/ai-chat`) работает на Vercel. Задайте `OPENAI_API_KEY` в настройках проекта.

**Варианты:**

1. **Отключить виджет** — закомментировать `<AiChatWidget />` в `BaseLayout.astro`
2. **Внешний сервис** — заменить на виджет Tinkoff, Jivo и т.п.
3. **Свой сервер** — VPS в РФ (Selectel, Timeweb) с Node.js

---

## Сборка

```bash
npm install
npm run build
```

Результат — папка `dist`. Её содержимое загружается на хостинг.

---

## Кратко

| Задача | Решение |
|--------|---------|
| Заявки на почту | FormSubmit.co (уже настроен) |
| Хостинг | Cloudflare Pages или GitHub Pages |
| AI-чат | Отключить или заменить на внешний виджет |
