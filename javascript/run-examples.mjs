// Runs every console example (and exercise solution) of the JavaScript tab and writes what it prints to outputs/
// (shown on the docs pages).
//   node run-examples.mjs          run all examples, (re)write outputs/
//   node run-examples.mjs --check  CI: fail if any output differs from the committed one
//
// Each docs/javascript/examples/NN-*.js and docs/javascript/solutions/NN-*.js file is split into sections:
//   // --8<-- [start:name]   ...code...   // --8<-- [end:name]
// Every section is self-contained. It runs on its own, in a fresh sandbox (node:vm), and everything it logs goes to
// outputs/NN-*/name.txt (solutions: outputs/solutions/NN-*/name.txt). Uncaught errors are printed the way a browser
// console prints them ("Uncaught TypeError: ...").
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { format } from "node:util";
import path from "node:path";
import vm from "node:vm";

const here = path.dirname(fileURLToPath(import.meta.url));
const sources = [
  [path.join(here, "..", "docs", "javascript", "examples"), path.join(here, "outputs")],
  [path.join(here, "..", "docs", "javascript", "solutions"), path.join(here, "outputs", "solutions")],
];
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
for (const [dir, outRoot] of sources) for (const file of readdirSync(dir).filter((f) => f.endsWith(".js")).sort()) {
  const source = readFileSync(path.join(dir, file), "utf8");
  const outDir = path.join(outRoot, file.replace(/\.js$/, ""));
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
  console.log(`ran   ${path.basename(dir)}/${file} (${count} sections)`);
}
// Multi-file module solutions: run their app.js with Node (ES module syntax is detected automatically in Node 22+).
const modulesRoot = path.join(here, "..", "docs", "javascript", "solutions");
for (const dir of readdirSync(modulesRoot).filter((d) => existsSync(path.join(modulesRoot, d, "app.js")))) {
  const text = execFileSync(process.execPath, [path.join(modulesRoot, dir, "app.js")], { encoding: "utf8" });
  const out = path.join(here, "outputs", "solutions", `${dir}.txt`);
  if (CHECK) {
    if (!existsSync(out) || readFileSync(out, "utf8") !== text) { console.log(`DIFF  ${dir}: run node run-examples.mjs and commit outputs/`); failed++; }
  } else writeFileSync(out, text);
  console.log(`ran   solutions/${dir}/app.js`);
}
process.exit(failed ? 1 : 0);
