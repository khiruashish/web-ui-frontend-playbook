"""Generate docs/examples/layouts.html: a standalone responsive layout gallery.

Each layout's HTML and CSS appear twice: live in the page, and escaped inside
<details> so readers see exactly the code that renders.
"""
import html as H
import sys
import textwrap

OUT = sys.argv[1]
L = []


def lay(lid, title, level, see, markup, css, why):
    L.append(dict(id=lid, title=title, level=level, see=see,
                  html=textwrap.dedent(markup).strip(), css=textwrap.dedent(css).strip(), why=why))


lay("centering", "Centering", "Beginner",
    "A box sitting dead-centre, horizontally and vertically, inside a larger area.",
    """
    <div class="center-demo">
      <div class="tile">Perfectly centred</div>
    </div>
    """,
    """
    .center-demo {
      display: grid;
      place-items: center;
      min-height: 220px;
    }
    """,
    ["<code>display: grid</code> turns the container into a one-cell grid.",
     "<code>place-items: center</code> centres the item on both axes inside that cell.",
     "Flexbox equivalent: <code>display:flex; justify-content:center; align-items:center</code>."])

lay("holy-grail", "Holy grail", "Beginner",
    "Header across the top, footer across the bottom, main content in the middle with a nav on the left and a sidebar on the right. On phones everything stacks.",
    """
    <div class="holy">
      <header class="tile">Header</header>
      <nav class="tile">Nav</nav>
      <div class="tile holy__main">Main content</div>
      <aside class="tile">Aside</aside>
      <footer class="tile">Footer</footer>
    </div>
    """,
    """
    .holy {
      display: grid;
      gap: var(--gap);
      grid-template-areas: "header" "nav" "main" "aside" "footer";
    }
    .holy > header { grid-area: header; }
    .holy > nav    { grid-area: nav; }
    .holy > .holy__main { grid-area: main; min-height: 160px; }
    .holy > aside  { grid-area: aside; }
    .holy > footer { grid-area: footer; }

    @media (width >= 48em) {
      .holy {
        grid-template-columns: 160px 1fr 160px;
        grid-template-areas:
          "header header header"
          "nav    main   aside"
          "footer footer footer";
      }
    }
    """,
    ["Mobile-first: the base CSS is a single column in reading order.",
     "<code>grid-template-areas</code> draws the desktop layout as text. Changing the layout means redrawing the map, not moving HTML.",
     "Semantic elements (<code>header</code>, <code>nav</code>, <code>aside</code>, <code>footer</code>) describe each region. On a real page the middle area is your one <code>&lt;main&gt;</code>; it's a <code>div</code> here only because this demo already sits inside the page's <code>main</code>."])

lay("sidebar", "Sidebar that wraps (no media query)", "Intermediate",
    "A narrow sidebar next to wide content. When there's not enough room, the sidebar drops above the content on its own.",
    """
    <div class="with-sidebar">
      <aside class="tile">Sidebar (ideal 220px)</aside>
      <div class="tile">Content: takes all remaining space, and wraps below the sidebar when it would get narrower than 55% of the row.</div>
    </div>
    """,
    """
    .with-sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
    }
    .with-sidebar > :first-child { flex: 1 1 220px; }
    .with-sidebar > :last-child  { flex: 999 1 0; min-inline-size: 55%; }
    """,
    ["The content's huge <code>flex-grow</code> (999) means it takes almost all the spare space, so the sidebar stays near 220px.",
     "<code>min-inline-size: 55%</code> on the content forces a wrap once the row is too narrow for both.",
     "This is an <em>intrinsic</em> layout: it responds to its container, not the viewport, so it works in any slot."])

lay("pancake", "Pancake stack & sticky footer", "Beginner",
    "Header, content, footer stacked vertically. The footer stays at the very bottom even when there's little content.",
    """
    <div class="pancake">
      <header class="tile">Header</header>
      <div class="tile">Main grows to fill the space</div>
      <footer class="tile">Footer stays at the bottom</footer>
    </div>
    """,
    """
    .pancake {
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: var(--gap);
      min-height: 280px;   /* on a real page: min-height: 100dvh on body */
    }
    """,
    ["<code>auto</code> rows are as tall as their content; the <code>1fr</code> row takes everything left over.",
     "Use <code>100dvh</code> rather than <code>100vh</code> on mobile so the footer isn't hidden behind the browser's URL bar."])

