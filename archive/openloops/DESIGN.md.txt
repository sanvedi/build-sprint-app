# DESIGN.md

Read this before building or changing any screen. Keep the choices below. Decide routine spacing, wording and responsive details within these rules; ask only when a choice changes the product's promise, adds a feature or changes what happens to someone's data.

This is the screen specification, not a claim that the screens have been built or tested. PRODUCT.md defines the job; IDEA_SCOPE.md defines the build scope.

## 1. The feeling, in labels

- Compact inbox rows: keep the promise, person and check time together for quick scanning.
- Three tabs: Needs You, Waiting and Closed separate attention due from things that can wait.
- Georgia text on white: give the inbox a readable, personal correspondence feel.
- Blue main actions: make the next step clear; secondary actions stay quiet.
- A dedicated loop page: keep the original context and follow-up together when someone needs to act.

## 2. Component patterns

This section is a pattern specification, not a set of inspected image references. We chose an email inbox without requiring external references. The measurements in section 3 and component rules below define what to build. Todoist is only a suggested study page; matching it is not an acceptance requirement. We have not completed the handbook's comparison against concrete component references.

Inbox rows: familiar email-list structure.
Take: aligned rows, a clear main line, supporting details and light separators.
Ignore: folders on the left, avatars, unread dots, bulk-selection boxes, attachments and mail controls.

Interaction study: https://www.todoist.com/ is a suggested page to study, not a verified visual or motion reference. The interactions below are choices for OpenLoops; do not claim they were observed on Todoist.

Inbox row hover: while a pointer rests over a row, change only its background from white to #F5F5F5. Use a short 120 ms fade with no movement or resizing. Return to white when the pointer leaves. Provide a visible keyboard-focus outline; phones must not depend on hovering to reveal actions.

Tabs: the three agreed states above the list.
Take: one obvious selected tab and immediate switching.
Ignore: extra filters, menus and a sidebar.

Loop page: the reading order of an opened email.
Take: the main subject first, supporting details next, then the original message and actions.
Ignore: reply threads, mail toolbars and automatic sending.

Forms: a simple single-column review.
Take: visible labels, editable suggestions and errors beside the relevant fields.
Ignore: setup wizards, profile questions and decorative illustrations.

## 3. Type and colour

Font: Georgia throughout, with the browser's serif fallback. Buttons and inputs use the same font.

Sizes:

- 28 px: page titles.
- 16 px: promises, body text, fields and buttons.
- 14 px: dates, direction labels and supporting details.

Use regular text with bold titles and promises. Body line spacing is about 1.5. Don't use all-capital labels or reduce the text size to squeeze in more rows.

Colours: text #222222 on white #FFFFFF. Main action buttons #1D4ED8 with white text. Errors #B91C1C with words explaining the problem. Supporting text #595959; separators #E5E7EB; subtle hover background #F5F5F5.

Blue is for the main action and a visible keyboard-focus outline. Secondary buttons use white, charcoal text and a light border. Tabs use charcoal text, with a bold label and dark underline for the selected tab. States always have words; colour alone never carries meaning.

Layout: one column, left-aligned. The inbox has a maximum width of 960 px; forms and loop details 680 px. Use 24 px outer spacing on desktop and 16 px on phones. Use light row separators rather than separate cards or shadows. Fields and buttons have small 4 px rounded corners.

Compact rows still have a comfortable tap area: at least 48 px high. On a phone, the promise is on the first line, person and direction beneath, then the check time. Long text wraps without pushing controls off-screen. Full context remains available on the loop page. Buttons and tabs have at least 44 px tap targets.

Dates show an actual date and time, with the confirmed timezone available. Don't rely on Saturday or tomorrow alone. The confirmation form always shows the exact date, time and timezone.

Field label: Check time. Helper text: When should OpenLoops remind you to check? Initially suggest the promised deadline and require confirmation. The original promised deadline remains in the context and history; changing the reminder does not change that promise. Use Check time consistently in rows, forms, notices and history. History wording: Check time set, Check time reached, and Check time changed from [old time] to [new time], with exact dates, times and timezone.

