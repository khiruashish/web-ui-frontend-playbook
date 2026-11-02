/** Problem 11: deepClone and deepEqual that handle cycles, Date, RegExp, Map, Set, arrays and plain objects. */

export function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;          // primitives and functions: as-is
  if (seen.has(value)) return seen.get(value);                            // cycles and shared references
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const copy = new Map(); seen.set(value, copy);
    for (const [k, v] of value) copy.set(deepClone(k, seen), deepClone(v, seen));
    return copy;
  }
  if (value instanceof Set) {
    const copy = new Set(); seen.set(value, copy);
    for (const v of value) copy.add(deepClone(v, seen));
    return copy;
  }
  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));   // keep the prototype
  seen.set(value, copy);                                                  // register BEFORE recursing
  for (const key of Reflect.ownKeys(value)) copy[key] = deepClone(value[key], seen);   // includes symbol keys
  return copy;
}

export function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;                                       // NaN equals NaN, +0 vs -0 distinct
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;                                     // already comparing this pair (cycle)
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (a instanceof Map || a instanceof Set) {
    if (a.size !== b.size) return false;
    if (a instanceof Set) return [...a].every((v) => b.has(v) || [...b].some((w) => deepEqual(v, w, seen)));
    return [...a].every(([k, v]) => b.has(k) && deepEqual(v, b.get(k), seen));
  }
  const ka = Reflect.ownKeys(a), kb = Reflect.ownKeys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k], seen));
}
