# HTML Cheat Sheet

Everything you need from HTML on a few screens. For explanations and live output of every element, see the [HTML5 section](../html/index.md).

## Page skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title · Brand</title>
  <meta name="description" content="One-sentence summary for search results.">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#e4572e">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/css/main.css">
  <script src="/js/app.js" type="module"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>…<nav aria-label="Primary">…</nav></header>
  <main id="main">…</main>
  <footer>…</footer>
</body>
</html>
```

## Every element, by purpose

| Purpose | Elements |
|---|---|
| **Root & metadata** | `html` · `head` · `title` · `meta` · `link` · `style` · `script` · `noscript` · `base` · `template` |
| **Page regions (landmarks)** | `header` · `nav` · `main` · `aside` · `footer` · `search` · `section` · `article` · `address` |
| **Headings** | `h1` `h2` `h3` `h4` `h5` `h6` · `hgroup` |
| **Text blocks** | `p` · `blockquote` · `pre` · `hr` · `div` · `figure` · `figcaption` |
| **Lists** | `ul` · `ol` · `li` · `menu` · `dl` · `dt` · `dd` |
| **Inline meaning** | `a` · `strong` · `em` · `b` · `i` · `u` · `s` · `mark` · `small` · `sub` · `sup` · `span` · `br` · `wbr` |
| **Code & tech** | `code` · `kbd` · `samp` · `var` · `pre` |
| **Quotes & references** | `q` · `cite` · `abbr` · `dfn` · `time` · `data` |
| **Edits** | `ins` · `del` |
| **Text direction & annotation** | `bdi` · `bdo` · `ruby` · `rt` · `rp` |
| **Images & graphics** | `img` · `picture` · `source` · `svg` · `canvas` · `map` · `area` · `math` |
| **Audio & video** | `video` · `audio` · `source` · `track` |
| **Embedding** | `iframe` · `embed` · `object` |
| **Tables** | `table` · `caption` · `colgroup` · `col` · `thead` · `tbody` · `tfoot` · `tr` · `th` · `td` |
| **Forms** | `form` · `label` · `input` · `button` · `select` · `option` · `optgroup` · `datalist` · `textarea` · `fieldset` · `legend` · `output` · `progress` · `meter` · `selectedcontent` |
| **Interactive** | `details` · `summary` · `dialog` |
| **Web Components** | `template` · `slot` · custom elements (`<my-widget>`) |

Full A–Z table with one line per tag: [A–Z Tag Reference](../html/all-tags.md).

## Void (self-closing) elements

`area` · `base` · `br` · `col` · `embed` · `hr` · `img` · `input` · `link` · `meta` · `source` · `track` · `wbr`. No closing tag, and the trailing slash (`<br/>`) is optional and ignored.

## Which element should I use?

| You want… | Use | Not |
|---|---|---|
| Something clickable that goes to a URL | `<a href>` | `<div onclick>` |
| Something clickable that does an action | `<button type="button">` | `<a href="#">` |
| The page's main content | `<main>` (one per page) | `<div id="main">` |
| A self-contained card/post/comment | `<article>` | `<div class="card">` (unless purely visual) |
| A themed group with a heading | `<section>` + heading | `<section>` without a heading |
| A group of links that's real navigation | `<nav>` + `<ul>` | A bare list of `<a>` |
| Sidebar / related content | `<aside>` | |
| Important text | `<strong>` | `<b>` |
| Stress that changes meaning | `<em>` | `<i>` |
| Search-match highlight | `<mark>` | `<span class="yellow">` |
| Date or time | `<time datetime="2026-10-20">` | plain text |
| Show/hide section | `<details>` + `<summary>` | JS toggle |
| Modal | `<dialog>` + `showModal()` | `<div class="modal">` |
| Dropdown menu / tooltip | `[popover]` + `popovertarget` | JS library |
| Data with rows and columns | `<table>` | CSS grid of divs |
| Image + caption | `<figure>` + `<figcaption>` | `<div>` + `<p>` |
| Group of form fields with a title | `<fieldset>` + `<legend>` | `<div>` + `<h3>` |

## `<meta>` and `<link>` quick list

| Tag | Purpose |
|---|---|
| `<meta charset="utf-8">` | Character encoding (first 1024 bytes) |
| `<meta name="viewport" content="width=device-width, initial-scale=1">` | Mobile layout. Never add `user-scalable=no` |
| `<meta name="description" content="…">` | Search snippet |
| `<meta name="robots" content="noindex">` | Keep out of search |
| `<meta name="theme-color" content="#hex">` | Mobile browser UI colour |
| `<meta name="color-scheme" content="light dark">` | Native dark controls before CSS loads |
| `<meta property="og:title / og:description / og:image / og:url">` | Social previews |
| `<link rel="stylesheet" href>` | CSS |
| `<link rel="icon" href>` · `rel="apple-touch-icon"` | Favicons |
| `<link rel="manifest" href>` | PWA manifest |
| `<link rel="canonical" href>` | Preferred URL |
| `<link rel="preconnect" href crossorigin>` | Early connection to another origin |
| `<link rel="preload" href as="font\|image\|style\|script">` | Fetch a critical resource now |
| `<link rel="modulepreload" href>` | Preload a JS module |
| `<link rel="prefetch" href>` | Low-priority fetch for the next page |
| `<link rel="alternate" hreflang="hi" href>` | Translations |

## `<script>` loading

| Syntax | Downloads | Runs | Order kept |
|---|---|---|---|
| `<script src>` | Blocks parsing | Immediately | ✅ |
| `<script src defer>` | In parallel | After HTML is parsed | ✅ |
| `<script src async>` | In parallel | As soon as downloaded | ❌ |
| `<script type="module" src>` | In parallel | After parsing (deferred) | ✅ |
| `<script type="importmap">` | — | Maps bare import names | — |
| `<script type="application/ld+json">` | — | Data only (structured data for SEO) | — |
| `<script type="speculationrules">` | — | Prefetch / prerender rules | — |

## Links

```html
<a href="/about">Same site</a>
<a href="https://example.com" target="_blank" rel="noopener">New tab</a>
<a href="#pricing">Same page</a>
<a href="mailto:hi@example.com?subject=Hello">Email</a>
<a href="tel:+911234567890">Call</a>
<a href="sms:+911234567890">Text</a>
<a href="/file.pdf" download="report.pdf">Download</a>
<a href="/cart" aria-current="page">Cart</a>
```

`rel` values: `noopener` · `noreferrer` · `nofollow` · `sponsored` · `ugc` · `external` · `prev` / `next`.

## Images & media

```html
<img src="a.jpg" alt="What it shows" width="800" height="600" loading="lazy" decoding="async">
<img src="hero.avif" alt="…" width="1600" height="900" fetchpriority="high">  <!-- LCP image: never lazy -->

