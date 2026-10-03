# IDEA_SCOPE.md

> This document is the control plane for the build. Your coding agent
> reads it before every session. If a proposed change does not improve
> the active milestone's acceptance test or rubric strategy, it goes in
> the parking lot.

## 0. scope status

  Field                 Value
  --------------------- --------------------------------------
  Event                 GrowthX Build Sprint · Season 04
  Builder               you, solo, plus Codex or Claude Code
  Build starts          Fri 2 Oct 2026, 11:00 AM IST
  Submission deadline   Sat 17 Oct 2026, 11:00 AM IST
  Current milestone     M0
  Live URL              
  Public repo           
  Last updated          Fri 2 Oct 2026

### status language

-   **Specified:** described but not implemented.
-   **Implemented:** code exists.
-   **Working locally:** golden path runs locally.
-   **Live:** golden path runs at the public URL on a phone.
-   **Verified:** acceptance tests passed live.
-   **Demo-ready:** fallback, timing and evidence rehearsed.

## 1. idea lock

  -----------------------------------------------------------------------
  Decision                            Locked answer
  ----------------------------------- -----------------------------------
  One-sentence product                **OpenLoops is an AI-native
                                      personal follow-through system that
                                      turns messages, screenshots and
                                      notes into unresolved dependencies,
                                      watches them, and tells the user
                                      when something needs attention.**

  The one person                      N --- senior colleague; busy
                                      higher-education professional
                                      coordinating colleagues, vendors
                                      and administrative dependencies

  The one moment                      Someone says "I'll
                                      send/pay/approve/confirm it by X,"
                                      and N needs to stop carrying that
                                      promise in her head

  Current workaround                  Memory, WhatsApp
                                      stars/self-messages, unread email,
                                      notebooks, calendar/task reminders
                                      and reopening old conversations

  Core action                         User pastes/types/uploads what
                                      happened → gets a confirmed open
                                      loop containing what is expected,
                                      from whom, by when and its state

  One outcome                         User can stop remembering the
                                      dependency and still intervene
                                      before an important outcome is lost

  Hard input                          Messy screenshot/conversation where
                                      obligation/date are implicit or
                                      ambiguous

  Primary track                       Revenue

  Riskiest assumption                 Users have enough consequential
                                      unresolved dependencies, and trust
                                      the workflow enough, to repeatedly
                                      put real loops into it

  30-minute no-code test              Ask N and Ni what they are waiting
                                      for; then inspect
                                      WhatsApp/email/notes and count
                                      forgotten loops. Manually structure
                                      3--5 real loops and test whether
                                      they entrust them to the system

  First three users                   N --- senior colleague; Ni ---
                                      colleague; Vi --- MBA graduate

  Tuesday channel                     **Must be confirmed during M2.**
                                      Identify one existing
                                      faculty/administrator/management
                                      group or feed; do not invent one

  Personal artifact                   "What I'm still waiting for"
                                      dashboard: Needs You / Waiting /
                                      Watching / Closed

  Saturday numbers                    10 genuine users; target \~100
                                      genuine open loops; 3+ pain
                                      conversations with quotes; ≥1
                                      documented rescued/followed-up
                                      loop; genuine payment attempt after
                                      value

  Library lineage                     None; lived problem
  -----------------------------------------------------------------------

### why this idea

#### the pain I feel

Important outcomes depend on other people: quotations, approvals,
reimbursements, documents, contacts, payments and confirmations.
Promises arrive across WhatsApp, email, calls and conversations.
Information may be saved, but its **state is not tracked**. The builder
has personally missed follow-ups because commitments disappeared into
memory, notebooks or messages.

#### decisive proof

A stranger supplies a fresh messy message/screenshot. OpenLoops
identifies what is expected, who is responsible and when; the user
confirms it; the loop persists. A genuine overdue loop appears under
**Needs You** with original context and a prepared follow-up. Genuine
Convex rows prove real usage.

## 2. user and job

### user

-   Who: N, 58, senior higher-education professional.
-   Context: coordinates colleagues, vendors and administrative
    dependencies.
-   Frequency: several promises/approvals/documents can be open
    simultaneously.
-   Existing behaviour: memory, notes, stars, unread email,
    self-messages and reminders.
