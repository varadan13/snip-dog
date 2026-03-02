/**
 * Checks if every value in a plain object is strictly null.
 *
 * Use case:
 *   Guard clauses before sending a payload — e.g. skip an API call or
 *   disable a submit button when a filter object has no active values set.
 *
 *   const filters = { from: null, to: null, status: null };
 *   if (allNull(filters)) return; // nothing to filter on
 *
 * Performance:
 *   Object.values() allocates a NEW array of all values before iteration
 *   begins. Even if the first value is non-null and every() short-circuits
 *   immediately, the full array was already built. Cost: O(n) allocation
 *   + O(1) to O(n) iteration. Fine for small objects (<100 keys).
 */
const allNull = obj => Object.values(obj).every(v => v === null);

/**
 * Same check using a for...in loop — no intermediate array allocation.
 *
 * Use case:
 *   Same as above, but preferred when the object can be large or this
 *   function is called frequently (e.g. inside a render loop or a
 *   high-frequency event handler).
 *
 *   for...in also iterates inherited enumerable properties, so wrap with
 *   hasOwnProperty if the object might have a non-plain prototype:
 *     if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
 *
 * Performance:
 *   No array allocation — iterates the object's properties directly.
 *   Short-circuits on the first non-null value without touching the rest.
 *   Cost: O(1) to O(n) iteration, zero allocation. Faster than the
 *   Object.values approach for large objects or hot code paths.
 */
const allNullLoop = obj => {
  for (const key in obj) {
    if (obj[key] !== null) return false;
  }
  return true;
};