lay("cards", "Responsive card grid (RAM)", "Beginner",
    "A grid of equal cards: 1 per row on phones, 2–4 per row on bigger screens, always filling the row.",
    """
    <div class="card-grid">
      <article class="card"><div class="card__img"></div><h3>Mangoes</h3><p>Sweet Alphonso, 1 kg.</p></article>
      <article class="card"><div class="card__img"></div><h3>Bananas</h3><p>Robusta, 1 dozen.</p></article>
      <article class="card"><div class="card__img"></div><h3>Spinach</h3><p>Fresh bunch, 250 g.</p></article>
      <article class="card"><div class="card__img"></div><h3>Tomatoes</h3><p>Farm fresh, 500 g.</p></article>
      <article class="card"><div class="card__img"></div><h3>Milk</h3><p>Toned, 1 litre.</p></article>
    </div>
    """,
    """
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
      gap: var(--gap);
    }
    .card {
      display: grid; gap: .4rem; padding: .8rem;
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    }
    .card h3, .card p { margin: 0; }
    .card__img { aspect-ratio: 4 / 3; border-radius: calc(var(--radius) - 4px); background: var(--grad); }
    """,
    ["<b>R</b>epeat, <b>A</b>uto-fit, <b>M</b>inmax: \"as many columns as fit, each at least 180px, stretched to fill\".",
     "<code>min(180px, 100%)</code> stops overflow on screens narrower than 180px.",
     "No media queries: the number of columns follows the available width."])

lay("twelve", "12-column grid", "Intermediate",
    "Rows of boxes with different widths (full, two-thirds + one-third, halves, quarters) that all line up to the same invisible columns. On phones they stack.",
    """
    <div class="row12">
      <div class="tile span-12">12</div>
      <div class="tile span-8">8</div><div class="tile span-4">4</div>
      <div class="tile span-6">6</div><div class="tile span-6">6</div>
      <div class="tile span-3">3</div><div class="tile span-3">3</div><div class="tile span-3">3</div><div class="tile span-3">3</div>
    </div>
    """,
    """
    .row12 {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: var(--gap);
    }
    .row12 > * { grid-column: 1 / -1; }     /* mobile: full width */
    @media (width >= 40em) {
      .span-12 { grid-column: span 12; }
      .span-8  { grid-column: span 8; }
      .span-6  { grid-column: span 6; }
      .span-4  { grid-column: span 4; }
      .span-3  { grid-column: span 3; }
    }
    """,
    ["12 divides evenly by 2, 3, 4 and 6, so it supports halves, thirds and quarters.",
     "<code>minmax(0, 1fr)</code> instead of <code>1fr</code> stops long content from making one column wider than the others.",
     "<code>1 / -1</code> means \"from the first line to the last\": full width."])

lay("bento", "Bento grid", "Intermediate",
    "Feature tiles of mixed sizes, one big, some wide, some tall, packed tightly with rounded corners.",
    """
    <div class="bento">
      <div class="tile big">Big feature</div>
      <div class="tile tall">Tall</div>
      <div class="tile">Small</div>
      <div class="tile">Small</div>
      <div class="tile wide">Wide tile</div>
      <div class="tile">Small</div>
    </div>
    """,
    """
    .bento {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 110px;
      grid-auto-flow: dense;
      gap: var(--gap);
    }
    .bento .big  { grid-column: span 2; grid-row: span 2; }
    .bento .wide { grid-column: span 2; }
    .bento .tall { grid-row: span 2; }
    .bento > *   { border-radius: 20px; }
    @media (width >= 48em) {
      .bento { grid-template-columns: repeat(4, 1fr); }
    }
    """,
    ["<code>grid-auto-rows</code> gives every row the same height, so <code>span</code> creates exact 1×1, 2×1, 1×2 and 2×2 tiles.",
     "<code>grid-auto-flow: dense</code> fills holes left by big tiles. Be careful: it can change the visual order away from the DOM order."])

lay("masonry", "Masonry", "Intermediate",
    "Columns of boxes with different heights, packed with no gaps, like Pinterest.",
    """
    <div class="masonry">
      <div class="tile" style="height:90px">1</div>
      <div class="tile" style="height:150px">2</div>
      <div class="tile" style="height:70px">3</div>
      <div class="tile" style="height:120px">4</div>
      <div class="tile" style="height:100px">5</div>
      <div class="tile" style="height:140px">6</div>
      <div class="tile" style="height:80px">7</div>
      <div class="tile" style="height:110px">8</div>
    </div>
    """,
    """
    .masonry {
      columns: 4 160px;          /* up to 4 columns, each at least 160px */
      column-gap: var(--gap);
    }
    .masonry > * {
      break-inside: avoid;       /* never split a tile across columns */
      margin-bottom: var(--gap);
    }
    """,
    ["CSS multi-column flows items top-to-bottom, then into the next column, which naturally packs uneven heights.",
     "Order runs down each column (1, 2 in column one…), not across. Fine for galleries; not for ranked lists.",
     "Native masonry for Grid (CSS Grid Lanes) is coming; until it's Baseline this is the zero-JS approach."])

