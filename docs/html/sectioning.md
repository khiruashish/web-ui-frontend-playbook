# Sectioning & Landmarks

Sectioning elements describe the **regions of a page**. Screen readers expose them as **landmarks**, so users can jump straight to the navigation, the main content or the search box. They also give you meaningful CSS hooks instead of `div.header`.

## The page skeleton <span class="lvl lvl-1">Beginner</span> { #the-page-skeleton data-toc-label="The page skeleton" }

```html
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header>
    <a href="/">Logo</a>
    <nav aria-label="Primary">…</nav>
    <search>…</search>
  </header>

  <main id="content">
    <article>
      <h1>Article title</h1>
      <section>
        <h2>Part one</h2>
        …
      </section>
    </article>
    <aside>Related links</aside>
  </main>

  <footer>© 2026 Acme</footer>
</body>
```

<div class="demo">
<div style="display:grid;gap:6px;font:600 13px/1.3 system-ui;color:#222;grid-template-areas:'h h' 'm a' 'f f';grid-template-columns:3fr 1fr">
  <div style="grid-area:h;background:#ffb38a;padding:8px;border-radius:6px">&lt;header&gt; logo · &lt;nav&gt; · &lt;search&gt;</div>
  <div style="grid-area:m;background:#8ec5ff;padding:8px;border-radius:6px">&lt;main&gt;
    <div style="background:#d6e9ff;margin-top:6px;padding:8px;border-radius:6px">&lt;article&gt; h1
      <div style="background:#eef6ff;margin-top:6px;padding:8px;border-radius:6px">&lt;section&gt; h2</div>
      <div style="background:#eef6ff;margin-top:6px;padding:8px;border-radius:6px">&lt;section&gt; h2</div>
    </div>
  </div>
  <div style="grid-area:a;background:#b8e986;padding:8px;border-radius:6px">&lt;aside&gt;</div>
  <div style="grid-area:f;background:#d9b8ff;padding:8px;border-radius:6px">&lt;footer&gt;</div>
</div>
</div>

| Element | Landmark role | When it's a landmark |
|---|---|---|
| `<header>` | `banner` | Only when it's a direct child of `<body>` (not inside article/section/main) |
| `<nav>` | `navigation` | Always |
| `<main>` | `main` | Always |
| `<aside>` | `complementary` | At top level, or with an accessible name |
| `<footer>` | `contentinfo` | Only when it's a direct child of `<body>` |
| `<section>` | `region` | Only when it has an accessible name (`aria-labelledby` / `aria-label`) |
| `<search>` | `search` | Always |
| `<form>` | `form` | Only when it has an accessible name |
| `<article>` | `article` | Always (not a landmark, but a document structure role) |

## `<header>` <span class="lvl lvl-1">Beginner</span> { #header data-toc-label="&lt;header&gt;" }

**Use:** introductory content for the page or for a section: logo, title, nav, author info. A page can have several (one per article).

```html
<article>
  <header>
    <h2>Why Grid beats floats</h2>
    <p>By Asha · <time datetime="2026-10-01">1 Oct 2026</time></p>
  </header>
  <p>…</p>
</article>
```

<div class="demo">
<article>
  <header>
    <h2 style="margin:0">Why Grid beats floats</h2>
    <p style="margin:.2em 0;opacity:.75">By Asha · <time datetime="2026-10-01">1 Oct 2026</time></p>
  </header>
  <p style="margin:0">…</p>
</article>
</div>

## `<nav>` <span class="lvl lvl-1">Beginner</span> { #nav data-toc-label="&lt;nav&gt;" }

