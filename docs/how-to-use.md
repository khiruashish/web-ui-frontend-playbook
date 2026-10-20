# How to Use This Playbook

## Every page follows the same pattern

1. **Use**: one sentence on what the thing is for.
2. **Code**: a minimal, complete example you can copy.
3. **Output**: the same code, rendered live on the page in a box labelled **Output**.
4. **Notes**: common mistakes, and a **Senior note** with accessibility, performance or architecture advice.

```html
<button type="button">Save</button>
```

<div class="demo">
<button type="button">Save</button>
</div>

!!! tip "Senior note"
    Always set `type` on a `<button>`. Inside a `<form>`, a button with no type defaults to `type="submit"` and will submit the form when someone clicks it.

!!! note "About the Output boxes"
    Output boxes sit inside this documentation site, so they pick up a little of its base styling (font, link colour). That's intentional: it shows you how elements look inside a real styled page, not in a bare browser. For a completely unstyled view, paste the code into a blank `.html` file.

## Reading paths

=== "🟢 Beginner (0–2 yrs)"

    1. [HTML overview](html/index.md) → [Document structure](html/document-structure.md) → [Text content](html/text-content.md) → [Sectioning](html/sectioning.md) → [Forms](html/forms.md)
    2. [CSS overview](css/index.md) → [Fundamentals](css/fundamentals.md) → [Selectors](css/selectors.md) → [Colours & units](css/colors-units.md)
    3. [Flexbox](layout/flexbox.md) → [Grid](layout/grid.md) → [Responsive](layout/responsive.md)
    4. Rebuild three recipes from [See This → Write This](reverse-engineering/recipes.md) without looking at the code.

=== "🟡 Intermediate (2–5 yrs)"

    1. [Global attributes](html/global-attributes.md), [Interactive elements](html/interactive.md), [Media](html/media.md)
    2. [Positioning & stacking](css/positioning.md), [Animations](css/animations.md), [Custom properties](css/custom-properties.md)
    3. All of [Layout Patterns](layout/patterns.md); reproduce the [Layout Gallery](reverse-engineering/gallery.md) from scratch.

=== "🟠 Advanced (5–10 yrs)"

    1. [Modern CSS](css/modern-css.md): `:has()`, `@layer`, `@container`, subgrid, anchor positioning.
    2. [Accessibility](career/accessibility.md) and [Performance](career/performance.md).
    3. Read every orange and red "Senior note" across the site.

=== "🔴 Expert (10–15+ yrs)"

    1. [CSS Architecture at Scale](career/css-architecture.md).
    2. [Interview Questions](career/interview.md): use the 🔴 answers as a design-review checklist.
    3. Use the [Master Prompt](https://github.com/khiruashish/grocery-startup/blob/main/web-ui-frontend-playbook/MASTER_PROMPT.md) to extend the playbook for your team's stack.

## Try code yourself

- Create `test.html`, paste any example, and open it in a browser.
- Open DevTools (++f12++ or ++ctrl+shift+i++, ++cmd+opt+i++ on macOS). In the **Elements** panel, click the `flex` or `grid` badge next to an element to see its layout overlay.
- Toggle **device mode** (++ctrl+shift+m++) to test responsive layouts at phone widths.
