# Layout Patterns

Real-world layouts you'll build again and again. Each has the code and a live, responsive output. Most demos react to your browser width; resize to see them adapt.

All of them, plus extra ones, are also on the standalone [Layout Gallery](../examples/layouts.html) page.

## 1. Centering: six ways { #centering }

<span class="lvl lvl-1">Beginner</span>

```css
/* 1. Grid: the shortest */
.a { display: grid; place-items: center; }

/* 2. Flexbox */
.b { display: flex; justify-content: center; align-items: center; }

/* 3. Flex/grid parent + margin auto on the child */
.c { display: flex; }  .c > * { margin: auto; }

/* 4. Absolute + translate (works anywhere, e.g. over an image) */
.d { position: relative; }  .d > * { position: absolute; top: 50%; left: 50%; translate: -50% -50%; }

/* 5. Absolute + inset + margin auto (child needs a size) */
.e > * { position: absolute; inset: 0; margin: auto; width: fit-content; height: fit-content; }

/* 6. Horizontal only: a block with a width */
.f > * { max-width: 40rem; margin-inline: auto; }

/* Text only */
.g { text-align: center; }
```

<div class="demo">
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.6em;font-size:.8em">
  <div class="c" style="display:grid;place-items:center;height:90px"><div class="b">grid</div></div>
  <div class="c" style="display:flex;justify-content:center;align-items:center;height:90px"><div class="b">flex</div></div>
  <div class="c" style="display:flex;height:90px"><div class="b" style="margin:auto">margin auto</div></div>
  <div class="c" style="position:relative;height:90px"><div class="b" style="position:absolute;top:50%;left:50%;translate:-50% -50%">translate</div></div>
  <div class="c" style="position:relative;height:90px"><div class="b" style="position:absolute;inset:0;margin:auto;width:fit-content;height:fit-content">inset 0</div></div>
</div>
</div>

## 2. Holy grail layout

<span class="lvl lvl-1">Beginner</span> Header, footer, main content between two sidebars. Stacks on mobile.

```html
<div class="holy">
  <header>Header</header>
  <nav>Nav</nav>
  <main>Main</main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</div>
```

```css
.holy {
  display: grid;
  gap: 1rem;
  grid-template: auto 1fr auto / 1fr;        /* rows / columns */
  grid-template-areas: "header" "nav" "main" "aside" "footer";
  min-height: 100dvh;
}
@media (width >= 48em) {
  .holy {
    grid-template-columns: 180px 1fr 180px;
    grid-template-areas:
      "header header header"
      "nav    main   aside"
      "footer footer footer";
  }
}
.holy > header { grid-area: header; }
.holy > nav    { grid-area: nav; }
.holy > main   { grid-area: main; }
.holy > aside  { grid-area: aside; }
.holy > footer { grid-area: footer; }
```

<div class="demo">
<div class="c pt-holy"><div class="b" style="grid-area:header">Header</div><div class="b" style="grid-area:nav">Nav</div><div class="b" style="grid-area:main;min-height:100px">Main</div><div class="b" style="grid-area:aside">Aside</div><div class="b" style="grid-area:footer">Footer</div></div>
<style>
  .pt-holy { display: grid; grid-template-areas: "header" "nav" "main" "aside" "footer"; }
  @media (width >= 48em) { .pt-holy { grid-template-columns: 120px 1fr 120px; grid-template-areas: "header header header" "nav main aside" "footer footer footer"; } }
</style>
</div>

## 3. Sidebar + content (intrinsic, no media query)

<span class="lvl lvl-2">Intermediate</span> The sidebar sits beside the content when there's room and wraps above it when there isn't.

```css
.with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }
.with-sidebar > :first-child { flex: 1 1 200px; }          /* sidebar: ideal 200px */
.with-sidebar > :last-child  { flex: 999 1 0; min-inline-size: 60%; }  /* content takes the rest; wraps under 60% */
```

<div class="demo">
<div class="c" style="display:flex;flex-wrap:wrap"><div class="b" style="flex:1 1 160px">Sidebar</div><div class="b" style="flex:999 1 0;min-inline-size:60%;min-height:80px">Content: grows to fill; when it would get narrower than 60%, the sidebar wraps above.</div></div>
</div>

## 4. Pancake stack + sticky footer

<span class="lvl lvl-1">Beginner</span> Header and footer take their natural height; main fills the rest, so the footer is always at the bottom even on short pages.

```css
body { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; }
```

