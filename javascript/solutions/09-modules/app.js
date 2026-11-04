// app.js: the entry point. Load it with <script type="module" src="app.js"></script>, or run `node app.js`.
import { rupees } from "./money.js";
import { billFor } from "./cart.js";

const catalogue = new Map([
  ["apple", { name: "Shimla Apple", pricePaise: 18900 }],
  ["milk", { name: "Full Cream Milk", pricePaise: 6800 }],
  ["bread", { name: "Whole Wheat Bread", pricePaise: 5000 }],
]);
const cart = [
  { id: "apple", qty: 2 },
  { id: "bread", qty: 1 },
];

const { lines, delivery, total } = billFor(catalogue, cart);
for (const line of lines) console.log(`${line.name.padEnd(18)} × ${line.qty}  ${rupees(line.linePaise)}`);
console.log(`Delivery: ${delivery ? rupees(delivery) : "FREE"}`);
console.log(`To pay:   ${rupees(total)}`);
