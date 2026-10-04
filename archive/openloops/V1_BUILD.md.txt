# OpenLoops v1 build document

Written: 2 October 2026. Status: specified, not built or tested in the app.

This document turns IDEA_SCOPE.md into build instructions. That scope remains the governing document; its sections 16 and 17 supersede older wording. No new product features are approved here.

Screen-review update, 3 October 2026: follow the completed DESIGN.md for screen composition and action behavior. Capture and confirmation are stages on one Add a loop page, not separate pages. Use Check time for the reminder timestamp, following IDEA_SCOPE.md section 19; keep the original promised deadline in context and history. Follow-up edits use explicit Save follow-up, separate from copying. Loop detail does not make Close loop primary by default: its action emphasis follows the rules in DESIGN.md. Older screen labels below should be read with these corrections. These are specification decisions, not verified implementation.

## 1. The product

OpenLoops saves commitments in both directions and emails the user when it is time to act.

User pastes a commitment -> confirms who owes what and when -> gets a saved loop and a due-time email -> follows up or completes the commitment -> closes it or sets the next check date.

The first user is N, 58, a higher-education professional. Students promise a report by Saturday; the deadline passes and N forgets to follow up. The reverse direction is supported too: N promises feedback to students by Monday. That reverse example is illustrative, not a reported incident.

## 2. What v1 includes

- Typed or pasted text, one commitment at a time.
- AI-proposed details, with correction and confirmation before saving.
- Two directions: **Waiting on others** and **Others waiting on me**.
- Three states: **Waiting**, **Needs You**, **Closed**.
- Private saved loops using Convex and Convex Auth.
- A due-time email linking to the loop, even when the app is closed.
- An editable, copyable follow-up for commitments owed by others.
- Manual closure or a confirmed next check date for either direction.
- A timestamped history of meaningful changes and email delivery attempts.

Direction describes who owes the outcome. State describes whether attention is due. They are separate fields.

## 3. The screens

These are required views; they can share a page or use a small panel rather than separate pages.

| View | What the user sees and does |
|---|---|
| Public entry and sign-in | One sentence explaining OpenLoops, one start button, and Convex Auth sign-in. No private commitments are visible. |
| Capture | Paste/type one commitment. Preserve the text if processing fails. |
| Confirm | Edit direction, outcome, other person/group, exact date, time, timezone and context. Missing or uncertain details are clearly marked. Save only after confirmation. |
| My loops | Needs You, Waiting and Closed, with direction, outcome, other person and due time on each loop. An empty view explains how to add the first loop. |
| Loop detail | Original context, confirmed details, history, follow-up where relevant, Close and Set next check date. Display email delivery trouble when present. |

Do not require users to check the dashboard daily. Email is the return path. An email link takes the signed-in owner back to the relevant loop; sign-in must preserve that destination.

## 4. Rules that make the flow trustworthy

1. Never save invented people, obligations or deadlines. Show AI suggestions as proposals.
2. A relative date such as Saturday requires confirmation of its actual date and time. An old pasted message may mean a different Saturday. Do not silently use the date it was pasted.
3. Confirm the email destination and timezone before activating an alert.
4. Waiting means the confirmed check time has not arrived. Needs You means a check is due, not that the other person definitely failed.
5. At the deadline, send one alert for that deadline. Waiting-on-others wording asks whether the outcome arrived; own-commitment wording reminds the user of what they promised.
6. The app does not see outside replies or finished work. The owner closes the loop manually, including before the deadline if it is already complete.
7. Setting a new check date returns the loop to Waiting. Cancel or replace the old alert; closing a loop cancels pending alerts. Old scheduled work must not act on a changed or closed loop.
8. Keep email content minimal. Require owner sign-in to read private details. One user must never access another user's loops or changes.
9. An email accepted for delivery is not proof it was read. Record failures, retry safely and keep the loop visible under Needs You.
10. Confirmed saves and state changes survive closing and reopening the app. Do not show success until Convex confirms the write.

## 5. What is remembered

| Record | Required information |
|---|---|
| User | Identity, confirmed alert email, timezone |
| Loop | Owner, direction, outcome, other person/group, original context, confirmed deadline, state, creation/update/closure times |
| History | Created, corrected, due, closed or rescheduled, with timestamps |
| Alert | Loop and deadline version, scheduled time, attempt/result, retry information |
| Follow-up | Editable text tied to the loop; no automatic sending |
| First use | Genuine user's first confirmed loop, recorded once for signup evidence |

