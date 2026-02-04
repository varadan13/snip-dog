/**
 * Centralized error throw for cron parsing.
 *
 * Engineering principles:
 * - DRY: One place for "how we throw" — callers use raise(err) instead of
 *   repeating throw new TypeError('Cron parser: ' + err).
 * - Single place to change: Error type or message format can be updated here
 *   without touching every call site.
 * - Consistent error reporting: All parser failures use the same type and
 *   prefix, so they're easy to recognize and handle.
 */
function raise (err) {
	throw new TypeError('Cron parser: ' + err);
}