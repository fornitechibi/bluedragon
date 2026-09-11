---
name: report-enhancer
description: >
  Rewrite raw security-research markdown into public findings posts with mermaid
  software diagrams, register the series, verify the Astro build, and push main
  so Cloudflare Workers deploys the pages. Use when the user drops reports under
  findings/, asks to enhance, simplify, or publish findings, mentions mermaid
  writeups, or runs /report-enhancer.
---

# Report enhancer

Turn a raw note in `findings/` into a public `/findings/<series>/<slug>` post, then ship it.

Do not commit files under `findings/` except `findings/README.md`. `.gitignore` already excludes the rest (full PoCs). Public pages come only from `src/content/findings/`.

## 1. Intake

Read every new or named raw `.md` under `findings/`. For each, extract: title, severity (`Critical` | `High` | `Medium` | `Low` — map "Critical (technical)" to `Critical`), target org, product, component paths, reach, commit/revision, failed invariant, attack steps, impact, fix, explicit non-claims.

Skip full PoC source, debugger dumps, bounty/USD amounts, and Immunefi/VRP dollar tables.

## 2. Register series if needed

Series id is a short slug (`microsoft`, `obyte`, `gvisor`, `tink`, `polygon`, `cloudflare`, …). Product is the thing audited (`MsQuic`, `cloudflared`).

If the series is new, update **both**:

- `src/data/findings.ts` — add to `seriesOrder` and `seriesMeta` (label, product, logo under `public/logos/`, blurb)
- `src/content.config.ts` — add the id to the `series` enum

Add `#<series>` to the scroll-margin list in `src/styles/global.css`. If the org is missing from `orgs` in `src/data/profile.ts`, add it with a color logo in `public/logos/`.

## 3. Write the public post

Path: `src/content/findings/<series>/<slug>.md`. Slug is kebab-case from the raw filename or a shorter accurate name. Recruiter-readable, technically exact.

Frontmatter (required keys match `src/content.config.ts`):

```yaml
title: "Short precise title"
lede: "One or two sentences. What breaks, why it matters."
severity: High
series: cloudflare
product: cloudflared
target: Cloudflare
component: "path/a · path/b"
reach: Remote / Authenticated / …
date: YYYY-MM-DD
commit: "full git sha if known"
tags: [Product, topic]
```

Body sections, in this order:

1. **What I found** — the bug in plain language, then a mermaid diagram
2. **How it fails** — invariant + short code excerpt (not the PoC)
3. **Attack shape** — numbered steps, second mermaid (sequence or flowchart)
4. **Impact** — who is hurt, what is not claimed
5. **Fix** — the guard that restores the invariant
6. **What this is not** — strongest rejection, answered

Typical length: 80–160 lines. Two mermaid diagrams unless one clearly suffices.

### Mermaid

Use fenced `mermaid` blocks. Quote node labels that contain punctuation. Never use `end` as a node id. Prefer `flowchart` and `sequenceDiagram`. Keep labels short.

After client render, `pre[data-language="mermaid"]` must be gone and no "Parse error" / "Syntax error" text.

## 4. Verify

```bash
npm run build
```

Confirm the new routes appear under `generating static routes`. Then render each new report in a browser (headless Chrome is fine):

- leftover `data-language="mermaid"` count is 0
- mermaid SVG is present
- no parse error
- title and severity stamp are visible

If Chrome is unavailable, still require a successful build and that the dist HTML contains the mermaid fences (`data-language="mermaid"`).

## 5. Publish

```bash
git add -A
git status   # raw findings/<org>/*.md must not be staged
git commit -m "Publish <series> findings writeups"
git push origin main
```

Poll the live host until the new path returns 200. Live origin is `https://bluedragon.shibikishore5.workers.dev` unless `PUBLIC_SITE_URL` or the README says otherwise. Check `/findings/` and `/findings/<series>/<slug>/`.
