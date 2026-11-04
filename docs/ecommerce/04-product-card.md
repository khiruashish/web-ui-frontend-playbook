# 4. Product Card & Product Grid

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

The **product card** is the most important component in e-commerce: it's repeated hundreds of times and it's where people decide to
buy. Ours has six small parts, and the **ADD** button turns into a **− 1 +** quantity stepper once the item is in the cart.

## What you see

<iframe src="../demos/04-product-card.html" title="Product card and grid: live demo" style="width:100%;height:560px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Click **ADD**, then **+** and **−**. Open it full-size: [04-product-card.html](demos/04-product-card.html){ target=_blank }.

## Anatomy of one card

<div class="demo">
<div style="display:grid;grid-template-columns:minmax(0,220px) 1fr;gap:16px;align-items:start;font:13px/1.4 system-ui;color:#1f2329">
  <div style="position:relative;border:1px solid #e3e6ea;border-radius:12px;padding:12px;background:#fff">
    <div style="display:grid;place-items:center;aspect-ratio:1;background:#f6f7f8;border-radius:8px;font-size:3rem;outline:2px dashed #8ec5ff">🍎</div>
    <span style="position:absolute;top:12px;left:12px;background:#2563eb;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;outline:2px dashed #d6342c">20% OFF</span>
    <div style="font-size:11px;font-weight:700;color:#5b6370;margin-top:8px;outline:2px dashed #b8e986">⏱ 10 MINS</div>
    <div style="font-weight:700;outline:2px dashed #b8e986">Shimla Apple</div>
    <div style="color:#5b6370;outline:2px dashed #b8e986;margin-bottom:8px">1 kg</div>
    <div style="display:flex;justify-content:space-between;align-items:center;outline:2px dashed #f8cb46">
      <span><b>₹189</b><br><s style="color:#5b6370">₹236</s></span>
      <span style="border:1px solid #0c831f;color:#0c831f;border-radius:8px;padding:4px 14px;font-weight:700">ADD</span>
    </div>
  </div>
  <ol style="margin:0;padding-left:1.2em">
    <li><b style="color:#2563eb">Media</b>: the product picture, a perfect square.</li>
    <li><b style="color:#d6342c">Badge</b>: floats over the picture's corner.</li>
    <li><b style="color:#4c7a26">Text</b>: delivery time, name (max 2 lines), pack size.</li>
    <li><b style="color:#a17c00">Footer</b>: price on the left, ADD button on the right, always at the bottom of the card.</li>
    <li><b>Stepper</b>: replaces ADD once the item is in the cart.</li>
    <li><b>Card + grid</b>: the white box, and the grid that arranges many cards.</li>
  </ol>
</div>
</div>

## The HTML of one card

```html
--8<-- "docs/ecommerce/demos/store.html:card"
```

| Code | What it does |
|---|---|
| `<article class="product-card" …>` | `<article>` = a self-contained item that would make sense on its own (like a tweet or a product). |
| `data-id="apple"` | A unique id. JavaScript uses it as the key in the cart. |
| `data-name="Shimla Apple"` | The name the cart drawer shows. |
| `data-price="18900"` | The price in **paise** (₹189.00 = 18900). Money is stored as a whole number so adding prices never produces `0.30000000000000004`. |
| `data-category="fruits"` and `data-deal` | Used by the filters in lesson 5. `data-deal` has no value: its presence alone means "this is discounted". |
| `<div class="product-media" role="img" aria-label="Red apples">🍎</div>` | Stands in for the photo. `role="img"` + `aria-label` make screen readers treat it as an image called "Red apples". |
| `<span class="badge">20% OFF</span>` | The discount badge. CSS positions it over the picture. |
| `<p class="product-eta">⏱ 10 MINS</p>` | Delivery time. |
| `<h3 class="product-title">` | The product name is a heading, so screen-reader users can jump from product to product with the ++h++ key. It's `h3` because the section title is `h2`. |
| `<p class="product-size">1 kg</p>` | Pack size. |
| `<div class="product-footer">` | Groups price and button so CSS can put them side by side. |
| `<p class="price"><strong>₹189</strong> <s>₹236</s></p>` | `<s>` means "no longer accurate", the correct element for an old price. |
| `<button class="btn btn--outline add-btn" type="button" data-add>ADD</button>` | A real `<button>`: keyboard and screen readers work for free. `data-add` is the JavaScript hook. |
| `<div class="qty" hidden>` | The stepper. The `hidden` attribute hides it until the item is in the cart. |
| `<button … data-dec aria-label="Remove one Shimla Apple">−</button>` | A "−" alone means nothing to a screen reader, so the label says exactly what it does **and to which product**. |
| `<output aria-live="polite">0</output>` | `<output>` is the element for a calculated value. `aria-live="polite"` makes screen readers announce the new number when it changes. |

### In a real store: the image

Replace the emoji `<div>` with a real image like this:

