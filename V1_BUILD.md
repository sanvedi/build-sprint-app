# Prompting Game: v1 build plan

Active requirements: PRODUCT.md and IDEA_SCOPE.md. These describe the game, not implemented features. Historical snapshots are in archive/openloops/.

## Build sequence

Follow PRODUCT.md section 10 in order. First prepare one teacher-reviewed challenge and test AI feedback without building the app; then pass the 12-submission reliability gate. Build one practice flow and its correction/explanation, retry recovery, Beginner final, sign-in and persistence. Expand to all levels only after that journey works; deploy and observe students.

## Pages and stages

- Practice challenge page: starts directly in Beginner practice 1 without mandatory sign-in. Editing, answer comparison, judgment, feedback, both correction paths, practice results and worked examples are stages on this same page. Keep the requirements and student work together.
- Final challenge page: fresh reviewed task with no hints, followed by generation, judgment, assessment and badge/result stages on the same page. A passed Beginner or Amateur final offers Start next level; Pro offers Review my challenges.
- Account sign-in: separate flow opened by a secondary saving offer after first feedback. Retain guest work and return to the exact challenge and stage. Preserve both guest and account histories, handle conflicting drafts and retry saving without generation or reassessment.
- Shared components: progress strip, points, badges and recovery messages. They do not require additional pages.

One main action per stage: generation before an answer exists; judgment/assessment after it appears; the appropriate onward action after a saved result. Once a final answer is ready, Generate answer is hidden or secondary and Submit final is primary. Save my progress stays secondary on a challenge and becomes primary only after its flow is opened. Retry saving saves the existing assessed result; Retry assessment is reserved for missing/unavailable assessment.

Use DESIGN.md for exact stage contents, correction targets, mobile answer tabs and action wording. Never show mock generated answers or simulated assessment as real AI output. Nine primary challenges plus three reviewed alternate finals are needed. Teacher review is evidence to obtain, not something the coding agent can self-certify.

## Data and proof

Use Convex for backend generation, evaluation and saved progress. Record challenge versions, drafts, answers, judgments, corrections/explanations, attempts, feedback, point awards and final/badge results. Keep unique rewards and retry saves safe from duplicates. Do not reuse the retired scheduling tests as game evidence.

Run build and type checks after code changes, then exercise the relevant journey. Verify owner access, retries, failure preservation, sign-in migration, final hint restrictions, reward limits and reopening. Use the exact assessment criteria in PRODUCT.md section 6 before automated awards.

## Hosting and scope

Use Convex static hosting; npm run deploy publishes, Git push does not. Approved AI access and measured allowance must precede model-dependent releases. No paid upgrades or extra services are implied. No personal uploads, assignment builder, reminder system or extra game features.
