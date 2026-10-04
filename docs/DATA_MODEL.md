# QuotePilot Data Model — v0.5.0

Recommended relational model.

## organizations
id, name, email, phone, currency, default_tax_rate, quote_validity_days, created_at, updated_at

## users
id, organization_id, name, email, role, created_at, updated_at

## customers
id, organization_id, name, email, phone, address, notes, created_at, updated_at

## services
id, organization_id, name, category, unit, default_rate, active, created_at, updated_at

## quotes
id, organization_id, customer_id, quote_number, service_type, job_description, status, discount_pct, tax_pct, notes, ai_confidence, ai_provider, created_at, updated_at, expires_at, sent_at, accepted_at

## quote_items
id, quote_id, description, qty, unit, rate, sort_order

## invoices
id, organization_id, quote_id, invoice_number, status, subtotal, tax, total, payment_provider, payment_url, created_at, paid_at

## audit_events
id, organization_id, actor_user_id, entity_type, entity_id, action, metadata_json, created_at

Prototype storage is localStorage. Production should use a relational database with organization-level authorization.

