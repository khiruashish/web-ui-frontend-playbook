/**
 * Problem 9: debounce and throttle.
 * debounce: run once the calls STOP for `wait` ms (search box, resize end).
 * throttle: run at most once per `wait` ms while calls keep coming (scroll position, mousemove).
 */
export function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timer = null;
  let lastArgs, lastThis;
  function debounced(...args) {
    lastArgs = args;
    lastThis = this;                                  // keep `this` for method usage
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (trailing && !callNow) fn.apply(lastThis, lastArgs);   // trailing edge with the LATEST arguments
    }, wait);
    if (callNow) fn.apply(this, args);                // leading edge: first call fires immediately
  }
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  return debounced;
}

export function throttle(fn, wait) {
  let last = -Infinity;                               // time of the last real call
  let timer = null, pendingArgs = null, pendingThis = null;
  function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {                             // window passed: call immediately (leading)
      clearTimeout(timer); timer = null;
      last = now;
      fn.apply(this, args);
    } else {                                          // inside the window: remember the latest call for the trailing edge
      pendingArgs = args; pendingThis = this;
      if (!timer) timer = setTimeout(() => {
        timer = null; last = Date.now();
        fn.apply(pendingThis, pendingArgs);
      }, remaining);
    }
  }
  throttled.cancel = () => { clearTimeout(timer); timer = null; };
  return throttled;
}