<div class="demo">
<div class="c" style="display:grid;grid-template-rows:auto 1fr auto;height:200px"><div class="b">Header (auto)</div><div class="b">Main (1fr: fills the space)</div><div class="b">Footer (auto, pinned to the bottom)</div></div>
</div>

## 5. Responsive card grid (RAM)

<span class="lvl lvl-1">Beginner</span>

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 1rem;
}
```

<div class="demo">
<div class="c" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr))"><div class="b" style="height:70px">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div><div class="b">6</div></div>
</div>

## 6. Media object

<span class="lvl lvl-1">Beginner</span> Image on one side, text on the other: comments, notifications, list rows.

```html
<div class="media">
  <img src="avatar.jpg" alt="" width="56" height="56">
  <div>
    <h4>Asha Rao</h4>
    <p>Pushed 3 commits to main. The layout fix for Safari is in.</p>
  </div>
</div>
```

```css
.media { display: flex; gap: 1rem; align-items: flex-start; }
.media img { flex-shrink: 0; border-radius: 50%; }
```

<div class="demo">
<div style="display:flex;gap:1rem;align-items:flex-start">
  <div style="flex-shrink:0;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#e4572e,#f3a712)"></div>
  <div><h4 style="margin:0">Asha Rao</h4><p style="margin:.2em 0 0">Pushed 3 commits to main. The layout fix for Safari is in.</p></div>
</div>
</div>

## 7. Split screen

<span class="lvl lvl-1">Beginner</span> Two equal halves (login pages, landing heroes). Stacks on mobile.

```css
.split { display: grid; min-height: 100dvh; }
@media (width >= 48em) { .split { grid-template-columns: 1fr 1fr; } }
```

<div class="demo">
<div class="pt-split"><div style="background:linear-gradient(135deg,#e4572e,#f3a712);color:#fff;display:grid;place-items:center;font-weight:800;font-size:1.3em">Brand side</div><div style="display:grid;place-items:center;padding:1em"><form onsubmit="return false" style="display:grid;gap:.5em;width:min(100%,220px)"><label>Email <input type="email" style="width:100%"></label><button>Sign in</button></form></div></div>
<style>
  .pt-split { display: grid; min-height: 200px; border-radius: 10px; overflow: hidden; border: 1px solid var(--demo-border); }
  .pt-split > div:first-child { min-height: 90px; }
  @media (width >= 48em) { .pt-split { grid-template-columns: 1fr 1fr; } }
</style>
</div>

## 8. 12-column grid

<span class="lvl lvl-2">Intermediate</span> The classic design-system grid (Bootstrap, Material). Items span a number of columns.

```css
.row { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem; }
.col-12 { grid-column: span 12; }
.col-8  { grid-column: span 8; }
.col-6  { grid-column: span 6; }
.col-4  { grid-column: span 4; }
.col-3  { grid-column: span 3; }
@media (width < 48em) { .row > * { grid-column: 1 / -1; } }   /* stack on mobile */
```

<div class="demo">
<div class="c pt-12">
  <div class="b" style="grid-column:span 12">12</div>
  <div class="b" style="grid-column:span 8">8</div><div class="b" style="grid-column:span 4">4</div>
  <div class="b" style="grid-column:span 6">6</div><div class="b" style="grid-column:span 6">6</div>
  <div class="b" style="grid-column:span 3">3</div><div class="b" style="grid-column:span 3">3</div><div class="b" style="grid-column:span 3">3</div><div class="b" style="grid-column:span 3">3</div>
</div>
<style>
  .pt-12 { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); }
  @media (width < 36em) { .pt-12 > * { grid-column: 1 / -1 !important; } }
</style>
</div>

## 9. Bento grid

<span class="lvl lvl-2">Intermediate</span> The 2024–2026 favourite for feature sections: tiles of different sizes in a tight grid.

```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 120px;
  gap: 1rem;
}
.bento .big  { grid-column: span 2; grid-row: span 2; }
.bento .wide { grid-column: span 2; }
.bento .tall { grid-row: span 2; }
@media (width < 40em) {
  .bento { grid-template-columns: 1fr 1fr; }
}
```

<div class="demo">
<div class="pt-bento">
  <div class="big">Big feature</div><div class="tall">Tall</div><div>Small</div><div>Small</div><div class="wide">Wide tile</div><div>Small</div>
</div>
<style>
  .pt-bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 90px; gap: .7em; }
  .pt-bento > div { border-radius: 16px; padding: .8em; font-weight: 700; color: #fff; background: linear-gradient(135deg, #3f51b5, #7c4dff); }
  .pt-bento .big { grid-column: span 2; grid-row: span 2; background: linear-gradient(135deg, #e4572e, #f3a712); font-size: 1.3em; }
  .pt-bento .wide { grid-column: span 2; background: linear-gradient(135deg, #2e9d4f, #8bc34a); }
  .pt-bento .tall { grid-row: span 2; background: linear-gradient(135deg, #c2185b, #ff6f91); }
  @media (width < 40em) { .pt-bento { grid-template-columns: 1fr 1fr; } }
</style>
</div>

## 10. Masonry { #masonry }

<span class="lvl lvl-2">Intermediate</span> Pinterest-style columns of uneven heights. Until native masonry is Baseline, CSS multi-column is the simplest no-JS approach (items flow top-to-bottom, then into the next column).

```css
.masonry { columns: 3 180px; column-gap: 1rem; }
.masonry > * { break-inside: avoid; margin-bottom: 1rem; }
```

<div class="demo">
<div style="columns:3 140px;column-gap:.7em">
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:80px">1</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:140px">2</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:60px">3</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:110px">4</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:90px">5</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:130px">6</div>
  <div class="b" style="break-inside:avoid;margin-bottom:.7em;height:70px">7</div>
</div>
</div>

## 11. Full-bleed article { #full-bleed-article }

<span class="lvl lvl-3">Advanced</span> Readable text column, with some elements (images, quotes) breaking out to the full width.

```css
.article {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] minmax(0, 65ch) [content-end]
    minmax(1rem, 1fr) [full-end];
}
.article > *     { grid-column: content; }
.article > .full { grid-column: full; }
```

<div class="demo">
<div style="display:grid;grid-template-columns:[full-start] minmax(1rem,1fr) [content-start] minmax(0,28rem) [content-end] minmax(1rem,1fr) [full-end];row-gap:.6em">
  <p style="grid-column:content;margin:0">Body text stays in a narrow, readable column.</p>
  <div style="grid-column:full;height:90px;background:linear-gradient(135deg,#e4572e,#3f51b5);border-radius:6px;display:grid;place-items:center;color:#fff;font-weight:700">Full-bleed image</div>
  <p style="grid-column:content;margin:0">…and returns to the column afterwards, without extra wrapper divs.</p>
</div>
</div>

## 12. Dashboard

<span class="lvl lvl-2">Intermediate</span> Sidebar navigation, a top bar, KPI tiles and panels.

```css
.dash { display: grid; grid-template-columns: 220px 1fr; grid-template-rows: 56px 1fr; min-height: 100dvh; }
.dash .side { grid-row: 1 / -1; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; }
.panels { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }
@media (width < 56em) {
  .dash { grid-template-columns: 1fr; }
  .dash .side { grid-row: auto; }
  .panels { grid-template-columns: 1fr; }
}
```

<div class="demo">
<div class="pt-dash">
  <div class="side">☰ Sidebar</div>
  <div class="top">Top bar · search · profile</div>
  <div class="body">
    <div class="kpis"><div>Revenue<br><b>₹4.2L</b></div><div>Users<br><b>12,480</b></div><div>Orders<br><b>932</b></div><div>NPS<br><b>61</b></div></div>
    <div class="panels"><div style="min-height:110px">Chart panel (2fr)</div><div>Activity (1fr)</div></div>
  </div>
</div>
<style>
  .pt-dash { display: grid; grid-template-columns: 140px 1fr; grid-template-rows: 44px 1fr; gap: .6em; font-size: .85em; }
  .pt-dash > div, .pt-dash .kpis > div, .pt-dash .panels > div { border-radius: 8px; padding: .6em; background: rgba(128,128,128,.12); }
  .pt-dash .side { grid-row: 1 / -1; background: #1f2329; color: #fff; }
  .pt-dash .top { background: var(--box-b); }
  .pt-dash .body { display: grid; gap: .6em; background: none; padding: 0; }
  .pt-dash .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: .6em; }
  .pt-dash .kpis b { font-size: 1.4em; }
  .pt-dash .panels { display: grid; grid-template-columns: 2fr 1fr; gap: .6em; }
  @media (width < 56em) { .pt-dash { grid-template-columns: 1fr; } .pt-dash .side { grid-row: auto; } .pt-dash .panels { grid-template-columns: 1fr; } }
</style>
</div>

## 13. Magazine / editorial

<span class="lvl lvl-2">Intermediate</span> One lead story, secondary stories, a sidebar list.

```css
.mag { display: grid; gap: 1rem; grid-template-columns: repeat(4, 1fr); }
.mag .lead { grid-column: span 2; grid-row: span 2; }
.mag .list { grid-column: 4; grid-row: 1 / span 2; }
@media (width < 48em) { .mag { grid-template-columns: 1fr 1fr; } .mag .list { grid-column: 1 / -1; grid-row: auto; } }
```

<div class="demo">
<div class="c pt-mag"><div class="b lead">Lead story</div><div class="b">Story</div><div class="b list">Most read<br>1 · 2 · 3 · 4</div><div class="b">Story</div></div>
<style>
  .pt-mag { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 70px; }
  .pt-mag .lead { grid-column: span 2; grid-row: span 2; }
  .pt-mag .list { grid-column: 4; grid-row: 1 / span 2; }
  @media (width < 48em) { .pt-mag { grid-template-columns: 1fr 1fr; } .pt-mag .list { grid-column: 1 / -1; grid-row: auto; } }
</style>
</div>

## 14. Header with nav

<span class="lvl lvl-1">Beginner</span>

```css
.header { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.header .nav { display: flex; gap: 1rem; margin-inline-start: auto; }
```

<div class="demo">
<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;padding:.6em 1em;border-radius:10px;background:#1f2329;color:#fff">
  <strong>◆ Brand</strong>
  <nav style="display:flex;gap:1rem;margin-inline-start:auto;flex-wrap:wrap"><a style="color:#fff" href="#14-header-with-nav">Product</a><a style="color:#fff" href="#14-header-with-nav">Pricing</a><a style="color:#fff" href="#14-header-with-nav">Docs</a></nav>
  <button style="background:#e4572e;color:#fff;border:0;padding:.4em .9em;border-radius:6px">Sign up</button>
</div>
</div>

The collapsing mobile version is in [Responsive → navigation](responsive.md#responsive-navigation).

## 15. Pricing table

<span class="lvl lvl-1">Beginner</span> See [Reverse Engineering → Pricing card](../reverse-engineering/recipes.md#pricing-card) for the full card.

```css
.pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; align-items: center; }
.pricing .featured { scale: 1.05; border: 2px solid var(--brand); }
```

## 16. Z-pattern hero

<span class="lvl lvl-2">Intermediate</span> Text and image alternate sides down the page: the eye zig-zags.

```css
.feature { display: grid; gap: 2rem; align-items: center; }
@media (width >= 48em) {
  .feature { grid-template-columns: 1fr 1fr; }
  .feature:nth-child(even) .media { order: -1; }   /* image on the left for every other row */
}
```

<div class="demo">
<div class="pt-z">
  <div class="feature"><div><strong>Fast</strong><br>Text on the left, image on the right.</div><div class="media"></div></div>
  <div class="feature"><div><strong>Secure</strong><br>Next row flips: image on the left.</div><div class="media"></div></div>
</div>
<style>
  .pt-z { display: grid; gap: 1em; }
  .pt-z .feature { display: grid; gap: 1em; align-items: center; }
  .pt-z .media { height: 80px; border-radius: 10px; background: linear-gradient(135deg, #e4572e, #f3a712); }
  @media (width >= 48em) { .pt-z .feature { grid-template-columns: 1fr 1fr; } .pt-z .feature:nth-child(even) .media { order: -1; } }
</style>
</div>

## 17. Content grid with `:has()` adaptivity

<span class="lvl lvl-3">Advanced</span> A grid that changes its column count depending on how many items it has, with no JS.

```css
.auto { display: grid; gap: 1rem; grid-template-columns: 1fr; }
.auto:has(> :nth-child(2)) { grid-template-columns: repeat(2, 1fr); }
.auto:has(> :nth-child(5)) { grid-template-columns: repeat(3, 1fr); }
```

<div class="demo">
<div class="pt-auto c"><div class="b">1 item = 1 column</div></div>
<div class="pt-auto c" style="margin-top:.6em"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
<div class="pt-auto c" style="margin-top:.6em"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div></div>
<style>
  .pt-auto { display: grid; grid-template-columns: 1fr; }
  .pt-auto:has(> :nth-child(2)) { grid-template-columns: repeat(2, 1fr); }
  .pt-auto:has(> :nth-child(5)) { grid-template-columns: repeat(3, 1fr); }
</style>
</div>