lay("split", "Split screen", "Beginner",
    "Two halves side by side, a brand panel and a form. On phones the brand panel goes on top.",
    """
    <div class="split">
      <div class="split__brand">◆ Brand<br><small>Groceries in minutes</small></div>
      <form class="split__form" onsubmit="return false">
        <label>Email <input type="email" autocomplete="email"></label>
        <label>Password <input type="password" autocomplete="current-password"></label>
        <button>Sign in</button>
      </form>
    </div>
    """,
    """
    .split {
      display: grid;
      border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border);
    }
    .split__brand {
      display: grid; place-content: center; text-align: center;
      padding: 2rem; min-height: 140px;
      background: var(--grad); color: #fff; font: 800 1.6rem/1.2 inherit;
    }
    .split__form { display: grid; gap: .8rem; padding: 2rem; align-content: center; }
    .split__form label { display: grid; gap: .3rem; }
    @media (width >= 48em) {
      .split { grid-template-columns: 1fr 1fr; min-height: 320px; }
    }
    """,
    ["One grid; on wide screens it gets two equal <code>1fr</code> columns.",
     "Each <code>label</code> is a small grid too, stacking the text above its input.",
     "<code>autocomplete</code> tokens let password managers fill the form."])

lay("media", "Media object", "Beginner",
    "An image (or avatar) on the left, a block of text on the right. Used for comments, notifications and list rows.",
    """
    <ul class="media-list">
      <li class="media"><span class="media__img"></span><div><b>Asha</b> commented<p>The new grid layout looks great on mobile.</p></div></li>
      <li class="media"><span class="media__img"></span><div><b>Ravi</b> merged a PR<p>Fix sticky header overlap on iOS Safari.</p></div></li>
    </ul>
    """,
    """
    .media-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--gap); }
    .media { display: flex; gap: 1rem; align-items: flex-start; }
    .media__img {
      flex-shrink: 0;                      /* never squash the avatar */
      inline-size: 48px; aspect-ratio: 1; border-radius: 50%;
      background: var(--grad);
    }
    .media p { margin: .2rem 0 0; color: var(--muted); }
    """,
    ["Flexbox puts image and text in a row; the text takes the remaining width automatically.",
     "<code>flex-shrink: 0</code> keeps the avatar a perfect circle when text is long.",
     "<code>align-items: flex-start</code> aligns the avatar with the first line of text instead of stretching it."])

lay("magazine", "Magazine / editorial", "Intermediate",
    "A big lead story, smaller stories next to it, and a \"most read\" list down the side.",
    """
    <div class="mag">
      <article class="tile lead">Lead story</article>
      <article class="tile">Story</article>
      <article class="tile">Story</article>
      <aside class="tile list">Most read<ol><li>One</li><li>Two</li><li>Three</li></ol></aside>
    </div>
    """,
    """
    .mag {
      display: grid;
      gap: var(--gap);
      grid-template-columns: 1fr;
      grid-auto-rows: minmax(90px, auto);
    }
    @media (width >= 40em) {
      .mag { grid-template-columns: 1fr 1fr; }
      .mag .lead { grid-column: 1 / -1; }
    }
    @media (width >= 64em) {
      .mag { grid-template-columns: 2fr 1fr 1fr; }
      .mag .lead { grid-column: 1; grid-row: span 2; }
      .mag .list { grid-column: 3; grid-row: 1 / span 2; }
    }
    """,
    ["Three steps: one column → lead on top of two columns → lead on the left spanning two rows.",
     "Placing items by line number lets the layout change without changing the HTML order."])

lay("dashboard", "Dashboard", "Intermediate",
    "A dark sidebar, a top bar, a row of KPI tiles, and a large chart panel next to a smaller activity panel.",
    """
    <div class="dash">
      <nav class="dash__side">☰ Menu<br><br>Overview<br>Orders<br>Products<br>Customers</nav>
      <header class="dash__top">Dashboard · <input type="search" placeholder="Search" aria-label="Search"></header>
      <section class="dash__kpis">
        <div><small>Revenue</small><b>₹4.2L</b></div>
        <div><small>Orders</small><b>932</b></div>
        <div><small>Users</small><b>12.4k</b></div>
        <div><small>NPS</small><b>61</b></div>
      </section>
      <section class="dash__panels">
        <div class="dash__chart"><small>Sales (7 days)</small><div class="bars"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:50%"></i><i style="--h:80%"></i><i style="--h:70%"></i><i style="--h:95%"></i><i style="--h:60%"></i></div></div>
        <div><small>Activity</small><p>New order #1042<br>Refund #1038<br>New user signup</p></div>
      </section>
    </div>
    """,
    """
    .dash {
      display: grid; gap: var(--gap);
      grid-template-areas: "top" "kpis" "panels";
    }
    .dash__side { display: none; }
    .dash__top    { grid-area: top; }
    .dash__kpis   { grid-area: kpis; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: var(--gap); }
    .dash__panels { grid-area: panels; display: grid; gap: var(--gap); }
    .dash :is(.dash__top, .dash__kpis > *, .dash__panels > *) {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: .8rem;
    }
    .dash__kpis b { display: block; font-size: 1.5rem; font-variant-numeric: tabular-nums; }
    .bars { display: flex; align-items: flex-end; gap: 6px; height: 120px; margin-top: .5rem; }
    .bars i { flex: 1; height: var(--h); border-radius: 4px 4px 0 0; background: var(--grad); }
    @media (width >= 56em) {
      .dash {
        grid-template-columns: 180px 1fr;
        grid-template-areas: "side top" "side kpis" "side panels";
      }
      .dash__side { display: block; grid-area: side; padding: 1rem; border-radius: var(--radius); background: #1f2329; color: #fff; }
      .dash__panels { grid-template-columns: 2fr 1fr; }
    }
    """,
    ["The outer grid places the regions; nested grids lay out the KPI tiles and panels.",
     "The sidebar only appears at ≥ 56em. On phones a real app would show it as a drawer (a <code>popover</code> or <code>dialog</code>).",
     "The bar chart is plain flexbox: each bar's height comes from a <code>--h</code> custom property set inline."])

