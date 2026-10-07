# Connect OpenAI

AI answers, assessments and assessment rechecks use OpenAI through Convex. The backend reads only OPENAI_API_KEY; no key is sent to the browser or committed.

In the Convex dashboard, choose production deployment combative-jaguar-50, then Settings > Environment Variables. Set OPENAI_API_KEY privately, PROMPT_GAME_MODEL=gpt-5.6-luna, PROMPT_GAME_GENERATION_MODEL=gpt-5.6-luna and PROMPT_GAME_AI_ENABLED=true. Development deployment trustworthy-warthog-680 has separate settings and requires its own key.

The existing daily allowance remains 20 reserved requests per UTC day, shared by generation, assessment and recheck, including failed requests. It is not a dollar budget. Answer output remains capped at 1600 tokens and assessment/recheck output at 2000 tokens. OpenAI reasoning is disabled so hidden reasoning does not spend these reply limits; response storage is disabled. The existing prompts, assessment schema, scoring, points, attempts and recovery rules are unchanged.

GPT-5.6 Luna is designed for cost-sensitive workloads and supports structured outputs. Listed standard text pricing is $0.20 per million input tokens and $1.20 per million output tokens: https://developers.openai.com/api/docs/models/gpt-5.6-luna . Provider account billing and limits apply; no paid-plan upgrade or request-cap increase is made by this migration.

Publish with npm run deploy, then verify real generation and assessment on the public site. Browser mechanics do not establish teacher-reviewed feedback reliability.
