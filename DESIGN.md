# DESIGN.md

Latest verification, 5 October 2026: the builder authorized development Gemini 3.5 Flash-Lite. Real quiz generation, gap feedback, correction, one justified point on attempt two, reopening and Next challenge passed in Edge at 390px. Separated answer generation from grading instructions after detecting premature feedback; 49 checks, build, typecheck and development push passed. The 20-request daily allowance, billing and production are unchanged. This supersedes earlier real-AI-blocked statements below; physical-phone confirmation, teacher review, quantitative feedback reliability evidence and quiz publication remain pending.

## Implemented first-mission refinement, 5 October 2026

For fresh Beginner practice 1, the headline is Turn a vague answer into useful help. Supporting words: Spot what is missing. Make one useful edit. Check what changed. The quiz mission shows the starting request and prepared weak answer before the editor, then asks about missing information. Task requirements remain available in a collapsed control. Editor help says Add the missing detail. You do not need to start over.

After generation, direct the student to check both ideas and calculations. Retain answer tabs, judgment fields and both correction paths. Confirmed independent success recognises a clear request and accurate check, without implying actual quiz readiness. The full worked example appears only after two retries. Old invitation work, other challenges and final screens retain earlier wording.

The white/green palette, Nunito Sans, phone controls and fixed Generate action remain. Prepared-response Edge journeys at 390px/1280px passed; real Gemini generation failed twice. Physical-phone confirmation remains pending.

## Approved mission direction, 5 October 2026

First approved example: learning/quiz-mission.md. Its round connects the friend's quiz problem, prompt editing, answer inspection and judgment. Result wording may acknowledge a clear request and an accurate answer check; do not claim the friend is ready for the quiz or has learned from a generated answer alone.

Lead each challenge with a small mission: a concrete situation, what the student needs to achieve and what success looks like. Present essential requirements as the conditions for achieving that goal. Keep these readable and available while editing and judging the answer.

Connect comparison and feedback to the mission: what does this answer help accomplish, what would still go wrong, and how does the student's correction address it? After a confirmed success, explain the achieved outcome alongside the existing earned point or badge. Preserve accurate supported-completion and pending-save wording.

This direction takes precedence over the earlier statement that playfulness comes only from progression, achievement and encouraging wording. Existing accessibility, stage actions, judgment targets, final hint restrictions and recovery rules still apply. Exact mission copy and screen changes are pending approval; no visual redesign or new game mechanics are specified here. The current app has not been changed or tested for this direction.

Read this before building or changing any screen. If a choice isn't covered here, ask me instead of guessing. PRODUCT.md owns game rules; IDEA_SCOPE.md owns build order. This is a specification, not a built or browser-verified game.

## 1. The feeling, in labels

- Compact progress strip: keeps Beginner, Amateur and Pro, points and badges visible above each challenge.
- Editable challenge prompt: lets students improve the supplied text without starting from nothing.
- Answer comparison: places the original and new answer together so students can inspect differences.
- Feedback and correction: identifies a gap and makes the student's next action clear.
- Earned reward: recognises demonstrated reasoning with a point or an independent final pass with a badge.

The approved direction is a playful challenge app, with visible points and badges. Playfulness comes from progression, achievement and encouraging wording; it must not obscure the task or imply that every AI answer is correct.

## 2. References, one per component

Approved source: Brilliant. The specific public-homepage views below replace a generic homepage reference. The image descriptions were available on its official page, but direct image retrieval failed. Their exact pixel hierarchy, spacing and state colors are unverified. The annotations below are implementation choices for our game, not claims that they were measured in Brilliant's app. No logged-in lessons were tested.

### Challenge workspace

Component view: the coding exercise shown under Real-world applications on https://brilliant.org/ . Direct image: https://brilliant.org/cdn-cgi/image/width%3D3840%2Cquality%3D75%2Cformat%3Dauto/loggedOutHomepage/trust-real-world-applications.png