-   Cost: mental load, late intervention, delayed outcomes, missed
    deadlines/money.

### job to be done

> When someone or an organisation promises me a future outcome, I need
> to hand that unresolved dependency to a trusted system, so that I can
> stop remembering it myself and still intervene before it is lost.

### definition of completion

1.  Dependency is captured with enough context to understand later.
2.  Product distinguishes "nothing to do yet" from "intervention needed
    now."
3.  User can act with original context and close the loop.

Extraction alone does not count. Completion requires a saved commitment, a due-time email linking to the loop, and a way to follow up or mark complete.

## 3. product contract

### golden path

1.  User types/pastes text describing a commitment in either direction. Screenshot capture is deferred.
2.  AI proposes **waiting for**, **from whom**, **expected by**,
    **context** and uncertainty.
3.  User confirms/corrects.
4.  Loop persists in Convex as **Waiting**, with direction **Waiting on others** or **Others waiting on me**.
5.  Expected time passes → loop moves to **Needs You** → contextual
    follow-up is prepared → user acts/closes it.

### inputs

  -----------------------------------------------------------------------
  Input             Format/source     Hard              Validation
                                      characteristics   
  ----------------- ----------------- ----------------- -----------------
  Commitment        text              informal wording, show fields for
                                      relative dates,   confirmation
                                      implicit promise  

  Screenshot        PNG/JPG           multiple          expose
                                      messages, noise,  uncertainty; user
                                      implicit          confirms
                                      owner/date        

  Timing            extracted +       "tomorrow",       show normalized
                    correction        "Friday", "7--10  timestamp
                                      days"             
  -----------------------------------------------------------------------

### outputs and state changes

  ------------------------------------------------------------------------
  Output/state      Consumer          Required format    Proof
  ----------------- ----------------- ------------------ -----------------
  Structured open   user              outcome,           Convex row + card
  loop                                counterparty,      
                                      expected date,     
                                      context, status    

  State transition  user              Waiting/Watching → timestamped
                                      Needs You → Closed history

  Follow-up         user              concise editable   visible draft
                                      message            

  Resolution        user              closed + timestamp persists after
                                                         reload
  ------------------------------------------------------------------------

### what the product must remember

-   Within session: raw input, extracted fields, corrections.
-   Across sessions: user, loop, context, expected date, status,
    timestamps, state history, follow-up, resolution.
-   Deliberately forget: credentials and unnecessary deleted/test
    content.

### human review boundary

-   Automate: extraction proposal, date proposal, state calculation,
    follow-up draft.
-   Confirm: ambiguous loop creation, owner/outcome/date changes,
    closure in M1.
-   Escalate: missing date, unclear counterparty, no actual obligation.
-   Expose uncertainty instead of inventing facts.

## 4. what makes it different

### the obvious version

AI reminder/task app: paste sentence → extract task → set reminder.

### the non-obvious choice

The object is an **open commitment**: either I am waiting on someone, or someone is waiting on me. The system stays
quiet while responsibility sits elsewhere and surfaces the loop only
when intervention is warranted.

### the moment they screenshot

The personalized **What I'm still waiting for** view with Needs You /
Waiting / Watching / Closed and a loops-closed count.

### ideas deliberately rejected

  Rejected mechanic                     Reason
  ------------------------------------- -----------------------------------------------
  Automatic WhatsApp monitoring in M1   integration/privacy risk
  Automatic Gmail monitoring in M1      OAuth scope can consume sprint
  Autonomous sending                    trust boundary; user-approved draft is enough
  General task manager                  destroys wedge
  CRM/team workspace                    wrong initial scope
  Money-recovered claims                cannot verify reliably in v1

## 5. dependencies

### verified capability matrix

  ---------------------------------------------------------------------------------------------------
  Capability                      Product/API/model   Access          Limits           Verified how
  ------------------------------- ------------------- --------------- ---------------- --------------
  Backend/database/auth/hosting   Convex + Convex     fixed sprint    event-required   bundled event
                                  Auth                stack                            brief

  Repository                      GitHub              public repo     must open        bundled event
                                                                      privately        brief

  Coding agent                    Codex or Claude     project/local   fixed sprint     bundled event
                                  Code                                stack            brief

  Text extraction                 AI model/API        **unverified    structured       test 10
                                                      until M0**      extraction on    examples
                                                                      hard cases       

  Screenshot understanding        multimodal          **unverified    recoverable      test 3 real
                                  model/API           until M0**      ambiguity        screenshots

  Timed transition                Convex              **verify M0**   real timestamp   create
                                  scheduled/backend                   transition       10-minute loop
                                  logic                                                
  ---------------------------------------------------------------------------------------------------

