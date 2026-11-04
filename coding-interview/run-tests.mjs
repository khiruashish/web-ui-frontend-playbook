// Runs every coding-interview check and writes one report per problem to outputs/ (shown on the docs pages).
//   node run-tests.mjs          run all checks, (re)write outputs/
//   node run-tests.mjs --check  CI: fail on any failing check or a report that differs from the committed one
// Browser problems run in real Chromium (Playwright) against docs/coding-interview/demos/*.html.
import assert from "node:assert/strict";
import { mock } from "node:test";
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { debounce, throttle } from "./js/debounce-throttle.mjs";
import { promiseAll, promiseAllSettled, pool } from "./js/promise-utils.mjs";
import { deepClone, deepEqual } from "./js/deep-clone.mjs";

const { chromium } = createRequire(import.meta.url)("playwright");   // CommonJS resolution: local node_modules or NODE_PATH
const here = path.dirname(fileURLToPath(import.meta.url));
const demo = (file) => pathToFileURL(path.join(here, "..", "docs", "coding-interview", "demos", file)).href;
const store = pathToFileURL(path.join(here, "..", "docs", "ecommerce", "demos", "store.html")).href;  // the E-commerce tab's page
const solved = store.replace(/store\.html$/, "store-solved.html");   // the same page with every exercise solved
const CHECK = process.argv.includes("--check");

const browser = await chromium.launch();
async function open(file, { width = 1200, height = 800, colorScheme = "light", context } = {}) {
  const ctx = context ?? (await browser.newContext({ viewport: { width, height }, colorScheme }));
  const page = await ctx.newPage();
  await page.goto(/^(file|https?):/.test(file) ? file : demo(file));
  return { page, ctx };
}
const rect = (page, sel) => page.locator(sel).first().evaluate((el) => el.getBoundingClientRect().toJSON());
const near = (a, b, tol = 1.5) => Math.abs(a - b) <= tol;