Take: an explicit editable workspace with its action below it. Our hierarchy is task -> requirements -> editable prompt -> Generate answer. Group label/helper/editor at 8 px spacing; separate task, editor and answer groups by 24 px. Show processing and retry inside the same workspace, retaining the student's text.
Ignore: its code content, Run action, subject matter and branding. Our material is a prompt, not executable code.

### Learning progression

Component view: the lesson-plan image under Mastery assessments on https://brilliant.org/ . Direct image: https://brilliant.org/cdn-cgi/image/width%3D1920%2Cquality%3D75%2Cformat%3Dauto/loggedOutHomepage/trust-mastery-assessments.png

Take: a visible sequence of learning stages. Our hierarchy is current level -> two practice outcomes -> final outcome, with separate points and badge labels. Use an 8 px gap within a stage and 16 px between stages; wrap on phones. State words come from the progress table in section 4, not guessed reference colors.
Ignore: personalized curriculum, extra subjects and any progression rule that differs from our independent finals. This is a compact strip, not a separate course-map page.

### Feedback

Component view: the lesson-chat image under Lesson interventions on https://brilliant.org/ . Direct image: https://brilliant.org/cdn-cgi/image/width%3D1920%2Cquality%3D75%2Cformat%3Dauto/loggedOutHomepage/trust-lesson-interventions.png

Take: a focused next-step explanation after a learner gets stuck. Our hierarchy is identified gap -> evidence from the student's submission -> correction field -> explanation -> main action. Use 8 px within feedback text and 24 px before the correction form.
Ignore: tutor character, chat bubbles, voice controls and unrestricted conversational tutoring. Our feedback is a structured challenge stage.

### Our component decisions

Prompt editor: a full-width labelled multiline field, minimum six visible lines, 16 px inner padding, 1 px neutral border and 12 px corners. Keep ordinary readable text; no code-editor decoration. The main action sits below the field with a 16 px gap. Clearly distinguish editable drafts from submitted read-only prompts.

Answer comparison: two equal-width regions with a 24 px gap on desktop, each with a heading and readable full text, maximum 70 characters per line. On phones use the answer tabs and preserved judgment behavior specified in section 4. Neutral backgrounds distinguish answer regions; do not use nested cards or a green good-answer treatment before assessment.

Feedback: one neutral full-width region with 16 px padding. Separate Gap, Why it matters and Next step with short headings, not extra decorative badges. Not yet is instructional, not a red system error. Reserve red for errors that prevent the requested action.

Badges: neutral outlined achievement shapes with the level name and explicit Badge earned wording. Locked badges say Not earned yet. Do not use color alone or imply a qualification. No generated illustrations or copied Brilliant assets in the shipped interface.

Visual-reference verification remains a separate evidence task: inspect these exact views before claiming faithful reference matching. Our own hierarchy, spacing and states are specified above so implementation need not guess while that evidence is unavailable.

## 3. Type and colour

Font: Nunito Sans throughout, with a sans-serif fallback. Use regular text, semibold labels and bold headings. Self-host the chosen font during implementation and retain its license.

Sizes:

- 32 px: page headline.
- 24 px: challenge and result headings.
- 18 px: body text, prompts, answers and main buttons.
- 16 px: supporting labels, attempt counts and progress details. All visible text is at least 16 px.

Colours: text #17211B on background #FFFFFF; secondary text #46534B. Accent #176B3A only on the main action. Errors #B42318 with explanatory text. Neutral borders #D8DFDA and secondary surfaces #F4F6F4 separate controls and answers. Points and badges use neutral shapes and explicit earned labels; reserve green for the main action.

This palette and type scale specify the approved white, dark-text, green-action, rounded-font direction. Check contrast during implementation, including hover, disabled and focus states. Color alone never communicates an outcome.

## 4. Screens

### Approved page structure

The screen descriptions below are stages, not separate pages unless stated otherwise:

