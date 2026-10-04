# Prompting Game: v1 build plan

Active requirements: PRODUCT.md and IDEA_SCOPE.md. These describe the game, not implemented features. Historical snapshots are in archive/openloops/.

## Build sequence

Follow PRODUCT.md section 10 in order. First prepare one teacher-reviewed challenge and test AI feedback without building the app; then pass the 12-submission reliability gate. Build one practice flow and its correction/explanation, retry recovery, Beginner final, sign-in and persistence. Expand to all levels only after that journey works; deploy and observe students.

## Screens and behavior

- Start: Beginner's first prepared practice, without mandatory account setup.
- Challenge: task requirements, editable weak prompt, original/generated answer comparison, and student answer judgment before feedback.
- Feedback: one specific gap, correction and short explanation, at most two practice retries, skill-point result and worked example after retries.
- Final: fresh reviewed task, no hints, submit prompt and judgment before assessment; recovery follows the alternate-variant rule.
- Progress: up to six practice points and three level badges; final passes unlock levels. Pro pass finishes the game.
- Account: offer sign-in after first feedback; preserve the guest attempt and save private cross-device progress with Convex Auth.

Use DESIGN.md for layout intentions. Never show mock generated answers or simulated assessment as real AI output. Nine primary challenges plus three reviewed alternate finals are needed. Teacher review is evidence to obtain, not something the coding agent can self-certify.

## Data and proof

Use Convex for backend generation, evaluation and saved progress. Record challenge versions, drafts, answers, judgments, corrections/explanations, attempts, feedback, point awards and final/badge results. Keep unique rewards and retry saves safe from duplicates. Do not reuse the retired scheduling tests as game evidence.

Run build and type checks after code changes, then exercise the relevant journey. Verify owner access, retries, failure preservation, sign-in migration, final hint restrictions, reward limits and reopening. Use the exact assessment criteria in PRODUCT.md section 6 before automated awards.

## Hosting and scope

Use Convex static hosting; npm run deploy publishes, Git push does not. Approved AI access and measured allowance must precede model-dependent releases. No paid upgrades or extra services are implied. No personal uploads, assignment builder, reminder system or extra game features.
