# QuotePilot v0.5.0 — full product prototype

QuotePilot is a browser-based estimating workspace for contractors and service businesses.

## Product surface
- Dashboard
- Quotes pipeline
- New Quote builder
- Quote Detail and status workflow
- Customer database
- Service / pricing catalog
- Invoices & Payments shell
- Analytics
- Settings
- Integration center

## v0.5.0
- Single application shell with hash routing
- Browser-local data store with quote/customer/service/invoice records
- Editable quote line items with automatic subtotal, discount, tax and total calculations
- Customer-facing quote preview
- Quote workflow: draft → sent → accepted → invoiced
- JSON backup/export
- Browser print/PDF
- Prepared adapter contracts for AI, email, payments and persistence
- API contract, data model and production checklist
- GitHub Pages deployment

The current AI, email and payment layers are intentionally mocked. No provider API keys or real credentials are stored in the repository.

## Production architecture
The UI is designed to call a secure backend for:
- AI quote extraction
- pricing validation
- authentication / authorization
- email delivery
- payment links
- database persistence
- server-side PDF generation
- analytics and audit events

See docs/API_CONTRACT.md, docs/DATA_MODEL.md and docs/PRODUCTION_CHECKLIST.md.

## GitHub Pages
Repository:
https://github.com/dmytri595-design/quote-pilot

Live site:
https://dmytri595-design.github.io/quote-pilot/

Deployment is handled by .github/workflows/deploy-pages.yml.
