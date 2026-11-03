# 8. Put It All Together

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span> <span class="lvl lvl-3">Advanced</span>

You've built every component. Now they go into one page, in the right order, with all the stylesheets and the script loaded.

## The finished page

<iframe src="../demos/store.html" title="FreshCart: the finished page" style="width:100%;height:720px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Open it full-size: [store.html](demos/store.html){ target=_blank }.

## Loading the files

```html
--8<-- "docs/ecommerce/demos/store.html:styles"
```

| Code | What it does |
|---|---|
| `base.css` first | Tokens and the reset must come before anything that uses them. |
| one `<link>` per component | Easy to find code: a header bug is in `header.css`. In production a build tool (Vite, Angular CLI) bundles them into one file. |
| order: base → header → home → product → listing → cart → footer | When two rules have equal specificity, **the later one wins**. Shared things first, specific things later. |
| `<script src="js/store.js" defer>` | `defer` downloads the script in parallel and runs it **after** the HTML is parsed, so `querySelector` finds every element. Without `defer`, a script in `<head>` runs before the body exists. |

## The page outline

Every component in the order it appears in `<body>`. This is also the order a screen reader and the ++tab++ key follow, so the
visual order and the source order match.

```html
<body>
  <a class="skip-link">          ← lesson 2
  <p class="announcement">       ← ① lesson 2
  <header class="site-header">   ← ②③④⑤ lesson 2
  <nav class="category-nav">     ← ⑥ lesson 2
  <main id="main" class="container">
    <section class="hero">       ← ⑦ lesson 3
    <ul class="offers">          ← ⑧ lesson 3
    <section> category tiles     ← ⑨ lesson 3
    <section id="shop">          ← lesson 5
      <div class="listing">
        <details class="filters">   ← ⑩ lesson 5
        <div>
          <div class="toolbar">     ← ⑪ lesson 5
          <div class="product-grid">
            <article class="product-card"> × 8   ← ⑫ lesson 4
  </main>
  <dialog class="cart-drawer">   ← ⑭ lesson 6
  <footer class="site-footer">   ← ⑬ lesson 7
  <nav class="bottom-nav">       ← ⑮ lesson 7
</body>
```

## Which layout tool did each component use?

| Component | Tool | Key line |
|---|---|---|
| Header | Grid areas | `grid-template-areas: "logo location search actions"` |
| Category nav, offers | Flex / Grid + scroll | `overflow-x: auto; scroll-snap-type: x` |
| Hero | Grid columns | `grid-template-columns: 1.4fr 1fr` |
| Category tiles, product grid, footer | Grid auto-fill / auto-fit | `repeat(auto-fill, minmax(160px, 1fr))` |
| Product card | Flex column | `margin-top: auto` on the footer |
| Listing | Grid columns | `grid-template-columns: 240px 1fr` |
| Cart badge | Absolute positioning | `position: absolute; top: -8px; right: -8px` |
| Header, filters | Sticky positioning | `position: sticky; top: 0` |
| Bottom nav | Fixed positioning | `position: fixed; inset: auto 0 0 0` |
| Cart drawer | `<dialog>` + flex column | `margin-left: auto; flex: 1` on the body |

**Rule of thumb:** one direction (a row or a column) → Flexbox. Rows **and** columns, or equal cards → Grid. Something stuck on top
of something else → `position`.

## Breakpoints used

| Width | What changes |
|---|---|
| < 768 px (phones) | Search on its own row, no Login link, hero has no picture, offers swipe, 2 products per row, bottom nav visible |
| ≥ 768 px (tablets, laptops) | Header on one row, Login shows, hero picture, three offer columns, bigger product cards, bottom nav hidden |
| ≥ 900 px (laptops) | Filters become an always-open sticky sidebar |
| No breakpoint | Category tiles, product grid and footer adapt continuously with `auto-fill`/`auto-fit` |

## Testing checklist

Do this for every page you build. It takes five minutes and finds most bugs.

- [ ] **320 px wide** (smallest phones): nothing scrolls sideways. In the DevTools console: `document.documentElement.scrollWidth === innerWidth` should be `true`.
- [ ] **375 px, 768 px, 1024 px, 1440 px**: every layout looks intended, not accidental.
- [ ] **Keyboard only**: unplug the mouse. ++tab++ reaches every link and button in a sensible order, the focus ring is always visible, ++enter++ / ++space++ work, ++esc++ closes the cart.
- [ ] **Zoom to 200 %**: text grows and nothing is cut off.
- [ ] **Screen reader** (VoiceOver: ++cmd+f5++ on macOS; NVDA on Windows): headings list makes sense, buttons have names, the cart count is announced.
- [ ] **Lighthouse** (DevTools → Lighthouse): Accessibility and Best Practices ≥ 95.
- [ ] **Slow network** (DevTools → Network → Slow 4G): the page is usable before all images load, and nothing jumps around.
- [ ] **Reduce motion** (DevTools → Rendering → Emulate `prefers-reduced-motion`): the drawer opens without sliding.

!!! success "This page is tested automatically"
    The repository's [`coding-interview/run-tests.mjs`](https://github.com/khiruashish/web-ui-frontend-playbook/blob/main/coding-interview/run-tests.mjs)
    opens `store.html` in a real Chromium browser on every pull request and checks: no sideways scroll at 320 px, the header layout
    at phone and desktop widths, ADD → stepper → cart badge → drawer totals (including the free-delivery rule), filters and sort,
    and that the drawer opens and closes with the keyboard.

```text
--8<-- "coding-interview/outputs/13-ecommerce-store.txt"
```

## Exercises: keep building

Each one practises a skill real frontend jobs use every day.

| # | Exercise | You practise |
|---|---|---|
| 1 | Add a **dark mode** by overriding the tokens inside `@media (prefers-color-scheme: dark) { :root { … } }` | Design tokens |
| 2 | Build a **product detail page** (`product.html`): image gallery, title, price, size selector (radio buttons), "Add to cart", description in `<details>` | Reusing components, forms |
| 3 | Add **search suggestions**: as you type, show matching product names under the search box (debounce the input, see [Coding Interview #9](../coding-interview/09-debounce-throttle.md)) | Events, debounce |
| 4 | Load the products from a **JSON file** with `fetch()` and build the cards with a `<template>` element | Data-driven UI |
| 5 | Show **skeleton loaders** (grey pulsing boxes) for 1 second before products appear | Loading states, animation |
| 6 | Build a **checkout page**: address form with validation, delivery slot picker, order summary | Forms, accessibility |
| 7 | Turn each component into an **Angular component** (`<app-header>`, `<app-product-card>`) or a **Web Component** (`<product-card>`) | Component frameworks |

## Where this fits in a real project

In a production store the same components appear, but:

* the HTML comes from **Angular/React components** instead of one file, and each component owns its CSS;
* products, prices and stock come from an **API**, and the cart lives on the **server** so it follows you across devices;
* prices are still **integers in the smallest currency unit**, exactly like `data-price="18900"` here;
* images go through a **CDN** with `srcset` sizes;
* everything is tested in **CI** with real browsers, just like this page.

The layout skills don't change. Learn them once here with plain HTML and CSS, and every framework becomes easier.
