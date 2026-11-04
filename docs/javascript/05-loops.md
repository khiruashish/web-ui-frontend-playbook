# 5. Loops & Array Methods

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

A **loop** repeats code: for every product, for every cart item, until stock runs out. Modern JavaScript mostly uses
`for…of` and **array methods** (`map`, `filter`, `reduce`) instead of counting by hand.

## The classic `for` loop

```js
--8<-- "docs/javascript/examples/05-loops.js:for"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/for.txt"
```

| Part | What it does |
|---|---|
| `let i = 1;` | Runs once, before the loop starts: create a counter. |
| `i <= 3;` | Checked **before** every round. When it's false, the loop ends. |
| `i++` | Runs **after** every round: add 1 to the counter. |
| `{ … }` | The body: runs once per round. |

Use it when you need a counter. To go through an array, prefer `for…of`.

## `for…of`: each value in a list

```js
--8<-- "docs/javascript/examples/05-loops.js:for-of"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/for-of.txt"
```

| Code | What it does |
|---|---|
| `for (const item of basket)` | Each round, `item` is the next value. No index maths, no off-by-one errors. |
| `basket.entries()` + `[index, item]` | When you also need the position. |
| `Object.entries(stock)` | Turns an object into `[key, value]` pairs so you can loop over it. |

!!! warning "`for…in` is different"
    `for (const key in obj)` loops over an object's **keys**, and on an array it gives you the indexes as **strings**. Use
    `for…of` for arrays and `Object.entries()` for objects.

## `while`, `break` and `continue`

```js
--8<-- "docs/javascript/examples/05-loops.js:while"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/while.txt"
```

| Code | What it does |
|---|---|
| `while (stockLeft >= 2) { … }` | Repeats as long as the condition is true. Make sure something in the body eventually makes it false, or the page freezes. |
| `continue` | Skip the rest of **this** round and go to the next one. |
| `break` | Leave the loop completely. |

## Array methods: say *what*, not *how*

These take a **callback** (lesson 3) and call it once for every item.

```js
--8<-- "docs/javascript/examples/05-loops.js:methods"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/methods.txt"
```

| Method | Returns | Use it to… |
|---|---|---|
| `.map((p) => p.name)` | A **new array**, same length | Turn every item into something else (objects → names, data → `<li>` elements). |
| `.filter((p) => p.category === "dairy")` | A **new array**, maybe shorter | Keep only the items that pass a test. |
| `.find((p) => p.pricePaise < 5000)` | **One item**, or `undefined` | Get the first match. (`.findIndex` gives its position.) |
| `.some(…)` / `.every(…)` | `true` / `false` | "Is there at least one…?" / "Are all of them…?" |
| `.reduce((sum, p) => sum + p.pricePaise, 0)` | **One value** | Add up or combine everything. `sum` starts at `0` and carries the running result. |
| chained `.filter().toSorted().map()` | | Each method returns a new array, so you can line them up like a pipeline. Read it top to bottom. |

`map`, `filter`, `find`, `some`, `every` and `reduce` never change the original array.

### How `reduce` works, step by step

| Round | `sum` (before) | `p.pricePaise` | returns |
|---|---|---|---|
| 1 | 0 (the start value) | 18900 | 18900 |
| 2 | 18900 | 4900 | 23800 |
| 3 | 23800 | 3200 | 27000 |
| 4 | 27000 | 6800 | 33800 |
| 5 | 33800 | 8400 | **42200** |

## Sorting

```js
--8<-- "docs/javascript/examples/05-loops.js:sort"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/sort.txt"
```

| Code | What it does |
|---|---|
| `.sort()` with no function | Compares items **as text**, so `"18900"` comes before `"3200"` (because "1" < "3"). Always pass a compare function for numbers. |
| `(a, b) => a - b` | A negative result puts `a` first. Low → high. Swap to `b - a` for high → low. |
| `.sort()` vs `.toSorted()` | `sort()` **changes** the original array. `toSorted()` returns a sorted **copy**. Prefer `toSorted()`, or `[...arr].sort()`. |
| `a.localeCompare(b)` | Correct alphabetical order for words, ignoring case and handling accents. |

## Grouping

```js
--8<-- "docs/javascript/examples/05-loops.js:group"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/group.txt"
```

`Object.groupBy(items, callback)` puts items into buckets by whatever the callback returns: perfect for "products by
category" sections. (Supported in all current browsers since 2024.)

## Putting it together: a cart bill

```js
--8<-- "docs/javascript/examples/05-loops.js:cart-total"
```

```text title="Console output"
--8<-- "javascript/outputs/05-loops/cart-total.txt"
```

| Code | What it does |
|---|---|
| `new Map([[id, product], …])` | A catalogue to look products up by id. |
| `cart.map(({ id, qty }) => { … })` | For each cart line: destructure, look up the product, return a line with its total. |
| `lines.reduce((sum, line) => sum + line.linePaise, 0)` | Add all the line totals. |
| `subtotal >= 19900 ? 0 : 2500` | Free delivery from ₹199. |
| `` `${line.name.padEnd(18)} …` `` | `padEnd` lines up the columns. |

This is the same logic as the FreshCart cart drawer in [E-commerce lesson 6](../ecommerce/06-cart.md).

## Try it

1. From the `products` array, make an array of strings like `"Shimla Apple: ₹189"` with `map`.
2. Count how many products are deals with `filter(...).length`, then do it again with `reduce`.
3. Sort the products by name, A to Z, without changing the original array.
4. Find the most expensive product with `reduce` (hint: keep the bigger of `best` and `p` each round).

## Common mistakes

* `.sort()` on numbers without a compare function.
* Using `map` just to loop (ignoring the array it returns). Use `for…of` or `forEach` for side effects.
* Forgetting the start value in `reduce` (`0`): on an empty array it throws an error.
* Changing the array while looping over it. Build a new one with `filter` instead.
