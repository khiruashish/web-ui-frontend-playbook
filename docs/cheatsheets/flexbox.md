# Flexbox Cheat Sheet

Every card applies exactly the CSS shown on it. The dashed orange box is the **flex container**; the coloured boxes are **flex items**. For explanations, see the full [Flexbox reference](../layout/flexbox.md).

!!! tip "Remember the axes"
    `justify-content` works on the **main axis** (the direction items flow). `align-items` and `align-content` work on the **cross axis**. Set `flex-direction: column` and they swap: `justify-content` becomes vertical.

## `flex-direction`

Which way items flow.

<div class="cs-grid">
<div class="cs-card"><code>flex-direction: row</code><div class="mini" style="display:flex;flex-direction:row"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>flex-direction: row-reverse</code><div class="mini" style="display:flex;flex-direction:row-reverse"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>flex-direction: column</code><div class="mini" style="display:flex;flex-direction:column"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>flex-direction: column-reverse</code><div class="mini" style="display:flex;flex-direction:column-reverse"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
</div>

## `flex-wrap`

Whether items wrap onto new lines when they run out of room.

<div class="cs-grid">
<div class="cs-card"><code>flex-wrap: nowrap</code><div class="mini" style="display:flex;flex-wrap:nowrap"><div class="m" style="flex:0 0 38%">1</div><div class="m" style="flex:0 0 38%">2</div><div class="m" style="flex:0 0 38%">3</div><div class="m" style="flex:0 0 38%">4</div><div class="m" style="flex:0 0 38%">5</div></div></div>
<div class="cs-card"><code>flex-wrap: wrap</code><div class="mini" style="display:flex;flex-wrap:wrap"><div class="m" style="flex:0 0 38%">1</div><div class="m" style="flex:0 0 38%">2</div><div class="m" style="flex:0 0 38%">3</div><div class="m" style="flex:0 0 38%">4</div><div class="m" style="flex:0 0 38%">5</div></div></div>
<div class="cs-card"><code>flex-wrap: wrap-reverse</code><div class="mini" style="display:flex;flex-wrap:wrap-reverse"><div class="m" style="flex:0 0 38%">1</div><div class="m" style="flex:0 0 38%">2</div><div class="m" style="flex:0 0 38%">3</div><div class="m" style="flex:0 0 38%">4</div><div class="m" style="flex:0 0 38%">5</div></div></div>
</div>

## `justify-content` (main axis)

How free space is shared along the main axis.

<div class="cs-grid">
<div class="cs-card"><code>justify-content: flex-start</code><div class="mini" style="display:flex;justify-content:flex-start"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: center</code><div class="mini" style="display:flex;justify-content:center"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: flex-end</code><div class="mini" style="display:flex;justify-content:flex-end"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-between</code><div class="mini" style="display:flex;justify-content:space-between;gap:0"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-around</code><div class="mini" style="display:flex;justify-content:space-around;gap:0"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>justify-content: space-evenly</code><div class="mini" style="display:flex;justify-content:space-evenly;gap:0"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
</div>

## `align-items` (cross axis)

How items sit across the cross axis, within each line.

<div class="cs-grid">
<div class="cs-card"><code>align-items: stretch</code><div class="mini" style="display:flex;align-items:stretch;height:96px"><div class="m">A</div><div class="m" style="padding-block:14px">B</div><div class="m" style="font-size:.9rem">C</div></div></div>
<div class="cs-card"><code>align-items: flex-start</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">A</div><div class="m" style="padding-block:14px">B</div><div class="m" style="font-size:.9rem">C</div></div></div>
<div class="cs-card"><code>align-items: center</code><div class="mini" style="display:flex;align-items:center;height:96px"><div class="m">A</div><div class="m" style="padding-block:14px">B</div><div class="m" style="font-size:.9rem">C</div></div></div>
<div class="cs-card"><code>align-items: flex-end</code><div class="mini" style="display:flex;align-items:flex-end;height:96px"><div class="m">A</div><div class="m" style="padding-block:14px">B</div><div class="m" style="font-size:.9rem">C</div></div></div>
<div class="cs-card"><code>align-items: baseline</code><div class="mini" style="display:flex;align-items:baseline;height:96px"><div class="m">A</div><div class="m" style="padding-block:14px">B</div><div class="m" style="font-size:.9rem">C</div></div></div>
</div>

