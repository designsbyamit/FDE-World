# Company Code Collection Assistant — ccv0.2

## Project overview
A Fiori-compliant prototype showing how the Cash Collection Assistant consolidates one customer across company codes while preserving company-code-specific financial detail and actions.

## Pages
- `index.html` — worklist with Company Code before Customer ID, consolidated customer rows, company-code drill-down, and company-code filtering.
- `customer.html` — Customer 360 with customer-level insights and switchable all-company/company-code views for KPIs, open items, contacts, and Next Best Action.
- `DESIGN-PROMPT.md` — reusable prompt distilled from the Company Code requirements document.

ccv0.2 adds scoped ageing, disputes, account history, and a working company-code-specific email compose flow.
ui-guardrails.html documents the established Collection Assistant layout, overlay, control-placement, and Company Code decision guardrails.

## Persona
Collections specialist Alan, assigned to collection segments that provide access to company codes 1000 and 2000.

## Domain decisions
- A customer is identified by customer number (KUNNR) and analyzed by company code + customer number.
- A customer spanning accessible company codes appears once in the worklist, with expandable company-code detail.
- Customer-level priority and insights are consolidated across company codes.
- Financial KPIs, open items, disputes, account history, contacts, and Next Best Action support company-code scope.
- Prototype values use GBP for both company codes; mixed-currency summary behavior remains an open product decision.
- Text is 14 px or larger.
