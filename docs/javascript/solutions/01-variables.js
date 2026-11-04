// Solutions to the "Try it" exercises of lesson 1. Every section runs on its own.

// --8<-- [start:ex1]
const productName = "Shimla Apple";
const pricePaise = 18900;
const packSize = "1 kg";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
console.log(`${productName} (${packSize}): ${rupees.format(pricePaise / 100)}`);
// --8<-- [end:ex1]

// --8<-- [start:ex2]
console.log("5" * 2);   // * only works on numbers, so "5" is converted to 5
console.log("5" + 2);   // + with a string JOINS text: the surprising one
console.log("5" - 2);   // - only works on numbers, so "5" is converted to 5
// --8<-- [end:ex2]

// --8<-- [start:ex3]
const myName = "Asha";
console.log(myName.length);
console.log(myName.split("").reverse().join(""));
// --8<-- [end:ex3]
