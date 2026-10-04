# See every current practice state on your phone

Keep the computer and phone on the same Wi-Fi. While the preview server is running, open:

http://192.168.68.58:5175/state-preview

Choose a state from the list. These are clearly labelled prepared examples; they do not use Gemini credits or change your saved practice. Use the browser Back button to return to the list. Tap a text field to check it with the phone keyboard open.

| Link label | What to check |
| --- | --- |
| first | Supplied starting prompt and first-visit instruction |
| returning | An existing edited prompt |
| empty | Cleared prompt; tap Generate answer for its validation error |
| loading | Generation waiting; existing work remains visible |
| error | Generation failure with prompt retained |
| answer | Answer tabs and empty judgment |
| wrong answer | Deliberately unsuitable answer; judge its invented facts and omissions |
| empty judgment | Tap Check my judgment to see the missing-judgment error |
| assessment error | Existing answer and judgment; Retry assessment |
| feedback | Gap and evidence; tap Challenge for one prepared recheck, then Try again |
| prompt correction | Edit the prompt and explain the change |
| judgment correction | Keep the answer; correct only the judgment and explanation |
| revised answer | Judge the exact revised answer |
| recheck loading | Existing feedback while recheck waits |
| recheck error | Failed recheck; tap Retry assessment |
| recheck done | AI still disagrees; no repeated Challenge, normal correction continues |
| done | Confirmed point |
| with help | Two retries exhausted and worked example |
| save pending | Checked result held pending; tap Retry saving without reassessment |
| device error | Saving unavailable; copy-work instruction |

The loading and error links intentionally hold that state so you have time to inspect it. Other preview actions use prepared responses.

To test real persistence, open the Live practice link, edit the prompt, close and reopen the same page in the same browser. Real generation, assessment and Challenge use Gemini and the shared daily call allowance. Preview links are separate from real progress.

To restart the preview later, open PowerShell in C:\Users\LENOVO\build-sprint-app and run:

```powershell
npm run dev -- --host 0.0.0.0 --port 5175
```

Use the Wi-Fi Network address printed by the command; the computer's address can change. Append `/state-preview`. Leave that PowerShell window running. If the phone cannot open it, confirm both devices are on the same Wi-Fi and that Windows allows this local server on your private network.

Only the first Beginner practice is implemented. Account saving, practice 2 and independent finals are not previewed or claimed as built. No production publishing occurred.

Verification: 20 preview states walked in Edge at 390 ? 844, with no backend calls, text below 16px, targets below 44 ? 44 or horizontal overflow. Challenge, retry after recheck failure, and save retry were exercised. Actual physical-phone keyboard testing is still for the builder to perform.

Recovery preserves the same request ID across reload and stores a pending checked result separately until saving succeeds. If all browser storage is unavailable, device recovery cannot be guaranteed; the page tells the student to keep it open and copy the work.
