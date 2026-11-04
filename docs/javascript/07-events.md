# 7. Events: Reacting to Users

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

An **event** is something that happens on the page: a click, a key press, typing, a form being submitted, the page being
scrolled. You tell the browser "when **this** happens to **that** element, run **this** function". That's
`addEventListener`.

```js
element.addEventListener("click", (event) => {
  // runs every time element is clicked
});
```

## What you see

<iframe src="../demos/07-events.html" title="Events: live demo" style="width:100%;height:640px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Try all four. Open it full-size: [07-events.html](demos/07-events.html){ target=_blank }.

## 1. Click: a quantity counter

```html
--8<-- "docs/javascript/demos/07-events.html:counter-html"
```

```js
--8<-- "docs/javascript/demos/07-events.html:counter"
```

| Code | What it does |
|---|---|
| `let qty = 0;` | The **state**: the one true quantity. |
| `function setQty(newQty)` | The only place that changes the state, and it always updates the screen too. |
| `Math.max(0, newQty)` | The bigger of 0 and the new value, so it can never go negative. |
| `qtyOutput.textContent = qty;` | Show the new number. |
| `addEventListener("click", () => setQty(qty + 1))` | On each click, call `setQty` with one more. Note we pass a **function** (`() => …`), not the result of calling one. |

`click` also fires when a keyboard user presses ++enter++ or ++space++ on a `<button>`. That's one reason to always use real
buttons.

## 2. Input: live search

```html
--8<-- "docs/javascript/demos/07-events.html:search-html"
```

```js
--8<-- "docs/javascript/demos/07-events.html:search"
```

| Code | What it does |
|---|---|
| `"input"` | Fires on **every change** to the field: typing, pasting, deleting, the × clear button. (`"change"` only fires when you leave the field.) |
| `(event) => { … }` | The browser passes an **event object** describing what happened. |
| `event.target.value` | `target` is the element the event happened on; `.value` is the text in it (always a string). |
| `.trim().toLowerCase()` | Ignore extra spaces and capital letters, so "BA " still matches "Banana". |
| `li.hidden = !….includes(text)` | Hide items that don't contain the search text. |

!!! bug "A bug the automated test caught"
    The first version of this demo didn't hide anything. The CSS rule `li { display: flex }` **overrides** the `hidden`
    attribute, because `hidden` only works through the browser's own `display: none`. The fix is one line of CSS that every
    project should have:

    ```css
    [hidden] { display: none !important; }
    ```

## 3. Submit: validating a form

```html
--8<-- "docs/javascript/demos/07-events.html:form-html"
```

```js
--8<-- "docs/javascript/demos/07-events.html:form"
```

| Code | What it does |
|---|---|
| `<form id="pincode-form" novalidate>` | `novalidate` turns off the browser's own error bubbles so we can show our own message. |
| `inputmode="numeric"` | Shows a number keypad on phones. |
| `aria-describedby="pincode-msg"` | Screen readers read the error message along with the input. |
| `form.addEventListener("submit", …)` | Listen on the **form**, not the button: `submit` fires for a button click **and** for ++enter++ in a field. |
| `event.preventDefault();` | Stops the browser's default action: sending the form and **reloading the page**. Without it, your JavaScript's work is wiped out. |
| `form.elements.pincode` | Inputs by their `name`. |
| `/^\d{6}$/.test(value)` | A **regular expression**: `^` start, `\d{6}` exactly six digits, `$` end. `.test()` gives `true`/`false`. |
| `setAttribute("aria-invalid", …)` | Tells assistive tech the field is invalid; the CSS colours the border red from the same attribute. |
| `message.textContent = valid ? … : …;` | A ternary picks the success or error text. The `<p aria-live="polite">` announces it. |
| `if (!valid) pincode.focus();` | Put the cursor back in the field so the user can fix it straight away. |

## 4. Event delegation: one listener, many buttons

```html
--8<-- "docs/javascript/demos/07-events.html:list-html"
```

```js
--8<-- "docs/javascript/demos/07-events.html:delegation"
```

