# M0 verification — 3 October 2026

Result: M0 has not passed. This check inspected the local project and queried its configured development deployment; it did not build or deploy product features, add an outside service or send email.

| Requirement | Result | Evidence |
|---|---|---|
| Initial manual capture/update trial | Reported, not independently observed | IDEA_SCOPE.md section 17 records N and Ni each entering two commitments and updating one. |
| Reminder value and voluntary repeat use | Not established | PRODUCT.md section 6's manual reminder/value test has no recorded result. |
| Convex installed | Pass | package.json contains convex 1.46.0; the local CLI runs. |
| Development deployment reachable | Pass | Configured CONVEX_URL root returned HTTP 200. Authenticated `npx convex function-spec` returned successfully. This does not prove product functionality. |
| Backend functions deployed | Not implemented on inspected deployment | Function metadata returned an empty functions array. |
| Text extraction | Cannot run yet | No extraction implementation or selected model; no relevant local credential names found and the development deployment reports no environment variables. No representative extraction output was produced. |
| Real scheduled transition | Not tested | No reminder or scheduling functions exist locally or on the inspected deployment. |
| Real due-time email with app closed | Cannot run yet | No email implementation, approved delivery service or development environment credentials. No email was sent. |
| Private sign-in and owner access | Not implemented | No Convex Auth dependency, auth configuration or application functions found. |
| Empty public app | Fail at configured site root | CONVEX_SITE_URL returned HTTP 404. No frontend files, static-hosting dependency or hosting routes found. |
| `npm run deploy` | Missing | package.json contains only the placeholder test script. |
| GitHub repository | Not established | `git status` and `git remote -v` report that this folder is not a git repository. This does not establish whether an unattached remote repo exists elsewhere. |

## Documentation checks

Convex supports durable scheduled functions, immediate scheduling after a successful mutation and cancellation. Scheduled actions are not automatically retried; email retries and stale/duplicate-alert protections need application logic. Cancellation alone cannot stop a function that has already begun running.

Source: https://docs.convex.dev/scheduling/scheduled-functions

Convex Static-Hosting supports serving a static frontend through Convex storage and HTTP actions. It is available but not installed or configured in this project.

Source: https://www.convex.dev/components/static-hosting

## Concrete email option for approval

Resend's free plan lists a 100-email daily limit. A test using its resend.dev sender can reach only the email address associated with the Resend account. Sending to N, Ni and other users requires a verified sending domain. A free account therefore permits an initial own-inbox check but does not by itself prove real-user delivery readiness. No account was created, service installed, credential entered or paid plan enabled.

Sources: https://resend.com/pricing and https://resend.com/docs/knowledge-base/403-error-resend-dev-domain

The user's fixed-stack rule requires approval before adding this outside email service. Approval would cover email delivery from the Convex backend; Convex remains the database, backend, authentication and host. Service approval alone would not supply credentials or a sending domain.

Update after this audit: the builder approved Resend for email delivery on 3 October 2026, starting on the free plan. No paid plan is authorized. This resolves the service-approval requirement, not the missing account, sending key, verified domain or actual delivery test. The audit results above describe the state when checked.

Next: configure Resend access securely and select authorized AI access before claiming extraction or delivery tests can run. Scheduling and the empty hosted app can be implemented and checked using the existing Convex stack. Keep test commitments separate from genuine usage evidence.

## Follow-up work — email key intentionally pending

- The builder asked to leave the Resend key pending and continue other tasks. No email credentials were added and no email was sent.
- Created a local main-branch git repository and saved the product/design baseline.
- Installed Convex Static-Hosting and Vite. Added a clearly labelled setup-only HTML page; it does not expose capture, sign-in or reminders as working features.
- Added internal CLI-only scheduling checks under convex/m0Checks.ts and a marked-test-only m0Checks table. No public function can create or read these records.
- Ran `npm run verify:scheduling` against the development deployment: a 20-second test started Waiting and became Needs You at its scheduled time with no browser open. The final completion timestamp was 7 ms after check time. This proves one background state transition, not email delivery, cancellation/rescheduling, user access or a complete reminder implementation. Raw evidence is locally saved in artifacts/scheduling-proof.json and excluded from git.
- `npm run typecheck` and `npm run build` passed. The design detector found no issues in the setup HTML; this is not browser verification of product screens.
- Uploaded and checked the development setup page at https://trustworthy-warthog-680.convex.site (HTTP 200).
- Ran `npm run deploy` for production. Its initial non-interactive confirmation failure was fixed by explicitly confirming the authorized Convex deployment in the script, then using the static-hosting deploy command with the backend already deployed.
- Production setup URL: https://combative-jaguar-50.convex.site. The first HTTP probe ran before upload publication completed; verification was rerun after successful publication. Both the root and /hosting-check returned HTTP 200 with the expected setup page. A separate web-reader tool could not access the Convex site; no visual phone/browser check is claimed.
- Created and pushed https://github.com/sanvedi/build-sprint-app as a public repository. The unauthenticated web reader opened it and listed the project files. Environment files, node_modules, builds and raw local test artifacts are excluded.

M0 remains incomplete: selected and tested AI extraction, real email delivery and the reminder-value/repeat-use trial are still outstanding. User-facing auth/private-loop tests belong to the complete product flow and remain unimplemented.
