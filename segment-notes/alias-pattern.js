/**
 * Demonstrates the Segment alias pattern for connecting anonymous users to real user IDs.
 *
 * Before login, Segment auto-generates an anonymous ID stored in a cookie.
 * On first login/signup, alias() merges the anonymous record into the real user record,
 * giving you a complete view of the user's journey from first visit to conversion.
 *
 * Without alias — two separate records:
 *   anon-abc-xyz → browsed 5 pages, viewed pricing
 *   real-user-123 → signed up, purchased
 *
 * With alias — one merged journey:
 *   real-user-123 → browsed 5 pages → viewed pricing → signed up → purchased
 */

// Before login — Segment tracks automatically using an anonymous ID
// window.analytics.user().anonymousId() → "anon-abc-xyz"

// On first signup/login — call alias ONCE to merge records
analytics.alias(user.id); // Segment finds the anon cookie automatically
