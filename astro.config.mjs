// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	site: 'https://steelfasad.example',
	output: 'static',
	adapter: netlify(),
	integrations: [sitemap()],
	vite: {
		server: {
			allowedHosts: true,
		},
	},
});
