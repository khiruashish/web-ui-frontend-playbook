# 2. Header & Category Nav

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

The header is the most-used part of any store: people search, check their cart and switch categories from it. It is made of
five small components: **announcement bar**, **logo + location**, **search box**, **actions (login + cart with a count badge)**
and the **category nav** underneath.

## What you see

<iframe src="../demos/02-header.html" title="Header and category nav: live demo" style="width:100%;height:270px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Open it full-size: [02-header.html](demos/02-header.html){ target=_blank } and make the window narrow: the search box drops to its own
row and the category nav becomes swipeable.

=== "Phone (< 768 px)"

    ```text
    ┌───────────────────────────────────────┐
    │ FreshCart  Delivery in 10…   [🛒 Cart 3]│  row 1: logo · location · actions
    │ [ Search for milk, bread…        🔍 ] │  row 2: search spans all columns
    ├───────────────────────────────────────┤
    │ (All) Fruits Vegetables Dairy Bak… →  │  swipe sideways
    └───────────────────────────────────────┘
    ```

=== "Desktop (≥ 768 px)"

    ```text
    ┌──────────────────────────────────────────────────────────────────────┐
    │ FreshCart  Delivery in 10 min  [ Search for milk…          🔍 ]  Login [🛒 Cart 3] │
    ├──────────────────────────────────────────────────────────────────────┤
    │ (All)  Fruits  Vegetables  Dairy & Eggs  Bakery  Snacks  Beverages  …           │
    └──────────────────────────────────────────────────────────────────────┘
    ```

## ① Skip link and announcement bar

```html
--8<-- "docs/ecommerce/demos/store.html:skiplink"

--8<-- "docs/ecommerce/demos/store.html:announcement"
```

```css
--8<-- "docs/ecommerce/demos/css/header.css:announcement"
```

| Code | What it does |
|---|---|
| `<a class="visually-hidden skip-link" href="#main">` | The first thing a keyboard user reaches. Pressing ++enter++ jumps past the header to `<main id="main">`. Invisible until focused (see lesson 1). |
| `<p class="announcement">` | A one-line promotional strip. It's just a paragraph; no special element is needed. |
| `<a href="#offers">` | Links to the element with `id="offers"` on the same page (the offers row in lesson 3). |
| `background: var(--text); color: #fff;` | Dark strip, white text: it stands apart from the white header. |
| `font-size: 0.85rem;` | `rem` is relative to the root font size (16 px), so 0.85 rem ≈ 13.6 px. It scales if the user enlarges text in their browser. |
| `.announcement a { color: var(--accent); }` | The link is yellow so it stands out on dark. |

## ② The header shell: one grid, two layouts

```html
--8<-- "docs/ecommerce/demos/store.html:header"
```

| Line(s) | What it does |
|---|---|
| `<header class="site-header">` | The banner landmark. The class is for styling, so we don't style the bare `header` tag (there can be other headers, e.g. inside articles). |
| `<div class="container header-inner">` | Two classes: `container` limits the width (lesson 1), `header-inner` is the grid we define below. |
| `<a class="logo" href="#" aria-label="FreshCart home">` | The logo always links home. `aria-label` gives screen readers a clear name ("FreshCart home") instead of reading the two spans separately. |
| `Fresh<span>Cart</span>` | The `<span>` lets us colour "Cart" differently. |
| `<div class="location">` with `<strong>` and `<span>` | Two lines of text: delivery promise (bold) and the address (grey). |
| `<form class="search" role="search" action="#">` | A real form, so ++enter++ submits it. `role="search"` makes it a search landmark. `action` is where it submits (a results URL in a real store). |
| `<label class="visually-hidden" for="q">` | **Every input needs a label.** The design shows no label, so we hide it visually; screen readers still read "Search products". `for="q"` connects it to `id="q"`. |
| `<input id="q" name="q" type="search" placeholder="…">` | `type="search"` gives a clear (×) button on some browsers and a "search" key on phone keyboards. `name="q"` becomes `?q=apples` in the URL. The placeholder is a hint, never a replacement for the label. |
| `<button type="submit" aria-label="Search">🔍</button>` | The emoji alone isn't a good accessible name, so `aria-label` provides one. |
| `<div class="header-actions">` | A flex row for Login and Cart. |
| `<a class="account-link" href="#">Login</a>` | Hidden on phones (the bottom nav has Account), shown on desktop. |
| `<button class="btn cart-button" type="button" data-open-cart …>` | `type="button"` (not submit). `data-open-cart` is a **data attribute**: a hook for JavaScript (lesson 6). We select by data attributes in JS and by classes in CSS so a CSS rename never breaks JS. |
| `<span class="cart-count" data-cart-count aria-hidden="true">0</span>` | The red badge. JavaScript updates the number. `aria-hidden` stops screen readers reading "0" separately: the button's `aria-label` ("Open cart, 3 items") already includes it. |