const problems = [
  ["01-centering", [
    ["grid, flex and absolute centre the item on both axes (desktop)", async () => {
      const { page, ctx } = await open("01-centering.html");
      for (const kind of ["grid", "flex", "absolute"]) {
        const box = await rect(page, `[data-test=${kind}]`), item = await rect(page, `[data-test=${kind}] .item`);
        assert.ok(near(item.x + item.width / 2, box.x + box.width / 2) && near(item.y + item.height / 2, box.y + box.height / 2), kind);
      }
      await ctx.close();
    }],
    ["still centred at phone width (boxes stack)", async () => {
      const { page, ctx } = await open("01-centering.html", { width: 375 });
      const a = await rect(page, "[data-test=grid]"), b = await rect(page, "[data-test=flex]");
      assert.ok(b.y > a.y + a.height - 1, "stacked");
      const item = await rect(page, "[data-test=flex] .item");
      assert.ok(near(item.x + item.width / 2, b.x + b.width / 2));
      await ctx.close();
    }],
  ]],
  ["02-holy-grail", [
    ["desktop: nav | main | aside in one row under a full-width header", async () => {
      const { page, ctx } = await open("02-holy-grail.html", { width: 1200 });
      const [h, n, m, a] = await Promise.all(["header", "nav", "main", "aside"].map((s) => rect(page, s)));
      assert.ok(near(h.width, 1200) && near(n.width, 200) && near(a.width, 240));
      assert.ok(n.x < m.x && m.x < a.x && near(n.y, m.y) && near(m.y, a.y));
      await ctx.close();
    }],
    ["footer sits at the bottom of the viewport even with little content", async () => {
      const { page, ctx } = await open("02-holy-grail.html", { width: 1200, height: 900 });
      const f = await rect(page, "footer");
      assert.ok(near(f.y + f.height, 900));
      await ctx.close();
    }],
    ["mobile: everything stacks in source order, full width", async () => {
      const { page, ctx } = await open("02-holy-grail.html", { width: 400 });
      const rs = await Promise.all(["header", "nav", "main", "aside", "footer"].map((s) => rect(page, s)));
      rs.forEach((r, i) => { assert.ok(near(r.width, 400)); if (i) assert.ok(r.y >= rs[i - 1].y + rs[i - 1].height - 1); });
      await ctx.close();
    }],
  ]],
  ["03-card-grid", [
    ["4 columns at 1200 px, 2 at 700 px, 1 at 375 px", async () => {
      for (const [width, cols] of [[1200, 4], [700, 2], [375, 1]]) {
        const { page, ctx } = await open("03-card-grid.html", { width });
        const tops = await page.locator(".card").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
        assert.equal(tops.filter((t) => t === tops[0]).length, cols, `width ${width}`);
        await ctx.close();
      }
    }],
    ["no horizontal overflow on a 320 px screen", async () => {
      const { page, ctx } = await open("03-card-grid.html", { width: 320 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await ctx.close();
    }],
    ["buttons line up at the bottom of every card in a row", async () => {
      const { page, ctx } = await open("03-card-grid.html", { width: 1200 });
      const bottoms = await page.locator(".card a").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().bottom)));
      assert.equal(new Set(bottoms).size, 1);
      await ctx.close();
    }],
  ]],
  ["04-sticky-header", [
    ["site header stays at the top after scrolling 1000 px", async () => {
      const { page, ctx } = await open("04-sticky-header.html");
      await page.evaluate(() => scrollTo(0, 1000));
      assert.ok(near((await rect(page, ".site-header")).y, 0));
      await ctx.close();
    }],
    ["table header sticks inside its own scroll container", async () => {
      const { page, ctx } = await open("04-sticky-header.html");
      await page.locator(".scroll").evaluate((el) => (el.scrollTop = 300));
      const box = await rect(page, ".scroll"), th = await rect(page, "th");
      assert.ok(near(th.y, box.y + 1, 2));                 // + 1 px border
      await ctx.close();
    }],
    ["jump links land below the header (scroll-padding-top)", async () => {
      const { page, ctx } = await open("04-sticky-header.html");
      await page.evaluate(() => document.getElementById("faq").scrollIntoView());
      const header = await rect(page, ".site-header"), faq = await rect(page, "#faq");
      assert.ok(faq.y >= header.height - 1, `faq at ${faq.y}, header ${header.height}`);
      await ctx.close();
    }],
  ]],
  ["05-modal-dialog", [
    ["opening moves focus into the dialog and makes it modal", async () => {
      const { page, ctx } = await open("05-modal-dialog.html");
      await page.click("#open");
      assert.ok(await page.evaluate(() => document.getElementById("confirm").matches(":modal")));
      assert.equal(await page.evaluate(() => document.activeElement.name), "confirm");
      await ctx.close();
    }],
    ["Escape closes it and focus returns to the opener", async () => {
      const { page, ctx } = await open("05-modal-dialog.html");
      await page.click("#open");
      await page.keyboard.press("Escape");
      assert.equal(await page.evaluate(() => document.getElementById("confirm").open), false);
      assert.equal(await page.evaluate(() => document.activeElement.id), "open");
      await ctx.close();
    }],
    ["clicking the backdrop cancels", async () => {
      const { page, ctx } = await open("05-modal-dialog.html");
      await page.click("#open");
      await page.mouse.click(5, 5);
      await page.waitForFunction(() => document.getElementById("result").textContent !== "");   // "close" fires asynchronously
      assert.equal(await page.textContent("#result"), "Cancelled");
      await ctx.close();
    }],
    ["typing DELETE and confirming deletes", async () => {
      const { page, ctx } = await open("05-modal-dialog.html");
      await page.click("#open");
      await page.keyboard.type("DELETE");
      await page.getByRole("button", { name: "Delete", exact: true }).click();
      await page.waitForFunction(() => document.getElementById("result").textContent !== "");
      assert.equal(await page.textContent("#result"), "Account deleted");
      await ctx.close();
    }],
  ]],
  ["06-tabs", [
    ["the tablist is ONE tab stop (roving tabindex)", async () => {
      const { page, ctx } = await open("06-tabs.html");
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement.id), "tab-profile");
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement.id), "panel-profile");   // next stop is the panel, not another tab
      await ctx.close();
    }],
    ["ArrowRight selects the next tab and shows only its panel", async () => {
      const { page, ctx } = await open("06-tabs.html");
      await page.focus("#tab-profile");
      await page.keyboard.press("ArrowRight");
      assert.equal(await page.getAttribute("#tab-security", "aria-selected"), "true");
      assert.ok(await page.isVisible("#panel-security"));
      assert.ok(await page.isHidden("#panel-profile"));
      await ctx.close();
    }],
    ["End jumps to the last tab, ArrowRight wraps to the first", async () => {
      const { page, ctx } = await open("06-tabs.html");
      await page.focus("#tab-profile");
      await page.keyboard.press("End");
      assert.equal(await page.evaluate(() => document.activeElement.id), "tab-billing");
      await page.keyboard.press("ArrowRight");
      assert.equal(await page.evaluate(() => document.activeElement.id), "tab-profile");
      assert.equal(await page.locator('[role=tab][tabindex="0"]').count(), 1);
      await ctx.close();
    }],
  ]],
  ["07-star-rating", [
    ["clicking the 4th star checks 4 and lights up exactly 4 stars", async () => {
      const { page, ctx } = await open("07-star-rating.html");
      await page.click('label[for="s4"]');
      await page.mouse.move(600, 600);                     // remove the hover preview
      assert.ok(await page.isChecked("#s4"));
      const lit = await page.locator(".rating label").evaluateAll((els) => els.filter((e) => getComputedStyle(e).color === "rgb(245, 158, 11)").length);
      assert.equal(lit, 4);
      await ctx.close();
    }],
    ["each star has an accessible name and the stars ARE native radios", async () => {
      const { page, ctx } = await open("07-star-rating.html");
      for (const n of ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"]) assert.equal(await page.getByRole("radio", { name: n, exact: true }).count(), 1, n);
      await ctx.close();
    }],
    ["arrow keys change the rating (keyboard support for free)", async () => {
      const { page, ctx } = await open("07-star-rating.html");
      await page.click('label[for="s3"]');
      await page.keyboard.press("ArrowRight");             // next radio in DOM order = 2 stars
      assert.equal(await page.evaluate(() => new FormData(document.getElementById("review")).get("stars")), "2");
      await ctx.close();
    }],
  ]],
  ["08-theme-toggle", [
    ["follows the OS preference when nothing is saved", async () => {
      for (const [scheme, bg] of [["dark", "rgb(11, 16, 32)"], ["light", "rgb(255, 255, 255)"]]) {
        const { page, ctx } = await open("08-theme-toggle.html", { colorScheme: scheme });
        assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), bg, scheme);
        await ctx.close();
      }
    }],
    ["toggle overrides the OS and updates aria-pressed", async () => {
      const { page, ctx } = await open("08-theme-toggle.html", { colorScheme: "dark" });
      assert.equal(await page.getAttribute("#toggle", "aria-pressed"), "true");
      await page.click("#toggle");
      // Read the TOKEN, not body's background: the 0.2 s colour transition makes computed colours lag behind
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()), "#ffffff");
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme), "light");
      assert.equal(await page.getAttribute("#toggle", "aria-pressed"), "false");
      await ctx.close();
    }],
    ["the choice survives a reload and is applied before first paint", async () => {
      const ctx = await browser.newContext({ colorScheme: "dark" });
      const page = await ctx.newPage();
      await page.goto("http://localhost:4317/08-theme-toggle.html");   // localStorage needs an http origin
      await page.click("#toggle");
      await page.reload();
      assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(255, 255, 255)");
      await ctx.close();
    }],
  ]],
  ["09-debounce-throttle", [
    ["debounce: 5 rapid calls -> 1 call with the LAST arguments", async () => {
      mock.timers.enable({ apis: ["setTimeout", "Date"] });
      try {
        const calls = []; const d = debounce((q) => calls.push(q), 200);
        for (const q of ["j", "ja", "jav", "java", "javas"]) { d(q); mock.timers.tick(50); }
        assert.deepEqual(calls, []);
        mock.timers.tick(200);
        assert.deepEqual(calls, ["javas"]);
      } finally { mock.timers.reset(); }
    }],
    ["debounce leading: fires immediately, then once more at the end", async () => {
      mock.timers.enable({ apis: ["setTimeout", "Date"] });
      try {
        const calls = []; const d = debounce((x) => calls.push(x), 200, { leading: true });
        d("a"); mock.timers.tick(50); d("b"); mock.timers.tick(50); d("c");
        assert.deepEqual(calls, ["a"]);
        mock.timers.tick(200);
        assert.deepEqual(calls, ["a", "c"]);
      } finally { mock.timers.reset(); }
    }],
    ["debounce keeps `this` and cancel() drops the pending call", async () => {
      mock.timers.enable({ apis: ["setTimeout", "Date"] });
      try {
        const obj = { n: 0, inc: debounce(function () { this.n++; }, 100) };
        obj.inc(); mock.timers.tick(100);
        obj.inc(); obj.inc.cancel(); mock.timers.tick(100);
        assert.equal(obj.n, 1);
      } finally { mock.timers.reset(); }
    }],
    ["throttle: calls every 10 ms -> first call, then the LATEST call at each 50 ms window end", async () => {
      mock.timers.enable({ apis: ["setTimeout", "Date"] });
      try {
        const calls = [], times = []; const t = throttle((i) => { calls.push(i); times.push(Date.now()); }, 50);
        for (let i = 0; i <= 10; i++) { t(i); mock.timers.tick(10); }
        mock.timers.tick(100);
        assert.deepEqual(calls, [0, 4, 9, 10]);
        for (let k = 1; k < times.length; k++) assert.ok(times[k] - times[k - 1] >= 50, "at most one call per window");
      } finally { mock.timers.reset(); }
    }],
  ]],
  ["10-promise-utils", [
    ["promiseAll keeps input order, not completion order", async () => {
      const delay = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
      assert.deepEqual(await promiseAll([delay(30, "a"), delay(10, "b"), "c"]), ["a", "b", "c"]);
    }],
    ["promiseAll rejects with the first rejection; [] resolves immediately", async () => {
      await assert.rejects(promiseAll([Promise.resolve(1), Promise.reject(new Error("boom")), new Promise(() => {})]), /boom/);
      assert.deepEqual(await promiseAll([]), []);
    }],
    ["promiseAllSettled reports every outcome", async () => {
      const r = await promiseAllSettled([Promise.resolve(1), Promise.reject(new Error("no"))]);
      assert.deepEqual(r.map((x) => x.status), ["fulfilled", "rejected"]);
      assert.equal(r[1].reason.message, "no");
    }],
    ["matches the built-ins on the same inputs", async () => {
      const inputs = () => [1, Promise.resolve(2), new Promise((r) => setTimeout(() => r(3), 5))];
      assert.deepEqual(await promiseAll(inputs()), await Promise.all(inputs()));
      assert.deepEqual(await promiseAllSettled(inputs()), await Promise.allSettled(inputs()));
    }],
    ["pool never exceeds the limit and returns results in order", async () => {
      let inFlight = 0, max = 0;
      const tasks = Array.from({ length: 12 }, (_, i) => async () => {
        max = Math.max(max, ++inFlight);
        await new Promise((r) => setTimeout(r, 5 + ((i * 7) % 11)));
        inFlight--; return i * i;
      });
      const res = await pool(tasks, 3);
      assert.equal(max, 3);
      assert.deepEqual(res, Array.from({ length: 12 }, (_, i) => i * i));
    }],
  ]],
  ["11-deep-clone", [
    ["clones nested objects, arrays, Date, RegExp, Map, Set and symbol keys", async () => {
      const sym = Symbol("id");
      const src = { a: [1, { b: 2 }], d: new Date(0), r: /x+/gi, m: new Map([["k", { v: 1 }]]), s: new Set([1, 2]), [sym]: "s" };
      const c = deepClone(src);
      assert.ok(deepEqual(c, src));
      assert.notEqual(c.a[1], src.a[1]); assert.notEqual(c.m.get("k"), src.m.get("k"));
      assert.ok(c.d instanceof Date && c.r.flags === "gi" && c[sym] === "s");
    }],
    ["mutating the clone never affects the original", async () => {
      const src = { list: [{ qty: 1 }] };
      const c = deepClone(src); c.list[0].qty = 99; c.list.push({});
      assert.deepEqual(src, { list: [{ qty: 1 }] });
    }],
    ["handles cycles and shared references", async () => {
      const shared = { x: 1 }; const src = { left: shared, right: shared }; src.self = src;
      const c = deepClone(src);
      assert.equal(c.self, c); assert.equal(c.left, c.right); assert.notEqual(c.left, shared);
      assert.ok(deepEqual(c, src));
    }],
    ["keeps the prototype (class instances stay instances)", async () => {
      class Money { constructor(c) { this.cents = c; } format() { return (this.cents / 100).toFixed(2); } }
      assert.equal(deepClone(new Money(1250)).format(), "12.50");
    }],
    ["deepEqual: NaN, different types, missing keys, Map values", async () => {
      assert.ok(deepEqual({ n: NaN }, { n: NaN }));
      assert.ok(!deepEqual([1, 2], { 0: 1, 1: 2, length: 2 }));
      assert.ok(!deepEqual({ a: 1 }, { a: 1, b: undefined }));
      assert.ok(!deepEqual(new Map([["k", 1]]), new Map([["k", 2]])));
      assert.ok(!deepEqual(new Date(0), new Date(1)));
    }],
  ]],
  ["12-infinite-scroll", [
    ["first page of 20 loads on open", async () => {
      const { page, ctx } = await open("12-infinite-scroll.html", { height: 700 });
      await page.waitForFunction(() => document.querySelectorAll("#feed li").length === 20);
      await ctx.close();
    }],
    ["scrolling to the bottom loads the next page; never loads twice at once", async () => {
      const { page, ctx } = await open("12-infinite-scroll.html", { height: 700 });
      await page.waitForFunction(() => document.querySelectorAll("#feed li").length === 20);
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.waitForFunction(() => document.querySelectorAll("#feed li").length === 40);
      await ctx.close();
    }],
    ["keeps going to the end: 75 unique posts, then stops", async () => {
      const { page, ctx } = await open("12-infinite-scroll.html", { height: 700 });
      for (let i = 0; i < 10; i++) { await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(150); }
      await page.waitForFunction(() => document.getElementById("status").textContent === "All 75 posts loaded");
      const texts = await page.locator("#feed li").allTextContents();
      assert.equal(texts.length, 75); assert.equal(new Set(texts).size, 75);
      await ctx.close();
    }],
    ["a very tall screen keeps loading without any scroll (observer only fires on change)", async () => {
      const { page, ctx } = await open("12-infinite-scroll.html", { height: 4000 });
      await page.waitForFunction(() => document.querySelectorAll("#feed li").length >= 60, null, { timeout: 5000 });
      await ctx.close();
    }],
  ]],
  ["13-ecommerce-store", [
    ["no horizontal scroll at 320, 375, 768 and 1280 px", async () => {
      for (const width of [320, 375, 768, 1280]) {
        const { page, ctx } = await open(store, { width });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `${width}px`);
        await ctx.close();
      }
    }],
    ["header: search on its own row on a phone, one row on desktop", async () => {
      let { page, ctx } = await open(store, { width: 375 });
      let [logo, search] = await Promise.all([rect(page, ".logo"), rect(page, ".search")]);
      assert.ok(search.y > logo.y + logo.height - 1 && near(search.width, 375 - 32, 2), "phone: full-width second row");
      await ctx.close();
      ({ page, ctx } = await open(store, { width: 1280 }));
      [logo, search] = await Promise.all([rect(page, ".logo"), rect(page, ".search")]);
      const cart = await rect(page, ".cart-button");
      assert.ok(search.y < logo.y + logo.height && cart.y < logo.y + logo.height && logo.x < search.x && search.x < cart.x, "desktop: one row");
      await ctx.close();
    }],
    ["product grid: 2 cards per row at 375 px, 4 at 1280 px; ADD buttons line up", async () => {
      for (const [width, cols] of [[375, 2], [1280, 4]]) {
        const { page, ctx } = await open(store, { width });
        const tops = await page.locator(".product-card").evaluateAll((cards) => cards.map((c) => Math.round(c.getBoundingClientRect().top)));
        assert.equal(tops.filter((t) => t === tops[0]).length, cols, `${width}px`);
        const btns = await page.locator(".product-card [data-add]").evaluateAll((b) => b.slice(0, 2).map((x) => x.getBoundingClientRect().bottom));
        assert.ok(near(btns[0], btns[1]), "buttons aligned");
        await ctx.close();
      }
    }],
    ["ADD → stepper → badge → drawer totals (₹25 fee below ₹199, FREE above)", async () => {
      const { page, ctx } = await open(store, { width: 1280 });
      const banana = page.locator('[data-id="banana"]');
      await banana.locator("[data-add]").click();
      assert.ok(await banana.locator("[data-add]").isHidden());
      assert.equal(await banana.locator("output").textContent(), "1");
      assert.ok(await banana.locator("[data-inc]").evaluate((el) => el === document.activeElement), "focus moves to +");
      await banana.locator("[data-inc]").click();                                  // 2 × ₹49 = ₹98
      assert.equal(await page.locator(".site-header [data-cart-count]").textContent(), "2");
      assert.equal(await page.locator(".cart-button").getAttribute("aria-label"), "Open cart, 2 items");
      await page.locator(".site-header [data-open-cart]").click();
      assert.equal(await page.locator("[data-subtotal]").textContent(), "₹98");
      assert.equal(await page.locator("[data-delivery]").textContent(), "₹25");
      assert.equal(await page.locator("[data-total]").textContent(), "₹123");
      await page.keyboard.press("Escape");
      await page.locator('[data-id="apple"] [data-add]').click();                 // + ₹189 = ₹287
      assert.equal(await page.locator("[data-delivery]").textContent(), "FREE");
      assert.equal(await page.locator("[data-total]").textContent(), "₹287");
      await banana.locator("[data-dec]").click(); await banana.locator("[data-dec]").click();
      assert.ok(await banana.locator("[data-add]").isVisible(), "back to ADD at 0");
      assert.equal(await page.locator("[data-cart-items] li").count(), 1);
      await ctx.close();
    }],
    ["cart drawer: modal, full width on a phone, Esc closes, empty state", async () => {
      const { page, ctx } = await open(store, { width: 375 });
      await page.locator(".site-header [data-open-cart]").click();
      await page.locator("#cart").evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));  // let the slide-in finish
      const d = await rect(page, "#cart");
      assert.ok(near(d.x, 0) && near(d.width, 375) && await page.locator("#cart").evaluate((el) => el.matches(":modal")));
      assert.ok(await page.locator("[data-cart-empty]").isVisible());
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#cart").evaluate((el) => el.open), false);
      await ctx.close();
    }],
    ["filters + sort: Dairy shows 3, deals-only narrows, price sort reorders", async () => {
      const { page, ctx } = await open(store, { width: 1280 });
      assert.equal(await page.locator("[data-filters]").evaluate((el) => el.open), true, "sidebar open on desktop");
      await page.getByLabel("Dairy & Eggs").check();
      assert.equal(await page.locator("[data-result-count]").textContent(), "3");
      await page.getByLabel("Only discounted items").check();
      assert.equal(await page.locator("[data-result-count]").textContent(), "1");
      await page.getByLabel("Only discounted items").uncheck(); await page.getByLabel("Dairy & Eggs").uncheck();
      await page.locator("[data-sort]").selectOption("price-asc");
      const prices = await page.locator(".product-card").evaluateAll((cards) => cards.map((c) => +c.dataset.price));
      assert.deepEqual(prices, [...prices].sort((a, b) => a - b));
      await ctx.close();
    }],
    ["phone: filters collapsed, bottom nav visible and opens the cart; hidden on desktop", async () => {
      let { page, ctx } = await open(store, { width: 375 });
      assert.equal(await page.locator("[data-filters]").evaluate((el) => el.open), false);
      await page.locator(".bottom-nav [data-open-cart]").click();
      assert.ok(await page.locator("#cart").evaluate((el) => el.open));
      await ctx.close();
      ({ page, ctx } = await open(store, { width: 1280 }));
      assert.ok(await page.locator(".bottom-nav").isHidden());
      await ctx.close();
    }],
  ]],
  ["14-javascript-demos", [
    ["DOM: renders 3 products from the array; buttons change text, classes and add an item", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/06-dom.html");
      assert.deepEqual(await page.locator("#product-list li span:first-child").allTextContents(), ["Shimla Apple", "Robusta Banana", "Full Cream Milk"]);
      await page.click("#rename");
      assert.equal(await page.textContent("#title"), "Fresh picks for you");
      await page.click("#highlight");
      assert.equal(await page.locator("#product-list li.highlight").count(), 2);   // ₹49 and ₹68
      await page.click("#add");
      assert.equal(await page.locator("#product-list li").first().locator("span").first().textContent(), "Brown Eggs");
      assert.ok(await page.locator("#add").isDisabled());
      await ctx.close();
    }],
    ["events: counter never goes below 0; live search filters; Esc clears it", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/07-events.html");
      await page.click("#minus");
      assert.equal(await page.textContent("#qty"), "0");
      await page.click("#plus"); await page.click("#plus");
      assert.equal(await page.textContent("#qty"), "2");
      await page.fill("#search", "ba");
      assert.deepEqual(await page.locator("#results li:visible").allTextContents(), ["Banana"]);
      await page.fill("#search", "b");
      assert.equal(await page.locator("#results li:visible").count(), 3);
      await page.press("#search", "Escape");
      assert.equal(await page.locator("#results li:visible").count(), 5);
      await ctx.close();
    }],
    ["events: form blocks a bad pincode without reloading; delegation removes the right row", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/07-events.html");
      await page.evaluate(() => (window.__marker = 1));
      await page.fill("#pincode", "5600");
      await page.press("#pincode", "Enter");
      assert.equal(await page.getAttribute("#pincode", "aria-invalid"), "true");
      assert.match(await page.textContent("#pincode-msg"), /6-digit/);
      assert.equal(await page.evaluate(() => window.__marker), 1, "page did not reload");
      await page.fill("#pincode", "560001");
      await page.click("#pincode-form button");
      assert.match(await page.textContent("#pincode-msg"), /560001/);
      await page.locator("#cart li", { hasText: "Milk" }).getByRole("button").click();
      assert.deepEqual((await page.locator("#cart li").allTextContents()).map((t) => t.replace("Remove", "").trim()), ["Apple", "Bread"]);
      await ctx.close();
    }],
    ["fetch: shows Loading…, then 4 products; a 404 shows a friendly error and re-enables the buttons", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/08-fetch.html");
      await page.click("#load");
      assert.equal(await page.textContent("#status"), "Loading…");
      assert.ok(await page.locator("#load").isDisabled());
      await page.waitForFunction(() => document.querySelectorAll("#grid li").length === 4);
      assert.equal(await page.textContent("#status"), "4 products loaded.");
      await page.click("#broken");
      await page.waitForFunction(() => document.querySelector("#status").classList.contains("error"));
      assert.match(await page.textContent("#status"), /404/);
      assert.equal(await page.locator("#grid li").count(), 0);
      assert.ok(await page.locator("#load").isEnabled());
      await ctx.close();
    }],
  ]],
  ["15-javascript-solutions", [
    ["DOM solved: sort by price, × removes a row, total stays in sync", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/06-dom-solved.html");
      assert.equal(await page.textContent("#total"), "Total: ₹306");                    // 189 + 49 + 68
      await page.click("#add");
      assert.equal(await page.textContent("#total"), "Total: ₹390");
      await page.click("#sort");
      const prices = await page.locator("#product-list li").evaluateAll((lis) => lis.map((li) => +li.dataset.price));
      assert.deepEqual(prices, [4900, 6800, 8400, 18900]);
      await page.getByRole("button", { name: "Remove Shimla Apple" }).click();
      assert.equal(await page.locator("#product-list li").count(), 3);
      assert.equal(await page.textContent("#total"), "Total: ₹201");
      await ctx.close();
    }],
    ["events solved: − disabled at 0, 'No results' message, added items can be removed", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/07-events-solved.html");
      assert.ok(await page.locator("#minus").isDisabled());
      await page.click("#plus");
      assert.ok(await page.locator("#minus").isEnabled());
      await page.click("#minus");
      assert.ok(await page.locator("#minus").isDisabled());
      await page.fill("#search", "zzz");
      assert.ok(await page.locator("#no-results").isVisible());
      await page.fill("#search", "milk");
      assert.ok(await page.locator("#no-results").isHidden());
      await page.fill("#new-item", "Eggs");
      await page.press("#new-item", "Enter");
      assert.equal(await page.locator("#cart li").count(), 4);
      assert.equal(await page.inputValue("#new-item"), "");
      await page.locator("#cart li", { hasText: "Eggs" }).getByRole("button", { name: "Remove" }).click();
      assert.equal(await page.locator("#cart li").count(), 3);
      await ctx.close();
    }],
    ["fetch solved: Promise.all loads offers too; empty list message; Retry recovers from a 404", async () => {
      const { page, ctx } = await open("http://localhost:4317/js/08-fetch-solved.html");
      await page.click("#load");
      await page.waitForFunction(() => document.querySelectorAll("#grid li").length === 4);
      assert.match(await page.textContent("#offers"), /Flat 50% off/);
      await page.click("#empty");
      await page.waitForFunction(() => document.querySelector("#status").textContent === "No products found.");
      assert.equal(await page.locator("#grid li").count(), 0);
      await page.click("#broken");
      await page.getByRole("button", { name: "Retry" }).click();
      await page.waitForFunction(() => document.querySelectorAll("#grid li").length === 4);
      assert.equal(await page.textContent("#status"), "4 products loaded.");
      await ctx.close();
    }],
  ]],
  ["16-ecommerce-solutions", [
    ["no horizontal scroll at 320, 375, 768 and 1280 px", async () => {
      for (const width of [320, 375, 768, 1280]) {
        const { page, ctx } = await open(solved, { width });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `${width}px`);
        await ctx.close();
      }
    }],
    ["header: search moves to row 1 on phones; desktop is still one row; red Deals link", async () => {
      let { page, ctx } = await open(solved, { width: 375 });
      let [logo, search, location] = await Promise.all([rect(page, ".logo"), rect(page, ".search"), rect(page, ".location")]);
      assert.ok(search.y < logo.y + logo.height && location.y > search.y + search.height - 1, "phone: search row 1, location row 2");
      assert.equal(await page.locator(".deals-link").evaluate((el) => getComputedStyle(el).color), "rgb(214, 52, 44)");
      await ctx.close();
      ({ page, ctx } = await open(solved, { width: 1280 }));
      [logo, search, location] = await Promise.all([rect(page, ".logo"), rect(page, ".search"), rect(page, ".location")]);
      assert.ok(location.y < logo.y + logo.height && search.y < logo.y + logo.height && location.x < search.x, "desktop: one row");
      await ctx.close();
    }],
    ["badge shows 9+ from 10 items; avocado can be added; sold-out mango can't", async () => {
      const { page, ctx } = await open(solved, { width: 1280 });
      await page.locator('[data-id="avocado"] [data-add]').click();
      for (let i = 0; i < 8; i++) await page.locator('[data-id="avocado"] [data-inc]').click();
      assert.equal(await page.locator(".site-header [data-cart-count]").textContent(), "9");
      await page.locator('[data-id="avocado"] [data-inc]').click();
      assert.equal(await page.locator(".site-header [data-cart-count]").textContent(), "9+");
      assert.ok(await page.locator('[data-id="mango"] [data-add]').isDisabled());
      await ctx.close();
    }],
    ["filters: price ranges, empty message, Clear all", async () => {
      const { page, ctx } = await open(solved, { width: 1280 });
      assert.equal(await page.locator("[data-result-count]").textContent(), "10");
      await page.getByLabel("Under ₹50").check();
      assert.equal(await page.locator("[data-result-count]").textContent(), "3");       // banana ₹49, tomato ₹32, onion ₹45
      await page.getByLabel("Over ₹100").check();
      assert.equal(await page.locator("[data-result-count]").textContent(), "3");       // apple, avocado, mango
      await page.getByLabel("Bakery").check();
      assert.ok(await page.locator("[data-no-results]").isVisible());
      await page.getByRole("button", { name: "Clear all" }).click();
      assert.equal(await page.locator("[data-result-count]").textContent(), "10");
      assert.ok(await page.locator("[data-no-results]").isHidden());
      assert.ok(await page.getByLabel("Any price").isChecked());
      await ctx.close();
    }],
    ["cart: free-delivery hint, 🗑 removes a line, and the cart survives a reload", async () => {
      const { page, ctx } = await open("http://localhost:4317/shop/store-solved.html", { width: 1280 });
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await page.locator('[data-id="milk"] [data-add]').click();                        // ₹68
      await page.locator(".site-header [data-open-cart]").click();
      assert.equal(await page.locator("[data-free-hint]").textContent(), "Add ₹131 more for free delivery");
      await page.keyboard.press("Escape");
      await page.locator('[data-id="apple"] [data-add]').click();                       // + ₹189 = ₹257
      await page.locator(".site-header [data-open-cart]").click();
      assert.ok(await page.locator("[data-free-hint]").isHidden());
      await page.reload();
      assert.equal(await page.locator(".site-header [data-cart-count]").textContent(), "2");
      assert.equal(await page.locator('[data-id="apple"] output').textContent(), "1");
      await page.locator(".site-header [data-open-cart]").click();
      await page.getByRole("button", { name: "Remove Full Cream Milk from cart" }).click();
      assert.equal(await page.locator("[data-cart-items] li").count(), 1);
      assert.ok(await page.locator('[data-id="milk"] [data-add]').isVisible(), "the card is back to ADD");
      await ctx.close();
    }],
    ["footer: collapsed columns on phones, open on desktop; 5 bottom tabs; labelled social links", async () => {
      let { page, ctx } = await open(solved, { width: 375 });
      assert.deepEqual(await page.locator("[data-footer-col]").evaluateAll((ds) => ds.map((d) => d.open)), [false, false]);
      assert.equal(await page.locator(".bottom-nav a").count(), 5);
      const tabs = await page.locator(".bottom-nav a").evaluateAll((as) => as.map((a) => Math.round(a.getBoundingClientRect().width)));
      assert.ok(tabs.every((w) => w === tabs[0]), "equal tab widths");
      assert.equal(await page.getByRole("link", { name: "FreshCart on YouTube" }).count(), 1);
      await ctx.close();
      ({ page, ctx } = await open(solved, { width: 1280 }));
      assert.deepEqual(await page.locator("[data-footer-col]").evaluateAll((ds) => ds.map((d) => d.open)), [true, true]);
      await ctx.close();
    }],
  ]],
];

