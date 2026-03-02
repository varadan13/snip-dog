/**
 * Demonstrates: How to use AI as a thinking partner rather than a vending machine.
 * Why it matters: Prompting for reasoning instead of answers builds mental models you own,
 * and often produces a better answer — because the model surfaces trade-offs it would otherwise skip.
 */

# Prompt for the why, not just the answer

Most people use AI like a vending machine. Put in a problem, take out the code, move on. That's the least valuable way to use it — and ironically, it often gives you a worse answer too.

The shift is simple: stop asking AI to solve your problem, and start asking it to *teach you how to think about* your problem.

---

## What that looks like in practice

Instead of:
> *"Write me a function that debounces API calls"*

Ask:
> *"What are the different ways to handle debouncing API calls in React? Walk me through the trade-offs of each approach — performance, readability, edge cases — and tell me which you'd recommend and why."*

You get the same working code at the end. But now you also understand *why* it's structured the way it is, what it's trading off, and when you'd reach for a different solution.

---

## Questions worth building into your habit

- *"What are 2–3 ways to solve this? What does each one cost you?"*
- *"What assumptions is this solution making? When would it break down?"*
- *"Is there a simpler version of this that would work for 80% of cases?"*
- *"What would a senior engineer push back on here?"*
- *"What would I need to know about my system to decide between these options?"*

These aren't just better learning prompts — they're better engineering prompts. Forcing the model to reason out loud surfaces trade-offs it would otherwise skip, and you'll regularly find it changes its own recommendation when pushed.

---

## Why AI often gives you the wrong answer first

AI defaults to the most common solution, not the most appropriate one for your context. It doesn't know your team's conventions, your performance constraints, your existing architecture, or what you tried last week that didn't work. When you ask "just solve it," you get a generic answer. When you ask "help me think through this," the conversation carries enough context that the output actually fits your situation.

Think of the difference between asking a senior colleague *"can you fix this?"* versus *"can you walk me through how you'd approach this?"* — the second conversation teaches you something. The first one just gets the ticket closed.

---

## The compounding effect

Every time you prompt for the why, you're depositing into a mental model you actually own. Six months of doing this and you start noticing something: you need AI less for the *thinking* and more for the *execution*. You already know the trade-offs. You just need it to write the boilerplate. That's the right direction. The goal is to make yourself better at the job, not more dependent on the tool.
