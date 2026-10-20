# Live Layout Gallery

[**Open the gallery full screen →**](../examples/layouts.html){ .md-button .md-button--primary }

One standalone, responsive HTML page with **18 layouts**. Each section has:

1. **What you see**: the layout described in plain English, the way a designer or product manager would describe it.
2. **The live layout**: resize your browser and watch it adapt.
3. **Show the HTML & CSS**: the exact code that's rendering it (the page is generated from one source, so the code shown can't drift from the code running).
4. **Why this works**: the two or three ideas that make it tick.

<iframe src="../../examples/layouts.html" title="Layout Gallery preview" style="width:100%;height:720px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px" loading="lazy"></iframe>

## What's in it

| # | Layout | Core technique | Level |
|---|---|---|---|
| 1 | Centering | `display: grid; place-items: center` | 🟢 |
| 2 | Holy grail | `grid-template-areas` + one media query | 🟢 |
| 3 | Sidebar that wraps | Flexbox with `flex-grow: 999` and `min-inline-size` | 🟡 |
| 4 | Pancake stack & sticky footer | `grid-template-rows: auto 1fr auto` | 🟢 |
| 5 | Responsive card grid | `repeat(auto-fit, minmax(min(180px, 100%), 1fr))` | 🟢 |
| 6 | 12-column grid | `repeat(12, minmax(0, 1fr))` + `span` | 🟡 |
| 7 | Bento grid | `grid-auto-rows` + `span` + `dense` | 🟡 |
| 8 | Masonry | CSS multi-column + `break-inside: avoid` | 🟡 |
| 9 | Split screen | Two `1fr` columns from 48em | 🟢 |
| 10 | Media object | Flexbox + `flex-shrink: 0` | 🟢 |
| 11 | Magazine | Line-based placement at 3 breakpoints | 🟡 |
| 12 | Dashboard | Nested grids + area-based shell | 🟡 |
| 13 | Pricing table | `auto-fit` grid + flex column cards + `scale` | 🟢 |
| 14 | Container-query card | `container-type` + `@container` | 🟠 |
| 15 | Full-bleed article | Named grid lines | 🟠 |
| 16 | Alternating features | `:nth-child(even)` + `order` | 🟡 |
| 17 | Landing hero | `clamp()` type + layered radial gradients | 🟢 |
| 18 | Docs layout with sticky sidebar | `position: sticky` + `align-self: start` | 🟡 |

## The page shell is a lesson too

View the page source and look at the top `<style>` block. The page itself demonstrates:

- **Design tokens** as custom properties on `:root`, with a dark theme that follows `prefers-color-scheme` and a manual toggle that overrides it (`:root[data-theme="dark"]`).
- A **sticky, blurred header** (`position: sticky` + `backdrop-filter`).
- A **navigation that collapses** into a `popover` menu below 64em, with no JavaScript for open and close.
- An **auto-fill table of contents** grid.
- A **skip link**, visible `:focus-visible` rings, 44px touch targets, and `scroll-padding-top` so anchor jumps don't hide under the sticky header.
- **Reduced motion** support.

## Exercise

1. Take a screenshot of any section.
2. Close the page.
3. Rebuild it from the screenshot alone, using the [7-step method](index.md).
4. Compare your CSS with the code in the section. Did you pick the same layout tool? If not, is yours better or worse, and why?
