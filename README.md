# Bluedragon

Personal site for **Shibi Kishore N** (Bluedragon) — independent security researcher, ex-Cantina triager.

Static Astro site. Deployed with **Cloudflare Workers Builds** (Git integration). The site is fully pre-rendered; there is no Worker script.

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

Edit copy, stats, and languages in `src/data/profile.ts`. Portrait source is `assets/Bluedragon-main.png` (served as `public/bluedragon.jpg`). Brand logos for the marquee live in `public/logos/` (copies also under `assets/logos/`).

## Findings writeups

Public reports are an Astro content collection.

1. Drop the raw research note in `findings/<org>/` (source archive, not rendered).
2. Add a blog-style markdown file in `src/content/findings/<series>/<slug>.md` with the collection frontmatter (`title`, `lede`, `severity`, `series`, `product`, `target`, `component`, `reach`, `date`).
3. `series` is one of `microsoft`, `obyte`, `gvisor`, `tink`, `polygon`, `audit`. New series go in `src/data/findings.ts`.
4. Use fenced `mermaid` blocks for architecture and attack-path diagrams. They render on the report page.

Routes:

- `/findings` — index, grouped by series
- `/findings/<series>/<slug>` — report

## Deploy on Cloudflare (Workers Builds)

This repo is connected through **Workers & Pages → Worker → Settings → Builds**. That flow always has two commands. Classic Pages (build + output directory only) is different.

### Dashboard settings

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| Non-production deploy command | `npx wrangler versions upload` (default) |
| Root directory | `/` |
| Node | `22` (`NODE_VERSION=22`) |

Do **not** use `npx wrangler pages deploy`. That talks to the Pages API. Workers Builds authenticates as a Worker, so Pages deploy returns `Authentication error [code: 10000]`.

Wrangler reads `wrangler.toml`:

```toml
[assets]
directory = "./dist"
not_found_handling = "404-page"
```

After `npm run build`, `npx wrangler deploy` uploads `dist/`. No extra `--project-name` flag is needed.

### After the first successful deploy

The live URL is `https://bluedragon.<subdomain>.workers.dev` (or a custom domain you attach). Set:

```
PUBLIC_SITE_URL=https://that-live-url
```

Then redeploy so sitemap, canonical, and Open Graph tags match.

### Custom domain

Worker → **Settings** → **Domains & Routes** → add the domain. Then point `PUBLIC_SITE_URL` at `https://yourdomain` and redeploy.
