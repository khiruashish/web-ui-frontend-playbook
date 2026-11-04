// store.js: cart, cart drawer, filters and sort for the FreshCart demo.
// Loaded with <script defer>, so the whole page's HTML exists before this runs.

// --8<-- [start:money]
// Prices are stored in paise (1 rupee = 100 paise) as whole numbers.
// Whole numbers never suffer floating-point errors such as 0.1 + 0.2 = 0.30000000000000004.
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const formatPaise = (paise) => rupees.format(paise / 100);

const FREE_DELIVERY_FROM = 19900; // ₹199
const DELIVERY_FEE = 2500;        // ₹25
// --8<-- [end:money]

// --8<-- [start:state]
// The single source of truth: product id -> { name, price, qty }.
// Every change goes through setQty(), which then redraws the UI from this Map.
const cart = new Map();

function setQty(card, qty) {
  const { id, name, price } = card.dataset;
  if (qty <= 0) cart.delete(id);
  else cart.set(id, { name, price: Number(price), qty });
  render();
}
// --8<-- [end:state]

// --8<-- [start:events]
// One listener on the grid handles every button in every card (event delegation).
const grid = document.querySelector("[data-product-grid]");

grid?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const card = button.closest(".product-card");
  const current = cart.get(card.dataset.id)?.qty ?? 0;

  if (button.matches("[data-add], [data-inc]")) setQty(card, current + 1);
  if (button.matches("[data-dec]")) setQty(card, current - 1);

  // After "ADD" turns into the stepper, keep keyboard focus on the "+" button.
  if (button.matches("[data-add]")) card.querySelector("[data-inc]").focus();
});
// --8<-- [end:events]

// --8<-- [start:render]
function render() {
  // 1. Each card shows "ADD" when it is not in the cart, and the − n + stepper when it is.
  document.querySelectorAll(".product-card").forEach((card) => {
    const qty = cart.get(card.dataset.id)?.qty ?? 0;
    card.querySelector("[data-add]").hidden = qty > 0;
    card.querySelector(".qty").hidden = qty === 0;
    card.querySelector("output").textContent = qty;
  });

  // 2. The red badge on the cart button.
  let count = 0;
  let subtotal = 0;
  for (const item of cart.values()) {
    count += item.qty;
    subtotal += item.qty * item.price;
  }
  document.querySelectorAll("[data-cart-count]").forEach((badge) => (badge.textContent = count));
  document.querySelector("[data-open-cart]")?.setAttribute("aria-label", `Open cart, ${count} items`);

  // 3. The drawer: item list, empty message and the bill.
  const list = document.querySelector("[data-cart-items]");
  if (!list) return;
  list.replaceChildren(
    ...[...cart.values()].map((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span></span><span>× ${item.qty}</span><strong>${formatPaise(item.qty * item.price)}</strong>`;
      li.firstElementChild.textContent = item.name; // textContent, never innerHTML, for data
      return li;
    }),
  );
  document.querySelector("[data-cart-empty]").hidden = count > 0;

  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  document.querySelector("[data-subtotal]").textContent = formatPaise(subtotal);
  document.querySelector("[data-delivery]").textContent = delivery ? formatPaise(delivery) : "FREE";
  document.querySelector("[data-total]").textContent = formatPaise(subtotal + delivery);
}
// --8<-- [end:render]

// --8<-- [start:drawer]
const drawer = document.querySelector("#cart");

document.querySelectorAll("[data-open-cart]").forEach((opener) =>
  opener.addEventListener("click", (event) => {
    event.preventDefault();  // the bottom-nav opener is a link; don't jump to "#"
    drawer?.showModal();     // modal: traps focus, Esc closes it, page behind is inert
  }),
);

// Clicking the dark backdrop closes the drawer (the click lands on <dialog> itself).
drawer?.addEventListener("click", (event) => {
  if (event.target === drawer) drawer.close();
});
// --8<-- [end:drawer]

// --8<-- [start:filters]
const filters = document.querySelector("[data-filters]");
const sortSelect = document.querySelector("[data-sort]");
const resultCount = document.querySelector("[data-result-count]");

function applyFilters() {
  const checked = [...filters.querySelectorAll("input[name=category]:checked")].map((input) => input.value);
  const dealsOnly = filters.querySelector("input[name=deals]").checked;
  let shown = 0;

  grid.querySelectorAll(".product-card").forEach((card) => {
    const categoryOk = checked.length === 0 || checked.includes(card.dataset.category);
    const dealOk = !dealsOnly || card.hasAttribute("data-deal");
    card.hidden = !(categoryOk && dealOk);
    if (!card.hidden) shown++;
  });
  resultCount.textContent = shown;
}

function applySort() {
  const cards = [...grid.querySelectorAll(".product-card")];
  const price = (card) => Number(card.dataset.price);
  if (sortSelect.value === "price-asc") cards.sort((a, b) => price(a) - price(b));
  if (sortSelect.value === "price-desc") cards.sort((a, b) => price(b) - price(a));
  if (sortSelect.value === "relevance") cards.sort((a, b) => a.dataset.order - b.dataset.order);
  grid.append(...cards); // append() moves existing elements, it doesn't copy them
}

if (filters && grid) {
  grid.querySelectorAll(".product-card").forEach((card, i) => (card.dataset.order = i));
  filters.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applySort);

  // Filters are a collapsed <details> on phones and an always-open sidebar on desktop.
  const desktop = window.matchMedia("(width >= 900px)");
  const sync = () => (filters.open = desktop.matches);
  sync();
  desktop.addEventListener("change", sync);
}
// --8<-- [end:filters]

render();
