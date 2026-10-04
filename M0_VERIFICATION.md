# Prompting Game: M0 verification

Updated 4 October 2026. Status: feedback reliability not yet verified.

## Evidence boundaries

The builder reported 10 classroom participants: eight improved from 0 to 2, two from 0 to 1, with final independent completion. Exact scoring criteria and task comparability are unavailable. This is not game usage or proof of automated teaching reliability.

DP asked AI to write a prompt after resisting a request for context; the result was still incomplete and did not give the intended answer. Exact missing information is unknown.

Previous setup, scheduling and service audit evidence is retained in archive/openloops/ and is not proof for this game.

## Required checks, all pending

1. Prepare one Beginner task, requirements, reference facts and teacher-reviewed examples. Establish approved AI access and measured cost.
2. Check feedback on the student's prompt, judgment, correction and explanation before building the app.
3. Prepare 12 teacher-labelled submissions across the levels, including lucky answers, poor answers, copied explanations and attempted scoring-rule overrides.
4. Run two assessments: each needs at least 10/12 agreement for both final decisions and point eligibility, identical decisions across runs and zero critical errors. Follow PRODUCT.md section 6 exactly.
5. Repeat generation for lucky/poor examples without treating one output as causal proof.

Record inputs, teacher labels, model/version, instructions, output, decisions, disagreements and cost. No secret keys in evidence. If the gate fails, revise and rerun; on a second failure use an explicitly teacher-reviewed experiment rather than claim automated rewards work.

## Pivot setup checks, 4 October 2026

- npm run build and npm run typecheck passed after retiring the reminder test.
- npx convex dev --once successfully updated the existing development deployment; production was not deployed. Historical test rows and their schema were preserved.
- Local Vite setup page returned HTTP 200 with the prompting-game heading and truthful unavailable-feature wording. The UI detector reported no findings.
- Visual browser check was blocked by automatic approval review; no screenshot or browser verification is claimed. These checks verify the scaffold, not AI feedback, authentication or gameplay.

## Prepared first-implementation materials

- learning/beginner-01.md contains a prepared Beginner challenge and both correction paths; teacher review is pending.
- learning/feedback-review.md contains 12 synthetic review cases across the three difficulties, with a blank teacher-label table. No AI outputs or passing reliability result are claimed.
- No model key/provider was found in the local project configuration or relevant process environment. Remote AI access has not been verified. No new service was installed.
- Full student-flow implementation and browser evidence remain pending the feedback gate and provider access.

## First practice implementation

Builder report: the feedback test has been run and the builder instructed implementation to proceed. Scores, disagreements, tested service/model and evaluator instructions have not yet been supplied. Do not record numerical gate acceptance or claim these new instructions match the tested evaluator.

Implemented: first Beginner practice page, prefilled prompt, task requirements, desktop comparison and phone answer tabs, judgment before feedback, both correction paths, two retries and supported example, device-only saving and save-only recovery. Points are capped per challenge. React and Nunito Sans are bundled locally.

Convex development deployment updated with the agent component and real generation/assessment actions, stored jobs for retry-safe results, and a bounded global daily call allowance. Historical test records remain intact. AI is disabled unless PROMPT_GAME_MODEL and PROMPT_GAME_AI_ENABLED are explicitly configured. The prepared adapter uses Convex's gateway, which requires compatible access; no paid upgrade or model usage has been enabled. If the tested provider requires another adapter, align it with the tested service before enabling requests.

Evidence:

- 15 automated checks passed: assessment rules, answer-target binding, both UI correction paths, two retries, first-attempt point, failed generation, same-result save retry and judgment preservation while switching long answers.
- UI tests use prepared API responses in a simulated document environment. They do not prove real AI quality, physical phone layout or an onscreen keyboard.
- Build, Convex type check and development push passed. The UI detector reported no findings.
- A real development call without configured AI returned AI_UNAVAILABLE. No generated answer, point or success was fabricated for that check.
- No production deployment, real AI generation, account sign-in, three-student comprehension result or browser visual verification is claimed.

Remaining: identify the tested service/model, obtain authorized access and verify the evaluator against the teacher-labelled results. Then walk the real flow on desktop and phone, including long answers and keyboard, run the comprehension check, and implement the remaining challenges/account backup.


