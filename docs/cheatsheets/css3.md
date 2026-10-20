# CSS3 & Modern CSS Cheat Sheet

The "CSS3" effects (rounded corners, shadows, gradients, transforms, transitions, animations) plus everything new from 2020–2026, with Baseline status. Full explanations: [Effects](../css/effects.md), [Animations](../css/animations.md), [Modern CSS](../css/modern-css.md).

## Effects at a glance

<div class="cs-grid">
<div class="cs-card"><code>border-radius: 12px</code><div class="mini" style="display:grid;place-items:center"><div style="width:70px;height:50px;background:var(--box-a);border-radius:12px"></div></div></div>
<div class="cs-card"><code>border-radius: 50%</code><div class="mini" style="display:grid;place-items:center"><div style="width:56px;height:56px;background:var(--box-b);border-radius:50%"></div></div></div>
<div class="cs-card"><code>border-radius: 999px (pill)</code><div class="mini" style="display:grid;place-items:center"><div style="width:100px;height:30px;background:var(--box-c);border-radius:999px"></div></div></div>
<div class="cs-card"><code>box-shadow: 0 8px 24px rgb(0 0 0/.2)</code><div class="mini" style="display:grid;place-items:center"><div style="width:80px;height:50px;background:#fff;border-radius:8px;box-shadow:0 8px 24px rgb(0 0 0/.2)"></div></div></div>
<div class="cs-card"><code>box-shadow: inset 0 2px 6px rgb(0 0 0/.3)</code><div class="mini" style="display:grid;place-items:center"><div style="width:80px;height:50px;background:#eee;border-radius:8px;box-shadow:inset 0 2px 6px rgb(0 0 0/.3)"></div></div></div>
<div class="cs-card"><code>box-shadow: 0 0 0 4px #e4572e (ring)</code><div class="mini" style="display:grid;place-items:center"><div style="width:80px;height:44px;background:#fff;border-radius:8px;box-shadow:0 0 0 4px #e4572e"></div></div></div>
<div class="cs-card"><code>text-shadow: 2px 2px 0 #e4572e</code><div class="mini" style="display:grid;place-items:center;font:900 1.6rem system-ui;text-shadow:2px 2px 0 #e4572e">Aa</div></div>
<div class="cs-card"><code>linear-gradient(135deg, #e4572e, #f3a712)</code><div class="mini" style="background:linear-gradient(135deg,#e4572e,#f3a712)"></div></div>
<div class="cs-card"><code>radial-gradient(circle at 30% 30%, #fff, #3f51b5)</code><div class="mini" style="background:radial-gradient(circle at 30% 30%,#fff,#3f51b5)"></div></div>
<div class="cs-card"><code>conic-gradient(#e4572e 0 40%, #f3a712 0 70%, #3f51b5 0)</code><div class="mini" style="display:grid;place-items:center"><div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(#e4572e 0 40%,#f3a712 0 70%,#3f51b5 0)"></div></div></div>
<div class="cs-card"><code>repeating-linear-gradient(45deg, #ddd 0 8px, #bbb 8px 16px)</code><div class="mini" style="background:repeating-linear-gradient(45deg,#ddd 0 8px,#bbb 8px 16px)"></div></div>
<div class="cs-card"><code>background-clip: text</code><div class="mini" style="display:grid;place-items:center;font:900 1.6rem system-ui;background:linear-gradient(90deg,#e4572e,#3f51b5);-webkit-background-clip:text;background-clip:text;color:transparent">Gradient</div></div>
<div class="cs-card"><code>filter: blur(3px)</code><div class="mini" style="display:grid;place-items:center"><div style="width:70px;height:50px;background:linear-gradient(135deg,#e4572e,#3f51b5);border-radius:8px;filter:blur(3px)"></div></div></div>
<div class="cs-card"><code>filter: grayscale(1)</code><div class="mini" style="display:grid;place-items:center"><div style="width:70px;height:50px;background:linear-gradient(135deg,#e4572e,#3f51b5);border-radius:8px;filter:grayscale(1)"></div></div></div>
<div class="cs-card"><code>filter: drop-shadow(0 4px 4px #0006)</code><div class="mini" style="display:grid;place-items:center"><div style="width:0;height:0;border:28px solid transparent;border-bottom:48px solid #e4572e;border-top:0;filter:drop-shadow(0 4px 4px #0006)"></div></div></div>
<div class="cs-card"><code>backdrop-filter: blur(8px)</code><div class="mini" style="display:grid;place-items:center;background:repeating-linear-gradient(45deg,#e4572e 0 10px,#3f51b5 10px 20px)"><div style="padding:.5em 1em;border-radius:10px;background:rgb(255 255 255/.25);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font:700 .7rem system-ui">Glass</div></div></div>
<div class="cs-card"><code>clip-path: polygon(50% 0, 100% 100%, 0 100%)</code><div class="mini" style="display:grid;place-items:center"><div style="width:64px;height:56px;background:#e4572e;clip-path:polygon(50% 0,100% 100%,0 100%)"></div></div></div>
<div class="cs-card"><code>mask-image: linear-gradient(#000, transparent)</code><div class="mini" style="background:linear-gradient(135deg,#e4572e,#3f51b5);mask-image:linear-gradient(#000,transparent);-webkit-mask-image:linear-gradient(#000,transparent)"></div></div>
<div class="cs-card"><code>mix-blend-mode: multiply</code><div class="mini" style="position:relative"><div style="position:absolute;left:10%;top:10px;width:56px;height:56px;border-radius:50%;background:#e4572e;mix-blend-mode:multiply"></div><div style="position:absolute;left:35%;top:10px;width:56px;height:56px;border-radius:50%;background:#3f9be4;mix-blend-mode:multiply"></div></div></div>
<div class="cs-card"><code>opacity: .4</code><div class="mini" style="display:grid;place-items:center"><div style="width:70px;height:50px;background:#e4572e;border-radius:8px;opacity:.4"></div></div></div>
</div>

## Transforms

<div class="cs-grid">
<div class="cs-card"><code>translate: 12px 8px</code><div class="mini"><div class="m" style="width:40px;translate:12px 8px">●</div></div></div>
<div class="cs-card"><code>rotate: 20deg</code><div class="mini" style="display:grid;place-items:center"><div class="m" style="width:44px;rotate:20deg">●</div></div></div>
<div class="cs-card"><code>scale: 1.4</code><div class="mini" style="display:grid;place-items:center"><div class="m" style="width:40px;scale:1.4">●</div></div></div>
<div class="cs-card"><code>transform: skew(15deg)</code><div class="mini" style="display:grid;place-items:center"><div class="m" style="width:50px;transform:skew(15deg)">●</div></div></div>
<div class="cs-card"><code>transform: rotateY(45deg) + perspective</code><div class="mini" style="display:grid;place-items:center;perspective:200px"><div class="m" style="width:60px;height:40px;transform:rotateY(45deg)">3D</div></div></div>
<div class="cs-card"><code>transform-origin: top left; rotate: 15deg</code><div class="mini"><div class="m" style="width:50px;transform-origin:top left;rotate:15deg">●</div></div></div>
</div>

| Function | Example |
|---|---|
| `translate(x, y)` · `translateX()` · `translateY()` · `translateZ()` · `translate3d()` | `translate(-50%, -50%)` |
| `rotate(a)` · `rotateX()` · `rotateY()` · `rotateZ()` · `rotate3d()` | `rotate(.25turn)` |
| `scale(n)` · `scaleX()` · `scaleY()` · `scale3d()` | `scale(1.05)` |
| `skew(x, y)` · `skewX()` · `skewY()` | `skewY(-3deg)` |
| `matrix()` · `matrix3d()` | rarely hand-written |
| `perspective(n)` | `perspective(600px) rotateY(20deg)` |

Individual properties: `translate`, `rotate`, `scale` (easier to animate separately). Related: `transform-origin`, `transform-style: preserve-3d`, `perspective`, `perspective-origin`, `backface-visibility: hidden`.

## Transitions

```css
.btn { transition: background-color .2s ease, translate .2s ease; }
.btn:hover { background-color: #c43d17; translate: 0 -2px; }
/* transition: <property> <duration> <timing-function> <delay>; */
```

| Property | Values |
|---|---|
| `transition-property` | `all` · `opacity` · `transform` · `background-color` |
| `transition-duration` | `150ms` – `300ms` for UI |
| `transition-timing-function` | `ease` · `linear` · `ease-in` · `ease-out` · `ease-in-out` · `steps(4)` · `cubic-bezier(.34,1.56,.64,1)` · `linear(0, 1.2 60%, 1)` |
| `transition-delay` | `0s` · `100ms` |
| `transition-behavior` | `allow-discrete` (transition `display`, `overlay`) |

Entry animation from `display: none`: `@starting-style { .el { opacity: 0; } }` + `transition: opacity .3s, display .3s allow-discrete`.

## Animations

```css
@keyframes fade-up {
  from { opacity: 0; translate: 0 1rem; }
  to   { opacity: 1; translate: 0 0; }
}
.card { animation: fade-up .4s ease-out both; }
/* animation: <name> <duration> <timing> <delay> <iteration-count> <direction> <fill-mode> <play-state>; */
```

| Property | Values |
|---|---|
| `animation-name` | `@keyframes` name |
| `animation-duration` | `1s` |
| `animation-timing-function` | as transitions |
| `animation-delay` | `.2s` (negative = start mid-way) |
| `animation-iteration-count` | `1` · `3` · `infinite` |
| `animation-direction` | `normal` · `reverse` · `alternate` · `alternate-reverse` |
| `animation-fill-mode` | `none` · `forwards` · `backwards` · `both` |
| `animation-play-state` | `running` · `paused` |
| `animation-timeline` | `scroll()` · `view()` · `--named-timeline` |
| `animation-range` | `entry 0% entry 100%` · `cover 0% cover 50%` |

| Cheap to animate | Moderate | Expensive (layout) |
|---|---|---|
| `transform`, `translate`, `rotate`, `scale`, `opacity` | `color`, `background-color`, `box-shadow`, `filter` | `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size` |

## Other CSS3 modules

| Feature | Example |
|---|---|
| Media queries | `@media (min-width: 48em) and (orientation: landscape)` |
| Web fonts | `@font-face { src: url(x.woff2) format("woff2"); }` |
| Multi-column | `columns: 3 200px; column-gap: 2rem; column-rule: 1px solid #ddd;` |
| `rgba()` / `hsla()` / opacity | `rgb(0 0 0 / .5)` |
| `calc()` | `width: calc(100% - 2rem)` |
| `box-sizing` | `border-box` |
| `border-image` | `border-image: linear-gradient(red, blue) 1;` |
| Multiple backgrounds | `background: url(a.png), url(b.png), #fff;` |
| `background-size` / `-origin` / `-clip` | `cover` · `content-box` · `text` |
| `word-wrap` / `overflow-wrap` | `anywhere` |
| `text-overflow` | `ellipsis` |
| `resize` | `vertical` |
| `:nth-child()` and friends | `li:nth-child(odd)` |
| Flexbox | [Flexbox sheet](flexbox.md) |
| Grid | [Grid sheet](grid.md) |

## Modern CSS (2020–2026)

| Feature | Snippet | Status |
|---|---|---|
| Custom properties | `--brand: #e4572e; color: var(--brand, red);` | Widely available |
| `gap` in flexbox | `display: flex; gap: 1rem;` | Widely available |
| `aspect-ratio` | `aspect-ratio: 16 / 9;` | Widely available |
| Logical properties | `margin-inline: auto; padding-block: 1rem;` | Widely available |
| `inset` | `inset: 0;` | Widely available |
| `:is()` / `:where()` | `:is(h1, h2):hover` | Widely available |
| `:focus-visible` | `:focus-visible { outline: 3px solid; }` | Widely available |
| `clamp()` / `min()` / `max()` | `font-size: clamp(1rem, 2vw + .5rem, 2rem);` | Widely available |
| `dvh` / `svh` / `lvh` | `min-height: 100dvh;` | Baseline 2022 |
| `@layer` | `@layer reset, base, components;` | Baseline 2022 |
| Individual transforms | `translate: 0 -4px; scale: 1.05;` | Baseline 2022 |
| `accent-color` | `accent-color: #e4572e;` | Baseline 2022 |
| `:has()` | `.card:has(img) { }` | Baseline 2023 |
| Container queries | `container-type: inline-size; @container (width > 30rem) { }` | Baseline 2023 |
| Container units | `font-size: 5cqi;` | Baseline 2023 |
| Nesting | `.card { &:hover { } }` | Baseline 2023 |
| Subgrid | `grid-template-rows: subgrid;` | Baseline 2023 |
| `color-mix()` | `color-mix(in oklch, var(--brand), white 30%)` | Baseline 2023 |
| `oklch()` / `oklab()` / `lab()` / `lch()` | `oklch(64% .19 37)` | Baseline 2023 |
| `:user-invalid` | `input:user-invalid { border-color: red; }` | Baseline 2023 |
| `text-wrap: balance` | `h1 { text-wrap: balance; }` | Baseline 2024 |
| `@property` | `@property --angle { syntax: "<angle>"; … }` | Baseline 2024 |
| `light-dark()` | `color: light-dark(#111, #eee);` | Baseline 2024 |
| Relative colours | `oklch(from var(--brand) calc(l - .1) c h)` | Baseline 2024 |
| `@starting-style` | entry transitions | Baseline 2024 |
| `transition-behavior: allow-discrete` | transition `display` | Baseline 2024 |
| Popover styling | `[popover]:popover-open { }` | Baseline 2024 |
| `@scope` | `@scope (.card) { img { } }` | Baseline 2025 |
| View transitions (same-document) | `document.startViewTransition(fn)` | Baseline 2025 |
| `text-wrap: pretty` | `p { text-wrap: pretty; }` | Chromium, Safari |
| Anchor positioning | `anchor-name: --a; position-anchor: --a; position-area: top;` | Chromium, Safari 26 |
| Scroll-driven animations | `animation-timeline: view();` | Chromium, Safari 26 |
| Container style queries | `@container style(--theme: dark) { }` | Chromium, Safari 18 |
| Cross-document view transitions | `@view-transition { navigation: auto; }` | Chromium, Safari 18.2 |
| `field-sizing: content` | auto-growing textarea | Chromium |
| `interpolate-size: allow-keywords` | animate to `height: auto` | Chromium |
| Customizable `<select>` | `appearance: base-select;` | Chromium |
| `if()` · `@function` | inline conditionals, custom functions | Chromium (experimental elsewhere) |
| `sibling-index()` · `sibling-count()` | stagger without nth-child lists | Chromium |
| CSS carousels | `::scroll-marker`, `::scroll-button()` | Chromium |
| `corner-shape` | `corner-shape: squircle;` | Chromium |

Ship newer features as progressive enhancement:

```css
@supports (animation-timeline: view()) { .card { animation: reveal linear both; animation-timeline: view(); } }
@supports not (anchor-name: --a) { .tooltip { /* JS-positioned fallback */ } }
@supports selector(:has(a)) { .card:has(img) { grid-template-columns: 80px 1fr; } }
```

## Vendor prefixes still worth writing

| Property | Write |
|---|---|
| `backdrop-filter` | `-webkit-backdrop-filter` too (older Safari) |
| `background-clip: text` | `-webkit-background-clip: text` too |
| `line-clamp` | `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;` |
| `mask-image` | `-webkit-mask-image` too (older Chromium/Safari) |
| `text-size-adjust` | `-webkit-text-size-adjust` too |
| `user-select` | `-webkit-user-select` too (Safari) |
| `::-webkit-details-marker` | Older Safari `<summary>` marker |

Let Autoprefixer (or Lightning CSS) add the rest based on your browserslist.
