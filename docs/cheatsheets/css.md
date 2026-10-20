# CSS Cheat Sheet

Core CSS on a few screens: syntax, selectors, the cascade, box model, display, positioning, text and backgrounds. CSS3 effects and modern features are on the [CSS3 & Modern CSS sheet](css3.md); units and functions are on [Units & Functions](units-functions.md).

## Syntax

```css
selector { property: value; }              /* rule */
.a, .b { }                                 /* group */
/* comment */
@media (width >= 48em) { .a { } }          /* at-rule */
.card { & h3 { } &:hover { } }             /* native nesting */
```

Ways to add CSS: `<link rel="stylesheet" href>` (best) · `<style>` in `<head>` · `style="…"` attribute · `@import url()` (avoid in production).

## Selectors

| Selector | Matches | Specificity |
|---|---|---|
| `*` | Everything | 0,0,0 |
| `p` | Type | 0,0,1 |
| `.card` | Class | 0,1,0 |
| `#nav` | ID | 1,0,0 |
| `[href]` | Has attribute | 0,1,0 |
| `[type="email"]` | Equals | 0,1,0 |
| `[class~="x"]` | Word in list | 0,1,0 |
| `[lang\|="en"]` | `en` or `en-…` | 0,1,0 |
| `[href^="https"]` | Starts with | 0,1,0 |
| `[href$=".pdf"]` | Ends with | 0,1,0 |
| `[href*="shop"]` | Contains | 0,1,0 |
| `[data-x="y" i]` | Case-insensitive | 0,1,0 |
| `a b` | `b` anywhere inside `a` | sum |
| `a > b` | `b` direct child of `a` | sum |
| `a + b` | `b` right after `a` | sum |
| `a ~ b` | Any `b` after `a` (siblings) | sum |
| `a.b` | `a` that also has class `b` | sum |
| `a, b` | Either | each separately |

### Pseudo-classes

| Group | Selectors |
|---|---|
| **User action** | `:hover` · `:active` · `:focus` · `:focus-visible` · `:focus-within` |
| **Links** | `:link` · `:visited` · `:any-link` · `:target` |
| **Structure** | `:first-child` · `:last-child` · `:only-child` · `:nth-child(2n+1)` · `:nth-child(odd/even)` · `:nth-child(-n+3)` · `:nth-last-child()` · `:nth-child(2 of .x)` · `:first-of-type` · `:last-of-type` · `:nth-of-type()` · `:only-of-type` · `:empty` · `:root` |
| **Form state** | `:checked` · `:indeterminate` · `:default` · `:disabled` · `:enabled` · `:required` · `:optional` · `:valid` · `:invalid` · `:user-valid` · `:user-invalid` · `:in-range` · `:out-of-range` · `:read-only` · `:read-write` · `:placeholder-shown` · `:autofill` |
| **Logic** | `:is(a, b)` (max specificity) · `:where(a, b)` (zero specificity) · `:not(a, b)` · `:has(> img)` |
| **Elements & state** | `:open` · `:popover-open` · `:modal` · `:fullscreen` · `:defined` · `:state(x)` · `:playing` · `:paused` |
| **Language** | `:lang(hi)` · `:dir(rtl)` |
| **Shadow DOM** | `:host` · `:host(.x)` · `:host-context(.x)` |

### Pseudo-elements

`::before` · `::after` (need `content`) · `::first-letter` · `::first-line` · `::marker` · `::placeholder` · `::selection` · `::file-selector-button` · `::backdrop` · `::details-content` · `::picker(select)` · `::part(x)` · `::slotted(x)` · `::cue` · `::view-transition-*` · `::scroll-marker` · `::scroll-button()`

### `:has()` patterns

```css
.card:has(img)            { }   /* parent that contains an image */
.field:has(:user-invalid) { }   /* wrapper of an invalid input */
h2:has(+ p)               { }   /* h2 directly followed by p */
html:has(dialog[open])    { overflow: hidden; }   /* lock scroll while a modal is open */
ul:has(> li:nth-child(6)) { columns: 2; }        /* list with 6+ items */
.grid:has(.card:hover) .card:not(:hover) { opacity: .5; }
```

## Cascade order (who wins)

1. **Origin & importance**: transitions → `!important` (user-agent > user > author) → animations → normal author → user → user-agent
2. **Context**: outer (light DOM) vs shadow DOM
3. **Inline `style=""`**
4. **Cascade layers**: later `@layer` wins (reversed for `!important`); unlayered beats all layers
5. **Specificity**: (IDs, classes/attributes/pseudo-classes, types/pseudo-elements)
6. **Order**: last declared wins

### Specificity examples

| Selector | Score |
|---|---|
| `li` | 0,0,1 |
| `ul li` | 0,0,2 |
| `.nav a` | 0,1,1 |
| `a:hover` | 0,1,1 |
| `.nav .item a:hover` | 0,3,1 |
| `#main .nav a` | 1,1,1 |
| `:is(#x, .y) a` | 1,0,1 |
| `:where(#x, .y) a` | 0,0,1 |

### Keywords for any property

