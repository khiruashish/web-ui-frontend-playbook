# CSS Grid (complete reference)

Grid lays items out in **rows and columns at the same time**. In every demo, the dashed orange box is the **grid container** and the coloured boxes are **grid items**.

## Vocabulary <span class="lvl lvl-1">Beginner</span> { #vocabulary data-toc-label="Vocabulary" }

| Term | Meaning |
|---|---|
| **Grid line** | The dividing lines, numbered from 1 (and from -1 at the end) |
| **Track** | A row or a column (the space between two lines) |
| **Cell** | One row × one column |
| **Area** | A rectangle of one or more cells |
| **Gap / gutter** | Space between tracks |
| **Explicit grid** | Tracks you define with `grid-template-*` |
| **Implicit grid** | Tracks the browser creates when items don't fit (`grid-auto-*`) |

## `display: grid` + columns <span class="lvl lvl-1">Beginner</span> { #display-grid-columns data-toc-label="display: grid + columns" }

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  gap: 1rem;
}
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:120px 1fr 2fr"><div class="b">120px</div><div class="b">1fr</div><div class="b">2fr</div><div class="b">120px</div><div class="b">1fr</div><div class="b">2fr</div></div>
</div>

### The `fr` unit <span class="lvl lvl-1">Beginner</span> { #the-fr-unit data-toc-label="The fr unit" }

`fr` = a fraction of the **free space** left after fixed tracks and gaps. `1fr 2fr` splits leftovers 1:2.

!!! note "`1fr` is really `minmax(auto, 1fr)`"
    A `1fr` column won't shrink below its content's minimum width, the same "won't shrink" behaviour as flex items. If a long word or a wide table blows out your grid, use `minmax(0, 1fr)`.

### `repeat()` <span class="lvl lvl-1">Beginner</span> { #repeat data-toc-label="repeat()" }

```css
grid-template-columns: repeat(4, 1fr);              /* 4 equal columns */
grid-template-columns: repeat(2, 100px 1fr);        /* 100px 1fr 100px 1fr */
grid-template-columns: 250px repeat(3, 1fr);        /* sidebar + 3 equal */
grid-template-columns: repeat(12, minmax(0, 1fr));  /* 12-column system */
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:repeat(4,1fr)"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div><div class="b">6</div><div class="b">7</div><div class="b">8</div></div>
</div>

### `minmax()` <span class="lvl lvl-2">Intermediate</span> { #minmax data-toc-label="minmax()" }

```css
grid-template-columns: minmax(150px, 300px) 1fr;  /* first col between 150 and 300px */
grid-auto-rows: minmax(80px, auto);               /* rows at least 80px, grow with content */
```

## `auto-fill` vs `auto-fit`: responsive with zero media queries <span class="lvl lvl-1">Beginner</span> { #auto-fill-vs-auto-fit-responsive-with-zero-media-queries data-toc-label="auto-fill vs auto-fit: responsive with zero media queries" }

The single most useful line of CSS layout ("RAM": Repeat, Auto, Minmax):

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 1rem;
}
```

"Fit as many columns as possible, each at least 200px, then stretch them to fill the row." The `min(200px, 100%)` stops overflow on screens narrower than 200px.

<div class="demo">
<code>auto-fill</code>: keeps empty column slots
<div class="c" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr))"><div class="b">1</div><div class="b">2</div></div>
<br><code>auto-fit</code>: collapses empty slots, items stretch
<div class="c" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))"><div class="b">1</div><div class="b">2</div></div>
</div>

With **few items**, `auto-fill` leaves empty columns and `auto-fit` stretches the items. With **many items**, they behave the same.

## Rows <span class="lvl lvl-1">Beginner</span> { #rows data-toc-label="Rows" }

