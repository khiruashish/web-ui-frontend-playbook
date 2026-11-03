# 5. Listing Page: Filters, Sort & Layout

<span class="lvl lvl-2">Intermediate</span>

A **listing page** (also called a category page or PLP, product listing page) shows many products with **filters** on the side and a
**toolbar** (result count + sort) above the grid. On a phone the sidebar collapses into a "Filters" button.

## What you see

<iframe src="../demos/05-listing.html" title="Listing with filters: live demo" style="width:100%;height:640px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Tick **Dairy & Eggs**, then sort by price. Open it full-size: [05-listing.html](demos/05-listing.html){ target=_blank } and make the
window narrower than 900 px: the sidebar becomes a collapsed **Filters** button above the products.

=== "Phone (< 900 px)"

    ```text
    ┌──────────────────────────┐
    │ ▸ Filters                │  ← <details>, closed
    ├──────────────────────────┤
    │ Showing 8 products       │
    │ Sort by [Relevance ▾]    │  ← wraps onto 2 lines
    ├────────────┬─────────────┤
    │  card      │  card       │
    └────────────┴─────────────┘
    ```

=== "Desktop (≥ 900 px)"

    ```text
    ┌────────────┬──────────────────────────────────────────┐
    │ ▾ Filters  │ Showing 8 products     Sort by [Relevance ▾] │
    │ CATEGORY   ├──────────┬──────────┬──────────┬──────────┤
    │ ☐ Fruits   │  card    │  card    │  card    │  card    │
    │ ☐ Veg      │          │          │          │          │
    │ OFFERS     ├──────────┼──────────┼──────────┼──────────┤
    │ ☐ Deals    │  card    │  card    │  card    │  card    │
    └────────────┴──────────┴──────────┴──────────┴──────────┘
       240 px                      1fr
    ```

## The page layout

The full section is long because it holds eight product cards, so here is its outline (the real code is in
[`store.html`](demos/store.html){ target=_blank }):

```html
<section class="section" id="shop" aria-labelledby="shop-title">
  <div class="section-head">
    <h2 id="shop-title">Daily essentials</h2>     <!-- section heading from lesson 3 -->
  </div>

  <div class="listing">                          <!-- the 2-column grid -->
    <details class="filters" data-filters>…</details>   <!-- column 1: sidebar -->

    <div>                                        <!-- column 2: one wrapper for toolbar + grid -->
      <div class="toolbar">…</div>
      <div class="product-grid" data-product-grid>
        <article class="product-card">…</article>      <!-- × 8, from lesson 4 -->
      </div>
    </div>
  </div>
</section>
```

| Code | What it does |
|---|---|
| `id="shop"` | The target of the hero's "Shop now" link. |
| `<div class="listing">` | The grid container. It has **exactly two children**, so it becomes exactly two columns. |
| the second `<div>` | Without this wrapper, the toolbar and the product grid would become two separate grid cells and land in the wrong places. Wrapping them keeps them together in column 2. |

```css
--8<-- "docs/ecommerce/demos/css/listing.css:layout"
```

| Code | What it does |
|---|---|
| `.listing { display: grid; grid-template-columns: 1fr; }` | Phone: one column. Filters on top, products below. |
| `gap: var(--space-4);` | 16 px between sidebar and products. |
| `align-items: start;` | Without it, grid stretches the sidebar to the full height of the product column. `start` keeps it its natural height (needed for `sticky` below). |
| `@media (width >= 900px)` → `grid-template-columns: 240px 1fr;` | Desktop: a fixed 240 px sidebar and the products in all the remaining space. We use 900 px here (not 768 px) because a sidebar + 2 product columns needs the room. |

## ⑩ Filters: `<details>` + `<fieldset>`

```html
--8<-- "docs/ecommerce/demos/store.html:filters"
```

| Code | What it does |
|---|---|
| `<details class="filters" data-filters>` | A built-in **disclosure**: a box that opens and closes when you click its `<summary>`. Works with keyboard and screen readers, no JavaScript needed. |
| `<summary>Filters</summary>` | The always-visible clickable heading, with a ▸ / ▾ marker. |
| `<fieldset>` | Groups related form controls. |
| `<legend>Category</legend>` | The fieldset's title. Screen readers say "Category, group" before reading the checkboxes, so "Fruits" is heard in context. |
| `<label><input type="checkbox" name="category" value="fruits"> Fruits</label>` | Wrapping the input **inside** the label connects them without `for`/`id`, and makes the text clickable too (a bigger target). `value` is what JavaScript reads. |
| `name="deals" value="yes"` | A separate checkbox for "only discounted items". |

```css
--8<-- "docs/ecommerce/demos/css/listing.css:filters"
```

