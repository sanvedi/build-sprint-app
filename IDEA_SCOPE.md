# IDEA_SCOPE.md

Latest verification, 5 October 2026: the builder authorized development Gemini 3.5 Flash-Lite. Real quiz generation, gap feedback, correction, one justified point on attempt two, reopening and Next challenge passed in Edge at 390px. Separated answer generation from grading instructions after detecting premature feedback; 49 checks, build, typecheck and development push passed. The 20-request daily allowance, billing and production are unchanged. This supersedes earlier real-AI-blocked statements below; physical-phone confirmation, teacher review, quantitative feedback reliability evidence and quiz publication remain pending.

## Active first-mission implementation, 5 October 2026

The builder approved improving Beginner practice 1 around rescuing an unhelpful answer. The working problem is identifying missing information and making a useful correction when rewriting feels like extra work; see PRODUCT.md. The quiz mission is implemented in development; old invitation drafts and assessments retain their material version. Other challenges and all reward/recovery rules remain intact.

Prepared-response phone/desktop journeys passed; real Gemini generation failed twice. Next: verify actual mission generation/assessment when available and obtain builder phone confirmation before release. Teacher review and the quantitative reliability gate remain pending. This supersedes earlier pending-approval statements for this first-mission build only.

## Approved refinement, 5 October 2026

Start with more interesting tasks: students solve small missions, with improving the supplied prompt and checking the answer as the way to succeed. PRODUCT.md records this approved direction. Each mission needs a concrete situation, a meaningful goal and a checkable outcome, while preserving prepared requirements and existing learning/reward rules.

This is a documentation decision, not a completed feature or student validation. Exact missions and screen changes need agreement before implementation. No reduced-typing flow, additional game mechanics or expanded v1 scope is approved. The next product discussion is one Beginner mission example before applying the direction across challenges.

This is the active build scope for the prompting game. PRODUCT.md owns the product behavior; this file translates it into implementation boundaries and proof. Retired material in archive/openloops/ must not govern the build. If these two active documents conflict, follow PRODUCT.md and resolve the mismatch before implementing it.

## 0. Scope status

| Field | Status |
| --- | --- |
| Event | GrowthX Build Sprint, Season 04 |
| Product | Prompting Game, working name |
| Last updated | 4 October 2026 |
| Submission deadline | 17 October 2026, 11 AM IST; target 9 AM |
| Current milestone | Beginner final and alternate published by explicit builder instruction; real final AI assessment and reliability evidence pending |
| Product state | Both practices and Beginner final published; full game pending |
| Existing hosting address | https://combative-jaguar-50.convex.site; published Beginner practice page; live success reported by builder |
| Repository | https://github.com/sanvedi/build-sprint-app |

Specified means described; implemented means code exists; working locally means the journey was exercised locally; live means exercised at the public URL; verified means the required checks passed. Do not claim game usage from old setup checks.

## 1. Idea and boundaries

Students improve weak prompts in short challenges, compare answers, correct their reasoning after feedback, and demonstrate understanding on fresh challenges without hints. AI generates answers to actual student edits and assesses task-specific reasoning.

Build for the student in DP's situation. The teacher reviews challenge material and assessment examples; there is no teacher-facing product in v1. A general assistant can also coach prompting. The proposed distinction is reviewed practice, independent final checks and saved progression; superiority is unproven.

The user explicitly agreed the three levels, two practice challenges plus one fresh final per level, editing supplied prompts, two practice retries, worked examples, hint-free finals and passing based on prompt quality plus answer judgment. Defaults recorded in PRODUCT.md govern onboarding, saving, rewards and recovery. They are chosen defaults, not invented student evidence.

## 2. User, job and evidence

When AI asks me for more context and I do not want to start again, I want to know the smallest useful change to my request, so I can get a useful answer with less wasted effort.

This is the existing draft job sentence, not DP's own words or a confirmed student quote.

