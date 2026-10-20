# Backgrounds, Borders & Effects

These are the features most people mean by "CSS3": the things that used to need images and Photoshop.

## `border-radius` <span class="lvl lvl-1">Beginner</span> { #border-radius data-toc-label="border-radius" }

```css
.r1 { border-radius: 8px; }
.r2 { border-radius: 50%; }              /* circle (on a square) */
.r3 { border-radius: 999px; }            /* pill */
.r4 { border-radius: 24px 0; }           /* top-left+bottom-right / others */
.r5 { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }  /* blob */
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1em;align-items:center">
  <div style="width:70px;height:70px;background:var(--box-a);border-radius:8px"></div>
  <div style="width:70px;height:70px;background:var(--box-b);border-radius:50%"></div>
  <div style="width:110px;height:40px;background:var(--box-c);border-radius:999px"></div>
  <div style="width:70px;height:70px;background:var(--box-d);border-radius:24px 0"></div>
  <div style="width:80px;height:80px;background:var(--box-e);border-radius:60% 40% 30% 70% / 60% 30% 70% 40%"></div>
</div>
</div>

New in 2025 (Chromium): `corner-shape: squircle | bevel | notch | scoop` changes the *shape* of rounded corners.

## Borders and outlines <span class="lvl lvl-1">Beginner</span> { #borders-and-outlines data-toc-label="Borders and outlines" }

```css
border: 2px solid #e4572e;
border-style: dotted | dashed | double | groove | ridge | inset | outset;
border-inline-start: 4px solid royalblue;    /* left in LTR */
outline: 2px dashed royalblue;               /* doesn't take space */
outline-offset: 4px;
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1em">
  <div style="border:3px solid #e4572e;padding:.6em">solid</div>
  <div style="border:3px dashed #e4572e;padding:.6em">dashed</div>
  <div style="border:3px dotted #e4572e;padding:.6em">dotted</div>
  <div style="border:6px double #e4572e;padding:.6em">double</div>
  <div style="border-inline-start:6px solid royalblue;padding:.6em;background:rgba(65,105,225,.08)">inline-start</div>
  <div style="outline:2px dashed royalblue;outline-offset:4px;padding:.6em">outline + offset</div>
</div>
</div>

## `box-shadow` <span class="lvl lvl-1">Beginner</span> { #box-shadow data-toc-label="box-shadow" }

Syntax: `offset-x offset-y blur spread color`, plus optional `inset`. Comma-separate several shadows.