### unsupported assumptions

Not on critical path: automatic Gmail/WhatsApp ingestion, autonomous
sending, third-party reply monitoring, automatic external resolution,
monetary recovery calculations. If screenshot extraction fails M0, fall
back to typed/pasted text.

### secrets and access

Secrets live in environment variables, never this document or public
repo.

## 6. rubric strategy

### primary track

  -----------------------------------------------------------------------
  Decision                            Answer
  ----------------------------------- -----------------------------------
  Primary track                       Revenue

  Why                                 Direct access to users; limited
                                      time should go to real usage and
                                      product quality

  Track requirement                   Named user with pain; genuine
                                      payment attempt after demonstrated
                                      value
  -----------------------------------------------------------------------

### the track's rows

  ---------------------------------------------------------------------------------------
  Row                 Weight Current     Target            Observable proof   Milestone
  ----------- -------------- ----------- ----------------- ------------------ -----------
  Signups                20x L1          **L2 (1--50)**;   Convex             M2--M5
                                         stretch L3        genuine-user count 

  Live                    8x L1          **L3: working     stranger completes M1--M3
  product                                product**         live golden path   
  quality                                                                     

  Revenue                 4x L1          **L2 if genuine   processor evidence M5
  generated                              payment**                            

  Waitlist                4x L1          L1/L2 only if     real records       M5
                                         organic                              

  Pain                    2x L2          **L4: 3+          interview evidence M0--M2
  severity                               conversations +                      
                                         quotes**                             

  SOM                     2x L1          L3                users × realistic  M5
                                                           ACV                

  Right to                2x L3          L4                lived examples +   M1--M5
  win                                                      access + visible   
                                                           insight            

  Why now                 1x L1          L2--L3 only if    cited evidence     M5
                                         verified                             

  Moat                    1x L1          L2--L3            repeat             M5
                                                           workflow/history   
  ---------------------------------------------------------------------------------------

### bonus-eligible rows

Claim only if they come free and have required evidence. Install
read-only analytics in M3. Do **not** spend critical-path time building
AI-Agent-track architecture.

### where the points are

1.  Signups (20x): genuine users complete first-use flow.
2.  Live product quality (8x): one complete dependency workflow at live
    URL.

### competence floor

Pain severity through real interviews. SOM/right-to-win/why-now/moat get
limited time after product is live.

### rubric traps

No test accounts as signups. No staged surfaces called real. No
double-counting evidence. No visitor claims without read-only analytics.

## 7. gtm plan

### where the users already are

  ---------------------------------------------------------------------------------------
  Channel                    Who               Reach                    When
  -------------------------- ----------------- ------------------------ -----------------
  Direct professional        N, Ni, Vi +       DM/call                  Mon 5--Wed 7
  network                    colleagues                                 

  Existing                   **identify during permission-appropriate   confirm by Tue 6
  faculty/admin/management   M2**              post/DM                  
  group                                                                 

  Second-degree professional colleagues'       introductions            Sun 11 onward
  network                    contacts                                   
  ---------------------------------------------------------------------------------------

### distribution posts, in my own words

-   Monday: "I keep losing track of things other people said they would
    send, approve or pay. I built a tiny system that watches those loose
    ends for me. I'm testing it with real commitments this week."
-   Tuesday launch: "What are you waiting for right now? Paste the
    message or screenshot into OpenLoops; it turns the promise into
    something it watches until you need to act."
-   Wed--Fri: one concrete change + one honest number each evening.
-   Saturday: what shipped, number of real users/open loops, one rescued
    outcome.

### targets

  -----------------------------------------------------------------------
  Row               Floor             Stretch           Source
  ----------------- ----------------- ----------------- -----------------
  Revenue signups   L2: 1--50         L3: 51+           Convex

  Live product      L3                L4 only if        live URL
  quality                             genuinely         
                                      polished          

  Revenue           genuine L2        L3 only if        processor
                    attempt           organic           

  Pain severity     L4                L5 only if        interviews
                                      evidence          
                                      qualifies         

  Visitors bonus    measured honestly relevant band if  read-only
                                      reached           analytics
  -----------------------------------------------------------------------