`inherit` (parent's value) · `initial` (spec default) · `unset` (inherit if inheritable, else initial) · `revert` (browser default) · `revert-layer` (previous layer's value). `all: unset` resets everything.

### Inherited by default

`color` · `font` and all `font-*` · `line-height` · `letter-spacing` · `word-spacing` · `text-align` · `text-indent` · `text-transform` · `white-space` · `direction` · `visibility` · `cursor` · `list-style` · `quotes` · `color-scheme` · custom properties (`--x`). Box properties (`margin`, `padding`, `border`, `background`, `width`, `display`, `position`) are **not** inherited.

## Box model

```css
*, *::before, *::after { box-sizing: border-box; }   /* width includes padding + border */
```

| Shorthand | Means |
|---|---|
| `margin: 8px` | all sides |
| `margin: 8px 16px` | block (top/bottom) · inline (left/right) |
| `margin: 8px 16px 24px` | top · inline · bottom |
| `margin: 8px 16px 24px 32px` | top · right · bottom · left (clockwise) |
| `margin-inline: auto` | centre a block that has a width |
| `padding-block: 1rem` | top + bottom |
| `border: 1px solid #ddd` | width · style · colour |
| `border-radius: 8px` | all corners |
| `outline: 2px solid; outline-offset: 2px` | focus ring, doesn't affect layout |

Border styles: `solid` · `dashed` · `dotted` · `double` · `groove` · `ridge` · `inset` · `outset` · `none` · `hidden`.

### Sizing

| Property | Values |
|---|---|
| `width` / `inline-size` | `auto` · `200px` · `50%` · `fit-content` · `min-content` · `max-content` · `stretch` |
| `height` / `block-size` | same, plus `100dvh` |
| `min-*` / `max-*` | `max-inline-size: 65ch` · `min-block-size: 100dvh` |
| `aspect-ratio` | `16 / 9` · `1` |
| `overflow` | `visible` · `hidden` · `clip` · `auto` · `scroll` |
| `overflow-wrap` | `anywhere` · `break-word` |

### Logical ↔ physical

| Physical | Logical |
|---|---|
| `width` / `height` | `inline-size` / `block-size` |
| `margin-left` / `-right` | `margin-inline-start` / `-end` |
| `margin-top` / `-bottom` | `margin-block-start` / `-end` |
| `top` `right` `bottom` `left` | `inset-block-start` · `inset-inline-end` · `inset-block-end` · `inset-inline-start` |
| `text-align: left` | `text-align: start` |
| `border-top-left-radius` | `border-start-start-radius` |

## `display`

| Value | Behaviour |
|---|---|
| `block` | Own line, full width, width/height work |
| `inline` | In text flow; width/height and vertical margins ignored |
| `inline-block` | In text flow; width/height/margins work |
| `flex` / `inline-flex` | One-dimensional layout ([sheet](flexbox.md)) |
| `grid` / `inline-grid` | Two-dimensional layout ([sheet](grid.md)) |
| `flow-root` | Block that contains floats and stops margin collapse |
| `contents` | Box disappears; children promoted |
| `none` | Removed from layout and accessibility tree |
| `list-item` | Block with a marker |
| `table` · `table-row` · `table-cell` | Table layout without table tags |

| Hide with | Space kept | Clickable | Screen readers |
|---|---|---|---|
| `display: none` | ❌ | ❌ | ❌ |
| `visibility: hidden` | ✅ | ❌ | ❌ |
| `opacity: 0` | ✅ | ✅ | ✅ |
| `.visually-hidden` (clip pattern) | ❌ | ❌ | ✅ |
| `hidden` attribute | ❌ | ❌ | ❌ |
| `inert` attribute | ✅ | ❌ | ❌ |

## Positioning

| `position` | In flow | Relative to | Use |
|---|---|---|---|
| `static` | ✅ | — | Default |
| `relative` | ✅ | Itself | Nudge; anchor for absolute children |
| `absolute` | ❌ | Nearest positioned ancestor | Badges, overlays |
| `fixed` | ❌ | Viewport (unless an ancestor has `transform`/`filter`) | Floating buttons, bars |
| `sticky` | ✅ | Nearest scroll container, after reaching `top` | Headers, table heads, TOCs |

```css
.overlay   { position: absolute; inset: 0; }
.corner    { position: absolute; inset: auto 1rem 1rem auto; }
.center    { position: absolute; top: 50%; left: 50%; translate: -50% -50%; }
.stick     { position: sticky; top: 0; }
.isolate   { isolation: isolate; }   /* new stacking context, contains z-index */
```

**Stacking contexts** are created by: `position` + `z-index`, `position: fixed/sticky`, `opacity < 1`, `transform`, `filter`, `backdrop-filter`, `clip-path`, `mask`, `mix-blend-mode`, `isolation: isolate`, `contain: paint`, `container-type`, `will-change`. `z-index` only competes **inside** the same context.

Float (text wrap only): `float: inline-start` · `clear: both` · `shape-outside: circle()`.

## Typography

