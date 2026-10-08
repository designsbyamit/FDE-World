# Design prompt: Company Code support in Cash Collection Assistant

Design a Fiori-compliant Cash Collection Assistant experience that supports customers spanning multiple company codes without fragmenting the collector's mental model.

The collector may be assigned to multiple collection segments or to one segment mapped to multiple company codes. Access remains governed by the collector-to-segment assignment and the segment-to-company-code mapping. Only authorized company codes may be shown. Do not introduce a new authorization flow.

On the Collection Worklist, keep Customer as column 1 and Priority as column 2, and add Company Code as column 3. Show a customer only once when it spans multiple authorized company codes. The parent row owns Customer ID, Customer Name, Priority, and Actions; expanded child rows show only Company Code and code-level measures. JKL Foods Limited, customer ID 92823, has two allocated codes: 1000 in GBP and 2000 in EUR. Do not use BP relationship linking or grouping.

Add Company Code to the filter bar and the Adapt Filters interaction. When filtered, retain the matching customer parent for identity and priority, show only the selected code child row, and update worklist KPI cards for that filter. Show overdue amount, due by end of month, credit balance, predicted average arrear days, blocked orders, and blocked-order amount at both consolidated customer level and company-code level. Keep AI priority exclusively at customer level.

On Customer 360, keep Insights and Recommendations at customer level. Add a visible scope control with “All Company Codes,” “1000,” and “2000.” Changing scope updates only company-code KPIs and sections; customer-level KPIs remain stable. Mixed sections label every KPI or event as Customer level, All codes, or Code n. Open Items always expose Company Code. Account History supports mixed customer/code events and filtering. Contacts without a supplied code mapping display “All company codes.”

Show Next Best Action at company-code level. The selected company code must be explicit in the recommendation and action. “Send Email” opens a prefilled compose experience using the customer's BP language and the template configured for that company code. Recipient validation remains application-wide: manually added To/CC recipients must be approved customer contacts or belong to an approved domain.

Use SAP Horizon, cozy density, SAP 72, SAP design tokens, `app-shellbar`, and UI5 Web Components. Use UI5 tables with navigation row actions. Use link-style or transparent actions inside worklist rows rather than solid buttons. Keep all readable text at 14 px or larger.

Use a worklist-level display-currency selector. When display and native currencies differ, show the converted value first and the native value as secondary text. Consolidated Customer 360 KPIs disclose the reporting currency and exchange rate; if a rate is missing, show currencies separately rather than presenting a misleading total. Keep unresolved contact mapping, language validation, and source-system joins visible as implementation annotations.

The prototype must demonstrate: consolidated worklist row, expanded company-code rows, company-code filter, Customer 360 all-company scope, company-code-specific scope, company-code-aware contacts, and company-code-level Next Best Action.
