# Glossary

<span class="lvl lvl-1">Beginner</span>

Short, plain-English definitions of the words this playbook uses. When a page uses a word you don't know, look here first.

## HTML

Element
:   One piece of a page, written as an opening tag, content and a closing tag: `<p>Hello</p>`. Some elements have no content or closing tag (`<img>`, `<input>`).

Attribute
:   Extra information on an opening tag: `<a href="/cart">`. `href` is the attribute name, `/cart` its value.

Semantic HTML
:   Choosing the element that matches the **meaning** (`<button>`, `<nav>`, `<h2>`) instead of a generic `<div>`. Browsers, search engines and screen readers all understand it for free.

Landmark
:   A region screen-reader users can jump to: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<form role="search">`.

Data attribute
:   A custom attribute starting with `data-` (`data-price="18900"`) that holds information for JavaScript. Read it with `element.dataset.price`.

Accessible name
:   What a screen reader announces for a control: the button's text, a `<label>`, or an `aria-label`. Every button, link and input needs one.

ARIA
:   Attributes (`aria-label`, `aria-current`, `aria-hidden`, `aria-live`…) that add accessibility information HTML can't express on its own. First rule of ARIA: use a native element if one exists.

DOM
:   Document Object Model: the browser's live tree of elements built from your HTML. JavaScript reads and changes the DOM, not the HTML file.

## CSS

Selector
:   The part before `{` that picks which elements a rule applies to: `.product-card`, `nav a`, `[aria-current="page"]`.

Specificity
:   How the browser decides which of two conflicting rules wins. Roughly: id > class / attribute / pseudo-class > element. Equal specificity → the later rule wins.

Cascade
:   The full set of rules (origin, `@layer`, specificity, order) that decides the final value of every property.

Box model
:   Every element is a box: content, then padding, then border, then margin. `box-sizing: border-box` makes `width` include padding and border.

Custom property / CSS variable / design token
:   A named value, `--brand: #0c831f`, used with `var(--brand)`. A **design token** is a custom property that stores a design decision (colour, spacing, radius).

`rem`, `em`, `px`, `%`, `vw`, `dvh`, `ch`, `fr`
:   Units. `rem` = root font size (16 px by default). `em` = this element's font size. `vw` = 1 % of the window width. `dvh` = 1 % of the visible screen height on phones. `ch` = width of a "0". `fr` = one share of the free space in a grid.

Flexbox
:   A layout mode for items in **one direction** (a row or a column): `display: flex`.

Grid
:   A layout mode for **rows and columns** at the same time: `display: grid`.

`auto-fill` / `auto-fit`
:   With `repeat(auto-fill, minmax(160px, 1fr))` the grid makes as many columns as fit. `auto-fit` additionally stretches the items when there are fewer than fit.

Media query
:   CSS that applies only when a condition is true, usually the screen width: `@media (width >= 768px) { … }`.

Breakpoint
:   A width at which the layout changes (768 px, 900 px…). Choose them where your design breaks, not by device names.

Mobile first
:   Write the phone CSS first (no media query), then add `@media (width >= …)` rules for bigger screens.

Container query
:   Like a media query, but asks about the width of a parent element instead of the screen: `@container (width > 400px)`.

Stacking context / `z-index`
:   Which element is drawn on top. `z-index` only works on positioned elements (and flex/grid items), and only within the same stacking context.

Pseudo-class / pseudo-element
:   `:hover`, `:focus-visible`, `:has()`, `:nth-child()` select elements in a **state**. `::before`, `::after`, `::backdrop` style a **part** that isn't in the HTML.

BEM
:   A class-naming convention: `block__element--modifier` (`.btn--outline`). Keeps CSS flat and predictable.

## JavaScript and the browser

Event
:   Something that happens (`click`, `input`, `change`, `keydown`). You react with `element.addEventListener("click", fn)`.

Event delegation
:   One listener on a parent handles events from all its children, using `event.target.closest(…)` to find which child was hit.

State
:   The data your UI is drawn from (the cart `Map` in the e-commerce tab). Change the state, then re-render; never let the screen become the only copy of the data.

`defer`
:   On `<script defer>`: download the script without blocking the page and run it once the HTML is parsed.

XSS
:   Cross-site scripting: an attacker's HTML/JS runs on your page because you inserted untrusted text with `innerHTML`. Use `textContent` for data.

## Performance and quality

Core Web Vitals
:   Google's three user-experience metrics: **LCP** (how fast the main content appears), **INP** (how fast the page responds to taps), **CLS** (how much the layout jumps).

Lazy loading
:   Loading something only when it's needed: `<img loading="lazy">` waits until the image is about to scroll into view.

Responsive images
:   `srcset` + `sizes` let the browser download the smallest image that looks sharp on the current screen.

WCAG
:   Web Content Accessibility Guidelines. Level **AA** is the usual legal and industry target (for example, 4.5 : 1 contrast for normal text).

Progressive enhancement
:   Build a version that works with plain HTML, then add CSS and JavaScript on top. If the JS fails, the page still works (the filters `<details>` in the e-commerce tab still opens without JS).

## E-commerce words

PLP / PDP
:   Product **Listing** Page (a grid of products with filters) / Product **Detail** Page (one product, full information).

SKU
:   Stock-keeping unit: one sellable item variant (e.g. "Shimla Apple, 1 kg").

CTA
:   Call to action: the one button you want people to press ("Shop now", "Add to cart").

Minor units
:   Storing money as whole numbers of the smallest unit (paise, cents) to avoid floating-point rounding errors.

Mini cart / cart drawer
:   A panel that shows the cart without leaving the current page.

Empty state
:   What a component shows when it has no data ("Your cart is empty"). Always design it.
