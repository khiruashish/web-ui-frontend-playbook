# Colours & Units

## Colour formats <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-3">Advanced</span> { #colour-formats data-toc-label="Colour formats" }

```css
color: tomato;                        /* named (148 names) */
color: #e4572e;                       /* hex: RRGGBB */
color: #e4572e80;                     /* hex + alpha (80 = 50%) */
color: rgb(228 87 46);                /* modern space-separated syntax */
color: rgb(228 87 46 / 50%);          /* with alpha */
color: hsl(14 77% 54%);               /* hue, saturation, lightness */
color: hwb(14 18% 11%);               /* hue, whiteness, blackness */
color: lab(56% 52 51);                /* perceptual lightness, a, b */
color: lch(56% 73 44);                /* lightness, chroma, hue */
color: oklab(0.64 0.15 0.11);         /* improved Lab */
color: oklch(64% 0.19 37);            /* ← recommended for design systems */
color: color(display-p3 0.9 0.35 0.2);/* wide-gamut P3 */
color: currentColor;                  /* = the element's current `color` */
color: transparent;
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:.5em;font:600 12px/1.2 system-ui;color:#fff">
  <span style="background:tomato;padding:1em">named</span>
  <span style="background:#e4572e;padding:1em">hex</span>
  <span style="background:#e4572e80;padding:1em;color:#222">hex 50%</span>
  <span style="background:rgb(228 87 46);padding:1em">rgb</span>
  <span style="background:hsl(14 77% 54%);padding:1em">hsl</span>
  <span style="background:hwb(14 18% 11%);padding:1em">hwb</span>
  <span style="background:lab(56% 52 51);padding:1em">lab</span>
  <span style="background:lch(56% 73 44);padding:1em">lch</span>
  <span style="background:oklch(64% 0.19 37);padding:1em">oklch</span>
  <span style="background:color(display-p3 0.9 0.35 0.2);padding:1em">display-p3</span>
</div>
</div>

### Why OKLCH? <span class="lvl lvl-3">Advanced</span> { #why-oklch data-toc-label="Why OKLCH?" }

In HSL, `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) have the same "lightness" but look completely different in brightness. **OKLCH is perceptually uniform**: the same `L` looks equally light for every hue. That makes it ideal for generating accessible palettes: keep `L` fixed, rotate `H`.

```css
/* Same lightness and chroma, different hues: all look equally bright */
.s1 { background: oklch(70% 0.15 30); }
.s2 { background: oklch(70% 0.15 140); }
.s3 { background: oklch(70% 0.15 250); }
.s4 { background: oklch(70% 0.15 320); }
```

<div class="demo">
<div style="display:flex;gap:.4em;font:600 12px system-ui;color:#111">
  <span style="background:oklch(70% 0.15 30);padding:1.2em">H 30</span>
  <span style="background:oklch(70% 0.15 140);padding:1.2em">H 140</span>
  <span style="background:oklch(70% 0.15 250);padding:1.2em">H 250</span>
  <span style="background:oklch(70% 0.15 320);padding:1.2em">H 320</span>
</div>
<div style="display:flex;gap:.4em;font:600 12px system-ui;color:#111;margin-top:.4em">
  <span style="background:hsl(30 70% 60%);padding:1.2em">hsl 30</span>
  <span style="background:hsl(140 70% 60%);padding:1.2em">hsl 140</span>
  <span style="background:hsl(250 70% 60%);padding:1.2em">hsl 250</span>
  <span style="background:hsl(320 70% 60%);padding:1.2em">hsl 320</span>
</div>
</div>

Top row: OKLCH, consistent brightness. Bottom row: HSL with the same lightness, but the green looks much brighter than the blue.

### `color-mix()` <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2023</small> { #color-mix data-toc-label="color-mix()" }

```css
--brand: #e4572e;
--brand-light: color-mix(in oklch, var(--brand), white 40%);
--brand-dark:  color-mix(in oklch, var(--brand), black 30%);
--brand-faded: color-mix(in srgb, var(--brand) 20%, transparent);
```

<div class="demo">
<div style="display:flex;gap:.4em;font:600 12px system-ui">
  <span style="background:color-mix(in oklch, #e4572e, white 40%);padding:1.2em;color:#222">light</span>
  <span style="background:#e4572e;padding:1.2em;color:#fff">brand</span>
  <span style="background:color-mix(in oklch, #e4572e, black 30%);padding:1.2em;color:#fff">dark</span>
  <span style="background:color-mix(in srgb, #e4572e 20%, transparent);padding:1.2em">faded</span>
</div>
</div>

### Relative colour syntax <span class="lvl lvl-3">Advanced</span> <small>Baseline 2024</small> { #relative-colour-syntax data-toc-label="Relative colour syntax" }

Take an existing colour, change one channel:

```css
--hover: oklch(from var(--brand) calc(l - 0.1) c h);   /* 10% darker */
--muted: oklch(from var(--brand) l calc(c * 0.4) h);   /* less saturated */
--alpha: rgb(from var(--brand) r g b / 50%);           /* 50% opacity */
```

