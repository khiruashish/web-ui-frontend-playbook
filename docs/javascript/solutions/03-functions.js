// Solutions to the "Try it" exercises of lesson 3. Every section runs on its own.

// --8<-- [start:ex1]
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

function formatRupees(paise) {
  return rupees.format(paise / 100);
}

console.log(formatRupees(18900));
console.log(formatRupees(4950));
console.log(formatRupees(12345600));
// --8<-- [end:ex1]

// --8<-- [start:ex2]
const deliveryFee = (subtotalPaise) => (subtotalPaise >= 19900 ? 0 : 2500);

console.log(deliveryFee(9800));
console.log(deliveryFee(19900));
console.log(deliveryFee(50000));
// --8<-- [end:ex2]

// --8<-- [start:ex3]
function makeCart() {
  let totalPaise = 0;           // private: only add() and total() can reach it

  return {
    add(paise) {
      totalPaise += paise;
    },
    total() {
      return totalPaise;
    },
  };
}

const cart = makeCart();
cart.add(18900);
cart.add(4900);
console.log(cart.total());
console.log(cart.totalPaise);   // undefined: the variable is hidden inside the closure
// --8<-- [end:ex3]