```css
--8<-- "docs/ecommerce/demos/css/header.css:header"
```

| Code | What it does |
|---|---|
| `position: sticky; top: 0;` | The header scrolls normally until it hits the top of the screen, then sticks there. |
| `z-index: 10;` | Keeps the header **above** the products that scroll underneath it. |
| `border-bottom: 1px solid var(--line);` | A thin line separates the header from the page. |
| `display: grid;` | `header-inner` becomes a grid container. |
| `grid-template-columns: auto 1fr auto;` | **Phone**: three columns. Logo and actions take only the space they need (`auto`); the location gets the rest (`1fr` = one fraction of the leftover space). |
| `grid-template-areas: "logo location actions" "search search search";` | Draws the layout as text. Each string is a row; each word is a cell. Writing `search` three times makes the search box span all three columns on row 2. |
| `align-items: center;` | Vertically centres every item in its row. |
| `gap: var(--space-3) var(--space-4);` | 12 px between rows, 16 px between columns. |
| `padding-block: var(--space-3);` | Padding on the top and bottom only (`block` = vertical in horizontal writing). |
| `.logo { grid-area: logo; }` … | Places each child into the named area. The HTML order doesn't have to match the visual order. |
| `@media (width >= 768px) { … }` | On screens at least 768 px wide (tablets and up)… |
| `grid-template-columns: auto auto 1fr auto;` | …four columns: logo, location, search (takes all spare space), actions… |
| `grid-template-areas: "logo location search actions";` | …all in a single row. Only the grid changes; the HTML stays the same. |

## ③ Logo and location

```css
--8<-- "docs/ecommerce/demos/css/header.css:logo"
```

| Code | What it does |
|---|---|
| `font-weight: 800; letter-spacing: -0.02em;` | A heavy, slightly tight wordmark: a text logo with no image file. |
| `.logo span { color: var(--accent); }` | "Cart" in yellow. |
| `.location { display: flex; flex-direction: column; }` | Stacks the two lines vertically. |
| `min-width: 0;` | **Important.** Grid and flex items refuse to shrink below their content's width by default. `min-width: 0` lets this item shrink so the address can be cut off instead of pushing the cart off-screen. |
| `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` | The classic three-line "cut off with …" pattern. All three are required. |

## ④ Search box

```css
--8<-- "docs/ecommerce/demos/css/header.css:search"
```

| Code | What it does |
|---|---|
| `.search { display: flex; }` | Input and button side by side. |
| `overflow: hidden;` + `border-radius` | The button's square corners are clipped to the form's rounded corners. |
| `.search:focus-within` | Matches the form when **anything inside it** has focus, so the whole box gets a green border while typing. |
| `.search input { flex: 1; min-width: 0; }` | The input grows to fill the space; `min-width: 0` lets it shrink on tiny screens (inputs have a built-in minimum width otherwise). |
| `border: 0; background: transparent;` | The input blends into the form, which draws the border. |
| `.search input:focus { outline: none; }` | Safe here **only** because `:focus-within` on the form already shows a visible focus style. |
| `padding-inline: var(--space-4);` | Left and right padding on the search button. |

## ⑤ Actions and the cart badge

```css
--8<-- "docs/ecommerce/demos/css/header.css:actions"
```

