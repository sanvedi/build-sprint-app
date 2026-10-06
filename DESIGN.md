# DESIGN.md

## Approved Prompt Gully rebrand, 6 October 2026

Status: approved explicitly in chat on 6 October 2026. Published on 6 October 2026 with npm run deploy. Real Beginner practice 1 passed at 390px with all six screens, one point on attempt one, the branded celebration, reopening and Next challenge. Live title/header/share text and pre-rebrand progress preservation passed. Physical-phone and teacher-feedback reliability evidence remain separate. The existing six-screen practice flow is already live; this milestone changes its name and visual identity, not its learning mechanics. On approval, this section takes precedence over the earlier practice palette and branding instructions below.

### Name and voice

Product name: Prompt Gully. Make it feel like a friendly little lane where students tackle prompt missions: bright painted signs, sticker-like step markers and a quick earned celebration. Take the requested friendliness and focused lesson pacing from Duolingo as general inspiration, without copying its mascot, logo, exact colours, text or artwork. Create no mascot, new reward, timer, streak or sound.

Use the exact name in these places:

- Browser page title: "Prompt Gully | Improve prompts. Check answers."
- App header: "Prompt Gully".
- Search/share description: "Prompt Gully: small missions to practise improving prompts and checking AI answers." Apply the same truthful text to the page description and standard link-sharing metadata; do not add an unverified social image or product claim.
- Confirmed practice celebration: "A Prompt Gully win!", followed by the explicit reward "You earned 1 skill point!" and the existing task-specific success sentence. Show the brand as part of the celebration, without implying another point or a new scoring rule.

Words stay encouraging and specific. Keep clear action labels such as Generate answer, Write my judgment, Check my judgment and Next challenge. Task content, requirements and returned AI feedback remain exactly as they are. Interface headings can say "Your mission", "This prompt needs a boost", "Make one useful edit", "See what AI made" and "Does it do the job?". An unsuccessful attempt still identifies the actual gap, rather than treating every submission as a win.

### Palette and street-art character

Replace the current purple/lavender/peach practice look with cobalt blue, hot pink and citrus yellow-green against clean white reading surfaces and a pale sky background. Use dark ink for all reading text. The street-art character comes from the lettering, small painted geometric marks and angled sticker shapes; keep long answers, fields and requirements calm and easy to read.

| Role | Colour | Use |
| --- | --- | --- |
| Background | #F0FAFF | Pale sky page surface |
| Reading surface | #FFFFFF | Mission, prompt, answer and form workspace |
| Ink | #20233D | Dark headings, labels and body text |
| Main action | #2446D8 | Cobalt-blue buttons with white lettering |
| Street accent | #FF67AC | Pink wordmark backing and small step details, with dark ink |
| Progress and reward | #D8F36A | Citrus progress fill and earned-point sticker, with dark ink |

Keep the bundled Nunito Sans typeface: heavy, friendly lettering for the name and headings, clear normal text for answers. The Prompt Gully wordmark may use a small pink painted-sign backing beneath "Gully", a slight angle and an original simple sparkle shape. No copied lettering, animal character or generated graffiti image. Decorative geometric marks must not interfere with labels, controls or reading.

Use large rounded buttons, a shallow pressed edge, an original sticker-shaped point marker and small cobalt/pink celebration dots and stars. Keep main buttons at least 56px tall, other controls at least 44px, visible text at least 16px and the existing narrow lesson column. Retain readable contrast, visible keyboard focus and sensible enlarged-text wrapping. Verify colour contrast in implementation; do not place white body text on the pink or citrus accents.

### Layout and celebration

Preserve the six existing practice screens in order: task, weak prompt, edit, AI answer, your judgment and feedback. The progress bar remains across the top with the current step name and step count; it shows screen position, not mastery or points. Keep one clear main action per screen, requirements within reach, original/revised-answer comparisons and an expandable exact answer on the judgment screen. Long content may scroll.

Preserve Back navigation, saved views, drafts and the rule that editing a submitted prompt requires a new answer and a fresh judgment. Both correction paths, worked examples, rechecks, allowance/reset messages and save-only recovery retain their existing behavior.

The earned-point celebration lasts approximately 700ms, uses a citrus point sticker plus cobalt/pink stars and dots, and plays only when an independent practice point becomes newly confirmed. It never delays Next challenge, replays on reopening, rewards supported practice or duplicates a point. With reduced motion enabled, display the static point and words. Pending saves and unsuccessful assessments never show a confirmed win.

### Boundaries and release proof

Apply this practice identity to both existing Beginner practices and supported return practice. The shared product name and page/share metadata become Prompt Gully everywhere they appear, including the existing header when a final is open; that is the only branding change on final views. Final task content, layout, colours, hints, badges, assessment behavior and onward rules remain unchanged. Do not restyle final screens or change final-specific copy.

