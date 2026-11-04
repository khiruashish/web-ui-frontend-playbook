# 1. Variables, Types & Strings

<span class="lvl lvl-1">Beginner</span>

A program works with **values** (a price, a product name, "is the user logged in?"). A **variable** is a name you give to a value
so you can use it later.

## Your first line

```js
--8<-- "docs/javascript/examples/01-variables.js:first"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/first.txt"
```

| Code | What it does |
|---|---|
| `console.log(…)` | Prints to the console. Your main tool for seeing what your code is doing. |
| `"Hello, FreshCart!"` | A **string**: text inside quotes. `"…"`, `'…'` and `` `…` `` all work. |
| `2 + 3` | JavaScript works the sum out first, then prints `5`. |
| `console.log("Total:", 189 + 49)` | Several values separated by commas are printed with spaces between them. |
| `;` | Ends a statement. Optional in most cases, but this playbook always writes it. |
| `// …` | A comment: ignored by JavaScript, written for humans. |

## `const` and `let`

```js
--8<-- "docs/javascript/examples/01-variables.js:let-const"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/let-const.txt"
```

| Code | What it does |
|---|---|
| `const storeName = "FreshCart";` | Creates a variable that can **never be reassigned**. Use `const` by default. |
| `let itemsInCart = 0;` | Creates a variable you **will** change. |
| `itemsInCart = itemsInCart + 1;` | Read the current value (0), add 1, store the result back. `=` means "store", not "equals". |
| `itemsInCart += 2;` | Shortcut for the line above with 2. Also `-=`, `*=`, and `++` (add 1). |
| `storeName = "OtherCart";` | Error: you can't reassign a `const`. The program **stops** at this line, which is why it's the last thing printed. |

!!! warning "Don't use `var`"
    Old tutorials use `var`. It ignores `{ }` blocks and can be used before it's declared, which causes confusing bugs. Modern
    code uses only `const` and `let`.

**Naming rules:** letters, digits, `_` and `$`; can't start with a digit; case-sensitive (`total` ≠ `Total`). Use
**camelCase** and say what the value is: `cartTotalPaise`, not `x` or `data2`.

## Types: what kind of value is it?

```js
--8<-- "docs/javascript/examples/01-variables.js:types"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/types.txt"
```

| Type | Example | Used for |
|---|---|---|
| `string` | `"Apple"` | Text |
| `number` | `189`, `4.6` | Whole numbers and decimals (one type for both) |
| `boolean` | `true`, `false` | Yes/no: `inStock`, `isLoggedIn` |
| `undefined` | `undefined` | "No value has been given yet" |
| `null` | `null` | "Deliberately empty" (you set it) |
| `object` | `{ name: "Apple" }`, `["a", "b"]` | Groups of values (lesson 4). Arrays are objects too, so check them with `Array.isArray()`. |
| `bigint`, `symbol` | `10n`, `Symbol()` | Rare in frontend code; you can skip them for now |

`typeof value` tells you the type as a string. `typeof null` says `"object"`: a bug from 1995 that can never be fixed without
breaking old websites.

## `undefined` vs `null`

```js
--8<-- "docs/javascript/examples/01-variables.js:undefined-null"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/undefined-null.txt"
```

`undefined` is what JavaScript gives you when nothing was set. `null` is what **you** write to say "empty on purpose" (no
coupon, no address yet).

## Strings and template literals

```js
--8<-- "docs/javascript/examples/01-variables.js:strings"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/strings.txt"
```

| Code | What it does |
|---|---|
| `` `${qty} × ${product} = ₹${qty * price}` `` | A **template literal**: backticks, and `${ }` to insert any value or calculation. Much easier to read than `qty + " × " + product`. |
| `.length` | Number of characters (a property, so no `()`). |
| `.toUpperCase()` | A **method**: a function that belongs to the string. Strings never change; methods return a **new** string. |
| `.includes("Apple")` | `true` if the text contains it. Case-sensitive. |
| `.split(" ")` | Cuts the text at each space into an **array** of parts. |
| `.trim()` | Removes spaces at both ends. Always trim what users type. |
| `.padStart(6, ".")` | Pads to 6 characters from the left. Useful for lining up columns. |

## Numbers, and why money is stored in paise

```js
--8<-- "docs/javascript/examples/01-variables.js:numbers"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/numbers.txt"
```

| Code | What it does |
|---|---|
| `0.1 + 0.2` | Computers store decimals in binary, where 0.1 can't be written exactly, so tiny errors appear. In every language, not just JS. |
| `const applePaise = 18900;` | **The fix used by real stores:** keep money as whole numbers of the smallest unit (paise, cents). Whole numbers add up exactly. |
| `(totalPaise / 100).toFixed(2)` | Divide only when **showing** the price. `toFixed(2)` gives exactly two decimals (as a string). |
| `new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })` | The browser's built-in formatter: adds `₹` and Indian digit grouping (12,34,567). Use `"en-US"`/`"USD"` for `$1,234,567.89`. |

## Converting between types

```js
--8<-- "docs/javascript/examples/01-variables.js:conversion"
```

```text title="Console output"
--8<-- "javascript/outputs/01-variables/conversion.txt"
```

| Code | What it does |
|---|---|
| `"3" + 1` → `31` | If either side of `+` is a string, `+` **joins text**. The most common beginner bug: values from `<input>` and `data-*` attributes are always strings. |
| `Number("3") + 1` → `4` | Convert first, then do maths. |
| `Number("12abc")` → `NaN` | "Not a Number": the conversion failed. Check with `Number.isNaN()`. |
| `String(42)` | Number to text. |
| `parseInt("250g", 10)` → `250` | Reads digits from the start and stops at the first non-digit. Always pass `10` (base ten). |

## Try it

1. Make `const` variables for your favourite product's name, price in paise and pack size, and print
   `"Shimla Apple (1 kg): ₹189.00"` using one template literal and `Intl.NumberFormat`.
2. In the browser console, type `"5" * 2`, `"5" + 2` and `"5" - 2`. Which one surprised you, and why?
3. Print the length of your own name, then print it reversed (hint: `split("")`, `.reverse()`, `.join("")`).

### Solutions

Try each exercise yourself first, then open its solution to compare.

??? success "1. One template literal"
    ```js
    --8<-- "docs/javascript/solutions/01-variables.js:ex1"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/01-variables/ex1.txt"
    ```

??? success "2. "5" * 2, "5" + 2, "5" - 2"
    ```js
    --8<-- "docs/javascript/solutions/01-variables.js:ex2"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/01-variables/ex2.txt"
    ```

    `+` is the odd one out: it means both "add" and "join text", and **any** string on either side makes it join. `*`, `-` and `/`
    only do maths, so JavaScript converts `"5"` to the number 5 first. Convert input values with `Number()` yourself so you never
    rely on these rules.

??? success "3. Length and reverse"
    ```js
    --8<-- "docs/javascript/solutions/01-variables.js:ex3"
    ```

    ```text title="Console output"
    --8<-- "javascript/outputs/solutions/01-variables/ex3.txt"
    ```

    Strings have no `.reverse()`, but arrays do: `split("")` turns the text into an array of characters, `reverse()` flips the
    array, and `join("")` glues it back into a string.

## Common mistakes

* Using `let` everywhere "just in case". Start with `const`; change it to `let` only when you really reassign it.
* Adding prices as decimals (`0.1 + 0.2`). Use whole paise.
* Forgetting that input values are strings: `input.value + 1` gives `"31"`, not `4`.
* Writing `name` and `Name` and wondering why one is `undefined`: names are case-sensitive.
