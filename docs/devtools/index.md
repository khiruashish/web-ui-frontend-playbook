# Debugging with DevTools

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span>

Every browser ships with **developer tools** (DevTools): a panel that shows you the live HTML, every CSS rule that applies to an
element (and which ones lost), every network request, every JavaScript error, and lets you pause your code line by line.
Learning DevTools well is the single biggest speed-up in frontend work: you stop **guessing** and start **looking**.

This page is a guided tour. Then the [Bug Lab](bug-lab.md) gives you a page with 7 real bugs to find, one per tool.

!!! note "Which browser?"
    The steps use **Chrome**. **Edge** has the same DevTools (both are built on Chromium). **Firefox** has the same panels with
    slightly different names (Inspector instead of Elements, Debugger instead of Sources); the ideas are identical. Menu names move
    a little between versions: if something isn't where this page says, use the **Command Menu** (below) and type its name.

## Opening DevTools

| To… | Windows / Linux | macOS |
|---|---|---|
| Open / close DevTools | ++f12++ or ++ctrl+shift+i++ | ++cmd+opt+i++ |
| Open straight to the Console | ++ctrl+shift+j++ | ++cmd+opt+j++ |
| Pick an element on the page | ++ctrl+shift+c++, then click it | ++cmd+shift+c++ |
| **Command Menu**: run any DevTools command by name | ++ctrl+shift+p++ (inside DevTools) | ++cmd+shift+p++ |
| Toggle the device toolbar (phone view) | ++ctrl+shift+m++ | ++cmd+shift+m++ |

Or right-click anything on the page → **Inspect**. That opens the Elements panel with that element selected: the fastest way in.

## The panels you'll use daily

| Panel | Answers the question… | Typical bug |
|---|---|---|
| **Elements** | What does the page look like *right now*, and which CSS applies to this element? | "My style isn't working", layout problems |
| **Console** | What went wrong in JavaScript? What is this value? | Errors, wrong values |
| **Sources** | What is my code doing, step by step? | Logic bugs with no error message |
| **Network** | What did the page request, and what came back? | Missing data, 404s, slow loading |
| **Application** | What's saved in this browser? | localStorage, cookies, stale data |
| **Lighthouse** | How good is this page overall? | Performance, accessibility, SEO audits |
| **Rendering** (a drawer tab) | How does the page look in dark mode, with reduced motion, with colour blindness? | Media-query and accessibility checks |

## Elements: the live page and its CSS

The **Elements** panel shows the **DOM**: the HTML as it is now, after JavaScript has changed it (not the original file).
Select an element and the panes on the side explain how it's styled.

### Styles: which rules apply, and which lost

The **Styles** pane lists every rule that matches the selected element, **most specific first**:

* A declaration that **lost** to another rule is shown ~~struck through~~. Look for the winning rule above it.
* An **invalid** declaration (a typo in the property name, or a value that isn't allowed) is struck through **with a warning
  icon**. The browser ignored it completely.
* Hover a selector to see its **specificity**, for example `(0,1,1)`.
* Click any value to edit it live; tick or untick the checkbox next to a declaration to switch it off and on.
* **:hov** forces states like `:hover` and `:focus` so you can style them without keeping the mouse there. **.cls** adds and
  removes classes.
* **+** adds a new rule for the selected element. Nothing is saved to your files: copy what works back into your CSS.

### Computed: the final values, and the box model

The **Computed** tab shows the **final** value of every property, after the cascade. At the top is the **box model** diagram:

```text
┌──────────────── margin ────────────────┐
│ ┌────────────── border ──────────────┐ │
│ │ ┌──────────── padding ───────────┐ │ │
│ │ │                                │ │ │
│ │ │      content   420 × 48        │ │ │
│ │ │                                │ │ │
│ │ └────────────────────────────────┘ │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

Hover each layer to highlight it on the page. Click a property in the Computed list and DevTools jumps to the rule that set it.

### Grid and Flexbox overlays

Elements with `display: grid` or `display: flex` get a small **`grid`** or **`flex`** badge in the DOM tree. Click the badge to
draw the layout on the page: column and row lines, gaps, track sizes and area names. The **Layout** pane lists every grid and flex
container on the page with options for the overlay. If you expected three columns and the overlay shows one, the problem is in
the **container's** CSS, not the items.

## Device toolbar: test on phone sizes

Press ++ctrl+shift+m++ (++cmd+shift+m++). Pick a device or type a width (try **320** and **375**). Things to check:

* **Sideways scrolling**: if you can drag the page left, something is wider than the screen. Find it with the
  [find-overflow snippet](#useful-console-snippets).
* **Touch targets**: buttons and links should be at least about 44 × 44 px.
* **Throttling**: the toolbar can also slow the network and CPU to feel like a cheap phone on mobile data.

## Console: errors and quick questions

The Console shows every JavaScript error, warning and `console.log`, and lets you run JavaScript **in the page**.

* Every error has a **link** on the right (`bug-lab.html:125`): click it to jump to the exact line in Sources.
* **`$0`** is the element currently selected in Elements. Select something, then type `$0.textContent` or `$0.dataset`.
* **`$$("selector")`** is a shortcut for `[...document.querySelectorAll("selector")]`: an array you can `map`/`filter`.
* **`copy(value)`** copies any value (an object, an element's HTML) to the clipboard.
* **`console.table(array)`** draws an array of objects as a table.
* The **eye icon** creates a **Live expression** that re-evaluates continuously, for example `document.activeElement` to see
  where keyboard focus is.

### Useful console snippets

Paste these into the Console (or save them in **Sources → Snippets** to run them on any page). They're tested against the Bug
Lab on every change.

```js title="Find what makes the page scroll sideways"
--8<-- "docs/devtools/demos/snippets.js:find-overflow"
```

```js title="Outline every element (run again to remove)"
--8<-- "docs/devtools/demos/snippets.js:outline-all"
```

```js title="Log every keyboard focus stop (then press Tab)"
--8<-- "docs/devtools/demos/snippets.js:log-focus"
```

The `{ }` around the first two keeps their `const`s private, so you can paste them again without a "has already been declared"
error.

## Sources: pause your code and look inside

`console.log` is fine for quick checks. For anything harder, **pause** the code at a line and look at every variable:

1. Open **Sources** and find your file in the left tree (or press ++ctrl+p++ / ++cmd+p++ and type its name).
2. Click a **line number** to add a breakpoint (a blue marker).
3. Do whatever runs that line (click the button). The page freezes there.
4. Hover any variable to see its value, or read them all in the **Scope** pane. The **Call Stack** pane shows how you got here.
5. Step through:

| Key | Does |
|---|---|
| ++f8++ | Resume until the next breakpoint |
| ++f10++ | Step **over**: run this line, stop at the next |
| ++f11++ | Step **into** the function called on this line |
| ++shift+f11++ | Step **out** of the current function |

Other kinds of breakpoints, for when you don't know which line to stop on:

| Breakpoint | Set it from | Stops when… |
|---|---|---|
| **Conditional** | Right-click a line number → *Add conditional breakpoint* (e.g. `qty > 5`) | that line runs **and** the condition is true |
| **Logpoint** | Right-click a line number → *Add logpoint* | never stops; logs a message, like a `console.log` you didn't have to write |
| **DOM** | Elements → right-click a node → *Break on* → subtree modifications / attribute modifications / node removal | JavaScript changes that element. Answers "what is changing this?" |
| **Event listener** | Sources → *Event Listener Breakpoints* → e.g. Mouse → click | any click handler starts running |
| **Exceptions** | Sources → Breakpoints pane → *Pause on uncaught exceptions* | an error is about to be thrown, with all the variables still there |
| `debugger;` | Write it in your code | that line runs while DevTools is open |

The **Watch** pane keeps expressions you care about, such as `typeof total` or `cart.size`, visible while you step.

## Network: what the page asked for, and what came back

Open **Network**, then **reload** the page (requests made before DevTools was open aren't recorded). Each row is one request.

* Filter with **Fetch/XHR** to see only your API calls, or **Img**, **CSS**, **JS**.
* The **Status** column: anything that isn't `2xx` is red. Click a row for **Headers** (URL, method, status), **Payload** (what you
  sent), **Preview** (the parsed JSON) and **Response** (the raw text).
* Tick **Disable cache** while DevTools is open, so you always get your latest files.
* Tick **Preserve log** to keep requests when the page navigates or reloads.
* The throttling dropdown simulates slow mobile connections. Every loading state you build should be tested this way.
* Right-click a request → **Copy** → *Copy as fetch* gives you working JavaScript to repeat it in the Console.

| Status | Means | Usually |
|---|---|---|
| `200` OK | Worked | |
| `304` Not Modified | Served from the browser cache | Fine |
| `400` Bad Request | The server didn't understand what you sent | Wrong body or parameters |
| `401` / `403` | Not logged in / not allowed | Missing or expired token |
| `404` Not Found | Nothing at that URL | A typo in the URL or path |
| `500` Server Error | The server crashed | A backend bug; check its logs |
| `(failed)` / `CORS error` | No response at all, or the browser blocked it | Server down, offline, or missing CORS headers |

## Application: what the browser has saved

**Application → Storage** shows **Local storage**, **Session storage**, **Cookies** and **IndexedDB** for the site. You can view, edit
and delete entries. **Storage → Clear site data** wipes everything for the site: the quickest way to test "first visit".

## Rendering: emulate settings without changing your computer

Open it from the Command Menu (type *Rendering*). The most useful options:

* **Emulate CSS media feature `prefers-color-scheme`**: test dark mode.
* **Emulate CSS media feature `prefers-reduced-motion`**: check animations switch off.
* **Emulate vision deficiencies**: see the page as someone with colour blindness or blurred vision would.
* **Layout Shift Regions**: flashes the areas that jump while the page loads (what Core Web Vitals call CLS).

## Lighthouse and Performance

**Lighthouse** runs an automated audit and scores **Performance**, **Accessibility**, **Best Practices** and **SEO** from 0 to 100,
with a list of specific problems (images without `alt`, low contrast, render-blocking files, missing `width`/`height` on images).
Run it in an **Incognito window**, because browser extensions slow pages down and skew the score.

The **Performance** panel records everything the browser does while you interact (scripting, layout, painting) on a timeline. Use
it when something feels slow: long yellow blocks are JavaScript keeping the browser busy.

## A debugging routine

When something is wrong, work through it in this order instead of changing code at random:

1. **Reproduce it.** Find the exact steps and screen width that show the bug.
2. **Read the Console.** Any red error? Click its link.
3. **Inspect the element.** Is it in the DOM? What do Styles and Computed say?
4. **Check Network.** Did the data arrive? With what status and what body?
5. **Pause the code.** Breakpoint where the value is first wrong, and step.
6. **Fix it in DevTools first** (edit the CSS live, try the expression in the Console), then copy the fix into your files.
7. **Check you didn't break something else**: other screen widths, keyboard use, the Console stays clean.

Ready to practise? **[Open the Bug Lab →](bug-lab.md)**
