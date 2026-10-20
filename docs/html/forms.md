# Forms & Inputs

Forms are where most accessibility bugs live and where native HTML saves you the most code. Built-in elements give you keyboard support, mobile keyboards, validation and autofill for free.

## `<form>` <span class="lvl lvl-1">Beginner</span> { #form data-toc-label="&lt;form&gt;" }

**Use:** collects user input and sends it to a server.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Sign up</button>
</form>
```

<div class="demo">
<form onsubmit="event.preventDefault();this.querySelector('output').value='Submitted ✔'" style="display:flex;gap:.5em;flex-wrap:wrap;align-items:center">
  <label for="email-demo">Email</label>
  <input id="email-demo" name="email" type="email" autocomplete="email" required>
  <button type="submit">Sign up</button>
  <output></output>
</form>
</div>

| Attribute | Use |
|---|---|
| `action` | URL to send the data to (defaults to the current URL) |
| `method` | `get` (data in the URL; use for search/filter) or `post` (data in the body; use for changes) |
| `enctype` | `multipart/form-data` is required for file uploads |
| `novalidate` | Turn off built-in validation (you'll do it in JS) |
| `autocomplete` | `on` / `off` for the whole form |

The `name` attribute on each control is what gets submitted. **No `name`, no data.**

## `<label>` <span class="lvl lvl-1">Beginner</span> { #label data-toc-label="&lt;label&gt;" }

**Use:** the visible, clickable name of a control. Clicking the label focuses or toggles the input, which makes small checkboxes much easier to hit.

```html
<!-- Explicit: for + id -->
<label for="name">Full name</label>
<input id="name" name="name">

<!-- Implicit: wrap the input -->
<label><input type="checkbox" name="terms"> I accept the terms</label>
```

<div class="demo">
<label for="name-demo">Full name</label>
<input id="name-demo" name="name"><br><br>
<label><input type="checkbox" name="terms"> I accept the terms</label>
</div>

!!! danger "Placeholder is not a label"
    Placeholder text disappears when the user types, is usually low-contrast, and isn't reliably announced. Every input needs a real `<label>`.

## `<input>`: all 22 types <span class="lvl lvl-1">Beginner</span> { #input-all-22-types data-toc-label="&lt;input&gt;: all 22 types" }

Each type gives a different control, a different mobile keyboard and different built-in validation. Try them in the Output boxes.

### Text-like inputs

```html
<label>text     <input type="text" placeholder="Any text"></label>
<label>email    <input type="email" placeholder="you@example.com"></label>
<label>password <input type="password" value="secret123"></label>
<label>search   <input type="search" placeholder="Search…"></label>
<label>tel      <input type="tel" placeholder="+91 98765 43210"></label>
<label>url      <input type="url" placeholder="https://"></label>
<label>number   <input type="number" min="0" max="10" step="1" value="3"></label>
```

<div class="demo">
<div style="display:grid;grid-template-columns:max-content 1fr;gap:.5em 1em;align-items:center;max-width:420px">
<label for="t1">text</label><input id="t1" type="text" placeholder="Any text">
<label for="t2">email</label><input id="t2" type="email" placeholder="you@example.com">
<label for="t3">password</label><input id="t3" type="password" value="secret123">
<label for="t4">search</label><input id="t4" type="search" placeholder="Search…">
<label for="t5">tel</label><input id="t5" type="tel" placeholder="+91 98765 43210">
<label for="t6">url</label><input id="t6" type="url" placeholder="https://">
<label for="t7">number</label><input id="t7" type="number" min="0" max="10" step="1" value="3">
</div>
</div>

| Type | Mobile keyboard | Built-in validation |
|---|---|---|
| `text` | Standard | none |
| `email` | Has `@` and `.` | Must look like an email; `multiple` allows a comma list |
| `password` | Standard, masked | none |
| `search` | "Search"/"Go" key; may show a clear ✕ | none |
| `tel` | Phone keypad | none (phone formats vary; use `pattern`) |
| `url` | Has `/` and `.com` | Must be an absolute URL |
| `number` | Numeric | `min`, `max`, `step` |

!!! tip "Senior note · 🟠 Advanced"
    Don't use `type="number"` for things that are digits but not quantities (OTP codes, card numbers, PIN codes, ZIP codes). Spinners and scroll-wheel changes make no sense there, and leading zeros are lost. Use `type="text" inputmode="numeric" autocomplete="one-time-code"` instead.

### Date and time inputs

```html
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">
```

<div class="demo">
<div style="display:grid;grid-template-columns:max-content 1fr;gap:.5em 1em;align-items:center;max-width:420px">
<label for="d1">date</label><input id="d1" type="date">
<label for="d2">time</label><input id="d2" type="time">
<label for="d3">datetime-local</label><input id="d3" type="datetime-local">
<label for="d4">month</label><input id="d4" type="month">
<label for="d5">week</label><input id="d5" type="week">
</div>
</div>

The value is always submitted in ISO format (`2026-10-19`) regardless of how it's displayed. `month` and `week` aren't supported in Firefox/Safari desktop; they fall back to a text field.

### Choice inputs

```html
<fieldset>
  <legend>Size</legend>
  <label><input type="radio" name="size" value="s"> Small</label>
  <label><input type="radio" name="size" value="m" checked> Medium</label>
  <label><input type="radio" name="size" value="l"> Large</label>
