# Images & Media

## `<img>` Image <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-3">Advanced</span> { #img-image data-toc-label="&lt;img&gt; Image" }

**Use:** embed an image.

```html
<img src="https://picsum.photos/id/1015/320/180"
     alt="A river winding through a green valley"
     width="320" height="180"
     loading="lazy" decoding="async">
```

<div class="demo">
<img src="https://picsum.photos/id/1015/320/180" alt="A river winding through a green valley" width="320" height="180" loading="lazy" decoding="async" style="max-width:100%;height:auto;border-radius:8px">
</div>

| Attribute | Why |
|---|---|
| `src` | Image URL (required) |
| `alt` | Text alternative (required). Describe the *purpose*. For purely decorative images use `alt=""` so screen readers skip them. |
| `width` / `height` | Intrinsic size. The browser reserves space before the image loads, which **prevents layout shift (CLS)**. Always set them, then let CSS make the image responsive. |
| `loading="lazy"` | Don't load until it's near the viewport. **Never lazy-load the hero / LCP image.** |
| `decoding="async"` | Decode off the main thread. |
| `fetchpriority="high"` | Boost the LCP image's priority. |
| `srcset` / `sizes` | Responsive image candidates (below). |

```css
/* The responsive image rule everyone uses */
img { max-width: 100%; height: auto; display: block; }
```

### Writing good `alt` text

| Image | Good alt |
|---|---|
| Product photo in a shop | `alt="Blue Cloud Runner shoe, side view"` |
| Logo that links home | `alt="Acme home"` (describe the link's purpose) |
| Chart | Short summary in `alt`, full data in a table or caption |
| Decorative swirl | `alt=""` |
| Icon next to the text "Delete" | `alt=""` (the text already says it) |

### Responsive images with `srcset` and `sizes` <span class="lvl lvl-2">Intermediate</span> { #responsive-images-with-srcset-and-sizes data-toc-label="Responsive images with srcset and sizes" }

```html
<!-- Resolution switching: same image, different file sizes -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(min-width: 1024px) 50vw, 100vw"
  alt="…" width="800" height="533">
```

Read it as: "This image shows at 50% of the viewport on screens ≥ 1024px, otherwise full width. Here are three files and their real widths; browser, pick the smallest one that's sharp enough for this screen's pixel density."

## `<picture>` and `<source>` <span class="lvl lvl-2">Intermediate</span> { #picture-and-source data-toc-label="&lt;picture&gt; and &lt;source&gt;" }

**Use:** offer different formats (AVIF → WebP → JPEG) or different crops at different screen sizes (art direction).

```html
<picture>
  <!-- Art direction: square crop on phones -->
  <source media="(max-width: 600px)" srcset="hero-square.avif" type="image/avif">
  <!-- Modern formats first, browser picks the first it supports -->
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <!-- Fallback + where alt, width, height live -->
  <img src="hero.jpg" alt="Team working together" width="1200" height="600">
</picture>
```

The `<img>` inside is required: it's what actually renders. `<source>` only swaps its `src`.

## `<video>` <span class="lvl lvl-1">Beginner</span> { #video data-toc-label="&lt;video&gt;" }

```html
<video controls width="320" preload="metadata"
       poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.jpg">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  <track kind="captions" src="flower-en.vtt" srclang="en" label="English" default>
  Your browser doesn't support video. <a href="flower.mp4">Download it</a>.
</video>
```

<div class="demo">
<video controls width="320" preload="metadata" style="max-width:100%;border-radius:8px" poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.jpg">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
</div>

| Attribute | Use |
|---|---|
| `controls` | Show play/pause/volume controls |
| `autoplay` | Start automatically. Browsers only allow it with `muted`. |
| `muted`, `loop` | Self-explanatory |
| `playsinline` | Play inside the page on iOS instead of going fullscreen |
| `poster` | Image shown before playback |
| `preload` | `none`, `metadata` (recommended), `auto` |

!!! tip "Senior note · 🟠 Advanced"
    A background hero video should be `autoplay muted loop playsinline`, be paused when `prefers-reduced-motion: reduce` matches, and have a visible pause button (WCAG 2.2.2: anything moving for more than 5 seconds must be pausable).

## `<audio>` <span class="lvl lvl-1">Beginner</span> { #audio data-toc-label="&lt;audio&gt;" }

```html
<audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3">
  <a href="t-rex-roar.mp3">Download audio</a>
</audio>
```

<div class="demo">
<audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>
</div>

## `<track>` <span class="lvl lvl-2">Intermediate</span> { #track data-toc-label="&lt;track&gt;" }

**Use:** timed text for video/audio in WebVTT format: `kind="captions | subtitles | descriptions | chapters | metadata"`.

```text title="flower-en.vtt"
WEBVTT

00:00:00.000 --> 00:00:03.000
A bee lands on a pink flower.
```

## `<iframe>` <span class="lvl lvl-2">Intermediate</span> { #iframe data-toc-label="&lt;iframe&gt;" }

**Use:** embed another web page: maps, YouTube, payment widgets.

```html
<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=77.58,12.96,77.62,12.99"
  title="Map of central Bengaluru"
  width="100%" height="220"
  loading="lazy"
  referrerpolicy="no-referrer"
  sandbox="allow-scripts allow-same-origin"></iframe>
```

<div class="demo">
<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=77.58,12.96,77.62,12.99" title="Map of central Bengaluru" width="100%" height="220" loading="lazy" referrerpolicy="no-referrer" style="border:0;border-radius:8px"></iframe>
</div>

**Always** set a `title` (screen readers announce it). Use `sandbox` to restrict what embedded third-party content can do, and `allow="…"` to grant specific permissions (camera, fullscreen).

## `<embed>` and `<object>` <span class="lvl lvl-3">Advanced</span> { #embed-and-object data-toc-label="&lt;embed&gt; and &lt;object&gt;" }

Legacy ways to embed plugins (Flash, Java applets). Today their main remaining use is embedding PDFs, where `<iframe>` works just as well. Prefer `<iframe>`, `<video>` or `<img>`.

```html
<object data="guide.pdf" type="application/pdf" width="100%" height="400">
  <a href="guide.pdf">Download the guide (PDF)</a>
</object>
```

## `<svg>` Inline SVG <span class="lvl lvl-2">Intermediate</span> { #svg-inline-svg data-toc-label="&lt;svg&gt; Inline SVG" }

**Use:** vector graphics that are crisp at any size and can be styled with CSS. Ideal for icons, logos and charts.

```html
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Orange circle with a check mark">
  <circle cx="60" cy="60" r="54" fill="#e4572e"/>
  <path d="M35 62 l17 17 l33 -36" fill="none" stroke="#fff" stroke-width="10"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

<div class="demo">
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Orange circle with a check mark">
  <circle cx="60" cy="60" r="54" fill="#e4572e"/>
  <path d="M35 62 l17 17 l33 -36" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>

!!! tip "Icons"
    Use `fill="currentColor"` in icon SVGs so they inherit the text colour, and they'll follow hover states and dark mode automatically. Decorative icons get `aria-hidden="true"`.

## `<canvas>` <span class="lvl lvl-2">Intermediate</span> { #canvas data-toc-label="&lt;canvas&gt;" }

**Use:** a pixel drawing surface for JavaScript: games, charts with thousands of points, image editing. Not accessible on its own, so provide fallback content or an alternative.

```html
<canvas id="c" width="240" height="100">A red-to-blue gradient bar.</canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 240, 0);
  g.addColorStop(0, '#e4572e');
  g.addColorStop(1, '#3f51b5');
  ctx.fillStyle = g;
  ctx.fillRect(0, 20, 240, 60);