Secrets belong in Convex environment variables. Do not place credentials in documents or GitHub. Detailed retention/deletion policy is not yet settled; do not claim one has been implemented.

## 6. Errors and recovery

| Problem | Required behavior |
|---|---|
| Unclear person, direction or date | Ask for correction; no invented confirmed details or active alert. |
| No commitment in the text | Explain that nothing trackable was found; allow manual fields. |
| AI timeout or empty result | Keep the original input; offer retry or manual entry. |
| Save fails | Keep the entry; show Not saved and Retry. |
| Email fails | Log failure, show delivery trouble, retry safely; Needs You remains visible. |
| Deadline changes or loop closes | Superseded scheduled attempts do not send stale alerts. |
| Email link opened while signed out | Sign in, then return to the owner's loop. |
| Someone else's loop link | Reveal no private details and allow no changes. |

## 7. Dependencies and open decisions

The fixed stack is Codex, GitHub and Convex for database, backend, sign-in and static hosting. Deployment uses `npm run deploy` following the Convex static-hosting skill.

| Dependency | Current status | Required proof before relying on it |
|---|---|---|
| Text AI model/API | Not selected or verified | Current official documentation, access/cost within the builder's budget, and representative text extraction tests. |
| Convex scheduled alerts | Not verified | A real short-duration deadline changes state while the app is closed. |
| Email delivery | Resend approved on 3 October 2026; access not configured | Start on the free plan, securely configure the sending key, verify a domain for real-user delivery, then receive a real due email. No paid plan authorized. |
| Convex Auth | Stack approved; implementation not verified | Owner sign-in, return from email link and isolation between two users. |
| Static hosting and GitHub | Required; live URL/repo not recorded | Public empty app and repo accessible independently. |
| Analytics | Required by M3; provider/access unselected | Approve any outside service as required, measure a live visit and provide reviewer read-only access. |
| Payments | Conditional in M5; price/provider undecided | Agree product offer and price, approve required service, verify genuine product payment. |

These are open decisions, not silently chosen services. No in-app-only replacement for email is approved. Before requesting outside-service approval, prepare a concrete choice with verified cost and requirements.

## 8. Milestone list

Use **M0-M6** when asking the coding agent to build a milestone. These are build milestones, distinct from the event's four numbered milestones. Do not skip unfinished prerequisites or pull later work into an earlier milestone.

All dates are 2026, IST. The event has four milestones: lock the problem on 2 Oct; ship during 3-9 Oct; get real users on 10-11 Oct; sell during 12-17 Oct.

| Build milestone | Dates | Deliverable | Acceptance test | If behind |
|---|---|---|---|---|
| **M0: Prove feasibility and setup** | Fri 2 Oct; scope target before 3 PM, dependency stop check at 5 PM | Record no-code result; test extraction, scheduling and email; empty app live; GitHub repo exists. | Representative extraction results documented, real short-duration email received with app closed, empty public URL opens and repo exists. | Manual fields/explicit dates if extraction fails. Email failure requires an agreed reduced scope, not silent removal. |
| **M1: One complete flow** | Fri 2 evening-Sun 4 Oct | Sign-in, text capture, confirmation, both directions, persistence, three states, due email, follow-up, close/reschedule. | A new user creates a loop in each direction on their phone; reload works; due email arrives with app closed; link opens the right loop; close/reschedule persists. | Plain UI, text only, manual corrections, same two directions and email. |
| **M2: First users** | Mon 5-Wed 7 Oct evenings | Observe N, Ni and Vi with real commitments; record where they stop, repeat capture and real distribution channel. | Three non-builder first-use records, at least nine real loops, one real-user due email, repeat-use observations and biggest blocker recorded. | One observed user with three real loops; report reduced evidence honestly. |
| **M3: Finish the build** | Thu 8-Fri 9 Oct evenings | Fix the biggest M2 blocker, phone/access checks, analytics with read-only access, clear entry sentence and button. | A stranger enters from the public URL, signs in and completes the flow on a phone; email arrives; analytics records the visit; private access is verified. | Fix the blocker stopping most users; add no input types or new features. |
| **M4: Video and outreach** | Sat 10-Sun 11 Oct | Watchable proof video, launch copy, Sunday invites, weekend usage evidence. | Video exists, invites are sent by the builder, user feedback and weekend visitor/signup evidence recorded. | Twenty direct invites and one screen recording, without an edited video. |
| **M5: Launch and sell** | Mon 12-Fri 16 Oct | Monday launch, Tue/Wed/Thu updates, objections, buyer-driven fixes, payment/intent test after value. | Four posts/updates live; objections documented; each product change logged; genuine payment attempt if repeat-use signal exists. | One post, thirty targeted invites and logged objections. Protect the working flow. |
| **M6: Verify and submit** | Fri 16 night-Sat 17 Oct | Freeze features, final live checks, public repo, evidence and submission. | Two consecutive proof walkthroughs, one on another person's device; both directions, persistence, email and close/reschedule verified. Submit by 9 AM target, before 11 AM hard cutoff. | No new features; submit only claims with actual evidence. |

