/**
 * Dummy parser that expects a string pattern.
 *
 * Sanity check: a quick, early validation that input is in the expected form.
 * If not, we throw immediately instead of continuing and failing later with
 * a confusing error (e.g. when calling string methods on a number).
 *
 * Engineering principles:
 * - Fail-fast: validate at the entry point and throw as soon as input is
 *   invalid; bugs are easier to find and bad data doesn't propagate.
 * - Defensive programming: don't assume callers pass valid input; enforce
 *   the requirement at the API boundary.
 * - Contract / guard clause: handle invalid cases first and exit, so the
 *   rest of the function can assume valid input (happy path).
 */
function parsePattern (pattern, target) {
	// Sanity check
	if (typeof pattern !== 'string') {
		raise('invalid configuration string ("' + pattern + '").');
	}

	// ... rest of parsing (happy path assumes pattern is a string)
}
