# 1. Page Skeleton & Design Tokens

<span class="lvl lvl-1">Beginner</span>

Before any component, every page needs two things: a correct **HTML skeleton** and a **base stylesheet** (design tokens, a reset,
and a few shared helpers). Get these right once and every later component becomes shorter.

## What you see

<iframe src="../demos/01-skeleton.html" title="Page skeleton: live demo" style="width:100%;height:300px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

## The HTML skeleton

```html title="01-skeleton.html" linenums="1"
--8<-- "docs/ecommerce/demos/01-skeleton.html"
```

### Line by line

| Line | Code | What it does |
|---|---|---|
| 1 | `<!doctype html>` | Tells the browser "this is modern HTML". Without it the browser switches to **quirks mode** and copies 1990s bugs, so layouts break in strange ways. |
| 2 | `<html lang="en">` | The root element. `lang` tells screen readers which voice and pronunciation to use, and helps Google and the browser's translate button. |
| 3 | `<head>` | Information **about** the page. Nothing in `<head>` is drawn on screen. |
| 4 | `<meta charset="utf-8">` | Text encoding. UTF-8 handles every language and symbol, including `₹` and emoji. Keep it first in `<head>`. |
| 5 | `<meta name="viewport" …>` | **The most important line for mobile.** Without it a phone pretends to be a 980 px-wide desktop and shrinks everything. `width=device-width` makes 1 CSS pixel match the phone's width; `initial-scale=1` means no zoom. |
| 6 | `<title>…</title>` | The text in the browser tab, in bookmarks, and as the blue link in Google results. |
| 7 | `<meta name="description" …>` | The grey text under your link in search results. About 150 characters. |
| 8 | `<link rel="stylesheet" href="css/base.css">` | Loads the CSS file. The path is **relative** to the HTML file: "the `css` folder next to me". |
| 9 | `</head>` | End of the invisible part. |
| 10 | `<body>` | Everything visible goes here. |
| 11 | `<header>` | A **landmark**: the top of the site (logo, search, cart). Screen-reader users can jump straight to it. Lesson 2 fills it in. |
| 12 | `<main id="main">` | The unique content of this page. Use exactly **one** per page. The `id` lets a "Skip to content" link jump here. |
| 13 | `<div class="container">` | A plain box with no meaning, used only for layout: it limits the width and centres the content. |
| 14 | `<h1>` | The page's main heading. One per page; then `h2` for sections, `h3` inside those. Never skip levels just to get a smaller font. |
| 15 | `<p>` | A paragraph. |
| 16 | `<a class="btn" href="#">` | A **link** styled as a button. Use `<a>` when it goes somewhere, `<button>` when it does something on this page. |
| 17 | `class="btn btn--outline"` | Two classes: the base button plus a **modifier** that changes only its colours (BEM naming: `block--modifier`). |
| 18–20 | `</div></main><footer>` | Close the boxes. `<footer>` is the bottom landmark (lesson 7). |
| 21–22 | `</body></html>` | Close the document. |

## Design tokens: name your decisions

A **design token** is a named value: a colour, a spacing step, a radius. You define it once with a CSS custom property
(`--name: value`) and use it everywhere with `var(--name)`. To change the brand colour of the whole site, you edit one line.

```css title="css/base.css (tokens)" linenums="1"
--8<-- "docs/ecommerce/demos/css/base.css:tokens"
```

| Code | What it does |
|---|---|
| `:root { … }` | `:root` is the `<html>` element. Variables declared here are visible to every element on the page. |
| `--brand: #0c831f;` | The main green. Buttons, logo and links use it. `--brand-dark` is the hover colour, `--brand-soft` a pale tint for backgrounds. |
| `--accent`, `--danger` | Yellow for highlights and focus rings; red for the cart badge and errors. |
| `--text`, `--muted` | Main text colour (near-black, softer than pure `#000`) and grey for secondary text. |
| `--line`, `--surface`, `--page` | Border grey, card white, and the light grey page background that makes white cards stand out. |
| `--space-1` … `--space-8` | A **spacing scale** (4, 8, 12, 16, 24, 32 px). Using only these values is what makes a layout look tidy. |
| `--radius`, `--radius-sm` | Corner rounding: 12 px for cards, 8 px for buttons and inputs. |
| `--shadow` | A soft shadow for hover. `rgb(0 0 0 / 0.08)` is black at 8 % opacity. |
| `--container: 1200px` | The maximum width of the content on big screens. |

## A small reset

Browsers add their own default styles, and they differ slightly. A reset removes the annoying ones.

```css title="css/base.css (reset)" linenums="1"
--8<-- "docs/ecommerce/demos/css/base.css:reset"
```