## 4. Screens

The screen list, four lines per screen:

**Entry and sign-in**
Purpose: understand OpenLoops and enter a private account.
Contents: name, approved headline and supporting line, start button, then sign-in when needed.
Main action: Add a loop, then the chosen sign-in method's continue action.
Result: open Add a loop or the intended private loop from an email after sign-in succeeds.

**My loops**
Purpose: see what needs attention and find saved commitments.
Contents: title, Add a loop, three tabs and compact rows in the agreed order.
Main action: Add a loop; opening an existing row remains directly available.
Result: open the capture-and-review page or the selected loop's own page.

**Add a loop — capture and review on one page**
Purpose: turn one supplied promise into a confirmed saved loop.
Contents: original text, then editable proposed details after Review details succeeds.
Main action: Review details in stage one; Save loop in stage two.
Result: open the loop's own page only after saving succeeds.

**Loop detail**
Purpose: check the outcome, prepare a follow-up and record closure or the next check time.
Contents: promise/status, person/check time, context, draft where relevant, actions and history.
Main action: Copy follow-up for a due loop owed by others; Save follow-up while its draft is edited; the chosen form or confirmation takes priority while open.
Result: copying leaves the page open; rescheduling stays here; confirmed closure returns to the inbox.

Flow coverage: the promise and actual work happen outside the app. Entry and Add a loop cover capture; review covers checking AI guesses; detail shows the confirmed save. Background scheduling and email cover the reminder while the app is closed. The email returns to detail for follow-up, closure or rescheduling. No separate page is needed for processing, closure confirmation or changing the check time.

### Public entry and sign-in

For understanding the promise and entering a private account.

Top to bottom: OpenLoops name, headline, supporting sentence, Add a loop button. No sample counts, user quotes or private loops.

Main action: Add a loop → sign-in if needed → capture. Signed-in users go directly to capture. Sign-in uses Convex Auth and preserves the intended destination when opened from an email. The specific sign-in method follows the auth setup; this document does not select a new service.

Loading: Signing you in…
Error: Couldn't sign you in. Try again.
Recovery: keep the sign-in form and any non-secret entered details visible. Show Try again to retry sign-in without restarting the entry flow. Never display credentials in an error. Preserve the intended capture or email-link destination; go there only after sign-in succeeds. If the chosen sign-in method requires another step, show its instructions rather than claiming sign-in is complete.
Done: open capture, or the intended loop from an email link.

### My loops

For finding what needs attention and adding another commitment.

Top to bottom: My loops title and Add a loop button; Needs You, Waiting and Closed tabs; compact rows.

Needs You opens first. Needs You sorts by oldest check time first; Waiting by soonest check time first; Closed by most recently closed first.

Each row shows the promise, person, check time and direction beside the person's name: Waiting on others or Others waiting on me. Tapping a row opens its own detail page. On phones, the header button can sit below the title; tabs stay above the rows.

Main action: Add a loop → capture.
Needs You empty: Nothing needs your attention right now. Add a loop, or check Waiting.
Waiting empty: No loops waiting. Add a loop to track a promise.
Closed empty: No closed loops yet.
Loading: Loading your loops…
Error: Couldn't load your loops. Try again. Show a Try again button; don't show an empty state for a failed load.
Done after closure: Loop closed.

### Add a loop — stage 1: capture

For entering one promise without connecting an inbox.

Top to bottom: Back to inbox; Add a loop title; instruction; labelled multiline text field; Review details button.

Instruction: Paste or describe one promise: who owes what and when.
Field label: The commitment.
Example placeholder: Students said they would send the report by Saturday.