### analytics setup

-   Install PostHog/Plausible/GA4/Datafast by M3; choose fastest.
-   Create read-only access and save it.
-   Signup/first-use writes to Convex.
-   Payment link only after repeat-use/value signal.

### numbers I will report

One line per Revenue row with proof. Also: genuine open loops, users
adding a second loop, overdue loops surfaced, follow-ups triggered,
loops closed.

## 8. the milestone ladder

### M0 --- feasibility and setup (Fri 2 Oct, before 3:00 PM)

**Purpose:** kill the unknown critical dependency and riskiest
assumption early.

Required: - Setup complete: GitHub, Convex, coding agent. - Run
30-minute N/Ni no-code test; write result. - Test 10 text examples and 3
screenshots against chosen model/API. - Verify one real 10-minute
timestamp transition path. - Repository created; empty app deployed to
Convex.

**Acceptance test:**\
\> Empty app is live; repo exists; no-code result written; extraction
and timed transition have pass/fail evidence.

**Stop condition:**\
\> If core extraction/timed state cannot work by 5 PM Friday, fall back
to typed text + explicit expected date. If users reveal few meaningful
open loops or refuse to entrust any, reconsider before further build.

### M1 --- one ugly complete flow (Fri 2 evening → Sun 4)

**Purpose:** smallest end-to-end core action.

Required: - typed/pasted input; screenshots deferred; -
extraction + confirmation; - Convex persistence; - dashboard states; -
real timed transition; - follow-up draft; - manual close; - deploy/push
every session.

Explicitly excluded: Gmail/WhatsApp integration, auto-send, teams,
polish.

**Acceptance test:**\
\> New user creates a real loop at the live URL; it persists; a
short-timestamp loop naturally moves to Needs You; follow-up is
generated; user closes it.

**If behind, cut to:** typed text only; user confirms date manually;
three states only: Waiting / Needs You / Closed.

### M2 --- first users (Mon 5 → Wed 7)

**Purpose:** three people with the problem use it while observed.

Required: - N, Ni, Vi use real loops; - genuine first-use rows in
Convex; - request at least 3 real loops per user; - one sentence on
where each stopped; - record whether each voluntarily adds another
loop; - identify Tuesday distribution channel; - Wednesday Q&A for
blocker.

**Acceptance test:**\
\> Three non-builder users in Convex; ≥9 real loops; blocker named;
repeat-capture signal recorded.

**If behind, cut to:** one user on screen share with 3 genuine loops.

### M3 --- finish the build (Thu 8 → Fri 9)

Required: - fix largest M2 blocker; - core works logged out/on
phone/other device; - analytics + read-only access; - one-sentence
landing page + CTA.

**Acceptance test:**\
\> Stranger completes core job and visit appears in analytics.

**If behind, cut to:** fix only the blocker stopping most users; no new
features.

### M4 --- sell week opens (Sat 10 → Sun 11)

Required: - GTM video; - launch post in confirmed channel; - direct
invites Sunday; - record invites/visitors/signups; - fix only real-user
blocker.

**Acceptance test:**\
\> Video exists; invites sent; weekend evidence captured.

**If behind, cut to:** 20 direct messages + one screen recording; no
edited video.

### M5 --- go live and iterate (Mon 12 → Fri 16)

Required: - Monday social launch; - Tue/Wed/Thu updates; - Wednesday Q&A
with real objections; - payment/intent test only after demonstrated
value; - collect quotes and objections; - Friday: last changes, then
evidence gathering.

**Acceptance test:**\
\> Four posts/updates live; CHANGELOG line for each product change;
genuine payment attempt made if repeat-use signal exists.

**If behind, cut to:** post once, message 30 relevant people directly,
log objections, protect core flow.

### M6 --- verify and submit (Fri 16 night → Sat 17, 11 AM)

**Purpose:** no new features.

Required: - core works logged out/on phone; - data persists; - public
repo opens privately; - Revenue-row evidence captured; - read-only
analytics shared; - self-score every row; - honest submission
paragraph; - submit by 9 AM target; 11 AM hard cutoff.

