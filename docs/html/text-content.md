# Text Content

Block-level elements that organise text: headings, paragraphs, lists, quotes and figures.

## `<h1>` – `<h6>` Headings <span class="lvl lvl-1">Beginner</span> { #h1-h6-headings data-toc-label="&lt;h1&gt; – &lt;h6&gt; Headings" }

**Use:** section titles, from most important (`h1`) to least (`h6`).

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

<div class="demo">
<h1 style="margin:.2em 0">Heading 1</h1>
<h2 style="margin:.2em 0">Heading 2</h2>
<h3 style="margin:.2em 0">Heading 3</h3>
<h4 style="margin:.2em 0">Heading 4</h4>
<h5 style="margin:.2em 0">Heading 5</h5>
<h6 style="margin:.2em 0">Heading 6</h6>
</div>

**Rules:**

- One `<h1>` per page, describing the page.
- Don't skip levels (`h2` → `h4`). Screen reader users navigate by heading level and a skip looks like missing content.
- Pick the level for **structure**, then use CSS for **size**. Need a small-looking `h2`? Style it.

!!! tip "Senior note · 🟠 Advanced"
    About 68% of screen reader users navigate long pages by headings first (WebAIM survey). A correct heading outline is one of the cheapest, highest-impact accessibility wins.

## `<p>` Paragraph <span class="lvl lvl-1">Beginner</span> { #p-paragraph data-toc-label="&lt;p&gt; Paragraph" }

```html
<p>The first paragraph.</p>
<p>The second paragraph, with space above it from the browser's default margin.</p>
```

<div class="demo">
<p>The first paragraph.</p>
<p>The second paragraph, with space above it from the browser's default margin.</p>
</div>

**Common mistake:** using empty `<p></p>` or `<br><br>` for spacing. Use CSS `margin` instead.

## `<br>` Line break <span class="lvl lvl-1">Beginner</span> { #br-line-break data-toc-label="&lt;br&gt; Line break" }

**Use:** a line break that's part of the content, such as in an address or a poem.

```html
<p>221B Baker Street<br>London<br>NW1 6XE</p>
```

<div class="demo">
<p>221B Baker Street<br>London<br>NW1 6XE</p>
</div>

## `<hr>` Thematic break <span class="lvl lvl-1">Beginner</span> { #hr-thematic-break data-toc-label="&lt;hr&gt; Thematic break" }

**Use:** a change of topic between paragraphs. It's semantic, not just a line, so screen readers announce it as a separator.

```html
<p>End of chapter one.</p>
<hr>
<p>Chapter two begins.</p>
```

<div class="demo">
<p>End of chapter one.</p>
<hr>
<p>Chapter two begins.</p>
</div>

## `<pre>` Preformatted text <span class="lvl lvl-1">Beginner</span> { #pre-preformatted-text data-toc-label="&lt;pre&gt; Preformatted text" }

**Use:** keeps whitespace and line breaks exactly as written, in a monospace font. Wrap code in `<pre><code>`.

```html
<pre><code>function greet() {
  return "hi";
}</code></pre>
```

<div class="demo">
<pre style="margin:0"><code>function greet() {
  return "hi";
}</code></pre>
</div>

## `<blockquote>` Block quotation <span class="lvl lvl-1">Beginner</span> { #blockquote-block-quotation data-toc-label="&lt;blockquote&gt; Block quotation" }

**Use:** a long quote from another source. `cite` holds the source URL (not shown on screen).

```html
<figure>
  <blockquote cite="https://www.w3.org/standards/webdesign/accessibility">
    <p>The power of the Web is in its universality.</p>
  </blockquote>
  <figcaption>— Tim Berners-Lee</figcaption>
</figure>
```

<div class="demo">
<figure style="margin:0">
  <blockquote cite="https://www.w3.org/standards/webdesign/accessibility">
    <p>The power of the Web is in its universality.</p>
  </blockquote>
  <figcaption>— Tim Berners-Lee</figcaption>
</figure>
</div>

## `<ul>` Unordered list <span class="lvl lvl-1">Beginner</span> { #ul-unordered-list data-toc-label="&lt;ul&gt; Unordered list" }

**Use:** a list where order doesn't matter. Navigation menus are usually `<ul>` inside `<nav>`.

```html
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>
```

<div class="demo">
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>
</div>

## `<ol>` Ordered list <span class="lvl lvl-1">Beginner</span> { #ol-ordered-list data-toc-label="&lt;ol&gt; Ordered list" }

**Use:** a list where order matters: steps, rankings.

**Key attributes:** `start="5"`, `reversed`, `type="1 | a | A | i | I"`. On `<li>`: `value="10"`.

