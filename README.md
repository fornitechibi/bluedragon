# Bluedragon

Personal site for **Shibi Kishore N** (Bluedragon) — independent security researcher, ex-Cantina triager.

Static Astro site. Built for the **Cloudflare Pages free tier** (no Functions, no SSR).

## Local

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Edit copy, stats, and languages in `src/data/profile.ts`. Portrait source is `assets/Bluedragon-main.png` (served as `public/bluedragon.jpg`).

## Deploy on Cloudflare Pages (free)

The repo is on GitHub. Connect it to Pages and every push to `main` deploys.

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) and sign in (free account is enough).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub if asked, then select **`fornitechibi/bluedragon`**.
4. Use these build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` (leave default) |

5. Under **Environment variables** (Production and Preview), add:

   | Name | Value |
   | --- | --- |
   | `NODE_VERSION` | `22` |
   | `PUBLIC_SITE_URL` | `https://<project>.pages.dev` (update after the first deploy, or when you attach a domain) |

6. Click **Save and Deploy**. The first live URL is `https://<project-name>.pages.dev`.

After the first deploy, set `PUBLIC_SITE_URL` to that exact URL (or your custom domain) and redeploy so sitemap, canonical, and Open Graph tags match the live host. You can also set `site` in `astro.config.mjs`.

### Custom domain (still free)

1. In the Pages project: **Custom domains** → **Set up a custom domain**.
2. If the domain is already on Cloudflare, it attaches automatically. If not, add a CNAME to the Pages host (Cloudflare shows the target).
3. Update `PUBLIC_SITE_URL` to `https://yourdomain` and redeploy.

Pages free includes unlimited static requests, a custom domain, and SSL. Avoid Pages Functions if you want to stay fully on the free static quota.
