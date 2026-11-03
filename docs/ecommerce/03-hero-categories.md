# 3. Hero, Offers & Category Tiles

<span class="lvl lvl-1">Beginner</span>

The top of the home page sells the store: a big **hero banner** with one clear button, a row of **offer cards**, and **category
tiles** that are shortcuts into the catalogue.

## What you see

<iframe src="../demos/03-hero.html" title="Hero, offers and category tiles: live demo" style="width:100%;height:620px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Open it full-size: [03-hero.html](demos/03-hero.html){ target=_blank }. At phone width the picture disappears and the offers become a
swipeable carousel.

## ⑦ Hero banner and ⑧ offers: HTML

```html
--8<-- "docs/ecommerce/demos/store.html:hero"
```

| Code | What it does |
|---|---|
| `<section class="hero" aria-labelledby="hero-title">` | A `<section>` is a themed group of content. `aria-labelledby` names it after its heading, so screen-reader users hear "Fresh groceries at your door, region". |
| `<div>` (first child) | Groups the text so it's **one** grid cell (heading + paragraph + button together). |
| `<h1 id="hero-title">` | The page's single `h1`. The `id` is what `aria-labelledby` points at. |
| `<a class="btn" href="#shop">Shop now</a>` | **One** call to action. Jumps to the product section further down. |
| `<div class="hero-art" aria-hidden="true">🥦🍎</div>` | Decoration only. `aria-hidden` stops screen readers reading "broccoli, red apple". |
| `<ul class="offers" id="offers" aria-label="Offers">` | Three offers are a list. The `id` is the target of the announcement-bar link. |
| `<li><strong>Flat 50% off</strong> on your first order</li>` | `<strong>` for the important part; CSS puts it on its own line. |

## Hero: CSS

```css
--8<-- "docs/ecommerce/demos/css/home.css:hero"
```

| Code | What it does |
|---|---|
| `display: grid; grid-template-columns: 1fr;` | Phone: one column, so the text fills the width. |
| `align-items: center;` | On desktop, text and picture are vertically centred against each other. |
| `margin-top`, `padding`, `border-radius` | Spacing from the tokens; rounded corners make it read as a card. |
| `background: linear-gradient(120deg, #e3f5e1 0%, #fff6d8 100%);` | A soft diagonal fade from mint to cream. `120deg` is the direction; the percentages say where each colour is fully reached. No image file needed. |
| `font-size: clamp(1.6rem, 1.1rem + 2.5vw, 2.75rem);` | **Fluid type.** `clamp(MIN, PREFERRED, MAX)`. The preferred size grows with the viewport width (`vw` = 1 % of the window width), but never goes below 1.6 rem or above 2.75 rem. One line replaces several media queries. |
| `line-height: 1.1;` | Big headings look better with tight line spacing. |
| `max-width: 45ch;` | `ch` ≈ the width of the "0" character. About 45–75 characters per line is comfortable to read. |
| `.hero-art { display: none; }` | Mobile first: no picture on small screens. It costs space and adds nothing. |
| `@media (width >= 768px)` → `grid-template-columns: 1.4fr 1fr;` | On wider screens: two columns, the text column 1.4 × as wide as the picture column. |
| `.hero-art { display: block; }` | …and the picture appears. |

## Offers: a carousel with no JavaScript

```css
--8<-- "docs/ecommerce/demos/css/home.css:offers"
```

| Code | What it does |
|---|---|
| `display: grid; grid-auto-flow: column;` | Every item goes into a **new column** instead of a new row, so they line up horizontally. |
| `grid-auto-columns: 80%;` | Each card is 80 % of the container: the next card peeks in from the right, which tells the user "swipe me". |
| `list-style: none; margin; padding` | Resets the `<ul>`. The bottom padding leaves room for the scrollbar on desktop browsers. |
| `overflow-x: auto;` | The row scrolls sideways. |
| `scroll-snap-type: x mandatory;` + `scroll-snap-align: start;` | After a swipe, it **always** stops with a card aligned to the left edge, like an app carousel. |
| `li:nth-child(1) { background: #2563eb; }` | Picks the 1st, 2nd and 3rd item to give each a different colour. |
| `strong { display: block; }` | `<strong>` is inline by default; `block` puts it on its own line. |
| `@media (width >= 768px)` | Desktop: back to normal rows (`grid-auto-flow: row`), three equal columns, no scrolling. |

## ⑨ Category tiles

```html
--8<-- "docs/ecommerce/demos/store.html:categories"
```

```css
--8<-- "docs/ecommerce/demos/css/home.css:section"

--8<-- "docs/ecommerce/demos/css/home.css:categories"
```

| Code | What it does |
|---|---|
| `<div class="section-head">` with `<h2>` and `<a>See all</a>` | A reusable **section heading** component: title left, link right. Used again in lesson 5. |
| `.section-head { display: flex; justify-content: space-between; align-items: baseline; }` | Pushes the title and link to opposite ends; `baseline` lines up the bottoms of their letters even though the fonts differ in size. |
| `<ul class="category-grid">` + `<li><a class="category-tile">` | A list of links. The **whole tile** is the link, so it's a big tap target. |
| `<span class="category-icon" aria-hidden="true">🍎</span>Fruits` | Icon is decoration; the link's name is just "Fruits". |
| `grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));` | **The responsive-grid one-liner.** "Make as many columns as fit, each at least 96 px, and share the leftover space equally." 3 per row on a phone, 6+ on a desktop, no media queries. |
| `.category-tile { display: flex; flex-direction: column; align-items: center; }` | Icon above text, both centred. |
| `transition: transform 0.15s, box-shadow 0.15s;` | Animates the hover change instead of jumping. |
| `.category-tile:hover { transform: translateY(-2px); box-shadow: … }` | Lifts the tile 2 px and adds a shadow. `transform` is cheap for the browser to animate. |
| `.category-icon { display: grid; place-items: center; }` | The shortest way to centre something both ways. |
| `width: 64px; aspect-ratio: 1; border-radius: 50%;` | A 64 × 64 circle. `aspect-ratio: 1` keeps height equal to width. |

## Try it

1. Change `minmax(96px, 1fr)` to `minmax(140px, 1fr)` and watch fewer, wider tiles appear.
2. Change the offers' `80%` to `45%` so two cards fit on a phone.
3. Replace the hero gradient with a photo: `background: url(img/hero.jpg) center / cover;` and make sure the text stays readable.

## Common mistakes

* A hero with three buttons and four messages. One headline, one sentence, one button.
* `font-size: 48px` on the hero heading: huge on phones. Use `clamp()`.
* A JavaScript slider library for three offer cards. CSS scroll snap does it with no JS, and it's smooth on touch screens.
* Making only the icon a link. Wrap the whole tile in the `<a>` so the tap target is large.