Do not change scoring, point decisions or totals, attempts, the daily request cap, model settings, AI instructions, task material, backend ownership checks or final rules. Do not publish the unrelated development-only attempt-history backend work. Never print or commit an API key or any credential. Keep current device progress and storage keys intact across the rename.

After chat approval: implement only this rebrand, check the existing tests/build/type checks, inspect the practice screens at phone and desktop widths, and verify final isolation and existing saved progress. Commit and push the reviewed release, deploy with npm run deploy, then play Beginner practice 1 with real AI generation and assessment on the public site at 390px. Paste a real screenshot of each of the six steps and the release commit hash. Check the confirmed point, short celebration, reopening without another AI request and Next challenge. Report a real cap/provider blocker if it prevents completion; never increase the cap or stage a pass.

Assumptions for approval: this is a rebrand of the existing six-screen flow, not another rebuild; both Beginner practices adopt the new identity; the global name changes on the final header but final-specific design and behavior stay intact; no mascot, sound or new image asset is needed. Browser verification at 390px remains separate from a physical-phone/mobile-data check.

## Proposed practice redesign, 6 October 2026 — awaiting chat approval

Status: approved by the builder in chat on 6 October 2026. Implemented and checked in development with six manual screens, both correction paths, saved-view recovery and confirmed-point celebration. This section replaces earlier practice layout, palette and motion instructions; final screens and their styling remain unchanged. Published with npm run deploy on 6 October 2026. The real live six-screen Beginner practice 1 journey passed in Edge at 390px: correct generated answer, actual assessment, one point on attempt one, celebration animation, reopening without another request and Next challenge. This is browser proof, not a physical-phone or teacher-feedback reliability result.

### Visual direction: a pocket-sized prompt game

Make practice feel cute, welcoming and playful through rounded shapes, friendly words, clear steps and a small earned celebration. The student rescues an unhelpful answer by improving the supplied prompt and checking the result. Borrow the general friendliness and focused lesson pacing requested by the builder, without copying Duolingo's mascot, logo, palette, wording or screen artwork. No new mascot, sound, timer, streak, reward or game mechanic.

Use a bright purple action button, peach lesson accents and sunshine-yellow progress/achievement details on a pale lavender background. Keep reading areas white and text dark. Avoid a stack of decorative cards: one central lesson workspace carries the current step, with generous breathing room and a clear action below it.

| Role | Colour | Use |
| --- | --- | --- |
| Page | #F5F2FF | Pale lavender background |
| Reading surface | #FFFFFF | Prompt, answer and form surfaces |
| Ink | #29213D | Headings, body and labels |
| Main action | #6941C6 | Purple buttons with white text; darker pressed edge |
| Warm accent | #FFD4BF | Peach step markers and quiet illustration-free decoration |
| Progress and reward | #FFD66B | Yellow progress fill and earned-point shape, with dark labels |

Retain the bundled Nunito Sans font: bold rounded headings at 28–32px, step headings at 24px, body and buttons at 18px, supporting text at least 16px. Use left-aligned reading text and fields; centre the short success heading and earned-point moment. Check contrast, focus and disabled states in implementation; accents never carry meaning without words.

Buttons: full-width main actions on phones, at least 56px tall, 18px corners and a shallow solid lower edge that compresses on press. Secondary controls have at least 44px tap targets and visible labels. Fields have 16px padding and 16px corners. Use a 480px-wide lesson column on larger screens, phone gutters of 20px and 24px gaps between groups. Long answers scroll naturally; one step per screen does not mean cutting off content to fit one viewport.

### Six practice screens

The progress bar stays across the top of the lesson, paired with the current step name and “Step X of 6”. It indicates position in this practice flow, not points, mastery or level unlocks. Keep the current practice, existing point total and device-save status compact; detailed level status may be opened through a secondary control. Back navigation changes the view only and never sends an AI request.

| Step | Visible content | Main action |
| --- | --- | --- |
| 1. Task | Existing mission situation, goal and essential requirements. Heading: “Your mission”. | “See the starting prompt” |
| 2. Weak prompt | Supplied weak prompt and its existing prepared weak answer, clearly labelled as the starting example. Heading: “This needs a little help”. | “Improve this prompt” |
| 3. Edit | Editable supplied prompt and task requirements within reach. Heading: “Make one useful edit”. Existing correction explanation field appears here when required. | “Generate answer”, or “Generate revised answer” |
| 4. AI answer | Full generated answer, submitted prompt and existing original/previous-answer comparison controls. Heading: “Your answer is ready”. No success judgement before assessment. | “Write my judgment” |
| 5. Your judgment | Labelled judgment field about this exact generated answer, with its answer and requirements accessible in place. Heading: “Does it do the job?” | Existing “Check my judgment” or appropriate correction action |
| 6. Feedback | Actual assessment, concise outcome, confirmed point when earned, and existing evidence/recheck/correction/worked-example controls. | Existing onward action, or a clear action opening the required correction |

