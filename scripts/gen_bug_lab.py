#!/usr/bin/env python3
"""Generate the fixed Bug Lab and the fixed A11y Lab from their broken versions.

docs/devtools/demos/bug-lab.html has 7 planted bugs. bug-lab-fixed.html is the same file with each bug fixed. It is
generated, so the two can never drift apart: each FIX is a (find, replace) pair applied to the broken file, and each
replacement carries a --8<-- [start:fixN] marker that the DevTools page includes as the solution.

    python3 scripts/gen_bug_lab.py docs/devtools/demos

The A11y Lab (a11y-lab.html → a11y-lab-fixed.html, 10 accessibility problems) works the same way, with A11Y_FIXES.

A find string that no longer matches exactly once stops the script (and CI).
"""
import re
import sys
from pathlib import Path

FIXES = [
    ("<title>Bug lab: find the 7 bugs</title>", "<title>Bug lab: all 7 bugs fixed</title>"),
    # 1. Fixed width wider than a phone
    ("    width: 420px;                     /* BUG 1 */\n",
     "    /* --8<-- [start:fix1] */\n"
     "    max-width: 420px;                 /* FIX 1: may be up to 420px, but never wider than its container */\n"
     "    /* --8<-- [end:fix1] */\n"),
    # 2. Specificity: .card p (0,1,1) beats .price (0,1,0)
    ("  .price {\n    color: #0c831f;                   /* BUG 2: why is the price grey? */\n    font-weight: 700;\n  }\n",
     "  /* --8<-- [start:fix2] */\n"
     "  .card .price {                      /* FIX 2: (0,2,0) now beats .card p (0,1,1) */\n"
     "    color: #0c831f;\n"
     "    font-weight: 700;\n"
     "  }\n"
     "  /* --8<-- [end:fix2] */\n"),
    # 3. Typo in a property name: the browser ignores the whole declaration
    ("    grid-template-column: repeat(auto-fill, minmax(200px, 1fr));   /* BUG 3 */\n",
     "    /* --8<-- [start:fix3] */\n"
     "    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* FIX 3: columns, with an s */\n"
     "    /* --8<-- [end:fix3] */\n"),
    # 4. Absolute badge with no positioned ancestor
    ("  .card {\n    padding: 12px;\n",
     "  .card {\n"
     "    /* --8<-- [start:fix4] */\n"
     "    position: relative;               /* FIX 4: the badges are now positioned inside their card */\n"
     "    /* --8<-- [end:fix4] */\n"
     "    padding: 12px;\n"),
    ("    position: absolute;               /* BUG 4 */\n", "    position: absolute;\n"),
    # 7. String + number concatenation
    ("  total = total + card.dataset.price;                           // BUG 7\n",
     "  // --8<-- [start:fix7]\n"
     "  total = total + Number(card.dataset.price);                   // FIX 7: data-* values are strings\n"
     "  // --8<-- [end:fix7]\n"),
    # 5. Selector for an element that doesn't exist
    ('  document.querySelector(".cart-count").textContent = count;    // BUG 5\n',
     "  // --8<-- [start:fix5]\n"
     '  document.querySelector(".cart-badge").textContent = count;    // FIX 5: the class in the HTML is cart-badge\n'
     "  // --8<-- [end:fix5]\n"),
    # 6. Wrong URL: the file is offers.json
    ('    const response = await fetch("offer.json");                  // BUG 6\n',
     "    // --8<-- [start:fix6]\n"
     '    const response = await fetch("offers.json");                 // FIX 6: the file is offers.json\n'
     "    // --8<-- [end:fix6]\n"),
]
A11Y_FIXES = [
    ("<title>A11y lab: find the 10 accessibility problems</title>",
     "<title>A11y lab: all 10 problems fixed</title>"),
    # A1. The page language
    ("<html>\n", "<!-- --8<-- [start:fix-a1] -->\n<html lang=\"en\">\n<!-- --8<-- [end:fix-a1] -->\n"),
    # A2. Contrast
    ("    color: #b0b0b0;                           /* A2 */\n",
     "    /* --8<-- [start:fix-a2] */\n"
     "    color: #5b6370;                           /* FIX A2: 6.1 : 1 on white (was 2.2 : 1) */\n"
     "    /* --8<-- [end:fix-a2] */\n"),
    # A6. Visible focus (keyboard only)
    ("  a:focus, button:focus, input:focus {\n    outline: none;                            /* A6 */\n  }\n",
     "  /* --8<-- [start:fix-a6] */\n"
     "  :focus-visible {                          /* FIX A6: a clear ring for keyboard users only */\n"
     "    outline: 3px solid #2563eb;\n"
     "    outline-offset: 2px;\n"
     "  }\n"
     "  /* --8<-- [end:fix-a6] */\n"),
    # A5. The ADD control becomes a real button: it needs the button reset
    ("  .add { padding: 8px 16px; border-radius: 8px; background: #0c831f; color: #fff; font-weight: 700; cursor: pointer; }\n",
     "  .add { padding: 8px 16px; border: 0; border-radius: 8px; background: #0c831f; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }\n"),
    # A7. The dialog: native <dialog> styles
    ("  .dialog {\n    position: fixed;\n    inset: 30% 16px auto;\n    max-width: 360px;\n    margin: auto;\n",
     "  /* --8<-- [start:fix-a7-css] */\n"
     "  .dialog {\n    max-width: 360px;\n    border: 0;\n"),
    ("  .dialog[hidden] { display: none; }\n  .close { position: absolute; top: 8px; right: 12px; font-size: 1.4rem; cursor: pointer; }\n",
     "  .dialog::backdrop { background: rgb(0 0 0 / 0.4); }\n"
     "  .dialog h2 { margin: 0 0 8px; font-size: 1.1rem; }\n"
     "  .close { position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; border: 0; border-radius: 50%; background: none; font: inherit; font-size: 1.4rem; cursor: pointer; }\n"
     "  /* --8<-- [end:fix-a7-css] */\n"
     "  /* --8<-- [start:fix-a4-css] */\n"
     "  .visually-hidden {                        /* hidden on screen, still read by screen readers */\n"
     "    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n"
     "    clip-path: inset(50%);\n    white-space: nowrap;\n  }\n"
     "  /* --8<-- [end:fix-a4-css] */\n"),
    # A3. Icon-only button needs a name
    ('    <button class="icon-btn" type="button">\n',
     "    <!-- --8<-- [start:fix-a3] -->\n"
     '    <button class="icon-btn" type="button" aria-label="Cart">\n'),
    ('aria-hidden="true"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 4H2V2h4.8l.9 2H22l-3.4 8H8.5l-.9 2H19v2H5l2.4-4.6L5.2 4Z"/></svg>\n    </button>\n',
     'aria-hidden="true"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 4H2V2h4.8l.9 2H22l-3.4 8H8.5l-.9 2H19v2H5l2.4-4.6L5.2 4Z"/></svg>\n    </button>\n'
     "    <!-- --8<-- [end:fix-a3] -->\n"),
    # A9. Announce cart changes
    ('    <span class="count" id="count">0</span>\n',
     "    <!-- --8<-- [start:fix-a9] -->\n"
     '    <span class="count" role="status"><span id="count">0</span><span class="visually-hidden"> in cart</span></span>\n'
     "    <!-- --8<-- [end:fix-a9] -->\n"),
    # A8. Heading levels
    ("  <h4>Today's picks</h4>\n",
     "  <!-- --8<-- [start:fix-a8] -->\n  <h2>Today's picks</h2>\n  <!-- --8<-- [end:fix-a8] -->\n"),
    # A4. A real label
    ('    <input type="search" name="q" placeholder="Search products">\n',
     "    <!-- --8<-- [start:fix-a4] -->\n"
     '    <label class="visually-hidden" for="q">Search products</label>\n'
     '    <input id="q" type="search" name="q" placeholder="e.g. apples, milk">\n'
     "    <!-- --8<-- [end:fix-a4] -->\n"),
    # A10. Image alternative text
    ('    <img src="apple.svg" width="96" height="96">\n',
     "    <!-- --8<-- [start:fix-a10] -->\n"
     '    <img src="apple.svg" width="96" height="96" alt="">\n'
     "    <!-- --8<-- [end:fix-a10] -->\n"),
    # A5. A real button
    ('    <div class="add" onclick="addToCart()">ADD</div>\n',
     "    <!-- --8<-- [start:fix-a5] -->\n"
     '    <button class="add" type="button" onclick="addToCart()" aria-label="Add Shimla Apple to cart">ADD</button>\n'
     "    <!-- --8<-- [end:fix-a5] -->\n"),
    # A7. A real modal dialog
    ('  <div class="dialog" id="info" hidden>\n'
     "    <p>We deliver from 6 am to midnight, every day, in about 10 minutes.</p>\n"
     '    <span class="close" onclick="closeInfo()">×</span>\n'
     "  </div>\n",
     "  <!-- --8<-- [start:fix-a7-html] -->\n"
     '  <dialog class="dialog" id="info" aria-labelledby="info-title">\n'
     '    <h2 id="info-title">Delivery info</h2>\n'
     "    <p>We deliver from 6 am to midnight, every day, in about 10 minutes.</p>\n"
     '    <form method="dialog">\n'
     '      <button class="close" aria-label="Close">×</button>\n'
     "    </form>\n"
     "  </dialog>\n"
     "  <!-- --8<-- [end:fix-a7-html] -->\n"),
    ('function openInfo() {\n  document.querySelector("#info").hidden = false;\n}\n'
     'function closeInfo() {\n  document.querySelector("#info").hidden = true;\n}\n',
     "// --8<-- [start:fix-a7-js]\n"
     "function openInfo() {\n"
     '  document.querySelector("#info").showModal();   // moves focus in, traps Tab, Esc closes, focus returns after\n'
     "}\n"
     "// --8<-- [end:fix-a7-js]\n"),
]

LAB_MARKER = re.compile(r"^[ \t]*(?:<!-- |/\* |// )--8<-- \[(?:start|end):[\w-]+\](?: -->| \*/)?\n", re.M)


def fix(out: Path, broken: str, fixed: str, fixes) -> None:
    text = LAB_MARKER.sub("", (out / broken).read_text(encoding="utf-8"))
    for find, replace in fixes:
        count = text.count(find)
        if count != 1:
            raise SystemExit(f"{broken}: expected exactly one match, found {count}:\n{find}")
        text = text.replace(find, replace)
    text = text.replace("<!doctype html>\n", f"<!doctype html>\n<!-- Generated by scripts/gen_bug_lab.py from "
                        f"{broken}. Edit {broken} or the generator, not this file. -->\n", 1)
    (out / fixed).write_text(text, encoding="utf-8")
    print(f"wrote {out / fixed}")


def main(out_dir: str) -> None:
    out = Path(out_dir)
    fix(out, "bug-lab.html", "bug-lab-fixed.html", FIXES)
    fix(out, "a11y-lab.html", "a11y-lab-fixed.html", A11Y_FIXES)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "docs/devtools/demos")
