# QuotePilot API Contract — v0.5.0

Production backend should expose a small HTTP API and keep every provider secret server-side.

## Authentication
POST /api/auth/session
Use a secure HttpOnly session cookie and organization-level authorization.

## Quotes
GET /api/quotes?status=draft&search=painting
POST /api/quotes
GET /api/quotes/:id
PATCH /api/quotes/:id
POST /api/quotes/:id/send
POST /api/quotes/:id/accept
POST /api/quotes/:id/invoice

Create quote payload should contain customerId, service, jobDescription, items, discountPct, taxPct and notes.

## AI
POST /api/ai/quote-draft
Request: jobDescription, customerId, priceListVersion.
Response: serviceType, items, scope, assumptions, warnings, confidence.

The production server decides which model/provider to call. Never send provider API keys to the browser.

## Customers
GET /api/customers
POST /api/customers
GET /api/customers/:id
PATCH /api/customers/:id

## Services / pricing catalog
GET /api/services
POST /api/services
PATCH /api/services/:id
DELETE /api/services/:id

## Email
POST /api/quotes/:id/send
The backend creates a secure customer link and calls a transactional-email provider.

## Payments
POST /api/invoices/:id/payment-link
The backend creates a hosted payment page with the configured processor.

## PDF
GET /api/quotes/:id/pdf
Server-side PDF generation is recommended for archival; browser print remains available.

## Analytics
GET /api/analytics/summary
GET /api/analytics/services
GET /api/analytics/conversion

## Provider abstraction
The UI already uses QuotePilotAdapters.ai.extractQuote, QuotePilotAdapters.email.sendQuote, QuotePilotAdapters.payments.createPaymentLink, and QuotePilotAdapters.storage.save/load.