This is a change of view inside the existing challenge, not six independent submissions. Persist the current view alongside drafts so reopening resumes coherently. A recovered answer or result opens its appropriate view without a new AI call. Moving backwards preserves edits and judgments. Editing a submitted prompt still requires a new generated answer and a new judgment before assessment, under existing rules.

Keep task requirements available from edit, answer and judgment screens. Comparison tabs never change which answer the judgment assesses. Preserve full answer formatting, draft judgments and answer reading positions. Moving to judgment must not hide the answer beyond reach; an expandable “Read the answer” control shows the exact answer on that screen.

### Corrections, recovery and earned celebration

Prompt correction returns to Edit with the actual feedback gap and the existing explanation field, then proceeds through revised answer, fresh judgment and feedback. Judgment-only correction returns to Your judgment with the unchanged answer, previous judgment, actual feedback gap and required explanation; it makes no generation request. Existing retry counts, worked-example availability, supported completion and onward destinations remain intact. Navigation alone never consumes attempts or creates points.

Keep waiting, error, allowance and save-pending states on the relevant screen. Use factual existing recovery messages and separate Retry assessment from Retry saving. Preserve the daily reset message, disabled request controls until reset and retained work. Show a waiting label adjacent to the disabled main action while generation or assessment is running. Assessment uncertainty does not become failure or success.

For a newly confirmed independent practice point, show “You earned 1 skill point!” with a yellow point shape and a short, approximately 700ms burst of small stars and dots. Use locally rendered shapes and CSS motion, not generated bitmap assets. Play once when the result becomes confirmed; do not replay on reopening, back navigation or an assessment retry, and never imply a second reward on replay. With reduced motion enabled, show the same static point and words. The onward button is immediately usable and never waits for animation.

A not-yet result says “One more useful change” followed by the actual gap. Supported completion retains explicit “No skill point” wording and receives no earned-point animation. Existing AI feedback is displayed as returned; playful interface wording never rewrites evaluator instructions, requirements or results, and never claims quiz readiness or proven learning.

### Scope and verification after approval

Apply the six-screen flow and new styling to the existing Beginner practices, including legacy saved invitation work and supported return practice. Final screens, content, hints, badges and behaviour retain their current implementation and visual treatment; scope practice CSS to prevent changes spilling into finals. No new levels, sign-in, answer editor or backend feature. Release must exclude the unrelated development-only learningAttempts addition unless separately authorized.

Scoring, points, attempts, daily request cap, model settings, AI instructions, ownership checks and all recovery/recheck rules remain unchanged. Never print or commit API keys or other credentials.

After implementation, check the existing rule tests, build and type checks, and inspect phone and desktop practice layouts. Exercise both correction paths, back navigation, reopening, save-only retry, allowance recovery and final isolation with suitable existing tests or prepared-response checks. Deploy using npm run deploy under the Convex static-hosting skill. Then play Beginner practice 1 with real generation and assessment on the public site at 390px, capture and paste screenshots of all six steps plus the earned-point celebration and report the release commit hash. If the unchanged daily allowance or actual assessment prevents completion, report the exact blocker without staging a fake pass or raising the cap.

Assumptions for approval: the redesign covers both existing Beginner practices; finals stay visually unchanged; no mascot or sound is needed; six screens can contain scrolling content; current mission material and all learning rules are preserved. Physical-phone verification remains separate from a 390px browser check.

Latest release, 5 October 2026: the builder explicitly authorized publishing the quiz mission. GitHub push and npm run deploy succeeded. Real production generation/assessment, one point on attempt one, reopening and Next challenge passed in Edge at 390px; legacy saved invitation state and desktop opening passed. Both deployments use Gemini 3.5 Flash-Lite with the existing 20-request daily allowance. The quiz mission is now published; other challenge material and billing are unchanged. This supersedes earlier unpublished/blocked statements below. Teacher content review, quantitative feedback reliability and physical-phone/mobile-data confirmation remain pending.

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

## Practice display polish, 5 October 2026

The builder authorized five display fixes and publication: readable Markdown and maths in practice answers; point, concise success sentence and onward action before collapsed assessment evidence; closer phone task/example/editor with generation directly below; the same starting order and a distinct learning cue in each practice; adjacent judgment-checking status and a skill-focused page description. These changes do not alter backend scoring, points, attempt limits, AI instructions, model settings, usage allowance or final challenges. Practice 2 retains Start final challenge as its existing onward action. Display conversion retains the original answer as the assessment input. Saved legacy invitation work retains its task.