```html
<img class="product-media" src="img/apple-400.webp"
     srcset="img/apple-200.webp 200w, img/apple-400.webp 400w"
     sizes="(width >= 768px) 200px, 45vw"
     width="400" height="400" alt="Shimla apples, 1 kg pack"
     loading="lazy" decoding="async">
```

| Attribute | Why |
|---|---|
| `src` / `srcset` / `sizes` | The browser picks the smallest file that looks sharp on this screen, so phones download less. |
| `width` / `height` | The browser reserves the space before the image loads, so the page doesn't jump (CLS, a Core Web Vital). |
| `alt` | Describes the image for screen readers and when it fails to load. |
| `loading="lazy"` | Loads the image only when it's about to scroll into view. **Don't** use it on images visible at the top of the page. |

## Card and grid: CSS

```css
--8<-- "docs/ecommerce/demos/css/product.css:grid"

--8<-- "docs/ecommerce/demos/css/product.css:card"
```

| Code | What it does |
|---|---|
| `grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));` | As many columns as fit, each at least 160 px: **2 cards per row on a phone**. `min(160px, 100%)` prevents overflow on a very narrow screen. |
| `gap: var(--space-3);` | 12 px between cards. |
| `@media (width >= 768px)` → `minmax(190px, 1fr)`, bigger gap | Slightly larger cards on desktop: 4–5 per row. |
| `.product-card { position: relative; }` | The reference box for the absolutely positioned badge. |
| `display: flex; flex-direction: column;` | Stacks the parts vertically. This is what lets the footer sit at the bottom (see `margin-top: auto` below). |
| `border`, `border-radius`, `background` | The white rounded box. |
| `transition: box-shadow 0.15s;` + `:hover { box-shadow }` | A soft lift on hover. |

```css
--8<-- "docs/ecommerce/demos/css/product.css:media"
```

| Code | What it does |
|---|---|
| `display: grid; place-items: center;` | Centres the emoji (or a smaller product photo) in the box. |
| `aspect-ratio: 1;` | A perfect square at any card width. All pictures line up even if the source photos have different shapes. With a real `<img>`, add `object-fit: contain` so the photo isn't stretched. |
| `.badge { position: absolute; top: …; left: …; }` | Takes the badge out of the normal flow and pins it 12 px from the card's top-left corner, over the picture. |
| `font-size: 0.7rem; font-weight: 700;` | Small, bold text. |

```css
--8<-- "docs/ecommerce/demos/css/product.css:text"
```

| Code | What it does |
|---|---|
| `.product-eta { font-size: 0.7rem; font-weight: 700; color: var(--muted); }` | Small grey label. |
| `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;` | **Line clamp**: show at most 2 lines and end with "…". Long names ("Brown Eggs, farm fresh and free range") don't make one card taller than the rest. The `-webkit-` prefix is still needed; every modern browser supports it. |
| `margin: 0 0 var(--space-3);` | Space below the pack size, before the footer. |

```css
--8<-- "docs/ecommerce/demos/css/product.css:footer"
```

| Code | What it does |
|---|---|
| `.product-footer { display: flex; justify-content: space-between; align-items: center; }` | Price on the left, button on the right, vertically centred. |
| `margin-top: auto;` | **The trick that aligns every ADD button.** In a flex column, an `auto` margin takes all the free space, so it pushes the footer to the bottom of the card. Cards in a row are equal height (grid stretches them), so all the buttons line up. |
| `.price { display: flex; flex-direction: column; }` | New price above old price. |
| `.add-btn { min-width: 72px; }` | ADD and the stepper are the same width, so nothing shifts when one replaces the other. |

```css
--8<-- "docs/ecommerce/demos/css/product.css:qty"
```

| Code | What it does |
|---|---|
| `.qty { display: inline-flex; min-width: 72px; background: var(--brand); color: #fff; }` | A green pill holding − n +. |
| `.qty button { width: 26px; height: 34px; border: 0; background: none; color: inherit; }` | Strips the default button look so only the symbol shows, in white. |
| `.qty output { flex: 1; text-align: center; }` | The number takes the space between the two buttons. |

## The JavaScript: ADD, +, −

The full script is in `js/store.js`; these are the parts this card uses.

```js
--8<-- "docs/ecommerce/demos/js/store.js:state"
```

| Code | What it does |
|---|---|
| `const cart = new Map();` | The **state**: a `Map` from product id to `{ name, price, qty }`. Everything on screen is drawn from this one object. |
| `function setQty(card, qty)` | The **only** function that changes the cart. Having one door in makes bugs easy to find. |
| `const { id, name, price } = card.dataset;` | `dataset` reads the `data-*` attributes: `data-id` → `dataset.id`. Destructuring pulls three at once. |
| `if (qty <= 0) cart.delete(id);` | Quantity 0 means "remove from cart". |
| `else cart.set(id, { name, price: Number(price), qty });` | Data attributes are always strings; `Number()` converts `"18900"` to `18900`. |
| `render();` | Redraw the screen from the new state. |

```js
--8<-- "docs/ecommerce/demos/js/store.js:events"
```

