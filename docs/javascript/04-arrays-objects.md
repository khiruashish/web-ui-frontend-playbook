# 4. Arrays & Objects

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

Real data comes in groups: a **list** of products, a product with a **name, price and size**. Arrays hold lists; objects hold
named fields. Almost every API returns an **array of objects**.

## Arrays: ordered lists

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:arrays"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/arrays.txt"
```

| Code | What it does |
|---|---|
| `["Apple", "Banana", "Mango"]` | An array literal: values in `[ ]`, separated by commas. |
| `fruits[0]` | The first item. Positions (**indexes**) start at **0**, so the last is `fruits[fruits.length - 1]`. |
| `fruits.at(-1)` | Negative positions count from the end: the easy way to get the last item. |
| `fruits.push("Grapes")` | Adds to the end. (`unshift` adds to the start.) |
| `fruits.shift()` | Removes and returns the first item. (`pop` removes the last.) |
| `.includes(…)`, `.indexOf(…)` | "Is it there?" and "at which position?" (`-1` if not found). |
| `.join(" · ")` | Joins all items into one string with a separator. |

`const fruits` doesn't stop you changing the array's **contents**; it only stops you pointing `fruits` at a different array.

## Objects: named fields

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:objects"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/objects.txt"
```

| Code | What it does |
|---|---|
| `{ id: "apple", name: "Shimla Apple", … }` | An object literal: **key: value** pairs. Keys are names; values can be anything, including arrays and other objects. |
| `product.name` | Dot notation: read a property. |
| `product["pricePaise"]`, `product[key]` | Bracket notation: needed when the key is in a variable or has spaces/dashes. |
| `product.pricePaise = 17900;` | Change a property. |
| `product.rating = 4.6;` | Assigning to a key that doesn't exist **adds** it. |
| `delete product.tags;` | Removes a property. |
| `Object.keys(product)` | An array of the keys. (`Object.values` and `Object.entries` exist too.) |
| `"rating" in product` | Does the key exist? |

## An array of objects

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:array-of-objects"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/array-of-objects.txt"
```

`products[1].name` reads left to right: "the array → item at position 1 → its `name`". Lesson 5 shows how to loop over,
filter and total arrays like this one.

## Destructuring: unpack values into variables

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:destructuring"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/destructuring.txt"
```

| Code | What it does |
|---|---|
| `const { name, pricePaise } = item;` | Creates two variables from the properties with the **same names**. Same as `const name = item.name; const pricePaise = item.pricePaise;` |
| `{ size: packSize }` | Read `size`, but call the variable `packSize`. |
| `{ rating = "no rating" }` | A default when the property is missing. |
| `const [first, second] = [...]` | Arrays destructure **by position**. |
| `function describe({ name, size })` | Destructure right in the parameter list: very common in frameworks. |

## Spread: copy and combine

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:spread"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/spread.txt"
```

| Code | What it does |
|---|---|
| `{ ...base, pricePaise: 7200 }` | Copies every property of `base` into a **new** object, then overrides `pricePaise`. The original stays unchanged. |
| `[...veg, ...fruit, "Bread"]` | Spreads both arrays' items into a new array. |

This "copy, don't change" style is how React, Angular signals and most state libraries expect you to update data.

## References: two names, one object

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:reference"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/reference.txt"
```

| Code | What it does |
|---|---|
| `const cartB = cartA;` | Does **not** copy. Both names point to the **same** array, so pushing through `cartB` changes what `cartA` sees. |
| `const cartC = [...cartA];` | A real copy (one level deep: objects **inside** it are still shared; use `structuredClone()` for a full copy). |
| `[1, 2] === [1, 2]` → `false` | `===` on objects asks "the same object?", not "the same contents?" |

## `Map` and `Set`

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:map-set"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/map-set.txt"
```

| Code | What it does |
|---|---|
| `new Map()` | A key → value store. Great for a cart: product id → quantity. |
| `.set(key, value)` / `.get(key)` / `.has(key)` / `.delete(key)` / `.size` | Add or replace, read, check, remove, count. |
| `for (const [id, qty] of cart)` | Loops over `[key, value]` pairs in the order they were added. |
| `new Set([...])` | A collection with **no duplicates**: the second `"fruit"` is ignored. |
| `[...tags]` | Turn a Set (or Map) into an array. |

Use a plain object for a fixed record (`product.name`); use a `Map` for a changing lookup table.

## JSON: data as text

```js
--8<-- "docs/javascript/examples/04-arrays-objects.js:json"
```

```text title="Console output"
--8<-- "javascript/outputs/04-arrays-objects/json.txt"
```

| Code | What it does |
|---|---|
| `JSON.stringify(order)` | Object → JSON **string**, ready to send to a server or save in `localStorage`. |
| `JSON.parse(text)` | JSON string → a new object you can use again. |
| `JSON.stringify(order, null, 2)` | Pretty-printed with 2-space indentation: handy for debugging. |

JSON looks like JavaScript but is stricter: keys and strings need **double quotes**, and there are no comments, functions or
`undefined`.

## Try it

1. Create an array of 3 product objects (name, pricePaise, category). Print the name of the second one and the category of
   the last one using `.at(-1)`.
2. Write `withPrice(product, newPaise)` that returns a **new** product object with the changed price, using spread. Check the
   original is unchanged.
3. Save a `Map` cart to a JSON string and load it back: `JSON.stringify([...cart])` and `new Map(JSON.parse(text))`.

### Solutions

Try each exercise yourself first, then open its solution to compare.

??? success "1. Second name, last category"
    ```js
    --8<-- "docs/javascript/solutions/04-arrays-objects.js:ex1"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/04-arrays-objects/ex1.txt"
    ```

??? success "2. withPrice with spread"
    ```js
    --8<-- "docs/javascript/solutions/04-arrays-objects.js:ex2"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/04-arrays-objects/ex2.txt"
    ```

    The original keeps ₹68 and the two are different objects. Code that receives a product can't be surprised by it changing later.

??? success "3. Map → JSON → Map"
    ```js
    --8<-- "docs/javascript/solutions/04-arrays-objects.js:ex3"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/04-arrays-objects/ex3.txt"
    ```

    `JSON.stringify(cart)` on the Map itself would give `"{}"`: Maps aren't plain objects. Spreading turns it into an array of
    `[key, value]` pairs, which JSON can hold, and `new Map(pairs)` turns it back. FreshCart uses exactly this to
    [keep the cart after a refresh](../ecommerce/06-cart.md#solutions).

## Common mistakes

* `fruits[3]` on a 3-item array: indexes start at 0, so it's `undefined`.
* Thinking `const b = a` copies an array or object. It doesn't.
* Changing an object you received as a parameter and accidentally changing the caller's data. Return a copy instead.
* Comparing objects with `===` to check if they have the same contents.
