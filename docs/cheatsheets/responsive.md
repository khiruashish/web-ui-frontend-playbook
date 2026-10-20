# Responsive Design Cheat Sheet

Full guide: [Responsive Design](../layout/responsive.md).

## The essentials

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

```css
img, video { max-width: 100%; height: auto; }          /* media never overflows */
.container { width: min(100% - 2rem, 75rem); margin-inline: auto; }
```

**Mobile-first:** write the phone layout as the base, then add `min-width` queries for bigger screens.

## Breakpoints

| Token | `min-width` | Typical screen |
|---|---|---|
| `sm` | `40em` (640px) | Large phone, landscape |
| `md` | `48em` (768px) | Tablet portrait |
| `lg` | `64em` (1024px) | Tablet landscape, small laptop |
| `xl` | `80em` (1280px) | Laptop / desktop |
| `2xl` | `96em` (1536px) | Large desktop |

Add breakpoints where **your content** breaks, not for specific devices. Use `em` so breakpoints respect the user's font size.

## Media query syntax

```css
@media (width >= 48em) { }                       /* range syntax */
@media (40em <= width < 64em) { }                /* between */
@media (min-width: 48em) { }                     /* classic */
@media (max-width: 47.99em) { }                  /* below */
@media screen and (orientation: landscape) { }   /* and */
@media (width < 40em), (orientation: portrait) { }  /* comma = or */
@media not print { }                             /* not */
.card { @media (width >= 48em) { padding: 2rem; } }  /* nested */
```

## Media features

| Feature | Values / use |
|---|---|
| `width` · `height` | Viewport size |
| `aspect-ratio` | `16/9` |
| `orientation` | `portrait` · `landscape` |
| `hover` | `hover` (mouse) · `none` (touch) |
| `any-hover` | Any input can hover |
| `pointer` | `fine` (mouse) · `coarse` (finger) · `none` |
| `any-pointer` | Any input's precision |
| `resolution` | `2x` · `192dpi` |
| `prefers-color-scheme` | `light` · `dark` |
| `prefers-reduced-motion` | `reduce` · `no-preference` |
| `prefers-contrast` | `more` · `less` · `custom` |
| `prefers-reduced-transparency` | `reduce` |
| `forced-colors` | `active` (Windows High Contrast) |
| `inverted-colors` | `inverted` |
| `display-mode` | `browser` · `standalone` · `fullscreen` · `picture-in-picture` |
| `scripting` | `enabled` · `none` |
| `update` | `fast` · `slow` (e-ink) · `none` (print) |
| `dynamic-range` | `high` (HDR) |
| Media types | `screen` · `print` · `all` |

```css
@media (hover: hover) and (pointer: fine) { .card:hover { translate: 0 -4px; } }
@media (pointer: coarse) { .btn { min-height: 44px; } }
@media (prefers-reduced-motion: no-preference) { .card { transition: translate .2s; } }
@media print { nav, aside, video { display: none; } a[href]::after { content: " (" attr(href) ")"; } }
```

## Container queries

```css
.slot { container: card / inline-size; }       /* name / type */

@container card (width >= 30rem) { .card { grid-template-columns: 10rem 1fr; } }
@container (width < 20rem) { .card .meta { display: none; } }
@container style(--variant: compact) { .card { padding: .5rem; } }   /* style query */

.card h2 { font-size: clamp(1rem, 4cqi, 1.75rem); }   /* container units */
```

| `container-type` | Allows queries on |
|---|---|
| `inline-size` | Width (most common) |
| `size` | Width and height (the container needs an explicit height) |
| `normal` | Style queries only |

**Media query** = page layout. **Container query** = component layout.

## Intrinsic layouts (no breakpoints at all)

```css
/* Cards that reflow from 1 to N columns */
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); gap: 1rem; }

/* Sidebar that drops above content when there's no room */
.with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }
.with-sidebar > :first-child { flex: 1 1 15rem; }
.with-sidebar > :last-child  { flex: 999 1 0; min-inline-size: 60%; }

/* Row ↔ column switch at a container width of 40rem */
.switcher { display: flex; flex-wrap: wrap; gap: 1rem; }
.switcher > * { flex-grow: 1; flex-basis: calc((40rem - 100%) * 999); }

/* Wrapping cluster of tags/buttons */
.cluster { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
```

