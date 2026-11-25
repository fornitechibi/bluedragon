# Bluedragon

Personal site for **Shibi Kishore N** (Bluedragon): security researcher, AI agentic engineer, and former Cantina triager.

Live at https://bluedragon.shibikishore5.workers.dev

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

## Credited CVEs

Vendor advisories that credit Bluedragon live in `src/data/advisories.ts` and render at `/advisories` and `/advisories/<cve-slug>`, plus the "Credited CVEs" section on the homepage.

To add one, copy the fields from the vendor record. For Microsoft, the Security Update Guide API returns everything the page needs:

```bash
curl -s "https://api.msrc.microsoft.com/sug/v2.0/en-US/vulnerability?\$filter=cveNumber%20eq%20%27CVE-YYYY-NNNNN%27"
curl -s "https://api.msrc.microsoft.com/sug/v2.0/en-US/affectedProduct?\$filter=cveNumber%20eq%20%27CVE-YYYY-NNNNN%27"
curl -s "https://api.msrc.microsoft.com/sug/v2.0/en-US/acknowledgement?\$filter=cveNumber%20eq%20%27CVE-YYYY-NNNNN%27"
```

Keep the title, description, CVSS vector, CWE, and FAQ text verbatim. Set `relatedWriteup` if a public report in `src/content/findings` covers the same bug.

## Findings writeups

Public reports are an Astro content collection.

1. Drop the raw research note in `findings/<org>/` (source archive, not rendered).
2. Add a blog-style markdown file in `src/content/findings/<series>/<slug>.md` with the collection frontmatter (`title`, `lede`, `severity`, `series`, `product`, `target`, `component`, `reach`, `date`).
3. New series go in `src/data/findings.ts` and the matching `series` enum in `src/content.config.ts`. Use `/report-enhancer` to convert a raw note.
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

The live URL is `https://bluedragon.shibikishore5.workers.dev`, which is the default `site` in `astro.config.mjs`. If you attach a custom domain, set:

```
PUBLIC_SITE_URL=https://that-live-url
```

Then redeploy so sitemap, canonical, and Open Graph tags match.

### Custom domain

Worker → **Settings** → **Domains & Routes** → add the domain. Then point `PUBLIC_SITE_URL` at `https://yourdomain` and redeploy.
