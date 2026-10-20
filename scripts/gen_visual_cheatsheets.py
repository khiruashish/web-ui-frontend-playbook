"""Generate the visual Flexbox and Grid cheat sheets.

Every card shows a CSS declaration and a tiny live diagram that applies
exactly that declaration, so the label and the picture can't disagree.

Usage:
    python3 scripts/gen_visual_cheatsheets.py docs/cheatsheets
"""
import html
import os
import sys

OUT_DIR = sys.argv[1]


def boxes(n, labels=None, styles=None):
    labels = labels or [str(i + 1) for i in range(n)]
    styles = styles or [""] * n
    return "".join(
        f'<div class="m"{f" style={chr(34)}{s}{chr(34)}" if s else ""}>{l}</div>'
        for l, s in zip(labels, styles)
    )


def card(label, container_css, inner):
    return (
        '<div class="cs-card">'
        f"<code>{html.escape(label)}</code>"
        f'<div class="mini" style="{container_css}">{inner}</div>'
        "</div>"
    )


def section(title, intro, cards, code=None):
    out = [f"## {title}", ""]
    if intro:
        out += [intro, ""]
    if code:
        out += ["```css", code, "```", ""]
    out += ['<div class="cs-grid">'] + cards + ["</div>", ""]
    return out


# ------------------------------------------------------------------ Flexbox
F = []
w = F.append
for line in [
    "# Flexbox Cheat Sheet",
    "",
    "Every card applies exactly the CSS shown on it. The dashed orange box is the **flex container**; the coloured boxes are **flex items**. For explanations, see the full [Flexbox reference](../layout/flexbox.md).",
    "",
    "!!! tip \"Remember the axes\"",
    "    `justify-content` works on the **main axis** (the direction items flow). `align-items` and `align-content` work on the **cross axis**. Set `flex-direction: column` and they swap: `justify-content` becomes vertical.",
    "",
]:
    w(line)

base = "display:flex;"
F += section(
    "`flex-direction`", "Which way items flow.",
    [card(f"flex-direction: {v}", base + f"flex-direction:{v}", boxes(3))
     for v in ["row", "row-reverse", "column", "column-reverse"]])

F += section(
    "`flex-wrap`", "Whether items wrap onto new lines when they run out of room.",
    [card(f"flex-wrap: {v}", base + f"flex-wrap:{v}", boxes(5, styles=["flex:0 0 38%"] * 5))
     for v in ["nowrap", "wrap", "wrap-reverse"]])

F += section(
    "`justify-content` (main axis)", "How free space is shared along the main axis.",
    [card(f"justify-content: {v}", base + f"justify-content:{v};gap:0" if "space" in v else base + f"justify-content:{v}", boxes(3))
     for v in ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]])

F += section(
    "`align-items` (cross axis)", "How items sit across the cross axis, within each line.",
    [card(f"align-items: {v}", base + f"align-items:{v};height:96px",
          boxes(3, ["A", "B", "C"], ["", "padding-block:14px", "font-size:.9rem"]))
     for v in ["stretch", "flex-start", "center", "flex-end", "baseline"]])

F += section(
    "`align-content` (multiple lines)", "Only has an effect when items **wrap** and the container has spare cross-axis space.",
    [card(f"align-content: {v}", base + f"flex-wrap:wrap;height:120px;align-content:{v}",
          boxes(4, styles=["flex:0 0 40%"] * 4))
     for v in ["stretch", "flex-start", "center", "flex-end", "space-between", "space-around"]])

F += section(
    "`gap`", "Space between items. No more margin hacks.",
    [card(f"gap: {v}", base + f"flex-wrap:wrap;gap:{v}", boxes(5, styles=["flex:0 0 26%"] * 5))
     for v in ["0", "4px", "12px", "16px 4px"]])

F += section(
    "`flex-grow`", "How much of the **leftover** space each item takes (a ratio).",
    [card(label, base, boxes(3, styles=st)) for label, st in [
        ("all: flex-grow: 0", ["", "", ""]),
        ("middle: flex-grow: 1", ["", "flex-grow:1", ""]),
        ("all: flex-grow: 1", ["flex-grow:1"] * 3),
        ("1 · 2 · 1", ["flex-grow:1", "flex-grow:2", "flex-grow:1"]),
    ]])

F += section(
    "`flex-shrink`", "How much each item gives up when space runs out. `0` = never shrink.",
    [card(label, base, boxes(3, styles=st)) for label, st in [
        ("all: flex: 0 1 120px", ["flex:0 1 120px"] * 3),
        ("first: flex-shrink: 0", ["flex:0 0 120px", "flex:0 1 120px", "flex:0 1 120px"]),
        ("last: flex-shrink: 4", ["flex:0 1 120px", "flex:0 1 120px", "flex:0 4 120px"]),
    ]])

