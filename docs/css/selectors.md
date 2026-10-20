# Selectors (CSS1 → Selectors Level 4)

Every demo on this page is live: the Output box uses the exact selector shown, scoped to that demo.

## Basic selectors <span class="lvl lvl-1">Beginner</span> { #basic-selectors data-toc-label="Basic selectors" }

| Selector | Example | Selects |
|---|---|---|
| Type | `p` | Every `<p>` |
| Class | `.card` | Elements with `class="card"` (or `class="big card"`) |
| ID | `#header` | The element with `id="header"` |
| Universal | `*` | Every element |
| Grouping | `h1, h2, h3` | All of the listed selectors |
| Compound | `button.primary` | `<button>` that also has class `primary` (no space!) |

```html
<p>Type selector</p>
<p class="hl">Class selector</p>
<p id="special">ID selector</p>
<button class="primary">Compound: button.primary</button>
```

```css
p { color: gray; }
.hl { background: yellow; }
#special { font-weight: bold; color: crimson; }
button.primary { background: royalblue; color: white; }
```

<div class="demo sel-basic">
<p>Type selector</p>
<p class="hl">Class selector</p>
<p id="sel-special">ID selector</p>
<button class="primary">Compound: button.primary</button>
<style>
  .sel-basic p { color: gray; }
  .sel-basic .hl { background: yellow; color: #222; }
  .sel-basic #sel-special { font-weight: bold; color: crimson; }
  .sel-basic button.primary { background: royalblue; color: white; border: 0; padding: .4em .9em; border-radius: 6px; }
</style>
</div>

## Combinators <span class="lvl lvl-1">Beginner</span> { #combinators data-toc-label="Combinators" }

| Combinator | Example | Selects |
|---|---|---|
| Descendant (space) | `nav a` | Every `a` anywhere inside `nav` |
| Child `>` | `ul > li` | Only `li` that are direct children of `ul` |
| Next sibling `+` | `h2 + p` | The `p` immediately after an `h2` |
| Subsequent siblings `~` | `h2 ~ p` | Every `p` after an `h2`, same parent |

```html
<div class="tree">
  <h4>Heading</h4>
  <p>1st p (h4 + p → orange)</p>
  <p>2nd p (h4 ~ p → underlined)</p>
  <div><p>Nested p (descendant only → italic)</p></div>
</div>
```

```css
.tree p       { font-style: italic; }       /* descendant: all 3 */
.tree > p     { font-weight: bold; }        /* child: only first 2 */
.tree h4 + p  { color: orange; }            /* next sibling: 1st */
.tree h4 ~ p  { text-decoration: underline; } /* subsequent siblings: 1st and 2nd */
```

<div class="demo">
<div class="sel-tree">
  <h4 style="margin:0">Heading</h4>
  <p>1st p (h4 + p → orange)</p>
  <p>2nd p (h4 ~ p → underlined)</p>
  <div><p>Nested p (descendant only → italic)</p></div>
</div>
<style>
  .sel-tree p { font-style: italic; margin: .2em 0; }
  .sel-tree > p { font-weight: bold; }
  .sel-tree h4 + p { color: orange; }
  .sel-tree h4 ~ p { text-decoration: underline; }
</style>
</div>

## Attribute selectors <span class="lvl lvl-2">Intermediate</span> { #attribute-selectors data-toc-label="Attribute selectors" }

| Selector | Matches when the attribute… |
|---|---|
| `[href]` | exists |
| `[type="email"]` | equals exactly |
| `[class~="card"]` | is a space-separated list containing the word |
| `[lang\|="en"]` | equals `en` or starts with `en-` |
| `[href^="https"]` | starts with |
| `[href$=".pdf"]` | ends with |
| `[href*="example"]` | contains |
| `[data-state="open" i]` | case-insensitive match |

```css
a[href^="http"]::after { content: " ↗"; }
a[href$=".pdf"]::after { content: " (PDF)"; }
a[href^="mailto:"]     { color: seagreen; }
```

<div class="demo sel-attr">
<a href="https://example.com">External link</a> ·
<a href="#attribute-selectors">guide.pdf</a> ·
<a href="mailto:hi@example.com">Email us</a>
<style>
  .sel-attr a[href^="http"]::after { content: " ↗"; }
  .sel-attr a[href="#attribute-selectors"]::after { content: " (PDF)"; }
  .sel-attr a[href^="mailto:"] { color: seagreen; }
</style>
</div>

(The PDF demo matches on its `href` directly, so the link stays clickable inside this site.)

## User-action pseudo-classes <span class="lvl lvl-1">Beginner</span> { #user-action-pseudo-classes data-toc-label="User-action pseudo-classes" }

```css
a:link     { }  /* unvisited */
a:visited  { }  /* visited (only colour properties allowed: privacy) */
a:hover    { }  /* pointer over it */
a:active   { }  /* being pressed */
:focus     { }  /* has focus (any method) */
:focus-visible { }  /* has focus AND the browser thinks a ring should show (keyboard) */
:focus-within  { }  /* it or any descendant has focus */
```

Order for links: **L**o**V**e **HA**te (`:link`, `:visited`, `:hover`, `:active`).

```html
<form class="ff"><input placeholder="Click or tab into me"> <button>Hover / focus me</button></form>
```

```css
.ff:focus-within { background: #fff1ea; }
.ff button:hover { background: #e4572e; color: white; }
.ff button:active { transform: scale(.95); }
.ff :focus-visible { outline: 3px solid royalblue; outline-offset: 2px; }
```

<div class="demo">
<form class="sel-ff" onsubmit="return false"><input placeholder="Click or tab into me"> <button>Hover / focus me</button></form>
<style>
  .sel-ff { padding: .8em; border-radius: 8px; transition: background .2s; }
  .sel-ff:focus-within { background: #fff1ea; }
  .sel-ff button { transition: transform .1s; }
  .sel-ff button:hover { background: #e4572e; color: white; }
  .sel-ff button:active { transform: scale(.95); }
  .sel-ff :focus-visible { outline: 3px solid royalblue; outline-offset: 2px; }
</style>
</div>

!!! warning "Never remove focus outlines without a replacement"
    `*:focus { outline: none }` makes the site unusable by keyboard. Use `:focus-visible` to show a strong ring for keyboard users without showing it on mouse click.

## Structural pseudo-classes <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-2">Intermediate</span> { #structural-pseudo-classes data-toc-label="Structural pseudo-classes" }

| Selector | Selects |
|---|---|
| `:first-child` / `:last-child` | First / last child of its parent |
| `:only-child` | The only child |
| `:nth-child(2)` | The 2nd child |
| `:nth-child(odd)` / `(even)` | Odd / even children |
| `:nth-child(3n+1)` | 1st, 4th, 7th… |
| `:nth-child(-n+3)` | First three |
| `:nth-last-child(2)` | 2nd from the end |
| `:nth-child(2 of .done)` | The 2nd element that has `.done` (Selectors 4, Baseline 2023) |
| `:first-of-type`, `:nth-of-type()` | Same, but counting only elements of the same tag |
| `:empty` | No children (not even text) |
| `:root` | The `<html>` element |

```css
.list li:nth-child(odd)   { background: #f2f2f2; }
.list li:first-child      { font-weight: bold; }
.list li:nth-child(-n+3)  { color: #e4572e; }
.list li:last-child       { border-bottom: 2px solid; }
```

<div class="demo">
<ul class="sel-list">
  <li>One</li><li>Two</li><li>Three</li><li>Four</li><li>Five</li><li>Six</li>
</ul>
<style>
  .sel-list { list-style: none; padding: 0; margin: 0; max-width: 260px; }
  .sel-list li { padding: .25em .5em; margin: 0; }
  .sel-list li:nth-child(odd) { background: rgba(128,128,128,.15); }
  .sel-list li:first-child { font-weight: bold; }
  .sel-list li:nth-child(-n+3) { color: #e4572e; }
  .sel-list li:last-child { border-bottom: 2px solid; }
</style>
</div>

### Quantity queries <span class="lvl lvl-3">Advanced</span> { #quantity-queries data-toc-label="Quantity queries" }

Style a list differently depending on how many items it has:

```css
/* If there are 4 or more items, make them all smaller */
li:nth-last-child(n+4), li:nth-last-child(n+4) ~ li { font-size: .85em; }

/* Same idea, much easier, with :has() */
ul:has(> li:nth-child(4)) li { font-size: .85em; }
```

## Form-state pseudo-classes <span class="lvl lvl-2">Intermediate</span> { #form-state-pseudo-classes data-toc-label="Form-state pseudo-classes" }

| Selector | Matches |
|---|---|
| `:checked` | Checked checkbox / radio / selected option |
| `:disabled` / `:enabled` | Disabled or enabled control |
| `:required` / `:optional` | Has / lacks `required` |
| `:valid` / `:invalid` | Passes / fails validation (immediately) |
| `:user-valid` / `:user-invalid` | Same, but only after user interaction (Baseline 2023) |
| `:placeholder-shown` | Input is showing its placeholder (i.e. empty) |
| `:in-range` / `:out-of-range` | Number/date within `min`/`max` |
| `:read-only` / `:read-write` | Editable or not |
| `:indeterminate` | Indeterminate checkbox, radio group with nothing chosen, progress without value |
| `:default` | Default button / option / checked box |
| `:autofill` | Field filled by the browser |
| `:open` | Open `details`, `dialog`, `select` picker (2025) |
| `:popover-open` | A popover that's showing |

```html
<label class="todo"><input type="checkbox"> Buy milk</label>
<input class="age" type="number" min="18" max="99" value="12">
```

```css
.todo:has(:checked) { text-decoration: line-through; opacity: .6; }
.age:out-of-range { border: 2px solid crimson; background: #ffecec; }
```

<div class="demo sel-form">
<label class="todo"><input type="checkbox"> Buy milk (tick me)</label><br><br>
<label>Age (18–99): <input class="age" type="number" min="18" max="99" value="12"></label>
<style>
  .sel-form .todo:has(:checked) { text-decoration: line-through; opacity: .6; }
  .sel-form .age:out-of-range { border: 2px solid crimson; background: #ffecec; color: #222; }
  .sel-form .age:in-range { border: 2px solid seagreen; }
</style>
</div>

## Logical pseudo-classes: `:is()`, `:where()`, `:not()`, `:has()` <span class="lvl lvl-2">Intermediate</span> → <span class="lvl lvl-3">Advanced</span> { #logical-pseudo-classes-is-where-not-has data-toc-label="Logical pseudo-classes: :is(), :where(), :not(), :has()" }

```css
/* :is(): shorter selectors. Specificity = most specific argument */
:is(h1, h2, h3):hover { color: #e4572e; }
article :is(h2, h3) { margin-top: 2em; }

/* :where(): same as :is() but specificity 0. Perfect for resets and libraries */
:where(ul, ol)[role="list"] { list-style: none; padding: 0; }

/* :not(): exclude. Accepts a selector list */
.btn:not(.primary, .danger) { background: #eee; }
li:not(:last-child) { border-bottom: 1px solid #ddd; }
```

### `:has()`, the "parent selector" <span class="lvl lvl-3">Advanced</span> <small>Baseline 2023</small> { #has-the-parent-selector data-toc-label=":has(), the &quot;parent selector&quot;" }

`:has()` selects an element based on what's **inside it** or **after it**. It replaces a huge amount of JavaScript "add a class to the parent" code.

```css
/* A card that contains an image gets a different layout */
.card:has(img) { display: grid; grid-template-columns: 80px 1fr; }

/* A form field whose input is invalid gets a red label */
.field:has(input:user-invalid) label { color: crimson; }

/* Highlight the h2 that's directly followed by a p */
h2:has(+ p) { margin-bottom: 0; }

/* Dark mode toggle with no JS */
:root:has(#dark:checked) { color-scheme: dark; }

/* Dim siblings of the hovered card */
.grid:has(.card:hover) .card:not(:hover) { opacity: .5; }
```

<div class="demo">
<div class="sel-has">
  <div class="cardx"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' rx='8' fill='%23e4572e'/%3E%3C/svg%3E" alt="" width="60" height="60"><span>Card with an image → becomes a grid</span></div>
  <div class="cardx"><span>Card without an image → stays a block</span></div>
  <div class="cardx"><span>Hover any card: the others dim</span></div>
</div>
<style>
  .sel-has { display: flex; flex-wrap: wrap; gap: .6em; }
  .sel-has .cardx { flex: 1 1 180px; padding: .7em; border: 1px solid #c9ced6; border-radius: 10px; transition: opacity .2s; }
  .sel-has .cardx:has(img) { display: grid; grid-template-columns: 60px 1fr; gap: .7em; align-items: center; }
  .sel-has:has(.cardx:hover) .cardx:not(:hover) { opacity: .4; }
</style>
</div>

## Other pseudo-classes <span class="lvl lvl-2">Intermediate</span> { #other-pseudo-classes data-toc-label="Other pseudo-classes" }

| Selector | Use |
|---|---|
| `:target` | The element whose id matches the URL `#hash` |
| `:lang(fr)` | Elements in a language |
| `:dir(rtl)` | Elements by text direction |
| `:any-link` | Any `a`/`area` with `href` |
| `:defined` | Custom elements that have been defined (hide un-upgraded ones) |
| `:fullscreen`, `:modal` | Fullscreen element; modal dialog |
| `:state(checked)` | Custom element internal state (Baseline 2024) |
| `:host`, `:host()`, `:host-context()` | Shadow DOM host |

## Pseudo-elements <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-2">Intermediate</span> { #pseudo-elements data-toc-label="Pseudo-elements" }

Pseudo-elements style a **part** of an element, or insert generated content. They use **two colons**.

| Pseudo-element | Styles |
|---|---|
| `::before` / `::after` | Generated box before/after the content (needs `content`) |
| `::first-letter` | First letter (drop caps) |
| `::first-line` | First rendered line |
| `::marker` | List bullet / number, `summary` triangle |
| `::placeholder` | Input placeholder text |
| `::selection` | Text the user selected |
| `::file-selector-button` | The button inside `input[type=file]` |
| `::backdrop` | The layer behind a modal dialog / popover / fullscreen element |
| `::part(name)` | A shadow-DOM part exposed by a web component |
| `::slotted()` | Slotted content (inside shadow CSS) |
| `::cue` | Video captions |
| `::details-content` | The collapsible part of `<details>` (2025) |
| `::picker(select)` | The drop-down of a customizable select (2025) |
| `::view-transition-*` | View transition snapshots |
| `::scroll-marker`, `::scroll-button()` | CSS carousels (Chromium 135+) |

```css
.quote::before { content: "“"; font-size: 3em; color: #e4572e; line-height: 0; vertical-align: -.4em; }
.drop::first-letter { float: left; font-size: 3em; line-height: 1; padding-right: .1em; color: #3f51b5; }
.tick li::marker { content: "✔ "; color: seagreen; }
.sel::selection { background: #e4572e; color: white; }
.req::after { content: " *"; color: crimson; }
```

<div class="demo sel-pe">
<p class="quote">Design is how it works.</p>
<p class="drop">Once upon a time, the web was mostly text. Drop caps were one of the first typographic tricks that CSS made easy.</p>
<ul class="tick"><li>Semantic HTML</li><li>Accessible forms</li></ul>
<p class="sel">Select this text to see a custom highlight.</p>
<label class="req">Email</label>
<style>
  .sel-pe .quote::before { content: "\201C"; font-size: 3em; color: #e4572e; line-height: 0; vertical-align: -.4em; margin-right: .05em; }
  .sel-pe .drop::first-letter { float: left; font-size: 3em; line-height: 1; padding-right: .1em; color: #3f51b5; }
  .sel-pe .tick li::marker { content: "\2714  "; color: seagreen; }
  .sel-pe .sel::selection { background: #e4572e; color: white; }
  .sel-pe .req::after { content: " *"; color: crimson; }
</style>
</div>

!!! tip "Senior note · 🟠 Advanced"
    Text inside `content` on `::before`/`::after` **is** read by most screen readers. For decorative icons, use the alt-text syntax `content: "★" / "";` to give it an empty accessible name.

## Nesting <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2023</small> { #nesting data-toc-label="Nesting" }

Native CSS nesting works like Sass nesting:

```css
.card {
  padding: 1rem;

  & h3 { margin: 0; }          /* .card h3 */
  &:hover { box-shadow: 0 4px 12px #0002; }   /* .card:hover */
  &.featured { border: 2px solid gold; }      /* .card.featured */
  .theme-dark & { background: #222; }         /* .theme-dark .card */

  @media (width >= 600px) { padding: 2rem; }  /* media query inside */
}
```

The `&` is optional before a nested type selector in current browsers (`h3 { }` works), but keep it for clarity and older-browser safety.

## Selector performance <span class="lvl lvl-4">Expert</span> { #selector-performance data-toc-label="Selector performance" }

Browsers match selectors **right to left**: for `.nav li a`, they find every `a`, then check if it's inside an `li`, inside `.nav`. In practice, selector matching is rarely a bottleneck on modern engines. What actually costs time is **style invalidation**: a change that forces re-matching for many elements, such as toggling a class on `<body>` that a large `:has()` selector depends on. Keep `:has()` arguments narrow (`.card:has(> img)` rather than `body:has(.x)`), and use the DevTools Performance panel's "Selector stats" to find the expensive ones.