```css
grid-template-rows: 80px auto 60px;   /* explicit rows */
grid-auto-rows: 100px;                /* size for any extra (implicit) rows */
grid-auto-rows: minmax(100px, auto);
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:40px 80px;grid-auto-rows:30px"><div class="b">row 1 (40px)</div><div class="b">1</div><div class="b">1</div><div class="b">row 2 (80px)</div><div class="b">2</div><div class="b">2</div><div class="b">implicit (30px)</div><div class="b">3</div><div class="b">3</div></div>
</div>

## Placing items by line number <span class="lvl lvl-1">Beginner</span> { #placing-items-by-line-number data-toc-label="Placing items by line number" }

```css
.hero   { grid-column: 1 / 4; }       /* from line 1 to line 4 = 3 columns */
.wide   { grid-column: span 2; }      /* span 2 columns from wherever it lands */
.full   { grid-column: 1 / -1; }      /* first line to last line = full width */
.tall   { grid-row: 1 / 3; }          /* 2 rows */
.box    { grid-area: 2 / 1 / 4 / 3; } /* row-start / col-start / row-end / col-end */
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:50px">
  <div class="b" style="grid-column:1 / -1">1 / -1 (full width)</div>
  <div class="b" style="grid-row:span 2">span 2 rows</div>
  <div class="b" style="grid-column:span 2">span 2 cols</div>
  <div class="b">·</div>
  <div class="b">·</div>
  <div class="b">·</div>
  <div class="b">·</div>
</div>
</div>

## `grid-template-areas`: draw your layout <span class="lvl lvl-1">Beginner</span> { #grid-template-areas-draw-your-layout data-toc-label="grid-template-areas: draw your layout" }

Name areas, then draw the layout as ASCII art. `.` is an empty cell.

```css
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100dvh;
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }

/* Mobile: just redraw the map */
@media (width < 700px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "sidebar" "footer";
  }
}
```

<div class="demo">
<div class="c lay-areas">
  <div class="b" style="grid-area:header">header</div>
  <div class="b" style="grid-area:sidebar">sidebar</div>
  <div class="b" style="grid-area:main;min-height:90px">main</div>
  <div class="b" style="grid-area:footer">footer</div>
</div>
<style>
  .lay-areas { display: grid; grid-template-columns: 140px 1fr; grid-template-rows: auto 1fr auto; grid-template-areas: "header header" "sidebar main" "footer footer"; }
  @media (width < 700px) { .lay-areas { grid-template-columns: 1fr; grid-template-areas: "header" "main" "sidebar" "footer"; } }
</style>
</div>

Rules: every row string must have the same number of cells, and each named area must be a rectangle.

## Named lines <span class="lvl lvl-3">Advanced</span> { #named-lines data-toc-label="Named lines" }

```css
.layout {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] minmax(0, 60rem) [content-end]
    minmax(1rem, 1fr) [full-end];
}
.layout > *     { grid-column: content; }   /* centred content column */
.layout > .full { grid-column: full; }      /* full-bleed images, banners */
```

