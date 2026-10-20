# Positioning & Stacking

## `position` <span class="lvl lvl-1">Beginner</span> { #position data-toc-label="position" }

| Value | Stays in flow? | Positioned relative to | Typical use |
|---|---|---|---|
| `static` (default) | ✅ | — (`top`/`left` ignored) | Everything |
| `relative` | ✅ (space kept) | Its own normal position | Nudge; make a containing block for absolute children |
| `absolute` | ❌ | Nearest **positioned** ancestor (non-static) | Badges, overlays, dropdowns |
| `fixed` | ❌ | The viewport* | Sticky headers, chat buttons, toasts |
| `sticky` | ✅ | Scrolls normally until it hits an offset in its scroll container, then sticks | Table headers, section titles, sidebars |

\* Unless an ancestor has `transform`, `filter`, `perspective`, `contain: paint` or `will-change: transform`. Then that ancestor becomes the containing block, a classic "my fixed element scrolls!" bug.

```html
<div class="parent">            <!-- position: relative -->
  <span class="badge">3</span>  <!-- position: absolute; top: -8px; right: -8px -->
  Inbox
</div>
```

<div class="demo">
<div style="position:relative;display:inline-block;padding:.7em 1.2em;border:1px solid #c9ced6;border-radius:8px">Inbox
  <span style="position:absolute;top:-8px;right:-8px;background:#e4572e;color:#fff;font:700 12px/22px system-ui;min-width:22px;text-align:center;border-radius:11px">3</span>
</div>
</div>

### Offsets with `inset` <span class="lvl lvl-1">Beginner</span> { #offsets-with-inset data-toc-label="Offsets with inset" }

```css
.overlay { position: absolute; inset: 0; }          /* top:0; right:0; bottom:0; left:0 */
.corner  { position: absolute; inset: auto 1rem 1rem auto; }   /* bottom-right */
.bar     { position: fixed; inset-inline: 0; inset-block-end: 0; }  /* full-width bottom bar */
```

### `sticky` <span class="lvl lvl-2">Intermediate</span> { #sticky data-toc-label="sticky" }

```css
.section-title { position: sticky; top: 0; background: white; }
```

Scroll inside the box:

<div class="demo">
<div style="height:180px;overflow:auto;border:1px solid #c9ced6;border-radius:8px">
  <h4 style="position:sticky;top:0;margin:0;padding:.5em;background:#e4572e;color:#fff">A — sticky</h4>
  <p style="margin:.5em">Apple</p><p style="margin:.5em">Apricot</p><p style="margin:.5em">Avocado</p>
  <h4 style="position:sticky;top:0;margin:0;padding:.5em;background:#3f51b5;color:#fff">B — sticky</h4>
  <p style="margin:.5em">Banana</p><p style="margin:.5em">Blackberry</p><p style="margin:.5em">Blueberry</p>
  <h4 style="position:sticky;top:0;margin:0;padding:.5em;background:#2e9d4f;color:#fff">C — sticky</h4>
  <p style="margin:.5em">Cherry</p><p style="margin:.5em">Coconut</p><p style="margin:.5em">Cranberry</p>
</div>
</div>

!!! warning "Why isn't my `sticky` sticking?"
    1. You forgot an offset (`top: 0`).
    2. An ancestor has `overflow: hidden | auto | scroll`. Sticky sticks within the **nearest scrolling ancestor**. Use `overflow: clip` if you just need clipping.
    3. The parent is exactly as tall as the sticky element, so there's no room to stick.
    4. In a flex/grid container, the item is stretched to full height. Add `align-self: start`.

## `z-index` and stacking contexts <span class="lvl lvl-2">Intermediate</span> → <span class="lvl lvl-3">Advanced</span> { #z-index-and-stacking-contexts data-toc-label="z-index and stacking contexts" }

`z-index` controls which overlapping element is on top. It applies to positioned elements and to flex/grid items.

The catch: **`z-index` only competes within the same stacking context.** A child with `z-index: 9999` can never escape a parent whose stacking context is below a sibling.

```html
<div class="a" style="position:relative; z-index:1">
  A (z 1)
  <div style="position:absolute; z-index:9999">child of A (z 9999)</div>
</div>
<div class="b" style="position:relative; z-index:2">B (z 2): on top of A's child!</div>
```