- One practice challenge page contains prompt editing, answer comparison and judgment, feedback, both correction paths, practice results and the worked example. Keep the task and student work together as the stage changes.
- One final challenge page contains final editing, answer generation, judgment, assessment and the badge/result stage. No hints before submission. Beginner/Amateur success offers Start next level; Pro success offers Review my challenges.
- Account sign-in is separate. Open it only when the student chooses the secondary save-progress offer; return to the exact challenge and stage afterward. Progress attachment, conflict choice and retry remain part of account-saving recovery, with current work retained.
- The progress strip and recovery messages are shared components, not extra pages. A new challenge replaces the task only after the appropriate onward action; it does not erase saved work.

Each stage has one main action. Before generation it is Generate answer or Generate revised answer. Once an answer is ready, hide the generation action or make it secondary; the main action becomes the appropriate judgment/assessment submission. In a final, Generate answer stops being primary when the answer appears and Submit final becomes primary. Editing a submitted prompt requires a new answer and judgment before assessment.

The optional Save my progress offer is secondary while the challenge is active. It becomes the main action only inside the explicitly opened account-saving flow. A save failure makes Retry saving primary without repeating assessment. Navigation, answer tabs and requirements controls remain secondary.

### Shared progress strip

Keep it above every challenge, compact and wrapping on phones. The text separates supported completion, demonstrated practice skill and independent level achievement:

| State | Visible words and treatment | Meaning/action |
| --- | --- | --- |
| Current practice | Practice 1 of 2 - Current; semibold text and neutral outline | Current task; no achievement implied |
| Available practice | Practice 2 - Ready | Opens when the preceding practice is completed |
| Completed with help | Practice completed with help - No skill point | Worked example supported completion; can continue to final |
| Point earned | Practice complete - 1 skill point earned | Criteria met without the worked example; no duplicate reward |
| Final ready | Final challenge - Ready | Both practices finished, with or without points |
| Current final | Final challenge - Current | Independent attempt in progress |
| Final not yet passed | Final - Not yet; Return to practice | No badge or unlock; next attempt needs an unseen reviewed variant |
| Passed level | Beginner badge earned, or matching level name | Independent pass; next level unlocks regardless of practice point total |
| Locked level | Amateur - Locked. Pass Beginner's final to unlock, or equivalent | No clickable false start action |
| Pending save | Result checked - Save pending | No confirmed point, badge or unlock until saving succeeds |

Show Skill points: X of 6 separately from levels and badge completion, with the explanation Points reward independent practice; badges mark final passes. A completed-with-help practice is not displayed as unfinished merely because its point is missing. Six points are not required to finish the game. Once Pro is passed, show All three levels complete even if fewer than six points were earned.

Clicking a completed practice is review/replay, with no additional point. Selecting a locked stage explains its requirement without leaving the current work. Guest points are labelled Saved on this device only until account saving succeeds.

### First challenge: begin without an account

For: experiencing one useful challenge before committing to sign-in.

Top to bottom: product name; headline and supporting words from section 5; compact progress strip; Beginner practice 1 of 2; task and essential requirements; weak prompt in a text box labelled Edit this prompt, with helper text Change it to meet the task before generating; original example answer; main action.

Main action: Generate answer -> answer comparison on the same page.

Empty: Your starting prompt is ready to edit. If the student clears it: Add a prompt before generating an answer.
Loading: Generating your answer. Your edit is saved on this device.
Error: The answer could not be generated. Your edit is still here. Try again.
Done: Your answer is ready. Check it against the task.

Do not describe a device save as confirmed unless it succeeded. Generation failure does not consume a learning attempt.

### Answer comparison and judgment

For: deciding whether the answer meets the task before seeing feedback.

Top to bottom: progress strip; task requirements; original and new answer with distinct headings; student's submitted prompt; field labelled Does your answer meet the task? Explain why; main action.

On wide screens answers sit side by side. On phones, use labelled Original answer and Your answer tabs showing one full answer at a time; start on Your answer after generation. For a prompt correction, the labels are Previous answer and Revised answer, starting on Revised answer. These tabs change the comparison view, not the answer being assessed.

Keep a compact Task requirements control and the two answer tabs available above the answer while reading. Task requirements expands the criteria in place and collapses again; it does not navigate away. Avoid a large fixed header that hides the text on a small screen.

