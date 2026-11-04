# 8. Async: Timers, Promises & fetch

<span class="lvl lvl-2">Intermediate</span>

Some things take time: loading products from a server, waiting for payment, a timer. JavaScript **doesn't stop and wait**;
it carries on and runs your code **later**, when the result is ready. This is called **asynchronous** code.

## JavaScript doesn't wait

```js
--8<-- "docs/javascript/examples/08-async.js:timeline"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/timeline.txt"
```

| Code | What it does |
|---|---|
| `setTimeout(fn, 200)` | "Call `fn` in about 200 ms." It schedules and returns **immediately**. |
| The printed order | 1, then 0 (the next line runs at once), then 2 after 100 ms, then 3 after 200 ms. The order you **write** isn't the order things **happen**. |

The browser has a single main thread. If JavaScript waited for every network request, the page would freeze. Instead, slow
work happens in the background and your function is queued to run when it's done.

## Promises

```js
--8<-- "docs/javascript/examples/08-async.js:promise"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/promise.txt"
```

| Code | What it does |
|---|---|
| `new Promise((resolve, reject) => { … })` | A **promise** is an object for a value that will arrive later. You get it straight away; the value comes later. |
| `resolve(value)` | "It worked, here's the result." The promise becomes **fulfilled**. |
| `reject(new Error(…))` | "It failed." The promise becomes **rejected**. |
| `.then((result) => …)` | Runs when it's fulfilled. |
| `.catch((err) => …)` | Runs when it's rejected. Always handle failures. |

You'll rarely write `new Promise` yourself. `fetch()` and most browser APIs **return** promises; your job is to use them.

## `async` / `await`: async code that reads top to bottom

```js
--8<-- "docs/javascript/examples/08-async.js:async-await"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/async-await.txt"
```

| Code | What it does |
|---|---|
| `async function placeOrder()` | Marks the function as asynchronous. It always returns a promise. |
| `await wait(50);` | Pauses **this function** until the promise settles, then continues. The rest of the page keeps working meanwhile. |
| `return 1042;` | The promise returned by `placeOrder()` resolves to `1042`. |
| `const orderId = await placeOrder();` | Wait for the result. `await` is allowed inside `async` functions, in `<script type="module">` and in the console. |

`async`/`await` is the same promises as `.then()`, written so it reads like normal step-by-step code.

## Handling errors: `try` / `catch` / `finally`

```js
--8<-- "docs/javascript/examples/08-async.js:try-catch"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/try-catch.txt"
```

| Code | What it does |
|---|---|
| `throw new Error("Price service is down")` | Inside an `async` function, `throw` rejects its promise. |
| `try { … }` | Run this code… |
| `catch (err) { … }` | …and if anything inside `try` throws (or an awaited promise rejects), jump here instead of crashing. `err.message` is the text. |
| `finally { … }` | Runs **either way**: the place to hide a loading spinner or re-enable a button. |

## Doing things at the same time

```js
--8<-- "docs/javascript/examples/08-async.js:parallel"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/parallel.txt"
```

| Code | What it does |
|---|---|
| `await a; await b;` | One after another: the second request doesn't **start** until the first has finished. 100 + 100 ms. |
| `await Promise.all([a, b])` | Both start immediately; wait until **all** are done. About 100 ms total. Results come back in the same order as the array. |

If one promise in `Promise.all` rejects, the whole thing rejects. Use `Promise.allSettled` when you want every result, even
failures. (Build both yourself in [Coding Interview #10](../coding-interview/10-promise-utils.md).)

## `fetch`: loading data from a server

```js
--8<-- "docs/javascript/examples/08-async.js:fetch-shape"
```

```text title="Console output"
--8<-- "javascript/outputs/08-async/fetch-shape.txt"
```

| Code | What it does |
|---|---|
| `const response = await fetch(url);` | Sends an HTTP request and waits for the **headers** of the response. |
| `if (!response.ok) throw …` | **Important:** `fetch` only rejects on network failure (offline, DNS). A 404 or 500 is still a "successful" response, so check `response.ok` (status 200–299) yourself. |
| `return response.json();` | Reads the body and parses it from JSON into objects. This is **also** a promise. |

### Live demo: loading, success and error states

<iframe src="../demos/08-fetch.html" title="fetch with loading and error states: live demo" style="width:100%;height:330px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

This demo really calls `fetch("products.json")`, a [file next to it](demos/products.json){ target=_blank }. Click both buttons.
Open it full-size: [08-fetch.html](demos/08-fetch.html){ target=_blank }.

```html
--8<-- "docs/javascript/demos/08-fetch.html:html"
```

```js
--8<-- "docs/javascript/demos/08-fetch.html:fetch"
```

| Code | What it does |
|---|---|
| `<script type="module">` | A **module** script: deferred automatically, strict mode, and allowed to use `import` and top-level `await`. |
| `<p id="status" role="status">` | A live region: screen readers announce "Loading…", "4 products loaded." and the error. |
| `function showLoading(isLoading)` | One function for the loading state: disables both buttons (no double-clicks), shows "Loading…" and clears old results. |
| `await wait(400);` | Fake slowness, only so you can see the loading state. Remove it in real code. |
| `const products = await loadProducts(url);` | Fetch and parse. If anything fails, we jump to `catch`. |
| `grid.replaceChildren(...products.map(…))` | Build one `<li>` per product (lesson 6) and swap them in. |
| `li.innerHTML = "<span></span>…"` then `textContent` | Fixed markup via `innerHTML`; the **data** goes in through `textContent` (safe from XSS). |
| `catch (err) { … }` | Show a friendly message. Never leave the user staring at "Loading…" forever. |
| `finally { showLoading(false); }` | Re-enable the buttons whether it worked or not. |

Every data-loading UI needs these **three states**: loading, success and error (and often a fourth: empty).

!!! note "Why not open this file by double-clicking?"
    Browsers block `fetch()` from pages opened as `file://`. Use VS Code's Live Server, or run `python3 -m http.server` in the
    folder and open `http://localhost:8000/08-fetch.html`.

## Try it

1. Add a "Retry" button to the error message that calls `show("products.json")` again.
2. Show "No products found" when the JSON is an empty array `[]`.
3. Load `products.json` **and** a second file (e.g. `offers.json`) at the same time with `Promise.all`.

## Common mistakes

* Forgetting `await`: you get a `Promise` object instead of the data (`console.log` shows `Promise {<pending>}`).
* Not checking `response.ok`, then trying to parse an HTML 404 page as JSON.
* No `try`/`catch` around `await`: one failed request breaks the whole feature, silently.
* Awaiting independent requests one by one when `Promise.all` could run them together.
* Using `await` inside `forEach` (it doesn't wait). Use `for…of` or `Promise.all(array.map(…))`.