## `align-content` (multiple lines)

Only has an effect when items **wrap** and the container has spare cross-axis space.

<div class="cs-grid">
<div class="cs-card"><code>align-content: stretch</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:stretch"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
<div class="cs-card"><code>align-content: flex-start</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:flex-start"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
<div class="cs-card"><code>align-content: center</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:center"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
<div class="cs-card"><code>align-content: flex-end</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:flex-end"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
<div class="cs-card"><code>align-content: space-between</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:space-between"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
<div class="cs-card"><code>align-content: space-around</code><div class="mini" style="display:flex;flex-wrap:wrap;height:120px;align-content:space-around"><div class="m" style="flex:0 0 40%">1</div><div class="m" style="flex:0 0 40%">2</div><div class="m" style="flex:0 0 40%">3</div><div class="m" style="flex:0 0 40%">4</div></div></div>
</div>

## `gap`

Space between items. No more margin hacks.

<div class="cs-grid">
<div class="cs-card"><code>gap: 0</code><div class="mini" style="display:flex;flex-wrap:wrap;gap:0"><div class="m" style="flex:0 0 26%">1</div><div class="m" style="flex:0 0 26%">2</div><div class="m" style="flex:0 0 26%">3</div><div class="m" style="flex:0 0 26%">4</div><div class="m" style="flex:0 0 26%">5</div></div></div>
<div class="cs-card"><code>gap: 4px</code><div class="mini" style="display:flex;flex-wrap:wrap;gap:4px"><div class="m" style="flex:0 0 26%">1</div><div class="m" style="flex:0 0 26%">2</div><div class="m" style="flex:0 0 26%">3</div><div class="m" style="flex:0 0 26%">4</div><div class="m" style="flex:0 0 26%">5</div></div></div>
<div class="cs-card"><code>gap: 12px</code><div class="mini" style="display:flex;flex-wrap:wrap;gap:12px"><div class="m" style="flex:0 0 26%">1</div><div class="m" style="flex:0 0 26%">2</div><div class="m" style="flex:0 0 26%">3</div><div class="m" style="flex:0 0 26%">4</div><div class="m" style="flex:0 0 26%">5</div></div></div>
<div class="cs-card"><code>gap: 16px 4px</code><div class="mini" style="display:flex;flex-wrap:wrap;gap:16px 4px"><div class="m" style="flex:0 0 26%">1</div><div class="m" style="flex:0 0 26%">2</div><div class="m" style="flex:0 0 26%">3</div><div class="m" style="flex:0 0 26%">4</div><div class="m" style="flex:0 0 26%">5</div></div></div>
</div>

## `flex-grow`

How much of the **leftover** space each item takes (a ratio).

<div class="cs-grid">
<div class="cs-card"><code>all: flex-grow: 0</code><div class="mini" style="display:flex;"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>middle: flex-grow: 1</code><div class="mini" style="display:flex;"><div class="m">1</div><div class="m" style="flex-grow:1">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>all: flex-grow: 1</code><div class="mini" style="display:flex;"><div class="m" style="flex-grow:1">1</div><div class="m" style="flex-grow:1">2</div><div class="m" style="flex-grow:1">3</div></div></div>
<div class="cs-card"><code>1 · 2 · 1</code><div class="mini" style="display:flex;"><div class="m" style="flex-grow:1">1</div><div class="m" style="flex-grow:2">2</div><div class="m" style="flex-grow:1">3</div></div></div>
</div>

## `flex-shrink`

How much each item gives up when space runs out. `0` = never shrink.

<div class="cs-grid">
<div class="cs-card"><code>all: flex: 0 1 120px</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 1 120px">1</div><div class="m" style="flex:0 1 120px">2</div><div class="m" style="flex:0 1 120px">3</div></div></div>
<div class="cs-card"><code>first: flex-shrink: 0</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 0 120px">1</div><div class="m" style="flex:0 1 120px">2</div><div class="m" style="flex:0 1 120px">3</div></div></div>
<div class="cs-card"><code>last: flex-shrink: 4</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 1 120px">1</div><div class="m" style="flex:0 1 120px">2</div><div class="m" style="flex:0 4 120px">3</div></div></div>
</div>

