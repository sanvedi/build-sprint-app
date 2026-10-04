# PROGRESS.md

Keep one factual line per completed or builder-confirmed step. Distinguish development, public release, automated proof and builder reports. Details live in M0_VERIFICATION.md; this is not a claim that the whole v1 or feedback gate has passed.

- 2026-10-04: First Beginner practice, correction paths, retries and save recovery implemented in development; real Gemini generation and assessment verified.
- 2026-10-04: Text raised to at least 16px and tap targets to at least 44 by 44 CSS pixels; Edge checks at 390px passed without horizontal overflow.
- 2026-10-04: Challenge recheck, interrupted-request/pending-save recovery and 20 development state previews implemented; live Gemini recheck/replay, 22 automated checks, build and type checks passed.
- 2026-10-04: Builder reported the phone check complete; no detailed physical-phone observations were supplied. Current changes are committed locally; the game has not been published.
- 2026-10-04: AGENTS.md completed from current implementation and approved product rules; PLAN.md and this progress log added. Beginner practice 2 is proposed and awaits approval before code.
- 2026-10-04: Builder confirmed Next challenge opened practice 2 on their phone; 31 automated checks and prepared-response browser flows passed. Live second-practice assessment remains quota-blocked, and publishing is blocked by missing production Gemini settings.

- 2026-10-04: Published both Beginner practices at combative-jaguar-50.convex.site. Production settings and 390px page/connection/reopening checks passed; live generation remains blocked by Gemini's free daily quota, so the live core flow is not yet verified.

- 2026-10-04: Builder reported the published game works. No detailed generation, assessment, replay or mobile-data observations were supplied; previous automated quota-failure evidence remains historical.

- 2026-10-04: Final AGENTS.md updated with current published-build facts, the builder's live confirmation, working rules, secret handling and AI limits; live page returned HTTP 200.

- 2026-10-04: Fixed live Beginner answer generation after Gemini 3.8 Flash exhausted its free request quota. Generation alone now uses the production setting PROMPT_GAME_GENERATION_MODEL=gemini-3.5-flash-lite; assessment, game rules and screens unchanged. Deployed only the existing live release plus this fix with npm run deploy. Verified by clicking Generate answer in Edge at 390px and reading its real answer; release tests 33/33 and typecheck passed. No API key printed or committed.
