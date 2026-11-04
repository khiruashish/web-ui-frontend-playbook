// Lesson 5: loops and array methods. Every section runs on its own.

// --8<-- [start:for]
// Classic for: start; keep going while; step
for (let i = 1; i <= 3; i++) {
  console.log(`Slot ${i}: ${6 + i}:00`);
}
// --8<-- [end:for]

// --8<-- [start:for-of]
const basket = ["Apple", "Milk", "Bread"];

for (const item of basket) {           // for…of: each VALUE of an array (or string, Map, Set)
  console.log("Packing", item);
}

for (const [index, item] of basket.entries()) {   // when you also need the position
  console.log(index + 1, item);
}

const stock = { apple: 12, milk: 0 };
for (const [id, qty] of Object.entries(stock)) {  // loop over an object's key/value pairs
  console.log(id, qty > 0 ? "in stock" : "sold out");
}
// --8<-- [end:for-of]

// --8<-- [start:while]
let stockLeft = 5;
let orders = 0;
while (stockLeft >= 2) {               // repeat while the condition is true
  stockLeft -= 2;
  orders++;
}
console.log(`${orders} orders of 2, ${stockLeft} left`);

for (const n of [3, 8, 1, 9]) {
  if (n === 1) continue;              // skip this one, go to the next
  if (n === 9) break;                 // stop the loop completely
  console.log(n);
}
// --8<-- [end:while]

// The product list used by the array-method examples below
// --8<-- [start:methods]
const products = [
  { name: "Shimla Apple", pricePaise: 18900, category: "fruits", deal: true },
  { name: "Robusta Banana", pricePaise: 4900, category: "fruits", deal: false },
  { name: "Fresh Tomato", pricePaise: 3200, category: "vegetables", deal: true },
  { name: "Full Cream Milk", pricePaise: 6800, category: "dairy", deal: false },
  { name: "Brown Eggs", pricePaise: 8400, category: "dairy", deal: true },
];

// map: turn every item into something else (same length)
const names = products.map((p) => p.name);
console.log(names);

// filter: keep only the items that pass a test
const dairy = products.filter((p) => p.category === "dairy");
console.log(dairy.map((p) => p.name));

// find: the FIRST item that passes, or undefined
console.log(products.find((p) => p.pricePaise < 5000));

// some / every: does any / do all pass?
console.log(products.some((p) => p.deal), products.every((p) => p.deal));

// reduce: boil the whole array down to one value
const total = products.reduce((sum, p) => sum + p.pricePaise, 0);
console.log(total);

// chain them: names of discounted items under ₹100, cheapest first
const cheapDeals = products
  .filter((p) => p.deal && p.pricePaise < 10000)
  .toSorted((a, b) => a.pricePaise - b.pricePaise)
  .map((p) => `${p.name} ₹${p.pricePaise / 100}`);
console.log(cheapDeals);
// --8<-- [end:methods]

// --8<-- [start:sort]
const prices = [4900, 18900, 3200, 6800];

console.log([...prices].sort());                   // default sort compares as TEXT
console.log([...prices].sort((a, b) => a - b));    // numbers, low → high
console.log([...prices].sort((a, b) => b - a));    // high → low
console.log(prices.toSorted((a, b) => a - b));     // toSorted() returns a new array
console.log(prices);                               // the original was never changed

const names = ["banana", "Apple", "cherry"];
console.log(names.toSorted((a, b) => a.localeCompare(b)));   // alphabetical, ignoring case
// --8<-- [end:sort]

// --8<-- [start:group]
const items = [
  { name: "Apple", category: "fruits" },
  { name: "Milk", category: "dairy" },
  { name: "Banana", category: "fruits" },
];
const byCategory = Object.groupBy(items, (item) => item.category);
console.log(byCategory.fruits.map((i) => i.name));
console.log(Object.keys(byCategory));
// --8<-- [end:group]

// --8<-- [start:cart-total]
// Putting it together: the bill for a cart
const catalogue = new Map([
  ["apple", { name: "Shimla Apple", pricePaise: 18900 }],
  ["milk", { name: "Full Cream Milk", pricePaise: 6800 }],
  ["bread", { name: "Whole Wheat Bread", pricePaise: 5000 }],
]);
const cart = [
  { id: "apple", qty: 2 },
  { id: "bread", qty: 1 },
];

const lines = cart.map(({ id, qty }) => {
  const { name, pricePaise } = catalogue.get(id);
  return { name, qty, linePaise: pricePaise * qty };
});
const subtotal = lines.reduce((sum, line) => sum + line.linePaise, 0);
const delivery = subtotal >= 19900 ? 0 : 2500;

const rupees = (paise) => `₹${(paise / 100).toFixed(2)}`;
for (const line of lines) console.log(`${line.name.padEnd(18)} × ${line.qty}  ${rupees(line.linePaise)}`);
console.log(`Delivery: ${delivery ? rupees(delivery) : "FREE"}`);
console.log(`To pay:   ${rupees(subtotal + delivery)}`);
// --8<-- [end:cart-total]
