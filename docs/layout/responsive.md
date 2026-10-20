# Responsive Design

Responsive design means one codebase that works on a 320px phone, a 1920px monitor, a tablet in either orientation, a watch, a TV, a printer and a screen reader.

## The three ingredients <span class="lvl lvl-1">Beginner</span> { #the-three-ingredients data-toc-label="The three ingredients" }

1. **The viewport meta tag**: without it, phones render your page at 980px and zoom out.

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ```

2. **Fluid layouts**: percentages, `fr`, `flex`, `minmax()`, `max-width` instead of fixed pixel widths.

    ```css
    .container { width: min(100% - 2rem, 70rem); margin-inline: auto; }
    img { max-width: 100%; height: auto; }
    ```

3. **Media queries / container queries**: change the layout where the design breaks.

## Mobile-first <span class="lvl lvl-1">Beginner</span> { #mobile-first data-toc-label="Mobile-first" }

Write the base styles for the **smallest** screen, then add complexity with `min-width` queries. Small screens download and parse less override CSS, and you're forced to prioritise content.

```css
/* Base: mobile, single column */
.grid { display: grid; gap: 1rem; }

/* ≥ 640px: two columns */
@media (min-width: 40em) {
  .grid { grid-template-columns: 1fr 1fr; }
}

/* ≥ 1024px: three columns */
@media (min-width: 64em) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

<div class="demo">
<div class="c rsp-grid"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div><div class="b">6</div></div>
<style>
  .rsp-grid { display: grid; }
  @media (min-width: 40em) { .rsp-grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 64em) { .rsp-grid { grid-template-columns: repeat(3, 1fr); } }
</style>
</div>

Resize your browser window to see 1 → 2 → 3 columns.

!!! tip "Why `em` in media queries?"
    `em`-based breakpoints respond to the user's browser font-size setting: if someone sets a larger default font, they get the narrower layout sooner, which is exactly what they need. `40em` = 640px at the default 16px.

## Media query syntax <span class="lvl lvl-2">Intermediate</span> { #media-query-syntax data-toc-label="Media query syntax" }

```css
/* Range syntax (Baseline 2023): clearer than min-/max- */
@media (width >= 768px) { }
@media (400px <= width < 1024px) { }

/* Classic */
@media (min-width: 768px) and (max-width: 1023.98px) { }

/* Logic */
@media screen and (orientation: landscape) { }
@media (width < 600px), (orientation: portrait) { }   /* comma = OR */
@media not print { }

/* Inside nested CSS */
.card {
  padding: 1rem;
  @media (width >= 48em) { padding: 2rem; }
}
```

## Media features beyond width <span class="lvl lvl-2">Intermediate</span> { #media-features-beyond-width data-toc-label="Media features beyond width" }

| Feature | Use |
|---|---|
| `(hover: hover)` | Primary input can hover (mouse). Wrap hover-only effects in it. |
| `(pointer: coarse)` | Touch screen: make targets bigger |
| `(any-pointer: fine)` | Any fine pointer present |
| `(prefers-color-scheme: dark)` | User wants dark mode |
| `(prefers-reduced-motion: reduce)` | User wants less motion |
| `(prefers-contrast: more)` | User wants higher contrast |
| `(forced-colors: active)` | Windows High Contrast mode |
| `(prefers-reduced-transparency: reduce)` | Turn off glass effects |
| `(orientation: portrait)` | Taller than wide |
| `(aspect-ratio > 16/9)` | Ultra-wide |
| `(resolution >= 2x)` | High-DPI screens |
| `(display-mode: standalone)` | Running as an installed PWA |
| `(scripting: none)` | JavaScript disabled |
| `print` (media type) | Print stylesheet |

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { translate: 0 -4px; }   /* no sticky hover on touch devices */
}

@media (pointer: coarse) {
  .btn { min-height: 44px; }
}