</fieldset>

<label><input type="checkbox" checked> Gift wrap</label>
<label><input type="checkbox" switch> Notifications</label>  <!-- Safari 17.4+ switch -->
```

<div class="demo">
<fieldset>
  <legend>Size</legend>
  <label><input type="radio" name="size-demo" value="s"> Small</label>
  <label><input type="radio" name="size-demo" value="m" checked> Medium</label>
  <label><input type="radio" name="size-demo" value="l"> Large</label>
</fieldset>
<p><label><input type="checkbox" checked> Gift wrap</label>
&nbsp; <label><input type="checkbox" switch> Notifications</label></p>
</div>

- **Radio**: pick exactly one. All radios in a group share the same `name`. Arrow keys move between them.
- **Checkbox**: on/off, independently. Can be set to `indeterminate` via JS (the "some selected" state).

### Other inputs

```html
<input type="range" min="0" max="100" value="60">
<input type="color" value="#e4572e">
<input type="file" accept="image/*" multiple>
<input type="hidden" name="csrf" value="abc123">
<input type="image" src="go.png" alt="Go">
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Plain button">
```

<div class="demo">
<div style="display:grid;grid-template-columns:max-content 1fr;gap:.5em 1em;align-items:center;max-width:460px">
<label for="o1">range</label><input id="o1" type="range" min="0" max="100" value="60">
<label for="o2">color</label><input id="o2" type="color" value="#e4572e">
<label for="o3">file</label><input id="o3" type="file" accept="image/*" multiple>
<span>hidden</span><span><em>(nothing visible, still submitted)</em></span>
<span>image</span><input type="image" alt="Go" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='28'%3E%3Crect width='48' height='28' rx='6' fill='%23e4572e'/%3E%3Ctext x='24' y='19' font-family='sans-serif' font-size='14' fill='white' text-anchor='middle'%3EGo%3C/text%3E%3C/svg%3E" onclick="return false">
<span>submit / reset / button</span><span><input type="submit" value="Submit" onclick="return false"> <input type="reset" value="Reset"> <input type="button" value="Plain button"></span>
</div>
</div>

!!! note "`<input type=submit>` vs `<button>`"
    Prefer `<button>`: it can contain HTML (icons, `<span>`s), while `<input>` buttons only take a `value` string.

### All 22 types at a glance

| Type | Level | Type | Level |
|---|---|---|---|
| `text` | 🟢 | `date` | 🟢 |
| `email` | 🟢 | `time` | 🟢 |
| `password` | 🟢 | `datetime-local` | 🟡 |
| `search` | 🟢 | `month` | 🟡 |
| `tel` | 🟢 | `week` | 🟡 |
| `url` | 🟢 | `color` | 🟡 |
| `number` | 🟢 | `file` | 🟡 |
| `checkbox` | 🟢 | `hidden` | 🟡 |
| `radio` | 🟢 | `image` | 🟠 |
| `range` | 🟡 | `submit` | 🟢 |
| `button` | 🟢 | `reset` | 🟢 |

## Validation attributes <span class="lvl lvl-1">Beginner</span> { #validation-attributes data-toc-label="Validation attributes" }

```html
<input required>
<input minlength="3" maxlength="20">
<input type="number" min="1" max="99" step="1">
<input pattern="[A-Z]{3}-[0-9]{4}" title="Format: ABC-1234">
```

<div class="demo">
<form onsubmit="event.preventDefault()" style="display:flex;gap:.5em;flex-wrap:wrap;align-items:center">
  <label for="code-demo">Order code</label>
  <input id="code-demo" required pattern="[A-Z]{3}-[0-9]{4}" placeholder="ABC-1234" title="Format: ABC-1234">
  <button>Check</button>
</form>
</div>

Try submitting with an empty or wrongly formatted value: the browser shows its own error bubble.

Style validation state with CSS. `:user-invalid` only matches **after** the user has interacted, so fields don't show red before anyone types:

```css
input:user-invalid { border-color: crimson; }
input:user-valid   { border-color: seagreen; }
```

## `autocomplete`, `inputmode`, `enterkeyhint` <span class="lvl lvl-2">Intermediate</span> { #autocomplete-inputmode-enterkeyhint data-toc-label="autocomplete, inputmode, enterkeyhint" }

```html
<input name="name"   autocomplete="name">
<input name="email"  autocomplete="email" type="email">
<input name="phone"  autocomplete="tel" type="tel">
<input name="addr"   autocomplete="street-address">
<input name="pin"    autocomplete="postal-code" inputmode="numeric">
<input name="cc"     autocomplete="cc-number" inputmode="numeric">
<input name="otp"    autocomplete="one-time-code" inputmode="numeric">
<input name="new-pw" autocomplete="new-password" type="password">
<input name="q"      enterkeyhint="search" type="search">
```

- `autocomplete` tokens let browsers and password managers fill fields correctly. It's also a WCAG 2.2 requirement (1.3.5 Identify Input Purpose).
- `inputmode` picks the on-screen keyboard: `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url`.
- `enterkeyhint` changes the label on the mobile Enter key: `enter`, `done`, `go`, `next`, `previous`, `search`, `send`.

## `<button>` <span class="lvl lvl-1">Beginner</span> { #button data-toc-label="&lt;button&gt;" }

```html
<button type="submit">Submit (default in a form)</button>
<button type="button">Plain action</button>
<button type="reset">Reset form</button>
<button type="button" disabled>Disabled</button>
```

<div class="demo">
<button type="submit" onclick="return false">Submit (default in a form)</button>
<button type="button">Plain action</button>
<button type="reset">Reset form</button>
<button type="button" disabled>Disabled</button>
</div>

## `<select>`, `<option>`, `<optgroup>` <span class="lvl lvl-1">Beginner</span> { #select-option-optgroup data-toc-label="&lt;select&gt;, &lt;option&gt;, &lt;optgroup&gt;" }

```html
<label for="city">City</label>
<select id="city" name="city">
  <option value="">Choose a city</option>
  <optgroup label="India">
    <option value="blr" selected>Bengaluru</option>
    <option value="mum">Mumbai</option>
  </optgroup>
  <optgroup label="Germany">
    <option value="ber">Berlin</option>
    <option value="muc" disabled>Munich (soon)</option>
  </optgroup>
