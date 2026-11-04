# 7. Footer & Mobile Bottom Nav

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

The **footer** holds everything people look for when they're stuck: company links, help, a newsletter signup and legal text.
Shopping apps also add a **bottom navigation bar** on phones, because the bottom of the screen is where thumbs reach.

## What you see

<iframe src="../demos/07-footer.html" title="Footer and bottom nav: live demo" style="width:100%;height:420px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Open it full-size: [07-footer.html](demos/07-footer.html){ target=_blank } and make the window narrow: the footer columns stack and
the bottom nav appears.

## ⑬ Footer: HTML

```html
--8<-- "docs/ecommerce/demos/store.html:footer"
```

| Code | What it does |
|---|---|
| `<footer class="site-footer">` | The **contentinfo** landmark: the site-wide footer. |
| `<div class="container">` | Same width as the rest of the page. |
| `<div class="footer-grid">` | The grid of four columns. |
| `<section>` + `<h2>FreshCart</h2>` + `<p>` | Column 1: about the store. |
| `<nav aria-label="Company">` | Columns 2 and 3 are groups of links, so they're `<nav>` elements, each with a different label so screen readers can tell them apart. |
| `<h2>` inside each column | Column headings. Footer headings are usually `h2`: they are top-level sections of the page. |
| `<ul>` + `<li><a>` | Links as lists, as always. |
| `<form class="newsletter" action="#">` | Column 4: email signup. |
| `<label class="visually-hidden" for="email">` | The design has no visible label, but the input still needs one. |
| `<input id="email" type="email" … autocomplete="email" required>` | `type="email"` shows the @ keyboard on phones and checks the format. `autocomplete="email"` lets the browser fill it in. `required` blocks an empty submit. |
| `<div class="footer-bottom">` | The bottom strip: copyright and payment methods. |

## Footer: CSS

```css
--8<-- "docs/ecommerce/demos/css/footer.css:footer"
```

| Code | What it does |
|---|---|
| `margin-top: var(--space-8); padding-top: var(--space-8);` | Space above the footer, and inside it. |
| `background: var(--text); color: #d5d9df;` | Dark footer with light-grey text. A dark footer clearly says "the page ends here". |
| `grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));` | Each column at least 180 px. Four columns on a desktop, two on a tablet, one on a phone, with no media queries. `auto-fit` (instead of `auto-fill`) stretches the columns to fill the row when there are fewer than fit. |
| `.site-footer h2 { font-size: 1rem; color: #fff; }` | Small white headings. The **level** is `h2` for structure; the **size** is set by CSS. |
| `ul { margin: 0; padding: 0; list-style: none; }` | Plain list. |
| `li + li { margin-top: var(--space-2); }` | The `+` (adjacent sibling) selector: "an `li` that comes right after another `li`". Adds space **between** items but not above the first. |
| `a:hover { text-decoration: underline; }` | Underline on hover so it's clear these are links. |

```css
--8<-- "docs/ecommerce/demos/css/footer.css:newsletter"
```

| Code | What it does |
|---|---|
| `.newsletter { display: flex; gap: … }` | Input and button side by side. |
| `.newsletter input { flex: 1; min-width: 0; }` | The input takes the spare width and can shrink on narrow screens. |
| `background: #111418; color: #fff; border: 1px solid #4b5563;` | A dark input that fits the dark footer. |
| `.footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; }` | Copyright left, payments right; they wrap onto two lines on phones. |
| `border-top: 1px solid #3a404c;` | A subtle divider above the bottom strip. |

## ⑮ Mobile bottom nav

```html
--8<-- "docs/ecommerce/demos/store.html:bottomnav"
```

```css
--8<-- "docs/ecommerce/demos/css/footer.css:bottomnav"
```

| Code | What it does |
|---|---|
| `<nav class="bottom-nav" aria-label="Mobile">` | A third navigation landmark, labelled. |
| `<a href="#" aria-current="page">` | Home is the current page, so it's highlighted. |
| `<span aria-hidden="true">🏠</span>Home` | Icon above the word. The icon is decoration; the word is the link's name. **Always keep a text label**: icons alone are guessed wrong. |
| `<a href="#" data-open-cart>` | Opens the cart drawer (same hook as the header button, lesson 6). |
| `position: fixed; inset: auto 0 0 0;` | Fixed to the screen, not the page: it stays at the bottom while you scroll. `inset` is shorthand for `top right bottom left`: `top: auto`, and 0 from the right, bottom and left, so it spans the full width at the bottom. |
| `z-index: 10;` | Above the products. |
| `display: grid; grid-template-columns: repeat(4, 1fr);` | Four equal-width tabs. |
| `padding-bottom: env(safe-area-inset-bottom);` | On iPhones without a home button, adds space so the tabs aren't hidden under the home-indicator bar. |
| `.bottom-nav a { display: flex; flex-direction: column; align-items: center; }` | Icon above text, centred. |
| `a[aria-current="page"] { color: var(--brand); }` | Highlight the current tab, styled from the accessibility attribute. |
| `body:has(.bottom-nav) { padding-bottom: 64px; }` | **`:has()`** is the "parent selector": "the body, if it contains a bottom nav". The padding stops the fixed bar from covering the end of the footer. |
| `@media (width >= 768px)` → `display: none;` and `padding-bottom: 0` | Desktops have the header links; no bottom bar needed. |

## Try it

1. Add a fifth tab "Offers 🔥" (hint: change `repeat(4, 1fr)`).
2. Add social links (Instagram, X, YouTube) to column 1 as a row of icons with `aria-label`s.
3. Make the footer columns collapsible on phones with `<details>`, like the filters in lesson 5.

### Solutions

Try each exercise yourself first, then open its solution to compare.

Every code solution below is applied in **[store-solved.html](demos/store-solved.html){ target=_blank }**: the full store with all the exercises from every lesson done, tested in a real browser like the original. Its files are generated from `store.html` and `store.js`, so the snippets here are exactly what runs there.

??? success "1. A fifth tab"
    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-07-1-html"
    ```

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-07-1"
    ```

    `repeat(5, 1fr)` gives five equal columns. Five is the practical maximum for a bottom bar: at 375 px each tab is 75 px wide,
    about the smallest comfortable tap target with a label.

??? success "2. Social links"
    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-07-2-html"
    ```

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-07-2"
    ```

    Icon-only links **must** have an `aria-label`, or a screen reader announces "link, camera emoji". The list gets its own label
    ("Follow us") so it reads as a group. `.site-footer .social` is needed because the footer's `.site-footer ul { margin: 0 }` is more
    specific than `.social` alone.

??? success "3. Collapsible footer columns on phones"
    Wrap each link column in a `<details>`, with the heading inside the `<summary>`:

    ```html
    --8<-- "docs/ecommerce/demos/store-solved.html:sol-07-3-html"
    ```

    Open them on desktop with the same `matchMedia` trick as the filters:

    ```js
    --8<-- "docs/ecommerce/demos/js/store-solved.js:sol-07-3"
    ```

    And replace the default ▸ marker with a +/− on the right:

    ```css
    --8<-- "docs/ecommerce/demos/css/solutions.css:sol-07-3"
    ```

    On a phone the footer shrinks to two tappable rows instead of six links; on desktop nothing changes. Without JavaScript the
    columns still work, they just start closed.

## Common mistakes

* Icon-only bottom navs. Users don't know what 🗂️ means; add the word.
* Forgetting the body padding, so the bottom nav covers the copyright line and the last product.
* Using `<div>` for each link group instead of `<nav>` + a heading: screen-reader users lose their way.
