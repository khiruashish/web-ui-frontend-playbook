# 2. Operators & Decisions

<span class="lvl lvl-1">Beginner</span>

Programs make decisions all the time: is delivery free? Is the item in stock? Is the user logged in? This lesson covers how to
compare values and choose what happens next.

## Comparing values

```js
--8<-- "docs/javascript/examples/02-conditions.js:comparison"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/comparison.txt"
```

| Operator | Means |
|---|---|
| `>` `<` `>=` `<=` | Greater than, less than, or equal |
| `===` | **Strictly equal**: same value **and** same type. `"5" === 5` is `false`. |
| `!==` | Strictly not equal |
| `==` / `!=` | Loose equality: converts types first (`"5" == 5` is `true`). Causes surprises; don't use it. |

## `if` / `else if` / `else`

```js
--8<-- "docs/javascript/examples/02-conditions.js:if-else"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/if-else.txt"
```

| Code | What it does |
|---|---|
| `if (cartTotal >= freeDeliveryFrom) { … }` | The code in `{ }` runs only if the condition in `( )` is true. |
| `else if (cartTotal > 0) { … }` | Checked only if the first condition was false. Add as many as you need. |
| `const missing = (…) / 100;` | A variable created inside `{ }` exists only inside those braces. |
| `else { … }` | Runs if none of the conditions above were true. |

JavaScript checks the conditions **top to bottom** and runs only the **first** block whose condition is true.

## AND, OR, NOT

```js
--8<-- "docs/javascript/examples/02-conditions.js:logical"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/logical.txt"
```

| Operator | Reads as | `true` when… |
|---|---|---|
| `a && b` | a **and** b | both are true |
| `a || b` | a **or** b | at least one is true |
| `!a` | **not** a | `a` is false |

## Truthy and falsy

`if` doesn't need a real `true` or `false`. Every value counts as one or the other:

```js
--8<-- "docs/javascript/examples/02-conditions.js:truthy"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/truthy.txt"
```

Only **six** values are falsy: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. Everything else is truthy,
including the string `"0"`, the string `"false"`, an empty array `[]` and an empty object `{}`.

That's why you can write `if (searchText) { … }` to mean "if the user typed something".

## Default values: `||` vs `??`

```js
--8<-- "docs/javascript/examples/02-conditions.js:defaults"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/defaults.txt"
```

| Code | What it does |
|---|---|
| `a || b` | "a, unless a is **falsy**, then b". Replaces `0` and `""` too, which is often wrong: `itemsPerPage: 0` became 20. |
| `a ?? b` | "a, unless a is `null` or `undefined`, then b". Keeps real `0` and `""`. **Use `??` for defaults.** |
| `settings.language ?? "en"` | `language` doesn't exist (`undefined`), so the default `"en"` is used. |

## Optional chaining `?.`

```js
--8<-- "docs/javascript/examples/02-conditions.js:optional-chaining"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/optional-chaining.txt"
```

| Code | What it does |
|---|---|
| `user.address?.city` | "If `address` is `null` or `undefined`, stop and give `undefined`; otherwise read `.city`." |
| `user.address?.city ?? "No city yet"` | `?.` and `??` together: the classic pattern for data that may be missing. |
| `user.address.city` | Without `?.`, reading a property of `null` crashes the whole script. This is the most common error in frontend code. |

## The ternary: `if`/`else` in one expression

```js
--8<-- "docs/javascript/examples/02-conditions.js:ternary"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/ternary.txt"
```

`condition ? valueIfTrue : valueIfFalse` gives back a **value**, so you can put it in a variable or a template literal. Use it
for short choices between two values; use `if` when each branch does several things.

## `switch`: one value, many cases

```js
--8<-- "docs/javascript/examples/02-conditions.js:switch"
```

```text title="Console output"
--8<-- "javascript/outputs/02-conditions/switch.txt"
```

| Code | What it does |
|---|---|
| `switch (status)` | Compares `status` (with `===`) against each `case`. |
| `case "placed": return …` | If it matches, run this code. `return` leaves the function, so we don't need `break`. |
| `default:` | Runs if no case matched. Always include one. |

!!! tip "Without `return`, use `break`"
    In a `switch` that isn't inside a function, end each case with `break;`. Without it, JavaScript "falls through" and runs the
    next case's code too.

## Try it

1. Write an `if`/`else if`/`else` that prints "Morning slot", "Evening slot" or "Closed" for an hour from 0 to 23
   (6–11 morning, 16–21 evening).
2. Given `const product = { stock: 0 }`, print `"ADD"`, `"Only 3 left"` (stock ≤ 3) or `"Out of stock"` with a ternary inside
   a ternary. Then rewrite it with `if`. Which is easier to read?
3. Predict, then check in the console: `null ?? "x"`, `0 || "x"`, `0 ?? "x"`, `"" && "x"`.

## Common mistakes

* `if (x = 5)`: a single `=` **assigns**, so the condition is always truthy. Compare with `===`.
* Using `==` and getting surprised by `"" == 0` being `true`.
* `count || 10` for a default when `0` is a valid count. Use `??`.
* Reading `data.user.address.city` from an API without `?.` and crashing when one level is missing.