Main action: Review details → reveal the review stage on this same page. Keep the entered text visible, move keyboard focus to the review heading and retain the text through failures. Once review is open, Save loop replaces Review details as the main action. Don't create a separate confirmation page.
Empty: Enter a commitment to review.
Loading: Checking the details…
Error: Couldn't check the details. Your text is still here.
Recovery buttons: Try again retries processing the visible text; Enter details yourself reveals the same-page review form without invented details. Try again is the main recovery action; manual entry is secondary.
No commitment found: No clear commitment found. Check your text or enter the details yourself.
Several commitments found: This text contains more than one promise. Choose one to track. Keep the original text visible and show the detected promises as plain-language choices. N selects one, then presses Review details to review only that commitment. Also offer Edit text, returning focus to the existing text field, and Enter details yourself, opening the confirmation form for one commitment with the original text retained as context. Don't choose the first promise automatically or save several loops at once. If the suggestions are unclear, N can use either recovery action. This selection is part of capture, not another page.
Done: reveal the same-page review form; nothing is saved yet.

### Add a loop — stage 2: review

For checking the proposal before saving a private loop and setting an alert.

Top to bottom: the existing page title and original text; Review details heading; direction; expected outcome; person or group; Check time (exact date and time); timezone; reminder email; editable context; Save loop button. A secondary Edit text action returns to stage one on this page. If the source changes, don't overwrite manual corrections automatically: explain that reviewing again replaces the current proposals and ask before doing so.

Direction choices: Waiting on others and Others waiting on me. Label uncertain suggestions Check this. Missing fields remain empty with a specific instruction, such as Choose a check time. Don't pre-confirm guesses. Email and timezone may be reused once confirmed; display them so the user can check them.

Main action: Save loop → its own page, only after saving succeeds.
Past check time notice: This check time has passed. Saving will mark this loop Needs You and send one email now.
Empty or incomplete: Check the highlighted details before saving.
Loading: Saving…
Error: Not saved. Your changes are still here. Try again.
Recovery: keep all entered text and corrected fields visible. Try again retries saving the confirmed visible details; Edit details returns focus to the form without clearing it. A missing or invalid field stays visible with a specific correction instruction; focus the first invalid field when saving is attempted. Do not activate an alert while required details remain unconfirmed.
Done: Loop saved on the detail page. Future check time means Waiting; a confirmed past check time means Needs You and one immediate email after saving.

Leaving an unsaved capture/review: retain the entry while switching between the two stages. Before navigating out of Add a loop, ask Leave without saving this loop? Offer Keep editing and Leave without saving. Warn on browser refresh/close where supported. Unconfirmed input is not guaranteed after a forced browser close and is never shown as a saved loop.

### Loop detail

For acting with the original context and recording the result.

Top to bottom:

1. Back to inbox; promise and status.
2. Person, direction, check time and reminder destination.
3. Original context.
4. Editable follow-up draft for Waiting on others, with Save follow-up and Copy follow-up. For Others waiting on me, show the promised work instead; it is completed outside the app.
5. Close loop and Set next check time.
6. Timestamped history, including reminder attempts and any delivery trouble.

Needs You means it is time to check; it doesn't prove non-delivery. Ask Has this arrived? for promises owed by others. Never label them as failed automatically.

Action emphasis follows what N needs to do, rather than making closure the default:

- Outcome unknown: N sees Has this arrived? with the report promise, person and original context. She checks the conversation or her files outside OpenLoops. There is no blue Close loop button urging her to finish an unchecked promise. For a due loop waiting on someone else, Copy follow-up is the blue action beside the draft; Set next check time and Close loop are secondary. Reading the question is not an answer, and opening the page does not change the state.
- Still outstanding: after checking, N can edit and copy the follow-up, then send it herself outside OpenLoops. Copy follow-up stays prominent when the draft has no unsaved edits. If she is waiting longer, Set next check time opens its form, where Save check time becomes that form's blue action. Copying does not close the loop or prove that she sent the message.
- Known finished: N uses the secondary Close loop action. In the existing confirmation panel, Is this commitment finished? is the question and Close loop is the blue action. Only her confirmation and a successful save mark it Closed and return her to the inbox.

