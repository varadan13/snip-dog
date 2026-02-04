/**
 * Defers a function to the next event-loop tick.
 *
 * setTimeout(fn, 0) does not run fn immediately; it schedules fn to run after
 * the current synchronous work and the current tick finish. So delay(fn) means
 * "run fn on the next tick."
 *
 * Returns the timer id from setTimeout, so callers can cancel with
 * clearTimeout(delay(fn)) if needed.
 *
 * Why focus-trap uses it: When the trap activates, focus is moved into the
 * trap. If that focus change happens synchronously in the same tick as the
 * click/Enter that opened the trap, the same event can be delivered to the
 * newly focused element (e.g. Enter both opens the trap and activates a
 * button inside). By delaying the focus logic, focus is set on the next
 * tick, after the activating event has been handled, so that event does not
 * also trigger something inside the trap.
 */
const delay = function (fn) {
  return setTimeout(fn, 0);
};