### `light-dark()` <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2024</small> { #light-dark data-toc-label="light-dark()" }

```css
:root { color-scheme: light dark; }
body {
  background: light-dark(#ffffff, #121212);
  color:      light-dark(#1f2329, #e6e8ec);
}
```

Uses the first value in light mode and the second in dark mode, following `color-scheme`.

## Units <span class="lvl lvl-1">Beginner</span> { #units data-toc-label="Units" }

### Absolute

| Unit | Meaning | Use |
|---|---|---|
| `px` | CSS pixel (1/96 inch, scaled by zoom and device pixel ratio) | Borders, shadows, small fixed details |
| `pt`, `cm`, `mm`, `in` | Physical units | Print stylesheets only |

### Relative to font size

| Unit | Relative to | Use |
|---|---|---|
| `rem` | Root (`<html>`) font size (16px by default) | **Font sizes, spacing**: respects the user's browser font setting |
| `em` | The element's own font size (or parent's, for `font-size`) | Padding that scales with the component's text (buttons) |
| `ch` | Width of "0" | Readable line length: `max-width: 65ch` |
| `ex`, `cap` | x-height, cap height | Fine typographic alignment |
| `lh` / `rlh` | Line height of element / root | Vertical rhythm: `margin-block: 1lh` |

```html
<div style="font-size: 20px">
  <button style="font-size: .8em; padding: .5em 1em">em padding</button>
  <button style="font-size: 1.6em; padding: .5em 1em">em padding</button>
</div>
```

<div class="demo">
<div style="font-size:20px">
  <button style="font-size:.8em;padding:.5em 1em">em padding</button>
  <button style="font-size:1.6em;padding:.5em 1em">em padding</button>
</div>
</div>

Both buttons use `padding: .5em 1em`, so the padding scales with each button's font size automatically.

!!! danger "Don't set `font-size` in `px`"
    Users who set a larger default font in their browser settings (common among low-vision users) get no benefit from `px` font sizes. Use `rem`. And never set `html { font-size: 62.5% }` just to make the maths easier; it fights the user's setting for every component that forgets to scale back.

### Relative to the viewport

| Unit | 1 unit = 1% of… |
|---|---|
| `vw` / `vh` | Viewport width / height |
| `vmin` / `vmax` | Smaller / larger dimension |
| `svh` / `svw` | **Small** viewport (mobile URL bar visible) |
| `lvh` / `lvw` | **Large** viewport (URL bar hidden) |
| `dvh` / `dvw` | **Dynamic**: changes as the URL bar shows/hides |
| `vi` / `vb` | Inline / block axis of the viewport |

```css
.hero { min-height: 100vh; }   /* ❌ on mobile, taller than the visible area */
.hero { min-height: 100svh; }  /* ✅ always fits with the URL bar shown */
.app  { height: 100dvh; }      /* ✅ tracks the real visible height (can cause reflow on scroll) */
```

### Relative to a container <span class="lvl lvl-3">Advanced</span> <small>Baseline 2023</small> { #relative-to-a-container data-toc-label="Relative to a container" }

`cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`: 1% of the nearest **size container** (see [container queries](../layout/responsive.md#container-queries)).

```css
.card-wrap { container-type: inline-size; }
.card h2 { font-size: clamp(1rem, 5cqi, 2rem); }  /* scales with the card, not the page */
```

### Others

| Unit | Use |
|---|---|
| `%` | Relative to the parent (for width), or the element itself (for `translate`) |
| `fr` | Fraction of free space in a grid |
| `deg`, `turn`, `rad` | Angles |
| `s`, `ms` | Time |
| `dpi`, `dppx`, `x` | Resolution (`image-set`, media queries) |

## Maths functions <span class="lvl lvl-2">Intermediate</span> { #maths-functions data-toc-label="Maths functions" }

```css
width: calc(100% - 2rem);
width: min(100%, 60rem);        /* the smaller: "max 60rem, but never overflow" */
width: max(50%, 300px);         /* the larger */
font-size: clamp(1rem, 0.8rem + 1.5vw, 2rem);  /* min, preferred, max */
padding: round(up, 13px, 4px);  /* 16px */
```

`clamp()` is the backbone of fluid design: one line instead of three media queries.

```html
<h2 style="font-size: clamp(1.2rem, 1rem + 3vw, 3rem)">Resize the window: I scale smoothly</h2>
```

<div class="demo">
<h2 style="font-size:clamp(1.2rem, 1rem + 3vw, 3rem);margin:0">Resize the window: I scale smoothly</h2>
</div>

Other functions: `abs()`, `sign()`, `mod()`, `rem()`, `pow()`, `sqrt()`, `sin()`, `cos()`, `tan()`, `atan2()`, `exp()`, `log()`, `hypot()`. Trig functions are handy for circular layouts.

!!! tip "Senior note · 🟠 Advanced"
    For fluid type, mix `rem` into the middle value (`1rem + 2vw`, not `4vw` alone). A pure `vw` value doesn't grow when the user zooms, which fails WCAG 1.4.4 (Resize Text). Tools like Utopia generate a full fluid type and space scale for you.
