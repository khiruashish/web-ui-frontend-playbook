# Typography

## Font family and stacks <span class="lvl lvl-1">Beginner</span> { #font-family-and-stacks data-toc-label="Font family and stacks" }

```css
/* System UI stack: fast (no download), native look */
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif; }

/* Generic families */
font-family: serif;
font-family: sans-serif;
font-family: monospace;
font-family: ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace;
font-family: cursive;
font-family: system-ui;
```

<div class="demo">
<p style="font-family:serif;margin:.2em 0;font-size:1.2em">serif: The quick brown fox</p>
<p style="font-family:sans-serif;margin:.2em 0;font-size:1.2em">sans-serif: The quick brown fox</p>
<p style="font-family:monospace;margin:.2em 0;font-size:1.2em">monospace: The quick brown fox</p>
<p style="font-family:cursive;margin:.2em 0;font-size:1.2em">cursive: The quick brown fox</p>
<p style="font-family:system-ui;margin:.2em 0;font-size:1.2em">system-ui: The quick brown fox</p>
</div>

The browser uses the first font in the list that's available, so always end with a generic family.

## Loading web fonts with `@font-face` <span class="lvl lvl-2">Intermediate</span> { #loading-web-fonts-with-font-face data-toc-label="Loading web fonts with @font-face" }

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Variable.woff2") format("woff2");
  font-weight: 100 900;          /* variable font: the full range in one file */
  font-style: normal;
  font-display: swap;            /* show fallback text immediately, swap when loaded */
  unicode-range: U+0000-00FF;    /* only download for these characters */
}
body { font-family: "Inter", system-ui, sans-serif; }
```

| `font-display` | Behaviour |
|---|---|
| `auto` | Browser decides (usually `block`) |
| `block` | Invisible text up to ~3s, then fallback |
| `swap` | Fallback immediately, swap when ready (risk: layout shift) |
| `fallback` | ~100ms invisible, swap only if it loads within ~3s |
| `optional` | ~100ms; if not ready, use the fallback for this page view. Best for CLS. |

!!! tip "Senior note · 🟠 Advanced"
    To prevent layout shift when the web font swaps in, adjust the fallback font's metrics to match: `@font-face { font-family: "Inter Fallback"; src: local("Arial"); size-adjust: 107%; ascent-override: 90%; }`. Next.js and Fontaine generate these values automatically. Preload only the one or two most critical font files.

## Font properties <span class="lvl lvl-1">Beginner</span> { #font-properties data-toc-label="Font properties" }

```css
font-size: 1.125rem;
font-weight: 400;          /* 100–900, or normal / bold */
font-style: italic;
line-height: 1.5;          /* unitless: scales with font-size (recommended) */
font: italic 600 1.25rem/1.4 Georgia, serif;  /* shorthand: style weight size/line-height family */
font-variant-numeric: tabular-nums;   /* aligned digits in tables */
font-variant-caps: small-caps;
font-feature-settings: "liga" 1, "ss01" 1;
font-variation-settings: "wght" 650, "wdth" 85;   /* variable font axes */
```

<div class="demo">
<p style="font-weight:300;margin:.2em 0">weight 300 light</p>
<p style="font-weight:400;margin:.2em 0">weight 400 regular</p>
<p style="font-weight:700;margin:.2em 0">weight 700 bold</p>
<p style="font-weight:900;margin:.2em 0">weight 900 black</p>
<p style="font-style:italic;margin:.2em 0">italic</p>
<p style="font-variant-caps:small-caps;margin:.2em 0">Small Caps Text</p>
<p style="font-variant-numeric:tabular-nums;margin:.2em 0;font-family:system-ui">tabular: 111.11 / 999.99</p>
</div>

## Text properties <span class="lvl lvl-1">Beginner</span> { #text-properties data-toc-label="Text properties" }

```css
text-align: start | center | end | justify;
text-transform: uppercase | lowercase | capitalize;
text-decoration: underline wavy #e4572e 2px;
text-underline-offset: .25em;
letter-spacing: .05em;
word-spacing: .2em;
text-indent: 2em;
white-space: nowrap | pre | pre-wrap;
```

<div class="demo">
<p style="text-transform:uppercase;letter-spacing:.15em;margin:.3em 0;font-size:.85em;font-weight:700">uppercase + letter-spacing (eyebrow label)</p>
<p style="text-decoration:underline wavy #e4572e 2px;text-underline-offset:.25em;margin:.3em 0">wavy underline with offset</p>
<p style="text-decoration:line-through;margin:.3em 0">line-through</p>
<p style="text-align:center;margin:.3em 0;background:rgba(128,128,128,.1)">centered</p>
<p style="text-align:end;margin:.3em 0;background:rgba(128,128,128,.1)">aligned to end</p>
</div>

## Readable text <span class="lvl lvl-1">Beginner</span> { #readable-text data-toc-label="Readable text" }

```css
.prose {
  max-width: 65ch;         /* 45–75 characters per line is easiest to read */
  line-height: 1.6;
  font-size: 1.125rem;
}
```

## Modern text wrapping <span class="lvl lvl-2">Intermediate</span> <small>Baseline 2024</small> { #modern-text-wrapping data-toc-label="Modern text wrapping" }

```css
h1, h2, h3 { text-wrap: balance; }   /* evens out line lengths in headings */
p { text-wrap: pretty; }             /* avoids a single orphan word on the last line */
```

<div class="demo">
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1em">
<div><small>default</small><h3 style="max-width:300px;margin:.2em 0;text-wrap:wrap">Learn modern layout techniques with Flexbox and Grid</h3></div>
<div><small>text-wrap: balance</small><h3 style="max-width:300px;margin:.2em 0;text-wrap:balance">Learn modern layout techniques with Flexbox and Grid</h3></div>
</div>
</div>

## Overflow: ellipsis and line clamping <span class="lvl lvl-2">Intermediate</span> { #overflow-ellipsis-and-line-clamping data-toc-label="Overflow: ellipsis and line clamping" }

```css
/* One line + "…" */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* N lines + "…" */
.clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

