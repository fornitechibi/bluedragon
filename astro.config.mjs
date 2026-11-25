import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production URL. Override with PUBLIC_SITE_URL if a custom domain is attached.
const site = process.env.PUBLIC_SITE_URL ?? 'https://bluedragon.shibikishore5.workers.dev';

export default defineConfig({
  site,
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['mermaid'],
    },
  },
});