Other moments it happens: not yet established.

Who, by situation: a student using AI for coursework who cannot get the intended result and is reluctant to supply context or write another prompt.

Today they hire: their existing AI tool, including asking it to write a prompt for them. The builder reports that DP became disappointed when asked for context, did not want to write a new prompt, and asked AI to write one instead. That did not produce the wanted answer because the resulting prompt was still incomplete. The original task, missing details and exact outputs have not been supplied.

The one we serve first: the student in DP's situation. DP is an alias for a participant in the classroom exercise. There is no separate teacher-facing product in the first release.

What needs doing: identify the information needed for the task, express it in the request, and judge whether the answer meets the requirements. This is the product's proposed response, not a reported statement from DP.

How they want to feel and look to others: not established. No institutional buyer or payer is confirmed.

Why this builder: access to students in class and direct observation of difficulty getting useful AI results. The presentation assignment motivates the idea; creating presentations or completing assignments is outside the product.

The outcome to investigate is fewer wasted attempts on students' own work. In-game completion does not establish that wider outcome.

Known path for DP: asked to provide context -> disappointed -> unwilling to write a new prompt -> asked AI to write the prompt -> still did not get the intended answer because that prompt was incomplete. The exact missing information is unknown.

Broader builder observation: students enter brief questions or irrelevant detail, then sometimes copy the first answer without checking it. This is not a recorded individual journey for DP.

Known resistance: rewriting feels unwelcome to DP. Approved response: edit an existing prompt rather than start with a blank box.

Assumed pull: a short challenge and visible answer comparison make one useful edit feel worthwhile. Product response: show value in the first challenge, with no account or level-selection requirement beforehand.

Assumed anxiety: students may not know what context matters or may distrust another AI's advice. Product response: show task requirements, give specific explanations, and acknowledge unreliable answers rather than insist AI is right.

Possible habit: copying or guessing is faster in the moment. Product response: keep practice focused and immediately connect edits to results. These explanations are hypotheses, not invented student quotes. Observe whether students voluntarily pause their work to practise.

The builder reported 10 participants: all started at 0; eight reached a final score of 2 and two reached 1. The builder confirmed independent completion of the final task without coaching.

The suggested exercise used an initial task, practice and a fresh final task. Exact prompts, individual submissions, scoring criteria, task comparability and adherence to every suggested step have not been recorded. The exercise date was not supplied; the report was recorded on 4 October 2026.

This records higher final scores and reported independent completion. It does not establish transferable learning, causation, lasting improvement, reliable automated feedback, return use, payment willingness or a working app. No comparison group was reported. Participants are not product signups.

DP's reported reluctance is evidence of resistance, not evidence that the proposed game overcame it.

## 3. Product contract

DP did not want to write a new prompt when asked to provide context. The game starts with an editable weak prompt, so the student can improve what is already there. Whether this makes DP willing to practise remains untested.

### Practice: demonstrate understanding after feedback

1. The student reads a prepared task, its essential requirements, a weak prompt and one example answer.
2. They edit the prompt, receive an AI answer, and explain whether that answer meets the task before seeing feedback.
3. Feedback identifies a specific gap in their prompt or answer judgment and explains why it matters.
4. After reading feedback, the student edits the prompt to address that gap and briefly explains what they changed and why. If the gap was in their judgment rather than their prompt, they correct their judgment instead of adding unnecessary prompt text.
5. When the prompt changes, generate a new answer. The student checks it against the task and identifies what improved, what still falls short and what needs verification. When only their judgment changes, they reassess the existing answer; no new generation is required.
6. Assess the student's correction and explanation against the identified gap. Repeating the feedback or clicking Next does not demonstrate understanding. Record whether they addressed the gap and correctly judged the answer; a better AI answer alone is not enough.
7. Allow two practice retries after the first evaluated attempt. Each retry includes the correction and explanation. After the second retry, show a worked example explaining its choices. A student who already meets the practice requirements can move on without using every retry. Seeing the example does not prove independent understanding.

