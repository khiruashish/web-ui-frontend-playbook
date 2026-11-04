// Lesson 4: arrays, objects, Map, Set and JSON. Every section runs on its own.

// --8<-- [start:arrays]
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);              // positions (indexes) start at 0
console.log(fruits.length);
console.log(fruits.at(-1));          // last item

fruits.push("Grapes");               // add at the end
console.log(fruits);

const removed = fruits.shift();      // remove from the start
console.log(removed, fruits);

console.log(fruits.includes("Mango"));
console.log(fruits.indexOf("Grapes"));
console.log(fruits.join(" · "));
// --8<-- [end:arrays]

// --8<-- [start:objects]
const product = {
  id: "apple",
  name: "Shimla Apple",
  pricePaise: 18900,
  inStock: true,
  tags: ["fruit", "seasonal"],
};

console.log(product.name);           // dot notation
console.log(product["pricePaise"]);  // bracket notation (needed when the key is in a variable)

const key = "inStock";
console.log(product[key]);

product.pricePaise = 17900;          // change a property
product.rating = 4.6;                // add a new one
delete product.tags;                 // remove one
console.log(product);

console.log(Object.keys(product));
console.log("rating" in product);
// --8<-- [end:objects]

// --8<-- [start:array-of-objects]
// The shape almost every API returns: an array of objects
const products = [
  { id: "apple", name: "Shimla Apple", pricePaise: 18900, category: "fruits" },
  { id: "milk", name: "Full Cream Milk", pricePaise: 6800, category: "dairy" },
  { id: "bread", name: "Whole Wheat Bread", pricePaise: 5000, category: "bakery" },
];

console.log(products.length, "products");
console.log(products[1].name);
console.log(products[2].pricePaise / 100);
// --8<-- [end:array-of-objects]

// --8<-- [start:destructuring]
const item = { name: "Brown Eggs", pricePaise: 8400, size: "6 pcs" };

const { name, pricePaise } = item;           // pull properties out into variables
console.log(name, pricePaise);

const { size: packSize, rating = "no rating" } = item;   // rename, and give a default
console.log(packSize, rating);

const [first, second] = ["Apple", "Banana", "Mango"];    // arrays: by position
console.log(first, second);

function describe({ name, size }) {           // destructuring right in the parameters
  return `${name} (${size})`;
}
console.log(describe(item));
// --8<-- [end:destructuring]

// --8<-- [start:spread]
const base = { name: "Milk", pricePaise: 6800 };

const updated = { ...base, pricePaise: 7200 };   // copy, then override one property
console.log(base);                               // the original is unchanged
console.log(updated);

const veg = ["Tomato", "Onion"];
const fruit = ["Apple"];
const all = [...veg, ...fruit, "Bread"];         // join arrays
console.log(all);
// --8<-- [end:spread]

// --8<-- [start:reference]
// Objects and arrays are shared by reference, not copied
const cartA = ["Apple"];
const cartB = cartA;          // the SAME array, two names
cartB.push("Milk");
console.log(cartA);

const cartC = [...cartA];     // a real (shallow) copy
cartC.push("Bread");
console.log(cartA, cartC);

console.log([1, 2] === [1, 2]);   // two different arrays, even with equal contents
// --8<-- [end:reference]

// --8<-- [start:map-set]
// Map: key → value, with any type of key, and easy to loop over
const cart = new Map();
cart.set("apple", 2);
cart.set("milk", 1);
cart.set("apple", 3);                 // same key: replaces the value
console.log(cart.get("apple"), cart.size, cart.has("bread"));
for (const [id, qty] of cart) console.log(id, "×", qty);

// Set: a list with no duplicates
const tags = new Set(["fruit", "organic", "fruit"]);
tags.add("seasonal");
console.log(tags.size, [...tags]);
// --8<-- [end:map-set]

// --8<-- [start:json]
// JSON is how data travels between server and browser: always text
const order = { id: 1042, items: [{ id: "apple", qty: 2 }], paid: false };

const text = JSON.stringify(order);
console.log(text);
console.log(typeof text);

const back = JSON.parse(text);
console.log(back.items[0].qty);

console.log(JSON.stringify(order, null, 2));     // pretty-printed, 2-space indent
// --8<-- [end:json]