| Code | What it does |
|---|---|
| `.filters { border; border-radius; background }` | Makes the filter panel a white card. |
| `summary { padding; font-weight: 700; cursor: pointer; }` | A bold, clickable header. |
| `.filters[open] summary { border-bottom: … }` | The `open` attribute is present while the details is expanded; only then draw a line under the summary. |
| `fieldset { margin: 0; border: 0; padding: … }` | Removes the browser's default grooved border and indent. |
| `legend { text-transform: uppercase; font-size: 0.8rem; color: var(--muted); }` | Small, grey, uppercase group titles. |
| `label { display: flex; align-items: center; gap: … }` | Checkbox and text in a centred row. |
| `input { accent-color: var(--brand); width: 18px; height: 18px; }` | `accent-color` recolours native checkboxes and radios with **one line**, no custom checkbox hacks. |
| `@media (width >= 900px)` → `position: sticky; top: 96px;` | On desktop the sidebar stays in view while you scroll the products. 96 px leaves room for the sticky header. |

## ⑪ Toolbar: result count and sort

```html
--8<-- "docs/ecommerce/demos/store.html:toolbar"
```

```css
--8<-- "docs/ecommerce/demos/css/listing.css:toolbar"
```

| Code | What it does |
|---|---|
| `<p role="status">` | A **live region**: when JavaScript changes "8" to "3", screen readers announce "Showing 3 products" without moving focus. |
| `<strong data-result-count>8</strong>` | The number JavaScript updates. |
| `<label>Sort by <select data-sort>` | The `<select>` is inside its label, so it's named "Sort by". |
| `<option value="price-asc">` | `value` is the code JavaScript reads; the text is what users see. |
| `.toolbar { display: flex; flex-wrap: wrap; justify-content: space-between; }` | Count on the left, sort on the right; if they don't fit on a phone, `flex-wrap` moves the sort onto a second line instead of squashing it. |
| `gap: var(--space-2) var(--space-4);` | 8 px between lines when wrapped, 16 px between items in a row. |

## The JavaScript: filter, sort, and open the sidebar on desktop

```js
--8<-- "docs/ecommerce/demos/js/store.js:filters"
```

| Code | What it does |
|---|---|
| `const filters = document.querySelector("[data-filters]");` | Grab the three elements we need once, at the start. |
| `function applyFilters()` | Runs every time a checkbox changes. |
| `[...filters.querySelectorAll("input[name=category]:checked")]` | Every **ticked** category checkbox. `[...]` turns the NodeList into an array so we can use `.map()`. |
| `.map((input) => input.value)` | → e.g. `["fruits", "dairy"]`. |
| `const dealsOnly = …checked;` | `true` if "Only discounted items" is ticked. |
| `const categoryOk = checked.length === 0 || checked.includes(card.dataset.category);` | Nothing ticked means "show all categories"; otherwise the card's category must be in the list. |
| `const dealOk = !dealsOnly || card.hasAttribute("data-deal");` | If deals-only is on, the card must have `data-deal`. |
| `card.hidden = !(categoryOk && dealOk);` | Hide cards that fail either test. The grid closes the gaps automatically. |
| `resultCount.textContent = shown;` | Update "Showing N products" (and the live region announces it). |
| `function applySort()` | Runs when the sort dropdown changes. |
| `const cards = [...grid.querySelectorAll(".product-card")];` | All cards as an array. |
| `cards.sort((a, b) => price(a) - price(b));` | Sort by price, low to high. A negative result puts `a` first. Swap `a` and `b` for high to low. |
| `cards.sort((a, b) => a.dataset.order - b.dataset.order);` | "Relevance" = the original order, which we saved in `data-order` at start-up. |
| `grid.append(...cards);` | `append()` **moves** each existing card to the end, in the new order. Nothing is re-created, so each card keeps its state (quantity, focus). |
| `if (filters && grid) { … }` | Only wire this up on pages that have filters (the product-card demo doesn't). |
| `card.dataset.order = i` | Remember each card's original position for "Relevance". |
| `filters.addEventListener("change", applyFilters);` | One listener on the `<details>` catches changes from every checkbox inside it (delegation again). |
| `window.matchMedia("(width >= 900px)")` | The **same media query as the CSS**, in JavaScript. |
| `filters.open = desktop.matches;` | On desktop open the `<details>` so the sidebar is fully visible; on phones keep it closed. |
| `desktop.addEventListener("change", sync);` | Re-run when the window is resized across 900 px or a tablet is rotated. |

!!! tip "Senior note: filters belong in the URL"
    In a real store, filters and sort are written to the URL (`?category=dairy&sort=price-asc`) with `history.replaceState()` and
    usually fetched from the server. Then a filtered page can be shared, bookmarked, and survives a refresh. Read the starting state
    with `new URLSearchParams(location.search)`.

## Try it

1. Add a **Price** fieldset with radio buttons ("Under ₹50", "₹50–₹100", "Over ₹100") and extend `applyFilters()`.
2. Add a "Clear all" button that unticks every checkbox and calls `applyFilters()`.
3. Show "No products match these filters" when `shown === 0`.

## Common mistakes

* Building the filters toggle with a `<div>` and JavaScript. `<details>` is accessible and works with no JS at all.
* Removing cards from the DOM to filter and re-creating them later: you lose quantities and focus. Toggle `hidden`.
* A sidebar with a fixed `height` and its own scrollbar inside a scrolling page (two scrollbars). Use `position: sticky`.
* Different breakpoints in CSS and JS (900 px in one, 1024 px in the other). Keep them identical.