F += section(
    "`flex-basis`", "The starting size before growing or shrinking.",
    [card(label, base, boxes(3, ["A", "Longer B", "C"], st)) for label, st in [
        ("flex: 1 1 auto (content-sized)", ["flex:1 1 auto"] * 3),
        ("flex: 1 1 0 (equal widths)", ["flex:1 1 0"] * 3),
        ("first: flex-basis: 60%", ["flex:0 0 60%", "", ""]),
    ]])

F += section(
    "`flex` shorthand", "Always prefer the shorthand. Values are `grow shrink basis`.",
    [card(label, base, boxes(3, ["X", "Item", "Z"], st)) for label, st in [
        ("flex: initial (0 1 auto)", ["flex:initial"] * 3),
        ("flex: auto (1 1 auto)", ["flex:auto"] * 3),
        ("flex: none (0 0 auto)", ["flex:none"] * 3),
        ("flex: 1 (1 1 0%)", ["flex:1"] * 3),
        ("flex: 2 / 1 / 1", ["flex:2", "flex:1", "flex:1"]),
        ("flex: 0 0 60px (fixed)", ["flex:0 0 60px", "flex:1", "flex:0 0 60px"]),
    ]])

F += section(
    "`align-self`", "Override `align-items` for one item.",
    [card(f"2nd item: align-self: {v}", base + "align-items:flex-start;height:96px",
          boxes(3, styles=["", f"align-self:{v}", ""]))
     for v in ["auto", "flex-start", "center", "flex-end", "stretch"]])

F += section(
    "`order`", "Change visual order only (DOM, tab order and screen readers don't change).",
    [card(label, base, boxes(3, styles=st)) for label, st in [
        ("3rd: order: -1", ["", "", "order:-1"]),
        ("1st: order: 1", ["order:1", "", ""]),
        ("2nd: order: 2; 3rd: order: 1", ["", "order:2", "order:1"]),
    ]])

F += section(
    "Everyday recipes", "The patterns you'll type most often.",
    [
        card("centre: justify-content + align-items: center", base + "justify-content:center;align-items:center;height:96px", boxes(1, ["●"])),
        card("push last item right: margin-inline-start: auto", base, boxes(4, ["Logo", "A", "B", "Login"], ["", "", "", "margin-inline-start:auto"])),
        card("space-between toolbar", base + "justify-content:space-between;align-items:center", boxes(3, ["◀", "Title", "⚙"])),
        card("footer to bottom: column + margin-top: auto", base + "flex-direction:column;height:110px", boxes(3, ["Title", "Text", "Button"], ["", "", "margin-top:auto"])),
        card("equal columns: flex: 1", base, boxes(3, ["1", "2", "3"], ["flex:1"] * 3)),
        card("wrapping cards: flex: 1 1 70px", base + "flex-wrap:wrap", boxes(5, styles=["flex:1 1 70px"] * 5)),
        card("fixed sidebar + fluid main", base, boxes(2, ["Side", "Main"], ["flex:0 0 50px", "flex:1"])),
        card("vertical stack with gap", base + "flex-direction:column;gap:6px", boxes(3)),
    ])

