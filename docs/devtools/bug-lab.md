# Bug Lab: Find the 7 Bugs

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

This little FreshCart page has **7 bugs** planted in it. Each one is the kind you'll meet every week, and each is best found with a
different DevTools tool. Find them **with DevTools**, not by reading the source: the point is to practise the tools from
[Debugging with DevTools](index.md).

<iframe src="../demos/bug-lab.html" title="Bug lab: the broken page" style="width:100%;height:560px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

**[Open the Bug Lab in a new tab](demos/bug-lab.html){ target=_blank }** and press ++f12++ there. DevTools works best on a page
of its own rather than inside this frame.

!!! warning "Run it from a web server, not by double-clicking"
    If you download the file and open it from disk (`file://…`), Chrome blocks `fetch()` completely and the Console says
    `Fetch API cannot load file:///…/offer.json. URL scheme "file" is not supported.` That hides bug 6. Serve the folder instead:
    VS Code's Live Server, or `python3 -m http.server` in the folder, then open `http://localhost:8000/bug-lab.html`.

Each bug below has its **symptom**, the **tool** to reach for, and **steps**. Try it yourself, then open the answer. The fixes come
from [`bug-lab-fixed.html`](demos/bug-lab-fixed.html){ target=_blank }, which is generated from the broken page by
[`scripts/gen_bug_lab.py`](https://github.com/khiruashish/web-ui-frontend-playbook/blob/main/scripts/gen_bug_lab.py), so every fix
shown here is exactly what runs there.

## Bug 1: the page scrolls sideways on a phone

- **Symptom:** at phone width you can drag the whole page left and right, and there's a white strip on the right.
- **Tool:** device toolbar + Elements (+ a Console snippet).

1. Press ++ctrl+shift+m++ (++cmd+shift+m++) and set the width to **375**.
2. Paste the [find-overflow snippet](index.md#useful-console-snippets) into the Console. It prints the culprit; hover the result to
   highlight it on the page.
3. Select it in Elements and look at **Computed** → `width`.

??? success "Answer"
    The promo banner has a fixed `width: 420px`, which is wider than a 375 px phone (343 px of room after padding):

    ```css
    --8<-- "docs/devtools/demos/bug-lab.html:bug1"
    ```

    Fix: let it be **at most** 420 px:

    ```css
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix1"
    ```

    Fixed widths are the most common cause of sideways scrolling. Prefer `max-width`, `%`, or `min(420px, 100%)`.

## Bug 2: the price is grey, not green

- **Symptom:** the CSS clearly says `.price { color: #0c831f; }`, but the prices are grey.
- **Tool:** Elements → Styles.

1. Right-click a price → **Inspect**.
2. In **Styles**, find `color: #0c831f` under `.price`. Is it struck through?
3. Look above it for the rule that won, and hover both selectors to compare their **specificity**.

??? success "Answer"
    `.card p` has specificity **(0,1,1)** (one class + one element) and beats `.price` at **(0,1,0)** (one class), even though
    `.price` comes later in the file. Order only decides between **equal** specificities.

    ```css
    --8<-- "docs/devtools/demos/bug-lab.html:bug2"
    ```

    Fix: make the price rule more specific, **(0,2,0)**:

    ```css
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix2"
    ```

    Don't reach for `!important`: it wins this fight but starts an arms race you'll lose later. See
    [Cascade, Specificity & Box Model](../css/fundamentals.md).

## Bug 3: the cards are in one column on a wide screen

- **Symptom:** on a desktop, the three product cards are stacked in one tall column instead of sitting side by side.
- **Tool:** Elements → `grid` badge + Styles.

1. Inspect the `<div class="grid">`. It has a **`grid`** badge: click it to draw the overlay. How many columns?
2. Look at its rules in **Styles**. One declaration has a warning icon.

??? success "Answer"
    A typo in the property name: `grid-template-column` (no **s**). Browsers silently ignore a property they don't know, so the grid
    falls back to one automatic column. DevTools shows it struck through with a warning icon ("Unknown property name").

    ```css
    --8<-- "docs/devtools/demos/bug-lab.html:bug3"
    ```

    ```css
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix3"
    ```

## Bug 4: all the badges pile up in the corner of the page

- **Symptom:** "20% OFF", "NEW" and "FRESH" should sit on each card's picture. Instead they're stacked on top of each other near the
top-left of the page.
- **Tool:** Elements → Computed (on the badge **and** its ancestors).

1. Inspect a badge. **Computed** → `position` is `absolute`, with `top: 8px; left: 8px`. 8 px from **what**?
2. Select its parent `.card`. What is its `position`?

??? success "Answer"
    An absolutely positioned element is placed relative to its nearest **positioned** ancestor (one whose `position` isn't
    `static`). No card is positioned, so all three badges are placed relative to the page itself, at the same spot.

    ```css
    --8<-- "docs/devtools/demos/bug-lab.html:bug4"
    ```

    Fix: make each card the reference box:

    ```css
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix4"
    ```

## Bug 5: clicking ADD shows an error

- **Symptom:** click **ADD**. The cart badge stays at 0, and the Console turns red.
- **Tool:** Console → Sources.

1. Open the **Console**. The error (captured from a real run in Chrome) reads:

    ```text
    Uncaught TypeError: Cannot set properties of null (setting 'textContent')
        at HTMLDivElement.<anonymous> (bug-lab.html:125:53)
    ```

2. Click `bug-lab.html:125` to jump to the line. Something on that line is `null`.
3. In the Console, run the selector from that line on its own: `document.querySelector(".cart-count")`. Then inspect the badge in
   Elements and compare its real class.

??? success "Answer"
    `querySelector` returns `null` when nothing matches, and you can't set `textContent` on `null`. The HTML uses
    `class="cart-badge"`, but the script looks for `.cart-count`.

    ```js
    --8<-- "docs/devtools/demos/bug-lab.html:bug5-7"
    ```

    ```js
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix5"
    ```

    "Cannot read/set properties of null" almost always means **a selector found nothing**. Copy the selector into the Console to
    check it.

## Bug 6: “Couldn't load today's offer”

- **Symptom:** the yellow strip says *Couldn't load today's offer (HTTP 404)* instead of the offer.
- **Tool:** Network.

1. Open **Network**, filter to **Fetch/XHR**, and reload.
2. Find the red row. What URL did the page ask for? What's the status?
3. Compare it with the files that actually exist next to the page.

??? success "Answer"
    The page requests `offer.json`, but the file is called [`offers.json`](demos/offers.json){ target=_blank }. The server answers
    **404 Not Found**. The code handles that properly (it checks `response.ok` and shows a message), which is why there's no crash,
    only a wrong message.

    ```js
    --8<-- "docs/devtools/demos/bug-lab.html:bug6"
    ```

    ```js
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix6"
    ```

## Bug 7: the total says ₹0189

- **Symptom:** after one ADD on the apple (₹189), the total reads **₹0189**. Add the banana and it becomes ₹018949. No error at all.
- **Tool:** Sources → breakpoint + Watch.

1. In **Sources**, open `bug-lab.html` and put a breakpoint on the `total = total + …` line.
2. Click **ADD**. When it pauses, hover `card.dataset.price`. Are there quotes around the value?
3. Add `typeof card.dataset.price` to the **Watch** pane.

??? success "Answer"
    `card.dataset.price` is the **string** `"189"`: data attributes are always strings. `0 + "189"` joins text instead of adding,
    giving `"0189"`. No error is thrown, so only stepping through and looking at the values shows the problem.

    ```js
    --8<-- "docs/devtools/demos/bug-lab-fixed.html:fix7"
    ```

    This is the same trap as `"3" + 1` in [JavaScript lesson 1](../javascript/01-variables.md#converting-between-types). Better
    still for money: store whole paise (`data-price="18900"`) as FreshCart does.

## All fixed

<iframe src="../demos/bug-lab-fixed.html" title="Bug lab: every bug fixed" style="width:100%;height:560px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

Both pages are checked in a real browser on every change. The checks prove each bug really happens in the broken page and is gone
in the fixed one, and run the console snippets from the guide against them:

```text
--8<-- "coding-interview/outputs/17-devtools-bug-lab.txt"
```

## What each bug taught

| # | Bug | Tool that found it | Lesson |
|---|---|---|---|
| 1 | Sideways scroll | Device toolbar + snippet | Fixed widths break small screens: use `max-width` |
| 2 | Grey price | Styles (struck-through rule) | Specificity beats source order |
| 3 | One column | `grid` badge + Styles warning | Typos in CSS fail **silently** |
| 4 | Badges in the corner | Computed `position` | `absolute` needs a positioned ancestor |
| 5 | TypeError | Console → Sources | `null` = your selector found nothing |
| 6 | Offer missing | Network | Check the status and URL of every request |
| 7 | ₹0189 | Breakpoint + Watch | Data from the DOM is text: convert with `Number()` |
