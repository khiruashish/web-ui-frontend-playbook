# Accessibility

About 1 in 6 people worldwide lives with a significant disability (WHO, 2023). Add temporary and situational limits (a broken arm, bright sunlight, a baby in one arm) and accessibility affects everyone. In many countries it's also a legal requirement: the European Accessibility Act has applied to most consumer digital products since June 2025, and India's Rights of Persons with Disabilities Act covers many digital services.

The standard is **WCAG 2.2, level AA**.

## The four principles: POUR <span class="lvl lvl-2">Intermediate</span> { #the-four-principles-pour data-toc-label="The four principles: POUR" }

| Principle | Means | Examples |
|---|---|---|
| **Perceivable** | Users can sense the content | Alt text, captions, contrast, no info by colour alone |
| **Operable** | Users can operate the UI | Keyboard access, enough time, no seizure triggers, target size |
| **Understandable** | Users can understand it | Clear labels, predictable behaviour, helpful errors |
| **Robust** | Works with assistive tech | Valid HTML, correct name/role/value |

## The 15 checks that catch most problems <span class="lvl lvl-2">Intermediate</span> { #the-15-checks-that-catch-most-problems data-toc-label="The 15 checks that catch most problems" }

| # | Check | WCAG | How |
|---|---|---|---|
| 1 | Every image has appropriate `alt` (empty for decorative) | 1.1.1 | Inspect / axe |
| 2 | Video has captions | 1.2.2 | `<track kind="captions">` |
| 3 | Headings form a logical outline | 1.3.1 | HeadingsMap extension |
| 4 | Form fields have visible labels, programmatically linked | 1.3.1, 3.3.2 | `<label for>` |
| 5 | Inputs have `autocomplete` tokens for personal data | 1.3.5 | |
| 6 | Text contrast ≥ 4.5:1 (≥ 3:1 for large text) | 1.4.3 | DevTools colour picker |
| 7 | UI component and focus ring contrast ≥ 3:1 | 1.4.11 | |
| 8 | Works at 320px wide / 400% zoom without horizontal scroll | 1.4.10 | Zoom the browser |
| 9 | Text spacing can be increased without breaking | 1.4.12 | Text spacing bookmarklet |
| 10 | Everything works with the keyboard alone | 2.1.1 | Unplug the mouse |
| 11 | No keyboard traps | 2.1.2 | Tab through modals |
| 12 | Focus is always visible and not hidden under sticky headers | 2.4.7, 2.4.11 | Tab through the page |
| 13 | Targets at least 24×24 CSS px | 2.5.8 | |
| 14 | Errors are described in text and linked to the field | 3.3.1 | `aria-describedby` |
| 15 | Custom controls expose name, role, state | 4.1.2 | Accessibility tree in DevTools |

## Semantic HTML first <span class="lvl lvl-1">Beginner</span> { #semantic-html-first data-toc-label="Semantic HTML first" }

Native elements come with keyboard support, roles and states built in. Compare:

```html
<!-- ❌ 1 line of HTML that needs ~20 lines of JS to become accessible -->
<div class="btn" onclick="save()">Save</div>

<!-- ✅ Accessible by default -->
<button type="button" onclick="save()">Save</button>
```

What the `<div>` version is missing: focusability (`tabindex="0"`), a role (`role="button"`), ++enter++ and ++space++ key handlers, disabled state, form submission behaviour, and the "button" announcement.

## Focus management <span class="lvl lvl-3">Advanced</span> { #focus-management data-toc-label="Focus management" }

```css
/* Never remove outlines without a replacement. This is a strong, accessible default: */
:focus-visible {
  outline: 3px solid #3f51b5;
  outline-offset: 2px;
}

/* Keep focused elements visible under sticky headers (WCAG 2.4.11) */
html { scroll-padding-top: 5rem; }
```

Rules for dynamic UI:

- **Opening a dialog**: move focus into it (`showModal()` does this). **Closing**: return focus to the button that opened it (`<dialog>` does this too).
- **Navigating in a single-page app**: move focus to the new page's `<h1>` (with `tabindex="-1"`) or announce the route change.
- **Deleting an item from a list**: move focus to the next item, or to the list heading.
- **Off-canvas menus**: make the background `inert`.

## Colour and contrast <span class="lvl lvl-2">Intermediate</span> { #colour-and-contrast data-toc-label="Colour and contrast" }

```html
<p style="color:#999;background:#fff">#999 on white: 2.8:1 ✗ fails</p>
<p style="color:#767676;background:#fff">#767676 on white: 4.5:1 ✓ passes AA</p>
<p style="color:#595959;background:#fff">#595959 on white: 7:1 ✓ passes AAA</p>
```

<div class="demo">
<p style="color:#999;background:#fff;padding:.3em .6em;margin:.2em 0">#999 on white: 2.8:1 ✗ fails</p>
<p style="color:#767676;background:#fff;padding:.3em .6em;margin:.2em 0">#767676 on white: 4.5:1 ✓ passes AA</p>
<p style="color:#595959;background:#fff;padding:.3em .6em;margin:.2em 0">#595959 on white: 7:1 ✓ passes AAA</p>
</div>

Never use colour **alone** to convey meaning. A red border for an error also needs an icon and text.

## Forced colours (Windows High Contrast) <span class="lvl lvl-3">Advanced</span> { #forced-colours-windows-high-contrast data-toc-label="Forced colours (Windows High Contrast)" }

In forced-colours mode, the OS replaces your colours. Backgrounds and box-shadows disappear, so anything that relies on them for meaning (custom checkboxes, focus rings drawn with `box-shadow`) vanishes.

```css
@media (forced-colors: active) {
  .btn { border: 2px solid ButtonText; }        /* system colour keywords */
  .custom-check:checked { background: Highlight; }
}
/* Use outline (not box-shadow) for focus: outlines survive forced colours. */
```

## Live regions <span class="lvl lvl-3">Advanced</span> { #live-regions data-toc-label="Live regions" }

Announce changes that happen without a page load:

```html
<div aria-live="polite" id="cart-status"></div>   <!-- "2 items in cart" -->
<div role="alert">Payment failed. Check your card details.</div>  <!-- assertive -->
```

The live region must exist in the DOM **before** you change its content, or screen readers may not announce it.

## Testing toolkit <span class="lvl lvl-2">Intermediate</span> { #testing-toolkit data-toc-label="Testing toolkit" }

| Tool | Catches |
|---|---|
| **axe DevTools** / Lighthouse | ~30–40% of issues automatically (contrast, missing labels, ARIA misuse) |
| **Keyboard only** | Focus order, traps, missing focus styles, unreachable controls |
| **Screen readers**: NVDA (Windows, free), VoiceOver (macOS/iOS, built in), TalkBack (Android) | Names, roles, announcements, reading order |
| **Zoom to 400%** | Reflow and overlap bugs |
| **DevTools → Rendering → Emulate vision deficiencies** | Colour-only meaning |
| **`@axe-core/playwright`** in CI | Regressions on every PR |

!!! tip "Senior note · 🔴 Expert"
    Automated tools can't tell you if alt text is *meaningful*, if focus order is *logical*, or if an error message is *helpful*. Budget for manual testing of every critical flow (sign-up, checkout, search) with a keyboard and at least one screen reader, and include disabled users in research. Bake accessible primitives (dialog, menu, tabs, combobox) into the design system once, so product teams don't re-implement them badly.
