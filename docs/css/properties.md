# CSS Property Cheat Sheet

The properties you'll use in real projects, grouped by job. **Inh.** = inherited by children by default.

## Box & sizing

| Property | Common values | What it does | Inh. |
|---|---|---|---|
| `display` | `block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `contents`, `flow-root` | Box type and layout mode | ❌ |
| `box-sizing` | `content-box`, `border-box` | What `width` includes | ❌ |
| `width` / `inline-size` | `auto`, `200px`, `50%`, `fit-content`, `min-content`, `max-content`, `stretch` | Width | ❌ |
| `height` / `block-size` | as above, `100dvh` | Height | ❌ |
| `min-width`, `max-width` (+ logical) | `0`, `100%`, `65ch` | Size limits | ❌ |
| `aspect-ratio` | `16 / 9`, `1` | Preferred ratio | ❌ |
| `margin` (+ `-block`, `-inline`) | `0`, `1rem`, `auto` | Outer spacing | ❌ |
| `padding` (+ `-block`, `-inline`) | `1rem 2rem` | Inner spacing | ❌ |
| `border` | `1px solid #ccc` | Border | ❌ |
| `border-radius` | `8px`, `50%` | Rounded corners | ❌ |
| `outline`, `outline-offset` | `2px solid`, `2px` | Focus ring, doesn't affect layout | ❌ |
| `overflow` (`-x`, `-y`) | `visible`, `hidden`, `clip`, `auto`, `scroll` | Overflowing content | ❌ |
| `box-shadow` | `0 2px 8px #0003` | Shadow | ❌ |
| `contain` | `layout`, `paint`, `content`, `strict` | Isolate for performance | ❌ |
| `content-visibility` | `auto`, `hidden` | Skip rendering off-screen | ❌ |

## Positioning

| Property | Common values | What it does | Inh. |
|---|---|---|---|
| `position` | `static`, `relative`, `absolute`, `fixed`, `sticky` | Positioning scheme | ❌ |
| `inset` / `top` `right` `bottom` `left` | `0`, `auto`, `1rem` | Offsets | ❌ |
| `z-index` | `auto`, `1`, `10` | Stack order | ❌ |
| `isolation` | `isolate` | New stacking context | ❌ |
| `float`, `clear` | `inline-start`, `both` | Text wrap around | ❌ |
| `anchor-name`, `position-anchor`, `position-area` | `--x`, `top` | Anchor positioning | ❌ |

## Flexbox (container → items)

| Property | Values | Inh. |
|---|---|---|
| `flex-direction` | `row`, `row-reverse`, `column`, `column-reverse` | ❌ |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` | ❌ |
| `flex-flow` | shorthand: direction + wrap | ❌ |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | ❌ |
| `align-items` | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` | ❌ |
| `align-content` | as justify-content + `stretch` | ❌ |
| `gap`, `row-gap`, `column-gap` | `1rem` | ❌ |
| `flex` (item) | `1`, `auto`, `none`, `0 0 200px` | ❌ |
| `flex-grow`, `flex-shrink`, `flex-basis` | `1`, `0`, `auto`/`200px` | ❌ |
| `align-self` (item) | as align-items | ❌ |
| `order` (item) | `-1`, `0`, `1` | ❌ |

Full reference with live output: [Flexbox](../layout/flexbox.md).

## Grid

| Property | Values | Inh. |
|---|---|---|
| `grid-template-columns` / `-rows` | `1fr 2fr`, `repeat(3, 1fr)`, `repeat(auto-fit, minmax(200px, 1fr))`, `subgrid` | ❌ |
| `grid-template-areas` | `"head head" "side main"` | ❌ |
| `grid-template` | shorthand | ❌ |
| `grid-auto-rows` / `-columns` | `minmax(100px, auto)` | ❌ |
| `grid-auto-flow` | `row`, `column`, `dense` | ❌ |
| `grid-column` / `grid-row` (item) | `1 / 3`, `span 2`, `1 / -1` | ❌ |
| `grid-area` (item) | `main`, `1 / 1 / 3 / 3` | ❌ |
| `justify-items` / `justify-self` | `start`, `center`, `end`, `stretch` | ❌ |
| `place-items` / `place-content` / `place-self` | shorthands: `center` | ❌ |

Full reference: [Grid](../layout/grid.md).

## Typography

| Property | Common values | Inh. |
|---|---|---|
| `font-family` | `system-ui, sans-serif` | ✅ |
| `font-size` | `1rem`, `clamp(…)` | ✅ |
| `font-weight` | `400`, `700` | ✅ |
| `font-style` | `normal`, `italic` | ✅ |
| `font` | shorthand | ✅ |
| `line-height` | `1.5` | ✅ |
| `letter-spacing`, `word-spacing` | `0.05em` | ✅ |
| `color` | any colour | ✅ |
| `text-align` | `start`, `center`, `end`, `justify` | ✅ |
| `text-decoration` | `underline`, `none`, `line-through` | ❌ |
| `text-underline-offset` | `.2em` | ✅ |
| `text-transform` | `uppercase`, `capitalize` | ✅ |
| `text-indent` | `2em` | ✅ |
| `text-shadow` | `0 1px 2px #0005` | ✅ |
| `text-overflow` | `ellipsis` | ❌ |
| `text-wrap` | `wrap`, `nowrap`, `balance`, `pretty` | ✅ |
| `white-space` | `normal`, `nowrap`, `pre`, `pre-wrap` | ✅ |
| `overflow-wrap`, `word-break` | `anywhere`, `break-word` / `break-all`, `keep-all` | ✅ |
| `hyphens` | `auto`, `manual` | ✅ |
| `line-clamp` / `-webkit-line-clamp` | `3` | ❌ |
| `font-variant-numeric` | `tabular-nums`, `oldstyle-nums` | ✅ |
| `writing-mode` | `horizontal-tb`, `vertical-rl` | ✅ |
| `direction` | `ltr`, `rtl` (prefer the HTML `dir` attribute) | ✅ |
| `vertical-align` | `middle`, `baseline`, `top` (inline & table cells) | ❌ |
| `list-style` | `none`, `disc inside` | ✅ |