</script>
```

<div class="demo">
<canvas id="canvas-demo" width="240" height="100">A red-to-blue gradient bar.</canvas>
<script>
  (function () {
    var el = document.getElementById('canvas-demo');
    if (!el) return;
    var ctx = el.getContext('2d');
    var g = ctx.createLinearGradient(0, 0, 240, 0);
    g.addColorStop(0, '#e4572e');
    g.addColorStop(1, '#3f51b5');
    ctx.fillStyle = g;
    ctx.fillRect(0, 20, 240, 60);
  })();
</script>
</div>

## `<map>` and `<area>` <span class="lvl lvl-3">Advanced</span> { #map-and-area data-toc-label="&lt;map&gt; and &lt;area&gt;" }

**Use:** clickable regions on an image (image maps). Rare today; an inline SVG with `<a>` elements is usually easier to make responsive.

```html
<img src="floor.png" alt="Office floor plan" usemap="#floor" width="400" height="200">
<map name="floor">
  <area shape="rect" coords="0,0,200,200" href="/rooms/a" alt="Meeting room A">
  <area shape="circle" coords="300,100,60" href="/rooms/b" alt="Lounge">
</map>
```

## Format cheat sheet <span class="lvl lvl-3">Advanced</span> { #format-cheat-sheet data-toc-label="Format cheat sheet" }

| Content | Best format (2026) | Fallback |
|---|---|---|
| Photos | AVIF | WebP → JPEG |
| Icons, logos | SVG | PNG |
| Screenshots / UI | WebP lossless or AVIF | PNG |
| Animation | `<video>` MP4/WebM (AV1/H.264) | Animated WebP; avoid GIF (10× larger) |
| Fonts | WOFF2 | — |