Keep the judgment editor below the answer viewer. Provide a neutral Write my judgment link near the tabs to jump to that field and a Back to answer link beside the field to return to the selected answer. Switching tabs, expanding requirements and moving between answer and judgment must preserve the draft judgment and each answer's reading position.

Explicitly label the judgment field with its target: Does your answer meet the task? or Does this revised answer meet the task? Viewing the original/previous answer never retargets the field. In judgment-only correction, show the unchanged existing answer without generating or substituting another.

Use full readable answers without horizontal page scrolling or default truncation. Before calling the comparison usable, verify it on a narrow phone with realistically long answers, an expanded requirements list and a multi-line draft judgment. Check switching, return links, keyboard visibility and draft preservation.

Main action: Check my judgment -> feedback after assessment succeeds.

Empty: Explain what the answer gets right or misses.
Loading: Checking your prompt and judgment.
Error: Assessment is unavailable. Your answer and judgment are still here. Main action: Retry assessment, using the same answer and submission without regenerating.
Done: Your feedback is ready. If assessment is successful but saving fails, show Result checked - Save pending and Retry saving; save the existing assessment, do not run another one.

Do not reveal feedback or final hints before the student submits their judgment.

### Feedback and correction

For: demonstrating understanding through a correction and explanation. Keep prompt correction and judgment-only correction as separate paths, determined by the feedback gap. Do not require prompt changes when only judgment is wrong.

#### Path A: prompt correction

Stage 1: edit before generating:

- Visible: progress strip, attempts remaining, task requirements, feedback gap, the previously assessed prompt and its answer. Label that answer Previous answer; it is context, not the answer being judged for the next attempt.
- Editable: the prompt and What did you change, and why? No new-answer judgment field is shown yet.
- Submitted: the revised prompt and correction explanation.
- One main action: Generate revised answer -> stage 2 after generation succeeds.
- Loading: Generating an answer to your revised prompt. Keep the edit and explanation visible.
- Failure: preserve both fields and retry generation; do not assess a judgment or consume a learning attempt.

Stage 2: judge the new answer:

- Visible: task requirements, submitted revised prompt and explanation, the new generated answer labelled Revised answer, and the previous answer for comparison.
- Editable: a fresh field labelled Does this revised answer meet the task? Explain why. Do not prefill it with the previous judgment.
- Submitted: the revised prompt, its explanation, this exact revised answer and the student's judgment of it.
- One main action: Check my correction -> stage 3 after assessment succeeds.
- The judgment belongs only to this revised answer. If the prompt is edited again, retain the draft but require regeneration and a new judgment before assessment; never pair it with the older answer.

Stage 3: correction result:

- Visible: assessed revised prompt, revised answer, student explanation and judgment, feedback and confirmed point/not-yet result. Inputs are read-only in this result stage.
- Submitted: no new assessment on the onward action.
- One main action: use the practice-outcome destinations below.

#### Path B: judgment-only correction

Stage 1: reassess the existing answer:

- Visible: progress strip, attempts remaining, task requirements, unchanged prompt, the exact previously generated answer, previous judgment and feedback explaining the judgment gap.
- Editable: the corrected answer judgment and What did you change in your judgment, and why? The prompt is read-only in this path.
- Submitted: the unchanged prompt and existing answer, corrected judgment and explanation. No generation request is made.
- One main action: Check my corrected judgment -> stage 2 after assessment succeeds.
- The judgment refers to the same existing answer throughout. Keep that answer visible and identified; do not replace it while the student writes.

Stage 2: correction result:

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
Done on an unsuccessful attempt: Not yet. Review the feedback and return to practice. Main action: Return to practice -> the practice challenge for the missing skill. After practice, Start fresh final opens the unseen reviewed variant; if none exists, display the locked-state explanation instead.

Passing unlocks the next level; passing Pro finishes the game. Failure returns to practice, then an unseen reviewed final variant. If both variants were seen without a pass, keep the next level locked and explain: Keep practising. Another fresh final challenge is needed to unlock the next level. Do not offer a nonworking unlock button.

### Save progress and account recovery