## Colour & backgrounds

| Property | Common values | Inh. |
|---|---|---|
| `background-color` | colour | ❌ |
| `background-image` | `url()`, `linear-gradient()` | ❌ |
| `background-size` | `cover`, `contain`, `100% auto` | ❌ |
| `background-position` | `center`, `top right` | ❌ |
| `background-repeat` | `no-repeat`, `repeat-x` | ❌ |
| `background-attachment` | `scroll`, `fixed`, `local` | ❌ |
| `background-clip` | `border-box`, `padding-box`, `text` | ❌ |
| `background` | shorthand | ❌ |
| `opacity` | `0`–`1` | ❌ |
| `color-scheme` | `light dark` | ✅ |
| `accent-color` | colour | ✅ |
| `caret-color` | colour | ✅ |

## Effects

| Property | Common values | Inh. |
|---|---|---|
| `filter` | `blur(4px)`, `grayscale(1)`, `drop-shadow(…)` | ❌ |
| `backdrop-filter` | `blur(10px)` | ❌ |
| `mix-blend-mode` | `multiply`, `screen`, `overlay` | ❌ |
| `background-blend-mode` | as above | ❌ |
| `clip-path` | `circle()`, `polygon()`, `inset()` | ❌ |
| `mask` / `mask-image` | gradient, `url()` | ❌ |
| `object-fit`, `object-position` | `cover`, `contain` / `center` | ❌ |
| `image-rendering` | `pixelated`, `crisp-edges` | ✅ |

## Transforms & motion

| Property | Common values | Inh. |
|---|---|---|
| `transform` | `translate()`, `rotate()`, `scale()`, `skew()`, `matrix()` | ❌ |
| `translate`, `rotate`, `scale` | individual transforms | ❌ |
| `transform-origin` | `center`, `top left` | ❌ |
| `perspective`, `transform-style`, `backface-visibility` | 3D | ❌ |
| `transition` | `opacity .2s ease` | ❌ |
| `transition-behavior` | `allow-discrete` | ❌ |
| `animation` | `spin 1s linear infinite` | ❌ |
| `animation-timeline`, `animation-range` | `scroll()`, `view()` | ❌ |
| `view-transition-name` | `hero` | ❌ |
| `will-change` | `transform` | ❌ |
| `offset-path`, `offset-distance` | Motion along a path | ❌ |

## Interaction

| Property | Common values | Inh. |
|---|---|---|
| `cursor` | `pointer`, `not-allowed`, `grab`, `text` | ✅ |
| `pointer-events` | `none`, `auto` | ✅ |
| `user-select` | `none`, `text`, `all` | ❌ |
| `touch-action` | `manipulation`, `pan-y`, `none` | ❌ |
| `scroll-behavior` | `smooth` | ❌ |
| `scroll-snap-type`, `scroll-snap-align` | `x mandatory` / `start` | ❌ |
| `scroll-margin`, `scroll-padding` | `4rem` (offset for sticky headers) | ❌ |
| `overscroll-behavior` | `contain`, `none` | ❌ |
| `scrollbar-width`, `scrollbar-color`, `scrollbar-gutter` | `thin` / colours / `stable` | ✅ / ✅ / ❌ |
| `resize` | `both`, `vertical`, `none` | ❌ |
| `appearance` | `none`, `auto`, `base-select` | ❌ |
| `visibility` | `visible`, `hidden`, `collapse` | ✅ |

## Containers & generated content

| Property | Common values | Inh. |
|---|---|---|
| `container-type` | `inline-size`, `size`, `normal` | ❌ |
| `container-name` / `container` | `card` / `card / inline-size` | ❌ |
| `content` | `""`, `"→"`, `attr(data-label)`, `counter(n)` | ❌ |
| `counter-reset`, `counter-increment` | `section` | ❌ |
| `quotes` | `"«" "»"` | ✅ |
| `columns`, `column-gap`, `column-rule` | `3 200px`, `2rem` | ❌ |
| `break-inside` | `avoid` | ❌ |

## At-rules

| At-rule | Use |
|---|---|
| `@media` | Viewport / device conditions |
| `@container` | Container size / style conditions |
| `@supports` | Feature detection |
| `@layer` | Cascade layers |
| `@scope` | Scoped styles |
| `@import` | Import a stylesheet (avoid in production: it's serial) |
| `@font-face` | Load fonts |
| `@keyframes` | Animation steps |
| `@property` | Register typed custom properties |
| `@starting-style` | Entry transition start values |
| `@view-transition` | Opt in to cross-document view transitions |
| `@page` | Print page size and margins |
| `@counter-style` | Custom list markers |
| `@namespace` | XML namespaces (SVG/MathML in CSS) |
| `@position-try` | Custom anchor-positioning fallbacks |
