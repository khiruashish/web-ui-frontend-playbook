// Lesson 3: functions. Every section runs on its own.

// --8<-- [start:declaration]
// Define once…
function lineTotal(pricePaise, qty) {
  return pricePaise * qty;
}

// …use many times
console.log(lineTotal(18900, 2));
console.log(lineTotal(4900, 6));
console.log(lineTotal(6800, 1));
// --8<-- [end:declaration]

// --8<-- [start:arrow]
// The same function written three ways
function addGst1(paise) {
  return Math.round(paise * 1.05);
}
const addGst2 = function (paise) {
  return Math.round(paise * 1.05);
};
const addGst3 = (paise) => Math.round(paise * 1.05);   // arrow function: one expression is returned automatically

console.log(addGst1(10000), addGst2(10000), addGst3(10000));
// --8<-- [end:arrow]

// --8<-- [start:defaults-rest]
function greet(name = "guest") {          // default value when nothing is passed
  return `Hello, ${name}!`;
}
console.log(greet("Asha"));
console.log(greet());

function sum(...prices) {                 // rest parameter: all the arguments as an array
  let total = 0;
  for (const p of prices) total += p;
  return total;
}
console.log(sum(18900, 4900, 3200));
console.log(sum());
// --8<-- [end:defaults-rest]

// --8<-- [start:return]
function deliveryFee(subtotalPaise) {
  if (subtotalPaise === 0) return 0;          // return ends the function immediately
  if (subtotalPaise >= 19900) return 0;
  return 2500;
}
console.log(deliveryFee(0), deliveryFee(9800), deliveryFee(28700));

function noReturn() {
  const x = 1 + 1;
}
console.log(noReturn());                      // a function without return gives undefined
// --8<-- [end:return]

// --8<-- [start:scope]
const storeName = "FreshCart";                // global: visible everywhere below

function showBanner() {
  const message = `Welcome to ${storeName}`;  // local: lives only inside this function
  console.log(message);
}
showBanner();

if (true) {
  const insideBlock = "only inside these { }";
  console.log(insideBlock);
}
console.log(typeof insideBlock);               // not visible outside its block
console.log(message);                          // not visible outside the function
// --8<-- [end:scope]

// --8<-- [start:callback]
// A callback is a function you hand to another function, to be called later
function repeat(times, action) {
  for (let i = 1; i <= times; i++) action(i);
}
repeat(3, (n) => console.log(`Delivery partner ${n} assigned`));

setTimeout(() => console.log("…printed 100 ms later"), 100);
console.log("This prints first");
// --8<-- [end:callback]

// --8<-- [start:closure]
// A closure: the inner function remembers variables from where it was created
function makeCounter() {
  let count = 0;                  // private: nothing outside can touch it
  return () => {
    count++;
    return count;
  };
}
const nextOrderNumber = makeCounter();
console.log(nextOrderNumber());
console.log(nextOrderNumber());
console.log(nextOrderNumber());

const otherCounter = makeCounter();   // a brand-new, separate count
console.log(otherCounter());
// --8<-- [end:closure]

// --8<-- [start:pure]
// Pure function: same input → same output, and it changes nothing outside itself. Easy to test.
const discount = (paise, percent) => Math.round((paise * (100 - percent)) / 100);
console.log(discount(23600, 20));

// Impure: depends on and changes something outside
let total = 0;
function addToTotal(paise) {
  total += paise;                  // side effect
  return total;
}
console.log(addToTotal(100), addToTotal(100));   // same input, different output
// --8<-- [end:pure]
