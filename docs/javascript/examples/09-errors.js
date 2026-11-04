// Lesson 9: errors, debugging and good habits. Every section runs on its own.

// --8<-- [start:reading-errors]
const cart = undefined;
console.log("Before the crash");
console.log(cart.items);           // TypeError: reading a property of undefined
console.log("This line never runs");
// --8<-- [end:reading-errors]

// --8<-- [start:common-errors]
const examples = [
  () => totl + 1,                                // a typo in a variable name
  () => { const a = 1; a = 2; },                 // reassigning a const
  () => null.length,                             // a property of null
  () => "apple".toUppercase(),                   // a method that doesn't exist (case matters)
  () => JSON.parse("{name: 'Apple'}"),           // JSON needs double quotes around keys and strings
];
for (const run of examples) {
  try {
    run();
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
}
// --8<-- [end:common-errors]

// --8<-- [start:throw]
function setQuantity(qty) {
  if (!Number.isInteger(qty) || qty < 0) {
    throw new RangeError(`Quantity must be a whole number ≥ 0, got ${qty}`);
  }
  return qty;
}

for (const value of [2, -1, 1.5]) {
  try {
    console.log("OK:", setQuantity(value));
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
}
// --8<-- [end:throw]

// --8<-- [start:console]
const product = { id: "apple", pricePaise: 18900 };
console.log("plain log", product);
console.info("info: same as log, different icon in the browser");
console.warn("warn: yellow in the browser");
console.error("error: red in the browser, with a stack trace");
console.log({ product });           // wrap in { } to print the variable's NAME too
// --8<-- [end:console]

// --8<-- [start:habits]
// 1. const by default, let only when the value changes, never var
// 2. === not ==
// 3. Name things for what they ARE: cartTotalPaise, not x or data2
// 4. Small functions that do one thing
// 5. Return early instead of nesting if inside if

// Nested (hard to read)
function canCheckout1(cart, user) {
  if (cart.length > 0) {
    if (user) {
      if (user.address) {
        return true;
      }
    }
  }
  return false;
}

// Early returns (easy to read)
function canCheckout2(cart, user) {
  if (cart.length === 0) return false;
  if (!user) return false;
  return Boolean(user.address);
}

const user = { name: "Asha", address: "21 MG Road" };
console.log(canCheckout1(["apple"], user), canCheckout2(["apple"], user));
console.log(canCheckout1([], user), canCheckout2([], user));
// --8<-- [end:habits]
