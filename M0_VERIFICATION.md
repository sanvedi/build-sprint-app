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