```html
<ol type="i" start="3">
  <li>Preheat the oven</li>
  <li>Mix the batter</li>
  <li>Bake for 25 minutes</li>
</ol>

<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>
```

<div class="demo">
<ol type="i" start="3">
  <li>Preheat the oven</li>
  <li>Mix the batter</li>
  <li>Bake for 25 minutes</li>
</ol>
<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>
</div>

## `<li>` List item <span class="lvl lvl-1">Beginner</span> { #li-list-item data-toc-label="&lt;li&gt; List item" }

**Use:** an item inside `<ul>`, `<ol>` or `<menu>`. Lists can nest: put a whole `<ul>` inside an `<li>`.

```html
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
```

<div class="demo">
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
</div>

!!! tip "Senior note · 🟠 Advanced"
    `list-style: none` makes Safari/VoiceOver stop announcing a list as a list. If the list semantics matter (a nav menu does), add `role="list"` to the `<ul>`. Or use `list-style-type: ""`, which hides the bullets and keeps the semantics in current Safari.

## `<dl>`, `<dt>`, `<dd>` Description list <span class="lvl lvl-2">Intermediate</span> { #dl-dt-dd-description-list data-toc-label="&lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt; Description list" }

**Use:** name–value groups: glossaries, metadata, FAQs, key-value specs.

```html
<dl>
  <dt>HTML</dt>
  <dd>Structure and meaning of content.</dd>
  <dt>CSS</dt>
  <dd>Presentation and layout.</dd>
  <dt>JS</dt>
  <dd>Behaviour.</dd>
</dl>
```

<div class="demo">
<dl>
  <dt>HTML</dt>
  <dd>Structure and meaning of content.</dd>
  <dt>CSS</dt>
  <dd>Presentation and layout.</dd>
  <dt>JS</dt>
  <dd>Behaviour.</dd>
</dl>
</div>

You may wrap each `dt`/`dd` group in a `<div>` for styling (for example, a grid of cards).

## `<div>` Generic container <span class="lvl lvl-1">Beginner</span> { #div-generic-container data-toc-label="&lt;div&gt; Generic container" }

**Use:** a block container with **no meaning**. Use it for styling and layout hooks only, when no semantic element fits.

```html
<div class="card">
  <h3>Plan A</h3>
  <p>For small teams.</p>
</div>
```

<div class="demo">
<div style="border:1px solid #c9ced6;border-radius:8px;padding:1em;max-width:220px">
  <h3 style="margin:0 0 .3em">Plan A</h3>
  <p style="margin:0">For small teams.</p>
</div>
</div>

## `<figure>` and `<figcaption>` <span class="lvl lvl-1">Beginner</span> { #figure-and-figcaption data-toc-label="&lt;figure&gt; and &lt;figcaption&gt;" }

**Use:** self-contained content (image, chart, code, quote) with an optional caption. The figure could be moved to an appendix without breaking the text.

```html
<figure>
  <img src="chart.svg" alt="Revenue grew 40% from Q1 to Q4" width="240" height="120">
  <figcaption>Figure 1: Revenue by quarter, 2026.</figcaption>
</figure>
```

<div class="demo">
<figure style="margin:0">
  <svg width="240" height="120" viewBox="0 0 240 120" role="img" aria-label="Revenue grew 40% from Q1 to Q4">
    <rect x="10" y="70" width="40" height="40" fill="#e4572e"/>
    <rect x="65" y="55" width="40" height="55" fill="#e4572e"/>
    <rect x="120" y="45" width="40" height="65" fill="#e4572e"/>
    <rect x="175" y="25" width="40" height="85" fill="#e4572e"/>
  </svg>
  <figcaption>Figure 1: Revenue by quarter, 2026.</figcaption>
</figure>
</div>

## `<menu>` <span class="lvl lvl-2">Intermediate</span> { #menu data-toc-label="&lt;menu&gt;" }

**Use:** a semantic alternative to `<ul>` for a list of commands (toolbar buttons). Browsers treat it like `<ul>`.

```html
<menu>
  <li><button type="button">Copy</button></li>
  <li><button type="button">Cut</button></li>
  <li><button type="button">Paste</button></li>
</menu>
```

<div class="demo">
<menu style="display:flex;gap:.5em;list-style:none;padding:0;margin:0">
  <li><button type="button">Copy</button></li>
  <li><button type="button">Cut</button></li>
  <li><button type="button">Paste</button></li>
</menu>
</div>

## `<main>` <span class="lvl lvl-1">Beginner</span> { #main data-toc-label="&lt;main&gt;" }

See [Sectioning & Landmarks](sectioning.md#main). One visible `<main>` per page, holding the page's primary content.
