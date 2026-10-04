# Prompting Game

Students edit weak prompts, compare AI answers, explain corrections and complete fresh challenges without hints. The game is specified, not implemented; index.html is an honest setup page.

- PRODUCT.md: learning flow and game rules.
- IDEA_SCOPE.md: active scope, milestones and proof.
- V1_BUILD.md: build sequence.
- DESIGN.md: interface intentions.
- M0_VERIFICATION.md: feedback tests and evidence boundaries.
- archive/openloops/: retired material, not active instructions.

## Commands

npm install installs dependencies. npm run dev starts the local setup page. npm run build builds it. npm run typecheck checks Convex code.

npm run deploy publishes backend and static files through Convex static hosting. Git push does not deploy. Existing hosting address: https://combative-jaguar-50.convex.site; no game is verified there. Local changes do not update that site until deployed.

Convex CLI sign-in and local deployment configuration are required. Credentials stay outside Git. No AI provider is selected or verified. Begin with the smallest teacher-checked feedback test before implementing automatic awards.

The retired scheduling command is removed. Existing historical test rows are preserved but never count as game usage.
