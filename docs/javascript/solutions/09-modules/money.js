// money.js: everything about prices. No other file needs to know about paise or currency formats.
export const FREE_DELIVERY_FROM = 19900; // ₹199
export const DELIVERY_FEE = 2500;        // ₹25

export function rupees(paise) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function deliveryFee(subtotalPaise) {
  return subtotalPaise >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}
