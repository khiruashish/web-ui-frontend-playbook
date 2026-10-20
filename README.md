# Web UI Frontend Playbook

HTML5, CSS3, Flexbox, Grid and responsive design, from your first tag to 15+ years of frontend architecture.

Every HTML element and CSS feature in this playbook is shown three ways: **what it's for**, **the code**, and **the live output** rendered right under the code. A separate **Reverse Engineering** section works backwards: you see a UI, and it gives you the code that produces it.

## What's inside

| Section | What you get |
|---|---|
| **HTML5** | Every element in the current HTML standard, grouped by purpose, each with code and output. A–Z reference of all tags, plus a deprecated-tags table. |
| **CSS & CSS3** | Cascade, specificity, box model, every selector type, colours and units, typography, CSS3 effects, positioning, animations, custom properties, and modern CSS (2023–2026). |
| **Layout & Responsive** | Complete Flexbox and Grid references with live output, responsive design, 15+ layout patterns, and current UI trends. |
| **Reverse Engineering** | A repeatable method for turning any UI into code, 30+ "see this → write this" recipes, and a live layout gallery. |
| **Cheat Sheets** | 8 printable quick references: HTML, CSS, CSS3 & modern CSS, Flexbox, Grid, responsive, units/colours/functions, and UI components & patterns. The Flexbox and Grid sheets have a live mini-diagram for every value. |
| **Senior & Architect** | Accessibility, performance, CSS architecture at scale, and interview questions graded by level. |
| **Layout Gallery** | [`docs/examples/layouts.html`](docs/examples/layouts.html): one standalone responsive page with 18 layouts, each with its HTML, CSS and an explanation. Open it directly in a browser; no build step. |

Each section is tagged by experience level: 🟢 Beginner (0–2 yrs) · 🟡 Intermediate (2–5) · 🟠 Advanced (5–10) · 🔴 Expert (10–15+).

## Run it locally

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve                        # http://127.0.0.1:8000
```

Build the static site (output goes to `site/`):

```bash
mkdocs build --strict
```

## Deploy to GitHub Pages

```bash
mkdocs gh-deploy --force
```

## Generated pages

Some pages are generated from Python so the code you read is always the code that runs:

| Page | Source | Regenerate |
|---|---|---|
| `docs/reverse-engineering/recipes.md` | `scripts/gen_recipes.py` | `python3 scripts/gen_recipes.py docs/reverse-engineering/recipes.md` |
| `docs/examples/layouts.html` | `scripts/gen_gallery.py` | `python3 scripts/gen_gallery.py docs/examples/layouts.html` |
| `docs/cheatsheets/flexbox.md`, `docs/cheatsheets/grid.md` | `scripts/gen_visual_cheatsheets.py` | `python3 scripts/gen_visual_cheatsheets.py docs/cheatsheets` |

Edit the script, not the generated file.

## Regenerate or extend it

[`MASTER_PROMPT.md`](MASTER_PROMPT.md) is the full prompt used to produce this playbook. Paste it into an AI assistant to rebuild, extend, or adapt it to another stack.

## Moving this folder into its own repository

This playbook is self-contained. To publish it as its own `web-ui-frontend-playbook` repository:

```bash
cp -r web-ui-frontend-playbook ~/web-ui-frontend-playbook
cd ~/web-ui-frontend-playbook
git init && git add . && git commit -m "Initial commit: Web UI Frontend Playbook"
git branch -M main
git remote add origin https://github.com/<you>/web-ui-frontend-playbook.git
git push -u origin main
```

Then update `repo_url` and `edit_uri` in `mkdocs.yml` to point at the new repository.
