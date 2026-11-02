/** Problem 10: Promise.all and Promise.allSettled from scratch, plus a concurrency-limited pool. */

export function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = [...iterable];
    const results = new Array(items.length);
    let remaining = items.length;
    if (remaining === 0) return resolve(results);        // all([]) resolves immediately
    items.forEach((item, i) => {
      Promise.resolve(item).then((value) => {            // Promise.resolve: plain values and thenables work too
        results[i] = value;                              // keep INPUT order, not completion order
        if (--remaining === 0) resolve(results);
      }, reject);                                        // first rejection wins; later ones are ignored
    });
  });
}

export function promiseAllSettled(iterable) {
  return promiseAll([...iterable].map((item) =>
    Promise.resolve(item).then(
      (value) => ({ status: "fulfilled", value }),
      (reason) => ({ status: "rejected", reason }))));
}

/** Run `tasks` (functions returning promises) with at most `limit` in flight; results in input order. */
export async function pool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const i = next++;                                  // single-threaded JS: no race on next++
      results[i] = await tasks[i]();
    }
  }
  await promiseAll(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}