| Code | What it does |
|---|---|
| `document.querySelector("[data-product-grid]")` | Finds the grid by its data attribute. |
| `grid?.addEventListener("click", …)` | **Event delegation**: one listener on the grid instead of 24 on every button. It still works for cards added later (e.g. infinite scroll). `?.` skips this if the page has no grid. |
| `event.target.closest("button")` | The click might land on the button or on text inside it; `closest()` walks up to the nearest `<button>`. |
| `if (!button) return;` | The click was on the card but not on a button: do nothing. |
| `button.closest(".product-card")` | Which product was clicked. |
| `cart.get(card.dataset.id)?.qty ?? 0` | Current quantity, or 0 if it's not in the cart (`?.` avoids an error on `undefined`, `??` supplies the default). |
| `button.matches("[data-add], [data-inc]")` | Was it ADD or +? Then add one. |
| `button.matches("[data-dec]")` | Was it −? Then remove one. |
| `card.querySelector("[data-inc]").focus();` | ADD disappears when clicked, which would leave keyboard focus nowhere. Moving focus to "+" keeps keyboard users in place. |

```js
--8<-- "docs/ecommerce/demos/js/store.js:render"
```

| Code | What it does |
|---|---|
| `document.querySelectorAll(".product-card").forEach(…)` | For every card on the page… |
| `card.querySelector("[data-add]").hidden = qty > 0;` | …hide ADD if it's in the cart… |
| `card.querySelector(".qty").hidden = qty === 0;` | …and show the stepper instead. |
| `card.querySelector("output").textContent = qty;` | …and write the number. |
| `for (const item of cart.values())` | Loop over every cart item to add up the count and the subtotal. |
| `badge.textContent = count` | Update the red badge(s) in the header. |
| ``setAttribute("aria-label", `Open cart, ${count} items`)`` | Keep the cart button's spoken name in sync. |
| the rest | Draws the cart drawer. Explained in lesson 6. |

## Try it

1. Add a ninth product (Avocado 🥑, ₹149, fruits) by copying one `<article>`. Change every `data-*` value and both `aria-label`s.
2. Add an "Out of stock" state: a `data-out-of-stock` attribute, a grey card, and a disabled ADD button (`disabled` attribute).
3. Change the grid to show 3 cards per row on a phone. Which number in `minmax()` do you change?

### Solutions

Try each exercise yourself first, then open its solution to compare.

Every code solution below is applied in **[store-solved.html](demos/store-solved.html){ target=_blank }**: the full store with all the exercises from every lesson done, tested in a real browser like the original. Its files are generated from `store.html` and `store.js`, so the snippets here are exactly what runs there.

??? success "1. A ninth product: avocado"
    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-04-1"
    ```

    Change **every** product-specific value: `data-id` (must be unique, it's the cart key), `data-name`, `data-price` in paise
    (₹149 = `14900`), `data-category`, the emoji's `aria-label`, the title, the size, the price text and **both** stepper
    `aria-label`s. No CSS or JavaScript changes: the grid makes room, and the event delegation on the grid handles the new buttons.

??? success "2. An “Out of stock” state"
    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-04-2-html"
    ```

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-04-2"
    ```

    | Code | Why |
    |---|---|
    | `data-out-of-stock` | A data attribute is both a CSS hook (`[data-out-of-stock]`) and something JavaScript can read. |
    | `disabled` on the button | A disabled button can't be clicked or focused, and screen readers announce it as "dimmed"/"unavailable". No JavaScript needed. |
    | `filter: grayscale(1); opacity: 0.5;` | A grey, faded picture says "unavailable" at a glance. |
    | `.add-btn:disabled` | Style the disabled state so it doesn't look like a normal ADD button. |
    | "Back tomorrow" instead of "10 MINS" | Tell people **when** it's coming back, not just that it's gone. |

??? success "3. Three cards per row on a phone"
    Change the **minimum** in `minmax()`. A 375 px phone's container is 343 px wide; with two 12 px gaps, three cards get
    (343 − 24) / 3 ≈ 106 px each, so the minimum must be 106 px or less:

    ```css
    .product-grid {
      grid-template-columns: repeat(auto-fill, minmax(min(100px, 100%), 1fr));
    }
    ```

    Now look at the cards: each has about 82 px of room inside its padding, and the price plus a 72 px ADD button no longer fit side
    by side, so they overflow. A layout change ripples into the components inside it. If you really want three columns, stack the
    footer as well (`.product-footer { flex-direction: column; align-items: stretch; }`). Most grocery apps keep two columns on phones
    for exactly this reason, which is why the solved store doesn't apply this one.

## Common mistakes

* Storing prices as `189.00` and adding them with floats. Use whole paise.
* Fixed card heights (`height: 320px`) to line up buttons. Text overflows as soon as a name is long or the user zooms. Use `margin-top: auto`.
* A `<div>` with a click handler as the ADD button: no keyboard, no focus, no role.
* One click listener per button: slow with hundreds of products and broken for cards added later. Use delegation.
* Forgetting `width`/`height` on product images, so the grid jumps while images load.
