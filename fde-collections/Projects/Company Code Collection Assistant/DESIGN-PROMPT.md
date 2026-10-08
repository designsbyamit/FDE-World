# Design prompt: Company Code support in Cash Collection Assistant

Design a Fiori-compliant Cash Collection Assistant experience that supports customers spanning multiple company codes without fragmenting the collector's mental model.

The collector may be assigned to multiple collection segments or to one segment mapped to multiple company codes. Access remains governed by the collector-to-segment assignment and the segment-to-company-code mapping. Only authorized company codes may be shown. Do not introduce a new authorization flow.

On the Collection Worklist, add Company Code as a default column immediately before Customer ID. Treat the analytical key as company code + customer number, but show a customer only once when the same customer number exists across multiple authorized company codes. The consolidated row should display “Multiple” in Company Code and provide an intuitive inline drill-down that reveals one child row per company code. For customer C123, demonstrate company code 1000 with £100 overdue and company code 2000 with £200 overdue, consolidated to £300. Do not use BP relationship linking or grouping.

Add Company Code to the adaptable filter set and demonstrate filtering to company code 2000. When filtered, show only the selected company-code contribution, update KPI cards accordingly, and replace the consolidated “Multiple” state with company code 2000. Preserve company-code-level values for overdue amount, due by end of month, blocked orders and amount, credit balance, sum of credit items, and minimum predicted arrear days. Show AI priority at customer summary level because scoring spans all accessible company codes.

On Customer 360, keep Insights and Recommendations at customer level. Add a visible scope control with “All Company Codes,” “1000,” and “2000.” Changing scope must update Account Overview KPIs, aging information, Open Items, Disputes, Account History, and Customer Contacts. Contacts must display their company-code assignment; contacts without a mapping should display “All company codes.”

Show Next Best Action at company-code level. The selected company code must be explicit in the recommendation and action. “Send Email” opens a prefilled compose experience using the customer's BP language and the template configured for that company code. Recipient validation remains application-wide: manually added To/CC recipients must be approved customer contacts or belong to an approved domain.

Use SAP Horizon, cozy density, SAP 72, SAP design tokens, `app-shellbar`, and UI5 Web Components. Use UI5 tables with navigation row actions. Use link-style or transparent actions inside worklist rows rather than solid buttons. Keep all readable text at 14 px or larger.

Flag these unresolved implementation questions in design annotations rather than inventing backend behavior: mixed-currency aggregation across company codes; source of company-code-specific credit balance; mapping customer contacts from segment to company code; validation of BUT000-BU_LANGU for email language; and the TVKO join required to attribute credit-blocked orders to company code.

The prototype must demonstrate: consolidated worklist row, expanded company-code rows, company-code filter, Customer 360 all-company scope, company-code-specific scope, company-code-aware contacts, and company-code-level Next Best Action.
