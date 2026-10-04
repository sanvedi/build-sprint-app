# Prompting Game

Product brief completed 4 October 2026. Working name; final branding is undecided.

The builder asked to complete this brief and move forward. Explicitly agreed choices are distinguished below from defaults chosen to finish the first-version specification. This document specifies behavior; it does not claim a working app.

## 1. The job

First student: DP, an alias for a participant in the builder's classroom exercise. The builder reports that DP became disappointed when asked to provide context and did not wish to write a new prompt. DP's original prompt, exact answer and subsequent action are unavailable.

Draft job in DP's voice, not a student quote: When AI asks me for more context and I do not want to start again, I want to know the smallest useful change to my request, so I can get a useful answer with less wasted effort.

The audience is students who already use AI but struggle to explain their needs and judge its answers. The builder teaches these students and can test in class. The classroom presentation incident motivates the idea; creating presentations or completing assignments is outside this product.

The outcome to investigate is fewer wasted attempts on students' own work. In-game completion is evidence of an independent performance on prepared material, not proof of that wider outcome.

## 2. The switch

Known path for DP: asked to provide context -> disappointed -> unwilling to write a new prompt. Whether DP copied an answer, retried or abandoned the task is unknown.

Broader builder observation: students enter brief questions or irrelevant detail, then sometimes copy the first answer without checking it. This is not a recorded individual journey for DP.

Known resistance: rewriting feels unwelcome to DP. Approved response: edit an existing prompt rather than start with a blank box.

Assumed pull: a short challenge and visible answer comparison make one useful edit feel worthwhile. Product response: show value in the first challenge, with no account or level-selection requirement beforehand.

Assumed anxiety: students may not know what context matters or may distrust another AI's advice. Product response: show task requirements, give specific explanations, and acknowledge unreliable answers rather than insist AI is right.

Possible habit: copying or guessing is faster in the moment. Product response: keep practice focused and immediately connect edits to results. These explanations are hypotheses, not invented student quotes. Observe whether students voluntarily pause their work to practise.

## 3. The core flow

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

## 4. Onboarding

Default: start directly in Beginner's first prepared challenge. No account, profile, upload, level choice or tutorial is required before useful feedback.

The student gives effort: read the task, edit the existing prompt, then briefly explain whether the answer meets the requirements. The expected benefit is visible in the first answer comparison, rather than another unexplained request for context.

Offer sign-in after the first feedback to keep progress across devices. Before sign-in, retain the current session on this device and explain that it is not an account backup. Account details and cross-device saving can wait until value is visible.

## 5. First version and completion rules

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

## 6. The AI-first part and reliability gate

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

## 7. Classroom evidence

The builder reported 10 participants: all started at 0; eight reached a final score of 2 and two reached 1. The builder confirmed independent completion of the final task without coaching.

The suggested exercise used an initial task, practice and a fresh final task. Exact prompts, individual submissions, scoring criteria, task comparability and adherence to every suggested step have not been recorded. The exercise date was not supplied; the report was recorded on 4 October 2026.

This records higher final scores and reported independent completion. It does not establish transferable learning, causation, lasting improvement, reliable automated feedback, return use, payment willingness or a working app. No comparison group was reported. Participants are not product signups.

DP's reported reluctance is evidence of resistance, not evidence that the proposed game overcame it.

## 8. Safeguards within the journey

At editing: preserve the draft on this device and, after sign-in, save it privately to the account. Clearly distinguish saving, saved and failed states. Do not show confirmed saving before storage succeeds.

At generation: preserve edits, offer retry, and do not consume a learning attempt on a failed request. If the usage allowance is exhausted, explain that the student must return when it resets; keep progress and offer already available examples for practice. Do not pretend a cached answer was generated for the new edit.

At feedback: if evaluation fails or cannot be trusted, show assessment unavailable and preserve the submission for retry. Award a point only after both the assessment and its save are confirmed; show a pending state until then. Do not award or deny a final pass from missing feedback. Explain capability limits rather than blame students.

At final assessment: collect prompt and judgment before showing feedback; keep hints and worked solutions hidden until the independent attempt is submitted. Record which final variant was used.

At saving and reopening: recover confirmed progress and drafts, keep each account private, and make retrying a save safe from duplicate attempts or duplicate point awards. Reopening must restore points and badges as well as learning progress. Sign-in must preserve the current guest attempt rather than discard it.

Implementation defaults: use Convex for account progress, backend generation and authentication. Keep credentials off the client and out of Git. AI usage limits must be set from measured cost before a public release; no paid upgrade is authorized by this brief.

## 9. Market and return use

The classroom is the reachable starting audience; ten students participated in the exercise. The extended-network audience count is unknown. Competitors, paid alternatives, trends and willingness to pay remain unresearched; do not claim a 200-300-person audience without counting it.

Progressing to harder challenges is the proposed reason to return. Observe voluntary return separately from assigned classroom participation. Pricing and buyer are undecided and outside the first release.

## 10. Checkable milestones

These are acceptance checkpoints, not claims of completed work:

1. I can verify approved AI access, service restrictions and cost using current documentation, run sample requests from Convex, and set a bounded test allowance before classroom access. Choosing a new outside service requires the builder's approval; no paid plan is implied.
2. I can demonstrate trustworthy automated feedback on the 12 teacher-reviewed submissions, including lucky and poor answers, under the criteria in section 6. If it fails, I follow the stated fallback before building automated rewards or progression. This small test is a release gate, not proof of universal AI reliability.
3. I can complete one Beginner practice journey: edit, receive an answer, judge it, compare answers, get feedback, correct a gap, explain the correction, earn a skill point, retry twice and see an example on a separate unsuccessful run. First-attempt success also earns a point; replaying does not add another. Failed requests preserve edits and do not use attempts.
4. I can complete Beginner's two practices and independent final, see a justified pass or not-yet result, and recover after failure through practice and a different final variant.
5. I can complete all three levels with nine primary challenges and three reviewed alternate final variants, with progression and no hints during independent checks.
6. I can sign in after first value, close and reopen the app without losing confirmed drafts, attempts, skill points, badges or level results, and verify another account cannot read them.
7. I can deploy with npm run deploy to Convex static hosting, then complete the journey on a phone at the live URL, including failure recovery and reopening. Code presence or local success alone is not live verification.
8. I can observe real students using the game and record independent performance, where they get stuck and whether they return voluntarily. Separately measure retention and attempts on their own work before claiming the wider benefit.

The fixed stack is Codex, GitHub and Convex for database, backend, authentication and hosting. Use the Convex static-hosting workflow for deployment.

OpenLoops is abandoned. IDEA_SCOPE.md, V1_BUILD.md and other old product documents must not govern this game. Their replacement is the next documentation task and must reflect these decisions. Repository safety rules and fixed-stack instructions still apply.
