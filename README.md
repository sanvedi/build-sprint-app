# OpenLoops

An early personal follow-through app. The current live page is a setup check, not the working product.

- Setup page: https://combative-jaguar-50.convex.site
- Scope: IDEA_SCOPE.md
- Product: PRODUCT.md
- Screens: DESIGN.md
- Evidence and limitations: M0_VERIFICATION.md

## Commands

`npm install` installs dependencies. `npm run dev` starts the local setup page. `npm run build` builds it. `npm run typecheck` checks the Convex code.

`npm run deploy` deploys the backend and static files to the production Convex site. Pushing GitHub does not deploy the site.

`npm run verify:scheduling` creates a marked test record on the configured development deployment, waits for its check time, and verifies its background transition. It does not send email or count as real usage. Raw evidence is saved locally under artifacts/ and is not published.

Convex CLI sign-in and a local .env.local deployment configuration are required. Credentials stay out of this repository. The Resend key is intentionally pending; no extraction model is configured.
