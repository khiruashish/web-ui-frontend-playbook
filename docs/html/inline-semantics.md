# Inline Text Semantics

Elements that give meaning to words and phrases inside a paragraph.

## `<a>` Anchor (link) <span class="lvl lvl-1">Beginner</span> { #a-anchor-link data-toc-label="&lt;a&gt; Anchor (link)" }

**Use:** a hyperlink to another page, a file, a section of the same page, an email address or a phone number.

```html
<p>
  <a href="/about">Internal link</a> ·
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener">External, new tab</a> ·
  <a href="#forms">Jump to a section</a> ·
  <a href="mailto:hi@example.com">Email us</a> ·
  <a href="tel:+911234567890">Call us</a> ·
  <a href="/report.pdf" download>Download PDF</a>
</p>
```

<div class="demo">
<p>
  <a href="#a-anchor-link">Internal link</a> ·
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener">External, new tab</a> ·
  <a href="#a-anchor-link">Jump to a section</a> ·
  <a href="mailto:hi@example.com">Email us</a> ·
  <a href="tel:+911234567890">Call us</a> ·
  <a href="#a-anchor-link">Download PDF</a>
</p>
</div>

**Key attributes:** `href`, `target`, `rel` (`noopener`, `noreferrer`, `nofollow`, `sponsored`, `ugc`), `download`, `hreflang`, `referrerpolicy`.

!!! warning "Link or button?"
    **Links go somewhere** (change the URL). **Buttons do something** (submit, open, toggle). Never use `<a href="#" onclick="…">` for an action, and never put a `<button>` inside an `<a>`.

!!! tip "Senior note · 🟡 Intermediate"
    Modern browsers apply `rel="noopener"` to `target="_blank"` automatically, but writing it is still good practice for older browsers. Link text must make sense out of context: "Read the pricing guide", not "Click here".

## `<strong>` vs `<b>` <span class="lvl lvl-1">Beginner</span> { #strong-vs-b data-toc-label="&lt;strong&gt; vs &lt;b&gt;" }

- `<strong>`: **strong importance**, seriousness or urgency.
- `<b>`: draws attention **without** extra importance (keywords, product names).

```html
<p><strong>Warning:</strong> this action can't be undone.</p>
<p>The <b>Pro</b> plan includes priority support.</p>
```

<div class="demo">
<p><strong>Warning:</strong> this action can't be undone.</p>
<p>The <b>Pro</b> plan includes priority support.</p>
</div>

## `<em>` vs `<i>` <span class="lvl lvl-1">Beginner</span> { #em-vs-i data-toc-label="&lt;em&gt; vs &lt;i&gt;" }

- `<em>`: stress emphasis that changes the meaning of the sentence.
- `<i>`: alternate voice: foreign words, technical terms, thoughts, ship names.

```html
<p>I <em>never</em> said she stole the money.</p>
<p>The word <i lang="fr">déjà vu</i> comes from French.</p>
```

<div class="demo">
<p>I <em>never</em> said she stole the money.</p>
<p>The word <i lang="fr">déjà vu</i> comes from French.</p>
</div>

## `<u>`, `<s>`, `<mark>`, `<small>` <span class="lvl lvl-1">Beginner</span> { #u-s-mark-small data-toc-label="&lt;u&gt;, &lt;s&gt;, &lt;mark&gt;, &lt;small&gt;" }

```html
<p><u>Speling</u> errors are often underlined. (u = unarticulated annotation)</p>
<p><s>₹999</s> ₹699 (s = no longer accurate)</p>
<p>Search results for “grid”: CSS <mark>grid</mark> layout. (mark = highlighted/relevant)</p>
<p><small>Prices include GST. (small = side comments, fine print)</small></p>
```

<div class="demo">
<p><u>Speling</u> errors are often underlined. (u = unarticulated annotation)</p>
<p><s>₹999</s> ₹699 (s = no longer accurate)</p>
<p>Search results for “grid”: CSS <mark>grid</mark> layout. (mark = highlighted/relevant)</p>
<p><small>Prices include GST. (small = side comments, fine print)</small></p>
</div>

## `<sub>` and `<sup>` <span class="lvl lvl-1">Beginner</span> { #sub-and-sup data-toc-label="&lt;sub&gt; and &lt;sup&gt;" }

```html
<p>H<sub>2</sub>O · E = mc<sup>2</sup> · 1<sup>st</sup> place</p>
```

<div class="demo">
<p>H<sub>2</sub>O · E = mc<sup>2</sup> · 1<sup>st</sup> place</p>
</div>

## `<code>`, `<kbd>`, `<samp>`, `<var>` <span class="lvl lvl-1">Beginner</span> { #code-kbd-samp-var data-toc-label="&lt;code&gt;, &lt;kbd&gt;, &lt;samp&gt;, &lt;var&gt;" }

```html
<p>Call <code>array.map()</code> to transform items.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>
<p>The terminal printed <samp>Build succeeded</samp>.</p>
<p>The area is <var>width</var> × <var>height</var>.</p>
```

<div class="demo">
<p>Call <code>array.map()</code> to transform items.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>
<p>The terminal printed <samp>Build succeeded</samp>.</p>
<p>The area is <var>width</var> × <var>height</var>.</p>
</div>

