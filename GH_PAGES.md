# Деплой на GitHub Pages

Демо-версия сайта (без работающих форм и ИИ-API) публикуется на GitHub Pages.

## Почему это работает

1. **Base path** — GitHub Pages раздаёт сайт по `https://user.github.io/repo/`, а не в корне. В `astro.gh-pages.config.mjs` задан `base: '/repo/'`, чтобы все пути (ссылки, ассеты) были с учётом этого префикса.

2. **Ссылки** — в HTML ссылки вида `href="/kontakty/"` ведут на корень домена, а не на `/repo/`. Скрипт в `BaseLayout.astro` при загрузке страницы добавляет base ко всем внутренним ссылкам.

3. **Статика** — favicon и логотип используют `import.meta.env.BASE_URL`, чтобы пути к картинкам были корректными.

4. **Trailing slash** — `trailingSlash: 'always'` выравнивает URL и поведение GitHub Pages.

5. **Без API** — `scripts/gh-build.js` перед сборкой временно убирает папку `api/`, потому что serverless-функции на GitHub Pages не поддерживаются.

6. **Демо-режим** — `PUBLIC_DEMO=true` отключает отправку форм и переводит ИИ-чат на локальные ответы.

## Шаги

1. **Создайте репозиторий** на GitHub (например, `Steel`).

2. **Включите GitHub Pages** в настройках репозитория:
   - Settings → Pages
   - Source: **GitHub Actions**

3. **Залейте код** в репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/Steel.git
   git push -u origin main
   ```

4. **Деплой** запустится автоматически при пуше в `main`. Либо вручную: Actions → Deploy to GitHub Pages → Run workflow.

5. **Сайт** будет доступен по адресу:
   ```
   https://YOUR_USERNAME.github.io/Steel/
   ```

## Локальная сборка

```bash
# С указанием username и repo (для проверки)
GITHUB_USER=YourUsername REPO_NAME=Steel npm run build:gh
```

Либо отредактируйте `astro.gh-pages.config.mjs` — подставьте свои значения в `GITHUB_USER` и `REPO_NAME`.

## Демо-режим

- Формы заявок показывают сообщение «Демо: заявка не отправляется» вместо отправки.
- ИИ-консультант работает в локальном режиме (без OpenAI API).
