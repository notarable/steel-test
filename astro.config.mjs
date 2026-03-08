// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://steelfasad.example',
	output: 'static',
	adapter: vercel(),
	integrations: [sitemap()],
	vite: {
		server: {
			allowedHosts: true,
		},
		define: {
			'import.meta.env.PUBLIC_DEMO': JSON.stringify('false'),
		},
	},
});