<img src="m.jpg" alt="…" width="800" height="600"
     srcset="s.jpg 400w, m.jpg 800w, l.jpg 1600w"
     sizes="(min-width: 64em) 50vw, 100vw">

<picture>
  <source srcset="a.avif" type="image/avif">
  <source srcset="a.webp" type="image/webp">
  <img src="a.jpg" alt="…" width="800" height="600">
</picture>

<video src="v.mp4" controls poster="p.jpg" preload="metadata" playsinline></video>
<video autoplay muted loop playsinline>…</video>            <!-- background video -->
<audio src="a.mp3" controls></audio>
<iframe src="…" title="Required description" loading="lazy" sandbox allow="fullscreen"></iframe>
```

| `alt` rule | Example |
|---|---|
| Informative image | Describe the content/purpose: `alt="Red running shoe, side view"` |
| Linked image | Describe the destination: `alt="Home"` |
| Decorative | `alt=""` (empty, not missing) |
| Text in image | Repeat the text |
| Complex chart | Short `alt` + longer text or table nearby |

## Tables

```html
<table>
  <caption>Monthly sales</caption>
  <thead><tr><th scope="col">Month</th><th scope="col">Sales</th></tr></thead>
  <tbody><tr><th scope="row">Jan</th><td>₹1.2L</td></tr></tbody>
  <tfoot><tr><th scope="row">Total</th><td>₹1.2L</td></tr></tfoot>
</table>
```

`colspan="2"` · `rowspan="3"` · `scope="col | row | colgroup | rowgroup"` · `headers="id1 id2"` for complex tables.

## Forms

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <fieldset>
    <legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" checked> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
  </fieldset>

  <label><input type="checkbox" name="terms" required> I agree</label>
  <button type="submit">Create account</button>
</form>
```

### All 22 `<input type>` values

| Text-like | Numbers & dates | Choice | Other |
|---|---|---|---|
| `text` | `number` | `checkbox` | `file` |
| `email` | `range` | `radio` | `color` |
| `password` | `date` | | `hidden` |
| `search` | `time` | | `image` |
| `tel` | `datetime-local` | | `submit` |
| `url` | `month` | | `reset` |
| | `week` | | `button` |

### Form attributes

