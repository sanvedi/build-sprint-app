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