**Use:** a block of **major** navigation links: main menu, breadcrumbs, table of contents, pagination. Not every group of links needs `<nav>` (footer legal links usually don't).

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a aria-current="page">Flexbox</a></li>
  </ol>
</nav>
```

<div class="demo">
<nav aria-label="Breadcrumb">
  <ol style="display:flex;gap:.5em;list-style:none;padding:0;margin:0">
    <li><a href="#nav">Home</a> /</li>
    <li><a href="#nav">Docs</a> /</li>
    <li><a aria-current="page">Flexbox</a></li>
  </ol>
</nav>
</div>

!!! tip "Senior note · 🟡 Intermediate"
    With more than one `<nav>` on a page, give each an `aria-label` ("Primary", "Breadcrumb", "Pagination") so screen reader users can tell them apart. Use `aria-current="page"` on the link to the current page.

## `<main>` <span class="lvl lvl-1">Beginner</span> { #main data-toc-label="&lt;main&gt;" }

**Use:** the dominant content of the page. Exactly **one visible** `<main>` per page. Not inside `article`, `aside`, `header`, `footer` or `nav`.

```html
<a class="skip-link" href="#content">Skip to content</a>
<main id="content">…</main>
```

The skip link lets keyboard users jump past a long header. Hide it until it gets focus:

```css
.skip-link { position: absolute; translate: 0 -200%; }
.skip-link:focus { translate: 0 0; }
```

## `<article>` <span class="lvl lvl-1">Beginner</span> { #article data-toc-label="&lt;article&gt;" }

**Use:** self-contained content that makes sense on its own and could be syndicated: a blog post, a news story, a product card, a forum comment.

**Test:** "Would this still make sense in an RSS feed?" If yes, it's an `<article>`.

```html
<article class="product">
  <img src="shoe.jpg" alt="Blue running shoe" width="120" height="80">
  <h3>Cloud Runner</h3>
  <p>₹4,999</p>
</article>
```

## `<section>` <span class="lvl lvl-1">Beginner</span> { #section data-toc-label="&lt;section&gt;" }

**Use:** a thematic grouping of content, **with a heading**. If you can't think of a heading for it, it's probably a `<div>`.

```html
<section aria-labelledby="pricing-h">
  <h2 id="pricing-h">Pricing</h2>
  …
</section>
```

!!! info "section vs article vs div"
    - **article**: stands alone (a card, a post).
    - **section**: a chapter of something bigger, with a heading.
    - **div**: no meaning, styling only.

## `<aside>` <span class="lvl lvl-1">Beginner</span> { #aside data-toc-label="&lt;aside&gt;" }

**Use:** content related to the surrounding content, but separate from it: sidebars, pull quotes, "related articles", ads.

```html
<aside>
  <h3>Did you know?</h3>
  <p>Flexbox shipped in all major browsers in 2015.</p>
</aside>
```

<div class="demo">
<aside style="border-left:4px solid #e4572e;padding:.2em 1em;max-width:300px">
  <h3 style="margin:.2em 0">Did you know?</h3>
  <p style="margin:.2em 0">Flexbox shipped in all major browsers in 2015.</p>
</aside>
</div>

## `<footer>` <span class="lvl lvl-1">Beginner</span> { #footer data-toc-label="&lt;footer&gt;" }

**Use:** footer for the page or a section: copyright, author, related links, contact.

```html
<footer>
  <p>© 2026 Acme Inc. · <a href="/privacy">Privacy</a></p>
</footer>
```

## `<address>` <span class="lvl lvl-2">Intermediate</span> { #address data-toc-label="&lt;address&gt;" }

**Use:** contact information for the nearest `<article>` or the whole page. **Not** for any postal address in the text.

```html
<address>
  Written by <a href="mailto:asha@example.com">Asha</a>.<br>
  Acme Inc., Bengaluru
</address>
```

<div class="demo">
<address>
  Written by <a href="mailto:asha@example.com">Asha</a>.<br>
  Acme Inc., Bengaluru
</address>
</div>

## `<hgroup>` <span class="lvl lvl-2">Intermediate</span> { #hgroup data-toc-label="&lt;hgroup&gt;" }

**Use:** a heading grouped with a subtitle or tagline. Since 2023 the spec allows one heading plus `<p>` elements.

```html
<hgroup>
  <h1>Web UI Frontend Playbook</h1>
  <p>From your first tag to frontend architect.</p>
</hgroup>
```

<div class="demo">
<hgroup>
  <h1 style="margin:0">Web UI Frontend Playbook</h1>
  <p style="margin:.2em 0 0;opacity:.75">From your first tag to frontend architect.</p>
</hgroup>
</div>

## `<search>` <span class="lvl lvl-2">Intermediate</span> <small>new 2023</small> { #search data-toc-label="&lt;search&gt;" }

**Use:** wraps search or filter controls. It's the native version of `<div role="search">`. Baseline since 2023.

```html
<search>
  <form action="/search">
    <label for="q">Search docs</label>
    <input id="q" name="q" type="search" placeholder="e.g. flexbox">
    <button>Search</button>
  </form>
</search>
```

<div class="demo">
<search>
  <form onsubmit="return false" style="display:flex;gap:.5em;align-items:center;flex-wrap:wrap">
    <label for="q-demo">Search docs</label>
    <input id="q-demo" name="q" type="search" placeholder="e.g. flexbox">
    <button>Search</button>
  </form>
</search>
</div>

!!! tip "Senior note · 🔴 Expert"
    **The "document outline algorithm" never shipped.** HTML5 once proposed that `<h1>` inside a nested `<section>` would be treated as an `<h2>`. No browser or screen reader implemented it and it was removed from the spec in 2022. Always use explicit heading levels (`h1`–`h6`) that match the real nesting depth. Also, browsers are removing the default smaller font-size for `h1` inside `article`/`section`, so set heading sizes explicitly in CSS.
