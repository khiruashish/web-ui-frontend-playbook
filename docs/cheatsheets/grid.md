# Grid Cheat Sheet

Every card applies exactly the CSS shown on it. The dashed orange box is the **grid container**; coloured boxes are **grid items**. For explanations, see the full [Grid reference](../layout/grid.md).

## Defining columns

`grid-template-columns` sets the number and size of columns.

<div class="cs-grid">
<div class="cs-card"><code>grid-template-columns: 1fr 1fr</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-template-columns: 1fr 2fr</code><div class="mini" style="display:grid;grid-template-columns:1fr 2fr"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-template-columns: repeat(3, 1fr)</code><div class="mini" style="display:grid;grid-template-columns:repeat(3, 1fr)"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div></div></div>
<div class="cs-card"><code>grid-template-columns: 60px 1fr</code><div class="mini" style="display:grid;grid-template-columns:60px 1fr"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-template-columns: 1fr auto 1fr</code><div class="mini" style="display:grid;grid-template-columns:1fr auto 1fr"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>grid-template-columns: repeat(2, 30px 1fr)</code><div class="mini" style="display:grid;grid-template-columns:repeat(2, 30px 1fr)"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-template-columns: minmax(80px, 1fr) 2fr</code><div class="mini" style="display:grid;grid-template-columns:minmax(80px, 1fr) 2fr"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>grid-template-columns: repeat(4, minmax(0, 1fr))</code><div class="mini" style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr))"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div><div class="m">7</div><div class="m">8</div></div></div>
</div>

## Responsive columns without media queries

`auto-fill` keeps empty tracks; `auto-fit` collapses them so items stretch.

```css
/* The line you'll use most */
grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
```

<div class="cs-grid">
<div class="cs-card"><code>repeat(auto-fill, minmax(50px, 1fr)): 2 items</code><div class="mini" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(50px,1fr))"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>repeat(auto-fit, minmax(50px, 1fr)): 2 items</code><div class="mini" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr))"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>repeat(auto-fit, minmax(50px, 1fr)): 7 items</code><div class="mini" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr))"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div><div class="m">7</div></div></div>
</div>

## Rows

`grid-template-rows` for explicit rows, `grid-auto-rows` for the rest.

<div class="cs-grid">
<div class="cs-card"><code>grid-template-rows: 20px 50px</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:20px 50px"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-auto-rows: 30px</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:30px"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div></div></div>
<div class="cs-card"><code>grid-template-rows: auto 1fr auto (pancake)</code><div class="mini" style="display:grid;grid-template-rows:auto 1fr auto;height:120px"><div class="m">Header</div><div class="m">Main</div><div class="m">Footer</div></div></div>
<div class="cs-card"><code>grid-auto-rows: 1fr (equal-height rows)</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr"><div class="m">Short</div><div class="m">Much longer text here</div><div class="m">C</div><div class="m">D</div></div></div>
</div>

## Placing items

Lines are numbered from 1; negative numbers count from the end.

<div class="cs-grid">
<div class="cs-card"><code>grid-column: 1 / -1 (full width)</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr)"><div class="m" style="grid-column:1 / -1">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-column: span 2</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr)"><div class="m" style="grid-column:span 2">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-row: span 2</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:26px"><div class="m" style="grid-row:span 2">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div></div></div>
<div class="cs-card"><code>grid-column: 2 / 4</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr)"><div class="m" style="grid-column:2 / 4">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>grid-area: 1 / 1 (stack items)</code><div class="mini" style="display:grid;"><div class="m" style="grid-area:1/1;height:60px">Under</div><div class="m" style="grid-area:1/1;place-self:center;z-index:1">Over</div></div></div>
<div class="cs-card"><code>big tile: column + row span 2</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:24px"><div class="m" style="grid-column:span 2;grid-row:span 2">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div></div></div>
</div>

## Named areas

Draw the layout as text. Each name must form a rectangle; `.` leaves a cell empty.

```css
.page {
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "side   main"
    "footer footer";
}
header { grid-area: header; }
```

