/**
 * Normalizes an option that can be either a value or a function that returns a value.
 * If value is a function, calls it with ...params and returns the result;
 * otherwise returns value as-is. Call sites always get a single resolved value.
 *
 * @param {*} value - Either the final value (boolean, string, node, etc.) or a
 *   function that will produce that value when called with params.
 * @param {...*} params - Arguments to pass to value when it is a function
 *   (e.g. the event object). These are the "context" that make the function
 *   form useful — e.g. event.target, event.key.
 * @returns {*} The resolved value: either value(...params) or value.
 *
 * ---
 *
 * Design: Option polymorphism (one option, two shapes)
 * ------------------------------------------------
 * The same option name can be a static value or a function. Examples in focus-trap:
 *
 *   escapeDeactivates: true
 *   escapeDeactivates: (event) => event.key === 'Escape'
 *
 *   clickOutsideDeactivates: true
 *   clickOutsideDeactivates: (e) => e.target.closest('.my-trigger')
 *
 *   allowOutsideClick: (e) => e.target.matches('[data-trap-trigger]')
 *
 * Params (e.g. the event) are passed so the handler can decide per interaction.
 *
 * ---
 *
 * Benefits:
 * - Single normalization point: no repeated "typeof value === 'function'" at
 *   every call site (DRY, single responsibility).
 * - Lazy evaluation: when value is a function, it runs at call time with current
 *   context (event, DOM state).
 * - Permissive API: simple case = pass a value; advanced case = pass a
 *   function and use params to decide. One option name covers both.
 */
const valueOrHandler = function (value, ...params) {
  return typeof value === 'function' ? value(...params) : value;
};