| Attribute | On | Does |
|---|---|---|
| `name` | controls | Key sent to the server (**required to submit**) |
| `value` | controls | Current / default value |
| `placeholder` | text inputs | Hint text (**not** a label) |
| `required` | controls | Must be filled |
| `disabled` | controls, `fieldset` | Not editable, not submitted |
| `readonly` | text inputs | Not editable, still submitted |
| `minlength` / `maxlength` | text | Length limits |
| `min` / `max` / `step` | number, range, date | Range limits |
| `pattern` | text | Regex the value must match |
| `multiple` | email, file, select | Allow several values |
| `accept` | file | `image/*`, `.pdf` |
| `autocomplete` | controls, form | `name` · `email` · `tel` · `street-address` · `postal-code` · `cc-number` · `one-time-code` · `new-password` · `current-password` · `off` |
| `inputmode` | any editable | `numeric` · `decimal` · `tel` · `email` · `url` · `search` · `none` |
| `enterkeyhint` | any editable | `enter` · `done` · `go` · `next` · `search` · `send` |
| `autofocus` | controls | Focus on load |
| `form` | controls | Belongs to a form by id, even outside it |
| `formaction` / `formmethod` / `formnovalidate` | submit buttons | Per-button overrides |
| `list` | input | id of a `<datalist>` |
| `novalidate` | form | Skip built-in validation |
| `enctype="multipart/form-data"` | form | Required for file uploads |

### `<button type>`

`submit` (default inside a form) · `button` (no default action: always set this for JS buttons) · `reset`.

## Interactive (no JavaScript needed)

```html
<!-- Accordion; same name = only one open -->
<details name="faq" open><summary>Question</summary><p>Answer</p></details>

<!-- Modal dialog -->
<button onclick="dlg.showModal()">Open</button>
<dialog id="dlg"><form method="dialog"><button>Close</button></form></dialog>

<!-- Popover menu / tooltip -->
<button popovertarget="menu">Menu</button>
<div id="menu" popover>…</div>
<!-- popover="manual" (you close it) · popover="hint" (tooltips) · popovertargetaction="show|hide|toggle" -->
```

## Global attributes

| Attribute | Use |
|---|---|
| `id` | Unique hook for links, labels, ARIA, JS |
| `class` | Styling / JS hooks (space-separated) |
| `style` | Inline CSS (dynamic values like `--progress: 40%`) |
| `title` | Tooltip (not accessible on touch/keyboard) |
| `lang` · `dir` | Language · `ltr` / `rtl` / `auto` |
| `hidden` · `hidden="until-found"` | Hide · hide but findable with Ctrl+F |
| `inert` | Disable interaction for a whole subtree |
| `tabindex` | `0` focusable · `-1` script-focusable · never positive |
| `contenteditable` | `true` · `plaintext-only` |
| `draggable` · `spellcheck` · `translate="no"` · `autocapitalize` | Behaviour hints |
| `data-*` | Custom data (`el.dataset.x`) |
| `popover` | Make it a popover |
| `role` · `aria-*` | Accessibility semantics |
| `part` · `slot` | Web Components |
| `nonce` | CSP allow-listing |

## ARIA quick reference

| Attribute | Example |
|---|---|
| `aria-label` | `<button aria-label="Close">✕</button>` |
| `aria-labelledby` | `<section aria-labelledby="pricing-h">` |
| `aria-describedby` | Link an input to its hint/error text |
| `aria-expanded` | `true`/`false` on a disclosure or menu button |
| `aria-controls` | id of the region a control toggles |
| `aria-current` | `page` · `step` · `date` · `true` |
| `aria-hidden="true"` | Hide decorative icons from screen readers |
| `aria-live` | `polite` · `assertive`: announce updates |
| `aria-invalid` | Mark an invalid field |
| `aria-pressed` | Toggle button state |
| `aria-busy` | Region is loading |
| `role` | `alert` · `status` · `dialog` · `tab` · `tablist` · `tabpanel` · `switch` · `list` · `region` · `img` · `presentation` |

**First rule of ARIA:** if a native element does the job, use it instead.

## Character entities

| Entity | Shows | Entity | Shows |
|---|---|---|---|
| `&amp;` | & | `&nbsp;` | non-breaking space |
| `&lt;` | < | `&mdash;` | — |
| `&gt;` | > | `&ndash;` | – |
| `&quot;` | " | `&hellip;` | … |
| `&apos;` | ' | `&rarr;` `&larr;` | → ← |
| `&copy;` | © | `&times;` | × |
| `&reg;` · `&trade;` | ® · ™ | `&check;` | ✓ |
| `&#8377;` | ₹ | `&euro;` · `&pound;` | € · £ |

With `<meta charset="utf-8">` you can type most characters directly. You only *need* to escape `&`, `<` and `>` (and quotes inside attributes).

## Deprecated → modern

`<center>` → `text-align` / flex · `<font>` → CSS · `<big>` → `font-size` · `<tt>` → `<code>` · `<strike>` → `<s>`/`<del>` · `<acronym>` → `<abbr>` · `<marquee>` / `<blink>` → don't · `<frameset>` → CSS Grid · `align`/`bgcolor`/`border`/`cellpadding` attributes → CSS. Full list: [A–Z Tag Reference](../html/all-tags.md#deprecated-and-obsolete-tags-use-this-instead).
