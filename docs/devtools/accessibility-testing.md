# Accessibility Testing Walkthrough

<span class="lvl lvl-1">Beginner</span> <span class="lvl lvl-2">Intermediate</span> <span class="lvl lvl-3">Advanced</span>

[Accessibility](../career/accessibility.md) explains **what** makes a page accessible. This page is about **testing** it: the
four checks to run on every page, in order, and what each one finds. You'll practise on the **A11y Lab**, a small FreshCart page
with **10 planted accessibility problems**.

The most important lesson comes first, from a real run on that page:

| Testing method | Problems it found in the lab (of 10) |
|---|---|
| 1. Automated scan (axe, the engine inside Lighthouse) | **5** |
| 2. Keyboard only | 3 more |
| 3. Accessibility tree in DevTools | confirms several, and 1 more |
| 4. Screen reader | the last 1, and how all of them *feel* |

**An automated scan is the start, not the finish.** It found half the problems in seconds, and passed a page that a keyboard user
couldn't use to add anything to the cart.

## The A11y Lab

<iframe src="../demos/a11y-lab.html" title="A11y lab: the page with 10 accessibility problems" style="width:100%;height:470px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

**[Open the A11y Lab in a new tab](demos/a11y-lab.html){ target=_blank }** and test it as you read. It looks fine with a mouse.
That's the point.

## Step 1: Automated scan (2 minutes)

Run one of these:

* **Lighthouse**: DevTools → **Lighthouse** → tick *Accessibility* → *Analyze page load*.
* **axe DevTools** (free browser extension from Deque): DevTools → **axe DevTools** → *Scan all of my page*. Same engine as
  Lighthouse, with more detail per issue.
* **In your tests**: run axe in Playwright on every page in CI, as this site does:

```js
await page.addScriptTag({ path: require.resolve("axe-core") });
const { violations } = await page.evaluate(() => axe.run());
```

The real result for the lab, produced by the site's test runner with axe-core 4.14.0:

```text
--8<-- "coding-interview/outputs/a11y-axe-broken.txt"
```

Every one of these is a real problem: A1, A2, A3, A8 and A10 below. But look at what it **didn't** report: nothing about the ADD
control, the focus ring, the dialog, the search label or the cart count. Automated tools can only check what can be decided from
the code. Whether something is *usable* needs a person.

!!! tip "Check contrast by hand, too"
    In **Elements**, select the text, then click the colour swatch next to `color` in **Styles**. The colour picker shows the
    **contrast ratio** with ✓/✗ for AA (4.5 : 1 for normal text) and AAA. Drag the colour until it passes.

## Step 2: Keyboard only (5 minutes)

Put the mouse away. Use only:

| Key | Does |
|---|---|
| ++tab++ / ++shift+tab++ | Next / previous focusable element |
| ++enter++ | Activate a link or button |
| ++space++ | Activate a button, tick a checkbox |
| Arrow keys | Move inside radios, selects, menus, tabs |
| ++esc++ | Close a dialog or menu |

Ask four questions at every step:

1. **Can I reach it?** Every link, button and field gets focus, in a sensible order.
2. **Can I see where I am?** A clear focus ring, never hidden.
3. **Can I use it?** ++enter++ / ++space++ do what a click does.
4. **Can I get out?** Dialogs close with ++esc++, and focus goes back where it was.

What the tests recorded on the lab when pressing ++tab++ from the top:

| | Tab stops, in order | Focus ring |
|---|---|---|
| **Broken** | logo → cart button → search box → Go → Delivery info | **none** (`outline: none`) |
| **Fixed** | logo → cart button → search box → Go → **ADD** → Delivery info | 3 px blue ring |

The broken page has no way to add the apple to the cart from the keyboard, and you can't see where you are. axe reported neither
problem.

## Step 3: The accessibility tree (5 minutes)

Screen readers don't read your HTML. They read the **accessibility tree**: the browser's summary of every element as a **role**
(button, heading, link…), a **name** ("Add Shimla Apple to cart") and a **state** (checked, expanded…).

* In **Elements**, select an element and open the **Accessibility** pane (next to Styles). It shows the element's computed
  **Name** and **Role**, and where the name came from (content, `aria-label`, `<label>`, `alt`).
* Chrome can show the whole page as an accessibility tree: tick *Enable full-page accessibility tree* in that pane, then switch
  the Elements tree with the button that appears.

Here are the real trees of both lab pages, captured by the tests with Playwright's `ariaSnapshot()`. Compare them line by line:

=== "Broken"

    ```yaml
    --8<-- "coding-interview/outputs/a11y-tree-broken.txt"
    ```

=== "Fixed"

    ```yaml
    --8<-- "coding-interview/outputs/a11y-tree-fixed.txt"
    ```