| Code | What it does |
|---|---|
| `cart.addEventListener("click", …)` | **One** listener on the list, not one per button. |
| How it works | A click on a button **bubbles up**: it fires on the button, then its `<li>`, then the `<ul>`, then `body`… So the list hears every click inside it. |
| `event.target.closest("[data-remove]")` | `target` is what was actually clicked (maybe text inside the button). `closest` walks up to the nearest matching ancestor, or gives `null`. |
| `if (!button) return;` | The click wasn't on a Remove button: ignore it. |
| `button.closest("li").remove();` | Remove the row that contains the button. |

Delegation is faster for long lists and **keeps working for items added later**, because the listener is on the parent.
FreshCart's product grid uses exactly this.

## Bonus: keyboard

```js
--8<-- "docs/javascript/demos/07-events.html:keyboard"
```

| Code | What it does |
|---|---|
| `document.addEventListener("keydown", …)` | Listen for key presses anywhere on the page. |
| `event.key === "Escape"` | `event.key` is the key's name: `"Enter"`, `"Escape"`, `"ArrowDown"`, `"a"`… |
| `document.activeElement === search` | Only when the search box has focus. |
| `search.dispatchEvent(new Event("input"))` | Fires an `input` event by code, so the search listener runs and shows every item again. |

## Common events

| Event | Fires when |
|---|---|
| `click` | Clicked, tapped, or ++enter++/++space++ on a button |
| `input` | The value of an input, select or textarea changes |
| `change` | The value is committed (leaving a text field, ticking a checkbox, choosing an option) |
| `submit` | A form is submitted (on the `<form>`) |
| `keydown` | A key is pressed |
| `focus` / `blur` | An element gains / loses focus (`focusin`/`focusout` bubble) |
| `scroll`, `resize` | The page scrolls / the window changes size (throttle these: [Coding Interview #9](../coding-interview/09-debounce-throttle.md)) |
| `DOMContentLoaded` | The HTML has been parsed (not needed with `defer`) |

## Try it

1. Make the counter's − button `disabled` when the quantity is 0.
2. Show "No results" under the search list when every item is hidden.
3. Add an "Add item" form that appends a new `<li>` with a Remove button to the cart list. Check that Remove works on the new
   items without adding any listener (delegation!).

### Solutions

Try each exercise yourself first, then open its solution to compare.

All three solutions together, live:

<iframe src="../demos/07-events-solved.html" title="Events exercises solved: live demo" style="width:100%;height:700px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

??? success "1. Disable − at zero"
    ```js
    --8<-- "docs/javascript/demos/07-events-solved.html:sol1"
    ```

    Updating `disabled` inside `setQty` means it can't get out of sync, and calling `setQty(0)` once at the start sets the initial
    state from the same code.

??? success "2. “No results”"
    ```html
    --8<-- "docs/javascript/demos/07-events-solved.html:sol2-html"
    ```

    At the end of the `input` listener:

    ```js
    --8<-- "docs/javascript/demos/07-events-solved.html:sol2"
    ```

??? success "3. An “Add item” form"
    ```html
    --8<-- "docs/javascript/demos/07-events-solved.html:sol3-html"
    ```

    ```js
    --8<-- "docs/javascript/demos/07-events-solved.html:sol3"
    ```

    New rows' Remove buttons work with **no new listener**, because the click bubbles up to the list's delegated listener.

    !!! bug "Another bug the tests caught: don't name an input `item`"
        The first version used `name="item"`, and `form.elements.item.value` crashed with
        `Cannot read properties of undefined (reading 'trim')`. `form.elements` already has a built-in **method** called `item()`,
        and it wins over an input with that name. The same goes for names like `length`, `submit` or `action` on forms. Choose
        specific names such as `itemName`.

## Common mistakes

* `addEventListener("click", doThing())`: calls `doThing` **now** and passes its result. Pass `doThing` (no brackets).
* Forgetting `event.preventDefault()` on a form submit, so the page reloads and everything resets.
* Listening for `click` on the submit button instead of `submit` on the form, so ++enter++ doesn't work.
* Adding a listener to every row of a long list (and forgetting rows added later). Use delegation.
* Making clickable `<div>`s: no keyboard, no focus. Use `<button>`.
