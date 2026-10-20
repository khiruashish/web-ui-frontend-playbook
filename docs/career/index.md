# Senior & Architect Track

At 0–5 years, the question is "how do I build this?" At 5–15+ years, it becomes:

- "Can **everyone** use this?" → [Accessibility](accessibility.md)
- "Is it **fast** on a ₹8,000 Android phone on a 3G connection?" → [Performance](performance.md)
- "Can **50 engineers** keep adding to this CSS for 5 years without it rotting?" → [CSS Architecture at Scale](css-architecture.md)
- "Can I **explain and defend** these decisions?" → [Interview Questions](interview.md)

## What changes as you get more senior

| | Mid-level | Senior | Staff / Principal |
|---|---|---|---|
| Scope | A feature | A product area | Many teams / the platform |
| CSS concern | "Does it look right?" | "Will it break somewhere else?" | "What system makes the wrong thing hard to do?" |
| Accessibility | Adds labels and alt text | Audits flows; fixes focus management | Builds accessible primitives into the design system; sets CI gates |
| Performance | Optimises images | Owns Core Web Vitals for a product | Sets budgets; chooses rendering architecture (SSR, streaming, islands) |
| Browser support | Tests in Chrome | Tests on real devices | Defines the support policy using Baseline; plans feature rollouts |
| Review | Gets reviewed | Reviews code | Reviews designs and architecture before code exists |
| Mentoring | Pairs occasionally | Mentors juniors | Grows other seniors; writes the team's playbook |

## The senior review checklist

Use this on any UI pull request:

- [ ] **Semantics**: correct elements (button vs link, headings in order, lists, landmarks)?
- [ ] **Keyboard**: everything reachable and operable with Tab, Enter, Space, Escape, arrows? Focus visible? Focus moved correctly on open/close?
- [ ] **Screen reader**: accessible names on every control? Dynamic changes announced?
- [ ] **Responsive**: works at 320px, at 200% zoom, in landscape?
- [ ] **Content resilience**: long words, long names, missing images, empty states, RTL?
- [ ] **Theming**: dark mode, high-contrast / forced-colours mode?
- [ ] **Motion**: respects `prefers-reduced-motion`?
- [ ] **Performance**: images sized and lazy-loaded (except LCP), no layout shift, animations on `transform`/`opacity`?
- [ ] **CSS**: uses tokens, no magic numbers, low specificity, no `!important`, no global leaks?
- [ ] **Browser support**: new features behind `@supports` or with an acceptable fallback?
