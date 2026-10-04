# QuotePilot backend handoff

The repository is intentionally front-end first.

A production backend can be implemented in Node/TypeScript, Python or another stack without changing the UI contract.

Suggested modules: auth, quotes, customers, services, ai, pricing, email, invoices, payments, analytics and audit.

Suggested server-only environment variables: AI provider key, EMAIL provider key, PAYMENT provider secret, DATABASE_URL and SESSION_SECRET.

Never commit real credentials to GitHub.