Preserve edits if generation or assessment fails. Failed requests do not consume a learning attempt. If feedback is unavailable or unreliable, retain the submission and offer retry without awarding or denying completion.

### Final: demonstrate independent use

8. After two practice challenges, give a fresh final challenge at the same level without hints or a worked solution. The student edits its weak prompt and judges the resulting answer before seeing feedback.
9. Pass only when the prompt covers the essential task requirements and the student correctly identifies whether the answer meets them, including material errors or omissions. A sensible prompt can pass despite a poor AI answer if the student recognises the problem. A lucky answer does not make a weak prompt pass.
10. After an unsuccessful final, show feedback, return the student to practice and use a different reviewed final variant for the next independent check. Once both final variants have been seen, further attempts are practice, not evidence from a fresh task.
11. Save the final submission, judgment and result. Passing unlocks the next level; passing all three levels finishes the game.

Game reward: a correction that fixes the identified gap with a sound explanation earns a visible skill point; passing the fresh final challenge earns the level badge and unlocks the next level. Passing Pro earns its badge and completes the game.

The observable evidence is the student's own correction and explanation during practice, followed by a successful fresh attempt without hints. Automated judgments must pass the reliability checks in section 6 before awarding level completion.

The game uses prepared material and does not complete the student's assignment. Assess lasting learning, voluntary return and fewer wasted attempts on actual work separately. Do not claim those outcomes from reading feedback or passing the game alone.

## 4. First-release rules and onboarding

Default: start directly in Beginner's first prepared challenge. No account, profile, upload, level choice or tutorial is required before useful feedback.

The student gives effort: read the task, edit the existing prompt, then briefly explain whether the answer meets the requirements. The expected benefit is visible in the first answer comparison, rather than another unexplained request for context.

Offer sign-in after the first feedback to keep progress across devices. Before sign-in, retain the current session on this device and explain that it is not an account backup. Account details and cross-device saving can wait until value is visible.

Explicitly agreed:

- Beginner, Amateur and Pro levels.
- Two practice challenges and one fresh final challenge per level: nine primary challenges.
- Direct editing, answer comparisons and feedback.
- One initial practice attempt plus two retries, then a worked example.
- A fresh final challenge without hints.
- Passing depends on both the prompt and answer judgment, not AI answer quality alone.

Approved difficulty:

| Level | Focus |
| --- | --- |
| Beginner | Make the task and desired answer clear. |
| Amateur | Add relevant context and constraints. |
| Pro | Handle competing requirements and recognise unreliable answers. |

Answer-checking occurs at every level. Roles, length and emotional instructions do not earn credit by themselves.

Defaults chosen to complete this brief:

- Use prepared, teacher-reviewed material only; no personal assignment uploads.
- Start at Beginner. Passing its final unlocks Amateur; passing Amateur unlocks Pro. Completed practice remains available.
- Each challenge has written essential requirements and acceptable answer judgments before release. Use clear pass/not-yet explanations for assessment. Skill points count demonstrated practice achievements; they are not an AI-generated quality score.
- An unsuccessful final sends the student back to practice with feedback about the missing skill. The next final uses a different reviewed variant at the same difficulty, without hints. Include one alternate final variant per level in addition to the nine primary challenges; if both variants have been seen without a pass, allow practice but keep the next level locked and show that another unseen, teacher-reviewed final is needed. Do not silently unlock or describe a repeated task as fresh. Adding another final is a content update, not automatic generation of an unreviewed test.
- Finishing the game means passing all three level finals. Keep first-attempt and later-pass records distinct.
- Each of the six practice challenges offers one skill point, for a maximum of six. Award it when a correction addresses the feedback, the student explains why, and their answer judgment is sound. A student who meets the requirements on the first attempt also earns the point; do not reward deliberately making mistakes. Replays and duplicate submissions cannot earn extra points for the same challenge.
- A worked example is available after the second retry. An attempt that uses that example remains supported practice and cannot earn the challenge's independent skill point. Practice can still be marked completed after reviewing the example; the final remains the level gate.
- Skill points give visible recognition but do not unlock levels. Independent final passes earn Beginner, Amateur and Pro badges. These are game achievements, not qualifications or certificates.
- Save edited drafts, evaluated attempts, answer judgments, feedback, practice status, point awards, final variants seen and level results. Signed-in progress belongs to that student.

