# Beginner mission: Help a friend before a quiz

Latest verification, 5 October 2026: the builder authorized development Gemini 3.5 Flash-Lite. Real quiz generation, gap feedback, correction, one justified point on attempt two, reopening and Next challenge passed in Edge at 390px. Separated answer generation from grading instructions after detecting premature feedback; 49 checks, build, typecheck and development push passed. The 20-request daily allowance, billing and production are unchanged. This supersedes earlier real-AI-blocked statements below; physical-phone confirmation, teacher review, quantitative feedback reliability evidence and quiz publication remain pending.

Status: mission, win rules and focused build approved by the builder on 5 October 2026. Implemented in development; prepared-response browser journeys passed. Real Gemini generation failed twice; real mission feedback, teacher review and student testing remain unverified. The published app remains unchanged.

## Student mission

Your friend has 20 minutes before a quiz and is confused about mean and median. Get AI to explain the difference with one example they can check.

Starting prompt: Explain averages.

Round: meet your friend's problem, improve the supplied prompt, inspect the actual AI answer, then decide whether that answer helps your friend understand the difference. The last decision checks the answer; it does not prove the friend's quiz readiness.

## Agreed win rules

- The student's prompt asks for mean versus median and a checkable example. Exact wording, a role instruction and a mention of the 20-minute deadline are not required.
- The student's judgment correctly identifies whether the generated answer explains both ideas and calculates them accurately. If the answer is wrong or incomplete, identifying that problem can meet the judgment requirement.
- A lucky answer does not compensate for a weak prompt. A poor answer does not fail a clear prompt when the student correctly identifies the problem.
- Existing practice-point rules apply: initial success may earn the point; a correction must address the feedback gap with a sound explanation and accurate judgment. Supported completion, retries, recheck and recovery retain their existing rules.

## Reference facts for content preparation

Mean is the sum divided by the number of values. Median is the middle value after sorting; for an even number of values it is the mean of the two middle values. For 2, 3, 4, 5, 16, the mean is 6 and median is 4. This is one possible worked example, not a required dataset or a final-assessment solution. Teacher review remains pending.

## Implementation boundary

The builder approved changing Beginner practice 1 to rescuing an unhelpful answer. Show the prepared vague answer before editing, ask for a useful addition rather than a rewrite, connect feedback to the friend's problem, and acknowledge a clear request plus accurate judgment after confirmed success. Remaining challenges and supported final-return practices retain their existing material. No timer or measured learning outcome is implied.

Fresh first-practice states carry materialVersion=quiz-v1. Untagged drafts and database rows retain legacy-v1 invitation material. The backend pins the version to practice sessions/jobs, rejects switching versions before reserving usage, and assesses/rechecks using the generated answer's version. Attempts and points remain attached to the same first-practice slot; the mission cannot earn a second first-practice point. Evidence is in M0_VERIFICATION.md.