| In the broken tree | Means |
|---|---|
| `- button` with no name | A screen reader says just "button". Which one? (A3) |
| `- text: "0"` | A number with no meaning, and nothing is announced when it changes (A9) |
| `heading … [level=4]` right after level 1 | The outline skips levels 2 and 3 (A8) |
| `- img` with no name | An image the user is told exists but not what it is (A10) |
| `- text: ADD` | Not a button at all: it has no role, so it can't be found in a list of buttons or activated (A5) |
| `searchbox "Search products"` | It **has** a name, taken from the placeholder. That's why axe passed it, but the placeholder vanishes as soon as you type (A4) |

## Step 4: A screen reader (15 minutes)

Use the one built into your system, or the free NVDA on Windows:

| Screen reader | Start / stop | Next item | Headings list | Activate |
|---|---|---|---|---|
| **VoiceOver** (macOS) | ++cmd+f5++ | ++ctrl+opt+right++ | ++ctrl+opt+u++ (rotor), then arrows | ++ctrl+opt+space++ |
| **NVDA** (Windows, free) | ++ctrl+alt+n++ / ++insert+q++ | ++down++ | ++insert+f7++ (elements list); ++h++ jumps to the next heading | ++enter++ |
| **Narrator** (Windows) | ++ctrl+win+enter++ | ++caps-lock+right++ | turn on scan mode (++caps-lock+space++), then ++h++ | ++caps-lock+enter++ |
| **TalkBack** (Android) / **VoiceOver** (iOS) | Settings → Accessibility | Swipe right | Rotor / reading controls | Double-tap |

Then do three things on the lab:

1. **Listen to the whole page** from the top. Does every image, button and field make sense out of context?
2. **Open the headings list.** Is it a sensible outline of the page?
3. **Do the main task**: add the apple to the cart. Did you hear that it worked?

On the broken page you'll hear roughly "button" for the cart (which button?), nothing at all when the count changes (A9: the
**only** problem that just a screen reader shows), and you can't add the apple without the mouse.

!!! note "Screen readers differ"
    Each screen reader and browser pair speaks a little differently. Test with at least one desktop and one mobile reader:
    VoiceOver + Safari, and NVDA + Chrome or Firefox, cover most users.

## Step 5: Zoom, reflow and emulation (5 minutes)

* **Zoom to 200 %** (++ctrl+plus++ / ++cmd+plus++): text grows, nothing overlaps or gets cut off.
* **320 px wide** in the device toolbar: no sideways scrolling (WCAG 1.4.10 Reflow).
* **Rendering → Emulate vision deficiencies**: is anything shown by colour alone (red = error, green = OK)?
* **Rendering → `prefers-reduced-motion: reduce`**: animations calm down.

## The 10 problems