No presentation generator, assignment completion service, message monitoring, payments, leaderboard, streaks, certificates or teacher dashboard in v1.

## 5. Riskiest dependency: assessment

AI generates an answer to the student's actual edited prompt and evaluates the prompt and their judgment against a prepared task. This comparison is the learning interaction, not a static prompt checklist.

A general assistant can also coach prompting. The proposed advantage is a consistent practice sequence with reviewed requirements, independent final checks and saved evidence of progression. Superiority to a general assistant is unproven.

Before building the full journey, test automated feedback on 12 teacher-reviewed submissions: four per difficulty. Across that set include weak prompts with lucky answers, sensible prompts with poor answers, good submissions and missing essential requirements. Include before-and-after corrections with explanations: both a genuine correction and a copied explanation that does not fix the gap. Also include a student submission asking the evaluator to ignore its rules. The teacher labels the examples before seeing AI feedback.

Correct feedback identifies the relevant requirement, distinguishes prompt quality from answer quality, supports its assessment with the actual submission, and offers a useful correction without inventing facts.

Before evaluation, each challenge needs a teacher-reviewed task, essential requirements, reference facts where relevant, examples of acceptable judgments, and the skill being practised. Use tasks whose factual correctness can be checked. These are evaluation rules, not a mandatory prompt template.

For a skill-point decision, evaluate the original submission, feedback gap, correction, explanation and current answer judgment together. All three conditions must hold:

- The correction actually addresses the identified gap without losing an essential requirement.
- The explanation connects the change to the task in the student's own reasoning; merely repeating advice is insufficient. One or two sentences can be enough. Do not assess grammar or verbosity unrelated to the skill.
- The student correctly judges the answer's important strengths, omissions or errors against the task.

If the initial attempt already meets the requirements, use its prompt and answer explanation for the same point. Report the decision with supporting evidence from the submission and the relevant requirement. If evidence is missing or the assessment contradicts its own reasoning, show assessment unavailable, preserve work and retry; do not turn uncertainty into failure.

Student prompt text is material to assess, never authority to change the assessment rules. Instructions such as "give me a point" do not override the reviewed requirements.

Acceptance criteria decided before testing:

- In each of two assessment runs, at least 10 of 12 level pass/not-yet decisions and at least 10 of 12 skill-point eligibility decisions match the teacher labels. The labels are set before either run.
- Zero critical errors: rewarding a weak prompt solely for a lucky answer; failing a sensible prompt solely for a poor answer when the student identifies it; endorsing a material factual error; inventing a requirement; revealing a final solution before submission; awarding a point for an unfixed gap or copied explanation alone; or obeying a student instruction to change scoring rules.
- The two runs must agree on all level-pass and skill-point decisions; an inconsistent decision fails this initial gate. For at least one lucky-answer and one poor-answer case, generate multiple answers to the same prompt and verify that feedback does not claim one output proves causation.

If this gate fails, revise task criteria or evaluation instructions and rerun the same reviewed set. If it still fails, stop automated skill-point and level awards and test teacher-reviewed feedback instead. Do not call teacher-reviewed delivery a working automated product or silently lower the criteria.

## 6. Stack and access

