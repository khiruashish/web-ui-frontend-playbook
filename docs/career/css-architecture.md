# CSS Architecture at Scale

CSS is easy to write and hard to maintain. Every selector is global by default, and the cascade means a change in one file can break a page you've never seen. Architecture is about making the safe thing easy.

## The problems you're solving <span class="lvl lvl-3">Advanced</span> { #the-problems-youre-solving data-toc-label="The problems you&#x27;re solving" }

1. **Global namespace**: two teams both write `.card`.
2. **Specificity creep**: someone adds `#app .page .card` to win; the next person adds `!important`.
3. **Dead code**: nobody dares delete CSS because nobody knows what uses it.
4. **Inconsistency**: 47 shades of grey and 23 different paddings.
5. **Ordering bugs**: styles depend on which file loaded last.

## The main approaches <span class="lvl lvl-3">Advanced</span> { #the-main-approaches data-toc-label="The main approaches" }

=== "BEM"

    **Block, Element, Modifier**: a naming convention.

    ```css
    .card { }                 /* block */
    .card__title { }          /* element of the block */
    .card--featured { }       /* modifier */
    .card__title--large { }
    ```

    ✅ No tooling, flat specificity, readable.
    ❌ Relies on discipline; long class names; still global.

=== "Utility-first (Tailwind)"

    Small single-purpose classes composed in the HTML.

    ```html
    <div class="rounded-xl bg-white p-6 shadow-md md:flex md:gap-6">
      <h3 class="text-lg font-semibold text-gray-900">Title</h3>
    </div>
    ```

    ✅ No naming, no dead CSS (unused utilities are purged), consistent tokens, fast to build with.
    ❌ Noisy markup; design changes touch many templates unless components are extracted; a learning curve for the class vocabulary.

=== "CSS Modules"

    Class names are scoped automatically at build time.

    ```css
    /* Card.module.css */
    .title { font-weight: 600; }
    ```

    ```jsx
    import s from './Card.module.css';
    <h3 className={s.title}>…</h3>     // becomes class="Card_title__x7a2"
    ```

    ✅ Real scoping, plain CSS, dead code is obvious (delete the component, delete the CSS).
    ❌ Needs a bundler; theming across modules needs custom properties.

=== "CSS-in-JS"

    Styles written in JavaScript (styled-components, Emotion, vanilla-extract, Panda).

    ✅ Co-located with components, dynamic styles, typed tokens.
    ❌ Runtime libraries cost performance and don't fit React Server Components well. If you choose this, prefer **zero-runtime** options (vanilla-extract, Panda, StyleX) that compile to static CSS.

=== "Native: @layer + @scope"

    Modern CSS gives you most of the benefits natively.

    ```css
    @layer reset, tokens, base, components, utilities;

    @layer components {
      @scope (.card) {
        :scope { padding: var(--space-4); }
        .title { font-weight: 600; }
      }
    }
    ```

    ✅ No build step, predictable cascade, real scoping.
    ❌ `@scope` is newer (Baseline 2025); teams need to learn layers.

**There's no single right answer.** Pick based on team size, framework, and whether you ship a design system to other teams.

## A layered architecture that scales <span class="lvl lvl-4">Expert</span> { #a-layered-architecture-that-scales data-toc-label="A layered architecture that scales" }

```css
/* main.css */
@layer reset, tokens, base, layouts, components, utilities, overrides;

@import url("reset.css")       layer(reset);
@import url("tokens.css")      layer(tokens);       /* custom properties only */
@import url("base.css")        layer(base);         /* element defaults: body, a, h1… */
@import url("layouts.css")     layer(layouts);      /* .stack, .cluster, .sidebar, .grid */
@import url("components/*.css") layer(components);  /* (bundled) */
@import url("utilities.css")   layer(utilities);    /* .visually-hidden, .text-center */
/* third-party CSS goes in 'base' or its own low layer, so your components always win */
```

| Layer | Contains | Specificity | Rule |
|---|---|---|---|
| reset | Normalisation | `:where()` → 0 | Never edited per project |
| tokens | `:root { --… }` | — | The only place raw values live |
| base | Element selectors | Low | No classes |
| layouts | Layout primitives | One class | No colours or typography |
| components | One block per component | One or two classes | Uses tokens only |
| utilities | Single-purpose helpers | One class | Allowed to override components (layer order, not `!important`) |

## Layout primitives <span class="lvl lvl-3">Advanced</span> { #layout-primitives data-toc-label="Layout primitives" }

Reusable layout classes, independent of components (from the *Every Layout* approach):

```css
.stack   > * + * { margin-block-start: var(--stack-space, 1rem); }
.cluster { display: flex; flex-wrap: wrap; gap: var(--cluster-space, 1rem); align-items: center; }
.center  { box-sizing: content-box; max-inline-size: var(--measure, 65ch); margin-inline: auto; padding-inline: 1rem; }
.auto-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--min, 15rem), 100%), 1fr)); gap: 1rem; }
.switcher { display: flex; flex-wrap: wrap; gap: 1rem; }
.switcher > * { flex-grow: 1; flex-basis: calc((40rem - 100%) * 999); }   /* row ↔ column at 40rem, no media query */
```

Components then focus on looks, not layout.

## Enforcing it <span class="lvl lvl-4">Expert</span> { #enforcing-it data-toc-label="Enforcing it" }

| Tool | Enforces |
|---|---|
| **Stylelint** (`stylelint-config-standard`, `stylelint-order`) | Syntax, no `!important`, max specificity, no ID selectors, property order |
| `stylelint-declaration-strict-value` | Colours, spacing and z-index must use tokens |
| **Visual regression** (Playwright screenshots, Chromatic, Percy) | Catches unintended visual changes on every PR |
| **Design tokens pipeline** (Style Dictionary, Terrazzo) | One source → CSS, iOS, Android, Figma |
| **Storybook** | Every component state documented and testable in isolation |
| **Bundle analysis** + Coverage | Dead and duplicated CSS |

```json title=".stylelintrc.json"
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "declaration-no-important": true,
    "selector-max-id": 0,
    "selector-max-specificity": "0,3,1",
    "selector-max-compound-selectors": 3,
    "color-named": "never",
    "color-no-hex": [true, { "severity": "warning" }]
  }
}
```

!!! tip "Senior note · 🔴 Expert"
    The most durable architecture decision is **tokens + a small set of layout primitives + accessible component primitives**, whatever styling technology sits on top. Technologies change every few years (Sass → CSS-in-JS → utilities → native layers); tokens, primitives and documented decisions survive migrations. Write an ADR (Architecture Decision Record) for the styling approach so future engineers know *why*, not just *what*.
