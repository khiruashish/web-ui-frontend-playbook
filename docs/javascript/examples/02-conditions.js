// Lesson 2: operators and decisions. Every section runs on its own.

// --8<-- [start:comparison]
console.log(5 > 3);
console.log(199 >= 200);
console.log("5" == 5);     // == converts types first: avoid it
console.log("5" === 5);    // === compares value AND type: always use this
console.log("5" !== 5);
// --8<-- [end:comparison]

// --8<-- [start:if-else]
const cartTotal = 15000;          // ₹150 in paise
const freeDeliveryFrom = 19900;   // ₹199

if (cartTotal >= freeDeliveryFrom) {
  console.log("Delivery is FREE");
} else if (cartTotal > 0) {
  const missing = (freeDeliveryFrom - cartTotal) / 100;
  console.log(`Add ₹${missing} more for free delivery`);
} else {
  console.log("Your cart is empty");
}
// --8<-- [end:if-else]

// --8<-- [start:logical]
const isLoggedIn = true;
const hasAddress = false;

console.log(isLoggedIn && hasAddress);   // AND: true only if both are true
console.log(isLoggedIn || hasAddress);   // OR: true if at least one is true
console.log(!hasAddress);                // NOT: flips true/false

if (isLoggedIn && !hasAddress) {
  console.log("Please add a delivery address");
}
// --8<-- [end:logical]

// --8<-- [start:truthy]
// In an if, every value counts as true or false. These six are "falsy":
const falsy = [[false, "false"], [0, "0"], ["", '""'], [null, "null"], [undefined, "undefined"], [NaN, "NaN"]];
for (const [value, label] of falsy) {
  console.log(label, "→", value ? "truthy" : "falsy");
}
// Everything else is "truthy", even these:
console.log('"0"', "→", "0" ? "truthy" : "falsy");
console.log('"false"', "→", "false" ? "truthy" : "falsy");
console.log("[]", "→", [] ? "truthy" : "falsy");
// --8<-- [end:truthy]

// --8<-- [start:defaults]
const settings = { theme: "", itemsPerPage: 0 };

// || falls back on ANY falsy value, so "" and 0 are replaced too
console.log(settings.theme || "light");
console.log(settings.itemsPerPage || 20);

// ?? falls back only on null or undefined, so real 0 and "" are kept
console.log(settings.theme ?? "light");
console.log(settings.itemsPerPage ?? 20);
console.log(settings.language ?? "en");
// --8<-- [end:defaults]

// --8<-- [start:optional-chaining]
const user = { name: "Asha", address: null };

console.log(user.address?.city);              // stops at null and gives undefined, no crash
console.log(user.address?.city ?? "No city yet");
console.log(user.address.city);               // without ?. this crashes
// --8<-- [end:optional-chaining]

// --8<-- [start:ternary]
const qty = 3;
const label = qty === 1 ? "1 item" : `${qty} items`;   // condition ? valueIfTrue : valueIfFalse
console.log(label);

const stock = 0;
console.log(stock > 0 ? "ADD" : "Out of stock");
// --8<-- [end:ternary]

// --8<-- [start:switch]
function statusMessage(status) {
  switch (status) {
    case "placed":
      return "Order placed";
    case "packed":
      return "Packing your items";
    case "out-for-delivery":
      return "On the way 🛵";
    case "delivered":
      return "Delivered. Enjoy!";
    default:
      return "Unknown status";
  }
}
console.log(statusMessage("packed"));
console.log(statusMessage("out-for-delivery"));
console.log(statusMessage("lost"));
// --8<-- [end:switch]
