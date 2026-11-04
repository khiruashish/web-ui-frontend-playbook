// Solutions to the "Try it" exercises of lesson 4. Every section runs on its own.

// --8<-- [start:ex1]
const products = [
  { name: "Shimla Apple", pricePaise: 18900, category: "fruits" },
  { name: "Full Cream Milk", pricePaise: 6800, category: "dairy" },
  { name: "Whole Wheat Bread", pricePaise: 5000, category: "bakery" },
];

console.log(products[1].name);
console.log(products.at(-1).category);
// --8<-- [end:ex1]

// --8<-- [start:ex2]
function withPrice(product, newPaise) {
  return { ...product, pricePaise: newPaise };
}

const milk = { name: "Full Cream Milk", pricePaise: 6800 };
const dearerMilk = withPrice(milk, 7200);

console.log(milk);          // unchanged
console.log(dearerMilk);    // a new object
console.log(milk === dearerMilk);
// --8<-- [end:ex2]

// --8<-- [start:ex3]
const cart = new Map([
  ["apple", 2],
  ["milk", 1],
]);

const text = JSON.stringify([...cart]);   // a Map can't be stringified directly; turn it into [key, value] pairs first
console.log(text);

const loaded = new Map(JSON.parse(text)); // pairs → Map again
console.log(loaded.get("apple"), loaded.size);
// --8<-- [end:ex3]
