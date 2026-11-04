# 3. Functions

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

A **function** is a named, reusable piece of code. You write it once ("how to work out a line total") and use it wherever you
need it. Every click handler, every calculation and every API call in a web app is a function.

## Declaring and calling a function

```js
--8<-- "docs/javascript/examples/03-functions.js:declaration"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/declaration.txt"
```

| Code | What it does |
|---|---|
| `function lineTotal(pricePaise, qty) { … }` | **Defines** a function called `lineTotal`. `pricePaise` and `qty` are **parameters**: placeholders for the values it will receive. Nothing runs yet. |
| `return pricePaise * qty;` | Sends the result back to whoever called the function. |
| `lineTotal(18900, 2)` | **Calls** the function. `18900` and `2` are the **arguments**: they fill the parameters in order. The call becomes the returned value, `37800`. |

## Three ways to write a function

```js
--8<-- "docs/javascript/examples/03-functions.js:arrow"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/arrow.txt"
```

| Form | When to use it |
|---|---|
| `function addGst1(paise) { … }` | A **declaration**. Good for the main, named functions of a file. |
| `const addGst2 = function (paise) { … };` | A function **expression** stored in a variable. You'll see it in older code. |
| `const addGst3 = (paise) => Math.round(paise * 1.05);` | An **arrow function**. Short, and the standard choice for callbacks (`list.map((p) => p.name)`). With no `{ }`, the single expression is returned automatically. |

With `{ }`, an arrow function needs an explicit `return`: `(paise) => { return paise * 2; }`.

## Default and rest parameters

```js
--8<-- "docs/javascript/examples/03-functions.js:defaults-rest"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/defaults-rest.txt"
```

| Code | What it does |
|---|---|
| `function greet(name = "guest")` | If the caller passes nothing (or `undefined`), `name` is `"guest"`. |
| `function sum(...prices)` | `...` collects **all** the arguments into an array called `prices`, however many there are. |
| `sum()` → `0` | No arguments: an empty array, so the loop never runs and the total stays 0. |

## `return` ends the function

```js
--8<-- "docs/javascript/examples/03-functions.js:return"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/return.txt"
```

As soon as a `return` runs, the function stops; nothing after it in that call runs. Writing the special cases first and
returning early (the "guard clause" pattern) keeps functions flat and readable. A function with no `return` gives back
`undefined`.

## Scope: where a variable can be seen

```js
--8<-- "docs/javascript/examples/03-functions.js:scope"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/scope.txt"
```

| Code | What it does |
|---|---|
| `const storeName` (outside everything) | **Global** scope: visible to all the code below it. |
| `const message` (inside the function) | **Function** scope: exists only while the function runs, and only inside it. |
| `const insideBlock` (inside `if { }`) | **Block** scope: `const` and `let` live only inside the nearest `{ }`. |
| `typeof insideBlock` → `undefined` | Outside its block, the name doesn't exist. (`typeof` is the one safe way to ask about a name that doesn't exist.) |
| `console.log(message)` → `ReferenceError` | Using a name that isn't visible here is an error, and the script stops. |

Keep variables in the **smallest** scope that works. Fewer globals means fewer accidental clashes.

## Callbacks: passing a function to a function

```js
--8<-- "docs/javascript/examples/03-functions.js:callback"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/callback.txt"
```

| Code | What it does |
|---|---|
| `function repeat(times, action)` | `action` is a parameter that will hold a **function**. |
| `action(i);` | Calls whatever function was passed in. |
| `repeat(3, (n) => console.log(…))` | We pass an arrow function as the second argument. This is a **callback**: "call this back when it's time". |
| `setTimeout(() => …, 100)` | The browser calls our function back after 100 ms. Meanwhile, the next line runs straight away, which is why "This prints first" really does print first. |

Callbacks are everywhere: `addEventListener("click", callback)`, `array.map(callback)`, `setTimeout(callback, ms)`.

## Closures: functions that remember

```js
--8<-- "docs/javascript/examples/03-functions.js:closure"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/closure.txt"
```

| Code | What it does |
|---|---|
| `let count = 0;` inside `makeCounter` | A variable that only the code inside `makeCounter` can see. |
| `return () => { count++; return count; };` | Returns a new function. That inner function **keeps access** to `count` even after `makeCounter` has finished. This is a **closure**. |
| `nextOrderNumber()` ×3 → 1, 2, 3 | Each call updates the same remembered `count`. |
| `const otherCounter = makeCounter();` → 1 | Every call to `makeCounter` creates a **fresh**, separate `count`. |

Closures give you private state without classes. Event handlers use them constantly: a click handler created inside a loop
remembers which product it belongs to.

## Pure functions

```js
--8<-- "docs/javascript/examples/03-functions.js:pure"
```

```text title="Console output"
--8<-- "javascript/outputs/03-functions/pure.txt"
```

A **pure** function only uses its inputs and only gives back a result: same inputs, same output, every time. Pure functions
are easy to test and reuse. Write your calculations (totals, discounts, delivery fees) as pure functions, and keep the
"impure" parts (changing the page, saving data) separate.

## Try it

1. Write `formatRupees(paise)` that returns `"₹189.00"` for `18900`, using `Intl.NumberFormat`. Test it with three values.
2. Write `deliveryFee(subtotalPaise)` as an arrow function with a ternary: free from ₹199, otherwise ₹25.
3. Write `makeCart()` that returns `{ add(paise), total() }`, keeping the running total private in a closure.

### Solutions

Try each exercise yourself first, then open its solution to compare.

??? success "1. formatRupees"
    ```js
    --8<-- "docs/javascript/solutions/03-functions.js:ex1"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/03-functions/ex1.txt"
    ```

    The formatter is created **once**, outside the function: building an `Intl.NumberFormat` is slower than using one.

??? success "2. deliveryFee as an arrow function"
    ```js
    --8<-- "docs/javascript/solutions/03-functions.js:ex2"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/03-functions/ex2.txt"
    ```

    Exactly ₹199 (`19900`) is free, because the test is `>=`. Always check the boundary value.

??? success "3. makeCart with a private total"
    ```js
    --8<-- "docs/javascript/solutions/03-functions.js:ex3"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/03-functions/ex3.txt"
    ```

    `add` and `total` are **closures** over `totalPaise`. The only way to change the total is through `add()`, so nothing else in
    the program can set it to a wrong value by accident.

## Common mistakes

* Forgetting `return`, then wondering why the result is `undefined`.
* Writing `button.addEventListener("click", handleClick())`: the `()` **calls** it immediately. Pass the function itself:
  `handleClick`.
* An arrow function with `{ }` but no `return`: `(p) => { p.name }` returns `undefined`. Remove the braces or add `return`.
* Huge functions that do five things. If you can't name it clearly, split it.
