# OpenLoops

## 1. The job

When students promise a report by Saturday, I want to save who owes it and when to check, so I can stop keeping it in my head and remember to follow up.

Who, by situation: N is my senior colleague, a higher-education professional coordinating students and colleagues. She has several reports, documents, approvals and confirmations to wait for at once.

Today they hire: memory, WhatsApp stars and self-messages, unread emails, notebooks, calendar reminders and going back through old conversations.

What needs doing: remember who owes what, check at the right time, follow up and record when it is finished. The same applies when N owes something to someone else.

How they want to feel: I want N to stop carrying these promises in her head. I still need to check whether OpenLoops gives her that relief.

How they want to look to others: I haven't asked N this yet.

The bench: I'm starting with individuals, not selling to an institution. Who would pay is still undecided.

The one we serve first: N. Her students promised a report by Saturday. The deadline passed without submission, and she forgot to follow up.

## 2. The switch

What they'd fire: relying on memory and scattered saved messages to remember when to check. N can keep using WhatsApp and email for the conversations.

Push: the report deadline passes, but N forgets to ask for it. Saving the message doesn't make sure she follows up.

Pull: save the promise once and get an email when it is time to check.

Anxiety: I expect she may worry that she will still have to remember, or that the reminder will use the wrong date. I need to ask her what actually worries her.

Habit: starring a message or writing a note is familiar. OpenLoops asks her to put the commitment into one more place.

The one worry onboarding must remove: whether the commitment was saved with the right reminder time and email address.

How I know: N's missed report follow-up is the real example I'm starting from. In the manual trial, N and Ni each entered two real commitments and updated one without help. I haven't yet shown that they will keep coming back or rely on automated emails.

## 3. The core flow

The story: N saves a promise, gets reminded when it needs attention, then checks, follows up or finishes what she owes.

Check time means when OpenLoops should remind N to act, not a new promise about when the other person will deliver. Start by suggesting the promised deadline, but N confirms the exact reminder date, time and timezone. For a report promised on Saturday, she may choose Saturday to check or Monday to follow up. That choice changes the reminder, not what the students promised. Keep the original promised deadline in the context and history when she changes the check time.

Use Check time as the date-and-time field label. Use Set next check time, Save check time and Check time updated for rescheduling. History says Check time set, Check time reached or Check time changed from [old time] to [new time], keeping both exact timestamps and the timezone. A confirmed past check time, rather than an old promised deadline on its own, triggers immediate Needs You and one email after saving.

1. Students promise N a report by Saturday. She needs to remember to check while handling her other work.
2. N opens OpenLoops, signs in and types or pastes the commitment.
3. OpenLoops suggests who owes what, the check time and the context. Anything unclear is shown for her to check.
4. N corrects and confirms the details, including the exact date, time, timezone and reminder email address.
5. The commitment is saved with its original context under Waiting. If the confirmed check time has passed, it goes straight to Needs You and sends one immediate email after saving succeeds.
6. For a future check time, it moves to Needs You at that time and sends one email, even if N has closed the app.
7. N opens the email link. For the report, she is asked whether it arrived and can edit or copy a follow-up. For her own promise, the reminder tells her what she owes.
8. N checks or does the work outside OpenLoops. She marks it Closed when finished, or sets the next check time if it is still outstanding.

Following up or setting a new check time keeps the commitment moving. It is finished when the outcome is complete and N closes it. OpenLoops cannot see whether a report arrived or outside work was done; N records that herself.

Capture and review are two stages on one page: Review details reveals the suggestions beside the original text, then Save loop saves the confirmed details and opens the loop's own page. Checking, following up and closing remain different actions. Opening a loop or copying a follow-up does not finish it. Loop saved means the record is stored, not that an email was delivered.

Things they do today: I haven't measured the number of checks or steps.

Things they do with my product: five main actions—capture, confirm and save, open the reminder, act, and record the result. First-time sign-in and email setup add steps. I haven't measured whether this takes less effort yet.

What can go wrong:

- Step 2: N pastes several promises together. Keep the original text and ask her to choose one before reviewing its details. She can instead edit the text or enter one commitment herself. Don't select a promise automatically or save several loops at once.
- Step 3–4: an old message says Saturday, or the person responsible is unclear. Show what is uncertain and require confirmation of the person, actual date and time. Don't invent them.
- Step 3: AI fails or finds no commitment. Keep the text and let N retry or enter the details herself.
- Step 4: N corrects the suggestions. Keep her edits and confirm the check time, timezone and email before setting a reminder.
- Step 5: saving fails. Keep her entry, show Not saved and let her retry. Don't show success before the save is confirmed; retrying shouldn't create duplicate commitments.
- Step 6: email fails. Keep Needs You, show the delivery problem and retry safely without repeated alerts for the same check time. Sending an email doesn't prove N read it.
- Step 7: N is signed out. After sign-in, return her to the right commitment. Nobody else should be able to read or change it. Keep any follow-up edits she saves.
- Step 7: N edits a follow-up. She presses Save follow-up to keep those edits across visits; copying doesn't save or send them. Show Unsaved changes, saving progress, confirmed success or a retryable failure. Before she leaves or closes the loop with unsaved edits, let her save, keep editing or explicitly discard them. Only confirmed saves are guaranteed after reopening.
- Step 8: N closes the commitment or changes the check time. Cancel or replace the old reminder so it doesn't arrive after the change.
- Step 8: an update fails or N reopens the app. Keep confirmed changes and history; don't show closure or a new date as saved until it succeeds.