**Acceptance test:**\
\> Two consecutive proof walkthroughs on live URL, one on someone else's
device.

## 9. proof contract

### one-sentence setup

> OpenLoops remembers the outcomes other people owe me, so I only have
> to think about them when something needs my attention.

### the proof

  ------------------------------------------------------------------------
                   Time What happens     What reviewer    Rubric row
                                         sees             
  --------------------- ---------------- ---------------- ----------------
                 0--15s explain one real promise normally pain severity
                        dependency       carried in       
                                         memory           

                15--60s fresh messy      extraction →     live product
                        input            confirmation →   quality
                                         persisted loop   

                60--90s show genuine     Needs You +      live product
                        overdue loop     context +        quality /
                                         follow-up; then  signups evidence
                                         source evidence  
                                         separately       

               90--120s show what broke  user feedback +  pain severity
                        and changed      resulting change 
  ------------------------------------------------------------------------

### the input a stranger will arrive with

A real message/note such as: "Spoke to Rahul --- he'll send the revised
photographer quotation by Wednesday; need to finalize before Saturday."

### fallback input, if the live one fails

A short typed commitment with a real near-future time: "Amit will send
the revised proposal in 10 minutes."

### the number I lead with

**Genuine open loops entrusted to OpenLoops**, followed by genuine
users. Do not substitute this for the rubric signup count.

### claims I can prove

-   real users captured real unresolved dependencies;
-   the live product persisted and surfaced them;
-   at least one loop reached Needs You on a real timestamp;
-   any user quote or payment shown has source evidence.

### claims I must not make

-   automatic WhatsApp/Gmail monitoring unless actually live;
-   automatic external resolution unless actually implemented;
-   money recovered/protected without evidence;
-   "autonomous agent" claims based on staged/manual flows.

## 10. test plan

### golden cases

  -----------------------------------------------------------------------------
  Case              Why               Expected final output   Status
                    representative                            
  ----------------- ----------------- ----------------------- -----------------
  Explicit          easiest common    correct                 Specified
  promise/date      case              outcome/person/date +   
                                      Waiting                 

  Relative date     common            normalized date         Specified
                    conversational    confirmed by user       
                    form                                      

  Messy screenshot  hard real input   uncertain fields        Specified
                                      exposed, then confirmed 
  -----------------------------------------------------------------------------

### failure cases

  -----------------------------------------------------------------------
  Failure           Expected          User recovery     Tested?
                    behaviour                           
  ----------------- ----------------- ----------------- -----------------
  Ambiguous input   flag ambiguity;   edit fields       No
                    do not silently                     
                    create wrong loop                   

  Unsupported/no    say no trackable  type/correct      No
  obligation        dependency found  manually          

  API               preserve input    retry/manual      No
  timeout/failure   and show retry    entry             

  Empty result      no loop created   manual entry      No
  -----------------------------------------------------------------------

## 11. risk register

  ----------------------------------------------------------------------------------------------
  Risk              Probability   Damage      Earliest test Mitigation         Fallback
  ----------------- ------------- ----------- ------------- ------------------ -----------------
  Users do not      High          Critical    M0/M2         test real loops    stop polishing;
  repeatedly                                                and second-loop    reconsider
  capture loops                                             behaviour          

  Integration scope High          Critical    immediately   ban integrations   manual
  consumes sprint                                           from M1            text/screenshot

  Extraction/date   Medium        High        M0            confirmation +     manual fields
  errors                                                    uncertainty        

  Timed transition  Medium        High        M0            real               calculate Needs
  unreliable                                                short-duration     You on page
                                                            test               load/query

  Looks like task   Medium        High        M1 user test  dependency-first   remove task-like
  manager                                                   states/copy        features

  Distribution      Medium        Medium      M2            identify one real  30 targeted DMs
  channel unclear                                           group + direct     
                                                            outreach           

  Privacy concern   Medium        High        M2            minimal capture,   typed summary
  blocks adoption                                           explicit user      instead of
                                                            control            screenshot
  ----------------------------------------------------------------------------------------------

### pre-mortem

It is 11:00 AM on Saturday 17 October and the product is not submitted,
or is submitted with no users, because:

1.  I spent the sprint integrating Gmail/WhatsApp instead of proving the
    open-loop workflow.
2.  People liked the concept but did not entrust real dependencies or
    add a second loop.
3.  The live product looked like an AI reminder app rather than a
    stateful unresolved-dependency system.

Mitigations are locked above: no integrations in M1; repeat-capture is a
validation metric; dependency states must be visible in the product.

## 12. non-goals

Explicitly outside this sprint:

1.  Automatic Gmail/WhatsApp monitoring and automatic external reply
    detection.
2.  Autonomous follow-up sending, team CRM/project management and
    multi-agent architecture.
3.  Monetary recovery calculations, broad personal-assistant
    functionality and speculative integrations.

Any change requires a written scope decision in section 15.

## 13. parking lot

  ---------------------------------------------------------------------------
  Idea              Potential value   Why not now           Revisit after
  ----------------- ----------------- --------------------- -----------------
  Gmail             low-friction      OAuth + trust + scope repeated manual
  auto-detection    capture/closure                         capture proven

  WhatsApp          strongest source  integration/privacy   post-sprint
  ingestion         coverage          risk                  

  Auto-resolution   removes           depends on source     post-sprint
  from replies      maintenance       integration           

  Auto-send         stronger          trust/safety boundary after user
  follow-ups        completion                              approval workflow
                                                            works

  Team/shared loops organisational    changes ICP/data      individual
                    value             model                 retention proven

  Money rescued     strong reward     hard to verify        verified monetary
  metric            artifact                                cases exist
  ---------------------------------------------------------------------------

## 14. current state

### active milestone

**M0 --- feasibility and setup**

### implemented

-   None yet.

### working locally

-   None yet.

### live

-   None yet.

### verified

-   Idea lock approved.
-   Revenue chosen as primary track.
-   First users identified: N, Ni, Vi.

### current blocker

The riskiest assumption and critical extraction/timed-transition
capabilities have not yet been tested.

### next single action

**Run the 30-minute no-code test with N and Ni before asking the coding
agent to build product features.**

## 15. decision log

  ---------------------------------------------------------------------------
  Time              Decision          Evidence/reason       Scope impact
  ----------------- ----------------- --------------------- -----------------
  Fri 2 Oct 2026    Lock OpenLoops   lived pain + direct   stop ideation
                                      user access +         
                                      approved idea lock    

  Fri 2 Oct 2026    Revenue primary   direct access and     optimize
                                      24-hour constraint    signups + live
                                      favour real           quality
                                      users/product quality 

  Fri 2 Oct 2026    No Gmail/WhatsApp integration risk      manual
                    integration in M1 threatens Sunday flow text/screenshot
                                                            capture

  Fri 2 Oct 2026    Unresolved        differentiates from   state model
                    dependency is     task/reminder apps    drives UI/data
                    core object                             

  Fri 2 Oct 2026    M0 begins with    sprint requires       no product
                    validation        riskiest-assumption   feature work
                                      test first            before test
                                                            result
  ---------------------------------------------------------------------------


## 16. approved scope update ? 2 October 2026

This update records the builder's decisions from the scope discussion. It overrides conflicting wording above; the broader product is OpenLoops, and this sprint implements the two directions below. No product code has been written as part of this update.

### revised idea lock

| Decision | Locked answer |
|---|---|
| Product | OpenLoops turns a pasted commitment into a saved loop, emails the user when it needs attention, and lets them follow up or complete it. |
| One person | N, 58, a higher-education professional coordinating students and colleagues. |
| One moment | Students promise a report by Saturday. Saturday's deadline passes without submission, and N forgets to follow up. Exact location and time of day have not been supplied. |
| First direction | Waiting on others: students owe N a report by Saturday. |
| Second direction | Others waiting on me: N owes students feedback by Monday. This is an illustrative case, not a verified user incident. |
| Core action | User pastes a commitment ? gets a confirmed, saved loop with who owes what, a deadline, and an email when attention is due. |
| Outcome | The user can stop carrying captured commitments in their head and receive a prompt to act at the confirmed deadline. |
| States | Waiting / Needs You / Closed. Direction is separate from state. Watching is deferred. |
| Alert channel | Email, including when the app is closed. A dashboard alone does not satisfy v1. |
| Primary track | Revenue, unchanged. |
| Validation | Builder reports N and Ni each entered two real commitments and updated one without help. Initial capture/update test passed; repeat use over days remains untested. |

