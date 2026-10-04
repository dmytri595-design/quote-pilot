# QuotePilot Production Checklist

## Prepared in v0.5
- Responsive SaaS shell
- Dashboard
- Quote CRUD flow
- Quote detail
- Customer records
- Service and pricing catalog
- Invoice and payment UI shell
- Analytics UI
- Settings
- Local persistence
- JSON backup/export
- Browser print/PDF
- AI adapter boundary
- Email adapter boundary
- Payment adapter boundary
- Storage adapter boundary
- GitHub Pages deployment
- API contract
- Data model

## Before real launch
1. Backend authentication and organization authorization.
2. Replace localStorage with database API.
3. Implement the AI quote-draft endpoint.
4. Add server-side price validation and business rules.
5. Add secure email delivery and customer links.
6. Add payment processor integration.
7. Add server-side archival PDFs.
8. Add audit log, rate limits and error monitoring.
9. Add automated tests.
10. Add privacy policy, terms, billing and data-retention controls.

## Security boundary
No provider secret belongs in the GitHub Pages application.
