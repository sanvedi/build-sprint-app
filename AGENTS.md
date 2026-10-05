# AGENTS.md

Latest release, 5 October 2026: the builder explicitly authorized publishing the quiz mission. GitHub push and npm run deploy succeeded. Real production generation/assessment, one point on attempt one, reopening and Next challenge passed in Edge at 390px; legacy saved invitation state and desktop opening passed. Both deployments use Gemini 3.5 Flash-Lite with the existing 20-request daily allowance. The quiz mission is now published; other challenge material and billing are unchanged. This supersedes earlier unpublished/blocked statements below. Teacher content review, quantitative feedback reliability and physical-phone/mobile-data confirmation remain pending.

Project folder: C:\Users\LENOVO\build-sprint-app.

Final project instructions, updated 4 October 2026. This file describes the current build and the rules for further work; it does not claim the full three-level game is complete.

## 1. How the product works

Interface: a web page designed for a phone. Students edit a supplied weak prompt, inspect the AI answer and judge it against the task before receiving feedback.

Business logic: Convex generates the answer and assesses the student's prompt, answer judgment and correction explanation against prepared requirements. It records attempts and justified points, handles retries without duplicates, and permits one completed Challenge recheck of the same assessment without consuming an attempt. If AI still disagrees, the student continues normally.

Current build: The Beginner final and alternate are included following the builder's explicit Publish Final Assessment instruction. The earlier draft remains preserved at git tag unpublished-beginner-final. The current published build contains both Beginner practices, Next challenge from either completion route, separate points and initial-plus-two-retry allowances, both correction paths, worked examples, anonymous device saving, assessment recheck and recovery. The three-level game and account saving remain planned v1 work. Both practices now have a verified live browser journey at 390px: generation, judgment, feedback, prompt correction, judgment-only correction, justified points, Next challenge, assessment retry, save-only recovery, Challenge recheck and reopening. This proves working mechanics, not AI teaching reliability or physical-phone usability.

Database:

| Table | What it remembers |
| --- | --- |
| practiceSessions | Anonymous session token, challenge ID, assessed attempt count, earned point and latest assessment ID, separately per practice. Legacy rows without challenge ID belong to practice 1 and are preserved. |
| practiceJobs | Generation, assessment and recheck requests; challenge IDs, request IDs, submitted inputs, pending/done/failed state, results, challenged assessment ID and reviewed result. Original assessment remains retained. |
| learningAttempts | Approved 5 October 2026; development only until release confirmation. One immutable snapshot per assessed submission: first prompt/AI answer, submitted prompt/current AI answer, previous/current judgment, correction explanation and linked generation/assessment/previous attempt. Optional studentEditedAnswerText is reserved; no direct answer editor is built. |
| finalProgress | Anonymous token, seen final variants, current variant, Beginner badge decision and the supported practice required after failure. |
| practiceUsage | UTC day and reserved app request count across the deployment. |
| m0Checks | Historical setup-test records only, retained to avoid deleting existing data. Never product usage. |

Drafts, the current practice and recovery requests are also stored in the student's browser. This is device saving, not an account backup. Prepared challenge material is shared by the screen and backend in shared/practiceTasks.mjs; teacher review is still pending. Account tables will be added in their milestone; finalProgress records the Beginner final journey in development and production. The Convex agent component is installed; automatic chat history and message saving are disabled for these practice calls.

Third party:

- Google Gemini generates answers and feedback. GEMINI_API_KEY belongs in Convex environment variables. Development is configured and verified. Production generation, assessment and recheck now use gemini-3.5-flash-lite and passed the live journey. Gemini 3.8 Flash hit its free quota during testing; no paid upgrade or usage increase was made. Never ask for the key in chat.
- Convex supplies the database, backend and static hosting. Convex Auth is the approved future sign-in system. Local deployment configuration stays in ignored .env.local and CLI-managed credentials; no credentials are committed.
- GitHub stores the public code repository. Authentication stays in the local Git/GitHub credential tools, never source files.
- Fonts are bundled locally; no external font service or key is needed.

Not in v1: completing assignments or presentations, personal uploads, WhatsApp/Gmail access, reminders, payments, leaderboard, streaks, certificates and a teacher dashboard. Optional sign-in after first value IS in the approved v1; it is not built yet.

When I report a bug, I'll name the part. Look there first, find the cause, and tell me if I named the wrong part.

## 2. How we work

- First-mission implementation approved 5 October 2026: fresh Beginner practice 1 uses the quiz rescue mission in development. Untagged drafts/attempts belong to legacy-v1 invitation material; quiz-v1 is pinned to new sessions/jobs. Never reinterpret an old answer against the new task, reset old rewards or award a second first-practice point. Other challenges and final-return practice material remain intact. Actual mission feedback and builder phone confirmation are pending; this milestone has not changed production.

