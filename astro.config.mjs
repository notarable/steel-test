// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://steelfasad.example',
	output: 'static',
	integrations: [sitemap()],
	vite: {
		server: {
			allowedHosts: true,
		},
	},
});