## `flex-basis`

The starting size before growing or shrinking.

<div class="cs-grid">
<div class="cs-card"><code>flex: 1 1 auto (content-sized)</code><div class="mini" style="display:flex;"><div class="m" style="flex:1 1 auto">A</div><div class="m" style="flex:1 1 auto">Longer B</div><div class="m" style="flex:1 1 auto">C</div></div></div>
<div class="cs-card"><code>flex: 1 1 0 (equal widths)</code><div class="mini" style="display:flex;"><div class="m" style="flex:1 1 0">A</div><div class="m" style="flex:1 1 0">Longer B</div><div class="m" style="flex:1 1 0">C</div></div></div>
<div class="cs-card"><code>first: flex-basis: 60%</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 0 60%">A</div><div class="m">Longer B</div><div class="m">C</div></div></div>
</div>

## `flex` shorthand

Always prefer the shorthand. Values are `grow shrink basis`.

<div class="cs-grid">
<div class="cs-card"><code>flex: initial (0 1 auto)</code><div class="mini" style="display:flex;"><div class="m" style="flex:initial">X</div><div class="m" style="flex:initial">Item</div><div class="m" style="flex:initial">Z</div></div></div>
<div class="cs-card"><code>flex: auto (1 1 auto)</code><div class="mini" style="display:flex;"><div class="m" style="flex:auto">X</div><div class="m" style="flex:auto">Item</div><div class="m" style="flex:auto">Z</div></div></div>
<div class="cs-card"><code>flex: none (0 0 auto)</code><div class="mini" style="display:flex;"><div class="m" style="flex:none">X</div><div class="m" style="flex:none">Item</div><div class="m" style="flex:none">Z</div></div></div>
<div class="cs-card"><code>flex: 1 (1 1 0%)</code><div class="mini" style="display:flex;"><div class="m" style="flex:1">X</div><div class="m" style="flex:1">Item</div><div class="m" style="flex:1">Z</div></div></div>
<div class="cs-card"><code>flex: 2 / 1 / 1</code><div class="mini" style="display:flex;"><div class="m" style="flex:2">X</div><div class="m" style="flex:1">Item</div><div class="m" style="flex:1">Z</div></div></div>
<div class="cs-card"><code>flex: 0 0 60px (fixed)</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 0 60px">X</div><div class="m" style="flex:1">Item</div><div class="m" style="flex:0 0 60px">Z</div></div></div>
</div>

## `align-self`

Override `align-items` for one item.

<div class="cs-grid">
<div class="cs-card"><code>2nd item: align-self: auto</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">1</div><div class="m" style="align-self:auto">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd item: align-self: flex-start</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">1</div><div class="m" style="align-self:flex-start">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd item: align-self: center</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">1</div><div class="m" style="align-self:center">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd item: align-self: flex-end</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">1</div><div class="m" style="align-self:flex-end">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd item: align-self: stretch</code><div class="mini" style="display:flex;align-items:flex-start;height:96px"><div class="m">1</div><div class="m" style="align-self:stretch">2</div><div class="m">3</div></div></div>
</div>

## `order`

