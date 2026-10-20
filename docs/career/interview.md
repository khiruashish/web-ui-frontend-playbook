# Interview Questions (graded by level)

Click a question to reveal a model answer. Answers are short on purpose: in an interview, lead with the core idea, then add depth if asked.

## 🟢 Beginner (0–2 years)

??? question "What's the difference between an element and a tag?"
    A **tag** is the markup text (`<p>`, `</p>`). An **element** is the whole thing: opening tag, content and closing tag, which becomes a node in the DOM.

??? question "Why do we need `<!doctype html>`?"
    It switches the browser into **standards mode**. Without it, browsers use "quirks mode", which emulates old browser bugs (for example, a different box model).

??? question "What is semantic HTML and why does it matter?"
    Using elements for their meaning (`<nav>`, `<button>`, `<article>`) instead of generic `<div>`s. It gives accessibility (roles, keyboard support), SEO and maintainability for free.

??? question "`<button>` vs `<a>`?"
    Links **navigate** (change the URL). Buttons **perform actions** (submit, open, toggle). Using the wrong one breaks keyboard and screen reader expectations.

??? question "Block vs inline vs inline-block?"
    Block: new line, full width, respects width/height. Inline: flows in text, ignores width/height and vertical margins. Inline-block: flows in text but respects width/height/margins.

??? question "Explain the box model."
    Content → padding → border → margin. With the default `box-sizing: content-box`, `width` sets the content only; with `border-box`, `width` includes padding and border, which is why every reset uses `border-box`.

??? question "How do you centre a div?"
    `display: grid; place-items: center` on the parent. Or flexbox with `justify-content: center; align-items: center`. For horizontal centring of a block with a width: `margin-inline: auto`.

??? question "`rem` vs `em` vs `px`?"
    `px` is fixed. `em` is relative to the element's own font size (compounds when nested). `rem` is relative to the root font size and respects the user's browser setting. Use `rem` for font sizes and most spacing.

??? question "What does the viewport meta tag do?"
    `width=device-width, initial-scale=1` tells mobile browsers to use the real device width. Without it, they lay out at ~980px and zoom out, so media queries don't work as expected.

??? question "What's the difference between `display: none` and `visibility: hidden`?"
    `display: none` removes the element from layout and the accessibility tree. `visibility: hidden` hides it but keeps its space.

## 🟡 Intermediate (2–5 years)

??? question "Explain specificity. Which wins: `#nav a` or `.menu .item a:hover`?"
    Specificity is (IDs, classes/attributes/pseudo-classes, types). `#nav a` = (1,0,1). `.menu .item a:hover` = (0,3,1). IDs are compared first, so `#nav a` wins.

??? question "Flexbox vs Grid: when do you use each?"
    Flexbox for one-dimensional layouts where content size drives layout (navbars, toolbars, button groups). Grid for two-dimensional layouts where you define tracks and place items (page layouts, card grids, dashboards). They're often nested.

??? question "Why won't my `z-index: 9999` go on top?"
    `z-index` only competes within the same **stacking context**. If an ancestor creates a stacking context (via `opacity < 1`, `transform`, `filter`, `position` + `z-index`, `isolation`…) that sits below another, nothing inside it can escape. Fix the ancestor's stacking, or use the top layer (`<dialog>`, `popover`).

??? question "What is margin collapse?"
    Adjacent vertical margins of block elements in normal flow merge into the larger one. It doesn't happen in flex/grid containers, or when padding, a border or a new BFC separates them.

??? question "What's the difference between `auto-fill` and `auto-fit`?"
    Both create as many tracks as fit. With few items, `auto-fill` keeps the empty tracks; `auto-fit` collapses them so items stretch to fill the row.

??? question "How does `position: sticky` work, and why does it sometimes fail?"
    It's relative until the element hits its offset (`top: 0`) within its nearest scrolling ancestor, then it sticks. It fails when there's no offset, when an ancestor has `overflow: hidden/auto`, or when the parent isn't taller than the sticky element (common in stretched flex/grid items: add `align-self: start`).

??? question "How do you implement dark mode?"
    Define colours as custom properties, switch them under `@media (prefers-color-scheme: dark)`, set `color-scheme: light dark` so native controls adapt, and add a `[data-theme]` override for a manual toggle stored in `localStorage`. `light-dark()` shortens this.

??? question "How do responsive images work?"
    `srcset` with width descriptors lists candidate files, `sizes` tells the browser how wide the image will display, and the browser picks the best file for the screen's width and pixel density. `<picture>` with `<source media>` is for art direction (different crops), and `<source type>` for format fallbacks (AVIF → WebP → JPEG).

??? question "`defer` vs `async`?"
    Both download in parallel without blocking parsing. `defer` executes in order after parsing finishes. `async` executes as soon as it downloads, in any order. Modules are deferred by default.

??? question "Which CSS properties are cheap to animate, and why?"
    `transform` and `opacity`: the compositor handles them on the GPU without re-running layout or paint. Animating `width`, `height`, `top` or `margin` triggers layout on every frame.

## 🟠 Advanced (5–10 years)

