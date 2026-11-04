// Lesson 1: variables, types and strings. Every section runs on its own.

// --8<-- [start:first]
console.log("Hello, FreshCart!");
console.log(2 + 3);
console.log("Total:", 189 + 49);
// --8<-- [end:first]

// --8<-- [start:let-const]
const storeName = "FreshCart";   // const: this name will always point to the same value
let itemsInCart = 0;             // let: this value is going to change

itemsInCart = itemsInCart + 1;
itemsInCart += 2;                // short for: itemsInCart = itemsInCart + 2
console.log(storeName, "has", itemsInCart, "items in the cart");

storeName = "OtherCart";         // not allowed: storeName is const
// --8<-- [end:let-const]

// --8<-- [start:types]
console.log(typeof "Apple");      // text
console.log(typeof 189);          // whole numbers and decimals are both "number"
console.log(typeof true);         // yes / no
console.log(typeof undefined);    // "no value has been given yet"
console.log(typeof null);         // "deliberately empty" (typeof says "object": a famous old bug)
console.log(typeof { name: "Apple" });
console.log(typeof ["Apple", "Banana"]);
console.log(Array.isArray(["Apple", "Banana"]));  // the right way to test for an array
// --8<-- [end:types]

// --8<-- [start:undefined-null]
let deliverySlot;                 // declared, but no value yet
console.log(deliverySlot);

let coupon = null;                // we chose "no coupon"
console.log(coupon);

coupon = "FRESH50";
console.log(coupon);
// --8<-- [end:undefined-null]

// --8<-- [start:strings]
const product = "Shimla Apple";
const qty = 2;
const price = 189;

// Template literal: backticks, and ${ } to insert any value or expression
const line = `${qty} × ${product} = ₹${qty * price}`;
console.log(line);

console.log(product.length);                 // number of characters
console.log(product.toUpperCase());
console.log(product.includes("Apple"));
console.log(product.split(" "));             // cut into an array of words
console.log("  milk  ".trim());              // remove spaces at both ends
console.log("ADD".padStart(6, "."));
// --8<-- [end:strings]

// --8<-- [start:numbers]
console.log(0.1 + 0.2);              // decimals are stored in binary, so this is not exactly 0.3
console.log(0.1 + 0.2 === 0.3);

// Fix: keep money in whole paise (1 rupee = 100 paise), and only divide when displaying
const applePaise = 18900;
const bananaPaise = 4900;
const totalPaise = applePaise + bananaPaise;
console.log(totalPaise);
console.log((totalPaise / 100).toFixed(2));

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
console.log(rupees.format(totalPaise / 100));
console.log(rupees.format(123456789 / 100));   // Indian digit grouping: 12,34,567.89
// --8<-- [end:numbers]

// --8<-- [start:conversion]
const fromInput = "3";               // values from inputs and data-* attributes are ALWAYS strings

console.log(fromInput + 1);          // + with a string joins text
console.log(Number(fromInput) + 1);  // convert first, then add
console.log(Number("12abc"));        // NaN: "Not a Number"
console.log(Number.isNaN(Number("12abc")));
console.log(String(42) + "!");
console.log(parseInt("250g", 10));   // reads digits until the first non-digit
// --8<-- [end:conversion]