lay("pricing", "Pricing table", "Beginner",
    "Three plan cards; the middle one is highlighted, slightly bigger, and has a \"Popular\" badge.",
    """
    <div class="plans">
      <section class="plan"><h3>Starter</h3><p class="price">₹0<small>/mo</small></p><ul><li>3 projects</li><li>1 GB</li></ul><a href="#pricing">Start free</a></section>
      <section class="plan plan--hot"><span class="badge">Popular</span><h3>Pro</h3><p class="price">₹499<small>/mo</small></p><ul><li>Unlimited projects</li><li>100 GB</li><li>Priority support</li></ul><a href="#pricing">Go Pro</a></section>
      <section class="plan"><h3>Team</h3><p class="price">₹1,999<small>/mo</small></p><ul><li>Everything in Pro</li><li>SSO</li></ul><a href="#pricing">Contact us</a></section>
    </div>
    """,
    """
    .plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
      gap: 1.5rem; align-items: center; padding-block: 1rem;
    }
    .plan {
      position: relative; display: flex; flex-direction: column; gap: .5rem;
      padding: 1.5rem; border-radius: 16px; background: var(--surface); border: 1px solid var(--border);
    }
    .plan h3, .plan p { margin: 0; }
    .price { font-size: 2rem; font-weight: 800; }
    .price small { font-size: .9rem; font-weight: 400; color: var(--muted); }
    .plan ul { list-style: none; padding: 0; margin: .5rem 0 1rem; display: grid; gap: .3rem; }
    .plan li::before { content: "✓ "; color: var(--ok); font-weight: 700; }
    .plan a { margin-top: auto; text-align: center; padding: .7rem; border-radius: 8px; border: 2px solid var(--brand); color: var(--brand); font-weight: 700; text-decoration: none; }
    .plan--hot { border: 2px solid var(--brand); scale: 1.04; box-shadow: 0 20px 40px color-mix(in srgb, var(--brand) 25%, transparent); }
    .plan--hot a { background: var(--brand); color: #fff; }
    .badge { position: absolute; top: 0; left: 50%; translate: -50% -50%; padding: .2rem .8rem; border-radius: 99px; background: var(--brand); color: #fff; font-size: .75rem; font-weight: 700; }
    """,
    ["Cards are flex columns, and <code>margin-top: auto</code> pushes each button to the bottom so buttons line up.",
     "<code>scale</code> makes the featured card bigger without disturbing the grid.",
     "The badge is centred on the card's top edge with <code>translate: -50% -50%</code>."])

lay("container-query", "Container-query card", "Advanced",
    "The same product card shown in a narrow slot (stacked) and a wide slot (side by side), at the same time, on the same screen.",
    """
    <div class="cq-demo">
      <div class="cq-slot cq-slot--narrow"><article class="product"><div class="product__img"></div><div><h3>Organic honey</h3><p>Raw, unfiltered, 500 g.</p><b>₹349</b></div></article></div>
      <div class="cq-slot"><article class="product"><div class="product__img"></div><div><h3>Organic honey</h3><p>Raw, unfiltered, 500 g.</p><b>₹349</b></div></article></div>
    </div>
    """,
    """
    .cq-demo { display: grid; gap: var(--gap); }
    @media (width >= 48em) { .cq-demo { grid-template-columns: 240px 1fr; } }

    .cq-slot { container-type: inline-size; }    /* make each slot a container */

    .product {
      display: grid; gap: .8rem; padding: .8rem;
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    }
    .product h3, .product p { margin: 0; }
    .product__img { min-height: 110px; border-radius: 10px; background: var(--grad); }

    @container (width >= 26rem) {            /* the CARD's slot is wide, not the screen */
      .product { grid-template-columns: 160px 1fr; align-items: center; }
    }
    """,
    ["<code>container-type: inline-size</code> lets descendants query the slot's width.",
     "<code>@container</code> works like <code>@media</code> but measures the container, so one component adapts to wherever it's placed.",
     "Use media queries for page layout and container queries for component layout."])

