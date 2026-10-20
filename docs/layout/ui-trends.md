# Latest UI Trends (2024–2026)

Trends come and go. What matters is knowing **how** each one is built and **when** it hurts usability. Each trend below has a working snippet and a "watch out" note.

## Bento grids <span class="lvl lvl-2">Intermediate</span> { #bento-grids data-toc-label="Bento grids" }

Feature sections laid out like a Japanese bento box: tiles of mixed sizes, rounded corners, generous gaps. Popularised by Apple keynotes.

**Build it with:** CSS Grid, `grid-auto-rows`, `span`. See [Layout Patterns → Bento](patterns.md#9-bento-grid).

**Watch out:** on mobile, collapse to 1–2 columns. Keep reading order logical in the DOM.

## Glassmorphism <span class="lvl lvl-2">Intermediate</span> { #glassmorphism data-toc-label="Glassmorphism" }

Frosted-glass panels over colourful backgrounds. Apple's 2025 "Liquid Glass" brought it back in a big way.

```css
.glass {
  background: rgb(255 255 255 / .15);
  backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgb(255 255 255 / .3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgb(0 0 0 / .2), inset 0 1px 0 rgb(255 255 255 / .4);
}
@media (prefers-reduced-transparency: reduce) {
  .glass { background: rgb(30 30 40 / .95); backdrop-filter: none; }
}
```

<div class="demo">
<div style="padding:2em;border-radius:14px;background:radial-gradient(circle at 20% 30%,#ff6f91,transparent 40%),radial-gradient(circle at 80% 70%,#3f51b5,transparent 45%),radial-gradient(circle at 60% 20%,#f3a712,transparent 40%),#1f2329">
  <div style="max-width:280px;padding:1.4em;color:#fff;background:rgb(255 255 255 / .15);backdrop-filter:blur(16px) saturate(1.6);-webkit-backdrop-filter:blur(16px) saturate(1.6);border:1px solid rgb(255 255 255 / .3);border-radius:20px;box-shadow:0 8px 32px rgb(0 0 0 / .2),inset 0 1px 0 rgb(255 255 255 / .4)">
    <strong style="font-size:1.2em">Glass card</strong><p style="margin:.4em 0 0">Blurs and saturates the gradient behind it.</p>
  </div>
</div>
</div>

**Watch out:** text contrast over unpredictable backgrounds (check WCAG 4.5:1), and GPU cost of many blurred layers.

## Gradient meshes and aurora backgrounds <span class="lvl lvl-2">Intermediate</span> { #gradient-meshes-and-aurora-backgrounds data-toc-label="Gradient meshes and aurora backgrounds" }

Soft, blurry, multi-colour backgrounds made from stacked radial gradients.

```css
.aurora {
  background:
    radial-gradient(at 20% 20%, oklch(75% .18 30) 0, transparent 50%),
    radial-gradient(at 80% 10%, oklch(70% .15 280) 0, transparent 50%),
    radial-gradient(at 50% 90%, oklch(80% .15 160) 0, transparent 50%),
    oklch(97% .01 260);
}
```

<div class="demo">
<div style="height:150px;border-radius:14px;background:radial-gradient(at 20% 20%,oklch(75% .18 30) 0,transparent 50%),radial-gradient(at 80% 10%,oklch(70% .15 280) 0,transparent 50%),radial-gradient(at 50% 90%,oklch(80% .15 160) 0,transparent 50%),oklch(97% .01 260)"></div>
</div>

## Big, bold typography <span class="lvl lvl-1">Beginner</span> { #big-bold-typography data-toc-label="Big, bold typography" }

Huge headlines (`clamp(3rem, 8vw, 8rem)`), tight letter-spacing, variable fonts, `text-wrap: balance`.

```css
.display {
  font-size: clamp(2.5rem, 1rem + 7vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: .95;
  text-wrap: balance;
}
```

<div class="demo">
<p style="font-size:clamp(2rem,1rem + 5vw,4.5rem);font-weight:800;letter-spacing:-.04em;line-height:.95;text-wrap:balance;margin:0">Ship interfaces people love.</p>
</div>

## Dark mode by default <span class="lvl lvl-2">Intermediate</span> { #dark-mode-by-default data-toc-label="Dark mode by default" }

Not a trend anymore, an expectation. Use `color-scheme`, `light-dark()` and tokens. See [Custom Properties → Dark mode](../css/custom-properties.md#dark-mode).

**Watch out:** don't use pure black (`#000`) backgrounds with pure white text; it causes halation for many people. Use something like `#121417` and `#e6e8ec`. Reduce shadow use in dark mode and use lighter surfaces for elevation instead.

## Neumorphism (soft UI) <span class="lvl lvl-2">Intermediate</span> { #neumorphism-soft-ui data-toc-label="Neumorphism (soft UI)" }

Elements look extruded from the background, using two opposing shadows.

```css
.neu {
  background: #e6e9ef;
  border-radius: 20px;
  box-shadow: 8px 8px 16px #c4c7cc, -8px -8px 16px #ffffff;
}
.neu:active { box-shadow: inset 6px 6px 12px #c4c7cc, inset -6px -6px 12px #ffffff; }
```

<div class="demo">
<div style="background:#e6e9ef;padding:1.5em;border-radius:14px;display:flex;gap:1.5em">
  <button style="background:#e6e9ef;border:0;border-radius:20px;padding:1em 1.6em;box-shadow:8px 8px 16px #c4c7cc,-8px -8px 16px #fff;color:#555;font-weight:700" onmousedown="this.style.boxShadow='inset 6px 6px 12px #c4c7cc, inset -6px -6px 12px #fff'" onmouseup="this.style.boxShadow='8px 8px 16px #c4c7cc,-8px -8px 16px #fff'">Press me</button>
</div>
</div>

**Watch out:** very low contrast; buttons don't look like buttons. Use sparingly, never for primary actions.

## Micro-interactions <span class="lvl lvl-2">Intermediate</span> { #micro-interactions data-toc-label="Micro-interactions" }

Small animated feedback: a button that squishes, a heart that pops, a checkbox that draws its tick.

```css
.like { transition: scale .15s cubic-bezier(.34, 1.56, .64, 1); }
.like:active { scale: .85; }
.like[aria-pressed="true"] { color: crimson; animation: pop .3s; }
@keyframes pop { 50% { scale: 1.35; } }
```

<div class="demo">
<button class="ui-like" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') !== 'true')">♥ Like</button>
<style>
  .ui-like { font-size: 1.2em; border: 1px solid var(--demo-border); background: transparent; color: inherit; border-radius: 99px; padding: .4em 1em; transition: scale .15s cubic-bezier(.34,1.56,.64,1); }
  .ui-like:active { scale: .85; }
  .ui-like[aria-pressed="true"] { color: crimson; border-color: crimson; animation: pb-pop .3s; }
  @keyframes pb-pop { 50% { scale: 1.35; } }
</style>
</div>

## Skeleton loaders <span class="lvl lvl-1">Beginner</span> { #skeleton-loaders data-toc-label="Skeleton loaders" }

Grey placeholder shapes while content loads; they feel faster than spinners. See [Animations → keyframes](../css/animations.md#keyframes-and-animation).

## Scroll-driven storytelling <span class="lvl lvl-3">Advanced</span> { #scroll-driven-storytelling data-toc-label="Scroll-driven storytelling" }

Elements that reveal, scale or pin as you scroll, now possible in pure CSS with `animation-timeline: view()`. See [Animations → scroll-driven](../css/animations.md#scroll-driven-animations).

## Page transitions <span class="lvl lvl-3">Advanced</span> { #page-transitions data-toc-label="Page transitions" }

App-like transitions between pages in plain multi-page sites with `@view-transition { navigation: auto; }`. See [Animations → view transitions](../css/animations.md#view-transitions).

## Visual builders (Webflow, Framer) vs hand-written CSS <span class="lvl lvl-4">Expert</span> { #visual-builders-webflow-framer-vs-hand-written-css data-toc-label="Visual builders (Webflow, Framer) vs hand-written CSS" }

Tools like **Webflow** and **Framer** let designers build responsive sites visually. Under the hood they generate exactly the CSS in this playbook:

| Builder panel | CSS it writes |
|---|---|
| "Layout: Flex, Direction: Horizontal, Align: Center" | `display:flex; flex-direction:row; align-items:center` |
| "Grid, 3 columns, Gap 24" | `display:grid; grid-template-columns:repeat(3,1fr); gap:24px` |
| Breakpoint tabs (Desktop → Tablet → Phone) | Desktop-first `@media (max-width: …)` overrides |
| "Classes" and "Combo classes" | Class selectors and compound selectors (`.btn.is-primary`) |
| Interactions panel | Transitions, keyframes, or JS-driven animations |
| Global swatches / variables | CSS custom properties |

**When a builder is the right call:** marketing sites, landing pages, content teams who need to ship without engineers.
**When hand-written code wins:** complex app UI, strict performance budgets, a shared design system, accessibility requirements beyond the defaults, and anything that needs code review and version control.

Knowing the CSS underneath is what lets you debug a builder's output, export it, or decide to leave it.
