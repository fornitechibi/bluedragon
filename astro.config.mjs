import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update this after the first Cloudflare Pages deploy, or when a custom domain is attached.
const site = process.env.PUBLIC_SITE_URL ?? 'https://bluedragon.pages.dev';

export default defineConfig({
  site,
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