```css
.s1 { box-shadow: 0 1px 3px rgb(0 0 0 / .12), 0 1px 2px rgb(0 0 0 / .24); } /* small */
.s2 { box-shadow: 0 10px 30px -5px rgb(0 0 0 / .25); }                        /* large, soft */
.s3 { box-shadow: inset 0 2px 6px rgb(0 0 0 / .3); }                          /* inset */
.s4 { box-shadow: 0 0 0 4px #e4572e; }                                        /* ring (no layout shift) */
.s5 { box-shadow: 0 0 20px 4px rgb(228 87 46 / .7); }                         /* glow */
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1.5em;padding:.5em">
  <div style="width:90px;height:60px;border-radius:8px;background:#fff;box-shadow:0 1px 3px rgb(0 0 0 / .12),0 1px 2px rgb(0 0 0 / .24)"></div>
  <div style="width:90px;height:60px;border-radius:8px;background:#fff;box-shadow:0 10px 30px -5px rgb(0 0 0 / .25)"></div>
  <div style="width:90px;height:60px;border-radius:8px;background:#eee;box-shadow:inset 0 2px 6px rgb(0 0 0 / .3)"></div>
  <div style="width:90px;height:60px;border-radius:8px;background:#fff;box-shadow:0 0 0 4px #e4572e"></div>
  <div style="width:90px;height:60px;border-radius:8px;background:#fff;box-shadow:0 0 20px 4px rgb(228 87 46 / .7)"></div>
</div>
</div>

## `text-shadow` <span class="lvl lvl-1">Beginner</span> { #text-shadow data-toc-label="text-shadow" }

```css
.t1 { text-shadow: 2px 2px 0 #e4572e; }
.t2 { text-shadow: 0 0 8px #3f51b5; }
.t3 { text-shadow: 0 2px 4px rgb(0 0 0 / .5); }   /* legible text over images */
```

<div class="demo">
<p style="font-size:2em;font-weight:900;margin:0;text-shadow:2px 2px 0 #e4572e">Retro</p>
<p style="font-size:2em;font-weight:900;margin:0;color:#fff;text-shadow:0 0 8px #3f51b5,0 0 2px #3f51b5">Neon</p>
</div>

## Gradients <span class="lvl lvl-1">Beginner</span> → <span class="lvl lvl-2">Intermediate</span> { #gradients data-toc-label="Gradients" }

```css
.g1 { background: linear-gradient(135deg, #e4572e, #f3a712); }
.g2 { background: radial-gradient(circle at 30% 30%, #fff, #3f51b5); }
.g3 { background: conic-gradient(#e4572e 0 40%, #f3a712 0 70%, #3f51b5 0); } /* pie chart */
.g4 { background: repeating-linear-gradient(45deg, #eee 0 10px, #ddd 10px 20px); } /* stripes */
.g5 { background: linear-gradient(in oklch 90deg, #e4572e, #3f51b5); }  /* smoother interpolation */
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1em">
  <div style="width:90px;height:90px;border-radius:8px;background:linear-gradient(135deg,#e4572e,#f3a712)"></div>
  <div style="width:90px;height:90px;border-radius:8px;background:radial-gradient(circle at 30% 30%,#fff,#3f51b5)"></div>
  <div style="width:90px;height:90px;border-radius:50%;background:conic-gradient(#e4572e 0 40%,#f3a712 0 70%,#3f51b5 0)"></div>
  <div style="width:90px;height:90px;border-radius:8px;background:repeating-linear-gradient(45deg,#eee 0 10px,#ccc 10px 20px)"></div>
  <div style="width:180px;height:90px;border-radius:8px;background:linear-gradient(in oklch 90deg,#e4572e,#3f51b5)"></div>
</div>
</div>

## Background properties <span class="lvl lvl-1">Beginner</span> { #background-properties data-toc-label="Background properties" }

```css
.hero {
  background-image: linear-gradient(rgb(0 0 0 / .5), rgb(0 0 0 / .5)),   /* overlay */
                    url("hero.jpg");                                      /* photo */
  background-size: cover;          /* fill, crop the excess  | contain: fit, may letterbox */
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;    /* parallax-ish; disabled on iOS */
  background-clip: padding-box;
  background-origin: content-box;
  background-blend-mode: multiply;
}
```

<div class="demo">
<div style="height:150px;border-radius:10px;display:grid;place-items:center;color:#fff;font-size:1.5em;font-weight:800;background:linear-gradient(rgb(0 0 0 / .45),rgb(0 0 0 / .45)),url('https://picsum.photos/id/1018/800/300') center/cover no-repeat">Text over an image with an overlay</div>
</div>

Multiple backgrounds stack: the **first one listed is on top**.

## `opacity` and `filter` <span class="lvl lvl-1">Beginner</span> { #opacity-and-filter data-toc-label="opacity and filter" }

```css
opacity: .5;
filter: blur(3px);
filter: grayscale(1);
filter: brightness(1.3) contrast(1.2) saturate(1.5);
filter: sepia(1);
filter: hue-rotate(90deg);
filter: invert(1);
filter: drop-shadow(0 4px 6px rgb(0 0 0 / .4));   /* follows the shape (PNG/SVG alpha) */
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:.6em;font:11px system-ui;text-align:center">
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90"><figcaption>original</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90" style="filter:blur(3px)"><figcaption>blur</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90" style="filter:grayscale(1)"><figcaption>grayscale</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90" style="filter:sepia(1)"><figcaption>sepia</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90" style="filter:hue-rotate(120deg) saturate(2)"><figcaption>hue-rotate</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1025/120/90" alt="" width="120" height="90" style="filter:invert(1)"><figcaption>invert</figcaption></figure>
</div>
</div>

## `backdrop-filter` (glassmorphism) <span class="lvl lvl-2">Intermediate</span> { #backdrop-filter-glassmorphism data-toc-label="backdrop-filter (glassmorphism)" }

Applies a filter to whatever is **behind** the element.

```css
.glass {
  background: rgb(255 255 255 / .2);
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border: 1px solid rgb(255 255 255 / .35);
  border-radius: 16px;
}
```

<div class="demo">
<div style="padding:2em;border-radius:12px;background:url('https://picsum.photos/id/1039/800/300') center/cover">
  <div style="max-width:260px;padding:1.2em;color:#fff;background:rgb(255 255 255 / .2);backdrop-filter:blur(12px) saturate(1.5);-webkit-backdrop-filter:blur(12px) saturate(1.5);border:1px solid rgb(255 255 255 / .35);border-radius:16px">
    <strong>Glass card</strong><br>The photo behind me is blurred.
  </div>
</div>
</div>

## `clip-path` and `mask` <span class="lvl lvl-2">Intermediate</span> { #clip-path-and-mask data-toc-label="clip-path and mask" }

```css
.c1 { clip-path: circle(50%); }
.c2 { clip-path: polygon(50% 0, 100% 100%, 0 100%); }           /* triangle */
.c3 { clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); }      /* slanted section edge */
.c4 { clip-path: inset(10% round 20px); }
.m1 { mask-image: linear-gradient(black 60%, transparent); }     /* fade out */
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1em">
  <div style="width:90px;height:90px;background:linear-gradient(135deg,#e4572e,#f3a712);clip-path:circle(50%)"></div>
  <div style="width:90px;height:90px;background:linear-gradient(135deg,#e4572e,#f3a712);clip-path:polygon(50% 0,100% 100%,0 100%)"></div>
  <div style="width:140px;height:90px;background:linear-gradient(135deg,#e4572e,#f3a712);clip-path:polygon(0 0,100% 0,100% 80%,0 100%)"></div>
  <div style="width:90px;height:90px;background:linear-gradient(135deg,#e4572e,#f3a712);clip-path:inset(10% round 20px)"></div>
  <img src="https://picsum.photos/id/1043/140/90" alt="" width="140" height="90" style="mask-image:linear-gradient(black 40%,transparent);-webkit-mask-image:linear-gradient(black 40%,transparent)">
</div>
</div>

## Blend modes <span class="lvl lvl-3">Advanced</span> { #blend-modes data-toc-label="Blend modes" }

```css
.knockout { mix-blend-mode: multiply; }     /* blend with what's behind */
.duotone  { background-blend-mode: screen; }  /* blend background layers */
isolation: isolate;   /* limit blending to this stacking context */
```

<div class="demo">
<div style="position:relative;height:120px;width:220px">
  <div style="position:absolute;inset:0 auto auto 0;width:110px;height:110px;border-radius:50%;background:#e4572e;mix-blend-mode:multiply"></div>
  <div style="position:absolute;inset:0 auto auto 60px;width:110px;height:110px;border-radius:50%;background:#f3a712;mix-blend-mode:multiply"></div>
  <div style="position:absolute;inset:0 auto auto 120px;width:110px;height:110px;border-radius:50%;background:#3f9be4;mix-blend-mode:multiply"></div>
</div>
</div>

## `object-fit` and `aspect-ratio` <span class="lvl lvl-1">Beginner</span> { #object-fit-and-aspect-ratio data-toc-label="object-fit and aspect-ratio" }

```css
.thumb {
  inline-size: 160px;
  aspect-ratio: 1;          /* square box, any image */
  object-fit: cover;        /* fill and crop | contain: fit inside | fill: stretch */
  object-position: top;
}
.video-wrap { aspect-ratio: 16 / 9; }
```

<div class="demo">
<div style="display:flex;flex-wrap:wrap;gap:1em;font:12px system-ui;text-align:center">
  <figure style="margin:0"><img src="https://picsum.photos/id/1011/400/200" alt="" style="width:120px;aspect-ratio:1;object-fit:fill;background:#ddd"><figcaption>fill (stretched)</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1011/400/200" alt="" style="width:120px;aspect-ratio:1;object-fit:contain;background:#ddd"><figcaption>contain</figcaption></figure>
  <figure style="margin:0"><img src="https://picsum.photos/id/1011/400/200" alt="" style="width:120px;aspect-ratio:1;object-fit:cover;background:#ddd"><figcaption>cover</figcaption></figure>
</div>
</div>

!!! tip "Senior note · 🟠 Advanced"
    `filter`, `backdrop-filter`, big blurred `box-shadow`s and `mix-blend-mode` are paint-heavy. Animating them, or stacking many glass cards on a scrolling page, can drop frames on low-end Android phones. Profile with DevTools → Rendering → "Paint flashing", and prefer animating a pseudo-element's `opacity` over animating a shadow directly.
