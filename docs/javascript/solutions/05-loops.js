// Solutions to the "Try it" exercises of lesson 5. Each section repeats the product list so it runs on its own.

// --8<-- [start:ex1]
const products = [
  { name: "Shimla Apple", pricePaise: 18900, category: "fruits", deal: true },
  { name: "Robusta Banana", pricePaise: 4900, category: "fruits", deal: false },
  { name: "Fresh Tomato", pricePaise: 3200, category: "vegetables", deal: true },
  { name: "Full Cream Milk", pricePaise: 6800, category: "dairy", deal: false },
  { name: "Brown Eggs", pricePaise: 8400, category: "dairy", deal: true },
];

const labels = products.map((p) => `${p.name}: ₹${p.pricePaise / 100}`);
console.log(labels);
// --8<-- [end:ex1]

// --8<-- [start:ex2]
const products = [
  { name: "Shimla Apple", deal: true },
  { name: "Robusta Banana", deal: false },
  { name: "Fresh Tomato", deal: true },
  { name: "Full Cream Milk", deal: false },
  { name: "Brown Eggs", deal: true },
];

console.log(products.filter((p) => p.deal).length);
console.log(products.reduce((count, p) => (p.deal ? count + 1 : count), 0));
// --8<-- [end:ex2]

// --8<-- [start:ex3]
const products = [
  { name: "Shimla Apple" },
  { name: "Robusta Banana" },
  { name: "Fresh Tomato" },
  { name: "Full Cream Milk" },
  { name: "Brown Eggs" },
];

const byName = products.toSorted((a, b) => a.name.localeCompare(b.name));
console.log(byName.map((p) => p.name));
console.log(products[0].name);   // the original order is untouched
// --8<-- [end:ex3]

// --8<-- [start:ex4]
const products = [
  { name: "Robusta Banana", pricePaise: 4900 },
  { name: "Shimla Apple", pricePaise: 18900 },
  { name: "Fresh Tomato", pricePaise: 3200 },
  { name: "Brown Eggs", pricePaise: 8400 },
];

const mostExpensive = products.reduce((best, p) => (p.pricePaise > best.pricePaise ? p : best));
console.log(mostExpensive.name);
// --8<-- [end:ex4]
