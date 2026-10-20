# Units, Colours & Functions Cheat Sheet

## Length units

| Unit | Relative to | Use it for |
|---|---|---|
| `px` | CSS pixel (1/96 in) | Borders, shadows, hairlines |
| `rem` | Root font size (16px default) | **Font sizes, spacing, breakpoints** |
| `em` | Element's font size | Padding that scales with its own text (buttons, badges) |
| `%` | Parent (width), or self (`translate`) | Fluid widths |
| `ch` | Width of "0" | Line length: `max-width: 65ch` |
| `ex` · `cap` | x-height · cap height | Fine icon/text alignment |
| `lh` · `rlh` | Line height of element · root | Vertical rhythm |
| `vw` · `vh` | 1% of viewport width · height | Full-bleed, hero sizes |
| `vmin` · `vmax` | Smaller · larger viewport side | Square-ish sizing |
| `svh` · `lvh` · `dvh` | Small · large · dynamic viewport height | `min-height: 100svh` / `100dvh` on mobile |
| `vi` · `vb` | Viewport inline · block size | Writing-mode-aware |
| `cqw` · `cqh` · `cqi` · `cqb` · `cqmin` · `cqmax` | 1% of the nearest size container | Component-relative type and spacing |
| `fr` | Share of free space in a grid | Grid tracks |
| `pt` · `cm` · `mm` · `in` | Physical | Print only |

## Other units

| Type | Units |
|---|---|
| Angle | `deg` · `turn` · `rad` · `grad` |
| Time | `s` · `ms` |
| Resolution | `dppx` · `x` · `dpi` |
| Frequency | `Hz` · `kHz` (rare) |

## Colour formats

| Format | Example | Notes |
|---|---|---|
| Named | `tomato` | 148 names |
| Hex | `#e4572e` · `#e4572e80` (alpha) · `#e52` | |
| `rgb()` | `rgb(228 87 46)` · `rgb(228 87 46 / 50%)` | Modern space syntax; `rgba()` is an alias |
| `hsl()` | `hsl(14 77% 54%)` | Hue · saturation · lightness |
| `hwb()` | `hwb(14 18% 11%)` | Hue · whiteness · blackness |
| `lab()` · `lch()` | `lch(56% 73 44)` | Perceptual |
| `oklab()` · `oklch()` | `oklch(64% 0.19 37)` | **Best for palettes**: even lightness across hues |
| `color()` | `color(display-p3 0.9 0.35 0.2)` | Wide gamut |
| `color-mix()` | `color-mix(in oklch, var(--a), white 30%)` | Tints, shades, transparency |
| Relative | `oklch(from var(--a) calc(l - .1) c h)` · `rgb(from red r g b / 50%)` | Adjust one channel |
| `light-dark()` | `light-dark(#fff, #121417)` | Follows `color-scheme` |
| Keywords | `currentColor` · `transparent` · `inherit` | |
| System colours | `Canvas` · `CanvasText` · `LinkText` · `ButtonFace` · `ButtonText` · `Highlight` · `GrayText` | Forced-colours mode |

## Contrast targets (WCAG 2.2)

| Content | AA | AAA |
|---|---|---|
| Body text | 4.5 : 1 | 7 : 1 |
| Large text (24px, or 18.66px bold) | 3 : 1 | 4.5 : 1 |
| UI components, icons, focus rings | 3 : 1 | — |

## Maths functions

| Function | Example | Result |
|---|---|---|
| `calc()` | `calc(100% - 2rem)` | Mix units |
| `min()` | `width: min(100%, 60rem)` | The smaller value ("max 60rem") |
| `max()` | `font-size: max(1rem, 2vw)` | The larger value ("at least 1rem") |
| `clamp()` | `clamp(1rem, .8rem + 1vw, 1.5rem)` | min · preferred · max |
| `round()` | `round(up, 13px, 4px)` | 16px |
| `mod()` · `rem()` | `mod(-7, 3)` | 2 |
| `abs()` · `sign()` | `abs(-4px)` | 4px |
| `pow()` · `sqrt()` · `hypot()` · `exp()` · `log()` | `pow(1.25, 3)` | 1.953 (type scales) |
| `sin()` · `cos()` · `tan()` · `asin()` · `acos()` · `atan()` · `atan2()` | `calc(cos(45deg) * 100px)` | Circular layouts |

## Fluid formulas

```css
/* Fluid font size between 16px (at 320px wide) and 20px (at 1280px wide) */
font-size: clamp(1rem, 0.9167rem + 0.4167vw, 1.25rem);

/* Generic: slope = (max - min) / (maxVw - minVw); intercept = min - slope * minVw */
/* preferred = intercept(rem) + slope*100 (vw) */

/* Content width with a gutter, no media queries */
width: min(100% - 2rem, 70rem);
margin-inline: auto;

/* Responsive grid track that never overflows */
grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
```

## Other functions

| Function | Use |
|---|---|
| `var(--x, fallback)` | Read a custom property |
| `env(safe-area-inset-bottom)` | Device safe areas (notch, home bar) |
| `attr(data-label)` | Attribute value in `content` |
| `counter(n)` · `counters(n, ".")` | Automatic numbering |
| `url()` | Images, fonts |
| `image-set("a.avif" type("image/avif"), "a.jpg" type("image/jpeg"))` | Responsive background images |
| `linear-gradient()` · `radial-gradient()` · `conic-gradient()` · `repeating-*` | Gradients |
| `cubic-bezier()` · `steps()` · `linear()` | Easing curves |
| `scroll()` · `view()` | Scroll-driven animation timelines |
| `anchor()` · `anchor-size()` | Anchor positioning |
| `minmax()` · `repeat()` · `fit-content()` | Grid tracks |
| `blur()` · `brightness()` · `contrast()` · `drop-shadow()` · `grayscale()` · `hue-rotate()` · `invert()` · `opacity()` · `saturate()` · `sepia()` | Filters |
| `circle()` · `ellipse()` · `inset()` · `polygon()` · `path()` · `shape()` | Shapes for `clip-path` / `shape-outside` |
| `translate()` · `rotate()` · `scale()` · `skew()` · `matrix()` · `perspective()` | Transforms |

## Easing presets

| Name | `cubic-bezier` | Feels like |
|---|---|---|
| `ease` | `(.25, .1, .25, 1)` | Default |
| `ease-in` | `(.42, 0, 1, 1)` | Starts slow: use for **exits** |
| `ease-out` | `(0, 0, .58, 1)` | Ends slow: use for **entrances** |
| `ease-in-out` | `(.42, 0, .58, 1)` | Symmetric |
| "Back out" (overshoot) | `(.34, 1.56, .64, 1)` | Playful pop |
| "Expo out" | `(.16, 1, .3, 1)` | Snappy, premium |
| Bounce | `linear(0, .5 15%, 1 30%, .8 45%, 1 60%, .95 75%, 1)` | Bouncy settle |

## Duration guide

| Interaction | Duration |
|---|---|
| Hover, colour change | 100–150ms |
| Button press, toggle | 150–200ms |
| Dropdown, tooltip | 150–250ms |
| Modal, drawer | 200–350ms |
| Page transition | 250–400ms |
| Anything longer than 500ms | Feels slow for UI feedback |