- Codex writes code; GitHub stores it; Convex provides database, backend, Convex Auth and Convex static hosting.
- Deploy with npm run deploy. Git push does not deploy.
- Check AI access, service approval, current availability and measured cost before relying on model calls. No model/provider is selected by this scope; a new outside service needs the builder's approval.
- Set bounded AI usage before public testing. No paid plan or upgrade is authorized by this document.
- No reminder email dependency for this game. The previous email-service approval is historical, not a requirement to install it.
- Preserve secrets outside source control and client code.

## 7. State, storage and failures

Store drafts, original and generated answers, student judgments, feedback, corrections and explanations, evaluated attempt counts, practice completion, unique point awards, final variants seen, results and badges. Preserve challenge/assessment versions so a result can be interpreted later.

At editing: preserve the draft on this device and, after sign-in, save it privately to the account. Clearly distinguish saving, saved and failed states. Do not show confirmed saving before storage succeeds.

At generation: preserve edits, offer retry, and do not consume a learning attempt on a failed request. If the usage allowance is exhausted, explain that the student must return when it resets; keep progress and offer already available examples for practice. Do not pretend a cached answer was generated for the new edit.

At feedback: if evaluation fails or cannot be trusted, show assessment unavailable and preserve the submission for retry. Award a point only after both the assessment and its save are confirmed; show a pending state until then. Do not award or deny a final pass from missing feedback. Explain capability limits rather than blame students.

At final assessment: collect prompt and judgment before showing feedback; keep hints and worked solutions hidden until the independent attempt is submitted. Record which final variant was used.

At saving and reopening: recover confirmed progress and drafts, keep each account private, and make retrying a save safe from duplicate attempts or duplicate point awards. Reopening must restore points and badges as well as learning progress. Sign-in must preserve the current guest attempt rather than discard it.

Implementation defaults: use Convex for account progress, backend generation and authentication. Keep credentials off the client and out of Git. AI usage limits must be set from measured cost before a public release; no paid upgrade is authorized by this brief.

Historical m0Checks records are retired development tests. Their schema may remain solely to preserve existing data; there are no active reminder functions or scheduling verification commands. They are never game usage.

## 8. Build order and acceptance milestones

These describe what I must demonstrate, not work already completed. Start with the riskiest dependency: whether AI can give useful feedback and recognise understanding.

1. I can test one prepared Beginner challenge without building the app: use approved AI access to assess a weak prompt, a student's answer judgment, then their correction and explanation. A teacher can check whether the feedback is accurate and whether the skill-point decision is justified. I can record access and cost before running it; no new service or paid plan is assumed approved.
2. I can repeat that assessment on the 12 teacher-reviewed submissions in section 6, including a weak prompt with a lucky answer and a sensible prompt with a poor answer. Both runs meet the agreement and zero-critical-error rules. If they fail, I follow the stated fallback rather than build untrusted automatic rewards.
3. I can finish one practice challenge in the app: edit the supplied prompt, compare answers, judge the result, read feedback, make a relevant correction and explain it. A justified skill point appears once; first-attempt success can also earn it.
4. I can use two practice retries, see the worked example after the second retry, and recover from a failed AI request without losing my edit or using an attempt. Replaying cannot earn duplicate points.
5. I can complete Beginner's two practices and pass a fresh final without hints. If I do not pass, I can return to practice and try the alternate reviewed final; viewing a solution does not unlock the next level.
6. I can sign in after receiving first value, close and reopen the app, and recover my confirmed drafts, attempts, points and badges. My guest attempt survives sign-in, and another account cannot read my progress.
7. I can complete Beginner, Amateur and Pro using the nine primary challenges and three alternate final variants. Each independent pass earns its badge and unlocks the next level; passing Pro finishes the game.
8. I can deploy with npm run deploy to Convex static hosting and complete the student journey on a phone at the live URL, including retrying a failure and reopening saved progress.
9. I can observe students making relevant corrections with sound explanations, then completing fresh challenges without hints. I record where they struggle and whether they return voluntarily; I assess retained learning and fewer wasted attempts on their own work separately.