<div class="demo">
<div style="position:relative;height:150px">
  <div style="position:absolute;left:0;top:0;width:200px;height:110px;background:var(--box-a);z-index:1;padding:.5em;border-radius:8px">A (z-index 1)
    <div style="position:absolute;left:120px;top:50px;width:170px;height:80px;background:var(--box-d);z-index:9999;padding:.5em;border-radius:8px">child of A (9999)</div>
  </div>
  <div style="position:absolute;left:160px;top:30px;width:200px;height:110px;background:var(--box-b);z-index:2;padding:.5em;border-radius:8px;opacity:.95">B (z-index 2): still on top of A's child</div>
</div>
</div>

**What creates a stacking context:**

- The root `<html>`
- `position: absolute | relative` **with** a `z-index` other than `auto`
- `position: fixed | sticky` (always)
- Flex/grid items with a `z-index`
- `opacity` < 1
- `transform`, `scale`, `rotate`, `translate`, `filter`, `backdrop-filter`, `perspective`, `clip-path`, `mask` (any non-none value)
- `mix-blend-mode` other than `normal`
- `isolation: isolate` (the clean, intentional way)
- `contain: layout | paint`, `container-type: size | inline-size`
- `will-change` naming any of the above
- Top-layer elements (`dialog`, popovers, fullscreen) sit above **everything**, no z-index needed

!!! tip "Senior note · 🟠 Advanced"
    Define a z-index scale as tokens (`--z-dropdown: 100; --z-sticky: 200; --z-modal: 300; --z-toast: 400`) and use `isolation: isolate` on components to contain their internal z-indexes. Better yet, move modals, menus and toasts to the top layer with `<dialog>` and `popover`; then z-index wars mostly disappear.

## `overflow` <span class="lvl lvl-1">Beginner</span> { #overflow data-toc-label="overflow" }

```css
overflow: visible;   /* default: content spills out */
overflow: hidden;    /* clip, still programmatically scrollable; creates a scroll container */
overflow: clip;      /* clip, NOT a scroll container (sticky keeps working) */
overflow: scroll;    /* always show scrollbars */
overflow: auto;      /* scrollbars only when needed */
overflow-x: auto; overflow-y: hidden;
scrollbar-gutter: stable;        /* reserve space so content doesn't jump */
scrollbar-width: thin;
scrollbar-color: #e4572e transparent;
overscroll-behavior: contain;    /* stop scroll chaining from modals to the page */
```

### Scroll snap <span class="lvl lvl-2">Intermediate</span> { #scroll-snap data-toc-label="Scroll snap" }

```css
.carousel {
  display: flex; gap: 1rem; overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 1rem;
}
.carousel > * { flex: 0 0 80%; scroll-snap-align: center; }
```

<div class="demo">
<div style="display:flex;gap:1em;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:.5em">
  <div class="b" style="flex:0 0 70%;scroll-snap-align:center;height:90px;display:grid;place-items:center">Slide 1 (swipe / scroll →)</div>
  <div class="b" style="flex:0 0 70%;scroll-snap-align:center;height:90px;display:grid;place-items:center">Slide 2</div>
  <div class="b" style="flex:0 0 70%;scroll-snap-align:center;height:90px;display:grid;place-items:center">Slide 3</div>
  <div class="b" style="flex:0 0 70%;scroll-snap-align:center;height:90px;display:grid;place-items:center">Slide 4</div>
</div>
</div>

## `float` and `clear` (legacy) <span class="lvl lvl-2">Intermediate</span> { #float-and-clear-legacy data-toc-label="float and clear (legacy)" }

Floats were built for wrapping text around images. For about a decade they were also abused for page layouts. Today use them **only** for text wrap.

```css
.avatar { float: inline-start; margin: 0 1rem .5rem 0; shape-outside: circle(); }
.after-floats { clear: both; }
```

<div class="demo">
<div style="width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#e4572e,#f3a712);float:left;margin:0 1em .5em 0;shape-outside:circle()"></div>
<p style="margin:0">Text flows around the floated circle. Because of <code>shape-outside: circle()</code>, the lines follow the curve instead of the square box. This is the one job floats are still the best tool for: magazine-style text wrapping around images and pull quotes. For anything else, reach for Flexbox or Grid.</p>
<div style="clear:both"></div>
</div>

## Centering an absolutely positioned element <span class="lvl lvl-1">Beginner</span> { #centering-an-absolutely-positioned-element data-toc-label="Centering an absolutely positioned element" }

```css
/* Modern */
.center { position: absolute; inset: 0; margin: auto; width: fit-content; height: fit-content; }

/* Classic */
.center { position: absolute; top: 50%; left: 50%; translate: -50% -50%; }
```

More centering techniques: [Layout Patterns → Centering](../layout/patterns.md#centering).