<div class="cs-grid">
<div class="cs-card"><code>&quot;h h&quot; &quot;s m&quot; &quot;f f&quot;</code><div class="mini" style="display:grid;grid-template-columns:40px 1fr;grid-template-areas:'h h' 's m' 'f f'"><div class="m" style="grid-area:h">h</div><div class="m" style="grid-area:s">s</div><div class="m" style="grid-area:m;min-height:30px">m</div><div class="m" style="grid-area:f">f</div></div></div>
<div class="cs-card"><code>&quot;h h h&quot; &quot;n m a&quot; &quot;f f f&quot;</code><div class="mini" style="display:grid;grid-template-columns:30px 1fr 30px;grid-template-areas:'h h h' 'n m a' 'f f f'"><div class="m" style="grid-area:h">h</div><div class="m" style="grid-area:n">n</div><div class="m" style="grid-area:m;min-height:30px">m</div><div class="m" style="grid-area:a">a</div><div class="m" style="grid-area:f">f</div></div></div>
<div class="cs-card"><code>&quot;a a b&quot; &quot;a a c&quot; &quot;. d d&quot;</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:22px;grid-template-areas:'a a b' 'a a c' '. d d'"><div class="m" style="grid-area:a">a</div><div class="m" style="grid-area:b">b</div><div class="m" style="grid-area:c">c</div><div class="m" style="grid-area:d">d</div></div></div>
</div>

## `grid-auto-flow`

How auto-placed items fill the grid.

<div class="cs-grid">
<div class="cs-card"><code>grid-auto-flow: row (leaves a hole)</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:row"><div class="m">1</div><div class="m" style="grid-column:span 3">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-auto-flow: row dense (fills it)</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:row dense"><div class="m">1</div><div class="m" style="grid-column:span 3">2</div><div class="m">3</div><div class="m">4</div></div></div>
<div class="cs-card"><code>grid-auto-flow: column</code><div class="mini" style="display:grid;grid-template-rows:repeat(2,auto);grid-auto-flow:column"><div class="m">1</div><div class="m">2</div><div class="m">3</div><div class="m">4</div><div class="m">5</div><div class="m">6</div></div></div>
</div>

## Aligning items inside their cells

`justify-*` = inline (horizontal) axis, `align-*` = block (vertical) axis, `place-*` = both.

<div class="cs-grid">
<div class="cs-card"><code>justify-items: stretch</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;justify-items:stretch"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>justify-items: start</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;justify-items:start"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>justify-items: center</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;justify-items:center"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>justify-items: end</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;justify-items:end"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>align-items: start</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;align-items:start"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>align-items: center</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;align-items:center"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>align-items: end</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;align-items:end"><div class="m">1</div><div class="m">2</div></div></div>
<div class="cs-card"><code>place-items: center</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:40px;place-items:center"><div class="m">1</div><div class="m">2</div></div></div>
</div>

## Aligning the whole grid in its container

Only matters when the tracks are smaller than the container.

<div class="cs-grid">
<div class="cs-card"><code>justify-content: start</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:start"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: center</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:center"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: end</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:end"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-between</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:space-between"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-around</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:space-around"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-evenly</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,28px);justify-content:space-evenly"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
</div>

## Per-item alignment

`justify-self`, `align-self`, `place-self`.

<div class="cs-grid">
<div class="cs-card"><code>2nd: justify-self:start</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px"><div class="m">1</div><div class="m" style="justify-self:start">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd: justify-self:end</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px"><div class="m">1</div><div class="m" style="justify-self:end">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd: align-self:start</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px"><div class="m">1</div><div class="m" style="align-self:start">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd: align-self:end</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px"><div class="m">1</div><div class="m" style="align-self:end">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd: place-self:center</code><div class="mini" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px"><div class="m">1</div><div class="m" style="place-self:center">2</div><div class="m">3</div></div></div>
</div>

## Layout recipes

Common page and component layouts in one or two lines.

