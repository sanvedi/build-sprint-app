# PLAN.md

PRODUCT.md owns product rules; DESIGN.md owns screens and approved words. This file gives the current implementation order. Historical OpenLoops plans do not apply.

## Current position

Both Beginner practices and their recovery/recheck states are implemented and published. The builder confirmed phone navigation and subsequently reported that the live game works; the exact live steps were not supplied. The full three-level game is not built. Feedback testing was reported complete, but the teacher labels and quantitative gate results remain unavailable; do not claim verified gate acceptance. See M0_VERIFICATION.md.

## Completed implementation milestone: Beginner practice 2 and onward navigation

Status: implemented and published after the builder's Go ahead. The builder subsequently reported the live game works; this is a builder report, not a new automated AI/replay verification. Builder confirmed Next challenge opened practice 2 on their phone. Successful live second-practice assessment still awaits Gemini's quota reset. Production settings are now present and the game is published at https://combative-jaguar-50.convex.site. The live page and recovery passed phone-width checks, but live generation is quota-blocked, so the live core flow is not yet verified.

I can finish practice 1, choose Next challenge and complete a second prepared Beginner practice with its own task, requirements, supplied prompt and reviewed example.

I can earn at most one point per practice, use the initial attempt plus two retries independently, challenge each assessment once, and keep the exact answer/judgment binding through either correction path.

I can close and reopen without losing which practice I reached, its confirmed work or either point. Progress is separate per challenge; existing practice-1 records are preserved.

I can reach the second practice from both independent success and completed-with-help. No independent final, badge or next-level unlock is claimed in this milestone.

Proof: focused checks for per-challenge attempt/point isolation, navigation without duplicate awards, both completion routes and reopening; browser walk at 390px; instructions for the builder's phone check. Challenge content needs teacher review before release; do not invent that review.

Evidence: 31 automated checks passed, including actual Convex mutations in a local test database. Edge walks at 390px and 1280px reached practice 2 from both completion routes, retained drafts/results after reload and retained separate points. All 24 development previews passed phone-width text/target/overflow checks without backend calls. Live Gemini generated the second task correctly; assessment was blocked by the provider's free-tier quota, with zero second-practice attempts consumed and the first point retained. See M0_VERIFICATION.md and PHONE_STATES.md.

## Next milestone: Beginner final and badge

Implemented in development after the builder said Lets build it. The hint-free final and alternate, badge, supported-practice return, fresh-variant restrictions, recheck and saving recovery are built. Awaiting the builder's phone confirmation. Public final awards remain disabled pending reviewed content and recorded feedback-gate evidence.

Evidence: 40 automated checks; prepared-response Edge pass/fail journeys at 390px and 1280px; 34 credit-free state previews without undersized text, tap targets or overflow; successful development schema/function push and a real final-access rejection before any AI call. No successful real Gemini final assessment or teacher reliability result is claimed. Development alone has PROMPT_GAME_FINALS_ENABLED=true; production has not been changed for this milestone.

## Remaining milestones, in order

1. I can complete Beginner's fresh final without hints, earn its badge on a justified pass, or return to practice and take the unseen reviewed alternate after failure. Feedback-gate evidence must be recorded before public automatic level awards.
2. I can choose optional Convex sign-in after first value and recover guest plus account progress safely, including conflicts, failed saves and reopening on another device.
3. I can complete Amateur and Pro with two practices and a final each, reviewed alternate finals, independent badges and truthful game completion.
4. I can complete the published core journey on a phone, logged out and on mobile data, and record student observations separately from model/test evidence.

After each builder-confirmed milestone: update PROGRESS.md, commit, push and deploy under AGENTS.md. Verify production settings and the live journey before calling it published/working. Never describe a partial Beginner release as the agreed complete three-level v1.

## Release decisions still open

- Teacher-label/evaluator evidence for the reported feedback test and its relationship to the Gemini evaluator.
- Production Gemini key/settings are present; live requests reach the production backend, but successful live AI use awaits the provider quota reset.
- Monthly AI budget and provider spend-cap setting: not chosen or verified.
- Thinking setting: currently provider default; no approved low/off change.
- Daily/hourly usage policy for public use: current development allowance is 20 reserved app requests per UTC day. An hourly limiter and exact provider-call accounting are not implemented.

These are recorded gaps, not approval to upgrade, change billing, silently relax the gate or raise usage.

## Parked requests

None added during the current milestone. Existing out-of-v1 ideas remain excluded by PRODUCT.md: uploads, assignment/presentation generation, message monitoring, payments, leaderboard, streaks, certificates and teacher dashboard.