Next story: N returns over the next few days and adds another real commitment without me prompting her. I'll also observe Ni and Vi and fix where they get stuck before adding features.

## 4. Onboarding

First value: N receives her first reminder email, opens the saved commitment and has the context she needs to act. Seeing it saved is early reassurance; the email proves she doesn't have to remember to open the app.

The worry it removes: whether OpenLoops will remember the commitment and remind her at the right time.

From opening the link to the first value:

1. N opens a link I send her and sees what OpenLoops does. Removes: uncertainty about whether it helps with something she is waiting for.
2. She signs in, pastes one real commitment and checks the suggested details, check time and email address. Removes: uncertainty about whether it understood the promise correctly.
3. She sees the saved commitment and receives an email when attention is due. A past check time means Needs You and one immediate email after saving. Removes: uncertainty about whether it was saved and whether the reminder will reach her.

Login: before saving, so her commitments stay private and she can return from an email or another device.

What we don't ask on day one: a profile biography, institution details, a tour, contact access or connections to WhatsApp and email accounts.

What we ask later, and when: after her first reminder, I'll ask whether it helped her check, follow up or finish. Over the following days, I'll watch whether she adds another commitment without prompting.

## 5. v1

Does: lets N type or paste one commitment, confirm who owes what and when, save it privately and get an email when attention is due. Supports Waiting on others and Others waiting on me, with Waiting, Needs You and Closed. She can see original context and history, edit or copy a follow-up for someone else's promise, close a commitment or set the next check time. A confirmed past check time immediately becomes Needs You and sends one email after saving. Saved changes survive reopening the app.

Doesn't: screenshots, automatic WhatsApp or email monitoring, finding promises N hasn't entered, detecting replies, sending follow-ups automatically, teams, general task management or money-recovery calculations. Watching is parked too.

Nice to have, only after the must-haves work: clearer wording and visual polish based on where N, Ni and Vi struggle. Extra features can wait.

How I'll know it worked: people come back without prompting to add another real commitment. At least one reminder leads to a check, follow-up, completion or new check time. My first user-test target is N, Ni and Vi with at least nine real commitments between them and a real reminder email. These are goals, not results yet.

## 6. The riskiest guess

If this is false, the product is pointless: getting a timely reminder about a real outstanding promise is useful enough that N will choose to put her next promise into OpenLoops without me asking. The benefit has to outweigh the effort of entering it.

How I tested it, and what happened: N and Ni each entered two real commitments and updated one without help in the manual trial. That tested whether they could capture and update a promise. I haven't yet tested whether a reminder helps them act or whether that value brings them back on their own.

The next test: with N's agreement, use a real commitment with a near-term check time and manually provide the reminder at that time. Record whether she checks, follows up or finishes the work. Then watch over the following days for her to supply another real commitment without a request from me. Repeat with Ni. Manual reminders test the value before automation; they don't prove the app or email delivery works.

What changed in the plan: the first test is now the full promise-to-reminder-to-action cycle, followed by voluntary capture of another promise. Entering two commitments is not enough to call the risky guess supported. If the reminder helps but neither person returns, I'll find out whether capture is too much work, the reminder is poorly timed or the problem happens too rarely before expanding the build. Technical checks can continue alongside this test, but they cannot answer whether people want the product.

## 7. Milestones

I'm at M0. The first manual trial is recorded, but the value and repeat-use test is still open. The steps below keep the M0–M6 build order from IDEA_SCOPE.md and make the user evidence explicit.

1. **M0 — Test the reason to use it:** I can take a real promise N is waiting on, remind her at the agreed check time and record what she does next. I can run the same test with Ni and start watching for an unprompted next commitment. Separately, I can verify text extraction in both directions, unclear-date handling and a real scheduled email with the app closed, and publish the empty Convex app and GitHub repository.
2. **M1 — Make that useful cycle work in the app:** I can sign in on a phone, save a real commitment, receive its reminder, open the right context and record closure or the next check time. Both directions must work. I'll distinguish test walkthroughs from a reminder that actually helped N or Ni act.
3. **M2 — Check whether the value brings people back:** I can observe N, Ni and Vi using real commitments and record whether they add another without prompting after receiving a reminder. I'll aim for at least nine real commitments and one real-user due email, but invited entries alone won't count as evidence of repeat use. If they don't return, I'll record why and fix the biggest obstacle before adding features.
4. **M3:** I can let a stranger finish on a phone without my help, keep each person's commitments private and record a real visit for review, with read-only access to those numbers.
5. **M4:** I can show the working flow in a video, invite relevant people and record their feedback and use.
6. **M5:** I can share updates, fix problems real users encounter and test a payment offer after people receive value. The price is undecided; payment attempts aren't revenue.
7. **M6:** I can complete two live walkthroughs, including one on another person's device, and submit evidence before 17 October 2026, 11 AM IST. My target is 9 AM.

Last: I can close it, reopen it, and my data is still there—including corrections, history and whether a commitment is closed. I'll check this during the first complete flow and again before submission.

I still need to verify AI access and cost, scheduled reminders and email delivery. I've approved Resend for email delivery from Convex, starting with the free plan; no paid plan is authorized. Account access, a secret sending key and a verified sending domain for real users are still needed. Analytics and any later payment service also need to fit the agreed stack and get approval before being added. The build uses Codex, GitHub and Convex; IDEA_SCOPE.md remains the source for scope decisions.

