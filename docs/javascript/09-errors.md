# 9. Errors, Debugging & Good Habits

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

Every developer writes bugs every day. What makes you fast is **reading the error**, **finding the line**, and **checking
your assumptions** with the console and DevTools. This lesson also covers modules (splitting code into files) and the habits
that keep code readable.

## Reading an error message

```js
--8<-- "docs/javascript/examples/09-errors.js:reading-errors"
```

```text title="Console output"
--8<-- "javascript/outputs/09-errors/reading-errors.txt"
```

In the browser, an uncaught error looks like this:

```text
Uncaught TypeError: Cannot read properties of undefined (reading 'items')
    at app.js:3:18
```

| Part | Meaning |
|---|---|
| `Uncaught` | Nothing caught it with `try`/`catch`, so the script **stopped**. Nothing after this line ran. |
| `TypeError` | The **kind** of error (see the table below). |
| `Cannot read properties of undefined (reading 'items')` | What went wrong: you wrote `something.items`, and `something` was `undefined`. |
| `app.js:3:18` | **Where**: file, line 3, column 18. Click it in DevTools to jump to the exact spot. |

**Read the message, then go to the line.** Most bugs are explained right there.

## The errors you'll see most

```js
--8<-- "docs/javascript/examples/09-errors.js:common-errors"
```

```text title="Console output"
--8<-- "javascript/outputs/09-errors/common-errors.txt"
```

| Error | Usual cause | Fix |
|---|---|---|
| `ReferenceError: totl is not defined` | A typo, or a variable used outside its scope | Check the spelling and where it was declared |
| `TypeError: Assignment to constant variable` | Reassigning a `const` | Use `let` if it really changes |
| `TypeError: Cannot read properties of null` | `querySelector` found nothing, or data was missing | Check the selector; use `?.` for optional data |
| `TypeError: … is not a function` | A typo in a method name (case matters), or the value isn't what you think | `console.log` the value and its `typeof` |
| `SyntaxError: … in JSON` | Invalid JSON (single quotes, trailing commas, an HTML error page instead of JSON) | Check `response.ok` and the raw text |

## Throwing your own errors

```js
--8<-- "docs/javascript/examples/09-errors.js:throw"
```

```text title="Console output"
--8<-- "javascript/outputs/09-errors/throw.txt"
```

| Code | What it does |
|---|---|
| `Number.isInteger(qty)` | `true` only for whole numbers. |
| `throw new RangeError(…)` | Stops the function and hands the error to the nearest `catch`. `RangeError` (value out of range) and `TypeError` (wrong type) are good built-in choices; `Error` for everything else. |
| `try { … } catch (err) { … }` | Catches it, so the loop carries on with the next value. |

Throw early with a clear message ("Quantity must be a whole number ≥ 0, got -1") instead of letting bad data cause a confusing
error three functions later.

## Console tricks

```js
--8<-- "docs/javascript/examples/09-errors.js:console"
```

```text title="Console output"
--8<-- "javascript/outputs/09-errors/console.txt"
```

In the browser, `warn` shows yellow, `error` shows red with a stack trace, and the console's filter buttons show one level at a
time. `console.log({ product })` prints the **name** of the variable along with its value. Also handy: `console.table(array)`
draws an array of objects as a table.

## Debugging in DevTools (step by step)

`console.log` is fine for quick checks. For anything harder, **pause the code** and look around:

1. Open DevTools (++f12++) → **Sources** (Chrome/Edge) or **Debugger** (Firefox).
2. Open your `.js` file (++ctrl+p++ / ++cmd+p++ and type its name).
3. Click a **line number** to set a **breakpoint** (a blue marker).
4. Do the thing that runs that code (click ADD). The page **freezes** on that line.
5. Hover over any variable to see its value, or read them all in the **Scope** panel.
6. Step through: ++f10++ next line · ++f11++ into a function · ++f8++ continue.
7. Add `debugger;` to your code to pause there whenever DevTools is open.

Other DevTools panels you'll use daily: **Elements** (see and edit the live DOM and CSS), **Network** (every request, its
status and its response: the first place to look when `fetch` fails), **Application** (localStorage, cookies).

## Modules: splitting code into files

Once a script grows past a couple of hundred lines, split it. **Modules** let each file `export` what others may use and
`import` what it needs.

```js title="js/money.js"
export const FREE_DELIVERY_FROM = 19900;

export function formatPaise(paise) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100);
}
```

```js title="js/cart.js"
import { formatPaise, FREE_DELIVERY_FROM } from "./money.js";

const cart = new Map();

export function addToCart(id, pricePaise) {
  const line = cart.get(id) ?? { qty: 0, pricePaise };
  cart.set(id, { ...line, qty: line.qty + 1 });
}

export function total() {
  let paise = 0;
  for (const line of cart.values()) paise += line.qty * line.pricePaise;
  return formatPaise(paise);
}
```

```html title="index.html"
<script type="module" src="js/app.js"></script>
```