<div class="cs-grid">
<div class="cs-card"><code>centre anything: place-items: center</code><div class="mini" style="display:grid;place-items:center;height:96px"><div class="m">●</div></div></div>
<div class="cs-card"><code>sidebar: 60px 1fr</code><div class="mini" style="display:grid;grid-template-columns:60px 1fr;min-height:70px"><div class="m">Side</div><div class="m">Main</div></div></div>
<div class="cs-card"><code>holy grail: 30px 1fr 30px + areas</code><div class="mini" style="display:grid;grid-template-columns:30px 1fr 30px;grid-template-areas:'h h h' 'n m a' 'f f f'"><div class="m" style="grid-area:h">H</div><div class="m" style="grid-area:n">N</div><div class="m" style="grid-area:m;min-height:30px">Main</div><div class="m" style="grid-area:a">A</div><div class="m" style="grid-area:f">F</div></div></div>
<div class="cs-card"><code>12-col: span 8 + span 4</code><div class="mini" style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr))"><div class="m" style="grid-column:span 8">8</div><div class="m" style="grid-column:span 4">4</div><div class="m" style="grid-column:span 6">6</div><div class="m" style="grid-column:span 6">6</div></div></div>
<div class="cs-card"><code>bento: big + tall + wide</code><div class="mini" style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:22px;grid-auto-flow:dense"><div class="m" style="grid-column:span 2;grid-row:span 2">big</div><div class="m" style="grid-row:span 2">tall</div><div class="m">s</div><div class="m" style="grid-column:span 2">wide</div><div class="m">s</div></div></div>
<div class="cs-card"><code>full-bleed: [full] [content] [full]</code><div class="mini" style="display:grid;grid-template-columns:[full-start] 1fr [content-start] 3fr [content-end] 1fr [full-end]"><div class="m" style="grid-column:content-start/content-end">text</div><div class="m" style="grid-column:full-start/full-end">full-bleed</div><div class="m" style="grid-column:content-start/content-end">text</div></div></div>
</div>

## Property reference

| Property | Applies to | Example values |
|---|---|---|
| `display` | container | `grid` · `inline-grid` |
| `grid-template-columns` / `-rows` | container | `200px 1fr` · `repeat(3, 1fr)` · `repeat(auto-fit, minmax(200px, 1fr))` · `subgrid` |
| `grid-template-areas` | container | `"a b" "c d"` |
| `grid-template` | container | `auto 1fr / 200px 1fr` (rows / columns) |
| `grid-auto-rows` / `-columns` | container | `100px` · `minmax(80px, auto)` · `1fr` |
| `grid-auto-flow` | container | `row` · `column` · `dense` · `row dense` |
| `gap` / `row-gap` / `column-gap` | container | `1rem` · `1rem 2rem` |
| `justify-items` / `align-items` / `place-items` | container | `start` · `center` · `end` · `stretch` · `baseline` |
| `justify-content` / `align-content` / `place-content` | container | `start` · `center` · `end` · `space-between` · `space-around` · `space-evenly` · `stretch` |
| `grid-column` / `grid-row` | item | `1 / 3` · `span 2` · `1 / -1` · `content` (named lines) |
| `grid-column-start` / `-end`, `grid-row-start` / `-end` | item | `2` · `span 3` · `-1` |
| `grid-area` | item | `main` · `1 / 1 / 3 / 3` (row-start / col-start / row-end / col-end) |
| `justify-self` / `align-self` / `place-self` | item | `start` · `center` · `end` · `stretch` |
| `order` | item | integer |

## Functions and keywords

| Thing | Means |
|---|---|
| `fr` | A share of the free space after fixed tracks and gaps |
| `repeat(n, track)` | Repeat a track pattern n times |
| `minmax(min, max)` | A track that's at least `min` and at most `max` |
| `auto-fill` | As many tracks as fit; keeps empty ones |
| `auto-fit` | As many tracks as fit; collapses empty ones |
| `min-content` / `max-content` / `fit-content(x)` | Size from the content's smallest / largest / clamped width |
| `subgrid` | Use the parent grid's tracks for this axis |
| `span n` | Cover n tracks from the auto-placed or given start |
| `-1` | The last explicit grid line |

## Gotchas

| Symptom | Cause | Fix |
|---|---|---|
| One `1fr` column is wider than the others | `1fr` = `minmax(auto, 1fr)`, and long content sets the minimum | `minmax(0, 1fr)` |
| `1 / -1` doesn't reach the last column | `-1` only counts **explicit** tracks | Define columns explicitly, or use `span` |
| Areas template is ignored | Rows have different cell counts, or an area isn't rectangular | Check every string has the same number of cells |
| Visual order differs from tab order | `dense`, `order`, or explicit placement | Keep DOM order logical; avoid `dense` for content people read in order |
| Grid overflows on tiny screens | `minmax(300px, 1fr)` is wider than the screen | `minmax(min(300px, 100%), 1fr)` |
| Sticky item in a grid doesn't stick | Grid items stretch to the row height | `align-self: start` |
