# Master Prompt: Web UI Frontend Playbook (HTML5 + CSS3 + Responsive, MkDocs Material)

Copy everything in the block below into Claude, ChatGPT or another coding assistant. It works in one session or across several. The **EXECUTION PLAN** section makes the model build the playbook in batches, so long outputs don't get cut off.

This repository already contains the result of running this prompt (`docs/`, `mkdocs.yml`, and the live layout gallery at `docs/examples/layouts.html`). Use the prompt to rebuild it, extend it, or generate a version for a different stack.

---

```text
ROLE
You are a Principal Frontend Engineer and technical author with 15+ years of experience
building design systems and large web apps. You've mentored juniors, run frontend hiring
loops, and reviewed CSS architecture at scale. You explain things simply for a first-day
beginner and still give a staff engineer the depth, trade-offs and edge cases they expect.

GOAL
Build a complete documentation site called
"Web UI Frontend Playbook — HTML5, CSS3, Flexbox, Grid & Responsive Design,
from Beginner to 15 Years of Experience".
Use MkDocs with the Material for MkDocs theme (latest 9.x, modern UI: instant navigation,
tabs, light/dark/auto palette, code copy, search suggestions).

AUDIENCE LEVELS (tag every section with one of these badges)
  🟢 Beginner      0–2 yrs   What it is, why it exists, the simplest working example.
  🟡 Intermediate  2–5 yrs   Real-world usage, common mistakes, browser quirks.
  🟠 Advanced      5–10 yrs  Accessibility, performance, architecture, edge cases.
  🔴 Expert        10–15+ yrs Design systems, scale, standards history, trade-off calls,
                            what you'd say in a design review.

TECH BASELINE (always use these)
- HTML Living Standard (WHATWG), current as of 2026. Include the newer elements and
  attributes: <search>, <dialog> + showModal(), the popover API (popover, popovertarget),
  <details name="..."> exclusive accordions, inert, loading="lazy", fetchpriority,
  enterkeyhint, inputmode, <template shadowrootmode> (declarative shadow DOM),
  customizable <select> (appearance: base-select) where supported.
- CSS: Baseline-widely-available features first, then newer Baseline features clearly
  labelled. Cover: native nesting, :has(), :is()/:where(), @layer, @container (size and
  style queries), container query units, subgrid, @scope, @property, color-mix(), oklch(),
  light-dark(), relative color syntax, clamp()/min()/max(), dvh/svh/lvh, logical
  properties, text-wrap: balance/pretty, view transitions, scroll-driven animations,
  anchor positioning, @starting-style, field-sizing, interpolate-size.
- For every "new" feature, state its Baseline status and the fallback.
- No frameworks in the core chapters (plain HTML + CSS + minimal vanilla JS). Mention how
  Tailwind / CSS Modules / CSS-in-JS / Webflow-style visual builders map to the same CSS
  concepts in the expert chapter.
- Every code sample must be complete and valid. Every HTML/CSS sample is followed by its
  rendered OUTPUT (raw HTML in a styled "Output" box on the page, not a screenshot).

======================================================================
SECTION A — SITE SCAFFOLD (generate these files first)
======================================================================
web-ui-frontend-playbook/
  README.md            how to install, serve, build, deploy (GitHub Pages)
  MASTER_PROMPT.md     this prompt
  requirements.txt     pinned mkdocs, mkdocs-material, pymdown-extensions
  mkdocs.yml           Material theme, palette toggle, features, markdown extensions
                       (admonition, attr_list, md_in_html, pymdownx.superfences with
                       mermaid, tabbed, details, highlight, keys, mark, tasklist, emoji)
  docs/
    index.md                 hero, card grid of sections, how levels work
    how-to-use.md            reading paths per level, page template explained
    stylesheets/extra.css    .demo output box with an "Output" label, level badges,
                             coloured .b boxes and dashed .c container for layout demos,
                             dark-mode variables
    html/                    (Section B)
    css/                     (Section C)
    layout/                  (Section D)
    reverse-engineering/     (Section E)
    career/                  (Section F)
    examples/layouts.html    (Section G) standalone responsive page

======================================================================
SECTION B — HTML5 (every element in the current standard)
======================================================================
Pages:
  html/index.md                  how HTML works, elements vs tags vs attributes, DOM,
                                 block vs inline vs content categories, validation
  html/document-structure.md     <!doctype>, html, head, title, meta (charset, viewport,
                                 description, theme-color, color-scheme, og:*), link
                                 (stylesheet, icon, preload, preconnect, manifest), style,
                                 script (defer, async, type=module, importmap), noscript,
                                 base, body
  html/text-content.md           h1–h6, p, br, hr, pre, blockquote, ol/ul/li, dl/dt/dd,
                                 div, figure, figcaption, menu, main (pointer to sectioning)
  html/inline-semantics.md       a, strong, em, b, i, u, s, mark, small, sub, sup, code,
                                 kbd, samp, var, abbr, cite, q, dfn, time, data, span, bdi,
                                 bdo, wbr, ruby/rt/rp, ins, del
  html/sectioning.md             header, nav, main, article, section, aside, footer,
                                 address, hgroup, search; landmark roles; outline myths
  html/media.md                  img (alt, srcset, sizes, loading, decoding,
                                 fetchpriority, width/height), picture, source, video,
                                 audio, track, iframe, embed, object, svg, canvas, map/area
  html/tables.md                 table, caption, thead, tbody, tfoot, tr, th (scope), td,
                                 colgroup, col; colspan/rowspan; responsive tables
  html/forms.md                  form, label, input (ALL 22 types, each with output),
                                 button (types), select, option, optgroup, datalist,
                                 textarea, fieldset, legend, output, progress, meter;
                                 validation attributes; autocomplete tokens; inputmode
  html/interactive.md            details/summary (+ name for exclusive accordion), dialog,
                                 popover API, template, slot, custom elements,
                                 declarative shadow DOM
  html/global-attributes.md      id, class, style, title, lang, dir, hidden (until-found),
                                 tabindex, contenteditable, draggable, data-*, aria-*,
                                 role, inert, popover, translate, spellcheck, autofocus,
                                 enterkeyhint, inputmode, accesskey, nonce, part, slot
  html/all-tags.md               A–Z table of EVERY element: tag, category, one-line use,
                                 level badge; plus a "deprecated — use this instead" table
                                 (center, font, marquee, frameset, big, tt, strike, acronym…)

Per element, use this template:
  ### `<tag>` <level badge>
  **Use:** one sentence.
  ```html  …minimal code…  ```
  <div class="demo"> …the same HTML, rendered… </div>
  **Key attributes:** short list.
  !!! tip "Senior note"  accessibility / SEO / performance / gotcha.

======================================================================
SECTION C — CSS & CSS3
======================================================================
Pages:
  css/index.md            how CSS is applied (inline, internal, external), syntax,
                          the CSS1 → CSS2.1 → "CSS3" modules → yearly snapshots story
  css/fundamentals.md     cascade (origin, layers, specificity, order), inheritance,
                          specificity calculator table, box model, box-sizing, display
                          values, margin collapse, normal flow, BFC
  css/selectors.md        every selector type with output: type, class, id, universal,
                          attribute (all 7 operators), combinators (descendant, >, +, ~),
                          pseudo-classes (structural, user-action, form-state, :has,
                          :is, :where, :not, :focus-visible, :focus-within, :user-invalid),
                          pseudo-elements (::before/after, ::marker, ::placeholder,
                          ::selection, ::first-line, ::backdrop, ::file-selector-button)
  css/colors-units.md     named, hex, rgb, hsl, hwb, lab, lch, oklab, oklch,
                          color-mix(), relative colors, light-dark(), currentColor;
                          absolute vs relative units, rem vs em, %, vw/vh/dvh/svh/lvh,
                          cqi/cqw, ch, ex, lh, fr; calc/min/max/clamp
  css/typography.md       font stacks, @font-face, variable fonts, font-display,
                          fluid type with clamp(), line-height, letter-spacing,
                          text-wrap, text-overflow + line-clamp, hyphens, writing-mode
  css/effects.md          (the classic "CSS3" features) border-radius, box-shadow,
                          text-shadow, linear/radial/conic gradients, multiple
                          backgrounds, background-clip:text, opacity, filter,
                          backdrop-filter, mix-blend-mode, clip-path, mask, outline
  css/positioning.md      static/relative/absolute/fixed/sticky, inset, z-index,
                          stacking contexts (all triggers), overflow, float + clear
                          (legacy), object-fit, aspect-ratio
  css/animations.md       transform (2D/3D, individual translate/rotate/scale),
                          transition, @keyframes, animation-*, easing incl. linear(),
                          prefers-reduced-motion, @starting-style, view transitions,
                          scroll-driven animations; GPU and jank rules
  css/custom-properties.md --vars, var() fallbacks, scope, @property, theming with
                          dark mode, design tokens
  css/modern-css.md       nesting, @layer, @container, @scope, :has(), subgrid,
                          anchor positioning, popover styling, field-sizing,
                          interpolate-size, @supports; Baseline status + fallback for each
  css/properties.md       grouped cheat sheet of ~200 properties: property, values,
                          what it does, inherited?

Per property / selector: code → Output box → "Common mistake" → "Senior note".

======================================================================
SECTION D — LAYOUT & RESPONSIVE
======================================================================
  layout/index.md        the layout decision tree (Mermaid): flow → flex → grid →
                         position; 1-D vs 2-D
  layout/flexbox.md      EVERY property, each with live output: display:flex,
                         flex-direction, flex-wrap, flex-flow, justify-content (all
                         values), align-items, align-content, gap, order, flex-grow,
                         flex-shrink, flex-basis, flex shorthand values (1, auto, none,
                         0 0 200px), align-self, margin:auto tricks, min-width:0 bug
  layout/grid.md         grid-template-columns/rows, fr, repeat, minmax, auto-fill vs
                         auto-fit (RAM pattern), grid-template-areas, line placement,
                         span, implicit grid, grid-auto-flow dense, alignment,
                         subgrid, masonry status
  layout/responsive.md   mobile-first, viewport meta, breakpoints strategy, media
                         queries (width ranges syntax, hover, pointer,
                         prefers-color-scheme, prefers-reduced-motion, orientation),
                         container queries, fluid type/space, responsive images
                         (srcset/sizes/picture/art direction), responsive tables,
                         touch targets, safe-area insets
  layout/patterns.md     each with code + output: centering (6 ways), holy grail,
                         sidebar + content, pancake stack, sticky footer, header/nav
                         that collapses, card grid (RAM), media object, split screen,
                         12-column grid, bento grid, masonry, dashboard, magazine,
                         full-bleed article, Z/F-pattern landing, pricing table
  layout/ui-trends.md    latest UI: bento grids, glassmorphism, neumorphism (and why
                         to be careful), dark mode, gradient mesh, big type,
                         micro-interactions, skeleton loaders, scroll-driven reveals,
                         view transitions; Webflow-style visual builders vs hand CSS

======================================================================
SECTION E — REVERSE ENGINEERING ("for this output, this is the code")
======================================================================
  reverse-engineering/index.md    a repeatable method: look at a UI → name the layout
                                  (1-D or 2-D) → find the boxes → list spacing/colour/
                                  type tokens → pick the HTML semantics → write CSS
                                  mobile-first → verify in DevTools (Elements, Computed,
                                  Layout panel flex/grid overlays, Rendering emulation)
  reverse-engineering/recipes.md  at least 30 "You see this → write this" recipes:
                                  short visual description + output box + minimal code
                                  (pill badge, avatar stack, card with image, sticky
                                  header, navbar burger, tabs, accordion, modal, toast,
                                  tooltip, breadcrumbs, pagination, stepper, timeline,
                                  pricing card, hero with overlay, gradient text,
                                  truncation, glass card, skeleton, toggle switch…).
                                  Render each recipe's Output inside an isolated
                                  <iframe srcdoc> (auto-sized) so the docs theme can't
                                  leak into it, and generate the page from one data
                                  file so the shown code and the running code match.
  reverse-engineering/gallery.md  embeds and links examples/layouts.html

======================================================================
SECTION E2 — CHEAT SHEETS (dense, printable quick references)
======================================================================
  cheatsheets/index.md            card grid linking every sheet; print tip
  cheatsheets/html.md             skeleton, every element by purpose, "which element
                                  should I use?", meta/link, script loading, links,
                                  media, tables, forms + all 22 input types + form
                                  attributes, interactive elements, global attributes,
                                  ARIA, entities, deprecated → modern
  cheatsheets/css.md              syntax, all selectors with specificity, pseudo-classes
                                  and pseudo-elements, :has() patterns, cascade order,
                                  inheritance, box model, display, positioning,
                                  typography, backgrounds, at-rules, modern reset
  cheatsheets/css3.md             visual cards (radius, shadows, gradients, filters,
                                  blend, clip-path, mask, transforms), transitions,
                                  animations, CSS3 modules, 2020–2026 features with
                                  Baseline status, vendor prefixes still needed
  cheatsheets/flexbox.md          a live mini-diagram card for EVERY value of every
  cheatsheets/grid.md             flex/grid property, everyday recipes, property
                                  table, gotchas. Generate these two from a script so
                                  each card's label is exactly the CSS it applies.
  cheatsheets/responsive.md       breakpoints, query syntax, all media features,
                                  container queries, intrinsic layouts, fluid type,
                                  responsive images, viewport units, touch details
  cheatsheets/units-functions.md  units, colour formats, contrast targets, maths
                                  functions, fluid formulas, easing, durations
  cheatsheets/ui-components.md    30+ components (HTML + key CSS + keyboard/a11y),
                                  layout one-liners, token scales, colour roles,
                                  keyboard patterns, a11y + performance checklists,
                                  current UI styles in one line each
Add print CSS so cheat sheets print without site chrome.

======================================================================
SECTION F — SENIOR & ARCHITECT (10–15+ yrs)
======================================================================
  career/roadmap.md         skill map per level, what to learn, what "done" looks like,
                            checklists (pymdownx.tasklist)
  career/index.md           overview of the senior track
  career/accessibility.md   WCAG 2.2 AA essentials, semantic first, ARIA rules, focus
                            management, contrast, reduced motion, testing tools
  career/performance.md     critical rendering path, Core Web Vitals (LCP, INP, CLS)
                            and the HTML/CSS levers for each, content-visibility,
                            containment, font loading, image strategy
  career/css-architecture.md BEM, utility-first, CSS Modules, CSS-in-JS, @layer-based
                            architecture, tokens, design systems, linting (Stylelint),
                            code-review checklist
  career/interview.md       questions graded by level (🟢→🔴) with model answers

======================================================================
SECTION G — THE RESPONSIVE LAYOUT GALLERY (one standalone page)
======================================================================
File: docs/examples/layouts.html. A single, valid, self-contained HTML file (no build,
no framework, inline <style> and a few lines of vanilla JS) that:
  - is mobile-first and fully responsive from 320px to 1920px+
  - has a sticky header with a nav that collapses to a menu button on small screens
  - has a table of contents linking to every layout section
  - shows at least 15 layouts live: centering, holy grail, sidebar, pancake stack,
    sticky footer, card grid (auto-fit/minmax), 12-column grid, bento grid, masonry
    (columns), split screen, media object, magazine/editorial, dashboard, pricing table,
    container-query card, full-bleed article, Z-pattern hero
  - under every live example shows: "What you see" (plain English), the exact HTML and
    CSS used (in <details> so the page stays scannable), and "Why this works" notes
  - supports light/dark via prefers-color-scheme + a toggle, respects
    prefers-reduced-motion, and passes basic accessibility (landmarks, skip link,
    focus-visible styles, contrast)

======================================================================
QUALITY BAR
======================================================================
- `mkdocs build --strict` must pass with zero warnings.
- Every Output box must render correctly in light and dark mode.
- No invented elements, properties or values. If a feature is not yet Baseline, say so.
- Plain, direct English. Short sentences. Explain jargon the first time it appears.
- Prefer semantic HTML over ARIA; prefer logical properties for new code.

======================================================================
EXECUTION PLAN (work in batches; stop after each and wait for "continue")
======================================================================
Batch 1: Section A (scaffold) + index.md + how-to-use.md + career/roadmap.md
Batch 2: Section B pages 1–5
Batch 3: Section B pages 6–10 + all-tags.md
Batch 4: Section C pages 1–6
Batch 5: Section C pages 7–11
Batch 6: Section D
Batch 7: Section E + Section G (layouts.html)
Batch 8: Section E2 (cheat sheets)
Batch 9: Section F, then run `mkdocs build --strict`, fix every warning, and print a
         final checklist of what was produced.
At the end of each batch print: files written, what's next, and any open questions.
```

---

## Tips for using the prompt

- **Different stack?** Change the TECH BASELINE block (for example add Tailwind CSS v4 or React) and leave the rest as is.
- **Shorter version?** Delete the 🔴 Expert level and Section F.
- **Interview prep only?** Run Batch 1 and Batch 8 and ask for 100 questions instead of the default set.
