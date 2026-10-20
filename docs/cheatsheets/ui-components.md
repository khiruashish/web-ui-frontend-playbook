# UI Components & Patterns Cheat Sheet

For each common UI piece: the right HTML, the key CSS, and the keyboard and accessibility rules. Live versions: [See This → Write This](../reverse-engineering/recipes.md) and the [Layout Gallery](../examples/layouts.html).

## Components: HTML + CSS + a11y

| Component | HTML | Key CSS | Accessibility & keyboard |
|---|---|---|---|
| **Button** | `<button type="button">` | `padding: .7em 1.2em; border-radius: 8px;` `:hover` `:active { scale: .97 }` `:focus-visible` ring | ++enter++ / ++space++ activate. Icon-only needs `aria-label`. 44×44px target |
| **Link button** | `<a href class="btn">` | Same as button | Only when it navigates |
| **Toggle button** | `<button aria-pressed="false">` | `[aria-pressed=true] { … }` | State announced as "pressed" |
| **Switch** | `<input type="checkbox" role="switch">` | `appearance: none` + `::before` knob + `translate` | ++space++ toggles; announced "on/off" |
| **Badge / pill** | `<span class="pill">` | `border-radius: 999px; padding: .2em .7em; font-size: .75rem` | Don't rely on colour alone |
| **Avatar** | `<img alt="Name">` or initials `<span>` | `aspect-ratio: 1; border-radius: 50%; object-fit: cover` | `alt=""` if the name is next to it |
| **Card** | `<article>` + heading | `display: flex; flex-direction: column;` `overflow: hidden; border-radius` · footer `margin-top: auto` | Whole-card link: put the link on the heading and stretch it with `::after { inset: 0 }` |
| **Navbar** | `<header><nav aria-label="Primary"><ul>` | `display: flex; align-items: center; gap` · push actions with `margin-inline-start: auto` | `aria-current="page"` on the current link |
| **Mobile menu** | `<button popovertarget="m">` + `<nav id="m" popover>` | `:popover-open { display: flex; flex-direction: column }` | ++escape++ closes; focus returns to the button |
| **Breadcrumbs** | `<nav aria-label="Breadcrumb"><ol>` | `display: flex; gap` · separators via `li + li::before` | Last item `aria-current="page"` |
| **Tabs** | `role="tablist"` > `button role="tab" aria-selected aria-controls` + `role="tabpanel"` | Underline on `[aria-selected=true]` | ++arrow-left++ / ++arrow-right++ move between tabs; ++tab++ goes into the panel |
| **Accordion** | `<details name="g"><summary>` | `summary { list-style: none }` · rotate a chevron on `[open]` | Native: ++enter++ / ++space++ |
| **Modal** | `<dialog>` + `showModal()` | `::backdrop { background: rgb(0 0 0/.5) }` · `@starting-style` for entry | Focus moves in, ++escape++ closes, page inert. `aria-labelledby` the heading |
| **Drawer / off-canvas** | `<dialog>` positioned at the side | `margin: 0 0 0 auto; height: 100dvh;` slide with `translate` | Same as modal |
| **Dropdown menu** | `<button popovertarget>` + `[popover]` list of buttons/links | Anchor positioning or `position: fixed` | ++arrow-down++ / ++arrow-up++ for menu items if using `role="menu"` |
| **Tooltip** | `[popover="hint"]` or CSS `:hover/:focus-visible` | `position: absolute; bottom: calc(100% + 8px)` · arrow via borders | Show on focus too; `aria-describedby`; never hide essential info in tooltips |
| **Toast** | `<div role="status" popover="manual">` | `position: fixed; inset: auto 1rem 1rem auto` | `role="status"` (polite) or `role="alert"`; don't auto-dismiss errors |
| **Alert / banner** | `<div role="alert">` or `role="region" aria-label` | Coloured left border + icon + text | Text, not colour only |
| **Form field** | `<label for>` + `<input>` + hint `<p id>` | `display: grid; gap: .3rem` | `aria-describedby` → hint + error; `aria-invalid` |
| **Floating label** | `<input placeholder=" ">` + `<label>` after it | `input:not(:placeholder-shown) + label { top: 0; font-size: .75rem }` | Still a real `<label>` |
| **Search** | `<search><form><label><input type="search">` | `:focus-within` on the wrapper | Label can be visually hidden |
| **Select** | `<select>` | `appearance: base-select` (Chromium) or native | Native keyboard |
| **Checkbox / radio** | `<input type="checkbox">` / radios in `<fieldset><legend>` | `accent-color: var(--brand)` | Radios: arrow keys move within the group |
| **Range slider** | `<input type="range">` + `<output>` | `accent-color` | Arrow keys; label it |
| **Progress** | `<progress value max>` | `accent-color` or `::-webkit-progress-value` | Label it |
| **Meter** | `<meter value low high optimum>` | — | For measurements, not tasks |
| **Pagination** | `<nav aria-label="Pagination"><ul>` | `display: flex; gap` · current page filled | `aria-current="page"` |
| **Stepper** | `<ol>` | `counter-reset` + `::before` circles + `::after` lines | `aria-current="step"` |
| **Table** | `<table>` + `<caption>` + `<th scope>` | `border-collapse: collapse` · zebra `tr:nth-child(even)` · `position: sticky` header | Wrap in `role="region" tabindex="0"` if scrollable |
| **Skeleton** | `<div aria-busy="true">` | Shimmer gradient + `@keyframes` | Respect reduced motion |
| **Empty state** | Illustration + heading + text + one action | `display: grid; justify-items: center; text-align: center` | Decorative art `aria-hidden` |
| **Carousel** | `<ul>` in a scroll container | `display: flex; overflow-x: auto; scroll-snap-type: x mandatory` | Visible prev/next buttons, pause for autoplay |
| **Sticky header** | `<header>` | `position: sticky; top: 0; backdrop-filter: blur(10px)` | `html { scroll-padding-top }` so focus isn't hidden |
| **Skip link** | `<a class="skip" href="#main">` | Hidden until `:focus` | First focusable element on the page |