M0's empty app must be live no later than Saturday 3 Oct; that is a recovery deadline, not a reason to ignore Friday's dependency stop check. Reserve Friday night and Saturday morning for verification and submission.

### Milestone reporting

At each milestone, record what is implemented, working locally, live and verified separately. Save the evidence location, largest risk and next action. Deploy changed product work using the fixed hosting workflow; update GitHub and append a CHANGELOG.md line describing what a user can now do. Human user sessions, public posts and external messages require the builder's participation or explicit sending authorization.

## 9. Checks before calling v1 complete

| Check | Expected result |
|---|---|
| Students owe report by a confirmed Saturday deadline | Waiting on others; due email asks whether it arrived; copyable follow-up. |
| N owes feedback by a confirmed Monday deadline | Others waiting on me; due email reminds N of her own commitment. |
| Relative or missing date | Exact date/time exposed for confirmation; nothing invented. |
| Close before due | Closed persists and no pending due alert is sent. |
| Change deadline before due | Old alert is suppressed; new deadline receives the appropriate alert. |
| Due loop gets a new check date | Returns to Waiting, with history and a new alert. |
| App closed at due time | State and email processing happen without opening the page. |
| AI/save/email failure | Recovery follows section 6; no false success. |
| Reload and second device | Owner's saved loops and changes remain available. |
| Two signed-in users | Neither can read or change the other's private loops. |

Use short-duration test deadlines without changing the production rules. Test accounts and practice commitments are marked as tests and excluded from real-user evidence.

## 10. Proof and Revenue targets

The primary track is Revenue. Build for signups (20x) and live product quality (8x) first. A signup requires email plus genuine first use; anonymous visitors and the manual no-code trial do not count.

| Measure | Target | Evidence |
|---|---|---|
| Genuine users | 10; Revenue signups L2 (1-50), stretch L3 (51-250) | Convex genuine-user first-use count, excluding tests |
| Live quality | L3: working product that does what it claims | Unassisted live completion on a phone |
| Genuine loops | Approximately 100, aspirational, not a signup substitute | Convex real-loop count |
| Pain conversations | Three or more with quotes; L4 target | Recorded conversations/quotes, not inferred from usage |
| Follow-up value | At least one documented followed-up/rescued loop | User-confirmed action and context; no unsupported money-saved claim |
| Revenue | L1 until actual qualifying money arrives; conditional L2 for positive revenue up to $100 | Processor evidence; attempts, gifts, friends' and test payments excluded |

Keep the other Revenue-row targets in IDEA_SCOPE.md. No evidence is used to raise two rows. Any visitor bonus requires read-only analytics. Do not add agent architecture to chase a bonus.

The 60-120 second walkthrough shows a fresh commitment, confirmed saved details, both direction options, a genuine due loop and follow-up/closure. Show source numbers separately. Use an already-due loop to fit the time; separately prove real scheduled email delivery. Never pretend the deadline elapsed during the short walkthrough if it did not.

## 11. Outside v1

Screenshots, automatic Gmail/WhatsApp monitoring, discovery of uncaptured forgotten commitments, Watching state, automatic reply detection, automatic sending, teams, broad task management, multi-agent architecture and money-recovery calculations are parked. Additional OpenLoops phases require written rescoping.

## 12. Current state and next action

- Approved: product direction, both commitment directions, email alerts, Revenue track.
- Reported validation: N and Ni each entered two real commitments and updated one without help. This supports initial capture/update behavior.
- Not established: repeated use over days, voluntary additional capture, willingness to pay, extraction reliability, live scheduling/email, owner isolation or deployment.
- Active milestone: **M0**. The scope does not establish that any build milestone is complete.
- Next single action: **verify text extraction on representative commitments, including one in each direction and one ambiguous date; record proposals, corrections and pass/fail results.** Resolve required service access before relying on it.