For: keeping progress across devices after first value, without losing the current guest attempt or existing account progress.

Stage 1: choose saving:

- Visible: current challenge, answer, judgment, feedback and earned/pending result; Save your progress explains device-only storage versus account backup.
- Editable: authorized Convex Auth sign-in fields only; do not discard or reset the challenge while signing in.
- One main action: Save my progress -> sign-in and attach the locally retained guest attempt to the account.
- Secondary action: Keep practising on this device -> return to the unchanged challenge. This is not a claim of account backup.

Stage 2: attach guest progress:

- Visible: the complete guest attempt remains available, with Saving your progress to your account. Do not clear local work before a confirmed successful save.
- Submitted: the retained guest attempts and already-assessed results. Do not regenerate answers or repeat assessment to save them.
- New account with no progress: attach the guest attempt and restore it as the current challenge.
- Account already containing progress: retain both histories. Never replace a confirmed account attempt with a guest draft. Preserve completed practices, passed levels and badges; award at most one point per practice challenge. Keep all seen final variants recorded, so sign-in cannot make a previously seen final appear fresh.
- If both account and guest contain different drafts for the same challenge, keep both and show their saved times and short previews. Main action: Continue account draft. Secondary action: Continue this device's draft. Choosing which to continue does not delete the other or overwrite evaluated attempts.
- Done: Progress saved to your account. Return to the challenge the student selected, with confirmed account progress visible.

Stage 3: recover a failed account save:

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

### Level result and game completion: final-page stage

For: celebrating earned progression and showing the next action.

Top to bottom: progress strip; earned badge and level name; concise explanation of the demonstrated skill; total points; main action.

Main action after Beginner or Amateur: Start next level -> that level's first practice challenge.
Main action after Pro: Review my challenges -> completed practice challenges. Do not invent another level.

Empty: Complete this level's final challenge to earn its badge.
Loading: Saving your result.
Error: Your result could not be saved. Main action: Retry saving -> save the same already-assessed final result without assessment or generation. Keep the result pending; do not silently unlock.
Done after Pro: All three levels complete. You improved prompts and checked answers on fresh challenges.

This acknowledges in-game performance, not lasting mastery or fewer attempts on actual assignments.

### Shared usage and recovery states

Usage exhausted: You've reached today's AI allowance. Return when it resets. Say Your progress is kept only when saving has actually succeeded. Show the actual reset time once implemented. Already available examples may be reviewed; do not pass off a stored answer as a newly generated one.

Device saving failure: This edit could not be saved on this device. Keep this page open and copy your work before leaving.

Assessment unavailable: retain the submission and offer retry. Do not convert missing or contradictory assessment into a fail or reward.

## 5. The first screen's words

Headline: Get answers that fit what you need.

Under it: Practise improving a prompt, compare AI answers, and learn what to trust. Short challenges for students, from Beginner to Pro.

Button: Generate answer.

The first screen already contains an editable challenge, so this button generates from the student's edit rather than opening a separate introduction. The headline describes an intended benefit, not a measured outcome or a student quote. The field instruction explicitly tells the student to edit first; the answer stage explicitly asks for judgment before feedback.

### Opening-screen comprehension check, still to run

Show the first challenge as a paper sketch, phone image or implemented screen to three students individually for ten seconds, without explaining it. Hide it and ask, one question at a time: What is this for? What would you do before pressing Generate answer? What would you do after the answer appears?

Record their exact answers. Pass this initial check only if all three understand they should edit the supplied prompt, then judge the resulting answer before receiving feedback. They should not think the game completes their assignment or automatically writes the prompt for them. This small check does not prove general usability.

If a student misunderstands, change only the misunderstood headline, helper, button or stage instruction; preserve the agreed flow and styling. Retest with fresh students. No comprehension result is claimed here, so the current words remain a testable draft rather than validated copy.

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

Specification review: both correction paths identify visible content, editable fields, submitted material and the target answer. Every practice outcome has an onward action; save retry differs from assessment retry; account conflicts retain both drafts; phone comparison preserves judgment; progress distinguishes supported work from independent rewards.

