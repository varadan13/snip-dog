/**
 * Demonstrates the complete Segment identity flow to run after a successful login or signup.
 *
 * alias() must be called before identify() and only once (at first login).
 * identify() should be called on every login to keep traits up to date.
 * For first-time signups, call both; for returning logins, call identify only.
 */

async function onLoginSuccess(user) {
  // Step 1: merge anonymous pre-login activity into the real user record (first login only)
  analytics.alias(user.id);

  // Step 2: attach traits so downstream tools (Intercom, Customer.io, Mixpanel) have context
  analytics.identify(user.id, {
    name: user.name,
    email: user.email,
    plan: user.plan,
  });
}