// A tiny static server for the localStorage check (file:// pages have an opaque origin).
const http = await import("node:http");
// /js/* serves the JavaScript tab's demos (fetch() needs an http origin too).
const server = http.createServer((req, res) => {
  // /js/* → the JavaScript tab's demos; /shop/* → the E-commerce demos (subfolders kept for css/ and js/)
  const [, prefix, rest] = req.url.split("?")[0].match(/^\/(js|shop)\/(.+)$/) ?? [null, null, path.basename(req.url)];
  const dir = prefix === "js" ? ["javascript", "demos"] : prefix === "shop" ? ["ecommerce", "demos"] : ["coding-interview", "demos"];
  const file = path.join(here, "..", "docs", ...dir, ...(prefix === "shop" ? rest.split("/").filter((p) => p !== "..") : [path.basename(rest)]));
  if (!existsSync(file)) { res.writeHead(404); return res.end(); }
  const types = { ".json": "application/json", ".css": "text/css", ".js": "text/javascript" };
  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "text/html; charset=utf-8" }); res.end(readFileSync(file));
}).listen(4317);

mkdirSync(path.join(here, "outputs"), { recursive: true });
let problemsWithIssues = 0;
for (const [name, checks] of problems) {
  const lines = [];
  let failed = 0;
  for (const [title, fn] of checks) {
    try { await fn(); lines.push(`  ✔ ${title}`); }
    catch (e) { failed++; lines.push(`  ✘ ${title}`); console.error(`${name} :: ${title}\n   ${e.message}`); }
  }
  const text = `${name}: ${checks.length} checks, ${failed} failures\n${lines.join("\n")}\n`;
  const out = path.join(here, "outputs", `${name}.txt`);
  if (CHECK) {
    if (!existsSync(out) || readFileSync(out, "utf8") !== text) { console.log(`DIFF  ${name}: run node run-tests.mjs and commit outputs/`); failed++; }
  } else writeFileSync(out, text);
  console.log(`${failed ? "FAIL" : "PASS"}  ${name} (${checks.length} checks)`);
  if (failed) problemsWithIssues++;
}
server.close();
await browser.close();
process.exit(problemsWithIssues ? 1 : 0);