lay("full-bleed", "Full-bleed article", "Advanced",
    "Article text in a narrow readable column, with an image that breaks out to the full width of the page.",
    """
    <div class="article">
      <h3>Why readable line length matters</h3>
      <p>Lines of about 45–75 characters are the easiest to read. Longer lines make it hard to find the start of the next line.</p>
      <div class="full bleed-img">Full-bleed image</div>
      <p>After the image, the text returns to its comfortable column, with no extra wrapper elements.</p>
    </div>
    """,
    """
    .article {
      display: grid;
      grid-template-columns:
        [full-start] minmax(1rem, 1fr)
        [content-start] minmax(0, 60ch) [content-end]
        minmax(1rem, 1fr) [full-end];
      row-gap: .8rem;
    }
    .article > *     { grid-column: content; margin: 0; }
    .article > .full { grid-column: full; }
    .bleed-img { min-height: 160px; display: grid; place-items: center; background: var(--grad); color: #fff; font-weight: 700; }
    """,
    ["Named grid lines (<code>[content-start]</code>, <code>[full-end]</code>) create two \"lanes\".",
     "By default every child sits in the <code>content</code> lane; adding <code>.full</code> moves an element to the <code>full</code> lane.",
     "The outer <code>minmax(1rem, 1fr)</code> tracks act as both centring margins and minimum gutters on phones."])

lay("z-pattern", "Alternating features (Z-pattern)", "Intermediate",
    "Feature rows where the image and text swap sides on every row, so the eye moves in a zig-zag.",
    """
    <div class="features">
      <section class="feature"><div><h3>Fast delivery</h3><p>Groceries at your door in 10 minutes.</p></div><div class="feature__img"></div></section>
      <section class="feature"><div><h3>Fresh guarantee</h3><p>Not fresh? Full refund, no questions.</p></div><div class="feature__img"></div></section>
      <section class="feature"><div><h3>Fair prices</h3><p>Direct from farms, no middlemen.</p></div><div class="feature__img"></div></section>
    </div>
    """,
    """
    .features { display: grid; gap: 2rem; }
    .feature { display: grid; gap: 1rem; align-items: center; }
    .feature h3, .feature p { margin: 0 0 .3rem; }
    .feature__img { min-height: 140px; border-radius: var(--radius); background: var(--grad); }
    @media (width >= 48em) {
      .feature { grid-template-columns: 1fr 1fr; gap: 2rem; }
      .feature:nth-child(even) .feature__img { order: -1; }   /* image first on every other row */
    }
    """,
    ["<code>:nth-child(even)</code> selects every second row; <code>order: -1</code> moves its image before the text visually.",
     "The HTML order (text, then image) stays the same, so screen readers and keyboard users always get the text first."])

lay("hero", "Landing hero", "Beginner",
    "A big headline with a subtitle and two buttons on one side, an image on the other, over a soft gradient background.",
    """
    <section class="hero">
      <div class="hero__text">
        <p class="eyebrow">New in Bengaluru</p>
        <h3 class="hero__title">Fresh groceries, delivered in minutes.</h3>
        <p>Fruits, vegetables and daily essentials from local farms.</p>
        <div class="hero__cta"><a class="btn" href="#hero">Start shopping</a><a class="btn btn--ghost" href="#hero">How it works</a></div>
      </div>
      <div class="hero__img" role="img" aria-label="Basket of vegetables"></div>
    </section>
    """,
    """
    .hero {
      display: grid; gap: 2rem; align-items: center;
      padding: clamp(1.5rem, 4vw, 3rem); border-radius: 24px;
      background: radial-gradient(at 0% 0%, color-mix(in srgb, var(--brand) 25%, transparent), transparent 60%),
                  radial-gradient(at 100% 100%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 60%),
                  var(--surface);
    }
    .hero__title { font-size: clamp(1.8rem, 1rem + 3.5vw, 3.2rem); line-height: 1.05; letter-spacing: -.03em; margin: .3rem 0 .8rem; text-wrap: balance; }
    .hero__text > p { margin: 0; }
    .eyebrow { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--brand); }
    .hero__cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.2rem; }
    .hero__img { min-height: 220px; border-radius: 20px; background: url("https://picsum.photos/id/1080/800/600") center / cover; }
    @media (width >= 48em) { .hero { grid-template-columns: 1.1fr 1fr; } }
    """,
    ["<code>clamp()</code> makes the headline and padding scale smoothly from phone to desktop.",
     "Two stacked radial gradients over a surface colour create the soft \"aurora\" background.",
     "<code>text-wrap: balance</code> keeps the headline lines even."])