| Code | What it does |
|---|---|
| `.header-actions { display: flex; align-items: center; gap: … }` | Login and Cart in a row, vertically centred, 8 px apart. |
| `.account-link { display: none; }` then `display: inline-block` at ≥ 768 px | Mobile first: hidden by default, shown on wider screens. |
| `.cart-button { position: relative; }` | Makes the button the **reference box** for the badge's absolute position. |
| `.cart-count { position: absolute; top: -8px; right: -8px; }` | Pins the badge to the button's top-right corner, overlapping it by 8 px. |
| `min-width: 22px; height: 22px; border-radius: 999px;` | A circle for one digit that grows into a pill for "12". A huge radius always gives fully round ends. |
| `border: 2px solid var(--surface);` | A white ring that separates the badge from the green button. |
| `line-height: 18px; text-align: center;` | Centres the digit: 22 px height − 2 × 2 px border = 18 px inside. |

## ⑥ Category nav: a row that scrolls sideways

```html
--8<-- "docs/ecommerce/demos/store.html:catnav"
```

```css
--8<-- "docs/ecommerce/demos/css/header.css:catnav"
```

| Code | What it does |
|---|---|
| `<nav aria-label="Categories">` | A navigation landmark. The label tells it apart from the footer and bottom navs. |
| `<ul class="container">` | Links are a **list**: screen readers announce "list, 9 items". |
| `aria-current="page"` | Marks the link for the current page. We style it from this attribute, so the look and the accessibility can't drift apart. |
| `display: flex; gap: var(--space-2);` | Links in one row with 8 px gaps. |
| `margin: 0; padding: … 0; list-style: none;` | Removes the list's default bullets and indentation. |
| `overflow-x: auto;` | When the links don't fit (on phones), the row scrolls sideways instead of wrapping or overflowing the page. |
| `scrollbar-width: none;` | Hides the scrollbar; touch users swipe. |
| `scroll-snap-type: x proximity;` + `scroll-snap-align: start;` | After a swipe, the row settles so a link lines up with the left edge. |
| `white-space: nowrap;` | "Dairy & Eggs" stays on one line. |
| `border-radius: 999px;` | Pill-shaped highlight for hover and the current page. |

## Try it

1. Change the phone layout so the search box is on row 1 and the location on row 2. You only need to edit `grid-template-areas`.
2. Make the cart badge show "9+" when the count is more than 9 (hint: JavaScript in lesson 6).
3. Add a "Deals 🔥" link to the category nav with a red text colour.

### Solutions

Try each exercise yourself first, then open its solution to compare.

Every code solution below is applied in **[store-solved.html](demos/store-solved.html){ target=_blank }**: the full store with all the exercises from every lesson done, tested in a real browser like the original. Its files are generated from `store.html` and `store.js`, so the snippets here are exactly what runs there.

??? success "1. Search on row 1, location on row 2"
    Only the grid areas change. Because this rule lives in a stylesheet that loads **after** `header.css`, it also has to repeat
    the desktop layout, or it would win on desktop too:

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-02-1"
    ```

    It works, but look at it on a 375 px phone: the search box now shares the row with the logo and the cart, so it's only about
    140 px wide, even after hiding the word "Cart". That's the reason the original design gives search a full row of its own.
    Moving things around is easy with `grid-template-areas`; deciding **where they fit best** is the real design work.

??? success "2. Show “9+” in the cart badge"
    In `render()`, replace the line that writes the count into the badge:

    ```js
    --8<-- "docs/ecommerce/demos/js/store-solved.js:sol-02-2"
    ```

    `String(count)` keeps both branches the same type (text). The full number is still in the button's `aria-label`
    ("Open cart, 12 items"), so screen-reader users lose nothing.

??? success "3. A red “Deals 🔥” link"
    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-02-3"
    ```

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-02-3"
    ```

    `a.deals-link` (an element plus a class) is more specific than `.category-nav a`, so its colour wins. Red text on white
    (`#d6342c`) has a contrast of about 4.8 : 1, which passes WCAG AA for normal text.

## Common mistakes

* Building the header with floats or fixed pixel widths, so it breaks at in-between screen sizes.
* Using a `placeholder` instead of a `<label>`: the hint disappears as soon as you type, and screen readers may skip it.
* Forgetting `min-width: 0`, so a long address pushes the cart button off-screen.
* `position: fixed` instead of `sticky`: a fixed header covers the top of the content and you need to add padding to compensate.
