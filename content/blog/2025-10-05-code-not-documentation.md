---js
const title = '5 October 2025: Thoughts on Documentation vs. Self-Documenting Code';
const date = "2025-10-03";
const draft = false;
const tags = ["javascript"];
const mermaid = false;
---

A central problem with the idea of 'self-documenting code' is that natural human writing has a rhetorical structure designed to teach the reader basic vocabulary and concepts needed for understanding. Code -- especially DRY (don't repeat yourself) code -- is non-linear.  As developers maintaining existing code, we're tasked with jumping into the middle and working backwards to understand what we need before moving on to the next ticket.


Let's say I get asked to rewrite the following bit of poetry to a different style:


>  Wailing her woe, the widow[1] old,<br>
>  her hair upbound, for Beowulf's death<br>
>  sung in her sorrow, and said full oft<br>
>  she dreaded the doleful days to come,<br>
>  deaths enow, and doom of battle,<br>
>  and shame. -- The smoke by the sky was devoured.<br>

Understanding this requires answering several questions.

- Who is the widow? (Unstated in text, usually interpreted as Beowulf's widow.)
- How did Beowulf die? (Killed by a dragon earlier in the same act.)
- Who is he? Why does his death foreshadow doom and battle? (The loss of a community hero leaves it vulnerable to cycles of violence from neighboring groups.)

In poetry, these questions are answered organically over the course of three acts. In code, each entity might be separated into separate files or modules. Back-tracing the definition of each can be done through import declarations and LSP features, but this takes critical time. Understanding the lifecycle of each object can be another challenge.

In nonfiction there's a similar structure:

1. Introduction
2. Development
3. Argument
4. Conclusion

Each step teaches the reader the *specific* concepts, definitions, and meanings used within the work. By the time we get to the conclusions, most issues of ambiguity can be resolved.

Combining context and intent documentation with clear code can help make code easier to understand.