F += [
    "## Property reference",
    "",
    "| Property | Applies to | Values | Default |",
    "|---|---|---|---|",
    "| `display` | container | `flex` · `inline-flex` | — |",
    "| `flex-direction` | container | `row` · `row-reverse` · `column` · `column-reverse` | `row` |",
    "| `flex-wrap` | container | `nowrap` · `wrap` · `wrap-reverse` | `nowrap` |",
    "| `flex-flow` | container | `<direction> <wrap>` | `row nowrap` |",
    "| `justify-content` | container | `flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly` · `start` · `end` | `flex-start` |",
    "| `align-items` | container | `stretch` · `flex-start` · `center` · `flex-end` · `baseline` | `stretch` |",
    "| `align-content` | container (wrapped) | `stretch` · `flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly` | `stretch` (`normal`) |",
    "| `gap` / `row-gap` / `column-gap` | container | length | `0` |",
    "| `flex-grow` | item | number ≥ 0 | `0` |",
    "| `flex-shrink` | item | number ≥ 0 | `1` |",
    "| `flex-basis` | item | `auto` · `content` · length · % | `auto` |",
    "| `flex` | item | `none` · `auto` · `initial` · `<grow> <shrink> <basis>` | `0 1 auto` |",
    "| `align-self` | item | `auto` · `stretch` · `flex-start` · `center` · `flex-end` · `baseline` | `auto` |",
    "| `order` | item | integer | `0` |",
    "",
    "## Gotchas",
    "",
    "| Symptom | Cause | Fix |",
    "|---|---|---|",
    "| Item won't shrink; text overflows | Flex items default to `min-width: auto` | `min-width: 0` on the item |",
    "| `align-content` does nothing | Items don't wrap, or there's no spare height | Add `flex-wrap: wrap` and a container height |",
    "| `justify-content` seems vertical | `flex-direction: column` swaps the axes | Use `align-items` for horizontal alignment |",
    "| Images stretch tall | `align-items: stretch` default | `align-items: flex-start` or `align-self: center` on the image |",
    "| Last wrapped row items are huge | `flex-grow` stretches the leftover row | Use Grid `auto-fill`/`auto-fit` for aligned columns |",
    "| Sticky child doesn't stick | It's stretched to full height | `align-self: flex-start` |",
    "| `float`, `vertical-align`, `clear` ignored | They don't apply to flex items | Use flex alignment properties |",
    "",
]

# ------------------------------------------------------------------ Grid
G = []
w = G.append
for line in [
    "# Grid Cheat Sheet",
    "",
    "Every card applies exactly the CSS shown on it. The dashed orange box is the **grid container**; coloured boxes are **grid items**. For explanations, see the full [Grid reference](../layout/grid.md).",
    "",
]:
    w(line)

gb = "display:grid;"
G += section(
    "Defining columns", "`grid-template-columns` sets the number and size of columns.",
    [card(f"grid-template-columns: {v}", gb + f"grid-template-columns:{v}", boxes(n))
     for v, n in [
         ("1fr 1fr", 4), ("1fr 2fr", 4), ("repeat(3, 1fr)", 6), ("60px 1fr", 4),
         ("1fr auto 1fr", 3), ("repeat(2, 30px 1fr)", 4), ("minmax(80px, 1fr) 2fr", 2), ("repeat(4, minmax(0, 1fr))", 8),
     ]])

G += section(
    "Responsive columns without media queries", "`auto-fill` keeps empty tracks; `auto-fit` collapses them so items stretch.",
    [
        card("repeat(auto-fill, minmax(50px, 1fr)): 2 items", gb + "grid-template-columns:repeat(auto-fill,minmax(50px,1fr))", boxes(2)),
        card("repeat(auto-fit, minmax(50px, 1fr)): 2 items", gb + "grid-template-columns:repeat(auto-fit,minmax(50px,1fr))", boxes(2)),
        card("repeat(auto-fit, minmax(50px, 1fr)): 7 items", gb + "grid-template-columns:repeat(auto-fit,minmax(50px,1fr))", boxes(7)),
    ],
    code="/* The line you'll use most */\ngrid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));")

G += section(
    "Rows", "`grid-template-rows` for explicit rows, `grid-auto-rows` for the rest.",
    [
        card("grid-template-rows: 20px 50px", gb + "grid-template-columns:1fr 1fr;grid-template-rows:20px 50px", boxes(4)),
        card("grid-auto-rows: 30px", gb + "grid-template-columns:1fr 1fr 1fr;grid-auto-rows:30px", boxes(6)),
        card("grid-template-rows: auto 1fr auto (pancake)", gb + "grid-template-rows:auto 1fr auto;height:120px", boxes(3, ["Header", "Main", "Footer"])),
        card("grid-auto-rows: 1fr (equal-height rows)", gb + "grid-template-columns:1fr 1fr;grid-auto-rows:1fr", boxes(4, ["Short", "Much longer text here", "C", "D"])),
    ])

G += section(
    "Placing items", "Lines are numbered from 1; negative numbers count from the end.",
    [
        card("grid-column: 1 / -1 (full width)", gb + "grid-template-columns:repeat(3,1fr)", boxes(4, styles=["grid-column:1 / -1", "", "", ""])),
        card("grid-column: span 2", gb + "grid-template-columns:repeat(3,1fr)", boxes(4, styles=["grid-column:span 2", "", "", ""])),
        card("grid-row: span 2", gb + "grid-template-columns:repeat(3,1fr);grid-auto-rows:26px", boxes(5, styles=["grid-row:span 2", "", "", "", ""])),
        card("grid-column: 2 / 4", gb + "grid-template-columns:repeat(3,1fr)", boxes(3, styles=["grid-column:2 / 4", "", ""])),
        card("grid-area: 1 / 1 (stack items)", gb, boxes(2, ["Under", "Over"], ["grid-area:1/1;height:60px", "grid-area:1/1;place-self:center;z-index:1"])),
        card("big tile: column + row span 2", gb + "grid-template-columns:repeat(3,1fr);grid-auto-rows:24px", boxes(6, styles=["grid-column:span 2;grid-row:span 2"] + [""] * 5)),
    ])