| Property | Common values |
|---|---|
| `font-family` | `system-ui, sans-serif` · `Georgia, serif` · `ui-monospace, monospace` |
| `font-size` | `1rem` · `clamp(1rem, .9rem + .5vw, 1.25rem)` |
| `font-weight` | `100`–`900` · `normal` (400) · `bold` (700) |
| `font-style` | `normal` · `italic` · `oblique` |
| `line-height` | `1.5` (unitless) |
| `font` | `italic 600 1rem/1.5 system-ui` |
| `letter-spacing` · `word-spacing` | `.05em` |
| `text-align` | `start` · `center` · `end` · `justify` |
| `text-transform` | `uppercase` · `lowercase` · `capitalize` |
| `text-decoration` | `underline wavy red 2px` · `none` · `line-through` |
| `text-underline-offset` | `.2em` |
| `text-indent` | `2em` |
| `text-shadow` | `0 1px 2px rgb(0 0 0 / .4)` |
| `text-overflow` | `ellipsis` (with `overflow: hidden; white-space: nowrap`) |
| `line-clamp` · `-webkit-line-clamp` | `3` |
| `text-wrap` | `wrap` · `nowrap` · `balance` · `pretty` |
| `white-space` | `normal` · `nowrap` · `pre` · `pre-wrap` · `pre-line` |
| `word-break` | `normal` · `break-all` · `keep-all` |
| `hyphens` | `auto` (needs `lang`) |
| `font-variant-numeric` | `tabular-nums` · `oldstyle-nums` · `slashed-zero` |
| `font-feature-settings` | `"liga" 1, "ss01" 1` |
| `font-variation-settings` | `"wght" 650` |
| `writing-mode` | `horizontal-tb` · `vertical-rl` |
| `vertical-align` | `baseline` · `middle` · `top` · `sub` (inline/table cells only) |

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}
```

## Colour & backgrounds

| Property | Example |
|---|---|
| `color` | `#e4572e` · `rgb(228 87 46 / .8)` · `oklch(64% .19 37)` · `currentColor` |
| `background-color` | `white` |
| `background-image` | `url(a.jpg)` · `linear-gradient(…)` (comma-separate several; first is on top) |
| `background-size` | `cover` · `contain` · `100% auto` |
| `background-position` | `center` · `top right` · `50% 20%` |
| `background-repeat` | `no-repeat` · `repeat-x` · `space` · `round` |
| `background-attachment` | `scroll` · `fixed` · `local` |
| `background-clip` | `border-box` · `padding-box` · `content-box` · `text` |
| `background` | `url(a.jpg) center / cover no-repeat, #222` |
| `opacity` | `0`–`1` |
| `accent-color` | brand colour for checkbox/radio/range/progress |
| `color-scheme` | `light dark` |

## Lists, tables, cursor & misc

| Property | Values |
|---|---|
| `list-style` | `none` · `disc` · `decimal` · `"✓ "` · `inside` · `outside` |
| `counter-reset` · `counter-increment` · `content: counter(x)` | Automatic numbering |
| `border-collapse` | `collapse` · `separate` |
| `border-spacing` | `4px` |
| `table-layout` | `auto` · `fixed` |
| `caption-side` | `top` · `bottom` |
| `cursor` | `pointer` · `default` · `text` · `move` · `grab` · `not-allowed` · `wait` · `help` · `zoom-in` |
| `pointer-events` | `none` · `auto` |
| `user-select` | `none` · `text` · `all` |
| `resize` | `none` · `both` · `vertical` |
| `content` | `""` · `"→"` · `attr(data-x)` · `counter(n)` · `"★" / ""` (alt text) |
| `object-fit` | `cover` · `contain` · `fill` · `none` · `scale-down` |
| `object-position` | `center` · `top` |

## At-rules

| At-rule | Use |
|---|---|
| `@media (width >= 48em) { }` | Viewport conditions |
| `@container card (width > 30rem) { }` | Container conditions |
| `@supports (display: grid) { }` · `@supports selector(:has(a))` | Feature detection |
| `@layer reset, base, components, utilities;` | Cascade layer order |
| `@scope (.card) to (.content) { }` | Scoped styles |
| `@import url(x.css) layer(vendor);` | Import (avoid in production) |
| `@font-face { }` | Web fonts |
| `@keyframes name { }` | Animation steps |
| `@property --x { syntax: "<color>"; inherits: false; initial-value: red; }` | Typed custom property |
| `@starting-style { }` | Entry transition start values |
| `@view-transition { navigation: auto; }` | Cross-page transitions |
| `@page { size: A4; margin: 2cm; }` | Print page setup |
| `@counter-style` | Custom list markers |
| `@position-try --name { }` | Anchor-positioning fallbacks |
| `@namespace` | XML namespaces |
| `@charset "utf-8";` | Stylesheet encoding (first line) |

## Modern reset (copy-paste)

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { color-scheme: light dark; -webkit-text-size-adjust: none; text-size-adjust: none; }
body { min-block-size: 100dvh; line-height: 1.5; font-family: system-ui, sans-serif; }
img, picture, video, canvas, svg { display: block; max-inline-size: 100%; height: auto; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
:focus-visible { outline: 3px solid; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```