## Live Gemini connection check

After the builder saved the Gemini key in development settings, real generation and assessment passed through Convex using gemini-3.8-flash. A valid initial attempt earned one point. Repeating the same assessment returned the identical stored result without another model call. Fixed the agent session identity requirement and made success explanations/evidence explicit. Build, typecheck and all 15 automated tests passed. Google intermittently rejected requests because of high demand; this is not a classroom reliability or full feedback-gate pass. No browser/phone check or production publish was performed.


## 390px accessibility fixes

Raised supporting text from 14px to 16px and expanded the seven short links/disclosure targets to at least 44 by 44 CSS pixels. Edge browser emulation at 390 by 844 covered 28 state captures using prepared responses: no text below 16px, no tappable targets below 44 by 44, and no horizontal overflow. Text contrast pairs are unchanged; the lowest ratio is 6.56:1. Build and 15 automated tests passed; the design detector returned no findings. No production publish or physical-phone/keyboard verification.


## Challenge and state coverage

The builder selected Challenge ? AI recheck ? continue if AI still disagrees. Implemented one completed recheck per assessment, retained original plus reviewed decisions, immutable submission binding, latest-assessment checks, shared usage limits, and no extra learning attempt. Live Gemini generation, assessment, recheck and replay passed in development: database inspection confirmed one learning attempt, one point and one recheck job. An additional recheck request returned the existing review without a model call.

Expanded existing practice state messages using approved DESIGN.md copy; added durable request IDs, checked-result recovery and read-only submitted work. 22 automated tests cover both correction paths, unchanged/changed rechecks, failed-recheck retry, mount recovery without duplicate requests, and reopening a pending save without another AI request. 20 development-only phone previews passed Edge checks at 390 ? 844 with no AI requests, undersized text/targets or overflow. The phone guide explains each state. Physical-phone keyboard verification, the full teacher feedback gate, extra practices/finals and account saving remain pending. No production publish.


## Second Beginner practice and onward navigation, 4 October 2026

Implemented after the builder's Go ahead: a shared synthetic task catalog, second practice, Next challenge after a point or completed-with-help, per-practice attempts and points, review without duplicate rewards, current-practice persistence and challenge-specific pending/request recovery. Existing browser keys and backend rows for practice 1 remain usable; missing backend challenge IDs are interpreted as beginner-01. Convex enforces practice-2 access and prevents cross-practice correction/recheck bindings.

Evidence:

- 31 automated checks passed. Four execute registered Convex mutations and indexes through convex-test's local database: locked access without reserving usage, preserved legacy progress, independent attempts/points, supported unlock and recheck isolation. UI checks cover both onward routes, second-practice drafts and points, pending-save blocking and onward-save recovery.
- Edge walks at 390 by 844 and 1280 by 900 used prepared API responses. Both completion routes opened practice 2; editing/reloading retained its draft, completing/reloading retained the expected total, and reviewing/returning made no extra requests or awards.
- All 24 development-only previews passed 390px checks: visible text at least 16px, tappable controls at least 44 by 44, no horizontal overflow and no backend calls. No physical-phone keyboard or student comprehension result is claimed.
- Build, Convex typecheck, schema/index push to the existing development deployment and the design detector passed.
- Live Gemini generated the second task's three-step PDF submission instructions using the correct requirements. Its assessment then failed because Google's free-tier generate-content daily limit of 20 was exhausted; the SDK reported three automatic attempts. Database inspection confirmed second practice stayed at zero learning attempts and no point, while practice 1 retained its one attempt and earned point. No second-practice live assessment success or replay result is claimed. No billing change, quota increase or production publish occurred.

Remaining for this milestone: successful live second-practice assessment/replay after provider quota resets, builder phone confirmation, and teacher review of prepared material before release. The local/browser checks prove mechanics, not AI teaching reliability or lasting student learning.


## First game publication, 4 October 2026

The builder saved Gemini settings in production after correcting an initial Development-only setup. All four required variable names are present; the nonsecret model is gemini-3.8-flash and AI is enabled. The key was not printed or copied into files.

npm run deploy published the backend and nine static assets at https://combative-jaguar-50.convex.site. The hosting build injected the production backend address; Vite now prioritizes that public address over local development configuration.