G += section(
    "Named areas", "Draw the layout as text. Each name must form a rectangle; `.` leaves a cell empty.",
    [
        card('"h h" "s m" "f f"', gb + "grid-template-columns:40px 1fr;grid-template-areas:'h h' 's m' 'f f'",
             boxes(4, ["h", "s", "m", "f"], ["grid-area:h", "grid-area:s", "grid-area:m;min-height:30px", "grid-area:f"])),
        card('"h h h" "n m a" "f f f"', gb + "grid-template-columns:30px 1fr 30px;grid-template-areas:'h h h' 'n m a' 'f f f'",
             boxes(5, ["h", "n", "m", "a", "f"], ["grid-area:h", "grid-area:n", "grid-area:m;min-height:30px", "grid-area:a", "grid-area:f"])),
        card('"a a b" "a a c" ". d d"', gb + "grid-template-columns:repeat(3,1fr);grid-auto-rows:22px;grid-template-areas:'a a b' 'a a c' '. d d'",
             boxes(4, ["a", "b", "c", "d"], ["grid-area:a", "grid-area:b", "grid-area:c", "grid-area:d"])),
    ],
    code='''.page {
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "side   main"
    "footer footer";
}
header { grid-area: header; }''')

G += section(
    "`grid-auto-flow`", "How auto-placed items fill the grid.",
    [
        card("grid-auto-flow: row (leaves a hole)", gb + "grid-template-columns:repeat(3,1fr);grid-auto-flow:row", boxes(4, styles=["", "grid-column:span 3", "", ""])),
        card("grid-auto-flow: row dense (fills it)", gb + "grid-template-columns:repeat(3,1fr);grid-auto-flow:row dense", boxes(4, styles=["", "grid-column:span 3", "", ""])),
        card("grid-auto-flow: column", gb + "grid-template-rows:repeat(2,auto);grid-auto-flow:column", boxes(6)),
    ])

G += section(
    "Aligning items inside their cells", "`justify-*` = inline (horizontal) axis, `align-*` = block (vertical) axis, `place-*` = both.",
    [card(label, gb + "grid-template-columns:1fr 1fr;grid-auto-rows:40px;" + css, boxes(2))
     for label, css in [
         ("justify-items: stretch", "justify-items:stretch"),
         ("justify-items: start", "justify-items:start"),
         ("justify-items: center", "justify-items:center"),
         ("justify-items: end", "justify-items:end"),
         ("align-items: start", "align-items:start"),
         ("align-items: center", "align-items:center"),
         ("align-items: end", "align-items:end"),
         ("place-items: center", "place-items:center"),
     ]])

G += section(
    "Aligning the whole grid in its container", "Only matters when the tracks are smaller than the container.",
    [card(f"justify-content: {v}", gb + f"grid-template-columns:repeat(3,28px);justify-content:{v}", boxes(3))
     for v in ["start", "center", "end", "space-between", "space-around", "space-evenly"]])

G += section(
    "Per-item alignment", "`justify-self`, `align-self`, `place-self`.",
    [card(f"2nd: {css}", gb + "grid-template-columns:1fr 1fr 1fr;grid-auto-rows:60px", boxes(3, styles=["", css, ""]))
     for css in ["justify-self:start", "justify-self:end", "align-self:start", "align-self:end", "place-self:center"]])

