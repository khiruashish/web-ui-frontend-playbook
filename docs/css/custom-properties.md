# Custom Properties & Theming

## The basics <span class="lvl lvl-1">Beginner</span> { #the-basics data-toc-label="The basics" }

Custom properties (often called CSS variables) store a value once and reuse it everywhere.

```css
:root {
  --brand: #e4572e;
  --radius: 12px;
  --space: 1rem;
}
.btn {
  background: var(--brand);
  border-radius: var(--radius);
  padding: calc(var(--space) / 2) var(--space);
}
.btn--ghost {
  background: transparent;
  color: var(--brand);
  border: 2px solid var(--brand);
}
```

<div class="demo cp-basic">
<button class="btn">Primary</button> <button class="btn btn--ghost">Ghost</button>
<style>
  .cp-basic { --brand: #e4572e; --radius: 12px; --space: 1rem; }
  .cp-basic .btn { background: var(--brand); color: #fff; border: 2px solid var(--brand); border-radius: var(--radius); padding: calc(var(--space) / 2) var(--space); font-weight: 700; }
  .cp-basic .btn--ghost { background: transparent; color: var(--brand); }
</style>
</div>

- Names start with `--` and are **case-sensitive**.
- Fallback: `var(--accent, royalblue)` uses `royalblue` if `--accent` isn't set.
- They **inherit** and **cascade** like normal properties, and they're live: change one in JS or a media query and everything using it updates.

## Scoping: the real superpower <span class="lvl lvl-2">Intermediate</span> { #scoping-the-real-superpower data-toc-label="Scoping: the real superpower" }

Unlike Sass variables, custom properties can be overridden for one part of the page:

```css
.btn { background: var(--btn-bg, #e4572e); }
.danger-zone { --btn-bg: crimson; }       /* every .btn inside turns red */
.card[data-tone="calm"] { --btn-bg: seagreen; }
```

<div class="demo cp-scope">
<button class="btn">Default</button>
<span class="danger-zone"><button class="btn">Inside .danger-zone</button></span>
<span data-tone="calm"><button class="btn">Inside [data-tone=calm]</button></span>
<style>
  .cp-scope .btn { background: var(--btn-bg, #e4572e); color: #fff; border: 0; padding: .5em 1em; border-radius: 8px; margin: .2em; }
  .cp-scope .danger-zone { --btn-bg: crimson; }
  .cp-scope [data-tone="calm"] { --btn-bg: seagreen; }
</style>
</div>

### Passing values from HTML <span class="lvl lvl-2">Intermediate</span> { #passing-values-from-html data-toc-label="Passing values from HTML" }

```html
<div class="bar" style="--value: 72%"></div>
```

```css
.bar { background: #eee; border-radius: 99px; height: 12px; }
.bar::after { content: ""; display: block; height: 100%; width: var(--value); background: #e4572e; border-radius: inherit; }
```

<div class="demo">
<div class="cp-bar" style="--value:72%"></div>
<div class="cp-bar" style="--value:35%;margin-top:.6em"></div>
<style>
  .cp-bar { background: rgba(128,128,128,.25); border-radius: 99px; height: 12px; max-width: 320px; }
  .cp-bar::after { content: ""; display: block; height: 100%; width: var(--value); background: #e4572e; border-radius: inherit; }
</style>
</div>

## Dark mode <span class="lvl lvl-2">Intermediate</span> { #dark-mode data-toc-label="Dark mode" }

Use the system setting, and let users override it with a toggle.

```css
:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --fg: #1f2329;
  --surface: #f4f5f7;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #121417; --fg: #e6e8ec; --surface: #1d2129; }
}
/* Manual override (set data-theme on <html> from JS / localStorage) */
:root[data-theme="light"] { color-scheme: light; --bg: #ffffff; --fg: #1f2329; --surface: #f4f5f7; }
:root[data-theme="dark"]  { color-scheme: dark;  --bg: #121417; --fg: #e6e8ec; --surface: #1d2129; }

body { background: var(--bg); color: var(--fg); }
.card { background: var(--surface); }
```

Shorter, with `light-dark()` (Baseline 2024):

```css
:root { color-scheme: light dark; }
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
body  { background: light-dark(#fff, #121417); color: light-dark(#1f2329, #e6e8ec); }
```

<div class="demo">
<div class="cp-theme" data-t="light">
  <label><input type="checkbox" onchange="this.closest('.cp-theme').dataset.t=this.checked?'dark':'light'"> Dark mode</label>
  <div class="card"><strong>Card title</strong><br>Colours come from variables that switch with the theme.</div>
</div>
<style>
  .cp-theme { --bg: #ffffff; --fg: #1f2329; --surface: #f1f2f5; background: var(--bg); color: var(--fg); padding: 1em; border-radius: 10px; transition: background .3s, color .3s; }
  .cp-theme[data-t="dark"] { --bg: #121417; --fg: #e6e8ec; --surface: #262b33; }
  .cp-theme .card { background: var(--surface); padding: 1em; border-radius: 8px; margin-top: .8em; transition: background .3s; }
</style>
</div>

## Design tokens <span class="lvl lvl-3">Advanced</span> { #design-tokens data-toc-label="Design tokens" }

Tokens are named design decisions. Organise them in tiers:

```css
:root {
  /* Tier 1: primitive tokens (the raw palette; never used directly in components) */
  --orange-500: oklch(64% 0.19 37);
  --orange-600: oklch(56% 0.19 37);
  --gray-50: oklch(98% 0 0);
  --gray-900: oklch(22% 0.01 260);
  --space-1: .25rem; --space-2: .5rem; --space-3: 1rem; --space-4: 1.5rem; --space-5: 2rem;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px;

  /* Tier 2: semantic tokens (what components use) */
  --color-bg: var(--gray-50);
  --color-text: var(--gray-900);
  --color-accent: var(--orange-500);
  --color-accent-hover: var(--orange-600);

  /* Tier 3: component tokens (optional, for highly configurable components) */
  --button-bg: var(--color-accent);
  --button-radius: var(--radius-md);
}
```

Dark mode or a new brand only changes tier 2; no component CSS changes.

## Typed custom properties with `@property` <span class="lvl lvl-3">Advanced</span> <small>Baseline 2024</small> { #typed-custom-properties-with-property data-toc-label="Typed custom properties with @property" }

Normal custom properties are untyped strings, so the browser can't animate them. Register a type and it can:

```css
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.spin-border {
  background: conic-gradient(from var(--angle), #e4572e, #f3a712, #3f51b5, #e4572e);
  animation: rotate 3s linear infinite;
}
@keyframes rotate { to { --angle: 360deg; } }
```

<div class="demo">
<div class="cp-prop"><div>Animated gradient border</div></div>
<style>
  @property --pb-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
  @keyframes pb-rotate { to { --pb-angle: 360deg; } }
  .cp-prop { display: inline-block; padding: 4px; border-radius: 14px; background: conic-gradient(from var(--pb-angle), #e4572e, #f3a712, #3f51b5, #e4572e); animation: pb-rotate 3s linear infinite; }
  .cp-prop > div { background: var(--demo-bg); padding: 1em 1.5em; border-radius: 10px; font-weight: 700; }
</style>
</div>

## Reading and writing from JavaScript <span class="lvl lvl-2">Intermediate</span> { #reading-and-writing-from-javascript data-toc-label="Reading and writing from JavaScript" }

```js
const root = document.documentElement;
getComputedStyle(root).getPropertyValue('--brand');   // " #e4572e"
root.style.setProperty('--brand', 'royalblue');

// Follow the pointer
document.addEventListener('pointermove', e => {
  root.style.setProperty('--x', e.clientX + 'px');
  root.style.setProperty('--y', e.clientY + 'px');
});
```

!!! tip "Senior note · 🔴 Expert"
    Source your tokens from one place (a JSON file in the [W3C Design Tokens format](https://www.designtokens.org/)) and generate CSS, iOS, Android and Figma outputs with Style Dictionary or Terrazzo. Changing a token on the root invalidates style for the whole document. That's fine for theme switches, but avoid updating root-level variables on every `pointermove` on large pages; set them on the smallest element that needs them.
