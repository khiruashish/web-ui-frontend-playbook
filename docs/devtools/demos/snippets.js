// Console snippets from the DevTools page. Paste one into the Console (or save it under Sources → Snippets) and press Enter.
// They are tested against the bug lab by coding-interview/run-tests.mjs.

// --8<-- [start:find-overflow]
// Which elements stick out past the right edge of the screen? (the cause of sideways scrolling)
{
  const pageWidth = document.documentElement.clientWidth;
  const culprits = [...document.querySelectorAll("body *")].filter(
    (el) => el.getBoundingClientRect().right > pageWidth + 1,
  );
  console.log(culprits.length ? culprits : "Nothing overflows 🎉");
}
// --8<-- [end:find-overflow]

// --8<-- [start:outline-all]
// Draw an outline around every element: makes margins, gaps and invisible boxes visible. Run it again to remove.
{
  const existing = document.getElementById("debug-outlines");
  if (existing) {
    existing.remove();
    console.log("outlines off");
  } else {
    const style = document.createElement("style");
    style.id = "debug-outlines";
    style.textContent = "* { outline: 1px solid rgb(255 0 0 / 0.5) !important; }";
    document.head.append(style);
    console.log("outlines on");
  }
}
// --8<-- [end:outline-all]

// --8<-- [start:log-focus]
// Log every element that receives keyboard focus: press Tab around the page and read the order.
document.addEventListener("focusin", (event) => {
  const el = event.target;
  console.log("focus →", el.tagName.toLowerCase() + (el.id ? `#${el.id}` : "") + (el.className ? `.${String(el.className).split(" ").join(".")}` : ""), el);
});
// --8<-- [end:log-focus]