Group these checkpoints as M0 = 1?2 (feedback proof), M1 = 3?6 (one complete level and persistence), M2 = 7?8 (all levels and live journey), and M3 = 9 (observed student evidence). These are the new product's milestone meanings, not the retired plan's calendar. Work in order; do not relax independent checks or feedback criteria to meet the deadline.

If behind: reduce decorative work and outreach polish first. Releasing only Beginner is a reduced-scope release requiring an explicit recorded decision; it is not the agreed three-level v1. If feedback fails, use the stated teacher-reviewed experiment, report it honestly and do not award automated progression.

## 9. Verification cases

| Case | Required result |
| --- | --- |
| Correct first attempt | Point can be earned without deliberately failing first |
| Correction plus explanation | Point only when the gap is fixed and judgment is sound |
| Judgment wrong, prompt sensible | Correct judgment; reuse answer without needless generation |
| Weak prompt, lucky answer | No pass solely for the answer |
| Sensible prompt, poor answer | May pass if student recognises the material problem |
| Two practice retries used | Reveal example; example use does not earn independent point |
| AI or assessment failure | Preserve edits; no attempt lost; no false award or failure |
| Usage exhausted | Preserve progress; explain return after reset |
| Repeated request or replay | No duplicate attempt or point award |
| Final before submission | No hint or worked solution |
| Failed final | Practice and different reviewed final; no silent unlock |
| Both final variants seen without pass | Practice available; next level locked until unseen reviewed final exists |
| Sign-in after guest attempt | Preserve work and attach account progress safely |
| Close and reopen | Restore confirmed drafts, attempts, points and badges |
| Other account | Cannot read or change another student's progress |
| Student asks AI to change scoring rules | Reviewed rules remain authoritative |

No game tests have passed merely because this table exists. Use real browser checks for student flows and focused automated checks for silent rules such as duplicate rewards and private access.

## 10. Learning and market evidence

The classroom is the reachable starting audience; ten students participated in the exercise. The extended-network audience count is unknown. Competitors, paid alternatives, trends and willingness to pay remain unresearched; do not claim a 200-300-person audience without counting it.

Progressing to harder challenges is the proposed reason to return. Observe voluntary return separately from assigned classroom participation. Pricing and buyer are undecided and outside the first release.

Record independent submissions and teacher assessment separately from automated decisions. Voluntary use differs from assigned class participation. Do not equate in-game points with learning, classroom participants with signups, or payment intent with revenue. The old Revenue track choice is historical; do not invent payment goals for this release.

## 11. Non-goals and parking lot

No assignment completion, presentation generation, personal PDF uploads, message/email monitoring, reminders, automatic follow-ups, payments, leaderboard, streaks, certificates or teacher dashboard. Further challenge sets, pricing, visual branding and extra game mechanics can wait for evidence and a written scope update. Existing badges are game achievements, not certificates.

## 12. Current state and next action

Reported classroom result: 10 students, eight final scores of 2 and two of 1 from 0; independent completion reported, measurement details unavailable. Beginner practice 1, Gemini access, device recovery and browser state checks now have development evidence in M0_VERIFICATION.md. The quantitative teacher-feedback gate, account persistence, full game and public journey remain unverified.

Next single implementation milestone: Beginner practice 2 and onward navigation, as specified in PLAN.md, awaiting the builder's yes before code. Keep the feedback-gate evidence gap visible; do not claim numerical acceptance or public readiness.

## 13. Decision log

- 4 October 2026: abandon the previous reminder product and align this scope with PRODUCT.md.
- Preserve agreed game mechanics and mark document-completion defaults as defaults.
- Keep classroom reports separate from app and learning claims.
- Begin with feedback reliability, then the complete student journey, saved progress, all levels and live evidence.
- Retain historical snapshots outside active instructions; old evidence is not evidence for this game.