| Code | What it does |
|---|---|
| `*, *::before, *::after { box-sizing: border-box; }` | Makes `width` **include** padding and border. Without it, a `width: 100%` box with padding is wider than its parent and overflows. Every modern site uses this. |
| `body { margin: 0; }` | Removes the browser's default 8 px gap around the page. |
| `font-family: system-ui, …` | Uses the phone's or computer's own font (San Francisco on Apple, Segoe UI on Windows, Roboto on Android): fast, because there's nothing to download. |
| `font-size: 16px; line-height: 1.5;` | 16 px is the readable minimum for body text. `line-height: 1.5` (no unit) means 1.5 × the font size. |
| `color` / `background` | Use the tokens, so the whole page follows them. |
| `img { display: block; max-width: 100%; }` | Images never overflow their box, and lose the small gap below them that inline images have. |
| `button, input, select { font: inherit; }` | Form controls don't inherit the page font by default; this fixes it. |
| `a { color: inherit; }` | Links take the colour of the text around them; we colour them ourselves where needed. |
| `[hidden] { display: none !important; }` | **A real bug we hit while building this page.** The `hidden` attribute hides an element only through the browser's own `display: none`. Our `.btn { display: inline-flex }` is more specific, so a "hidden" ADD button stayed visible. This one rule makes `hidden` always win. |

## Shared helpers

```css title="css/base.css (helpers)" linenums="1"
--8<-- "docs/ecommerce/demos/css/base.css:helpers"
```

| Code | What it does |
|---|---|
| `.container { width: min(100% - 2 * var(--space-4), var(--container)); }` | The width is **the smaller of** "full width minus 16 px each side" and 1200 px. One line gives side padding on phones and a max width on desktops. |
| `margin-inline: auto;` | Equal left and right margins, which centres the box. `inline` means "left/right" in left-to-right languages. |
| `.visually-hidden { … }` | Hides text **visually** but keeps it for screen readers. Used for form labels the design doesn't show. (`display: none` would hide it from screen readers too.) |
| `.skip-link:focus { … }` | The "Skip to main content" link is hidden until a keyboard user presses ++tab++; then it appears in the corner. |
| `.btn { display: inline-flex; align-items: center; … }` | Turns the button into a small flex row, so an icon and text line up in the middle. `gap` is the space between them. |
| `border: 1px solid transparent;` | A transparent border, so the outline variant (which has a visible border) is exactly the same size. |
| `cursor: pointer;` | Shows the hand cursor. |
| `.btn:hover` | Darker green when the mouse is over it. |
| `.btn--outline` | The modifier: white background, green text and border. |
| `:focus-visible { outline: 3px solid var(--accent); }` | A thick yellow ring when someone uses the **keyboard**. `:focus-visible` (unlike `:focus`) doesn't show it on mouse clicks. Never remove focus outlines without replacing them. |

## Try it

1. Change `--brand` to `#7c3aed` and reload. Every button and the logo turn purple.
2. Delete the viewport `<meta>` line, open DevTools device mode (++ctrl+shift+m++) and see how tiny the text gets. Put it back.
3. Remove `box-sizing: border-box`, give `.container` a `padding: 20px`, and watch it overflow the screen on a phone.

### Solutions

Try each exercise yourself first, then open its solution to compare.

??? success "1. Change the brand colour"
    Edit the one token in `css/base.css`:

    ```css
    :root {
      --brand: #7c3aed;   /* was #0c831f */
    }
    ```

    The logo, every `.btn`, the outline buttons' border and text, and the price filter's checkboxes (`accent-color`) all turn purple,
    because they all read `var(--brand)`. `--brand-dark` (hover) and `--brand-soft` (pale backgrounds) are separate tokens: for a
    complete re-brand, change those too, for example `#5b21b6` and `#ede9fe`.

??? success "2. Remove the viewport meta tag"
    Without `<meta name="viewport" …>`, a phone lays the page out at about **980 px wide** (a pretend desktop) and then shrinks the
    whole thing to fit its screen. You see a tiny, zoomed-out page: text around 6–7 px, buttons too small to tap, and no media
    query for phones ever matches, because the page thinks it's 980 px wide. Put the line back and everything is normal size again.

??? success "3. Remove box-sizing: border-box"
    With the default `box-sizing: content-box`, `width` means the **content only**, and padding is added **on top**:

    | | `content-box` (default) | `border-box` |
    |---|---|---|
    | `.container` width on a 375 px phone | `min(100% - 32px, 1200px)` = 343 px | 343 px |
    | + `padding: 20px` (left + right) | 343 + 40 = **383 px** | stays **343 px** (padding goes inside) |
    | Result | 8 px wider than the 375 px screen → sideways scroll | fits |

    That's why every modern reset starts with `*, *::before, *::after { box-sizing: border-box; }`.

## Common mistakes

* Forgetting the viewport meta tag: the "responsive" site looks like a shrunken desktop on phones.
* Hard-coding `#0c831f` in 40 places instead of using a token, then needing to change the brand colour.
* Using `<div onclick>` instead of `<button>`: no keyboard support, no screen-reader role.
* Using headings for size (`<h4>` because it's small). Choose the level by structure and set the size in CSS.
