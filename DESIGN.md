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

For: demonstrating understanding through a correction and explanation. Keep prompt correction and judgment-only correction as separate paths, determined by the feedback gap. Do not require prompt changes when only judgment is wrong.

#### Path A: prompt correction

Stage 1 ? edit before generating:

- Visible: progress strip, attempts remaining, task requirements, feedback gap, the previously assessed prompt and its answer. Label that answer Previous answer; it is context, not the answer being judged for the next attempt.
- Editable: the prompt and What did you change, and why? No new-answer judgment field is shown yet.
- Submitted: the revised prompt and correction explanation.
- One main action: Generate revised answer -> stage 2 after generation succeeds.
- Loading: Generating an answer to your revised prompt. Keep the edit and explanation visible.
- Failure: preserve both fields and retry generation; do not assess a judgment or consume a learning attempt.

Stage 2 ? judge the new answer:

- Visible: task requirements, submitted revised prompt and explanation, the new generated answer labelled Revised answer, and the previous answer for comparison.
- Editable: a fresh field labelled Does this revised answer meet the task? Explain why. Do not prefill it with the previous judgment.
- Submitted: the revised prompt, its explanation, this exact revised answer and the student's judgment of it.
- One main action: Check my correction -> stage 3 after assessment succeeds.
- The judgment belongs only to this revised answer. If the prompt is edited again, retain the draft but require regeneration and a new judgment before assessment; never pair it with the older answer.

Stage 3 ? correction result:

- Visible: assessed revised prompt, revised answer, student explanation and judgment, feedback and confirmed point/not-yet result. Inputs are read-only in this result stage.
- Submitted: no new assessment on the onward action.
- One main action: use the practice-outcome destinations below.

#### Path B: judgment-only correction

Stage 1 ? reassess the existing answer:

- Visible: progress strip, attempts remaining, task requirements, unchanged prompt, the exact previously generated answer, previous judgment and feedback explaining the judgment gap.
- Editable: the corrected answer judgment and What did you change in your judgment, and why? The prompt is read-only in this path.
- Submitted: the unchanged prompt and existing answer, corrected judgment and explanation. No generation request is made.
- One main action: Check my corrected judgment -> stage 2 after assessment succeeds.
- The judgment refers to the same existing answer throughout. Keep that answer visible and identified; do not replace it while the student writes.

Stage 2 ? correction result:

- Visible: unchanged prompt and answer, corrected judgment, explanation, feedback and confirmed point/not-yet result. Inputs are read-only in this result stage.
- Submitted: no new assessment on the onward action.
- One main action: use the practice-outcome destinations below.

#### Shared practice outcomes

- Point earned, including a successful first attempt: show Skill point earned. Next challenge opens practice 2 after practice 1; Start final challenge opens the independent final after practice 2. No unused retry is required.
- Not yet, retries remaining: show the specific remaining gap. Try again returns to the appropriate correction path. A judgment-only assessment counts as an evaluated practice retry, like a prompt correction; each practice allows two retries after the initial attempt.
- Not yet, second retry used: show the worked example and its reasoning. Next challenge opens practice 2 after practice 1; Start final challenge opens the final after practice 2. Label this practice Completed with help; it earns no independent point.
- Assessment unavailable: keep the submission and show Retry assessment. No point, failure or attempt is recorded until valid assessment succeeds.
- Assessed but save failed: keep the assessed result visible as pending. Retry saving saves that same result without regenerating an answer or repeating assessment. Do not unlock onward navigation until the result save succeeds.

Offer optional sign-in after the first useful feedback without hiding the current work. These paths retain the existing learning, retry and achievement rules.

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

### Save progress and account recovery

For: keeping progress across devices after first value, without losing the current guest attempt or existing account progress.

Stage 1 ? choose saving:

- Visible: current challenge, answer, judgment, feedback and earned/pending result; Save your progress explains device-only storage versus account backup.
- Editable: authorized Convex Auth sign-in fields only; do not discard or reset the challenge while signing in.
- One main action: Save my progress -> sign-in and attach the locally retained guest attempt to the account.
- Secondary action: Keep practising on this device -> return to the unchanged challenge. This is not a claim of account backup.

Stage 2 ? attach guest progress:

- Visible: the complete guest attempt remains available, with Saving your progress to your account. Do not clear local work before a confirmed successful save.
- Submitted: the retained guest attempts and already-assessed results. Do not regenerate answers or repeat assessment to save them.
- New account with no progress: attach the guest attempt and restore it as the current challenge.
- Account already containing progress: retain both histories. Never replace a confirmed account attempt with a guest draft. Preserve completed practices, passed levels and badges; award at most one point per practice challenge. Keep all seen final variants recorded, so sign-in cannot make a previously seen final appear fresh.
- If both account and guest contain different drafts for the same challenge, keep both and show their saved times and short previews. Main action: Continue account draft. Secondary action: Continue this device's draft. Choosing which to continue does not delete the other or overwrite evaluated attempts.
- Done: Progress saved to your account. Return to the challenge the student selected, with confirmed account progress visible.

Stage 3 ? recover a failed account save:

- Visible: Account saving failed. Your work is still on this device. Keep the prompt, answer, judgment, explanation, feedback and already-assessed outcome visible. Mark that outcome Saved on this device only or Not yet saved to your account, according to actual storage state.
- Existing account progress remains intact. Do not display a guest reward as confirmed account progress or erase local work after a partial attachment.
- One main action: Retry account save -> retry attaching the same retained attempts and results. Successful pieces are not duplicated; no new AI assessment or generation is triggered.
- If sign-in expired, use Sign in to retry -> authenticate, then retry saving the same work. Return to the intended challenge rather than the beginning.
- Secondary action: Keep practising on this device. Retain the unsynced work for the next account-save attempt.
- If device storage also failed, say This work is not saved. Keep this page open and copy your work before leaving. Do not claim recovery after closing in that state.

Empty: Your progress is currently saved on this device only, shown only when device storage succeeded.
Loading: Saving your progress to your account.
Error: Account saving failed. Your work is still on this device, shown only when true.
Done: Progress saved to your account, shown only after confirmation.

Closing and reopening restores confirmed device work or account progress. An unsuccessful account save remains clearly unsynced; signing in again offers Retry account save. Retrying an already-assessed result saves that exact result, without reconsidering the student's judgment or consuming an attempt. Another account cannot receive the guest attempt automatically: require the student to choose Save my progress while signed in to that account.

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