### v1 flow and rules

1. User types or pastes one commitment. Text only; screenshot capture is parked.
2. AI proposes direction, expected outcome, other person/group, exact deadline and context. Show uncertainty. User confirms/corrects every proposal before saving.
3. Save the confirmed loop in Convex under Waiting. Save the user's confirmed email destination and timezone. Interpret relative dates using the user's supplied context; old pasted messages may refer to a different Saturday. Require an explicit date and time before activating an alert.
4. At the confirmed deadline, move the loop to Needs You and send one email linking to that loop. For waiting on others, ask ?Has the report arrived?? rather than asserting non-delivery. For others waiting on me, remind the user of their own promised outcome.
5. User opens the loop. For waiting on others, they can copy/edit a prepared follow-up. For their own commitment, they do the promised work outside the app. Either direction can be marked Closed or given a confirmed next check date, returning to Waiting.

Email delivery does not prove the user read it. The app cannot know whether external work arrived or was completed; closure remains a user action. Never claim automatic discovery of forgotten commitments: only supplied input is tracked.

### storage, access and failure handling

- Remember direction, outcome, counterparty, confirmed deadline/timezone, context, state/history, follow-up draft, email attempt/result and closure timestamp.
- Personal loops belong to their signed-in owner using Convex Auth. A stranger can start from the public URL and sign in without builder help; ?logged out? checks mean the entry and sign-in flow work, not that private loops are publicly readable.
- An email link requires sign-in before revealing private details. Keep email content minimal.
- Ambiguous or absent obligation/date: show missing fields for correction; do not activate an invented deadline.
- AI failure: preserve input and offer retry/manual entry.
- Save failure: preserve input, show ?Not saved?, and offer retry. Never claim a saved loop until Convex confirms it.
- Email failure: retain Needs You, record failure and retry without creating duplicate jobs. Show delivery trouble in the app. Repeated failure cannot silently count as a successful alert.
- Closing or changing a deadline cancels/replaces pending alerts. A new check date permits a new alert; repeated scheduler attempts should not deliberately send duplicate alerts for the same deadline.

### dependencies and M0 proof

Text extraction, Convex scheduling and an email delivery provider remain unverified capabilities. Verify current official documentation, credentials, availability and cost before choosing implementation. No email provider is approved yet: the user's fixed-service rule requires asking before adding an outside service. Email is required for the confirmed v1; an in-app-only fallback must be explicitly agreed as a reduced promise.

M0 starts with the 30-minute no-code test with N and Ni. Ask each to supply three real commitments across the two directions where possible, manually structure them, and check willingness to entrust them and receive due-time emails. Record actual results, not assumed success.

Then verify extraction on representative text and one real short-duration email alert, including receiving it while the app is closed. Keep M0's live empty app and GitHub repo requirements. Record pass/fail evidence; do not build features before the no-code result.

### revised milestone acceptance and cuts

| Milestone | Additional acceptance test | If behind |
|---|---|---|
| M1, by Sun 4 Oct | A new user captures one loop in each direction, confirms the deadline, reloads successfully, receives a real short-duration due email with the app closed, opens the link and closes/reschedules the loop. | Text only; manual field/date correction; three states; retain both directions and email. |
| M2, Mon 5?Wed 7 Oct | N, Ni and Vi supply real loops; record second-loop use and which directions they use. At least one real user receives a due email. | One observed user with three real loops; do not invent usage in either direction. |
| M3, Thu 8?Fri 9 Oct | A stranger can enter from the public URL, sign in, complete the flow on a phone and receive an email. Verify private access and analytics. | Fix the blocker preventing completion; no new input types. |
| M6, Fri 16?Sat 17 Oct | Two consecutive live walkthroughs include persistence, both directions, due email delivery and close/reschedule behavior; one on someone else's device. | No new features; report limitations honestly. |

M4/M5 dates and outreach requirements remain unchanged. Payment attempts and payment intent count as $0 until genuine qualifying product money is received. Revenue L2 requires a positive payment up to $100, backed by processor evidence; do not count friends' payments or test payments. The floor for the revenue row remains L1 if no payment arrives.