A fresh Edge session at 390 by 844 loaded the first practice, sent its real generation request to combative-jaguar-50.convex.cloud, showed the approved failure state, retained the edited prompt on reload and had no horizontal overflow. Production logs confirmed Google's free-tier daily generate-content quota of 20 was exhausted after SDK retries. No learning attempt or successful live AI answer is claimed. Screenshot is a local temporary artifact, not committed student data.

Publication is complete; a working live core journey remains unverified until provider quota resets. Physical-phone testing logged out on mobile data, teacher material review, recorded feedback-gate evidence, finals, other levels and account saving remain pending. No paid upgrade or usage increase occurred.


Builder follow-up: the builder reported Works after receiving the published link. Record this as confirmation from the builder; no specific AI output, assessment/replay, phone network or observed steps were provided. The earlier automated quota-failure result is retained as historical evidence, not treated as proof that calls are still failing.


## Beginner final implementation, 4 October 2026

The builder authorized the next milestone with Lets build it. Implemented a hint-free final and alternate, separate badge/pass state, server-recorded seen variants, one evaluated attempt per variant, supported practice after failure, no additional practice points, exhausted-variant lock, recheck without another attempt, and save-only recovery. Supported replay retains all assessed jobs; old rechecks cannot complete a new replay. Amateur remains future work; a Beginner pass shows its availability without a nonworking start button.

40 automated checks passed. Backend checks execute registered Convex functions and indexes in a local test database. UI checks use prepared responses and cover hidden examples, independent point totals, practice return/alternate, pending badge saving and exact final retry after failure. Edge walks at 390 by 844 and 1280 by 844 exercised passing, failing, supported practice, the alternate, exhaustion, draft reopening and saved badge reopening. All 34 development previews passed 390px font/target/overflow checks with no backend calls. Build, typecheck and the design detector passed.

Development functions/schema were pushed cleanly, and the real openFinal endpoint rejected an incomplete anonymous session before reserving an AI request. PROMPT_GAME_FINALS_ENABLED=true is set only on development. Production and its published two-practice release are unchanged. No Gemini final-generation/assessment success, teacher material approval, quantitative feedback-gate result or physical-phone observation is claimed. See learning/beginner-final.md and PHONE_STATES.md.


## Published practice journey verified, 4 October 2026

The builder authorized completing the live main flow. Real Edge browser checks at 390 by 844 used the public URL and synthetic submissions; no AI response was replaced with a prepared response. Production generation used gemini-3.5-flash-lite. The first assessment worked on gemini-3.8-flash, but correction assessment exhausted that model's free-tier request quota. Changed only production PROMPT_GAME_MODEL to gemini-3.5-flash-lite; assessment instructions, game rules, screens and the 20-reserved-request daily cap are unchanged. Development settings and production final availability are unchanged. No API key was printed, copied into a file or committed; no paid upgrade was enabled.

Verified on the live site:

- A vague initial prompt with a useful answer received prompt-gap feedback rather than a lucky-answer point.
- Editing that prompt and explaining the change generated a new answer, required a new judgment, and earned exactly one point on attempt two.
- Next challenge opened practice 2. A complete request generated three PDF-submission steps; accurate judgment earned its own point on attempt one. The displayed total was 2 / 6.
- Reload retained practice 2, both points and both attempt counts without another AI action. No horizontal overflow was detected.
- A separate complete prompt with an incorrect judgment received judgment-route feedback. Correcting the judgment and explanation kept the same generated answer and earned one point; no second generation occurred.
- A deliberately blocked browser assessment request showed the real failure state, held the submitted judgment read-only and used zero learning attempts. Retry sent the identical payload and request ID to the real service and succeeded.
- A deliberately failed browser-storage write held the real successful assessment pending with no displayed point or Next challenge. Retry saving retained the existing result and made no AI action.
- Challenge rechecked the real corrected submission once, retained two attempts and one point, removed the completed Challenge action, and survived reload.

Network and storage faults were deliberately introduced in the browser to exercise recovery; the successful generation, assessment and recheck responses were real Gemini responses. Screenshot is a local temporary artifact. These checks establish the published practice mechanics, not a teacher reliability gate, lasting learning, physical-phone keyboard/mobile-data observations, account backup or a complete three-level game. Final screens remain unpublished.
