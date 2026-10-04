# Prompting Game

Working name only. Updated 4 October 2026.

## 1. The job

When a student gets an unhelpful AI answer and does not know what to change, help them practise improving the request and judging the result, so they waste fewer attempts on their own work.

The first audience is students the builder teaches and can test with in class. A particular first student and the broader audience size have not been recorded.

The builder has observed students using AI like a search engine: entering a brief question or irrelevant detail, then copying the first answer without checking it. In one assignment, students used AI to design slide content and an interactive presentation from a PDF, but exhausted their credits without getting the expected output. That incident motivates the product; presentation creation is not the product's scope.

The goal is time: get useful AI results with fewer wasted attempts. Relevant context, clear goals, useful constraints and checking the answer matter. Roles and longer prompts are not automatically helpful.

Why this builder: access to a classroom and direct experience of students struggling to use AI effectively.

## 2. The switch

Today: write a weak request, receive a disappointing answer, guess what to change, and spend more attempts without understanding why. Some students copy the answer or abandon the tool.

With the game: attempt a short challenge, compare answers, receive specific feedback and practise with a clearer understanding.

The product must help students apply what they learn to a fresh task. Completing challenges or enjoying the game alone is not proof of learning.

The main risk is teaching students to satisfy scoring rules rather than get useful results. Evaluate whether the prompt and answer meet the task, not whether the student included a checklist of prompt ingredients.

## 3. The core flow

Approved choices:

- A game where students fix weak prompts, rather than a guide that builds their own prompts.
- Short challenges at Beginner, Amateur and Pro levels.
- Feedback plus a comparison showing how the student's rewrite changed the AI's answer.

The core story:

1. A student opens a short challenge with a clear task, a weak prompt and its answer.
2. They rewrite the prompt to achieve the task.
3. AI produces an answer to their actual rewrite.
4. The student compares the original and new answers.
5. They receive feedback explaining what improved, what still falls short and why it matters for the task.

Feedback should connect the student's choices to the resulting answer. It should identify when a better prompt cannot overcome a tool's limitations or when an answer needs verification.

Level names are approved. Their exact content, difficulty boundaries, pass rules and progression remain undecided. A proposed direction is clarity at Beginner, relevant context and constraints at Amateur, and harder tasks and answer evaluation at Pro; this is not yet approved.

Retry behavior and when to reveal a suggested solution remain undecided. The assistant's earlier retry-first suggestion was not confirmed.

## 4. Onboarding

The fastest proposed route to value is one short challenge: see the weak prompt and answer, rewrite it, then compare the new answer and read feedback.

First value is understanding how a specific change helped or failed to help. The student should not have to finish a course before experiencing this.

Account requirements, saved progress and the initial level-selection flow remain undecided.

## 5. First version

The agreed direction is a small prompting game with short challenges, three difficulty levels, answer comparisons and specific feedback.

It does not need to create presentations, read messages, monitor email or continue OpenLoops. Payments, leaderboards, streaks, certificates and teacher dashboards are not approved features.

The challenge count, scoring system and minimum release requirements must be agreed before implementation. No prompting-game feature is claimed implemented, working or live by this document.

Success means students improve on a fresh task without coaching. Whether they return voluntarily, retain the learning and would pay remains untested.

## 6. The AI-first part

AI answers the student's actual rewritten prompt and provides feedback tied to the task, prompt and resulting answer. A fixed quiz or static prompt checklist would not deliver the same personalized comparison.

A general AI assistant can also offer practice and feedback. The proposed distinction is a consistent sequence of short challenges, calibrated difficulty and evidence that students transfer learning to new tasks. This advantage has not been established against a general assistant.

Model access, cost, response time and automated feedback reliability remain unverified. Check AI judgments against teacher assessment before trusting scores.

## 7. Classroom evidence

The builder reported a classroom exercise with 10 students:

- All started at a score of 0.
- Eight students (80%) reached a final score of 2.
- Two students (20%) reached a final score of 1.
- The builder confirmed the final task was completed without coaching.

The suggested exercise used an initial task, practice with answer comparison and feedback, and a fresh final task. The builder confirmed final scores and independent completion; exact prompts, individual work, scoring details and whether every proposed exercise step was followed have not been recorded.

Evidence source: the builder's report, not independent observation by the coding agent. The exercise date was not supplied; this result was recorded on 4 October 2026.

What this supports: practice and feedback can help these students perform better independently on a subsequent task. This promising initial signal supports testing a small product.

What it does not establish: that automated feedback matches teacher feedback, that the game caused all improvement, that learning lasts, that students return or pay, or that the app works. No comparison group was reported. These students are classroom participants, not product signups.

## 8. Failure handling to settle before building

- A longer prompt produces a worse answer: reward task fit rather than length or mandatory roles.
- AI gives incorrect or inconsistent feedback: compare its judgments with teacher judgments.
- AI cannot complete the task with its available tools: identify the capability limit instead of blaming the student.
- Answer generation fails or credits run out: preserve the student's rewrite and explain what happened. Recovery and usage limits need design.
- A student submits sensitive assignment material: prepared challenge material is the proposed first-version approach; personal uploads are not approved.

These are proposed safeguards and open decisions, not implemented features.

## 9. Market and return use

The classroom is the first reachable testing audience. Ten students participated in the learning exercise; the number of suitable people in the builder's extended network is unknown.

Competitors, paid alternatives, funding trends and search demand have not been researched. Paying for an AI tool does not prove willingness to pay for this game.

Progress through harder challenges may encourage return use. This is a hypothesis, not an observed result. Price and buyer are undecided.

## 10. Current state and next test

OpenLoops has been abandoned as the product direction. The prompting game's initial classroom learning test has a positive reported result. This documentation update does not implement the game.

Next proposed test: compare automated feedback with teacher assessment on one challenge, then check performance on a fresh task without coaching. Record actual prompts, answers, scoring criteria and disagreements. Repeat-use and delayed learning checks follow separately.

The fixed stack remains Codex, GitHub and Convex for the database, backend, authentication and hosting. An outside AI service requires checking access, cost and the builder's service restrictions.

IDEA_SCOPE.md, V1_BUILD.md and other existing project documents still describe OpenLoops. They need a separate approved update before governing the new build. This request updates PRODUCT.md only.
