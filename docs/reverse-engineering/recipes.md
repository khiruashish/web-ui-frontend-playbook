# See This → Write This

32 common UI pieces. Each recipe starts with **what you see**, shows the **live output**, then gives the exact HTML and CSS that produce it. The code in the boxes is the same code running in the Output.

Each Output is rendered in an isolated frame with only a minimal base style (font, 16px padding) plus the CSS shown, so nothing from this documentation site leaks in. It's exactly what you'd get in a blank page.

Try covering the code and building each one yourself first. See [the method](index.md) if you get stuck.

!!! note "Shared helpers"
    A few recipes (toast, cookie banner, empty state) reuse the `.btn` classes from [Button set](#buttons). They are loaded into every Output frame.

## Index

| # | Recipe | Level |
|---|---|---|
| 1 | [Pill badges](#pill-badge) | 🟢 |
| 2 | [Overlapping avatar stack](#avatar-stack) | 🟢 |
| 3 | [Button set: primary, secondary, ghost, icon](#buttons) | 🟢 |
| 4 | [Card with image, tag and footer](#image-card) | 🟢 |
| 5 | [Sticky header with blur](#sticky-header) | 🟡 |
| 6 | [Mobile nav with a burger button (no JS)](#burger-nav) | 🟡 |
| 7 | [Tabs (CSS-only with radio buttons)](#tabs) | 🟡 |
| 8 | [FAQ accordion](#accordion) | 🟢 |
| 9 | [Toast notification](#toast) | 🟡 |
| 10 | [CSS-only tooltip](#tooltip) | 🟡 |
| 11 | [Breadcrumbs](#breadcrumbs) | 🟢 |
| 12 | [Pagination](#pagination) | 🟢 |
| 13 | [Progress stepper](#stepper) | 🟡 |
| 14 | [Vertical timeline](#timeline) | 🟡 |
| 15 | [Pricing cards with a featured plan](#pricing-card) | 🟢 |
| 16 | [Hero with background image and overlay](#hero-overlay) | 🟢 |
| 17 | [Truncated text with ellipsis](#truncate) | 🟢 |
| 18 | [Skeleton loading card](#skeleton) | 🟢 |
| 19 | [Toggle switch](#toggle-switch) | 🟡 |
| 20 | [Search bar with icon and button](#search-bar) | 🟢 |
| 21 | [Floating label input](#floating-label) | 🟡 |
| 22 | [Wrapping tag chips](#chips) | 🟢 |
| 23 | [Icon with notification count](#notification-dot) | 🟢 |
| 24 | [Divider with text in the middle](#divider-text) | 🟢 |
| 25 | [Testimonial card](#testimonial) | 🟢 |
| 26 | [KPI / stat cards](#kpi-card) | 🟢 |
| 27 | [Multi-column footer](#footer-columns) | 🟢 |
| 28 | [Bottom banner (cookies / announcements)](#cookie-banner) | 🟡 |
| 29 | [Star rating display](#rating) | 🟡 |
| 30 | [Circular progress ring](#progress-ring) | 🟡 |
| 31 | [Empty state](#empty-state) | 🟢 |
| 32 | [Gradient border card](#gradient-border) | 🟡 |

## 1. Pill badges { #pill-badge }

<span class="lvl lvl-1">Beginner</span> **You see:** Small rounded labels with a tinted background: "New", "Beta", status tags.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Pill badges" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.pill {
  --pill: #e4572e;
  display: inline-flex; align-items: center;
  padding: .2em .7em;
  border-radius: 999px;
  font: 600 .75rem/1.4 system-ui, sans-serif;
  color: var(--pill);
  background: color-mix(in srgb, var(--pill) 15%, transparent);
}
.pill--green { --pill: #2e9d4f; }
.pill--gray  { --pill: #6b7280; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;span class=&quot;pill&quot;&gt;New&lt;/span&gt;
&lt;span class=&quot;pill pill--green&quot;&gt;Active&lt;/span&gt;
&lt;span class=&quot;pill pill--gray&quot;&gt;Draft&lt;/span&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <span class="pill">New</span>
    <span class="pill pill--green">Active</span>
    <span class="pill pill--gray">Draft</span>
    ```

=== "CSS"

    ```css
    .pill {
      --pill: #e4572e;
      display: inline-flex; align-items: center;
      padding: .2em .7em;
      border-radius: 999px;
      font: 600 .75rem/1.4 system-ui, sans-serif;
      color: var(--pill);
      background: color-mix(in srgb, var(--pill) 15%, transparent);
    }
    .pill--green { --pill: #2e9d4f; }
    .pill--gray  { --pill: #6b7280; }
    ```

**Why it works:** One custom property drives both text and background colour, so a new variant is one line.

## 2. Overlapping avatar stack { #avatar-stack }

<span class="lvl lvl-1">Beginner</span> **You see:** A row of circular profile pictures that overlap, often ending in "+5".

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Overlapping avatar stack" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.avatars { display: flex; }
.avatars &gt; * {
  display: grid; place-items: center;
  width: 40px; aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #fff;
  background: var(--c); color: #fff;
  font: 700 .8rem system-ui;
}
.avatars &gt; * + * { margin-inline-start: -12px; }   /* the overlap */&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;avatars&quot;&gt;
  &lt;span style=&quot;--c:#e4572e&quot;&gt;AR&lt;/span&gt;
  &lt;span style=&quot;--c:#3f51b5&quot;&gt;RK&lt;/span&gt;
  &lt;span style=&quot;--c:#2e9d4f&quot;&gt;MS&lt;/span&gt;
  &lt;span style=&quot;--c:#6b7280&quot;&gt;+5&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="avatars">
      <span style="--c:#e4572e">AR</span>
      <span style="--c:#3f51b5">RK</span>
      <span style="--c:#2e9d4f">MS</span>
      <span style="--c:#6b7280">+5</span>
    </div>
    ```

=== "CSS"

    ```css
    .avatars { display: flex; }
    .avatars > * {
      display: grid; place-items: center;
      width: 40px; aspect-ratio: 1;
      border-radius: 50%;
      border: 3px solid #fff;
      background: var(--c); color: #fff;
      font: 700 .8rem system-ui;
    }
    .avatars > * + * { margin-inline-start: -12px; }   /* the overlap */
    ```

**Why it works:** Negative margin on every item except the first creates the overlap. The white border separates them.

## 3. Button set: primary, secondary, ghost, icon { #buttons }

<span class="lvl lvl-1">Beginner</span> **You see:** A solid main button, an outlined one, a text-only one and a round icon button.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Button set: primary, secondary, ghost, icon" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;btns&quot;&gt;
  &lt;button class=&quot;btn btn--primary&quot;&gt;Save changes&lt;/button&gt;
  &lt;button class=&quot;btn btn--secondary&quot;&gt;Cancel&lt;/button&gt;
  &lt;button class=&quot;btn btn--ghost&quot;&gt;Learn more →&lt;/button&gt;
  &lt;button class=&quot;btn btn--icon&quot; aria-label=&quot;Settings&quot;&gt;⚙&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="btns">
      <button class="btn btn--primary">Save changes</button>
      <button class="btn btn--secondary">Cancel</button>
      <button class="btn btn--ghost">Learn more →</button>
      <button class="btn btn--icon" aria-label="Settings">⚙</button>
    </div>
    ```

=== "CSS"

    ```css
    .btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
    .btn {
      font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
      border-radius: 8px; border: 2px solid transparent; cursor: pointer;
      transition: background-color .15s, scale .1s;
    }
    .btn:active { scale: .97; }
    .btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
    .btn--primary { background: #e4572e; color: #fff; }
    .btn--primary:hover { background: #c43d17; }
    .btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
    .btn--ghost { background: transparent; color: #e4572e; }
    .btn--ghost:hover { background: #e4572e1a; }
    .btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }
    ```

**Why it works:** Icon-only buttons need an <code>aria-label</code>. 44×44px keeps them easy to tap.

## 4. Card with image, tag and footer { #image-card }

<span class="lvl lvl-1">Beginner</span> **You see:** Product or blog card: image on top, small tag, title, short text, footer row with meta and action.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Card with image, tag and footer" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.pcard {
  max-inline-size: 300px; display: flex; flex-direction: column;
  background: #fff; color: #1f2329;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 4px 20px rgb(0 0 0 / .08);
  transition: translate .2s, box-shadow .2s;
}
.pcard:hover { translate: 0 -4px; box-shadow: 0 12px 30px rgb(0 0 0 / .12); }
.pcard img { inline-size: 100%; height: auto; aspect-ratio: 5 / 3; object-fit: cover; display: block; }
.pcard__body { padding: 1rem; display: grid; gap: .4rem; }
.pcard__body h3, .pcard__body p { margin: 0; }
.pcard__tag { justify-self: start; font: 700 .7rem system-ui; text-transform: uppercase; letter-spacing: .08em; color: #e4572e; }
.pcard__foot { margin-top: auto; display: flex; justify-content: space-between; padding: .75rem 1rem; border-top: 1px solid #eee; font-size: .85rem; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;article class=&quot;pcard&quot;&gt;
  &lt;img src=&quot;https://picsum.photos/id/1080/600/360&quot; alt=&quot;Strawberries in a bowl&quot; width=&quot;600&quot; height=&quot;360&quot;&gt;
  &lt;div class=&quot;pcard__body&quot;&gt;
    &lt;span class=&quot;pcard__tag&quot;&gt;Recipe&lt;/span&gt;
    &lt;h3&gt;Summer berry bowl&lt;/h3&gt;
    &lt;p&gt;Fresh strawberries, yoghurt and honey. Ready in five minutes.&lt;/p&gt;
  &lt;/div&gt;
  &lt;footer class=&quot;pcard__foot&quot;&gt;&lt;span&gt;5 min · Easy&lt;/span&gt;&lt;a href=&quot;#image-card&quot;&gt;Read →&lt;/a&gt;&lt;/footer&gt;
&lt;/article&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <article class="pcard">
      <img src="https://picsum.photos/id/1080/600/360" alt="Strawberries in a bowl" width="600" height="360">
      <div class="pcard__body">
        <span class="pcard__tag">Recipe</span>
        <h3>Summer berry bowl</h3>
        <p>Fresh strawberries, yoghurt and honey. Ready in five minutes.</p>
      </div>
      <footer class="pcard__foot"><span>5 min · Easy</span><a href="#image-card">Read →</a></footer>
    </article>
    ```

=== "CSS"

    ```css
    .pcard {
      max-inline-size: 300px; display: flex; flex-direction: column;
      background: #fff; color: #1f2329;
      border-radius: 16px; overflow: hidden;
      box-shadow: 0 4px 20px rgb(0 0 0 / .08);
      transition: translate .2s, box-shadow .2s;
    }
    .pcard:hover { translate: 0 -4px; box-shadow: 0 12px 30px rgb(0 0 0 / .12); }
    .pcard img { inline-size: 100%; height: auto; aspect-ratio: 5 / 3; object-fit: cover; display: block; }
    .pcard__body { padding: 1rem; display: grid; gap: .4rem; }
    .pcard__body h3, .pcard__body p { margin: 0; }
    .pcard__tag { justify-self: start; font: 700 .7rem system-ui; text-transform: uppercase; letter-spacing: .08em; color: #e4572e; }
    .pcard__foot { margin-top: auto; display: flex; justify-content: space-between; padding: .75rem 1rem; border-top: 1px solid #eee; font-size: .85rem; }
    ```

**Why it works:** <code>overflow: hidden</code> clips the image to the rounded corners. <code>margin-top: auto</code> keeps the footer at the bottom when cards in a row have different text lengths.

## 5. Sticky header with blur { #sticky-header }

<span class="lvl lvl-2">Intermediate</span> **You see:** A header that stays at the top while the page scrolls, with the content blurred behind it.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Sticky header with blur" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.scroll-demo { block-size: 200px; overflow: auto; border-radius: 10px; background: linear-gradient(#ffe0d4, #d4dcff); color: #1f2329; }
.scroll-demo p { margin: 1rem; }
.sticky-head {
  position: sticky; top: 0; z-index: 10;
  display: flex; justify-content: space-between; align-items: center;
  padding: .75rem 1rem;
  background: rgb(255 255 255 / .7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgb(0 0 0 / .08);
}
.sticky-head nav { display: flex; gap: 1rem; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;scroll-demo&quot;&gt;
  &lt;header class=&quot;sticky-head&quot;&gt;&lt;strong&gt;◆ Brand&lt;/strong&gt;&lt;nav&gt;&lt;a href=&quot;#sticky-header&quot;&gt;Docs&lt;/a&gt; &lt;a href=&quot;#sticky-header&quot;&gt;Blog&lt;/a&gt;&lt;/nav&gt;&lt;/header&gt;
  &lt;p&gt;Scroll this box ↓&lt;/p&gt;&lt;p&gt;Content…&lt;/p&gt;&lt;p&gt;More content…&lt;/p&gt;&lt;p&gt;The header stays put and blurs what passes under it.&lt;/p&gt;&lt;p&gt;…&lt;/p&gt;&lt;p&gt;…&lt;/p&gt;&lt;p&gt;End.&lt;/p&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="scroll-demo">
      <header class="sticky-head"><strong>◆ Brand</strong><nav><a href="#sticky-header">Docs</a> <a href="#sticky-header">Blog</a></nav></header>
      <p>Scroll this box ↓</p><p>Content…</p><p>More content…</p><p>The header stays put and blurs what passes under it.</p><p>…</p><p>…</p><p>End.</p>
    </div>
    ```

=== "CSS"

    ```css
    .scroll-demo { block-size: 200px; overflow: auto; border-radius: 10px; background: linear-gradient(#ffe0d4, #d4dcff); color: #1f2329; }
    .scroll-demo p { margin: 1rem; }
    .sticky-head {
      position: sticky; top: 0; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
      padding: .75rem 1rem;
      background: rgb(255 255 255 / .7);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgb(0 0 0 / .08);
    }
    .sticky-head nav { display: flex; gap: 1rem; }
    ```

**Why it works:** On a real page put <code>position: sticky; top: 0</code> on the site header and add <code>scroll-padding-top</code> on <code>html</code> so anchor links don't hide under it.

## 6. Mobile nav with a burger button (no JS) { #burger-nav }

<span class="lvl lvl-2">Intermediate</span> **You see:** A ☰ button on small screens that opens a menu panel; on wide screens the links show inline.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Mobile nav with a burger button (no JS)" style="height:300px" data-min="300" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.bnav { display: flex; align-items: center; justify-content: space-between; padding: .75rem 1rem; border-radius: 10px; background: #1f2329; color: #fff; }
.bnav__btn { font-size: 1.4rem; background: none; border: 0; color: inherit; cursor: pointer; }
.bnav__menu:popover-open {
  display: flex; flex-direction: column; gap: .25rem;
  inset: auto; margin: 0; position: fixed; top: 4rem; right: 1rem;
  padding: .5rem; border: 0; border-radius: 12px;
  background: #fff; box-shadow: 0 10px 40px rgb(0 0 0 / .25);
}
.bnav__menu a { padding: .6rem 1rem; border-radius: 8px; color: #1f2329; text-decoration: none; }
.bnav__menu a:hover { background: #f2f2f2; }
@media (width &gt;= 48em) {
  .bnav__btn { display: none; }
  .bnav__menu { display: flex; gap: 1.25rem; position: static; padding: 0; border: 0; background: none; overflow: visible; }
  .bnav__menu a { color: #fff; padding: 0; }
  .bnav__menu a:hover { background: none; text-decoration: underline; }
}&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;header class=&quot;bnav&quot;&gt;
  &lt;strong&gt;◆ Brand&lt;/strong&gt;
  &lt;button class=&quot;bnav__btn&quot; popovertarget=&quot;bnav-menu&quot; aria-label=&quot;Open menu&quot;&gt;☰&lt;/button&gt;
  &lt;nav id=&quot;bnav-menu&quot; class=&quot;bnav__menu&quot; popover&gt;
    &lt;a href=&quot;#burger-nav&quot;&gt;Home&lt;/a&gt;&lt;a href=&quot;#burger-nav&quot;&gt;Pricing&lt;/a&gt;&lt;a href=&quot;#burger-nav&quot;&gt;Docs&lt;/a&gt;&lt;a href=&quot;#burger-nav&quot;&gt;Contact&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <header class="bnav">
      <strong>◆ Brand</strong>
      <button class="bnav__btn" popovertarget="bnav-menu" aria-label="Open menu">☰</button>
      <nav id="bnav-menu" class="bnav__menu" popover>
        <a href="#burger-nav">Home</a><a href="#burger-nav">Pricing</a><a href="#burger-nav">Docs</a><a href="#burger-nav">Contact</a>
      </nav>
    </header>
    ```

=== "CSS"

    ```css
    .bnav { display: flex; align-items: center; justify-content: space-between; padding: .75rem 1rem; border-radius: 10px; background: #1f2329; color: #fff; }
    .bnav__btn { font-size: 1.4rem; background: none; border: 0; color: inherit; cursor: pointer; }
    .bnav__menu:popover-open {
      display: flex; flex-direction: column; gap: .25rem;
      inset: auto; margin: 0; position: fixed; top: 4rem; right: 1rem;
      padding: .5rem; border: 0; border-radius: 12px;
      background: #fff; box-shadow: 0 10px 40px rgb(0 0 0 / .25);
    }
    .bnav__menu a { padding: .6rem 1rem; border-radius: 8px; color: #1f2329; text-decoration: none; }
    .bnav__menu a:hover { background: #f2f2f2; }
    @media (width >= 48em) {
      .bnav__btn { display: none; }
      .bnav__menu { display: flex; gap: 1.25rem; position: static; padding: 0; border: 0; background: none; overflow: visible; }
      .bnav__menu a { color: #fff; padding: 0; }
      .bnav__menu a:hover { background: none; text-decoration: underline; }
    }
    ```

**Why it works:** The <code>popover</code> attribute gives you open/close, outside-click and Escape handling for free. Narrow your browser to see the button.

## 7. Tabs (CSS-only with radio buttons) { #tabs }

<span class="lvl lvl-2">Intermediate</span> **You see:** A row of tab labels with an underline on the active one; the panel below switches.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Tabs (CSS-only with radio buttons)" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.tabset { display: flex; flex-wrap: wrap; border-bottom: 2px solid #e5e7eb; }
.tabset input { position: absolute; opacity: 0; pointer-events: none; }
.tabset label { padding: .6rem 1rem; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; font-weight: 600; opacity: .7; }
.tabset input:checked + label { border-color: #e4572e; color: #e4572e; opacity: 1; }
.tabset input:focus-visible + label { outline: 2px solid #3f51b5; }
.tabset__panel { display: none; order: 1; flex-basis: 100%; padding: 1rem 0; }
#tab1:checked ~ .tabset__panel:nth-of-type(1),
#tab2:checked ~ .tabset__panel:nth-of-type(2),
#tab3:checked ~ .tabset__panel:nth-of-type(3) { display: block; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;tabset&quot;&gt;
  &lt;input type=&quot;radio&quot; name=&quot;tabset&quot; id=&quot;tab1&quot; checked&gt;&lt;label for=&quot;tab1&quot;&gt;Overview&lt;/label&gt;
  &lt;input type=&quot;radio&quot; name=&quot;tabset&quot; id=&quot;tab2&quot;&gt;&lt;label for=&quot;tab2&quot;&gt;Specs&lt;/label&gt;
  &lt;input type=&quot;radio&quot; name=&quot;tabset&quot; id=&quot;tab3&quot;&gt;&lt;label for=&quot;tab3&quot;&gt;Reviews&lt;/label&gt;
  &lt;div class=&quot;tabset__panel&quot;&gt;Overview: lightweight, fast, made for everyday use.&lt;/div&gt;
  &lt;div class=&quot;tabset__panel&quot;&gt;Specs: 1.2 kg · 14&quot; display · 18 h battery.&lt;/div&gt;
  &lt;div class=&quot;tabset__panel&quot;&gt;Reviews: ★★★★☆ (1,204 reviews)&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="tabset">
      <input type="radio" name="tabset" id="tab1" checked><label for="tab1">Overview</label>
      <input type="radio" name="tabset" id="tab2"><label for="tab2">Specs</label>
      <input type="radio" name="tabset" id="tab3"><label for="tab3">Reviews</label>
      <div class="tabset__panel">Overview: lightweight, fast, made for everyday use.</div>
      <div class="tabset__panel">Specs: 1.2 kg · 14" display · 18 h battery.</div>
      <div class="tabset__panel">Reviews: ★★★★☆ (1,204 reviews)</div>
    </div>
    ```

=== "CSS"

    ```css
    .tabset { display: flex; flex-wrap: wrap; border-bottom: 2px solid #e5e7eb; }
    .tabset input { position: absolute; opacity: 0; pointer-events: none; }
    .tabset label { padding: .6rem 1rem; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; font-weight: 600; opacity: .7; }
    .tabset input:checked + label { border-color: #e4572e; color: #e4572e; opacity: 1; }
    .tabset input:focus-visible + label { outline: 2px solid #3f51b5; }
    .tabset__panel { display: none; order: 1; flex-basis: 100%; padding: 1rem 0; }
    #tab1:checked ~ .tabset__panel:nth-of-type(1),
    #tab2:checked ~ .tabset__panel:nth-of-type(2),
    #tab3:checked ~ .tabset__panel:nth-of-type(3) { display: block; }
    ```

**Why it works:** Radio buttons hold the state and arrow keys switch tabs. For a production component, use buttons with <code>role="tab"</code>, <code>aria-selected</code> and a few lines of JS to follow the ARIA tabs pattern exactly.

## 8. FAQ accordion { #accordion }

<span class="lvl lvl-1">Beginner</span> **You see:** A list of questions; clicking one expands the answer and rotates a chevron.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: FAQ accordion" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.faq { display: grid; gap: .5rem; max-inline-size: 480px; }
.faq details { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0 1rem; }
.faq summary { list-style: none; cursor: pointer; padding: .9rem 0; font-weight: 600; display: flex; justify-content: space-between; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: &quot;⌄&quot;; transition: rotate .2s; }
.faq details[open] summary::after { rotate: 180deg; }
.faq p { margin: 0 0 1rem; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;faq&quot;&gt;
  &lt;details name=&quot;faq-r&quot; open&gt;&lt;summary&gt;How long is shipping?&lt;/summary&gt;&lt;p&gt;3–5 working days across India.&lt;/p&gt;&lt;/details&gt;
  &lt;details name=&quot;faq-r&quot;&gt;&lt;summary&gt;Can I return an item?&lt;/summary&gt;&lt;p&gt;Yes, within 30 days, free of charge.&lt;/p&gt;&lt;/details&gt;
  &lt;details name=&quot;faq-r&quot;&gt;&lt;summary&gt;Do you ship abroad?&lt;/summary&gt;&lt;p&gt;Not yet. We&#x27;re working on it.&lt;/p&gt;&lt;/details&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="faq">
      <details name="faq-r" open><summary>How long is shipping?</summary><p>3–5 working days across India.</p></details>
      <details name="faq-r"><summary>Can I return an item?</summary><p>Yes, within 30 days, free of charge.</p></details>
      <details name="faq-r"><summary>Do you ship abroad?</summary><p>Not yet. We're working on it.</p></details>
    </div>
    ```

=== "CSS"

    ```css
    .faq { display: grid; gap: .5rem; max-inline-size: 480px; }
    .faq details { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0 1rem; }
    .faq summary { list-style: none; cursor: pointer; padding: .9rem 0; font-weight: 600; display: flex; justify-content: space-between; }
    .faq summary::-webkit-details-marker { display: none; }
    .faq summary::after { content: "⌄"; transition: rotate .2s; }
    .faq details[open] summary::after { rotate: 180deg; }
    .faq p { margin: 0 0 1rem; }
    ```

**Why it works:** <code>name</code> makes it exclusive: opening one closes the others.

## 9. Toast notification { #toast }

<span class="lvl lvl-2">Intermediate</span> **You see:** A small message box that slides in at the bottom-right, then disappears.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Toast notification" style="height:170px" data-min="170" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.toast {
  position: fixed; inset: auto 1.5rem 1.5rem auto; margin: 0;
  padding: .9rem 1.2rem; border: 0; border-radius: 10px;
  background: #1f2329; color: #fff; box-shadow: 0 10px 30px rgb(0 0 0 / .3);
  transition: opacity .3s, translate .3s, display .3s allow-discrete, overlay .3s allow-discrete;
  opacity: 0; translate: 0 1rem;
}
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;button class=&quot;btn btn--primary&quot; onclick=&quot;var t=document.getElementById(&#x27;toast-r&#x27;);t.showPopover();clearTimeout(t._t);t._t=setTimeout(function(){t.hidePopover()},2500)&quot;&gt;Show toast&lt;/button&gt;
&lt;div id=&quot;toast-r&quot; class=&quot;toast&quot; popover=&quot;manual&quot; role=&quot;status&quot;&gt;✔ Changes saved&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <button class="btn btn--primary" onclick="var t=document.getElementById('toast-r');t.showPopover();clearTimeout(t._t);t._t=setTimeout(function(){t.hidePopover()},2500)">Show toast</button>
    <div id="toast-r" class="toast" popover="manual" role="status">✔ Changes saved</div>
    ```

=== "CSS"

    ```css
    .toast {
      position: fixed; inset: auto 1.5rem 1.5rem auto; margin: 0;
      padding: .9rem 1.2rem; border: 0; border-radius: 10px;
      background: #1f2329; color: #fff; box-shadow: 0 10px 30px rgb(0 0 0 / .3);
      transition: opacity .3s, translate .3s, display .3s allow-discrete, overlay .3s allow-discrete;
      opacity: 0; translate: 0 1rem;
    }
    .toast:popover-open { opacity: 1; translate: 0 0; }
    @starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }
    ```

**Why it works:** <code>popover="manual"</code> puts it on the top layer without light-dismiss. <code>@starting-style</code> animates it in; <code>allow-discrete</code> animates it out. <code>role="status"</code> makes screen readers announce it.

## 10. CSS-only tooltip { #tooltip }

<span class="lvl lvl-2">Intermediate</span> **You see:** A small dark label that appears above an element on hover or keyboard focus.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: CSS-only tooltip" style="height:110px" data-min="110" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.tip { position: relative; margin-top: 3rem; padding: .5rem 1rem; }
.tip__text {
  position: absolute; bottom: calc(100% + 8px); left: 50%; translate: -50% 4px;
  white-space: nowrap; padding: .4rem .7rem; border-radius: 6px;
  background: #1f2329; color: #fff; font-size: .8rem;
  opacity: 0; pointer-events: none; transition: opacity .15s, translate .15s;
}
.tip__text::after {   /* the arrow */
  content: &quot;&quot;; position: absolute; top: 100%; left: 50%; translate: -50%;
  border: 6px solid transparent; border-top-color: #1f2329;
}
.tip:is(:hover, :focus-visible) .tip__text { opacity: 1; translate: -50% 0; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;button class=&quot;tip&quot; aria-describedby=&quot;tip-r&quot;&gt;Hover or focus me
  &lt;span class=&quot;tip__text&quot; role=&quot;tooltip&quot; id=&quot;tip-r&quot;&gt;Copies the link to your clipboard&lt;/span&gt;
&lt;/button&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <button class="tip" aria-describedby="tip-r">Hover or focus me
      <span class="tip__text" role="tooltip" id="tip-r">Copies the link to your clipboard</span>
    </button>
    ```

=== "CSS"

    ```css
    .tip { position: relative; margin-top: 3rem; padding: .5rem 1rem; }
    .tip__text {
      position: absolute; bottom: calc(100% + 8px); left: 50%; translate: -50% 4px;
      white-space: nowrap; padding: .4rem .7rem; border-radius: 6px;
      background: #1f2329; color: #fff; font-size: .8rem;
      opacity: 0; pointer-events: none; transition: opacity .15s, translate .15s;
    }
    .tip__text::after {   /* the arrow */
      content: ""; position: absolute; top: 100%; left: 50%; translate: -50%;
      border: 6px solid transparent; border-top-color: #1f2329;
    }
    .tip:is(:hover, :focus-visible) .tip__text { opacity: 1; translate: -50% 0; }
    ```

**Why it works:** The arrow is a zero-size box with one coloured border. For tooltips that must flip at screen edges, use <a href="../../css/modern-css/#anchor-positioning">anchor positioning</a>.

## 11. Breadcrumbs { #breadcrumbs }

<span class="lvl lvl-1">Beginner</span> **You see:** Home › Category › Current page, with separators.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Breadcrumbs" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.crumbs { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 0; padding: 0; font-size: .9rem; }
.crumbs li + li::before { content: &quot;›&quot;; margin-inline-end: .5rem; opacity: .5; }
.crumbs [aria-current] { font-weight: 600; color: inherit; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;
  &lt;ol class=&quot;crumbs&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#breadcrumbs&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#breadcrumbs&quot;&gt;Fruits&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a aria-current=&quot;page&quot;&gt;Mangoes&lt;/a&gt;&lt;/li&gt;
  &lt;/ol&gt;
&lt;/nav&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <nav aria-label="Breadcrumb">
      <ol class="crumbs">
        <li><a href="#breadcrumbs">Home</a></li>
        <li><a href="#breadcrumbs">Fruits</a></li>
        <li><a aria-current="page">Mangoes</a></li>
      </ol>
    </nav>
    ```

=== "CSS"

    ```css
    .crumbs { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 0; padding: 0; font-size: .9rem; }
    .crumbs li + li::before { content: "›"; margin-inline-end: .5rem; opacity: .5; }
    .crumbs [aria-current] { font-weight: 600; color: inherit; }
    ```

**Why it works:** Separators come from CSS, so screen readers don't read "greater than" between items.

## 12. Pagination { #pagination }

<span class="lvl lvl-1">Beginner</span> **You see:** Previous · 1 2 [3] 4 5 · Next, with the current page highlighted.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Pagination" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.pager { display: flex; flex-wrap: wrap; gap: .25rem; list-style: none; margin: 0; padding: 0; }
.pager :is(a, span) {
  display: grid; place-items: center; min-inline-size: 40px; block-size: 40px; padding: 0 .6rem;
  border-radius: 8px; text-decoration: none; color: inherit;
}
.pager a:hover { background: #e4572e1a; }
.pager [aria-current] { background: #e4572e; color: #fff; font-weight: 700; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;nav aria-label=&quot;Pagination&quot;&gt;
  &lt;ul class=&quot;pager&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;‹ Prev&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a aria-current=&quot;page&quot;&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;span&gt;…&lt;/span&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;12&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#pagination&quot;&gt;Next ›&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <nav aria-label="Pagination">
      <ul class="pager">
        <li><a href="#pagination">‹ Prev</a></li>
        <li><a href="#pagination">1</a></li>
        <li><a href="#pagination">2</a></li>
        <li><a aria-current="page">3</a></li>
        <li><a href="#pagination">4</a></li>
        <li><span>…</span></li>
        <li><a href="#pagination">12</a></li>
        <li><a href="#pagination">Next ›</a></li>
      </ul>
    </nav>
    ```

=== "CSS"

    ```css
    .pager { display: flex; flex-wrap: wrap; gap: .25rem; list-style: none; margin: 0; padding: 0; }
    .pager :is(a, span) {
      display: grid; place-items: center; min-inline-size: 40px; block-size: 40px; padding: 0 .6rem;
      border-radius: 8px; text-decoration: none; color: inherit;
    }
    .pager a:hover { background: #e4572e1a; }
    .pager [aria-current] { background: #e4572e; color: #fff; font-weight: 700; }
    ```

## 13. Progress stepper { #stepper }

<span class="lvl lvl-2">Intermediate</span> **You see:** Numbered circles joined by a line: completed steps are filled, the current one is outlined.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Progress stepper" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.steps { display: flex; list-style: none; padding: 0; margin: 0; counter-reset: step; }
.steps li { flex: 1; position: relative; text-align: center; font-size: .85rem; counter-increment: step; }
.steps li::before {
  content: counter(step); display: grid; place-items: center; margin: 0 auto .4rem;
  inline-size: 32px; block-size: 32px; border-radius: 50%;
  border: 2px solid #ccc; background: #fff; color: #888; font-weight: 700; position: relative; z-index: 1;
}
.steps li + li::after {   /* connector line */
  content: &quot;&quot;; position: absolute; top: 16px; right: 50%; inline-size: 100%; block-size: 2px; background: #ccc;
}
.steps .done::before { content: &quot;✓&quot;; background: #e4572e; border-color: #e4572e; color: #fff; }
.steps .done + li::after, .steps .done + .done::after { background: #e4572e; }
.steps .current::before { border-color: #e4572e; color: #e4572e; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;ol class=&quot;steps&quot;&gt;
  &lt;li class=&quot;done&quot;&gt;Cart&lt;/li&gt;
  &lt;li class=&quot;done&quot;&gt;Address&lt;/li&gt;
  &lt;li class=&quot;current&quot; aria-current=&quot;step&quot;&gt;Payment&lt;/li&gt;
  &lt;li&gt;Done&lt;/li&gt;
&lt;/ol&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <ol class="steps">
      <li class="done">Cart</li>
      <li class="done">Address</li>
      <li class="current" aria-current="step">Payment</li>
      <li>Done</li>
    </ol>
    ```

=== "CSS"

    ```css
    .steps { display: flex; list-style: none; padding: 0; margin: 0; counter-reset: step; }
    .steps li { flex: 1; position: relative; text-align: center; font-size: .85rem; counter-increment: step; }
    .steps li::before {
      content: counter(step); display: grid; place-items: center; margin: 0 auto .4rem;
      inline-size: 32px; block-size: 32px; border-radius: 50%;
      border: 2px solid #ccc; background: #fff; color: #888; font-weight: 700; position: relative; z-index: 1;
    }
    .steps li + li::after {   /* connector line */
      content: ""; position: absolute; top: 16px; right: 50%; inline-size: 100%; block-size: 2px; background: #ccc;
    }
    .steps .done::before { content: "✓"; background: #e4572e; border-color: #e4572e; color: #fff; }
    .steps .done + li::after, .steps .done + .done::after { background: #e4572e; }
    .steps .current::before { border-color: #e4572e; color: #e4572e; }
    ```

**Why it works:** CSS counters number the steps automatically. The connector is an <code>::after</code> line behind each circle.

## 14. Vertical timeline { #timeline }

<span class="lvl lvl-2">Intermediate</span> **You see:** A vertical line with dots, each dot next to a date and an event.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Vertical timeline" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.tl { list-style: none; margin: 0; padding: 0 0 0 1.5rem; border-inline-start: 2px solid #e4572e; }
.tl li { position: relative; padding: 0 0 1.2rem 1rem; }
.tl li::before {
  content: &quot;&quot;; position: absolute; left: calc(-1.5rem - 7px); top: .3rem;
  inline-size: 12px; block-size: 12px; border-radius: 50%;
  background: #fff; border: 2px solid #e4572e;
}
.tl time { font: 700 .8rem system-ui; color: #e4572e; }
.tl p { margin: .2rem 0 0; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;ol class=&quot;tl&quot;&gt;
  &lt;li&gt;&lt;time&gt;2015&lt;/time&gt;&lt;p&gt;Flexbox ships in all browsers&lt;/p&gt;&lt;/li&gt;
  &lt;li&gt;&lt;time&gt;2017&lt;/time&gt;&lt;p&gt;CSS Grid ships in all browsers&lt;/p&gt;&lt;/li&gt;
  &lt;li&gt;&lt;time&gt;2023&lt;/time&gt;&lt;p&gt;:has(), container queries, nesting&lt;/p&gt;&lt;/li&gt;
  &lt;li&gt;&lt;time&gt;2025&lt;/time&gt;&lt;p&gt;Anchor positioning, view transitions&lt;/p&gt;&lt;/li&gt;
&lt;/ol&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <ol class="tl">
      <li><time>2015</time><p>Flexbox ships in all browsers</p></li>
      <li><time>2017</time><p>CSS Grid ships in all browsers</p></li>
      <li><time>2023</time><p>:has(), container queries, nesting</p></li>
      <li><time>2025</time><p>Anchor positioning, view transitions</p></li>
    </ol>
    ```

=== "CSS"

    ```css
    .tl { list-style: none; margin: 0; padding: 0 0 0 1.5rem; border-inline-start: 2px solid #e4572e; }
    .tl li { position: relative; padding: 0 0 1.2rem 1rem; }
    .tl li::before {
      content: ""; position: absolute; left: calc(-1.5rem - 7px); top: .3rem;
      inline-size: 12px; block-size: 12px; border-radius: 50%;
      background: #fff; border: 2px solid #e4572e;
    }
    .tl time { font: 700 .8rem system-ui; color: #e4572e; }
    .tl p { margin: .2rem 0 0; }
    ```

## 15. Pricing cards with a featured plan { #pricing-card }

<span class="lvl lvl-1">Beginner</span> **You see:** Three plan cards side by side; the middle one is bigger, highlighted and has a "Popular" ribbon.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Pricing cards with a featured plan" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; align-items: center; padding: 1rem .5rem; }
.plan {
  position: relative; display: flex; flex-direction: column; gap: .5rem;
  padding: 1.5rem; border-radius: 16px; border: 1px solid #e5e7eb; background: #fff; color: #1f2329;
}
.plan h3, .plan p { margin: 0; }
.plan__price { font-size: 2rem; font-weight: 800; }
.plan__price span { font-size: .9rem; font-weight: 400; color: #6b7280; }
.plan ul { padding: 0; margin: .5rem 0 1rem; list-style: none; display: grid; gap: .3rem; }
.plan li::before { content: &quot;✓ &quot;; color: #2e9d4f; font-weight: 700; }
.plan__cta { margin-top: auto; text-align: center; padding: .7rem; border-radius: 8px; border: 2px solid #e4572e; color: #e4572e; text-decoration: none; font-weight: 700; }
.plan--featured { border: 2px solid #e4572e; box-shadow: 0 20px 40px rgb(228 87 46 / .2); scale: 1.04; }
.plan--featured .plan__cta { background: #e4572e; color: #fff; }
.plan__badge { position: absolute; top: 0; left: 50%; translate: -50% -50%; padding: .25rem .8rem; border-radius: 99px; background: #e4572e; color: #fff; font: 700 .75rem system-ui; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;plans&quot;&gt;
  &lt;section class=&quot;plan&quot;&gt;
    &lt;h3&gt;Starter&lt;/h3&gt;&lt;p class=&quot;plan__price&quot;&gt;₹0&lt;span&gt;/mo&lt;/span&gt;&lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;3 projects&lt;/li&gt;&lt;li&gt;1 GB storage&lt;/li&gt;&lt;/ul&gt;
    &lt;a class=&quot;plan__cta&quot; href=&quot;#pricing-card&quot;&gt;Start free&lt;/a&gt;
  &lt;/section&gt;
  &lt;section class=&quot;plan plan--featured&quot;&gt;
    &lt;span class=&quot;plan__badge&quot;&gt;Popular&lt;/span&gt;
    &lt;h3&gt;Pro&lt;/h3&gt;&lt;p class=&quot;plan__price&quot;&gt;₹499&lt;span&gt;/mo&lt;/span&gt;&lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;Unlimited projects&lt;/li&gt;&lt;li&gt;100 GB storage&lt;/li&gt;&lt;li&gt;Priority support&lt;/li&gt;&lt;/ul&gt;
    &lt;a class=&quot;plan__cta&quot; href=&quot;#pricing-card&quot;&gt;Go Pro&lt;/a&gt;
  &lt;/section&gt;
  &lt;section class=&quot;plan&quot;&gt;
    &lt;h3&gt;Team&lt;/h3&gt;&lt;p class=&quot;plan__price&quot;&gt;₹1,999&lt;span&gt;/mo&lt;/span&gt;&lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;Everything in Pro&lt;/li&gt;&lt;li&gt;SSO &amp;amp; audit log&lt;/li&gt;&lt;/ul&gt;
    &lt;a class=&quot;plan__cta&quot; href=&quot;#pricing-card&quot;&gt;Contact sales&lt;/a&gt;
  &lt;/section&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="plans">
      <section class="plan">
        <h3>Starter</h3><p class="plan__price">₹0<span>/mo</span></p>
        <ul><li>3 projects</li><li>1 GB storage</li></ul>
        <a class="plan__cta" href="#pricing-card">Start free</a>
      </section>
      <section class="plan plan--featured">
        <span class="plan__badge">Popular</span>
        <h3>Pro</h3><p class="plan__price">₹499<span>/mo</span></p>
        <ul><li>Unlimited projects</li><li>100 GB storage</li><li>Priority support</li></ul>
        <a class="plan__cta" href="#pricing-card">Go Pro</a>
      </section>
      <section class="plan">
        <h3>Team</h3><p class="plan__price">₹1,999<span>/mo</span></p>
        <ul><li>Everything in Pro</li><li>SSO &amp; audit log</li></ul>
        <a class="plan__cta" href="#pricing-card">Contact sales</a>
      </section>
    </div>
    ```

=== "CSS"

    ```css
    .plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; align-items: center; padding: 1rem .5rem; }
    .plan {
      position: relative; display: flex; flex-direction: column; gap: .5rem;
      padding: 1.5rem; border-radius: 16px; border: 1px solid #e5e7eb; background: #fff; color: #1f2329;
    }
    .plan h3, .plan p { margin: 0; }
    .plan__price { font-size: 2rem; font-weight: 800; }
    .plan__price span { font-size: .9rem; font-weight: 400; color: #6b7280; }
    .plan ul { padding: 0; margin: .5rem 0 1rem; list-style: none; display: grid; gap: .3rem; }
    .plan li::before { content: "✓ "; color: #2e9d4f; font-weight: 700; }
    .plan__cta { margin-top: auto; text-align: center; padding: .7rem; border-radius: 8px; border: 2px solid #e4572e; color: #e4572e; text-decoration: none; font-weight: 700; }
    .plan--featured { border: 2px solid #e4572e; box-shadow: 0 20px 40px rgb(228 87 46 / .2); scale: 1.04; }
    .plan--featured .plan__cta { background: #e4572e; color: #fff; }
    .plan__badge { position: absolute; top: 0; left: 50%; translate: -50% -50%; padding: .25rem .8rem; border-radius: 99px; background: #e4572e; color: #fff; font: 700 .75rem system-ui; }
    ```

**Why it works:** <code>scale</code> enlarges the featured card without changing the grid. The badge is centred on the top border with <code>translate: -50% -50%</code>.

## 16. Hero with background image and overlay { #hero-overlay }

<span class="lvl lvl-1">Beginner</span> **You see:** A full-width banner photo, darkened, with big centred white text and a button.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Hero with background image and overlay" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.hero-r {
  min-block-size: 280px; display: grid; place-content: center; justify-items: center; gap: .8rem;
  padding: 2rem 1rem; text-align: center; color: #fff; border-radius: 16px;
  background:
    linear-gradient(rgb(0 0 0 / .55), rgb(0 0 0 / .35)),
    url(&quot;https://picsum.photos/id/292/1200/600&quot;) center / cover;
}
.hero-r h2 { margin: 0; font-size: clamp(1.6rem, 1rem + 3vw, 2.8rem); text-wrap: balance; }
.hero-r p { margin: 0; opacity: .9; }
.hero-r a { padding: .8rem 1.6rem; border-radius: 99px; background: #e4572e; color: #fff; font-weight: 700; text-decoration: none; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;section class=&quot;hero-r&quot;&gt;
  &lt;h2&gt;Fresh groceries in 10 minutes&lt;/h2&gt;
  &lt;p&gt;Fruits, vegetables and daily essentials, delivered.&lt;/p&gt;
  &lt;a href=&quot;#hero-overlay&quot;&gt;Shop now&lt;/a&gt;
&lt;/section&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <section class="hero-r">
      <h2>Fresh groceries in 10 minutes</h2>
      <p>Fruits, vegetables and daily essentials, delivered.</p>
      <a href="#hero-overlay">Shop now</a>
    </section>
    ```

=== "CSS"

    ```css
    .hero-r {
      min-block-size: 280px; display: grid; place-content: center; justify-items: center; gap: .8rem;
      padding: 2rem 1rem; text-align: center; color: #fff; border-radius: 16px;
      background:
        linear-gradient(rgb(0 0 0 / .55), rgb(0 0 0 / .35)),
        url("https://picsum.photos/id/292/1200/600") center / cover;
    }
    .hero-r h2 { margin: 0; font-size: clamp(1.6rem, 1rem + 3vw, 2.8rem); text-wrap: balance; }
    .hero-r p { margin: 0; opacity: .9; }
    .hero-r a { padding: .8rem 1.6rem; border-radius: 99px; background: #e4572e; color: #fff; font-weight: 700; text-decoration: none; }
    ```

**Why it works:** The gradient layer sits on top of the photo (first background = top layer) to guarantee text contrast.

## 17. Truncated text with ellipsis { #truncate }

<span class="lvl lvl-1">Beginner</span> **You see:** A title cut off with "…" after one line, a description after two.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Truncated text with ellipsis" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.trunc { max-inline-size: 260px; }
.one-line { margin: 0 0 .3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.two-lines { margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;trunc&quot;&gt;
  &lt;h4 class=&quot;one-line&quot;&gt;Organic Alphonso Mangoes from Ratnagiri, Premium Box of 12&lt;/h4&gt;
  &lt;p class=&quot;two-lines&quot;&gt;Hand-picked at peak ripeness and naturally ripened without carbide. Sweet, fragrant and perfect for summer desserts and smoothies.&lt;/p&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="trunc">
      <h4 class="one-line">Organic Alphonso Mangoes from Ratnagiri, Premium Box of 12</h4>
      <p class="two-lines">Hand-picked at peak ripeness and naturally ripened without carbide. Sweet, fragrant and perfect for summer desserts and smoothies.</p>
    </div>
    ```

=== "CSS"

    ```css
    .trunc { max-inline-size: 260px; }
    .one-line { margin: 0 0 .3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .two-lines { margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
    ```

## 18. Skeleton loading card { #skeleton }

<span class="lvl lvl-1">Beginner</span> **You see:** Grey rounded bars and a circle with a shimmer passing over them while content loads.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Skeleton loading card" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.skel-card { display: flex; gap: 1rem; max-inline-size: 360px; }
.skel-lines { flex: 1; display: grid; gap: .6rem; align-content: center; }
.skel {
  block-size: 12px; border-radius: 6px;
  background: linear-gradient(90deg, #e2e2e2 25%, #f3f3f3 50%, #e2e2e2 75%) 0 0 / 200% 100%;
  animation: skel-shimmer 1.4s linear infinite;
}
.skel--circle { inline-size: 56px; block-size: 56px; border-radius: 50%; flex-shrink: 0; }
@keyframes skel-shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skel { animation: none; } }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;skel-card&quot; aria-busy=&quot;true&quot; aria-label=&quot;Loading&quot;&gt;
  &lt;div class=&quot;skel skel--circle&quot;&gt;&lt;/div&gt;
  &lt;div class=&quot;skel-lines&quot;&gt;&lt;div class=&quot;skel&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skel&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skel&quot; style=&quot;inline-size:60%&quot;&gt;&lt;/div&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="skel-card" aria-busy="true" aria-label="Loading">
      <div class="skel skel--circle"></div>
      <div class="skel-lines"><div class="skel"></div><div class="skel"></div><div class="skel" style="inline-size:60%"></div></div>
    </div>
    ```

=== "CSS"

    ```css
    .skel-card { display: flex; gap: 1rem; max-inline-size: 360px; }
    .skel-lines { flex: 1; display: grid; gap: .6rem; align-content: center; }
    .skel {
      block-size: 12px; border-radius: 6px;
      background: linear-gradient(90deg, #e2e2e2 25%, #f3f3f3 50%, #e2e2e2 75%) 0 0 / 200% 100%;
      animation: skel-shimmer 1.4s linear infinite;
    }
    .skel--circle { inline-size: 56px; block-size: 56px; border-radius: 50%; flex-shrink: 0; }
    @keyframes skel-shimmer { to { background-position: -200% 0; } }
    @media (prefers-reduced-motion: reduce) { .skel { animation: none; } }
    ```

## 19. Toggle switch { #toggle-switch }

<span class="lvl lvl-2">Intermediate</span> **You see:** An iOS-style pill switch with a sliding knob.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Toggle switch" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.switch { display: inline-flex; align-items: center; gap: .6rem; cursor: pointer; }
.switch input {
  appearance: none; margin: 0; cursor: pointer;
  inline-size: 46px; block-size: 26px; border-radius: 99px;
  background: #ccc; position: relative; transition: background-color .2s;
}
.switch input::before {
  content: &quot;&quot;; position: absolute; inset-block: 3px; inset-inline-start: 3px;
  inline-size: 20px; border-radius: 50%; background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / .3); transition: translate .2s;
}
.switch input:checked { background: #2e9d4f; }
.switch input:checked::before { translate: 20px; }
.switch input:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;label class=&quot;switch&quot;&gt;&lt;input type=&quot;checkbox&quot; role=&quot;switch&quot; checked&gt; Email notifications&lt;/label&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <label class="switch"><input type="checkbox" role="switch" checked> Email notifications</label>
    ```

=== "CSS"

    ```css
    .switch { display: inline-flex; align-items: center; gap: .6rem; cursor: pointer; }
    .switch input {
      appearance: none; margin: 0; cursor: pointer;
      inline-size: 46px; block-size: 26px; border-radius: 99px;
      background: #ccc; position: relative; transition: background-color .2s;
    }
    .switch input::before {
      content: ""; position: absolute; inset-block: 3px; inset-inline-start: 3px;
      inline-size: 20px; border-radius: 50%; background: #fff;
      box-shadow: 0 1px 3px rgb(0 0 0 / .3); transition: translate .2s;
    }
    .switch input:checked { background: #2e9d4f; }
    .switch input:checked::before { translate: 20px; }
    .switch input:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
    ```

**Why it works:** It's a real checkbox with <code>appearance: none</code>, so keyboard, forms and screen readers work. <code>role="switch"</code> makes it announce "on/off".

## 20. Search bar with icon and button { #search-bar }

<span class="lvl lvl-1">Beginner</span> **You see:** A rounded input with a magnifying-glass icon inside on the left and a button attached on the right.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Search bar with icon and button" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.sbar { display: flex; max-inline-size: 420px; border: 2px solid #e5e7eb; border-radius: 99px; overflow: hidden; background: #fff; }
.sbar:focus-within { border-color: #e4572e; }
.sbar input {
  flex: 1; min-inline-size: 0; border: 0; outline: 0; padding: .7rem 1rem .7rem 2.5rem; font: inherit; color: #1f2329;
  background: url(&quot;data:image/svg+xml,%3Csvg xmlns=&#x27;http://www.w3.org/2000/svg&#x27; width=&#x27;18&#x27; height=&#x27;18&#x27; fill=&#x27;none&#x27; stroke=&#x27;%236b7280&#x27; stroke-width=&#x27;2&#x27;%3E%3Ccircle cx=&#x27;8&#x27; cy=&#x27;8&#x27; r=&#x27;6&#x27;/%3E%3Cpath d=&#x27;m13 13 4 4&#x27;/%3E%3C/svg%3E&quot;) no-repeat 1rem center;
}
.sbar button { border: 0; padding: 0 1.2rem; background: #e4572e; color: #fff; font-weight: 700; cursor: pointer; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;search&gt;
  &lt;form class=&quot;sbar&quot; onsubmit=&quot;return false&quot;&gt;
    &lt;label for=&quot;sbar-q&quot; class=&quot;visually-hidden&quot;&gt;Search products&lt;/label&gt;
    &lt;input id=&quot;sbar-q&quot; type=&quot;search&quot; placeholder=&quot;Search products…&quot;&gt;
    &lt;button&gt;Search&lt;/button&gt;
  &lt;/form&gt;
&lt;/search&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <search>
      <form class="sbar" onsubmit="return false">
        <label for="sbar-q" class="visually-hidden">Search products</label>
        <input id="sbar-q" type="search" placeholder="Search products…">
        <button>Search</button>
      </form>
    </search>
    ```

=== "CSS"

    ```css
    .sbar { display: flex; max-inline-size: 420px; border: 2px solid #e5e7eb; border-radius: 99px; overflow: hidden; background: #fff; }
    .sbar:focus-within { border-color: #e4572e; }
    .sbar input {
      flex: 1; min-inline-size: 0; border: 0; outline: 0; padding: .7rem 1rem .7rem 2.5rem; font: inherit; color: #1f2329;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Ccircle cx='8' cy='8' r='6'/%3E%3Cpath d='m13 13 4 4'/%3E%3C/svg%3E") no-repeat 1rem center;
    }
    .sbar button { border: 0; padding: 0 1.2rem; background: #e4572e; color: #fff; font-weight: 700; cursor: pointer; }
    .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    ```

**Why it works:** <code>:focus-within</code> highlights the whole bar when the input is focused. The icon is an inline SVG background so it doesn't need an extra element.

## 21. Floating label input { #floating-label }

<span class="lvl lvl-2">Intermediate</span> **You see:** The label sits inside the input like a placeholder, then shrinks and moves up when you type.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Floating label input" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.fl { position: relative; max-inline-size: 320px; }
.fl input { inline-size: 100%; padding: 1.4rem .9rem .5rem; border: 2px solid #d0d4da; border-radius: 10px; font: inherit; background: #fff; color: #1f2329; }
.fl label {
  position: absolute; left: .9rem; top: 50%; translate: 0 -50%;
  color: #6b7280; pointer-events: none; transition: all .15s;
}
.fl input:focus { outline: 0; border-color: #e4572e; }
.fl input:focus + label,
.fl input:not(:placeholder-shown) + label { top: .9rem; font-size: .75rem; color: #e4572e; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;fl&quot;&gt;
  &lt;input id=&quot;fl-email&quot; type=&quot;email&quot; placeholder=&quot; &quot; autocomplete=&quot;email&quot;&gt;
  &lt;label for=&quot;fl-email&quot;&gt;Email address&lt;/label&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="fl">
      <input id="fl-email" type="email" placeholder=" " autocomplete="email">
      <label for="fl-email">Email address</label>
    </div>
    ```

=== "CSS"

    ```css
    .fl { position: relative; max-inline-size: 320px; }
    .fl input { inline-size: 100%; padding: 1.4rem .9rem .5rem; border: 2px solid #d0d4da; border-radius: 10px; font: inherit; background: #fff; color: #1f2329; }
    .fl label {
      position: absolute; left: .9rem; top: 50%; translate: 0 -50%;
      color: #6b7280; pointer-events: none; transition: all .15s;
    }
    .fl input:focus { outline: 0; border-color: #e4572e; }
    .fl input:focus + label,
    .fl input:not(:placeholder-shown) + label { top: .9rem; font-size: .75rem; color: #e4572e; }
    ```

**Why it works:** The trick: <code>placeholder=" "</code> (a single space) lets <code>:placeholder-shown</code> detect whether the field is empty.

## 22. Wrapping tag chips { #chips }

<span class="lvl lvl-1">Beginner</span> **You see:** A cloud of small rounded tags that wrap onto new lines, some with a × to remove.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Wrapping tag chips" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.chips { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 0; padding: 0; }
.chips li {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .8rem; border-radius: 99px; background: #f1f2f5; color: #1f2329; font-size: .85rem;
}
.chips button { border: 0; background: none; cursor: pointer; font-size: 1rem; line-height: 1; padding: 0; color: #6b7280; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;ul class=&quot;chips&quot;&gt;
  &lt;li&gt;HTML&lt;/li&gt;&lt;li&gt;CSS&lt;/li&gt;&lt;li&gt;Flexbox&lt;/li&gt;&lt;li&gt;Grid&lt;/li&gt;&lt;li&gt;Accessibility&lt;/li&gt;
  &lt;li&gt;Responsive &lt;button aria-label=&quot;Remove Responsive&quot;&gt;×&lt;/button&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <ul class="chips">
      <li>HTML</li><li>CSS</li><li>Flexbox</li><li>Grid</li><li>Accessibility</li>
      <li>Responsive <button aria-label="Remove Responsive">×</button></li>
    </ul>
    ```

=== "CSS"

    ```css
    .chips { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 0; padding: 0; }
    .chips li {
      display: inline-flex; align-items: center; gap: .3rem;
      padding: .35rem .8rem; border-radius: 99px; background: #f1f2f5; color: #1f2329; font-size: .85rem;
    }
    .chips button { border: 0; background: none; cursor: pointer; font-size: 1rem; line-height: 1; padding: 0; color: #6b7280; }
    ```

## 23. Icon with notification count { #notification-dot }

<span class="lvl lvl-1">Beginner</span> **You see:** A bell icon with a small red circle and a number at its top-right corner.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Icon with notification count" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.bell { position: relative; font-size: 1.6rem; background: none; border: 0; cursor: pointer; padding: .3rem; }
.bell__count {
  position: absolute; top: 0; right: 0; translate: 30% -10%;
  min-inline-size: 20px; block-size: 20px; padding: 0 5px; border-radius: 99px;
  display: grid; place-items: center;
  background: #e11d48; color: #fff; font: 700 .7rem system-ui; border: 2px solid #fff;
}&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;button class=&quot;bell&quot; aria-label=&quot;Notifications, 3 unread&quot;&gt;🔔&lt;span class=&quot;bell__count&quot; aria-hidden=&quot;true&quot;&gt;3&lt;/span&gt;&lt;/button&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <button class="bell" aria-label="Notifications, 3 unread">🔔<span class="bell__count" aria-hidden="true">3</span></button>
    ```

=== "CSS"

    ```css
    .bell { position: relative; font-size: 1.6rem; background: none; border: 0; cursor: pointer; padding: .3rem; }
    .bell__count {
      position: absolute; top: 0; right: 0; translate: 30% -10%;
      min-inline-size: 20px; block-size: 20px; padding: 0 5px; border-radius: 99px;
      display: grid; place-items: center;
      background: #e11d48; color: #fff; font: 700 .7rem system-ui; border: 2px solid #fff;
    }
    ```

**Why it works:** The count is in the button's <code>aria-label</code>, and the visual badge is hidden from screen readers to avoid reading it twice.

## 24. Divider with text in the middle { #divider-text }

<span class="lvl lvl-1">Beginner</span> **You see:** A horizontal line interrupted by a word, like "— or —" between login options.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Divider with text in the middle" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.divider { display: flex; align-items: center; gap: 1rem; color: #6b7280; font-size: .85rem; margin: 0; }
.divider::before, .divider::after { content: &quot;&quot;; flex: 1; border-top: 1px solid currentColor; opacity: .4; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;p class=&quot;divider&quot;&gt;or continue with&lt;/p&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <p class="divider">or continue with</p>
    ```

=== "CSS"

    ```css
    .divider { display: flex; align-items: center; gap: 1rem; color: #6b7280; font-size: .85rem; margin: 0; }
    .divider::before, .divider::after { content: ""; flex: 1; border-top: 1px solid currentColor; opacity: .4; }
    ```

**Why it works:** Two flexible pseudo-elements fill the space on either side of the text.

## 25. Testimonial card { #testimonial }

<span class="lvl lvl-1">Beginner</span> **You see:** A large quote mark, quote text, then a round photo with name and role.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Testimonial card" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.quote-card { margin: 0; max-inline-size: 440px; padding: 1.5rem; border-radius: 16px; background: #fff7f3; color: #1f2329; position: relative; }
.quote-card::before { content: &quot;\201C&quot;; position: absolute; top: -.2rem; left: 1rem; font: 900 5rem/1 Georgia, serif; color: #e4572e; opacity: .25; }
.quote-card blockquote { margin: 0 0 1rem; font-size: 1.1rem; position: relative; }
.quote-card figcaption { display: flex; align-items: center; gap: .8rem; font-size: .85rem; }
.quote-card__avatar { inline-size: 44px; block-size: 44px; border-radius: 50%; background: linear-gradient(135deg, #e4572e, #f3a712); flex-shrink: 0; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;figure class=&quot;quote-card&quot;&gt;
  &lt;blockquote&gt;The new checkout cut our drop-off rate in half. Our team shipped it in a week.&lt;/blockquote&gt;
  &lt;figcaption&gt;&lt;span class=&quot;quote-card__avatar&quot;&gt;&lt;/span&gt;&lt;span&gt;&lt;strong&gt;Meera Iyer&lt;/strong&gt;&lt;br&gt;Head of Product, FreshCart&lt;/span&gt;&lt;/figcaption&gt;
&lt;/figure&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <figure class="quote-card">
      <blockquote>The new checkout cut our drop-off rate in half. Our team shipped it in a week.</blockquote>
      <figcaption><span class="quote-card__avatar"></span><span><strong>Meera Iyer</strong><br>Head of Product, FreshCart</span></figcaption>
    </figure>
    ```

=== "CSS"

    ```css
    .quote-card { margin: 0; max-inline-size: 440px; padding: 1.5rem; border-radius: 16px; background: #fff7f3; color: #1f2329; position: relative; }
    .quote-card::before { content: "\201C"; position: absolute; top: -.2rem; left: 1rem; font: 900 5rem/1 Georgia, serif; color: #e4572e; opacity: .25; }
    .quote-card blockquote { margin: 0 0 1rem; font-size: 1.1rem; position: relative; }
    .quote-card figcaption { display: flex; align-items: center; gap: .8rem; font-size: .85rem; }
    .quote-card__avatar { inline-size: 44px; block-size: 44px; border-radius: 50%; background: linear-gradient(135deg, #e4572e, #f3a712); flex-shrink: 0; }
    ```

## 26. KPI / stat cards { #kpi-card }

<span class="lvl lvl-1">Beginner</span> **You see:** Small cards with a label, a big number and a green or red trend arrow.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: KPI / stat cards" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.kpis-r { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
.kpi { display: grid; gap: .2rem; padding: 1rem; border-radius: 12px; background: #fff; color: #1f2329; border: 1px solid #e5e7eb; }
.kpi span { font-size: .8rem; color: #6b7280; }
.kpi strong { font-size: 1.8rem; font-variant-numeric: tabular-nums; }
.kpi em { font-style: normal; font-size: .8rem; font-weight: 700; }
.kpi .up { color: #2e9d4f; } .kpi .down { color: #e11d48; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;kpis-r&quot;&gt;
  &lt;div class=&quot;kpi&quot;&gt;&lt;span&gt;Revenue&lt;/span&gt;&lt;strong&gt;₹4.2L&lt;/strong&gt;&lt;em class=&quot;up&quot;&gt;▲ 12%&lt;/em&gt;&lt;/div&gt;
  &lt;div class=&quot;kpi&quot;&gt;&lt;span&gt;Orders&lt;/span&gt;&lt;strong&gt;932&lt;/strong&gt;&lt;em class=&quot;down&quot;&gt;▼ 3%&lt;/em&gt;&lt;/div&gt;
  &lt;div class=&quot;kpi&quot;&gt;&lt;span&gt;Avg. basket&lt;/span&gt;&lt;strong&gt;₹452&lt;/strong&gt;&lt;em class=&quot;up&quot;&gt;▲ 5%&lt;/em&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="kpis-r">
      <div class="kpi"><span>Revenue</span><strong>₹4.2L</strong><em class="up">▲ 12%</em></div>
      <div class="kpi"><span>Orders</span><strong>932</strong><em class="down">▼ 3%</em></div>
      <div class="kpi"><span>Avg. basket</span><strong>₹452</strong><em class="up">▲ 5%</em></div>
    </div>
    ```

=== "CSS"

    ```css
    .kpis-r { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
    .kpi { display: grid; gap: .2rem; padding: 1rem; border-radius: 12px; background: #fff; color: #1f2329; border: 1px solid #e5e7eb; }
    .kpi span { font-size: .8rem; color: #6b7280; }
    .kpi strong { font-size: 1.8rem; font-variant-numeric: tabular-nums; }
    .kpi em { font-style: normal; font-size: .8rem; font-weight: 700; }
    .kpi .up { color: #2e9d4f; } .kpi .down { color: #e11d48; }
    ```

## 27. Multi-column footer { #footer-columns }

<span class="lvl lvl-1">Beginner</span> **You see:** A dark footer with a brand blurb and 3 columns of links that collapse to 2, then 1, on smaller screens.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Multi-column footer" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.foot {
  display: grid; gap: 1.5rem; padding: 1.5rem; border-radius: 12px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  background: #1f2329; color: #c9ced6;
}
.foot nav { display: grid; gap: .4rem; align-content: start; }
.foot h4 { margin: 0 0 .3rem; color: #fff; font-size: .85rem; text-transform: uppercase; letter-spacing: .06em; }
.foot a { color: inherit; text-decoration: none; }
.foot a:hover { color: #fff; }
.foot p { margin: .4rem 0 0; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;footer class=&quot;foot&quot;&gt;
  &lt;div&gt;&lt;strong&gt;◆ Brand&lt;/strong&gt;&lt;p&gt;Groceries delivered in minutes.&lt;/p&gt;&lt;/div&gt;
  &lt;nav aria-label=&quot;Company&quot;&gt;&lt;h4&gt;Company&lt;/h4&gt;&lt;a href=&quot;#footer-columns&quot;&gt;About&lt;/a&gt;&lt;a href=&quot;#footer-columns&quot;&gt;Careers&lt;/a&gt;&lt;/nav&gt;
  &lt;nav aria-label=&quot;Help&quot;&gt;&lt;h4&gt;Help&lt;/h4&gt;&lt;a href=&quot;#footer-columns&quot;&gt;FAQ&lt;/a&gt;&lt;a href=&quot;#footer-columns&quot;&gt;Contact&lt;/a&gt;&lt;/nav&gt;
  &lt;nav aria-label=&quot;Legal&quot;&gt;&lt;h4&gt;Legal&lt;/h4&gt;&lt;a href=&quot;#footer-columns&quot;&gt;Privacy&lt;/a&gt;&lt;a href=&quot;#footer-columns&quot;&gt;Terms&lt;/a&gt;&lt;/nav&gt;
&lt;/footer&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <footer class="foot">
      <div><strong>◆ Brand</strong><p>Groceries delivered in minutes.</p></div>
      <nav aria-label="Company"><h4>Company</h4><a href="#footer-columns">About</a><a href="#footer-columns">Careers</a></nav>
      <nav aria-label="Help"><h4>Help</h4><a href="#footer-columns">FAQ</a><a href="#footer-columns">Contact</a></nav>
      <nav aria-label="Legal"><h4>Legal</h4><a href="#footer-columns">Privacy</a><a href="#footer-columns">Terms</a></nav>
    </footer>
    ```

=== "CSS"

    ```css
    .foot {
      display: grid; gap: 1.5rem; padding: 1.5rem; border-radius: 12px;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      background: #1f2329; color: #c9ced6;
    }
    .foot nav { display: grid; gap: .4rem; align-content: start; }
    .foot h4 { margin: 0 0 .3rem; color: #fff; font-size: .85rem; text-transform: uppercase; letter-spacing: .06em; }
    .foot a { color: inherit; text-decoration: none; }
    .foot a:hover { color: #fff; }
    .foot p { margin: .4rem 0 0; }
    ```

## 28. Bottom banner (cookies / announcements) { #cookie-banner }

<span class="lvl lvl-2">Intermediate</span> **You see:** A bar fixed to the bottom of the screen with a message and two buttons.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Bottom banner (cookies / announcements)" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.banner-host { position: relative; block-size: 160px; border-radius: 10px; background: repeating-linear-gradient(45deg, #f4f4f4 0 10px, #ececec 10px 20px); overflow: hidden; }
.banner {
  position: absolute;   /* use position: fixed on a real page */
  inset: auto 1rem 1rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem; border-radius: 12px; background: #fff; color: #1f2329; box-shadow: 0 10px 40px rgb(0 0 0 / .15);
}
.banner p { margin: 0; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;banner-host&quot;&gt;
  &lt;div class=&quot;banner&quot; role=&quot;region&quot; aria-label=&quot;Cookie consent&quot;&gt;
    &lt;p&gt;We use cookies to improve your experience.&lt;/p&gt;
    &lt;div&gt;&lt;button class=&quot;btn btn--secondary&quot;&gt;Settings&lt;/button&gt; &lt;button class=&quot;btn btn--primary&quot;&gt;Accept&lt;/button&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="banner-host">
      <div class="banner" role="region" aria-label="Cookie consent">
        <p>We use cookies to improve your experience.</p>
        <div><button class="btn btn--secondary">Settings</button> <button class="btn btn--primary">Accept</button></div>
      </div>
    </div>
    ```

=== "CSS"

    ```css
    .banner-host { position: relative; block-size: 160px; border-radius: 10px; background: repeating-linear-gradient(45deg, #f4f4f4 0 10px, #ececec 10px 20px); overflow: hidden; }
    .banner {
      position: absolute;   /* use position: fixed on a real page */
      inset: auto 1rem 1rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;
      padding: 1rem 1.25rem; border-radius: 12px; background: #fff; color: #1f2329; box-shadow: 0 10px 40px rgb(0 0 0 / .15);
    }
    .banner p { margin: 0; }
    ```

**Why it works:** On a real page use <code>position: fixed</code> plus <code>padding-bottom: env(safe-area-inset-bottom)</code> for phones with a home indicator.

## 29. Star rating display { #rating }

<span class="lvl lvl-2">Intermediate</span> **You see:** Five stars partly filled to show a rating such as 3.7 out of 5.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Star rating display" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.stars { --size: 1.6rem; margin: 0; font-size: var(--size); line-height: 1; }
.stars::before {
  content: &quot;★★★★★&quot;; letter-spacing: 2px;
  background: linear-gradient(90deg, #f3a712 calc(var(--rating) / 5 * 100%), #d0d4da 0);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;p class=&quot;stars&quot; style=&quot;--rating: 3.7&quot; aria-label=&quot;Rated 3.7 out of 5&quot;&gt;&lt;/p&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <p class="stars" style="--rating: 3.7" aria-label="Rated 3.7 out of 5"></p>
    ```

=== "CSS"

    ```css
    .stars { --size: 1.6rem; margin: 0; font-size: var(--size); line-height: 1; }
    .stars::before {
      content: "★★★★★"; letter-spacing: 2px;
      background: linear-gradient(90deg, #f3a712 calc(var(--rating) / 5 * 100%), #d0d4da 0);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    ```

**Why it works:** One custom property drives a hard-stop gradient clipped to the star glyphs. No images, any fraction.

## 30. Circular progress ring { #progress-ring }

<span class="lvl lvl-2">Intermediate</span> **You see:** A donut-shaped ring partly filled in colour, with the percentage in the middle.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Circular progress ring" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.ring { display: grid; inline-size: 110px; aspect-ratio: 1; }
.ring &gt; * { grid-area: 1 / 1; }          /* stack track and label in one cell */
.ring__track {
  border-radius: 50%;
  background: conic-gradient(#e4572e calc(var(--p) * 1%), #e5e7eb 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
}
.ring span { place-self: center; font: 800 1.3rem system-ui; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;ring&quot; style=&quot;--p: 72&quot; role=&quot;img&quot; aria-label=&quot;72% complete&quot;&gt;
  &lt;div class=&quot;ring__track&quot;&gt;&lt;/div&gt;
  &lt;span&gt;72%&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="ring" style="--p: 72" role="img" aria-label="72% complete">
      <div class="ring__track"></div>
      <span>72%</span>
    </div>
    ```

=== "CSS"

    ```css
    .ring { display: grid; inline-size: 110px; aspect-ratio: 1; }
    .ring > * { grid-area: 1 / 1; }          /* stack track and label in one cell */
    .ring__track {
      border-radius: 50%;
      background: conic-gradient(#e4572e calc(var(--p) * 1%), #e5e7eb 0);
      mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
    }
    .ring span { place-self: center; font: 800 1.3rem system-ui; }
    ```

**Why it works:** <code>conic-gradient</code> draws the pie, and a radial <code>mask</code> cuts out the middle to make a ring. The label sits in the same grid cell, on top of the ring.

## 31. Empty state { #empty-state }

<span class="lvl lvl-1">Beginner</span> **You see:** A centred illustration, a short heading, a sentence and one action button, shown when a list has nothing in it.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Empty state" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.empty { display: grid; justify-items: center; gap: .5rem; text-align: center; padding: 2rem 1rem; border: 2px dashed #d0d4da; border-radius: 16px; }
.empty__art { font-size: 3rem; inline-size: 96px; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; background: #fff1ea; }
.empty h3, .empty p { margin: 0; }
.empty p { color: #6b7280; max-inline-size: 30ch; }
.empty .btn { text-decoration: none; margin-top: .5rem; }&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;empty&quot;&gt;
  &lt;div class=&quot;empty__art&quot; aria-hidden=&quot;true&quot;&gt;🛒&lt;/div&gt;
  &lt;h3&gt;Your cart is empty&lt;/h3&gt;
  &lt;p&gt;Add fruits and vegetables to get started.&lt;/p&gt;
  &lt;a class=&quot;btn btn--primary&quot; href=&quot;#empty-state&quot;&gt;Browse products&lt;/a&gt;
&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="empty">
      <div class="empty__art" aria-hidden="true">🛒</div>
      <h3>Your cart is empty</h3>
      <p>Add fruits and vegetables to get started.</p>
      <a class="btn btn--primary" href="#empty-state">Browse products</a>
    </div>
    ```

=== "CSS"

    ```css
    .empty { display: grid; justify-items: center; gap: .5rem; text-align: center; padding: 2rem 1rem; border: 2px dashed #d0d4da; border-radius: 16px; }
    .empty__art { font-size: 3rem; inline-size: 96px; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; background: #fff1ea; }
    .empty h3, .empty p { margin: 0; }
    .empty p { color: #6b7280; max-inline-size: 30ch; }
    .empty .btn { text-decoration: none; margin-top: .5rem; }
    ```

## 32. Gradient border card { #gradient-border }

<span class="lvl lvl-2">Intermediate</span> **You see:** A card whose border is a colourful gradient, with rounded corners.

<div class="demo demo--frame">
<iframe class="demo-frame" title="Output: Gradient border card" style="height:80px" data-min="80" srcdoc="&lt;!doctype html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
&lt;style&gt;*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,&#x27;Segoe UI&#x27;,Roboto,sans-serif;color:#1f2329;background:#fff}&lt;/style&gt;
&lt;style&gt;.btns { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.btn {
  font: 600 .9rem/1 system-ui; padding: .7em 1.2em;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer;
  transition: background-color .15s, scale .1s;
}
.btn:active { scale: .97; }
.btn:focus-visible { outline: 3px solid #3f51b5; outline-offset: 2px; }
.btn--primary { background: #e4572e; color: #fff; }
.btn--primary:hover { background: #c43d17; }
.btn--secondary { background: transparent; color: #e4572e; border-color: currentColor; }
.btn--ghost { background: transparent; color: #e4572e; }
.btn--ghost:hover { background: #e4572e1a; }
.btn--icon { inline-size: 44px; block-size: 44px; padding: 0; border-radius: 50%; background: #e4572e1a; color: #e4572e; font-size: 1.2rem; }&lt;/style&gt;
&lt;style&gt;.gborder {
  max-inline-size: 320px; padding: 1.2rem; border-radius: 16px; font-weight: 600;
  border: 3px solid transparent;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(135deg, #e4572e, #f3a712, #3f51b5) border-box;
  color: #1f2329;
}&lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;div class=&quot;gborder&quot;&gt;Gradient border with rounded corners&lt;/div&gt;
&lt;script&gt;
(function () {
  var f = window.frameElement; if (!f) return;
  var min = +f.dataset.min || 0;
  function fit() { f.style.height = Math.max(min, Math.ceil(document.body.getBoundingClientRect().height)) + &#x27;px&#x27;; }
  new ResizeObserver(fit).observe(document.body); fit();
})();
&lt;/script&gt;
&lt;/body&gt;&lt;/html&gt;"></iframe>
</div>

=== "HTML"

    ```html
    <div class="gborder">Gradient border with rounded corners</div>
    ```

=== "CSS"

    ```css
    .gborder {
      max-inline-size: 320px; padding: 1.2rem; border-radius: 16px; font-weight: 600;
      border: 3px solid transparent;
      background:
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(135deg, #e4572e, #f3a712, #3f51b5) border-box;
      color: #1f2329;
    }
    ```

**Why it works:** Two backgrounds: a solid one clipped to the <code>padding-box</code>, and a gradient clipped to the <code>border-box</code>. The transparent border lets the gradient show through. Unlike <code>border-image</code>, this keeps <code>border-radius</code>.