G += section(
    "Layout recipes", "Common page and component layouts in one or two lines.",
    [
        card("centre anything: place-items: center", gb + "place-items:center;height:96px", boxes(1, ["●"])),
        card("sidebar: 60px 1fr", gb + "grid-template-columns:60px 1fr;min-height:70px", boxes(2, ["Side", "Main"])),
        card("holy grail: 30px 1fr 30px + areas", gb + "grid-template-columns:30px 1fr 30px;grid-template-areas:'h h h' 'n m a' 'f f f'",
             boxes(5, ["H", "N", "Main", "A", "F"], ["grid-area:h", "grid-area:n", "grid-area:m;min-height:30px", "grid-area:a", "grid-area:f"])),
        card("12-col: span 8 + span 4", gb + "grid-template-columns:repeat(12,minmax(0,1fr))", boxes(4, ["8", "4", "6", "6"], ["grid-column:span 8", "grid-column:span 4", "grid-column:span 6", "grid-column:span 6"])),
        card("bento: big + tall + wide", gb + "grid-template-columns:repeat(3,1fr);grid-auto-rows:22px;grid-auto-flow:dense",
             boxes(5, ["big", "tall", "s", "wide", "s"], ["grid-column:span 2;grid-row:span 2", "grid-row:span 2", "", "grid-column:span 2", ""])),
        card("full-bleed: [full] [content] [full]", gb + "grid-template-columns:[full-start] 1fr [content-start] 3fr [content-end] 1fr [full-end]",
             boxes(3, ["text", "full-bleed", "text"], ["grid-column:content-start/content-end", "grid-column:full-start/full-end", "grid-column:content-start/content-end"])),
    ])

G += [
    "## Property reference",
    "",
    "| Property | Applies to | Example values |",
    "|---|---|---|",
    "| `display` | container | `grid` · `inline-grid` |",
    "| `grid-template-columns` / `-rows` | container | `200px 1fr` · `repeat(3, 1fr)` · `repeat(auto-fit, minmax(200px, 1fr))` · `subgrid` |",
    "| `grid-template-areas` | container | `\"a b\" \"c d\"` |",
    "| `grid-template` | container | `auto 1fr / 200px 1fr` (rows / columns) |",
    "| `grid-auto-rows` / `-columns` | container | `100px` · `minmax(80px, auto)` · `1fr` |",
    "| `grid-auto-flow` | container | `row` · `column` · `dense` · `row dense` |",
    "| `gap` / `row-gap` / `column-gap` | container | `1rem` · `1rem 2rem` |",
    "| `justify-items` / `align-items` / `place-items` | container | `start` · `center` · `end` · `stretch` · `baseline` |",
    "| `justify-content` / `align-content` / `place-content` | container | `start` · `center` · `end` · `space-between` · `space-around` · `space-evenly` · `stretch` |",
    "| `grid-column` / `grid-row` | item | `1 / 3` · `span 2` · `1 / -1` · `content` (named lines) |",
    "| `grid-column-start` / `-end`, `grid-row-start` / `-end` | item | `2` · `span 3` · `-1` |",
    "| `grid-area` | item | `main` · `1 / 1 / 3 / 3` (row-start / col-start / row-end / col-end) |",
    "| `justify-self` / `align-self` / `place-self` | item | `start` · `center` · `end` · `stretch` |",
    "| `order` | item | integer |",
    "",
    "## Functions and keywords",
    "",
    "| Thing | Means |",
    "|---|---|",
    "| `fr` | A share of the free space after fixed tracks and gaps |",
    "| `repeat(n, track)` | Repeat a track pattern n times |",
    "| `minmax(min, max)` | A track that's at least `min` and at most `max` |",
    "| `auto-fill` | As many tracks as fit; keeps empty ones |",
    "| `auto-fit` | As many tracks as fit; collapses empty ones |",
    "| `min-content` / `max-content` / `fit-content(x)` | Size from the content's smallest / largest / clamped width |",
    "| `subgrid` | Use the parent grid's tracks for this axis |",
    "| `span n` | Cover n tracks from the auto-placed or given start |",
    "| `-1` | The last explicit grid line |",
    "",
    "## Gotchas",
    "",
    "| Symptom | Cause | Fix |",
    "|---|---|---|",
    "| One `1fr` column is wider than the others | `1fr` = `minmax(auto, 1fr)`, and long content sets the minimum | `minmax(0, 1fr)` |",
    "| `1 / -1` doesn't reach the last column | `-1` only counts **explicit** tracks | Define columns explicitly, or use `span` |",
    "| Areas template is ignored | Rows have different cell counts, or an area isn't rectangular | Check every string has the same number of cells |",
    "| Visual order differs from tab order | `dense`, `order`, or explicit placement | Keep DOM order logical; avoid `dense` for content people read in order |",
    "| Grid overflows on tiny screens | `minmax(300px, 1fr)` is wider than the screen | `minmax(min(300px, 100%), 1fr)` |",
    "| Sticky item in a grid doesn't stick | Grid items stretch to the row height | `align-self: start` |",
    "",
]

os.makedirs(OUT_DIR, exist_ok=True)
for name, lines in [("flexbox.md", F), ("grid.md", G)]:
    with open(os.path.join(OUT_DIR, name), "w") as fh:
        fh.write("\n".join(lines))
    print("wrote", name)