@media print {
  nav, .ads, video { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
  body { color: black; background: white; }
}
```

## Choosing breakpoints <span class="lvl lvl-2">Intermediate</span> { #choosing-breakpoints data-toc-label="Choosing breakpoints" }

**Let the content decide.** Start narrow, widen the browser, and add a breakpoint where the design starts to look wrong, not at specific device widths (there are thousands).

Common starting points if you need a system:

| Name | `min-width` | Typical device |
|---|---|---|
| sm | 40em (640px) | Large phone landscape |
| md | 48em (768px) | Tablet portrait |
| lg | 64em (1024px) | Tablet landscape / small laptop |
| xl | 80em (1280px) | Desktop |
| 2xl | 96em (1536px) | Large desktop |

## Container queries <span class="lvl lvl-3">Advanced</span> { #container-queries data-toc-label="Container queries" }

Components that adapt to the space **they're given**, not the viewport. Put the same card in a sidebar and in the main column and each adapts correctly.

```css
.slot { container-type: inline-size; }

.product { display: grid; gap: .75rem; }

@container (width >= 30rem) {
  .product { grid-template-columns: 10rem 1fr; }
}
@container (width >= 45rem) {
  .product { grid-template-columns: 14rem 1fr auto; }
}
```

<div class="demo">
<div class="rsp-cq-wrap">
  <div class="slot side"><div class="product"><div class="pic"></div><div><strong>In a 220px sidebar</strong><br>Stacked layout.</div></div></div>
  <div class="slot main"><div class="product"><div class="pic"></div><div><strong>In the main column</strong><br>Same HTML, same CSS: side-by-side because the container is wider.</div></div></div>
</div>
<style>
  .rsp-cq-wrap { display: grid; grid-template-columns: 220px 1fr; gap: 1em; }
  @media (width < 700px) { .rsp-cq-wrap { grid-template-columns: 1fr; } }
  .rsp-cq-wrap .slot { container-type: inline-size; border: 2px dashed #e4572e; border-radius: 10px; padding: .6em; }
  .rsp-cq-wrap .product { display: grid; gap: .75rem; }
  .rsp-cq-wrap .pic { min-height: 70px; border-radius: 8px; background: linear-gradient(135deg, #3f51b5, #7c4dff); }
  @container (width >= 22rem) { .rsp-cq-wrap .product { grid-template-columns: 8rem 1fr; } }
</style>
</div>

**Media query or container query?** Page-level layout (how many columns the page has, whether the nav collapses) → media query. Component layout (how a card arranges itself) → container query.

## Fluid typography and spacing <span class="lvl lvl-2">Intermediate</span> { #fluid-typography-and-spacing data-toc-label="Fluid typography and spacing" }

```css
:root {
  --space-s: clamp(.75rem, .6rem + .6vw, 1rem);
  --space-m: clamp(1rem, .8rem + 1vw, 1.5rem);
  --space-l: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 4rem); }
section { padding-block: var(--space-l); }
```

Values scale smoothly between a minimum and a maximum, with no breakpoints. See [Typography → Fluid type scale](../css/typography.md#fluid-type-scale).

## Responsive images <span class="lvl lvl-2">Intermediate</span> { #responsive-images data-toc-label="Responsive images" }

```html
<!-- Resolution switching -->
<img src="card-640.jpg"
     srcset="card-320.jpg 320w, card-640.jpg 640w, card-1280.jpg 1280w"
     sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
     alt="…" width="640" height="400" loading="lazy">

<!-- Art direction: different crop on mobile -->
<picture>
  <source media="(max-width: 39.99em)" srcset="hero-portrait.avif">
  <img src="hero-wide.avif" alt="…" width="1600" height="700">
</picture>

<!-- CSS backgrounds -->
<style>
  .hero { background-image: image-set("hero.avif" type("image/avif"), "hero.jpg" type("image/jpeg")); }
</style>
```

Full details: [Images & Media](../html/media.md#responsive-images-with-srcset-and-sizes).

## Responsive navigation <span class="lvl lvl-2">Intermediate</span> { #responsive-navigation data-toc-label="Responsive navigation" }

A no-JS-required pattern using the popover API on mobile and a plain row on desktop:

```html
<header class="site-header">
  <a href="/" class="logo">Brand</a>
  <button class="menu-btn" popovertarget="site-nav" aria-label="Menu">☰</button>
  <nav id="site-nav" popover>
    <a href="/">Home</a><a href="/docs">Docs</a><a href="/blog">Blog</a>
  </nav>
</header>
```

```css
.site-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem; }

/* Mobile: nav is a popover sheet */
#site-nav:popover-open { display: flex; flex-direction: column; inset: 0 0 auto auto; margin: 4rem 1rem 0 auto; }

/* Desktop: show nav inline, hide the button */
@media (width >= 48em) {
  .menu-btn { display: none; }
  #site-nav { display: flex; gap: 1.5rem; position: static; inset: auto; margin: 0; padding: 0; border: 0; background: none; overflow: visible; }
}
```

The full working version is in the [Layout Gallery](../reverse-engineering/gallery.md) header.

## Touch and safe areas <span class="lvl lvl-3">Advanced</span> { #touch-and-safe-areas data-toc-label="Touch and safe areas" }

```css
/* WCAG 2.5.8: at least 24×24 CSS px targets; 44×44 recommended for primary actions */
.icon-btn { min-inline-size: 44px; min-block-size: 44px; }

/* iPhone notch / home indicator: requires viewport-fit=cover in the meta tag */
.bottom-bar { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }

/* Fix the iOS zoom-on-focus: inputs need font-size >= 16px */
input, select, textarea { font-size: max(16px, 1rem); }
```

## Testing checklist <span class="lvl lvl-2">Intermediate</span> { #testing-checklist data-toc-label="Testing checklist" }

- [ ] DevTools device mode at 320, 375, 768, 1024, 1440, 1920px
- [ ] Rotate to landscape on a phone
- [ ] Zoom to 200% and 400% (WCAG 1.4.10 Reflow: no horizontal scroll at 320 CSS px wide)
- [ ] Browser font size set to "Very large"
- [ ] Real iOS Safari and Android Chrome (emulators miss URL-bar and keyboard behaviour)
- [ ] Dark mode and reduced motion turned on
- [ ] Print preview