Try to find each one with the steps above before opening the answer. All the fixes come from
[`a11y-lab-fixed.html`](demos/a11y-lab-fixed.html){ target=_blank }, which is generated from the broken page by
[`scripts/gen_bug_lab.py`](https://github.com/khiruashish/web-ui-frontend-playbook/blob/main/scripts/gen_bug_lab.py), so the
code here is exactly what was tested.

??? success "A1. The page has no language · WCAG 3.1.1 · found by axe"
    Without `lang`, a screen reader guesses which voice and pronunciation to use, and often guesses wrong.

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a1"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a1"
    ```

??? success "A2. Grey text is too faint · WCAG 1.4.3 · found by axe and the DevTools colour picker"
    `#b0b0b0` on white is **2.2 : 1**; normal text needs **4.5 : 1**.

    ```css
    --8<-- "docs/devtools/demos/a11y-lab.html:a2"
    ```

    ```css
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a2"
    ```

??? success "A3. The cart button has no name · WCAG 4.1.2 · found by axe and the accessibility tree"
    An icon-only button with `aria-hidden` on its SVG has **no text at all**, so it's announced as just "button".

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a3"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a3"
    ```

    `aria-label` gives it a name. Keep `aria-hidden="true"` on the icon so it isn't read as well.

??? success "A4. The search box is labelled only by its placeholder · WCAG 3.3.2 · missed by axe, found by the tree + common sense"
    The browser uses the placeholder as the accessible name, so axe passes it. But the placeholder disappears as soon as you type,
    it's usually low-contrast, and some assistive tech ignores it. Use a real `<label>`, here visually hidden because the design has
    no room, and keep the placeholder for an example:

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a4"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a4"
    ```

    ```css
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a4-css"
    ```

??? success "A5. ADD is a div · WCAG 2.1.1, 4.1.2 · missed by axe, found by the keyboard and the tree"
    A `<div>` with `onclick` can't get focus, doesn't react to ++enter++ or ++space++, and has no button role. Nothing in the code is
    technically invalid, so automated tools can't tell it was meant to be a button.

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a5"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a5"
    ```

    A real `<button>` gets focus, keyboard activation and the role for free. The `aria-label` makes "ADD" specific when there are
    many products on the page ("Add Shimla Apple to cart"), and it still contains the visible word ADD, so voice-control users can
    say "click ADD".

??? success "A6. The focus ring was removed · WCAG 2.4.7 · missed by axe, found by the keyboard"
    `outline: none` on `:focus` makes keyboard users lose their place completely.

    ```css
    --8<-- "docs/devtools/demos/a11y-lab.html:a6"
    ```

    ```css
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a6"
    ```

    `:focus-visible` shows the ring for keyboard focus but not on mouse clicks, which is usually why people removed it in the first
    place. The blue `#2563eb` has 5.2 : 1 contrast against white.

??? success "A7. The info box isn't a real dialog · WCAG 2.1.1, 2.4.3 · missed by axe, found by the keyboard"
    Opening it leaves focus on the button behind it, ++esc++ does nothing, and the × is a `<span>` that can't be reached at all.

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a7-html"
    ```

    ```js
    --8<-- "docs/devtools/demos/a11y-lab.html:a7-js"
    ```

    Use the native `<dialog>` with `showModal()`. It moves focus inside, keeps ++tab++ inside, closes on ++esc++, makes the page
    behind inert, and returns focus to the button when it closes:

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a7-html"
    ```

    ```js
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a7-js"
    ```

    ```css
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a7-css"
    ```

??? success "A8. Headings jump from level 1 to level 4 · WCAG 1.3.1 · found by axe and the tree"
    Screen-reader users navigate by headings; a jump from `h1` to `h4` suggests missing sections. Choose the level by structure and
    set the size with CSS.

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a8"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a8"
    ```

??? success "A9. The cart count changes silently · WCAG 4.1.3 · found only by a screen reader"
    Sighted users see the number change. Screen-reader users hear nothing, because focus didn't move and the number isn't in a live
    region.

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a9"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a9"
    ```

    `role="status"` makes it a polite **live region**: when its text changes, screen readers announce it ("1 in cart") without
    moving focus. The visually hidden " in cart" gives the bare number a meaning.

??? success "A10. The image has no alt attribute · WCAG 1.1.1 · found by axe and the tree"
    With no `alt` at all, some screen readers read the **file name** ("apple dot svg").

    ```html
    --8<-- "docs/devtools/demos/a11y-lab.html:a10"
    ```

    ```html
    --8<-- "docs/devtools/demos/a11y-lab-fixed.html:fix-a10"
    ```

    Here the product name is written right next to the picture, so the image adds nothing and `alt=""` marks it as **decorative**
    (otherwise the name is heard twice). If the image carried information the text doesn't, such as a photo on a product detail
    page, describe it: `alt="Six red Shimla apples in a paper bag"`.

## All fixed

<iframe src="../demos/a11y-lab-fixed.html" title="A11y lab: every problem fixed" style="width:100%;height:470px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

```text
--8<-- "coding-interview/outputs/a11y-axe-fixed.txt"
```

The fixed page is also checked with the keyboard and the dialog in a real browser on every change:

```text
--8<-- "coding-interview/outputs/18-a11y-lab.txt"
```

## Who found what

| # | Problem | WCAG | axe | Keyboard | Tree | Screen reader |
|---|---|---|---|---|---|---|
| A1 | No page language | 3.1.1 | ✓ | | | ✓ |
| A2 | Low contrast | 1.4.3 | ✓ | | | |
| A3 | Unnamed icon button | 4.1.2 | ✓ | | ✓ | ✓ |
| A4 | Placeholder as the only label | 3.3.2 | ✗ | | ✓ | ✓ |
| A5 | `<div>` as a button | 2.1.1, 4.1.2 | ✗ | ✓ | ✓ | ✓ |
| A6 | Focus ring removed | 2.4.7 | ✗ | ✓ | | |
| A7 | Fake dialog | 2.1.1, 2.4.3 | ✗ | ✓ | | ✓ |
| A8 | Skipped heading levels | 1.3.1 | ✓ | | ✓ | ✓ |
| A9 | Silent cart count | 4.1.3 | ✗ | | | ✓ |
| A10 | Image without `alt` | 1.1.1 | ✓ | | ✓ | ✓ |

No single method finds everything. Together they take about 30 minutes per page, and much less once they're a habit.

## A checklist for every pull request

- [ ] axe / Lighthouse accessibility: no violations (ideally automated in CI)
- [ ] Tab through every new control: reachable, visible focus, works with ++enter++ / ++space++, ++esc++ closes overlays
- [ ] Every new image has the right `alt` (descriptive or `""`)
- [ ] Every new field has a `<label>`; errors are in text and linked with `aria-describedby`
- [ ] Icon-only buttons have an `aria-label`
- [ ] Dynamic updates that matter (cart, errors, results count) are in a live region
- [ ] Headings still form a sensible outline
- [ ] 200 % zoom and 320 px width still work
- [ ] For a new widget (tabs, menu, combobox): tried with a screen reader once
