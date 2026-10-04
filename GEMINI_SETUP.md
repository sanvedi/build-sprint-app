# Connect Gemini

The practice actions use Gemini through Convex. The key stays on the backend; it is never sent to the browser.

In the Convex dashboard, select the development deployment `trustworthy-warthog-680`, then Settings → Environment Variables. Add:

| Name | Value |
| --- | --- |
| GEMINI_API_KEY | Your key from Google AI Studio |
| PROMPT_GAME_MODEL | gemini-3.8-flash |
| PROMPT_GAME_AI_ENABLED | true |
| PROMPT_GAME_DAILY_CALL_LIMIT | 20 |

Save the key in the dashboard, not in chat, source code, or a frontend environment variable. The daily limit caps reserved generation and assessment requests together, including failed requests; it is not a dollar budget. Provider limits still apply.

Run `npm run dev` and open http://127.0.0.1:5173. Generate an answer, judge it, and request feedback. Check the feedback against the teacher's judgment before using it with students. Use prepared, non-private content on Google's free tier.

Development and production have separate environment variables. This setup does not publish the site. Configure production separately when ready to deploy.

Verification: typecheck, build, 15 automated tests, and development backend push passed. After the key was saved, live Gemini generation and assessment through the development Convex deployment passed. A valid initial attempt earned one point; replay returned the identical saved assessment. Google intermittently returned high-demand errors, so service reliability remains a concern. Browser and phone verification remain pending.
