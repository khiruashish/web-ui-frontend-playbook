# Interactive Elements & Web Components

Modern HTML can do things that used to need a JavaScript library: accordions, modals, menus and tooltips. Native versions handle focus, keyboard and screen readers for you.

## `<details>` and `<summary>` <span class="lvl lvl-1">Beginner</span> { #details-and-summary data-toc-label="&lt;details&gt; and &lt;summary&gt;" }

**Use:** a disclosure widget (show/hide), with no JavaScript.

```html
<details>
  <summary>What is Flexbox?</summary>
  <p>A one-dimensional layout model for rows or columns.</p>
</details>

<details open>
  <summary>Open by default</summary>
  <p>The <code>open</code> attribute starts it expanded.</p>
</details>
```

<div class="demo">
<details>
  <summary>What is Flexbox?</summary>
  <p>A one-dimensional layout model for rows or columns.</p>
</details>
<details open>
  <summary>Open by default</summary>
  <p>The <code>open</code> attribute starts it expanded.</p>
</details>
</div>

### Exclusive accordion with `name` <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2024</small> { #exclusive-accordion-with-name data-toc-label="Exclusive accordion with name" }

Give several `<details>` the same `name` and only one can be open at a time.

```html
<details name="faq" open><summary>Shipping</summary><p>3–5 days.</p></details>
<details name="faq"><summary>Returns</summary><p>30 days, free.</p></details>
<details name="faq"><summary>Warranty</summary><p>2 years.</p></details>
```

<div class="demo">
<details name="faq-demo" open><summary>Shipping</summary><p>3–5 days.</p></details>
<details name="faq-demo"><summary>Returns</summary><p>30 days, free.</p></details>
<details name="faq-demo"><summary>Warranty</summary><p>2 years.</p></details>
</div>

**Style the marker:**

```css
summary { list-style: none; cursor: pointer; }           /* hide the triangle */
summary::-webkit-details-marker { display: none; }      /* older Safari */
summary::after { content: "+"; float: inline-end; }
details[open] > summary::after { content: "−"; }

/* Animate open/close height (Chromium 131+) */
details::details-content {
  block-size: 0; overflow: hidden;
  transition: block-size .3s, content-visibility .3s allow-discrete;
}
details[open]::details-content { block-size: auto; }
:root { interpolate-size: allow-keywords; }  /* lets 'auto' animate */
```

## `<dialog>` <span class="lvl lvl-2">Intermediate</span> { #dialog data-toc-label="&lt;dialog&gt;" }

**Use:** a modal or non-modal dialog. `showModal()` gives you, for free: a backdrop, focus moved inside, the rest of the page made inert, ++escape++ to close, and rendering on the top layer above every `z-index`.

```html
<button type="button" onclick="dlg.showModal()">Delete project…</button>

<dialog id="dlg" aria-labelledby="dlg-title">
  <h2 id="dlg-title">Delete project?</h2>
  <p>This can't be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>
```

```css
dialog::backdrop { background: rgb(0 0 0 / .5); backdrop-filter: blur(2px); }
```

<div class="demo">
<button type="button" onclick="document.getElementById('dlg-demo').showModal()">Delete project…</button>
<dialog id="dlg-demo" aria-labelledby="dlg-demo-title" style="border:0;border-radius:12px;padding:1.5em;max-width:320px">
  <h2 id="dlg-demo-title" style="margin-top:0">Delete project?</h2>
  <p>This can't be undone.</p>
  <form method="dialog" style="display:flex;gap:.5em;justify-content:flex-end">
    <button value="cancel">Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>
<style>#dlg-demo::backdrop{background:rgb(0 0 0 / .5);backdrop-filter:blur(2px)}</style>
</div>

- `<form method="dialog">` closes the dialog on submit and sets `dialog.returnValue` to the clicked button's `value`.
- `show()` opens it non-modally (no backdrop, page still interactive).
- New: `closedby="any"` (Chromium 134+) lets a click on the backdrop close it.

## The Popover API <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2024</small> { #the-popover-api data-toc-label="The Popover API" }

**Use:** menus, tooltips, toasts and pickers that float on the top layer. Declarative: no JS needed to open and close.

```html
<button popovertarget="menu">Open menu</button>

<div id="menu" popover>
  <a href="#">Profile</a>
  <a href="#">Settings</a>
  <a href="#">Sign out</a>
</div>
```

<div class="demo">
<button popovertarget="menu-demo">Open menu</button>
<div id="menu-demo" popover style="border:1px solid #ccc;border-radius:10px;padding:.5em;margin:auto">
  <p style="margin:.3em .6em"><a href="#the-popover-api">Profile</a></p>
  <p style="margin:.3em .6em"><a href="#the-popover-api">Settings</a></p>
  <p style="margin:.3em .6em"><a href="#the-popover-api">Sign out</a></p>
