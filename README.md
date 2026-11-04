# Web UI Frontend Playbook

HTML5, CSS3, Flexbox, Grid and responsive design, from your first tag to 15+ years of frontend architecture.

Every HTML element and CSS feature in this playbook is shown three ways: **what it's for**, **the code**, and **the live output** rendered right under the code. A separate **Reverse Engineering** section works backwards: you see a UI, and it gives you the code that produces it.

## What's inside

| Section | What you get |
|---|---|
| **HTML5** | Every element in the current HTML standard, grouped by purpose, each with code and output. A–Z reference of all tags, plus a deprecated-tags table. |
| **CSS & CSS3** | Cascade, specificity, box model, every selector type, colours and units, typography, CSS3 effects, positioning, animations, custom properties, and modern CSS (2023–2026). |
| **Layout & Responsive** | Complete Flexbox and Grid references with live output, responsive design, 15+ layout patterns, and current UI trends. |
| **JavaScript** | Nine lessons from variables to `fetch()`: types, decisions, functions, arrays and objects, loops and array methods, the DOM, events, async code, errors and debugging. Every console output shown is produced by running the code; the DOM, events and fetch demos are live and browser-tested. |
| **DevTools** | A guided tour of browser DevTools (Elements, Styles, Computed, Grid/Flex overlays, Console, every kind of breakpoint, Network, Application, Rendering, Lighthouse), tested console snippets, and a **Bug Lab**: a page with 7 planted bugs, each found with a different tool, with a generated fixed version. |
| **E-commerce Page** | A step-by-step build of a responsive grocery store page from 15 small components (header, search, category nav, hero, product card, filters, cart drawer, footer, bottom nav). Every line of HTML, CSS and JavaScript is explained in a table, with a live demo per component. |
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
| `docs/ecommerce/demos/0[2-7]-*.html` (one page per component) | `docs/ecommerce/demos/store.html` via `scripts/gen_ecommerce_demos.py` | `python3 scripts/gen_ecommerce_demos.py docs/ecommerce/demos` |
| `docs/ecommerce/demos/store-solved.html`, `js/store-solved.js` (every exercise solved) | `store.html` + `js/store.js` + the solution patches in `scripts/gen_ecommerce_demos.py` | same command |
| `docs/devtools/demos/bug-lab-fixed.html` | `docs/devtools/demos/bug-lab.html` + the fixes in `scripts/gen_bug_lab.py` | `python3 scripts/gen_bug_lab.py docs/devtools/demos` |

Edit the script, not the generated file.

The console outputs on the **JavaScript** pages come from running the examples (needs Node 22+):

```bash
node javascript/run-examples.mjs           # run examples/ and solutions/ in docs/javascript/, refresh javascript/outputs/
node javascript/run-examples.mjs --check   # CI mode: fail if any output is stale
```

## Browser checks (Coding Interview + E-commerce)

Every solution in the **Coding Interview** tab, the finished E-commerce store page, the JavaScript tab's DOM/events/fetch demos, and the exercise solutions of both tabs, and the DevTools Bug Lab (broken and fixed) are verified in real Chromium (layout geometry, keyboard, ARIA) plus JS unit
checks with mock timers. CI runs them on every pull request (`.github/workflows/coding-interview.yml`):

```bash
cd coding-interview && npm ci && npx playwright install chromium
npm test          # run all checks and refresh outputs/ (the reports shown in the docs)
npm run check     # CI mode: fail on any failing check or stale report
```

## Regenerate or extend it

[`MASTER_PROMPT.md`](MASTER_PROMPT.md) is the full prompt used to produce this playbook. Paste it into an AI assistant to rebuild, extend, or adapt it to another stack.