Implementation checks still required: long-answer desktop/phone comparison, preserved tab reading position and judgment, onscreen keyboard visibility, draft conflict recovery, retry without reassessment, duplicate reward prevention, final hint restrictions, focus order, touch targets and contrast. Capture actual evidence before reporting success.

Implementation status: the first Beginner practice page now has an implementation and simulated-response interaction checks. Real AI access, account backup, visual browser/phone checks and student comprehension evidence remain pending. The rest of this document still specifies the intended full journey.


Phone accessibility requirement: all tappable controls, including links and disclosure toggles, have a target at least 44 by 44 CSS pixels. Verified in Edge at 390 by 844 pixels across 28 first-practice state captures, including correction, completion, loading, error and save-pending states. This is browser emulation, not a physical-phone check.


## Approved assessment challenge and current implementation states

Builder decision: students may choose Challenge. AI rechecks the same submitted prompt, answer, judgment and correction explanation. If it still disagrees, continue through normal practice; there is no teacher-review step. A successful recheck replaces the decision for that attempt without consuming another attempt or awarding a duplicate point. Keep the original assessment for review. Technical limit: one completed recheck per assessment, with retries for failed requests.

Use the existing approved assessment-loading and unavailable messages during recheck. Keep the submission visible. After success show the rechecked explanation and evidence; remove Challenge for that assessment and retain the normal correction/result path. If recheck fails, keep the original decision and offer Retry assessment. Pending saving uses Retry saving, without another AI call.

The first-practice implementation now includes the approved first-visit and answer-ready instructions, correct assessment loading text, explicit assessment retries, previous judgment during judgment-only correction, read-only submitted work on results, and interrupted-request/pending-save recovery. Phone state previews are development-only, prepared, separate from saved progress and credit-free. See PHONE_STATES.md. Additional practices, finals and account saving remain outside this implemented slice.


## Current Beginner milestone implementation

Both Beginner practices now use the approved shared practice page. Next challenge opens practice 2 after either saved practice-1 outcome. The progress strip names each practice separately, retains supported completion without a point, and allows reviewing completed work without another award. Practice 2 uses its own task and prepared examples. After practice 2, the existing More challenges will follow message remains truthful: no final or badge is offered before its milestone is built.

Saved current-practice selection, per-practice drafts and results survive reopening. Navigation is blocked while a request or result save is pending; a failed onward save retains the current result and offers save-only recovery. The two-practice flow passed prepared-response Edge walks at 390px and desktop width. All 24 development state previews passed phone-width size and overflow checks. Live second-task generation passed, but assessment hit Gemini's free daily quota; no successful live second-practice assessment or physical-phone observation is claimed. See M0_VERIFICATION.md.


## Beginner final milestone in development

The independent final uses the approved shared-page stages, shows only its generated answer, and hides all original examples and worked solutions before assessment. Submit final assesses the exact answer and judgment. Passing shows the neutral Beginner badge without another practice point. As Amateur is not built, its status says Ready - More challenges will follow and the working main action is Review my challenges; Start next level will replace it when that destination exists.

Failure offers Return to practice, selecting practice 1 for a prompt gap or practice 2 for judgment. This supported round has separate attempts, no additional points and the same two correction paths. Completion opens Start fresh final. Both final variants seen without a pass show the approved locked explanation while supported practice remains available. Reopening retains the current stage; save retry never assesses again. The builder explicitly authorized final publication; quantitative feedback-gate evidence remains unrecorded. Phone previews and browser proof are recorded in M0_VERIFICATION.md; no physical-phone observation is claimed.


## Approved phone refinement, 4 October 2026

At phone widths the current Beginner practice and points share the first progress row. Amateur and Pro use one compact row, each marked Locked; their fuller unlock descriptions remain on desktop. Generate answer and Generate revised answer stay at the bottom of the phone viewport while the editor is open; they disappear on the judgment stage. Retain readable 16px-or-larger text, tap targets of at least 44px and bottom padding so the fixed action does not prevent reaching the remaining content. This changes layout only, not level access, points, attempts or learning rules.
