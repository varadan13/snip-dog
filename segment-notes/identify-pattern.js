/**
 * Demonstrates the Segment identify pattern for attaching traits to a known user.
 *
 * identify() pushes user traits to every connected downstream tool (Intercom, Customer.io,
 * Mixpanel, Amplitude etc.) automatically, without wiring up separate DB lookups per tool.
 *
 * Call identify:
 *   - Every time you learn something new about the user
 *   - On login, profile update, plan change
 *
 * You CAN skip identify if you only use Segment for raw event logging and have
 * no downstream tools — but it costs you trait-based filtering in dashboards.
 */

// Attach traits to the real user — tools like Intercom/Customer.io use these directly
analytics.identify(user.id, {
  name: user.name,
  email: user.email,
  plan: user.plan, // enables "filter by plan" in Mixpanel, Amplitude etc.
});
