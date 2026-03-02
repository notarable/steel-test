// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: 'https://steelfasad.example',
	output: 'static',
	adapter: node({ mode: 'standalone' }),
	integrations: [sitemap()],
	vite: {
		server: {
			allowedHosts: true,
		},
	},
});