| Tag | Meaning |
|---|---|
| `code` | A fragment of computer code |
| `kbd` | Keyboard (or voice) input the user types |
| `samp` | Sample output from a program |
| `var` | A variable in maths or programming |

## `<abbr>` Abbreviation <span class="lvl lvl-1">Beginner</span> { #abbr-abbreviation data-toc-label="&lt;abbr&gt; Abbreviation" }

```html
<p>Use <abbr title="Cascading Style Sheets">CSS</abbr> for styling.</p>
```

<div class="demo">
<p>Use <abbr title="Cascading Style Sheets">CSS</abbr> for styling.</p>
</div>

!!! tip "Senior note · 🟠 Advanced"
    `title` tooltips aren't available to touch or keyboard users. Spell the abbreviation out the first time it appears in the text, and use `<abbr>` after that.

## `<cite>`, `<q>`, `<dfn>` <span class="lvl lvl-2">Intermediate</span> { #cite-q-dfn data-toc-label="&lt;cite&gt;, &lt;q&gt;, &lt;dfn&gt;" }

```html
<p>My favourite book is <cite>The Pragmatic Programmer</cite>.</p>
<p>As the docs say, <q>prefer native elements over ARIA</q>.</p>
<p>A <dfn>pixel</dfn> is the smallest unit of a digital image.</p>
```

<div class="demo">
<p>My favourite book is <cite>The Pragmatic Programmer</cite>.</p>
<p>As the docs say, <q>prefer native elements over ARIA</q>.</p>
<p>A <dfn>pixel</dfn> is the smallest unit of a digital image.</p>
</div>

- `cite`: the **title** of a creative work (not a person's name).
- `q`: a short inline quote. The browser adds quote marks for the current `lang`.
- `dfn`: the term being defined in this sentence.

## `<time>` and `<data>` <span class="lvl lvl-2">Intermediate</span> { #time-and-data data-toc-label="&lt;time&gt; and &lt;data&gt;" }

**Use:** human-readable text with a machine-readable value.

```html
<p>Sale ends <time datetime="2026-12-31T23:59">New Year's Eve at midnight</time>.</p>
<p>Product: <data value="SKU-4821">Blue running shoes</data></p>
```

<div class="demo">
<p>Sale ends <time datetime="2026-12-31T23:59">New Year's Eve at midnight</time>.</p>
<p>Product: <data value="SKU-4821">Blue running shoes</data></p>
</div>

## `<span>` Generic inline container <span class="lvl lvl-1">Beginner</span> { #span-generic-inline-container data-toc-label="&lt;span&gt; Generic inline container" }

**Use:** an inline wrapper with no meaning, for styling a word or attaching JS.

```html
<p>Status: <span class="badge">Active</span></p>
```

<div class="demo">
<p>Status: <span style="background:#2e9d4f;color:#fff;padding:.1em .6em;border-radius:1em;font-size:.85em">Active</span></p>
</div>

## `<ins>` and `<del>` <span class="lvl lvl-2">Intermediate</span> { #ins-and-del data-toc-label="&lt;ins&gt; and &lt;del&gt;" }

**Use:** edits to a document (inserted / deleted text), like track changes.

```html
<p>Meeting moved to <del>Monday</del> <ins>Tuesday</ins>.</p>
```

<div class="demo">
<p>Meeting moved to <del>Monday</del> <ins>Tuesday</ins>.</p>
</div>

## `<bdi>`, `<bdo>`, `<wbr>` <span class="lvl lvl-3">Advanced</span> { #bdi-bdo-wbr data-toc-label="&lt;bdi&gt;, &lt;bdo&gt;, &lt;wbr&gt;" }

```html
<!-- bdi: isolate text whose direction is unknown (user names) -->
<p>User <bdi>إيان</bdi>: 3 posts</p>

<!-- bdo: force a direction -->
<p><bdo dir="rtl">This text is reversed</bdo></p>

<!-- wbr: a place the browser MAY break a long word -->
<p>https://example.com/<wbr>very/<wbr>long/<wbr>path/<wbr>to/<wbr>a/<wbr>resource</p>
```

<div class="demo">
<p>User <bdi>إيان</bdi>: 3 posts</p>
<p><bdo dir="rtl">This text is reversed</bdo></p>
<p style="max-width:180px">https://example.com/<wbr>very/<wbr>long/<wbr>path/<wbr>to/<wbr>a/<wbr>resource</p>
</div>

## `<ruby>`, `<rt>`, `<rp>` <span class="lvl lvl-3">Advanced</span> { #ruby-rt-rp data-toc-label="&lt;ruby&gt;, &lt;rt&gt;, &lt;rp&gt;" }

**Use:** pronunciation annotations for East Asian text.

```html
<ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby>
```

<div class="demo">
<p style="font-size:1.6em;margin:0"><ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby></p>
</div>

`<rp>` holds fallback parentheses, shown only in browsers that don't support ruby.

## Quick decision table

| You want to… | Use |
|---|---|
| Show something is important | `strong` |
| Change the meaning by stress | `em` |
| Style a keyword without extra meaning | `b` or `span` |
| Highlight a search match | `mark` |
| Show a price that changed | `s` + new price |
| Show a date | `time datetime="…"` |
| Show code / keys / output | `code` / `kbd` / `samp` |
