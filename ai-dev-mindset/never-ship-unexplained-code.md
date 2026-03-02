/**
 * Demonstrates: The discipline of owning every line you ship.
 * Why it matters: AI makes it easy to produce plausible-looking code nobody actually thought through.
 * The developer who can read any code — generated or not — and identify its assumptions and failure
 * modes becomes more valuable, not less.
 */

# Never ship code you can't explain

The bar isn't "it works." The bar is "I can defend every decision I made getting here."

That means when someone asks you in a code review why you chose a particular library, you don't say "it came up first in a search" or worse, "the AI suggested it." You say: *this library is actively maintained, has a small bundle size, and handles edge case X which the alternatives don't.* That's the difference between someone who shipped a feature and someone who made an engineering decision.

## What you should be able to answer for every meaningful line

- **Why this library over the alternatives?** You evaluated the options. You know the trade-offs — bundle size, maintenance status, API ergonomics, community size. You didn't just grab the first result.
- **Why this pattern?** You chose a hook over a HOC, or a reducer over local state, for a reason. What was it? Readability? Scalability? Team convention?
- **What are the failure modes?** What happens when this API call fails? What if the data is null? What if two of these run concurrently? You thought about it.
- **What did you consciously decide not to do?** Good engineering is as much about what you ruled out as what you chose. "I considered X but rejected it because Y" is a sign of someone thinking, not just executing.
- **What would make you revisit this decision?** Nothing is permanent. Knowing when your own solution breaks down is a mark of maturity.

## Why this matters more now, not less

AI makes it trivially easy to produce code that looks reasonable on the surface. That raises the stakes on understanding — because now there's more plausible-looking code in the world that nobody actually thought through. The developer who can read any piece of code, AI-generated or not, and immediately identify the assumptions it's making and where it will break — that person becomes more valuable, not less.

If you can't explain it, you don't own it. And if you don't own it, you can't fix it at 2am when it breaks in production.

## The practical habit

Before you open a PR, do a pass where you read every line as if you're the reviewer, not the author. If you hit a line and think *"I'm not totally sure why this is here"* — that's your signal. Either figure it out, or rewrite it until you can. Slowness at this stage is a feature, not a bug. It's far cheaper than explaining an outage later.