## Layout one-liners

| Need | CSS |
|---|---|
| Centre anything | `display: grid; place-items: center;` |
| Centre a block horizontally | `max-width: 60rem; margin-inline: auto;` |
| Row with spacing | `display: flex; gap: 1rem; align-items: center;` |
| Push last item to the end | `margin-inline-start: auto;` |
| Equal columns | `display: grid; grid-template-columns: repeat(3, 1fr);` |
| Responsive card grid | `grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));` |
| Sidebar + content | `grid-template-columns: 16rem 1fr;` |
| Sticky footer page | `body { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; }` |
| Full-bleed child | `width: 100vw; margin-inline: calc(50% - 50vw);` |
| Stack with even spacing | `.stack > * + * { margin-block-start: 1rem; }` or `display: flex; flex-direction: column; gap: 1rem;` |
| Overlay on image | Parent `display: grid;` children `grid-area: 1 / 1;` |
| Aspect-ratio box | `aspect-ratio: 16 / 9;` |
| Truncate one line | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` |
| Clamp to 3 lines | `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;` |
| Hide visually, keep for screen readers | `position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap;` |
| Scroll horizontally | `overflow-x: auto; overscroll-behavior-x: contain;` |
| No layout jump from scrollbar | `scrollbar-gutter: stable;` |
| Smooth anchor scrolling | `html { scroll-behavior: smooth; scroll-padding-top: 5rem; }` |

## Design token scales

```css
:root {
  /* Spacing: 4px base */
  --space-1: .25rem;  --space-2: .5rem;  --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem;  --space-6: 2rem;   --space-7: 3rem;   --space-8: 4rem;

  /* Type scale: ratio 1.25 */
  --text-xs: .8rem;  --text-sm: .875rem; --text-base: 1rem; --text-lg: 1.25rem;
  --text-xl: 1.563rem; --text-2xl: 1.953rem; --text-3xl: 2.441rem; --text-4xl: 3.052rem;

  /* Radius */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-full: 999px;

  /* Elevation (shadows) */
  --shadow-1: 0 1px 2px rgb(0 0 0 / .06), 0 1px 3px rgb(0 0 0 / .1);
  --shadow-2: 0 4px 12px rgb(0 0 0 / .08);
  --shadow-3: 0 12px 32px rgb(0 0 0 / .12);
  --shadow-4: 0 24px 64px rgb(0 0 0 / .18);

  /* Z-index */
  --z-dropdown: 100; --z-sticky: 200; --z-overlay: 300; --z-modal: 400; --z-toast: 500;

  /* Motion */
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 320ms;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);

  /* Layout */
  --content: 70rem; --measure: 65ch;
}
```

## Colour roles

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#ffffff` | `#121417` | Page background |
| `--surface` | `#f6f7f9` | `#1d2129` | Cards, panels |
| `--text` | `#1f2329` | `#e6e8ec` | Body text |
| `--muted` | `#5f6672` | `#a2a8b3` | Secondary text (still ≥ 4.5:1) |
| `--border` | `#e3e5ea` | `#2d323a` | Dividers |
| `--brand` | `#e4572e` | `#ff7a50` | Primary actions, links |
| `--success` · `--warning` · `--danger` | green · amber · red | lighter variants | Status, always with icon + text |
| `--focus` | `#3f51b5` | `#8ea2ff` | Focus rings (≥ 3:1 against neighbours) |

