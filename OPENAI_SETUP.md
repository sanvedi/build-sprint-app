# Connect OpenAI

AI answers, assessments and assessment rechecks use OpenAI through Convex. The backend reads only OPENAI_API_KEY; no key is sent to the browser or committed.

In the Convex dashboard, choose production deployment combative-jaguar-50, then Settings > Environment Variables. Set OPENAI_API_KEY privately, PROMPT_GAME_MODEL=gpt-5.6-luna, PROMPT_GAME_GENERATION_MODEL=gpt-5.6-luna and PROMPT_GAME_AI_ENABLED=true. Development deployment trustworthy-warthog-680 has separate settings and requires its own key.

The daily allowance is 20 reserved AI requests per anonymous browser per UTC day (reset 5:30 AM India time). Generation, assessment and recheck share that browser's allowance; failed provider requests still count. It is not a dollar budget or a verified-person limit: another browser/device or cleared browser data can start another allowance. The historical practiceUsage table remains an aggregate meter, not a shared lockout. New playerUsage counters start at rollout; old progress and request records are retained.

Answer output is capped at 600 tokens (units of text) and assessment/recheck output at 900. Automatic provider retries are disabled; manual failed-request retries still count. A cut-off answer is never displayed as complete: the student is asked for a shorter response, with their prompt retained and no learning attempt spent. Exact successful practice generations from the same browser/task/material among the recent 20 generation jobs are reused without another AI call, including at the daily cap. Finals and supported-practice replays keep fresh generation. Recorded provider input/output/cache-read token counts are optional on practiceJobs; historical jobs leave them absent. No generated chat history or hidden reasoning is requested, and provider response storage remains disabled. Instructions, assessment schema, scoring, points, attempts and save-only recovery are unchanged. More browsers can mean more total app spending; no account-wide spending cap is established here.

GPT-5.6 Luna is designed for cost-sensitive workloads and supports structured outputs. Listed standard text pricing is $0.20 per million input tokens and $1.20 per million output tokens: https://developers.openai.com/api/docs/models/gpt-5.6-luna . Provider account billing and limits apply; no paid-plan upgrade or request-cap increase is made by this migration.

Publish with npm run deploy, then verify real generation and assessment on the public site. Browser mechanics do not establish teacher-reviewed feedback reliability.