## Fluid type & space

```css
:root {
  --step-0: clamp(1rem, .93rem + .36vw, 1.2rem);       /* body */
  --step-1: clamp(1.2rem, 1.09rem + .54vw, 1.5rem);     /* h4 */
  --step-2: clamp(1.44rem, 1.28rem + .8vw, 1.88rem);    /* h3 */
  --step-3: clamp(1.73rem, 1.5rem + 1.15vw, 2.34rem);   /* h2 */
  --step-4: clamp(2.07rem, 1.75rem + 1.63vw, 2.93rem);  /* h1 */
  --space-s: clamp(.75rem, .6rem + .6vw, 1rem);
  --space-m: clamp(1rem, .8rem + 1vw, 1.5rem);
  --space-l: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}
```

Always include a `rem` part in the middle value, so text still grows when users zoom.

## Responsive images

| Need | Use |
|---|---|
| Same image, different resolutions | `srcset="a-400.jpg 400w, a-800.jpg 800w"` + `sizes="(min-width: 64em) 50vw, 100vw"` |
| Retina for a fixed-size image | `srcset="logo.png 1x, logo@2x.png 2x"` |
| Modern formats with fallback | `<picture><source type="image/avif">…<img></picture>` |
| Different crop on mobile (art direction) | `<source media="(max-width: 40em)" srcset="portrait.jpg">` |
| CSS background | `background-image: image-set("a.avif" type("image/avif"), "a.jpg" type("image/jpeg"));` |
| Prevent layout shift | `width` + `height` attributes, or `aspect-ratio` |
| Crop to fit a box | `object-fit: cover; aspect-ratio: 4/3;` |

## Viewport height on mobile

| Unit | Height when the URL bar is… |
|---|---|
| `100vh` | Hidden (often taller than what's visible) |
| `100svh` | Shown (always fits) |
| `100lvh` | Hidden |
| `100dvh` | Whatever it is right now (changes as you scroll) |

Hero sections: `min-height: 100svh`. Full-screen app shells: `height: 100dvh`.

## Touch & device details

```css
.btn, .icon-btn { min-inline-size: 44px; min-block-size: 44px; }      /* touch targets */
input, select, textarea { font-size: max(16px, 1rem); }               /* no iOS zoom on focus */
.bottom-bar { padding-bottom: max(1rem, env(safe-area-inset-bottom)); } /* needs viewport-fit=cover */
html { -webkit-tap-highlight-color: transparent; }
.scroller { overscroll-behavior: contain; scroll-snap-type: x mandatory; }
button { touch-action: manipulation; }                                /* no double-tap zoom delay */
```

## Responsive patterns quick list

| Pattern | Small screen | Large screen | Key CSS |
|---|---|---|---|
| Navigation | Burger → popover/drawer | Inline links | `popover`, `@media` display switch |
| Card grid | 1 column | 2–4 columns | `auto-fit` + `minmax` |
| Sidebar layout | Sidebar above or below | Side by side | Grid areas or flex-wrap sidebar |
| Data table | Horizontal scroll or stacked cards | Full table | `overflow-x: auto` / `display: block` on cells |
| Hero | Stacked text + image | Split | Grid `1fr 1fr` at `md` |
| Footer | Stacked columns | 4 columns | `auto-fit` grid |
| Forms | Single column | 2 columns for short fields | Grid `span` |
| Tabs | Scrollable row or accordion | Tab row | `overflow-x: auto` · `details` |

## Testing checklist

- [ ] 320px, 375px, 768px, 1024px, 1440px, 1920px
- [ ] Portrait and landscape on a real phone
- [ ] Zoom 200% and 400%: no horizontal scrolling (WCAG 1.4.10)
- [ ] Larger browser font size
- [ ] Touch: targets ≥ 24px (ideally 44px), no hover-only actions
- [ ] Dark mode, reduced motion, forced colours
- [ ] Print preview