```js title="js/app.js"
import { addToCart, total } from "./cart.js";

addToCart("apple", 18900);
console.log(total());   // ₹189.00
```

| Code | What it does |
|---|---|
| `export function …` / `export const …` | Makes it available to other files. Anything **not** exported stays private to the file (like `cart` above). |
| `import { a, b } from "./money.js";` | Brings in named exports. The path is relative and needs the `.js` extension in the browser. |
| `<script type="module">` | Required for `import`/`export` in the browser. Modules are deferred automatically and run in strict mode. |

Like `fetch`, modules don't load from `file://`: use Live Server or `python3 -m http.server`. Angular, React and Vite projects
use exactly this syntax; the build tool bundles the files for you.

## Habits that make code easy to read

```js
--8<-- "docs/javascript/examples/09-errors.js:habits"
```

```text title="Console output"
--8<-- "javascript/outputs/09-errors/habits.txt"
```

Both functions give the same answers, but `canCheckout2` is far easier to read and change. The checklist:

- [ ] `const` by default, `let` when it changes, never `var`.
- [ ] `===`, never `==`.
- [ ] Names say what the value **is**: `cartTotalPaise`, `isLoggedIn`, `renderProduct()`.
- [ ] Small functions that do one thing; return early instead of nesting.
- [ ] Keep data (state) separate from the DOM; change the state, then render.
- [ ] Use `textContent` for data, never `innerHTML`.
- [ ] Handle the failure path of every `await`.
- [ ] Use a formatter (Prettier) and a linter (ESLint) so style is never a discussion.

## What to learn next

| Next step | Where |
|---|---|
| Build a real feature with everything from this tab | [E-commerce lesson 6: Cart drawer](../ecommerce/06-cart.md) |
| Practise interview-style problems | [Coding Interview](../coding-interview/index.md): debounce, `Promise.all`, deep clone, infinite scroll |
| Accessibility in JavaScript widgets | [Accessibility](../career/accessibility.md) |
| TypeScript | Types on top of JavaScript; required for Angular and common with React |
| A framework | Angular, React or Vue: components, state and rendering done for you, built on exactly these basics |

## Try it

1. Open the [store demo](../ecommerce/demos/store.html){ target=_blank }, set a breakpoint inside `setQty` in `store.js`, click
   ADD and step through `render()`. Watch `count` and `subtotal` change in the Scope panel.
2. Break something on purpose (misspell a variable), read the error, click the file link, and fix it.
3. Split lesson 5's cart-bill example into `money.js`, `cart.js` and `app.js` modules.

### Solutions

Try each exercise yourself first, then open its solution to compare.

??? success "1. Step through the store with a breakpoint"
    What you should see, in order:

    1. Click **ADD** on Shimla Apple: the page freezes on your breakpoint in `setQty`. The **Scope** panel shows `card` (the
       `<article>`), and `qty` = 1.
    2. ++f10++ over the `const { id, name, price } = card.dataset;` line: `id` = `"apple"`, `name` = `"Shimla Apple"`, and
       `price` = `"18900"`, a **string** (data attributes always are).
    3. Step into `render()` with ++f11++. In the `for…of` loop, watch `count` go 0 → 1 and `subtotal` 0 → 18900.
    4. ++f8++ to continue: the card shows the − 1 + stepper and the badge shows 1.

??? success "2. Read and fix an error"
    For example, change `cart.set(id, …)` to `crat.set(id, …)` in `store.js` and click ADD. Chrome's console shows (captured
    from a real run; the file paths are shortened):

    ```text
    Uncaught ReferenceError: crat is not defined
        at setQty (store.js:25:7)
        at <anonymous> (store.js:40:48)
    ```

    The **first** line names the problem: a variable that doesn't exist. The `at …` lines are the **stack trace**, newest call first:
    the error happened inside `setQty`, which was called from the anonymous click listener on line 40. Click the `store.js` link to jump
    to the code (Chrome points at the start of the `if`/`else` statement that contains the typo), fix it, and reload.

??? success "3. Split the cart bill into modules"
    Three files, each with one job. `money.js` knows about paise and currencies:

    ```js title="money.js"
    --8<-- "docs/javascript/solutions/09-modules/money.js"
    ```

    `cart.js` builds the bill and imports only what it needs:

    ```js title="cart.js"
    --8<-- "docs/javascript/solutions/09-modules/cart.js"
    ```

    `app.js` is the entry point that wires them together:

    ```js title="app.js"
    --8<-- "docs/javascript/solutions/09-modules/app.js"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/09-modules.txt"
    ```

    Exactly the same bill as lesson 5, but now `rupees()` and `deliveryFee()` can be reused by any other file, and `cart.js` can be
    tested without a page. This output comes from running `node app.js` (Node 22 understands `import`/`export` directly).

## Common mistakes

* Ignoring the red error and changing random things. Read the message and go to the line first.
* Leaving `console.log` and `debugger` lines in finished code.
* Catching errors and doing nothing (`catch (err) {}`): the bug is still there, now silent.
* Forgetting `type="module"`, then getting `Cannot use import statement outside a module`.
