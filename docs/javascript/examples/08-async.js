// Lesson 8: asynchronous JavaScript. Every section runs on its own.

// --8<-- [start:timeline]
console.log("1. Order button clicked");
setTimeout(() => console.log("3. Payment confirmed (after 200 ms)"), 200);
setTimeout(() => console.log("2. Packing started (after 100 ms)"), 100);
console.log("0. JavaScript doesn't wait: this line runs straight away");
// --8<-- [end:timeline]

// --8<-- [start:promise]
// A Promise is a value that will arrive later: it ends up "fulfilled" (a result) or "rejected" (an error)
function checkStock(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (productId === "apple") resolve({ productId, available: 12 });
      else reject(new Error(`Unknown product: ${productId}`));
    }, 50);
  });
}

checkStock("apple")
  .then((result) => console.log("In stock:", result.available))
  .catch((err) => console.log("Failed:", err.message));

checkStock("dragonfruit")
  .then((result) => console.log("In stock:", result.available))
  .catch((err) => console.log("Failed:", err.message));
// --8<-- [end:promise]

// --8<-- [start:async-await]
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function placeOrder() {
  console.log("Placing order…");
  await wait(50);                       // pause THIS function until the promise settles
  console.log("Payment done");
  await wait(50);
  console.log("Order confirmed");
  return 1042;                          // an async function always returns a promise
}

const orderId = await placeOrder();     // await works at the top level of modules and the console
console.log("Order id:", orderId);
// --8<-- [end:async-await]

// --8<-- [start:try-catch]
async function fetchPrice(productId) {
  await new Promise((r) => setTimeout(r, 20));
  if (productId !== "milk") throw new Error("Price service is down");
  return 6800;
}

async function showPrice(productId) {
  try {
    const price = await fetchPrice(productId);
    console.log(`${productId}: ₹${price / 100}`);
  } catch (err) {
    console.log(`Could not load ${productId}: ${err.message}`);   // show a friendly message, keep the app running
  } finally {
    console.log("(hide the loading spinner)");                    // runs whether it worked or not
  }
}

await showPrice("milk");
await showPrice("bread");
// --8<-- [end:try-catch]

// --8<-- [start:parallel]
const fakeApi = (name, ms) => new Promise((resolve) => setTimeout(() => resolve(name), ms));

let start = Date.now();
const a = await fakeApi("products", 100);
const b = await fakeApi("offers", 100);
const about = (ms) => (ms >= 150 ? "about 200 ms" : "about 100 ms");
console.log("one after another:", a, b, about(Date.now() - start));

start = Date.now();
const [c, d] = await Promise.all([fakeApi("products", 100), fakeApi("offers", 100)]);
console.log("at the same time: ", c, d, about(Date.now() - start));
// --8<-- [end:parallel]

// --8<-- [start:fetch-shape]
// What fetch() code looks like. Here fetch is faked so the example runs anywhere;
// the live demo on this page calls the real fetch().
const fetch = async (url) => ({
  ok: url.endsWith("products.json"),
  status: url.endsWith("products.json") ? 200 : 404,
  json: async () => [{ name: "Shimla Apple", pricePaise: 18900 }],
});

async function loadProducts(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);   // fetch does NOT reject on 404/500
  return response.json();
}

console.log(await loadProducts("/api/products.json"));
try {
  await loadProducts("/api/missing.json");
} catch (err) {
  console.log("Error:", err.message);
}
// --8<-- [end:fetch-shape]