### parking lot additions

| Idea | Why not now | Revisit after |
|---|---|---|
| Screenshot capture | Prove the text-to-email loop before adding another input path. | Core flow verified and explicit rescope. |
| Watching state | No separate behavior has been defined; three states cover v1. | Evidence that users need another state. |
| Discover commitments the user forgot to capture | Requires access to source messages/notes; excluded integrations cannot provide that. | Post-sprint validation and source-access approval. |
| Additional OpenLoops phases | Broader vision remains valid, but only the two approved directions enter this build. | Explicit written rescope. |

### decision log additions

| Date | Decision | Scope impact |
|---|---|---|
| 2 Oct 2026 | Builder confirmed N is 58 and supplied the missed student report example. | Use this as the primary lived situation. |
| 2 Oct 2026 | Builder approved email as the alert channel. | Require real due-time email delivery, not just a changed dashboard. |
| 2 Oct 2026 | Builder approved tracking both directions. | One shared flow with Waiting on others / Others waiting on me. |
| 2 Oct 2026 | Align working name with the builder's OpenLoops vision. | Replaces Loose Ends; broader phases stay outside v1. |

### next single action

Run the 30-minute no-code test with N and Ni and record the real commitments, corrections and willingness to use due-time email alerts. Then resolve email delivery access before product building.

## 17. validation result - 2 October 2026

This result supersedes earlier statements that the no-code capture/update test has not been run.

- Riskiest assumption: users will capture and update commitments in one more app.
- Evidence source: builder's report in this conversation, not independently observed by the coding agent.
- Observed behavior reported: N and Ni each entered two real commitments and updated one without help.
- Result: initial capture and update willingness supported. This is enough to proceed to M0 capability checks; M0 as a whole is not complete.
- Not established: voluntary third capture, exact capture time, repeated use over days, payment willingness, automated extraction, real email delivery, a live app or persisted Convex data. These manual trial participants are not product signups.
- Scope decision: retain both directions and the email alert flow. No failed-assumption rewrite or integration expansion is warranted.
- M2 must still observe whether real users return and add another commitment without prompting; record actual behavior rather than stated willingness.

### current blocker and next single action

Verify the text-extraction capability against representative commitments. Due-time email delivery, private access, the empty live app and GitHub repo remain M0 requirements. An outside email service still needs approval under the fixed-stack rule before adding it.

| Date | Decision | Evidence | Scope impact |
|---|---|---|---|
| 2 Oct 2026 | Initial no-code capture/update test passed provisionally. | Builder confirmed both N and Ni entered two real commitments and updated one without help. | Proceed to capability checks; retain repeat-use validation in M2. |

## 18. Past-deadline capture decision — 3 October 2026

When a user confirms and saves a commitment whose deadline has already passed, it immediately becomes Needs You rather than Waiting and sends one immediate email after the save is confirmed. This overrides the default initial Waiting state for this case. The builder confirmed both the state behavior and immediate email. Apply the same safe retry and duplicate-alert protections as other due emails. This is a product rule, not an implemented or tested feature.

## 19. Check time meaning — 3 October 2026

The builder approved Check time as the single user-facing date-and-time field: when OpenLoops should remind the user to check or act. Initially suggest the promised deadline, then require the user's confirmation of the actual date, time and timezone. The user may choose a later follow-up time without changing the original promise. Preserve the promised deadline in context and history when rescheduling. Check time controls Waiting, Needs You and email scheduling. The past-deadline rule in section 18 applies to the confirmed check time, not merely to an older promised delivery deadline. User-facing actions are Set next check time and Save check time; success says Check time updated. This overrides conflicting terminology in older scope and build documents. This is specified, not implemented or tested.

## 20. Email service approval — 3 October 2026

The builder approved Resend for email delivery from the Convex backend, starting with the free plan. No paid plan, account upgrade or domain purchase is authorized. This supersedes earlier statements that no email provider is approved. Convex remains the database, backend, authentication and host. Use the official Convex Resend integration where suitable. Account access and a secret sending key still need configuration; sending to real users requires a verified domain. Provider approval is not evidence of delivery, and M0 remains incomplete until its real checks pass. Never put the secret key in chat, GitHub or product documents.
