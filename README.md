# Prompting Game

Students edit weak prompts, compare AI answers, explain corrections and complete fresh challenges without hints. Both Beginner practices are implemented with separate progress, device recovery and phone-width browser checks. Live Gemini generation passed for practice 2; its live assessment check was blocked by the free daily quota. Both practices are published; the live page and production connection are checked, but live AI use is blocked by Gemini's exhausted free daily quota. The full game and account backup remain incomplete.

- PRODUCT.md: learning flow and game rules.
- IDEA_SCOPE.md: active scope, milestones and proof.
- PLAN.md: current milestone, next milestone and parked requests.
- PROGRESS.md: factual completion log.
- AGENTS.md: project facts, working rules, AI limits and shipping instructions.
- V1_BUILD.md: overall v1 build sequence.
- DESIGN.md: interface intentions.
- M0_VERIFICATION.md: feedback tests and evidence boundaries.
- archive/openloops/: retired material, not active instructions.

## Commands

npm install installs dependencies. npm run dev starts the practice page. npm run build builds it. npm run typecheck checks Convex code.

npm run deploy publishes backend and static files through Convex static hosting. Git push does not deploy. Existing hosting address: https://combative-jaguar-50.convex.site; the game page and production connection are verified there; successful live AI use is still quota-blocked. Local changes do not update that site until deployed.

Convex CLI sign-in and local deployment configuration are required. Credentials stay outside Git. The builder reports running the feedback test, but its tested service/model and results are not yet recorded. The generation adapter uses the Convex agent component and Google provider, with GEMINI_API_KEY stored in development Convex settings. Live generation, assessment and recheck passed. The numerical teacher-feedback gate remains unverified. Production settings are present; successful live AI use remains quota-blocked. No paid upgrade is assumed.

The retired scheduling command is removed. Existing historical test rows are preserved but never count as game usage.

## Verification

npm test runs focused state, assessment-rule, Convex mutation and screen-interaction checks. Backend tests use a local test database; UI tests use prepared responses, not live AI. M0_VERIFICATION.md records the evidence and limitations. Practice 1 opens practice 2 after a point or supported completion. Independent finals, remaining levels and account backup are not represented as available.


## Beginner final development milestone

The hint-free Beginner final, alternate, badge and supported-practice return are implemented and checked in development: 40 automated tests, desktop/390px browser journeys and 34 credit-free phone previews passed. No real Gemini final assessment success or teacher reliability approval is claimed. PROMPT_GAME_FINALS_ENABLED is enabled on development only. Public automatic final awards stay disabled until reviewed content and feedback-test evidence are recorded. The published site still contains the confirmed two-practice release. See PHONE_STATES.md for the new preview links.