Change visual order only (DOM, tab order and screen readers don't change).

<div class="cs-grid">
<div class="cs-card"><code>3rd: order: -1</code><div class="mini" style="display:flex;"><div class="m">1</div><div class="m">2</div><div class="m" style="order:-1">3</div></div></div>
<div class="cs-card"><code>1st: order: 1</code><div class="mini" style="display:flex;"><div class="m" style="order:1">1</div><div class="m">2</div><div class="m">3</div></div></div>
<div class="cs-card"><code>2nd: order: 2; 3rd: order: 1</code><div class="mini" style="display:flex;"><div class="m">1</div><div class="m" style="order:2">2</div><div class="m" style="order:1">3</div></div></div>
</div>

## Everyday recipes

The patterns you'll type most often.

<div class="cs-grid">
<div class="cs-card"><code>centre: justify-content + align-items: center</code><div class="mini" style="display:flex;justify-content:center;align-items:center;height:96px"><div class="m">●</div></div></div>
<div class="cs-card"><code>push last item right: margin-inline-start: auto</code><div class="mini" style="display:flex;"><div class="m">Logo</div><div class="m">A</div><div class="m">B</div><div class="m" style="margin-inline-start:auto">Login</div></div></div>
<div class="cs-card"><code>space-between toolbar</code><div class="mini" style="display:flex;justify-content:space-between;align-items:center"><div class="m">◀</div><div class="m">Title</div><div class="m">⚙</div></div></div>
<div class="cs-card"><code>footer to bottom: column + margin-top: auto</code><div class="mini" style="display:flex;flex-direction:column;height:110px"><div class="m">Title</div><div class="m">Text</div><div class="m" style="margin-top:auto">Button</div></div></div>
<div class="cs-card"><code>equal columns: flex: 1</code><div class="mini" style="display:flex;"><div class="m" style="flex:1">1</div><div class="m" style="flex:1">2</div><div class="m" style="flex:1">3</div></div></div>
<div class="cs-card"><code>wrapping cards: flex: 1 1 70px</code><div class="mini" style="display:flex;flex-wrap:wrap"><div class="m" style="flex:1 1 70px">1</div><div class="m" style="flex:1 1 70px">2</div><div class="m" style="flex:1 1 70px">3</div><div class="m" style="flex:1 1 70px">4</div><div class="m" style="flex:1 1 70px">5</div></div></div>
<div class="cs-card"><code>fixed sidebar + fluid main</code><div class="mini" style="display:flex;"><div class="m" style="flex:0 0 50px">Side</div><div class="m" style="flex:1">Main</div></div></div>
<div class="cs-card"><code>vertical stack with gap</code><div class="mini" style="display:flex;flex-direction:column;gap:6px"><div class="m">1</div><div class="m">2</div><div class="m">3</div></div></div>
</div>

## Property reference

| Property | Applies to | Values | Default |
|---|---|---|---|
| `display` | container | `flex` · `inline-flex` | — |
| `flex-direction` | container | `row` · `row-reverse` · `column` · `column-reverse` | `row` |
| `flex-wrap` | container | `nowrap` · `wrap` · `wrap-reverse` | `nowrap` |
| `flex-flow` | container | `<direction> <wrap>` | `row nowrap` |
| `justify-content` | container | `flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly` · `start` · `end` | `flex-start` |
| `align-items` | container | `stretch` · `flex-start` · `center` · `flex-end` · `baseline` | `stretch` |
| `align-content` | container (wrapped) | `stretch` · `flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly` | `stretch` (`normal`) |
| `gap` / `row-gap` / `column-gap` | container | length | `0` |
| `flex-grow` | item | number ≥ 0 | `0` |
| `flex-shrink` | item | number ≥ 0 | `1` |
| `flex-basis` | item | `auto` · `content` · length · % | `auto` |
| `flex` | item | `none` · `auto` · `initial` · `<grow> <shrink> <basis>` | `0 1 auto` |
| `align-self` | item | `auto` · `stretch` · `flex-start` · `center` · `flex-end` · `baseline` | `auto` |
| `order` | item | integer | `0` |

## Gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Item won't shrink; text overflows | Flex items default to `min-width: auto` | `min-width: 0` on the item |
| `align-content` does nothing | Items don't wrap, or there's no spare height | Add `flex-wrap: wrap` and a container height |
| `justify-content` seems vertical | `flex-direction: column` swaps the axes | Use `align-items` for horizontal alignment |
| Images stretch tall | `align-items: stretch` default | `align-items: flex-start` or `align-self: center` on the image |
| Last wrapped row items are huge | `flex-grow` stretches the leftover row | Use Grid `auto-fill`/`auto-fit` for aligned columns |
| Sticky child doesn't stick | It's stretched to full height | `align-self: flex-start` |
| `float`, `vertical-align`, `clear` ignored | They don't apply to flex items | Use flex alignment properties |