## Keyboard patterns

| Widget | Keys |
|---|---|
| Any page | ++tab++ / ++shift+tab++ move focus · ++enter++ activates links and buttons · ++space++ activates buttons, toggles checkboxes |
| Dialog | ++escape++ closes · ++tab++ stays inside |
| Menu / listbox | ++arrow-up++ ++arrow-down++ move · ++home++ ++end++ first/last · ++enter++ select · ++escape++ close · type-ahead |
| Tabs | ++arrow-left++ ++arrow-right++ switch · ++home++ ++end++ |
| Radio group | Arrow keys move and select |
| Accordion | ++enter++ / ++space++ toggle |
| Slider | Arrow keys step · ++page-up++ ++page-down++ big step · ++home++ ++end++ |
| Combobox | ++arrow-down++ opens list · ++enter++ selects · ++escape++ clears/closes |

## Accessibility quick checklist

- [ ] Semantic elements and landmarks (`header`, `nav`, `main`, `footer`)
- [ ] One `h1`; headings never skip levels
- [ ] Every image has `alt` (empty for decorative)
- [ ] Every input has a visible `<label>`
- [ ] Text contrast ≥ 4.5:1; UI and focus contrast ≥ 3:1
- [ ] Everything works with the keyboard; focus is always visible
- [ ] Targets ≥ 24×24px (44×44 for primary actions)
- [ ] No information conveyed by colour alone
- [ ] Errors described in text, linked with `aria-describedby`
- [ ] Respects `prefers-reduced-motion`; nothing auto-moves for > 5s without a pause button
- [ ] Works at 400% zoom without horizontal scrolling
- [ ] `lang` set on `<html>`; page `<title>` is meaningful

## Performance quick checklist

- [ ] LCP image: `fetchpriority="high"`, not lazy, preloaded if it's a CSS background
- [ ] All other images: `loading="lazy"`, `width`/`height`, AVIF/WebP, `srcset`
- [ ] Scripts: `defer` or `type="module"`
- [ ] Fonts: WOFF2, 1–2 files, `font-display: swap` or `optional`, preload the main one
- [ ] Animate only `transform` and `opacity`
- [ ] `content-visibility: auto` on long below-the-fold sections
- [ ] Reserve space for ads/embeds (`min-height`, `aspect-ratio`)
- [ ] Targets: LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1

## Current UI styles in a few lines

| Style | Core CSS |
|---|---|
| **Glassmorphism** | `background: rgb(255 255 255 / .15); backdrop-filter: blur(16px) saturate(1.6); border: 1px solid rgb(255 255 255 / .3);` |
| **Bento grid** | `display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 160px;` + `span 2` tiles + `border-radius: 20px` |
| **Neumorphism** | `background: #e6e9ef; box-shadow: 8px 8px 16px #c4c7cc, -8px -8px 16px #fff;` (low contrast: use sparingly) |
| **Aurora / mesh gradient** | Several `radial-gradient(at x y, color, transparent 50%)` layers |
| **Big bold type** | `font-size: clamp(2.5rem, 1rem + 7vw, 7rem); letter-spacing: -.04em; line-height: .95;` |
| **Gradient border** | `border: 2px solid transparent; background: linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg, a, b) border-box;` |
| **Soft cards** | `border-radius: 16px; box-shadow: 0 12px 32px rgb(0 0 0 / .08); border: 1px solid rgb(0 0 0 / .04);` |
| **Dark mode** | Tokens + `color-scheme: light dark` + `light-dark()` |
| **Micro-interaction** | `transition: scale .15s cubic-bezier(.34,1.56,.64,1); :active { scale: .95 }` |
| **Scroll reveal** | `animation: reveal linear both; animation-timeline: view(); animation-range: entry;` |
| **Page transitions** | `@view-transition { navigation: auto; }` |
