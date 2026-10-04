# Prompting Game

Students edit weak prompts, compare AI answers, explain corrections and complete fresh challenges without hints. The first Beginner practice is implemented and verified in development with Gemini, device recovery and phone-width browser checks. The full game, account backup and public release remain incomplete.

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

npm install installs dependencies. npm run dev starts the first practice page. npm run build builds it. npm run typecheck checks Convex code.

npm run deploy publishes backend and static files through Convex static hosting. Git push does not deploy. Existing hosting address: https://combative-jaguar-50.convex.site; no game is verified there. Local changes do not update that site until deployed.

Convex CLI sign-in and local deployment configuration are required. Credentials stay outside Git. The builder reports running the feedback test, but its tested service/model and results are not yet recorded. The generation adapter uses the Convex agent component and Google provider, with GEMINI_API_KEY stored in development Convex settings. Live generation, assessment and recheck passed. The numerical teacher-feedback gate and production configuration are not verified. No paid upgrade is assumed.

The retired scheduling command is removed. Existing historical test rows are preserved but never count as game usage.

## Verification

npm test runs focused state, assessment-rule and screen-interaction checks. UI tests use prepared responses, not live AI. M0_VERIFICATION.md records the evidence and limitations. The first practice stops at its own completion; remaining challenges and account backup are not represented as available.