These situations describe N's knowledge, not new stored states or new outcome-selection controls. OpenLoops cannot automatically tell whether a report arrived. The page must not change its emphasis based on a guessed delivery result. While the next check time is still in the future, emphasize the date and Waiting status; don't present a follow-up as urgent.

For Others waiting on me, N sees what she promised and does that work outside the app. Close loop and Set next check time remain secondary on the reading page; their existing confirmation/form has the blue action when she chooses one. A Closed loop shows context and history without active close or reschedule controls. Reopening closed loops is outside this design.

Only one action is visually primary at a time. A read-only own-commitment or future-check page need not force a blue action when no action is due. While editing a follow-up, Save follow-up takes priority. When the reschedule form or close confirmation is open, its save/confirm action takes priority; don't also emphasize Copy follow-up. Resolve unsaved draft edits before opening either flow. The app never invents an arrived/outstanding state to drive this hierarchy.

Follow-up saving is explicit, not automatic:

- N opens the last saved draft and edits it beside the original context. As soon as she changes it, show Unsaved changes. Save follow-up becomes the blue action within the draft section; Copy follow-up becomes secondary. Keep the rest of the page visible.
- Save follow-up saves the edited text to this private loop. While it is being saved, show Saving follow-up… and prevent repeat submission. Keep the text visible and temporarily prevent editing so the saved result is unambiguous.
- After saving is confirmed, show Follow-up saved and make Copy follow-up prominent again. The confirmed draft survives leaving the page, reopening the app and opening the loop on another signed-in device. Do not regenerate over saved user edits when the loop is opened.
- If saving fails, show Follow-up not saved. Your edits are still here. Provide Try again, which retries saving the visible draft. Keep the editor and edits on the same page. Do not show a saved result or navigate away.
- Copy follow-up copies the editor's current text; it neither saves nor sends it. If N copies unsaved edits, say Follow-up copied. Changes are not saved. Keep Unsaved changes visible until she saves.
- If N tries to leave the page or close the loop with unsaved draft edits, ask Save your follow-up changes? Offer Save and continue, Keep editing and Discard changes. Save and continue completes the requested action only after the draft save succeeds; failure keeps her here with her edits. Discard changes restores the last saved draft before continuing. These are protections for the existing editable draft, not a new workflow.
- Warn before refreshing or closing the browser when edits are unsaved, using the browser's standard warning where supported. Unsaved edits are not promised to survive a forced close or refresh. On reopening, load the last confirmed saved draft. Never call copied or unsaved text preserved across sessions.

Loading: Loading this loop…
Unavailable or another person's loop: This loop isn't available to your account. Show Back to inbox and reveal no private details.
Load error: Couldn't load this loop. Try again.
Load recovery: show Try again, which reloads the same loop, and Back to inbox, which returns to My loops. Keep the intended loop address and visible page structure; don't substitute an empty loop or allow changes until its details load successfully. If a refresh fails after the loop was already visible, keep the last loaded details labelled Couldn't refresh this loop, preserve local draft edits, and prevent unconfirmed updates until access and current data are checked again.
Copy success: Follow-up copied.
Copy error: Couldn't copy. Select the text and copy it yourself.
Email failure: Reminder email couldn't be sent. This loop still needs your attention. Show the recorded delivery status without claiming receipt or reading.

Show storage and reminder results separately: Loop saved confirms storage only. Reminder status can say Scheduled for [check time], Sending reminder…, Email accepted for delivery, Delivery trouble — retry pending, or Delivery trouble — retries exhausted, based on recorded results. Never say received or read without evidence. On repeated failure, keep Needs You and the failure details visible; offer Try again only if the backend can safely retry this same reminder without deliberately duplicating it. Otherwise say Check this loop here while delivery is unavailable. Do not create a fake email retry button.

Close flow: ask Is this commitment finished? Buttons: Close loop and Keep open. Keep open returns to the unchanged detail page. After confirmation, save Closed, cancel pending reminders, return to the inbox and show Loop closed. Return to the default Needs You tab. If saving fails, stay on the detail page and show the save error.

