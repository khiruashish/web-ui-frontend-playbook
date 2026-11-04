// Solutions to the "Try it" exercises of lesson 2. Every section runs on its own.

// --8<-- [start:ex1]
function slotFor(hour) {
  if (hour >= 6 && hour <= 11) {
    return "Morning slot";
  } else if (hour >= 16 && hour <= 21) {
    return "Evening slot";
  } else {
    return "Closed";
  }
}

for (const hour of [5, 6, 11, 12, 16, 21, 22]) {
  console.log(hour, slotFor(hour));
}
// --8<-- [end:ex1]

// --8<-- [start:ex2]
for (const stock of [0, 2, 3, 10]) {
  const product = { stock };

  // Nested ternary: works, but hard to read
  const label1 = product.stock === 0 ? "Out of stock" : product.stock <= 3 ? `Only ${product.stock} left` : "ADD";

  // The same with if: easier to read, so prefer it
  let label2;
  if (product.stock === 0) label2 = "Out of stock";
  else if (product.stock <= 3) label2 = `Only ${product.stock} left`;
  else label2 = "ADD";

  console.log(stock, label1, label2);
}
// --8<-- [end:ex2]

// --8<-- [start:ex3]
console.log(null ?? "x");   // null → use the default
console.log(0 || "x");      // 0 is falsy → || uses the default
console.log(0 ?? "x");      // 0 is not null/undefined → ?? keeps 0
console.log("" && "x");     // "" is falsy → && stops and gives ""
// --8<-- [end:ex3]