</div>
</div>

| Feature | `popover` (auto) | `popover="manual"` | `popover="hint"` |
|---|---|---|---|
| Closes on outside click / ++escape++ | ✅ | ❌ (you close it) | ✅ |
| Closes other auto popovers | ✅ | ❌ | ❌ (closes other hints) |
| Typical use | Menus, pickers | Toasts | Tooltips |

`popovertargetaction="show | hide | toggle"` controls what the button does. Pair popovers with CSS [anchor positioning](../css/modern-css.md#anchor-positioning) to attach them to their button.

!!! info "dialog vs popover"
    Use `<dialog>` + `showModal()` when the user **must** respond before continuing (blocks the page). Use `popover` for lightweight, dismissable UI that doesn't block anything.

## `<template>` <span class="lvl lvl-2">Intermediate</span> { #template data-toc-label="&lt;template&gt;" }

**Use:** inert HTML that isn't rendered, ready to be cloned by JavaScript.

```html
<ul id="list"></ul>

<template id="row">
  <li><strong class="name"></strong> — <span class="role"></span></li>
</template>

<script>
  const tpl = document.getElementById('row');
  for (const [name, role] of [['Asha', 'Design'], ['Ravi', 'Frontend']]) {
    const li = tpl.content.cloneNode(true);
    li.querySelector('.name').textContent = name;
    li.querySelector('.role').textContent = role;
    document.getElementById('list').append(li);
  }
</script>
```

<div class="demo">
<ul id="tpl-list-demo" style="margin:0"></ul>
<template id="tpl-row-demo"><li><strong class="name"></strong> — <span class="role"></span></li></template>
<script>
  (function () {
    var tpl = document.getElementById('tpl-row-demo'), list = document.getElementById('tpl-list-demo');
    if (!tpl || !list || list.children.length) return;
    [['Asha', 'Design'], ['Ravi', 'Frontend']].forEach(function (p) {
      var li = tpl.content.cloneNode(true);
      li.querySelector('.name').textContent = p[0];
      li.querySelector('.role').textContent = p[1];
      list.appendChild(li);
    });
  })();
</script>
</div>

## Custom elements, Shadow DOM and `<slot>` <span class="lvl lvl-3">Advanced</span> { #custom-elements-shadow-dom-and-slot data-toc-label="Custom elements, Shadow DOM and &lt;slot&gt;" }

**Use:** build your own reusable HTML tags (Web Components) with encapsulated styles. They work in any framework or none.

```html
<user-card>
  <span slot="name">Asha Rao</span>
  <span slot="role">Design Lead</span>
</user-card>

<script>
  customElements.define('user-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          :host { display: inline-block; padding: 1rem; border-radius: 12px;
                  background: linear-gradient(135deg, #e4572e, #f3a712); color: white; }
          ::slotted([slot=role]) { opacity: .85; font-size: .9em; }
        </style>
        <strong><slot name="name">Anonymous</slot></strong><br>
        <slot name="role"></slot>`;
    }
  });
</script>
```

<div class="demo">
<user-card-demo><span slot="name">Asha Rao</span><span slot="role">Design Lead</span></user-card-demo>
<script>
  if (!customElements.get('user-card-demo')) {
    customElements.define('user-card-demo', class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML =
          '<style>:host{display:inline-block;padding:1rem;border-radius:12px;background:linear-gradient(135deg,#e4572e,#f3a712);color:#fff}::slotted([slot=role]){opacity:.85;font-size:.9em}</style>' +
          '<strong><slot name="name">Anonymous</slot></strong><br><slot name="role"></slot>';
      }
    });
  }
</script>
</div>

- Custom element names **must contain a hyphen** (`user-card`).
- `<slot>` is where the light-DOM children get projected. Named slots match `slot="…"`.
- Styles inside the shadow root don't leak out; page styles don't leak in (except inherited properties like `color` and `font`, and `::part()`).

### Declarative Shadow DOM <span class="lvl lvl-4">Expert</span> <small>Baseline 2024</small> { #declarative-shadow-dom data-toc-label="Declarative Shadow DOM" }

Server-render a shadow root without JavaScript:

```html
<user-card>
  <template shadowrootmode="open">
    <style>:host { display:block; border:1px solid #ccc; padding:1rem; }</style>
    <slot></slot>
  </template>
  Rendered on the server, encapsulated, no JS required.
</user-card>
```

!!! tip "Senior note · 🔴 Expert"
    Web Components shine for **design systems shared across frameworks** (React, Angular, Vue, plain pages). Trade-offs: SSR needs declarative shadow DOM; form participation needs `ElementInternals`; ARIA references (`aria-labelledby`) can't cross shadow boundaries yet; and global CSS such as a reset doesn't reach inside the shadow root. Many teams use Lit to cut the boilerplate.