This "full-bleed" layout is covered in [Layout Patterns](patterns.md#full-bleed-article).

## Implicit grid and `grid-auto-flow` <span class="lvl lvl-2">Intermediate</span> { #implicit-grid-and-grid-auto-flow data-toc-label="Implicit grid and grid-auto-flow" }

```css
grid-auto-flow: row;          /* default: fill row by row */
grid-auto-flow: column;       /* fill column by column */
grid-auto-flow: row dense;    /* backfill holes with later small items */
```

<div class="demo">
<code>row</code> (holes left by the wide items)
<div class="c" style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:row"><div class="b">1</div><div class="b" style="grid-column:span 2">2 wide</div><div class="b" style="grid-column:span 2">3 wide</div><div class="b">4</div><div class="b">5</div></div>
<br><code>row dense</code> (holes backfilled; visual order ≠ DOM order)
<div class="c" style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:row dense"><div class="b">1</div><div class="b" style="grid-column:span 2">2 wide</div><div class="b" style="grid-column:span 2">3 wide</div><div class="b">4</div><div class="b">5</div></div>
</div>

## Alignment <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-2">Intermediate</span> { #alignment data-toc-label="Alignment" }

| Property | Aligns | Axis |
|---|---|---|
| `justify-items` | Every item inside its cell | Inline (horizontal) |
| `align-items` | Every item inside its cell | Block (vertical) |
| `place-items` | Both: `place-items: center` | |
| `justify-self` / `align-self` / `place-self` | One item inside its cell | |
| `justify-content` | The whole grid inside the container (when tracks are smaller than the container) | Inline |
| `align-content` | The whole grid inside the container | Block |
| `place-content` | Both | |

```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 80px;
        justify-items: center; align-items: center; }
.special { justify-self: end; align-self: start; }
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:80px;justify-items:center;align-items:center;background:repeating-linear-gradient(90deg,transparent 0 calc(33.33% - 1px),rgba(228,87,46,.25) calc(33.33% - 1px) 33.33%)"><div class="b">center</div><div class="b">center</div><div class="b" style="justify-self:end;align-self:start">self: end/start</div><div class="b" style="justify-self:stretch">stretch</div><div class="b">center</div><div class="b" style="place-self:end">place-self: end</div></div>
</div>

### The one-line centre <span class="lvl lvl-1">Beginner</span> { #the-one-line-centre data-toc-label="The one-line centre" }

```css
.center { display: grid; place-items: center; }
```

<div class="demo">
<div class="c" style="display:grid;place-items:center;height:120px"><div class="b">Centered with 2 properties</div></div>
</div>

## Overlapping items <span class="lvl lvl-2">Intermediate</span> { #overlapping-items data-toc-label="Overlapping items" }

Grid lets several items occupy the same cell: an alternative to `position: absolute` that keeps everything in flow.

```css
.hero { display: grid; }
.hero > * { grid-area: 1 / 1; }        /* everything in the same cell */
.hero .text { place-self: end start; z-index: 1; }
```

<div class="demo">
<div style="display:grid;border-radius:10px;overflow:hidden">
  <img src="https://picsum.photos/id/1036/800/260" alt="" style="grid-area:1/1;width:100%;height:180px;object-fit:cover">
  <div style="grid-area:1/1;background:linear-gradient(transparent 30%,rgb(0 0 0 / .7))"></div>
  <h3 style="grid-area:1/1;place-self:end start;margin:0;padding:1em;color:#fff;z-index:1">Text stacked on the image, no absolute positioning</h3>
</div>
</div>

## Subgrid <span class="lvl lvl-3">Advanced</span> { #subgrid data-toc-label="Subgrid" }

See [Modern CSS → Subgrid](../css/modern-css.md#subgrid) for a live demo. `grid-template-columns: subgrid` or `grid-template-rows: subgrid` lets nested elements align to the parent grid's tracks.

## Masonry <span class="lvl lvl-4">Expert</span> { #masonry data-toc-label="Masonry" }

A native masonry layout (Pinterest-style) is being standardised as **CSS Grid Lanes** (`display: grid-lanes`), with an earlier experimental syntax `grid-template-rows: masonry` in Firefox and Safari Technology Preview. It isn't Baseline yet. Until it is, use CSS multi-column (`columns: 3 220px`, ordered top-to-bottom per column) or a JS library. See [Layout Patterns → Masonry](patterns.md#masonry).

## Grid cheat sheet <span class="lvl lvl-3">Advanced</span> { #grid-cheat-sheet data-toc-label="Grid cheat sheet" }

| You want | Write |
|---|---|
| N equal columns | `grid-template-columns: repeat(N, 1fr)` |
| Responsive cards | `repeat(auto-fit, minmax(min(250px, 100%), 1fr))` |
| Sidebar + content | `grid-template-columns: 250px 1fr` (or `minmax(200px, 25%) 1fr`) |
| Full width item | `grid-column: 1 / -1` |
| Centre one thing | `display: grid; place-items: center` |
| Stack things on top of each other | `grid-area: 1 / 1` on every child |
| Columns that don't blow out | `minmax(0, 1fr)` instead of `1fr` |
| Equal-height rows of cards | `grid-auto-rows: 1fr` |
| Fill gaps from wide items | `grid-auto-flow: dense` (watch out for reading order) |
