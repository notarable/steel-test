# Деплой на GitHub Pages

Демо-версия сайта (без работающих форм и ИИ-API) публикуется на GitHub Pages.

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
