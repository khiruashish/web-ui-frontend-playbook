# Modern CSS (2023–2026)

Features that changed how professional CSS is written. Each section gives the Baseline status and a fallback.

| Feature | Status (Oct 2026) | Replaces |
|---|---|---|
| Nesting | Baseline 2023 | Sass nesting |
| `:has()` | Baseline 2023 | JS "add class to parent" code |
| Container queries (size) | Baseline 2023 | JS ResizeObserver hacks, many media queries |
| `@layer` | Baseline 2022 | Specificity wars, `!important` |
| Subgrid | Baseline 2023 | Fixed heights to align card internals |
| `@scope` | Baseline 2025 | BEM naming, CSS Modules (partly) |
| `@property` | Baseline 2024 | — (enables animating variables) |
| `light-dark()`, relative colours, `color-mix()` | Baseline 2023–24 | Sass colour functions |
| Popover API, `@starting-style` | Baseline 2024 | JS menu/tooltip libraries |
| View transitions (same-document) | Baseline 2025 | Animation libraries for state changes |
| Anchor positioning | Chromium 125+, Safari 26, Firefox in progress | Popper.js / Floating UI |
| Scroll-driven animations | Chromium 115+, Safari 26 | Scroll listeners, IntersectionObserver |
| Container style queries | Chromium 111+, Safari 18 | Modifier classes |
| `field-sizing: content` | Chromium 123+ | Auto-grow textarea JS |
| `interpolate-size` / `calc-size()` | Chromium 129+ | JS height animations |
| `if()`, custom functions (`@function`) | Chromium 137+ (experimental elsewhere) | Preprocessor logic |

## `@layer` (cascade layers) <span class="lvl lvl-3">Advanced</span> { #layer-cascade-layers data-toc-label="@layer (cascade layers)" }

Layers let you control the cascade by **intent** instead of specificity. Later layers win over earlier layers, **regardless of specificity**.

```css
/* 1. Declare the order once, at the very top */
@layer reset, base, vendor, components, utilities;

@layer reset {
  * { margin: 0; box-sizing: border-box; }
}
@layer base {
  a { color: royalblue; }
}
@layer vendor {
  @import url("datepicker.css") layer(vendor);   /* or import straight into a layer */
}
@layer components {
  .card a { color: inherit; }
}
@layer utilities {
  .text-red { color: crimson; }   /* single class, but beats .card a (0,1,1) because the layer is later */
}

/* Unlayered styles beat ALL layers */
```

```html
<div class="card"><a class="text-red" href="#">Which colour?</a></div>
```

