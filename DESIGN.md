# DESIGN.md

Read this before building or changing any screen. If a choice isn't covered here, ask me instead of guessing. PRODUCT.md owns game rules; IDEA_SCOPE.md owns build order. This is a specification, not a built or browser-verified game.

## 1. The feeling, in labels

- Compact progress strip: keeps Beginner, Amateur and Pro, points and badges visible above each challenge.
- Editable challenge prompt: lets students improve the supplied text without starting from nothing.
- Answer comparison: places the original and new answer together so students can inspect differences.
- Feedback and correction: identifies a gap and makes the student's next action clear.
- Earned reward: recognises demonstrated reasoning with a point or an independent final pass with a badge.

The approved direction is a playful challenge app, with visible points and badges. Playfulness comes from progression, achievement and encouraging wording; it must not obscure the task or imply that every AI answer is correct.

## 2. References, one per component

Challenge screen: https://brilliant.org/
Take: focused interactive learning, one challenge at a time, a clear response area and feedback tied to the task.
Ignore: its subject catalog, tutor character, subscriptions, branding and marketing claims.

Course progression strip: https://brilliant.org/
Take: make the current stage, completed stages and locked stages clear. Adapt to our three levels and show points out of six and earned badges above the challenge; no separate level-map screen in v1.
Ignore: extra courses, streaks, leaderboard and any unlock rule that conflicts with our independent finals.

These two reference choices are approved. The official page describes interactive learning and progress; exact lesson styling, motion and component appearance have not been visually inspected. Treat the takes as our design interpretation, not a claim of pixel matching. Prompt editing, answer comparison and feedback behavior follow our product rather than an unverified reference interaction.

## 3. Type and colour

Font: Nunito Sans throughout, with a sans-serif fallback. Use regular text, semibold labels and bold headings. Self-host the chosen font during implementation and retain its license.

Sizes:

- 32 px: page headline.
- 24 px: challenge and result headings.
- 18 px: body text, prompts, answers and main buttons.
- 14 px: supporting labels, attempt counts and progress details.

Colours: text #17211B on background #FFFFFF; secondary text #46534B. Accent #176B3A only on the main action. Errors #B42318 with explanatory text. Neutral borders #D8DFDA and secondary surfaces #F4F6F4 separate controls and answers. Points and badges use neutral shapes and explicit earned labels; reserve green for the main action.

This palette and type scale specify the approved white, dark-text, green-action, rounded-font direction. Check contrast during implementation, including hover, disabled and focus states. Color alone never communicates an outcome.

## 4. Screens

### First challenge: begin without an account

For: experiencing one useful challenge before committing to sign-in.

Top to bottom: product name; headline and supporting words from section 5; compact progress strip; Beginner practice 1 of 2; task and essential requirements; weak prompt in an editable, labelled text box; original example answer; main action.

Main action: Generate answer -> answer comparison on the same page.

Empty: Your starting prompt is ready to edit. If the student clears it: Add a prompt before generating an answer.
Loading: Generating your answer. Your edit is saved on this device.
Error: The answer could not be generated. Your edit is still here. Try again.
Done: Your answer is ready. Check it against the task.

Do not describe a device save as confirmed unless it succeeded. Generation failure does not consume a learning attempt.

### Answer comparison and judgment

For: deciding whether the answer meets the task before seeing feedback.

Top to bottom: progress strip; task requirements; original and new answer with distinct headings; student's submitted prompt; field labelled Does this answer meet the task? Explain why; main action.

On wide screens answers sit side by side; on phones they stack, original then new. Keep text readable without horizontal page scrolling.

Main action: Check my judgment -> feedback after assessment succeeds.

Empty: Explain what the answer gets right or misses.
Loading: Checking your prompt and judgment.
Error: Assessment is unavailable. Your answer and judgment are still here. Try again.
Done: Your feedback is ready.

Do not reveal feedback or final hints before the student submits their judgment.

### Feedback and correction

For: demonstrating that the student understood feedback, rather than just read it.

Top to bottom: progress strip and attempt count; specific feedback gap with its reason; editable prompt; correction explanation field labelled What did you change, and why?; answer judgment; main action; optional sign-in offer after first useful feedback.

Main action when the prompt needs correction: Try my correction -> generate a new answer, collect the student's updated judgment, then assess the correction and explanation.
Main action when only judgment needs correction: Check my correction -> reassess the existing answer and corrected judgment without another generation.

Empty: Make a correction and explain how it addresses the feedback.
Loading: Checking your correction.
Error: Your correction could not be checked. Your work is still here. Try again.
Done when earned: Skill point earned. You addressed the gap and explained why.
Done when not yet earned: Not yet. followed by the specific remaining gap and next action.