??? question "Explain the full cascade order."
    Origin and importance (transitions > `!important` user-agent > `!important` user > `!important` author > animations > normal author > user > user-agent) → context (shadow DOM) → element-attached styles → cascade layers → specificity → order of appearance.

??? question "What problem does `@layer` solve? How does `!important` interact with layers?"
    It orders groups of styles by intent, so a later layer wins regardless of specificity. That makes integrating resets, third-party CSS and utilities predictable without `!important`. Unlayered styles beat all layers. For `!important` declarations the layer order **reverses**, so earlier layers win, which lets low layers protect critical rules.

??? question "Media queries vs container queries?"
    Media queries respond to the viewport; container queries respond to an ancestor's size (or custom-property style). Use media queries for page-level layout and container queries for reusable components that can appear in slots of different widths.

??? question "What can `:has()` replace, and what are its performance considerations?"
    Parent and previous-sibling styling that used to need JavaScript: form-level error states, layout changes based on content, toggles without JS. Broad selectors like `body:has(.x)` can trigger expensive style invalidation on DOM changes; keep the anchor element close and the argument specific (`.card:has(> img)`).

??? question "How do you make a custom component (e.g. a dropdown) accessible?"
    First check for a native element (`<select>`, `<details>`, popover). If custom: correct roles and states following the ARIA Authoring Practices pattern, full keyboard support (arrows, Home/End, Escape, typeahead), focus management, an accessible name, `aria-expanded`/`aria-controls`, and testing with real screen readers.

??? question "How do you diagnose and fix a poor CLS score?"
    Find the shifting elements (DevTools Performance → Layout Shifts, or the `web-vitals` attribution build). Typical fixes: `width`/`height` or `aspect-ratio` on media, reserved space for ads and embeds, font metric overrides or `font-display: optional`, not inserting content above existing content, and animating with `transform` instead of layout properties.

??? question "What creates a containing block for `position: fixed`?"
    Normally the viewport. But an ancestor with `transform`, `perspective`, `filter`, `backdrop-filter`, `contain: paint/layout`, or `will-change` naming one of these becomes the containing block, so the "fixed" element scrolls with it.

??? question "How would you build a fully accessible modal today?"
    `<dialog>` + `showModal()`: it gives you the top layer, inert background, Escape to close, and focus moved inside and returned on close. Add `aria-labelledby` to its heading, style `::backdrop`, lock page scroll with `html:has(dialog[open]) { overflow: hidden }`, and use `@starting-style` for the entry animation.

## 🔴 Expert (10–15+ years)

??? question "How would you structure CSS for a 50-engineer product with a shared design system?"
    Tokens as the single source of truth (generated for web, iOS, Android and Figma). A cascade-layer architecture (reset, tokens, base, layouts, components, utilities). Scoped component styles (CSS Modules, `@scope`, or zero-runtime CSS-in-JS). Accessible primitives built once in the design system. Stylelint rules for tokens, specificity and `!important`; visual regression and axe in CI; Storybook docs; ADRs for each major decision; and a deprecation process for old components.

??? question "How do you decide which new CSS features a team may use?"
    Use Baseline as the default policy ("widely available" is free to use; "newly available" with `@supports` fallbacks). Cross-check with your own analytics (which browsers your users actually have). Require progressive enhancement: the experience must work without the feature. Document approved features and their fallbacks in the team's guidelines, and review the list every quarter.

??? question "Utility-first CSS vs component CSS: how do you choose?"
    Utilities: fast iteration, guaranteed token use, no dead CSS, great for app teams owning their own UI. Component CSS: cleaner markup, better for a design system consumed by many teams and frameworks, easier to theme at the component level. Many orgs combine them: a component library styled internally, with utilities for layout glue. The deciding factors are team size and structure, how many consumers there are, and whether you need framework independence.

??? question "A page's INP is 450 ms on mid-range Android. Walk through your approach."
    Measure first with RUM attribution to find the slow interactions and their phase (input delay, processing, presentation). Typical causes: long main-thread tasks from hydration or third-party scripts, heavy event handlers, huge DOM style recalculations. Fixes: break up long tasks (`scheduler.yield()`), defer non-critical JS, replace JS widgets with native elements, use `content-visibility` and containment to shrink rendering work, cut DOM size, and move work off the main thread. Verify with field data after release, not just lab data.

??? question "How do you make accessibility sustainable rather than a one-off audit?"
    Shift left: accessible primitives in the design system, accessibility acceptance criteria in tickets, design reviews that check focus order and contrast, automated checks in CI as a floor (not a ceiling), manual keyboard and screen-reader testing on critical flows each release, accessibility champions in each team, and including disabled users in research. Track issues as bugs with severity, not as "nice to have".

??? question "Explain the trade-offs of Shadow DOM for a cross-framework design system."
    Pros: true style encapsulation, framework-agnostic custom elements, slots for composition. Cons: global styles (resets, fonts, utilities) don't reach inside; theming needs custom properties and `::part`; SSR needs declarative shadow DOM; form participation needs `ElementInternals`; ARIA ID references can't cross shadow boundaries yet (reference target is still being standardised). Many teams use light-DOM components with `@scope` or CSS Modules instead, unless they truly need to serve multiple frameworks.
