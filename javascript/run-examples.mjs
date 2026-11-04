// Runs every console example of the JavaScript tab and writes what it prints to outputs/ (shown on the docs pages).
//   node run-examples.mjs          run all examples, (re)write outputs/
//   node run-examples.mjs --check  CI: fail if any output differs from the committed one
//
// Each docs/javascript/examples/NN-*.js file is split into sections:
//   // --8<-- [start:name]   ...code...   // --8<-- [end:name]
// Every section is self-contained. It runs on its own, in a fresh sandbox (node:vm), and everything it logs goes to
// outputs/NN-*/name.txt. Uncaught errors are printed the way a browser console prints them ("Uncaught TypeError: ...").
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { format } from "node:util";
import path from "node:path";
import vm from "node:vm";

const here = path.dirname(fileURLToPath(import.meta.url));
const examplesDir = path.join(here, "..", "docs", "javascript", "examples");
const CHECK = process.argv.includes("--check");
const SECTION = /^\/\/ --8<-- \[start:([\w-]+)\]\n([\s\S]*?)^\/\/ --8<-- \[end:\1\]/gm;

async function runSection(code) {
  const lines = [];
  const log = (...args) => lines.push(format(...args));
  let pending = 0;
  const timer = (set) => (fn, ms, ...rest) => { pending++; return set(() => { pending--; fn(...rest); }, ms); };
  const context = vm.createContext({
    console: { log, info: log, warn: log, error: log },
    setTimeout: timer(setTimeout),
    clearTimeout: (id) => { clearTimeout(id); pending = Math.max(0, pending - 1); },
    structuredClone,
  });
  const report = (err) => lines.push(`Uncaught ${err?.name ?? "Error"}: ${err?.message ?? err}`);
  try {
    // An async wrapper lets examples use top-level await, just like the browser console does.
    await vm.runInContext(`(async () => {\n${code}\n})()`, context, { timeout: 2000 });
  } catch (err) { report(err); }
  for (let i = 0; i < 200 && pending > 0; i++) await new Promise((r) => setTimeout(r, 10));  // let timers finish
  return lines.join("\n") + "\n";
}

let failed = 0;
for (const file of readdirSync(examplesDir).filter((f) => f.endsWith(".js")).sort()) {
  const source = readFileSync(path.join(examplesDir, file), "utf8");
  const outDir = path.join(here, "outputs", file.replace(/\.js$/, ""));
  mkdirSync(outDir, { recursive: true });
  let count = 0;
  for (const [, name, code] of source.matchAll(SECTION)) {
    count++;
    const text = await runSection(code);
    const out = path.join(outDir, `${name}.txt`);
    if (CHECK) {
      if (!existsSync(out) || readFileSync(out, "utf8") !== text) { console.log(`DIFF  ${file}:${name}: run node run-examples.mjs and commit outputs/`); failed++; }
    } else writeFileSync(out, text);
  }
  console.log(`ran   ${file} (${count} examples)`);
}
process.exit(failed ? 1 : 0);