/* Long URLs / words */
.break { overflow-wrap: anywhere; }
.hyphen { hyphens: auto; }  /* needs a correct lang attribute */
```

<div class="demo">
<p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px;margin:.3em 0;border:1px dashed #aaa;padding:.2em">This is a very long product title that will not fit in one line</p>
<p style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;max-width:260px;margin:.3em 0;border:1px dashed #aaa;padding:.2em">This description is clamped to exactly two lines, no matter how much text there is. Everything after the second line is hidden and an ellipsis is shown.</p>
<p style="overflow-wrap:anywhere;max-width:160px;margin:.3em 0;border:1px dashed #aaa;padding:.2em">https://example.com/a/really/long/url/without/spaces</p>
</div>

## Fluid type scale <span class="lvl lvl-3">Advanced</span> { #fluid-type-scale data-toc-label="Fluid type scale" }

```css
:root {
  --step--1: clamp(0.83rem, 0.78rem + 0.24vw, 0.97rem);
  --step-0:  clamp(1.00rem, 0.93rem + 0.36vw, 1.20rem);
  --step-1:  clamp(1.20rem, 1.09rem + 0.54vw, 1.50rem);
  --step-2:  clamp(1.44rem, 1.28rem + 0.80vw, 1.88rem);
  --step-3:  clamp(1.73rem, 1.50rem + 1.15vw, 2.34rem);
  --step-4:  clamp(2.07rem, 1.75rem + 1.63vw, 2.93rem);
}
body { font-size: var(--step-0); }
h1 { font-size: var(--step-4); }
h2 { font-size: var(--step-3); }
```

Each step is a fixed ratio larger than the last (1.2 at small screens, 1.25 at large). The text is smaller on phones and larger on desktops, with no breakpoints.

## Gradient text <span class="lvl lvl-2">Intermediate</span> { #gradient-text data-toc-label="Gradient text" }

```css
.gradient-text {
  background: linear-gradient(90deg, #e4572e, #f3a712, #3f51b5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

<div class="demo">
<h2 style="margin:0;font-size:2.4em;font-weight:900;background:linear-gradient(90deg,#e4572e,#f3a712,#3f51b5);-webkit-background-clip:text;background-clip:text;color:transparent">Gradient headline</h2>
</div>

## Vertical writing <span class="lvl lvl-3">Advanced</span> { #vertical-writing data-toc-label="Vertical writing" }

```css
.vertical { writing-mode: vertical-rl; text-orientation: mixed; }
```

<div class="demo">
<div style="display:flex;gap:2em;align-items:start">
<p style="writing-mode:vertical-rl;margin:0;font-size:1.2em">縦書きの日本語</p>
<p style="writing-mode:vertical-rl;margin:0;transform:rotate(180deg);font-weight:700;letter-spacing:.1em">SIDE LABEL</p>
</div>
</div>