- Product direction approved 5 October 2026: make challenges small missions students want to solve, with improving the supplied prompt and judging the answer as the way to win. See PRODUCT.md and DESIGN.md. Exact mission content and screen changes remain to be agreed; this documentation decision does not authorize implementation, new game mechanics or deployment. Preserve existing learning, assessment, reward and recovery rules.

- Read IDEA_SCOPE.md, PRODUCT.md, PLAN.md and PROGRESS.md before anything else. Read DESIGN.md before screen work. Read M0_VERIFICATION.md when deciding what has actually been proved.
- Before building a new milestone or feature, explain in two or three plain sentences what I want and your plan. Wait for my yes. For an authorized bug fix, find the cause, fix it and check it without asking whether to start. Do not interpret a pasted template as approval to change the app.
- Work on one milestone at a time: the next one in PLAN.md, end to end. Nothing outside it.
- If I ask for something new mid-milestone, add it to the parked list in PLAN.md and carry on, unless I explicitly stop or replace the milestone.
- Never say done until you have seen it work through a relevant test or phone-width browser check and explained how I can check it on my phone. Distinguish my reported check from your own verification.
- For bugs, identify the cause before editing and fix only that cause.
- After I confirm a milestone works: record one factual line in PROGRESS.md, commit that record with the implementation, push, then deploy with npm run deploy. A missing production key or failed release check must be reported, not silently bypassed.
- Never put keys or passwords in code, VITE_ variables or committed files. Never print them in tool output or ask me to paste them into chat.
- Retry saving must never call AI again. A completed Challenge recheck must never consume another learning attempt or award a duplicate point.
- Talk in plain words. Explain a technical term when it first matters. Ask one question at a time, announce the next action briefly, and explain a skill or other new tool on first use.
- Choose technical implementation details yourself within the approved milestone; ask about product choices, cost changes and deletion.
- Use Codex, GitHub and Convex for code, database, backend, sign-in and hosting. Do not introduce another host, database or authentication service.
- Real people's chats, names and phone numbers must never enter the public repo, including tests. Use made-up examples and synthetic submissions.
- Keep reported classroom evidence separate from proven learning, model reliability and app usage.
- Match my energy and use plain words. If a technical term is needed, explain it in the same sentence. Never talk down to me.
- Ask one question at a time, with concrete choices. Say what you are about to do in one line; explain a new skill, command or agent on first use.
- Complete authorized work end to end and check the result. Choose routine technical details yourself; ask about product choices, costs and deletion.
- When a command fails, read the error, correct the cause and retry. If the same failure repeats twice, explain the blocker instead of repeating it indefinitely.
- If I type explain that like I have only used ChatGPT, rewrite the explanation in everyday words.
- End with one useful next step. Do not start another milestone without its required approval.

## 3. Shipping

Live address: https://combative-jaguar-50.convex.site . Both Beginner practices and the final/alternate are published there. The complete published two-practice journey, both correction paths, assessment/save recovery, recheck and reopening passed real 390px Edge browser checks. Physical-phone/mobile-data checks and the full three-level game remain separate pending work.

Repo: https://github.com/sanvedi/build-sprint-app , public (verified with GitHub CLI).

Deploy: npm run deploy. A push does not deploy. After I confirm a milestone works: record progress, commit, push, then deploy. Follow the Convex static-hosting skill for release work and check the live flow afterward.

Keys: GEMINI_API_KEY must be in Convex environment variables for development and production separately. Required settings are PROMPT_GAME_MODEL and PROMPT_GAME_AI_ENABLED; optional PROMPT_GAME_GENERATION_MODEL overrides only answer generation; PROMPT_GAME_DAILY_CALL_LIMIT controls the current app allowance. Development uses trustworthy-warthog-680. Production settings and successful generation, assessment and recheck are verified. Current main must match the deployed practices plus Beginner final. Do not publish Amateur or Pro during unrelated fixes. Never copy secrets into files or assume development settings carry over.

.gitignore covers .env.local, .env and .env.*. Do not change that to track secrets.

Every usage limit, submission ownership check, attempt limit, point decision and recheck permission must be enforced in Convex, not only in the interface. Before public release, review authentication/privacy and the approved feedback reliability gate.

Before I share the link: I open the published site on my phone, logged out, on mobile data, and complete the core flow once. Development Wi-Fi previews are not proof of the public release.

Final publication: the builder explicitly authorized publishing the Beginner final on 4 October 2026. PROMPT_GAME_FINALS_ENABLED is true in development and production. Teacher material review and quantitative feedback-test evidence remain unrecorded; publication does not imply this reliability gate passed. Final passes do not add practice points. Seen variants must be recorded in Convex before displaying the task; reopening resumes rather than treating it as unseen.
