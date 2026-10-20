# Global Attributes

Global attributes work on **every** HTML element.

## Core <span class="lvl lvl-1">Beginner</span> { #core data-toc-label="Core" }

| Attribute | Use | Example |
|---|---|---|
| `id` | Unique identifier on the page. Targets for links (`#id`), labels (`for`), ARIA and JS. | `<section id="pricing">` |
| `class` | Space-separated names for CSS and JS. Reusable. | `<div class="card card--featured">` |
| `style` | Inline CSS. Highest specificity in author styles; avoid except for dynamic values. | `<div style="--progress: 40%">` |
| `title` | Advisory tooltip. Not accessible on touch or keyboard; don't rely on it. | `<abbr title="…">` |
| `lang` | Language of the content. | `<p lang="hi">नमस्ते</p>` |
| `dir` | Text direction: `ltr`, `rtl`, `auto`. | `<p dir="auto">` |
| `hidden` | Hides the element (like `display:none`). | `<div hidden>` |

### `hidden` and `hidden="until-found"` <span class="lvl lvl-2">Intermediate</span> { #hidden-and-hiddenuntil-found data-toc-label="hidden and hidden=&quot;until-found&quot;" }

```html
<p hidden>You can't see me.</p>
<div hidden="until-found">Browser find-in-page (Ctrl+F) can reveal me.</div>
```

`until-found` (Chromium 102+; Firefox and Safari recently) keeps content findable and indexable while collapsed, which is perfect for accordions. The `beforematch` event fires before it's revealed.

## `data-*` custom data <span class="lvl lvl-1">Beginner</span> { #data-custom-data data-toc-label="data-* custom data" }

```html
<button data-product-id="4821" data-variant="blue">Add to cart</button>

<script>
  btn.dataset.productId;   // "4821" (kebab-case → camelCase)
</script>

<style>
  [data-variant="blue"] { background: royalblue; color: white; }
</style>
```

<div class="demo">
<button data-variant="blue" style="background:royalblue;color:#fff;border:0;padding:.5em 1em;border-radius:6px">Add to cart</button>
</div>

## Interaction <span class="lvl lvl-2">Intermediate</span> { #interaction data-toc-label="Interaction" }

| Attribute | Use |
|---|---|
| `tabindex="0"` | Make a non-focusable element focusable, in DOM order. |
| `tabindex="-1"` | Focusable by script (`el.focus()`) but not by Tab. Used for headings you move focus to. |
| `tabindex="1+"` | ❌ Never: it breaks the natural focus order. |
| `autofocus` | Focus on page load / dialog open. Use sparingly. |
| `accesskey` | Keyboard shortcut. Conflicts with assistive tech shortcuts, so rarely recommended. |
| `contenteditable` | Makes content editable: `true`, `false`, `plaintext-only`. |
| `draggable` | `true` to allow native drag and drop. |
| `spellcheck` | `true` / `false` |
| `inputmode`, `enterkeyhint` | Virtual keyboard hints (also work on `contenteditable`). |
| `autocapitalize` | `off`, `sentences`, `words`, `characters` |

```html
<p contenteditable="true">Click and edit this text.</p>
```

<div class="demo">
<p contenteditable="true" style="outline:1px dashed #e4572e;padding:.5em;margin:0">Click and edit this text.</p>
</div>

## `inert` <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2023</small> { #inert data-toc-label="inert" }

**Use:** makes an element and its whole subtree non-interactive: no focus, no clicks, hidden from assistive tech. Use it on the page behind an off-canvas menu or a custom modal.

```html
<main inert>…</main>
<nav class="drawer open">…</nav>
```

<div class="demo">
<div inert style="opacity:.5"><button>I'm inert: try clicking or tabbing to me</button> <a href="#inert">inert link</a></div>
</div>

## `popover` <span class="lvl lvl-2">Intermediate</span> { #popover data-toc-label="popover" }

Turns any element into a popover. See [Interactive → Popover API](interactive.md#the-popover-api).

## Accessibility: `role` and `aria-*` <span class="lvl lvl-3">Advanced</span> { #accessibility-role-and-aria- data-toc-label="Accessibility: role and aria-*" }

ARIA (Accessible Rich Internet Applications) changes what assistive technology announces. **It doesn't change behaviour**: `role="button"` won't make a `<div>` keyboard-operable.

The five rules of ARIA:

1. If a native HTML element does the job, use it instead of ARIA.
2. Don't change native semantics (`<h2 role="tab">` ❌) unless you really must.
3. All interactive ARIA controls must be keyboard operable.
4. Don't use `role="presentation"` or `aria-hidden="true"` on a focusable element.
5. All interactive elements must have an accessible name.

| Attribute | Use |
|---|---|
| `aria-label` | Accessible name when there's no visible text: `<button aria-label="Close">✕</button>` |
| `aria-labelledby` | Name from another element's text (by id) |
| `aria-describedby` | Extra description: hint or error text |
| `aria-expanded` | `true`/`false` on a button that toggles something |
| `aria-controls` | id of the element the control affects |
| `aria-current` | `page`, `step`, `date`… marks the current item in a set |
| `aria-live` | `polite` / `assertive`: announce dynamic updates (toasts, results counts) |
| `aria-hidden="true"` | Hide decorative content from assistive tech |
| `aria-invalid` | Mark a field as invalid |
| `aria-busy` | Region is updating |
| `aria-pressed` | Toggle buttons (`true` / `false` / `mixed`) |

```html
<button aria-expanded="false" aria-controls="filters">Filters</button>
<div id="filters" hidden>…</div>

<label for="pw">Password</label>
<input id="pw" type="password" aria-describedby="pw-hint pw-err" aria-invalid="true">
<p id="pw-hint">At least 12 characters.</p>
<p id="pw-err">Too short.</p>

<p aria-live="polite" id="status">3 results</p>
```

## Others <span class="lvl lvl-3">Advanced</span> { #others data-toc-label="Others" }

| Attribute | Use |
|---|---|
| `translate="no"` | Don't machine-translate (brand names, code) |
| `nonce` | Allow this inline script/style under a Content Security Policy |
| `part` | Expose a shadow-DOM element for styling with `::part()` |
| `slot` | Assign a child to a named `<slot>` in a web component |
| `is` | Customized built-in element (not supported in Safari) |
| `itemscope`, `itemtype`, `itemprop` | Microdata for structured data (JSON-LD is usually preferred) |
| `writingsuggestions` | `false` to turn off browser AI writing suggestions in a field |