lay("docs", "Docs layout with sticky sidebar", "Intermediate",
    "A table of contents on the left that stays visible while the long article on the right scrolls.",
    """
    <div class="docs-scroll">
      <div class="docs">
        <nav class="docs__toc"><b>On this page</b><a href="#docs">Intro</a><a href="#docs">Install</a><a href="#docs">Usage</a><a href="#docs">API</a></nav>
        <article class="docs__body">
          <h3>Intro</h3><p>Scroll inside this box. The table of contents stays in view.</p>
          <h3>Install</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <h3>Usage</h3><p>Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper.</p>
          <h3>API</h3><p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
          <p>Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in.</p>
        </article>
      </div>
    </div>
    """,
    """
    .docs-scroll { max-height: 300px; overflow: auto; border: 1px solid var(--border); border-radius: var(--radius); }
    .docs { display: grid; gap: 1.5rem; padding: 1rem; }
    .docs__toc { display: flex; flex-wrap: wrap; gap: .4rem 1rem; }
    .docs__body h3 { margin: 1.2rem 0 .4rem; }
    .docs__body p { margin: 0 0 1rem; }
    @media (width >= 48em) {
      .docs { grid-template-columns: 180px 1fr; }
      .docs__toc {
        position: sticky; top: 1rem;
        align-self: start;                 /* don't stretch, or sticky has no room to move */
        flex-direction: column;
      }
    }
    """,
    ["<code>position: sticky; top: 1rem</code> keeps the TOC in view while its scroll container scrolls.",
     "<code>align-self: start</code> is essential: grid items stretch to the row's height by default, which leaves a sticky element no room to stick.",
     "On phones the TOC becomes a horizontal wrapping row above the article."])


# ------------------------------------------------------------------ page
def esc(s):
    return H.escape(s, quote=False)


toc = "\n".join(f'        <li><a href="#{x["id"]}">{i}. {esc(x["title"])}</a></li>' for i, x in enumerate(L, 1))

sections = []
for i, x in enumerate(L, 1):
    lvl_cls = {"Beginner": "b", "Intermediate": "i", "Advanced": "a"}[x["level"]]
    why = "\n".join(f"          <li>{w}</li>" for w in x["why"])
    sections.append(f"""
    <section class="layout" id="{x['id']}" aria-labelledby="{x['id']}-h">
      <div class="layout__head">
        <h2 id="{x['id']}-h"><span class="num">{i:02d}</span> {esc(x['title'])}</h2>
        <span class="level level--{lvl_cls}">{x['level']}</span>
      </div>
      <p class="see"><strong>What you see:</strong> {x['see']}</p>
      <div class="stage">
{textwrap.indent(x['html'], '        ')}
      </div>
      <details class="code">
        <summary>Show the HTML &amp; CSS</summary>
        <div class="code__grid">
          <div><h3>HTML</h3><pre><code>{esc(x['html'])}</code></pre></div>
          <div><h3>CSS</h3><pre><code>{esc(x['css'])}</code></pre></div>
        </div>
      </details>
      <div class="why">
        <h3>Why this works</h3>
        <ul>
{why}
        </ul>
      </div>
    </section>""")

layout_css = "\n\n".join(f"/* {i:02d} · {x['title']} */\n{x['css']}" for i, x in enumerate(L, 1))

page = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="description" content="{len(L)} responsive web layouts, each with live output, its exact HTML and CSS, and an explanation of why it works.">
  <title>Layout Gallery · Web UI Frontend Playbook</title>
  <style>
    /* ============================================================
       Page shell: tokens, reset, header, navigation, sections
       ============================================================ */
    :root {{
      color-scheme: light;
      --brand: #e4572e;
      --accent: #3f51b5;
      --ok: #2e9d4f;
      --bg: #f7f7f9;
      --surface: #ffffff;
      --text: #1f2329;
      --muted: #5f6672;
      --border: #e3e5ea;
      --tile: #ffd9c9;
      --tile-text: #5a1e0b;
      --code-bg: #f1f2f5;
      --radius: 14px;
      --gap: 1rem;
      --grad: linear-gradient(135deg, #e4572e, #f3a712);
      --shadow: 0 6px 24px rgb(0 0 0 / .06);
    }}
    :root[data-theme="dark"] {{
      color-scheme: dark;
      --bg: #111316;
      --surface: #1b1e23;
      --text: #e6e8ec;
      --muted: #a2a8b3;
      --border: #2d323a;
      --tile: #5a2a1a;
      --tile-text: #ffd9c9;
      --code-bg: #15181c;
      --shadow: 0 6px 24px rgb(0 0 0 / .4);
    }}
    @media (prefers-color-scheme: dark) {{
      :root:not([data-theme="light"]) {{
        color-scheme: dark;
        --bg: #111316;
        --surface: #1b1e23;
        --text: #e6e8ec;
        --muted: #a2a8b3;
        --border: #2d323a;
        --tile: #5a2a1a;
        --tile-text: #ffd9c9;
        --code-bg: #15181c;
        --shadow: 0 6px 24px rgb(0 0 0 / .4);
      }}
    }}

    *, *::before, *::after {{ box-sizing: border-box; }}
    html {{ scroll-behavior: smooth; scroll-padding-top: 5rem; -webkit-text-size-adjust: none; text-size-adjust: none; }}
    body {{
      margin: 0; min-height: 100dvh;
      font: 400 1rem/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: var(--bg); color: var(--text);
    }}
    img {{ max-width: 100%; height: auto; display: block; }}
    a {{ color: var(--brand); }}
    input, button {{ font: inherit; }}
    input {{ padding: .5rem .7rem; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); width: 100%; }}
    button {{ padding: .55rem 1rem; border: 0; border-radius: 8px; background: var(--brand); color: #fff; font-weight: 700; cursor: pointer; }}
    :focus-visible {{ outline: 3px solid var(--accent); outline-offset: 2px; }}

    .skip {{ position: absolute; left: 1rem; top: -4rem; z-index: 100; padding: .6rem 1rem; background: var(--brand); color: #fff; border-radius: 8px; }}
    .skip:focus {{ top: 1rem; }}

    /* Header: sticky, blurred, nav collapses into a popover on small screens */
    .site-header {{
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; gap: 1rem;
      padding: .8rem clamp(1rem, 4vw, 2rem);
      background: color-mix(in srgb, var(--bg) 80%, transparent);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }}
    .logo {{ font-weight: 800; text-decoration: none; color: var(--text); }}
    .logo span {{ color: var(--brand); }}
    .header-actions {{ margin-inline-start: auto; display: flex; gap: .5rem; align-items: center; }}
    .icon-btn {{ display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; padding: 0 .7rem; font-size: 1.2rem; background: var(--surface); color: var(--text); border: 1px solid var(--border); }}
    .site-nav {{ display: none; }}
    .site-nav a {{ color: var(--text); text-decoration: none; font-weight: 600; }}
    .site-nav a:hover {{ color: var(--brand); }}
    #menu:popover-open {{
      display: flex; flex-direction: column; gap: .3rem;
      position: fixed; inset: 4.5rem 1rem auto auto; margin: 0;
      padding: .6rem; min-width: 220px; max-height: 70vh; overflow: auto;
      background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 14px; box-shadow: var(--shadow);
    }}
    #menu a {{ padding: .5rem .8rem; border-radius: 8px; color: var(--text); text-decoration: none; }}
    #menu a:hover {{ background: var(--code-bg); }}
    @media (width >= 64em) {{
      .site-nav {{ display: flex; gap: 1.5rem; }}
    }}

    /* Intro + table of contents */
    .wrap {{ width: min(100% - 2rem, 76rem); margin-inline: auto; }}
    .intro {{ padding-block: clamp(2rem, 6vw, 4rem) 1rem; }}
    .intro h1 {{ font-size: clamp(2rem, 1.2rem + 3.5vw, 3.6rem); line-height: 1.05; letter-spacing: -.03em; margin: 0 0 .8rem; text-wrap: balance; }}
    .intro p {{ max-width: 65ch; color: var(--muted); margin: 0 0 1rem; }}
    .toc {{
      list-style: none; padding: 0; margin: 1.5rem 0 0;
      display: grid; grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr)); gap: .4rem;
    }}
    .toc a {{ display: block; padding: .55rem .8rem; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); text-decoration: none; color: var(--text); font-weight: 600; }}
    .toc a:hover {{ border-color: var(--brand); color: var(--brand); }}

    /* Layout sections */
    .layout {{
      margin-block: 2rem; padding: clamp(1rem, 3vw, 2rem);
      background: var(--surface); border: 1px solid var(--border); border-radius: 20px; box-shadow: var(--shadow);
    }}
    .layout__head {{ display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1rem; }}
    .layout__head h2 {{ margin: 0; font-size: clamp(1.3rem, 1rem + 1vw, 1.8rem); }}
    .num {{ color: var(--brand); font-variant-numeric: tabular-nums; }}
    .level {{ font-size: .75rem; font-weight: 700; padding: .15rem .7rem; border-radius: 99px; color: #fff; }}
    .level--b {{ background: #2e9d4f; }} .level--i {{ background: #b8860b; }} .level--a {{ background: #d0631c; }}
    .see {{ color: var(--muted); margin: .6rem 0 1rem; }}
    .stage {{ padding: clamp(.6rem, 2vw, 1.2rem); border: 2px dashed color-mix(in srgb, var(--brand) 45%, transparent); border-radius: var(--radius); background: var(--bg); }}
    .tile {{ padding: .8rem; border-radius: 10px; background: var(--tile); color: var(--tile-text); font-weight: 700; }}
    .tile ol {{ font-weight: 400; margin: .4rem 0 0; padding-left: 1.2rem; }}

    .code {{ margin-top: 1rem; border: 1px solid var(--border); border-radius: var(--radius); }}
    .code summary {{ cursor: pointer; padding: .8rem 1rem; font-weight: 700; }}
    .code__grid {{ display: grid; gap: 1rem; padding: 0 1rem 1rem; }}
    @media (width >= 64em) {{ .code__grid {{ grid-template-columns: 1fr 1fr; }} }}
    .code h3 {{ margin: 0 0 .4rem; font-size: .8rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }}
    .code pre {{ margin: 0; padding: 1rem; overflow: auto; border-radius: 10px; background: var(--code-bg); font: .82rem/1.55 ui-monospace, "Cascadia Code", Menlo, monospace; tab-size: 2; }}
    .why h3 {{ margin: 1.2rem 0 .3rem; font-size: 1rem; }}
    .why ul {{ margin: 0; padding-left: 1.2rem; color: var(--muted); }}
    .why li + li {{ margin-top: .3rem; }}
    .why code, .see code {{ background: var(--code-bg); padding: .1em .35em; border-radius: 4px; font-size: .9em; }}

    .btn {{ display: inline-block; padding: .75rem 1.3rem; border-radius: 99px; background: var(--brand); color: #fff; font-weight: 700; text-decoration: none; }}
    .btn--ghost {{ background: transparent; color: var(--text); border: 2px solid var(--border); }}

    .site-footer {{ padding: 2rem 0 3rem; color: var(--muted); text-align: center; }}

    @media (prefers-reduced-motion: reduce) {{
      html {{ scroll-behavior: auto; }}
      *, *::before, *::after {{ transition-duration: .01ms !important; animation-duration: .01ms !important; }}
    }}

    /* ============================================================
       Layout examples (identical to the code shown in each section)
       ============================================================ */
{textwrap.indent(layout_css, '    ')}
  </style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="site-header">
    <a class="logo" href="#top">◆ Layout <span>Gallery</span></a>
    <nav class="site-nav" aria-label="Sections">
      <a href="#holy-grail">Page layouts</a>
      <a href="#cards">Grids</a>
      <a href="#dashboard">App UI</a>
      <a href="#container-query">Modern CSS</a>
    </nav>
    <div class="header-actions">
      <button class="icon-btn" id="theme-toggle" type="button" aria-label="Toggle dark mode"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg></button>
      <button class="icon-btn" type="button" popovertarget="menu" aria-label="All layouts">☰</button>
    </div>
    <nav id="menu" popover aria-label="All layouts">
{toc.replace('        <li>', '      ').replace('</li>', '')}
    </nav>
  </header>

  <main id="main" class="wrap">
    <section class="intro" id="top">
      <h1>{len(L)} responsive layouts, decoded.</h1>
      <p>Every section shows a live layout, describes <strong>what you see</strong>, gives the <strong>exact HTML and CSS</strong> running it, and explains <strong>why it works</strong>. Resize your browser (or rotate your phone) to watch each one adapt.</p>
      <p>This page is itself a responsive layout: a sticky blurred header, a navigation that collapses into a menu on small screens, an auto-fill table of contents, light/dark themes and reduced-motion support. View the source to see how.</p>
      <ol class="toc">
{toc}
      </ol>
    </section>
{''.join(sections)}
  </main>

  <footer class="site-footer">
    <p>Part of the <a href="../">Web UI Frontend Playbook</a>. Plain HTML and CSS, plus a few lines of JavaScript for the theme toggle.</p>
  </footer>

  <script>
    // Theme toggle: system preference by default, remembered per browser when the user picks one.
    (function () {{
      var root = document.documentElement;
      var saved = null;
      try {{ saved = localStorage.getItem('theme'); }} catch (e) {{}}
      if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

      document.getElementById('theme-toggle').addEventListener('click', function () {{
        var isDark = root.dataset.theme
          ? root.dataset.theme === 'dark'
          : matchMedia('(prefers-color-scheme: dark)').matches;
        root.dataset.theme = isDark ? 'light' : 'dark';
        try {{ localStorage.setItem('theme', root.dataset.theme); }} catch (e) {{}}
      }});

      // Close the menu popover after choosing a section.
      var menu = document.getElementById('menu');
      menu.addEventListener('click', function (e) {{
        if (e.target.closest('a') && menu.hidePopover) menu.hidePopover();
      }});
    }})();
  </script>
</body>
</html>
"""

open(OUT, "w").write(page)
print(f"wrote {len(L)} layouts to {OUT}")
