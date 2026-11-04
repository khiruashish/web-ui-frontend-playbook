// cart.js: turns a catalogue + a cart into bill lines. It imports only what it needs from money.js.
import { deliveryFee } from "./money.js";

export function billFor(catalogue, cart) {
  const lines = cart.map(({ id, qty }) => {
    const { name, pricePaise } = catalogue.get(id);
    return { name, qty, linePaise: pricePaise * qty };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.linePaise, 0);
  const delivery = deliveryFee(subtotal);
  return { lines, delivery, total: subtotal + delivery };
}