A successful first attempt can also earn its point. Show rewards only after assessment and save confirmation. No duplicate point for replaying the challenge. After the second retry, show a worked example and why it works. Viewing it can complete supported practice but cannot earn an independent point. The main action then becomes Next challenge.

### Independent final

For: checking transfer to a fresh task without hints.

Top to bottom: progress strip; Final challenge; fresh task and requirements; editable weak prompt; Generate answer; resulting answer; student judgment; final submission action. No hint or worked example before submission.

Main action after an answer is ready: Submit final -> saved pass or not-yet result.

Empty: Complete your prompt and answer judgment before submitting.
Loading: Checking your final challenge.
Error: Your final could not be assessed. Your submission is still here. Retry assessment.
Done on pass: Beginner badge earned, Amateur badge earned or Pro badge earned, matching the completed level.
Done on an unsuccessful attempt: Not yet. Review the feedback and return to practice.

Passing unlocks the next level; passing Pro finishes the game. Failure returns to practice, then an unseen reviewed final variant. If both variants were seen without a pass, keep the next level locked and explain: Keep practising. Another fresh final challenge is needed to unlock the next level. Do not offer a nonworking unlock button.

### Save progress

For: keeping progress across devices after the student has received value.

Top to bottom: Save your progress; explanation of account backup versus device-only saving; Convex Auth sign-in controls; return to current challenge. Authentication methods follow the authorized implementation; no outside sign-in service.

Main action: Save my progress -> sign-in, attach the guest attempt, and return to the current challenge.
Secondary action: Keep practising on this device -> current challenge, preserving the guest attempt.

Empty: Your progress is currently saved on this device only.
Loading: Saving your progress to your account.
Error: Account saving failed. Your work is still on this device. Try again.
Done: Progress saved to your account.

Show the device-only statement only when local saving succeeded. Closing and reopening restores confirmed drafts, attempts, points and badges; never claim unsaved changes are backed up.

### Level result and game completion

For: celebrating earned progression and showing the next action.

Top to bottom: progress strip; earned badge and level name; concise explanation of the demonstrated skill; total points; main action.

Main action after Beginner or Amateur: Start next level -> that level's first practice challenge.
Main action after Pro: Review my challenges -> completed practice challenges. Do not invent another level.

Empty: Complete this level's final challenge to earn its badge.
Loading: Saving your result.
Error: Your result could not be saved. Try again. Keep the result pending; do not silently unlock.
Done after Pro: All three levels complete. You improved prompts and checked answers on fresh challenges.

This acknowledges in-game performance, not lasting mastery or fewer attempts on actual assignments.

### Shared usage and recovery states

Usage exhausted: You've reached today's AI allowance. Your progress is kept. Return when it resets. Show the actual reset time once implemented. Already available examples may be reviewed; do not pass off a stored answer as a newly generated one.

Device saving failure: This edit could not be saved on this device. Keep this page open and copy your work before leaving.

Assessment unavailable: retain the submission and offer retry. Do not convert missing or contradictory assessment into a fail or reward.

## 5. The first screen's words

Headline: Get answers that fit what you need.

Under it: Practise improving a prompt, compare AI answers, and learn what to trust. Short challenges for students, from Beginner to Pro.

Button: Generate answer.

The first screen already contains an editable challenge, so this button generates from the student's edit rather than opening a separate introduction. The headline describes an intended benefit, not a measured outcome or a student quote.

## 6. Principles

- Read PRODUCT.md for learning and reward rules. No extra features or inferred changes to those rules.
- Keep a compact progress strip above challenges. It shows current, completed and locked levels, points out of six, and earned badges. Wrap on narrow phones rather than cause horizontal scrolling.
- Points recognise practice; independent finals unlock levels. Badges are game achievements, not qualifications.
- Correct judgment rather than the prompt when the prompt is already sensible.
- Collect student judgment before revealing feedback; keep finals free of hints before submission.
- Use one green main action at a time. Other actions are neutral and secondary.
- Preserve edits and confirmed progress across failures. Failed requests do not use attempts; retries cannot duplicate awards.
- Make rewards visible after they are confirmed, with brief text and no required animation. Respect reduced-motion preferences.
- Keep explanations short and useful. Do not reward length, grammar or mandatory role formulas.
- Use visible field labels, keyboard focus and text explanations for states. Support enlarged text, readable contrast and comfortable tap targets.
- Ask the builder about screen choices not covered here rather than silently add layouts, screens or features.

Implementation status: this brief has not been built or visually tested. The existing setup page remains a truthful placeholder until the feedback gate and first complete flow work.