<div class="demo">
<div class="mc-layer"><div class="card"><a class="text-red" href="#layer-cascade-layers">I'm crimson: the utilities layer wins over a more specific selector</a></div></div>
<style>
  @layer pb-base, pb-components, pb-utilities;
  @layer pb-components { .mc-layer .card a { color: #2e9d4f; } }
  @layer pb-utilities { .mc-layer .text-red { color: crimson; } }
</style>
</div>

!!! tip "Senior note · 🔴 Expert"
    `@layer` is the cleanest answer to "how do we integrate Tailwind, a component library and our own CSS without `!important`?" Put third-party CSS in a low layer, your components above it, utilities on top. Note the twist: for `!important` declarations the layer order is **reversed**, so an `!important` in `reset` beats an `!important` in `utilities`. That's deliberate: it lets low layers protect critical rules.

## Container queries <span class="lvl lvl-3">Advanced</span> { #container-queries data-toc-label="Container queries" }

Media queries ask "how wide is the **viewport**?" Container queries ask "how wide is **my container**?" So a card can be stacked in a narrow sidebar and side-by-side in a wide main column, on the same screen.

```css
.card-wrap { container-type: inline-size; container-name: card; }

.card { display: grid; gap: 1rem; }

@container card (width > 400px) {
  .card { grid-template-columns: 120px 1fr; }
}
```

Drag the bottom-right corner of the box to resize the container:

<div class="demo">
<div class="mc-cq">
  <div class="card">
    <div class="img"></div>
    <div><strong>Container query card</strong><br>Narrow container: stacked. Wider than 400px: side by side. Resize me ↘</div>
  </div>
</div>
<style>
  .mc-cq { container-type: inline-size; resize: horizontal; overflow: auto; width: 300px; max-width: 100%; min-width: 180px; border: 2px dashed #e4572e; border-radius: 10px; padding: .6em; }
  .mc-cq .card { display: grid; gap: .8em; }
  .mc-cq .img { height: 80px; border-radius: 8px; background: linear-gradient(135deg, #e4572e, #f3a712); }
  @container (width > 400px) { .mc-cq .card { grid-template-columns: 120px 1fr; } .mc-cq .img { height: 100%; min-height: 80px; } }
</style>
</div>

**Style queries** (Chromium, Safari 18): query a custom property value on the container.

```css
@container style(--variant: featured) {
  .card { border: 2px solid gold; }
}
```

## `:has()` <span class="lvl lvl-3">Advanced</span> { #has data-toc-label=":has()" }

Covered in depth in [Selectors](selectors.md#has-the-parent-selector). A few modern patterns:

```css
/* Lock page scroll while a modal is open */
html:has(dialog[open]) { overflow: hidden; }

/* Form-level error state */
form:has(:user-invalid) .submit-hint { display: block; }

/* Layout switches on content */
.grid:has(> :nth-child(5)) { grid-template-columns: repeat(3, 1fr); }
```

## Subgrid <span class="lvl lvl-3">Advanced</span> { #subgrid data-toc-label="Subgrid" }

Let a grid item's children line up with the **parent's** grid tracks. Perfect for card rows where titles, text and buttons should align across cards.

```css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.card {
  display: grid;
  grid-row: span 3;                /* card occupies 3 row tracks of the parent */
  grid-template-rows: subgrid;     /* its children use those tracks */
}
```

<div class="demo">
<div class="mc-sub">
  <article><h4>Short title</h4><p>One line.</p><button>Buy</button></article>
  <article><h4>A much longer title that wraps onto two lines</h4><p>Some text that is a bit longer than the others, so it takes up more space.</p><button>Buy</button></article>
  <article><h4>Medium title</h4><p>Two short lines of text here.</p><button>Buy</button></article>
</div>
<style>
  .mc-sub { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: .8em; }
  .mc-sub article { display: grid; grid-row: span 3; grid-template-rows: subgrid; gap: .4em; padding: .8em; border: 1px solid #c9ced6; border-radius: 10px; }
  .mc-sub h4, .mc-sub p { margin: 0; }
  .mc-sub button { justify-self: start; align-self: end; }
</style>
</div>

All titles, texts and buttons line up across cards, even though their content lengths differ.

## `@scope` <span class="lvl lvl-3">Advanced</span> <small>Baseline 2025</small> { #scope data-toc-label="@scope" }

Limit styles to a DOM subtree, with an optional lower boundary ("donut scope").

```css
@scope (.card) to (.card__content) {
  img { border-radius: 8px; }   /* images in .card, but NOT inside .card__content */
  :scope { padding: 1rem; }     /* :scope = the .card itself */
}
```

Also gives **proximity**: when two scopes' rules have equal specificity, the closer scope root wins. Useful for nested light/dark themes.

## Anchor positioning <span class="lvl lvl-3">Advanced</span> <small>Chromium 125+, Safari 26</small> { #anchor-positioning data-toc-label="Anchor positioning" }

Tether a positioned element (tooltip, menu) to another element, with automatic flipping when it hits the viewport edge. Replaces Popper.js / Floating UI for most cases.

```html
<button popovertarget="tip" class="anchor">Hover target</button>
<div id="tip" popover>Anchored tooltip</div>
```

```css
.anchor { anchor-name: --btn; }
#tip {
  position-anchor: --btn;
  position-area: top;                  /* place above the anchor */
  margin: 0 0 8px;
  position-try-fallbacks: flip-block;  /* flip below if there's no room above */
}
```

<div class="demo">
<div style="padding:3em 0 0">
<button popovertarget="mc-tip" class="mc-anchor">Click me</button>
<div id="mc-tip" popover class="mc-tip">Anchored to the button ✨</div>
</div>
<style>
  .mc-anchor { anchor-name: --pb-btn; }
  .mc-tip { position-anchor: --pb-btn; position-area: top; margin: 0 0 8px; position-try-fallbacks: flip-block; border: 0; padding: .5em .8em; border-radius: 8px; background: #1f2329; color: #fff; }
</style>
</div>

In a browser without anchor positioning, the popover falls back to the centre of the screen: still usable.

## Feature queries with `@supports` <span class="lvl lvl-2">Intermediate</span> { #feature-queries-with-supports data-toc-label="Feature queries with @supports" }

Progressive enhancement: write the baseline, then upgrade where supported.

```css
.cards { display: flex; flex-wrap: wrap; }              /* works everywhere */

@supports (grid-template-rows: subgrid) {
  .cards { display: grid; /* … subgrid version … */ }
}

@supports selector(:has(a)) {
  .card:has(img) { /* … */ }
}

@supports not (anchor-name: --a) {
  .tooltip { /* JS-positioned fallback */ }
}
```

## Other modern features worth knowing <span class="lvl lvl-3">Advanced</span> { #other-modern-features-worth-knowing data-toc-label="Other modern features worth knowing" }

| Feature | One-liner |
|---|---|
| `text-wrap: balance / pretty` | Better line breaks in headings and paragraphs |
| `field-sizing: content` | Inputs and textareas grow with their content |
| `interpolate-size: allow-keywords` | Animate to/from `height: auto` |
| `@starting-style` | Entry animations for elements appearing (incl. `display: none` → block) |
| `transition-behavior: allow-discrete` | Transition `display` and `overlay` |
| `scrollbar-gutter: stable` | No layout jump when a scrollbar appears |
| `content-visibility: auto` | Skip rendering off-screen sections (big perf win) |
| `inset`, logical properties | Shorter, direction-aware positioning |
| `accent-color` | Brand-colour checkboxes, radios, range, progress in one line |
| `caret-color`, `caret-shape` | Style the text cursor |
| `hanging-punctuation` | Quote marks hang outside the text edge (Safari) |
| `initial-letter` | Proper drop caps (Safari, Chromium 110+) |
| `@view-transition` | Cross-document page transitions |
| `reading-flow` | Make tab/reading order follow a flex/grid visual order (Chromium 137+) |
| `sibling-index()`, `sibling-count()` | Stagger animations without nth-child lists (Chromium 138+) |
| `if()` | Inline conditionals on style queries / media / supports (Chromium 137+) |

```css
/* accent-color: brand your native controls with one line */
:root { accent-color: #e4572e; }
```

<div class="demo">
<div style="accent-color:#e4572e;display:flex;flex-wrap:wrap;gap:1em;align-items:center">
  <label><input type="checkbox" checked> checkbox</label>
  <label><input type="radio" checked> radio</label>
  <input type="range" aria-label="Range">
  <progress value="60" max="100"></progress>
</div>
</div>