</select>

<label for="skills">Skills (multi-select)</label>
<select id="skills" name="skills" multiple size="4">
  <option>HTML</option><option>CSS</option><option>JS</option><option>A11y</option>
</select>
```

<div class="demo">
<label for="city-demo">City</label>
<select id="city-demo" name="city">
  <option value="">Choose a city</option>
  <optgroup label="India">
    <option value="blr" selected>Bengaluru</option>
    <option value="mum">Mumbai</option>
  </optgroup>
  <optgroup label="Germany">
    <option value="ber">Berlin</option>
    <option value="muc" disabled>Munich (soon)</option>
  </optgroup>
</select>
&nbsp;
<label for="skills-demo">Skills</label>
<select id="skills-demo" name="skills" multiple size="4" style="vertical-align:top">
  <option>HTML</option><option>CSS</option><option>JS</option><option>A11y</option>
</select>
</div>

!!! tip "New: customizable `<select>` · 🟠 Advanced"
    Chromium 135+ supports fully styleable selects with `select, ::picker(select) { appearance: base-select; }`, including rich HTML inside `<option>`. Other browsers ignore it and show the normal select, so it's safe progressive enhancement.

## `<datalist>` <span class="lvl lvl-2">Intermediate</span> { #datalist data-toc-label="&lt;datalist&gt;" }

**Use:** suggestions for a text input. Unlike `<select>`, users can still type anything.

```html
<label for="browser">Browser</label>
<input id="browser" list="browsers">
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
</datalist>
```

<div class="demo">
<label for="browser-demo">Browser</label>
<input id="browser-demo" list="browsers-demo" placeholder="Start typing…">
<datalist id="browsers-demo">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
</datalist>
</div>

## `<textarea>` <span class="lvl lvl-1">Beginner</span> { #textarea data-toc-label="&lt;textarea&gt;" }

```html
<label for="msg">Message</label>
<textarea id="msg" name="msg" rows="4" cols="40" maxlength="500"></textarea>
```

<div class="demo">
<label for="msg-demo">Message</label><br>
<textarea id="msg-demo" rows="4" cols="40" maxlength="500" style="max-width:100%;field-sizing:content;min-height:4lh"></textarea>
</div>

The demo uses `field-sizing: content` (Chromium 123+): the textarea grows as you type, with no JavaScript.

## `<fieldset>` and `<legend>` <span class="lvl lvl-1">Beginner</span> { #fieldset-and-legend data-toc-label="&lt;fieldset&gt; and &lt;legend&gt;" }

**Use:** group related controls with a caption. Required for radio groups so screen readers announce the question ("Size, radio group"). `<fieldset disabled>` disables everything inside.

```html
<fieldset>
  <legend>Shipping address</legend>
  <label>Street <input name="street"></label>
  <label>City <input name="city"></label>
