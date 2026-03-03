// @ts-check
// Конфиг для деплоя на GitHub Pages (статическая сборка без API)
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Для GitHub Actions: GITHUB_USER и REPO_NAME задаются автоматически
// Для локальной сборки: задайте вручную или через env
const GITHUB_USER = process.env.GITHUB_USER ?? 'YOUR_GITHUB_USERNAME';
const REPO_NAME = process.env.REPO_NAME ?? 'Steel';

// https://astro.build/config
export default defineConfig({
	site: `https://${GITHUB_USER}.github.io`,
	base: `/${REPO_NAME}`,
	output: 'static',
	integrations: [sitemap()],
	vite: {
		define: {
			'import.meta.env.PUBLIC_DEMO': JSON.stringify('true'),
		},
	},
});
