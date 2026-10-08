# Company Code Collection Assistant — ccv0.4.1

## Project overview
A Fiori-compliant prototype showing how the Cash Collection Assistant consolidates one customer across company codes while preserving company-code-specific financial detail and actions.

## Pages
- `index.html` — worklist with Company Code as column 3, consolidated customer rows, company-code drill-down, company-code filtering, and filter-aware KPI cards.
- `customer.html` — Customer 360 with customer-level insights and switchable all-company/company-code views for KPIs, open items, contacts, and Next Best Action.
- `DESIGN-PROMPT.md` — reusable prompt distilled from the Company Code requirements document.

ccv0.4.1 moves Customer 360 company-code selection into a worklist-style filter section while preserving collector-specific responsibility, customer-level priority, and the established worklist layout.
ui-guardrails.html documents the established Collection Assistant layout, overlay, control-placement, and Company Code decision guardrails.

## Persona
Collections specialist Alan, assigned to collection segments that provide access to company codes 1000 and 2000.

## Domain decisions
- A customer is identified by customer number (KUNNR) and analyzed by company code + customer number.
- A customer spanning accessible company codes appears once in the worklist, with expandable company-code detail.
- Customer-level priority and insights are consolidated across company codes.
- Financial KPIs, open items, disputes, and account history support company-code scope; Next Best Action and optional actions always require one company code.
- Code 1000 uses GBP and code 2000 uses EUR. Consolidated values use the displayed reporting currency and disclose the exchange rate; native values remain visible when conversion occurs.
- Text is 14 px or larger.