</fieldset>
```

<div class="demo">
<fieldset>
  <legend>Shipping address</legend>
  <label>Street <input name="street"></label>
  <label>City <input name="city"></label>
</fieldset>
</div>

## `<output>` <span class="lvl lvl-2">Intermediate</span> { #output data-toc-label="&lt;output&gt;" }

**Use:** the result of a calculation or user action. Screen readers announce changes to it.

```html
<form oninput="total.value = Number(a.value) * Number(b.value)">
  <input name="a" type="number" value="4"> ×
  <input name="b" type="number" value="5"> =
  <output name="total" for="a b">20</output>
</form>
```

<div class="demo">
<form oninput="this.total.value = Number(this.a.value) * Number(this.b.value)">
  <input name="a" type="number" value="4" style="width:5em" aria-label="First number"> ×
  <input name="b" type="number" value="5" style="width:5em" aria-label="Second number"> =
  <output name="total" for="a b"><strong>20</strong></output>
</form>
</div>

## `<progress>` and `<meter>` <span class="lvl lvl-1">Beginner</span> { #progress-and-meter data-toc-label="&lt;progress&gt; and &lt;meter&gt;" }

- `<progress>`: how far a **task** has got. No `value` = indeterminate (spinning).
- `<meter>`: a **measurement** within a known range (disk usage, password strength). Turns yellow/red past `low`/`high`.

```html
<label>Upload <progress value="70" max="100">70%</progress></label>
<label>Loading <progress></progress></label>

<label>Disk <meter value="0.3" low="0.6" high="0.85" optimum="0.1">30%</meter></label>
<label>Disk <meter value="0.7" low="0.6" high="0.85" optimum="0.1">70%</meter></label>
<label>Disk <meter value="0.95" low="0.6" high="0.85" optimum="0.1">95%</meter></label>
```

<div class="demo">
<p><label>Upload <progress value="70" max="100">70%</progress></label> &nbsp; <label>Loading <progress></progress></label></p>
<p style="margin:0">
<label>Disk <meter value="0.3" low="0.6" high="0.85" optimum="0.1">30%</meter></label> &nbsp;
<label>Disk <meter value="0.7" low="0.6" high="0.85" optimum="0.1">70%</meter></label> &nbsp;
<label>Disk <meter value="0.95" low="0.6" high="0.85" optimum="0.1">95%</meter></label>
</p>
</div>

!!! tip "Senior note · 🔴 Expert"
    **Form UX checklist for design reviews:** one column; labels above inputs; mark *optional* fields rather than required ones when most are required; inline errors linked with `aria-describedby`; error summary at the top on submit, with focus moved to it; never clear user input on error; `autocomplete` on every personal-data field; minimum 24×24 CSS px targets (WCAG 2.5.8); don't disable the submit button (explain what's wrong instead).
