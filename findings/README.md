# Raw findings

Source notes for public writeups. Files in this tree are **not** rendered on the site.

Pipeline:

1. Drop the full research report here (`microsoft/`, `cloudflare/`, `obyte/`, `google/`, `polygon/`, …).
2. Convert it to a blog-style report in `src/content/findings/<series>/<slug>.md`.
3. Keep PoC dumps and debugger logs in this folder; the public page should explain the bug with mermaid diagrams and short excerpts.

Public routes are `/findings` and `/findings/<series>/<slug>`. Series metadata lives in `src/data/findings.ts`.