Closing in progress: show Closing loop… in the confirmation panel; keep the promise visible underneath and prevent repeated submission. On failure, keep the confirmation panel open with Couldn't close this loop. Try again. Buttons: Try again retries closure of this same loop; Keep open dismisses the panel without claiming closure. Preserve draft edits and the last confirmed loop state. Only a confirmed successful closure returns to the inbox.

Close confirmation presentation: use a small centred panel over the detail page with a light darkened backdrop, not a separate page. On phones, keep 16 px space at either side and let long content scroll. Open without sliding or scaling. Put keyboard focus on Keep open initially, keep keyboard navigation inside the panel, and let Escape cancel before saving begins. Cancelling restores focus to Close loop on the detail page. Announce the question to assistive reading tools. While closure is saving, show Closing loop… and prevent repeat confirmation; do not hide a failed save or discard the page underneath.

Set next check time: open a date-and-time form on the detail page, keeping the promise visible. Show the timezone. Buttons: Save check time and Cancel. Cancel leaves the saved date unchanged. Require a future check time for this reschedule flow. After saving succeeds, return the loop to Waiting, replace its pending reminder, stay on the detail page, show the new date and Check time updated. On failure, preserve the entered date and time and show the save error.

Rescheduling in progress: show Saving check time… in the inline form, keep the entered date, time and timezone visible, and prevent repeated submission. On failure, keep the form and entered values with Not saved. Your changes are still here. Try again. Buttons: Try again retries the entered check time; Cancel closes the form without changing the last confirmed check time. Only a confirmed successful save changes the displayed status and check time.

## 5. The first screen's words

Headline: Stop keeping every promise in your head.

Under it: Juggling promises from work and family? Save who owes what and when, and get an email when it's time to check.

Button: Add a loop → sign-in if needed, then capture.

The wording covers work and family; the real user evidence so far is from N and Ni's professional commitments. Don't add family-use testimonials or claims without evidence.

Copy comprehension check, still to run: show these three lines to someone unfamiliar with OpenLoops for five seconds, then hide them and ask what the product does and what Add a loop starts. Record their actual answers. They should understand that they supply a promise, check its details and get a reminder email; it does not read their inbox or send messages for them. Keep the approved copy until this test supplies a concrete misunderstanding. If loop is unclear, adjust the explanation or propose one consistent action-name change across screens rather than silently renaming a single button. No participant result is claimed here.

## 6. Principles

- Show the promise, person and check time together. Direction and state are separate.
- Use the same action words everywhere: Add a loop, Review details, Save loop, Close loop and Set next check time.
- Never show a saved, closed or updated result before the save succeeds. Preserve input and edits when something fails.
- Email brings people back. Don't require daily inbox checking, claim to monitor outside conversations or imply that copying sends a follow-up.
- No private details before owner sign-in. An email link returns to the intended loop after sign-in.
- Keep forms labelled, readable and usable with a keyboard. Show focus, connect errors to fields and announce saving results to assistive reading tools.
- Support narrow phones and enlarged text without horizontal page scrolling. Keep compact rows easy to tap.
- Use restrained feedback, no decorative motion or automatic animations. Respect reduced-motion settings.
- Disable repeat submission while saving, but keep the person's entered work visible. Don't depend on colour or transient messages alone to show the result.
- Keep v1 to text capture and the agreed flow. No sidebars, extra filters, generated art, screenshots or new product features.
- Decide routine details within this document. Ask only about a material change to the product, access to private data or an action not covered by the agreed scope.

Specification review complete: each core-flow step has a place, capture/review share one page, detail actions follow the user's situation without new states, and save/retry behavior is defined. Still untested: actual phone layout, keyboard/focus behavior, preservation of input, private access, scheduling/email delivery and the five-second copy check. Verify these during the relevant build milestone before calling the screens working.

