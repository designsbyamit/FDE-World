# Collection Email Split Flow

## Project Overview
A focused prototype of an intelligent collection email flow. When ten invoice PDFs exceed the 10 MB email limit, the system automatically creates two linked emails without asking the collection specialist to manage the split.

## Pages
- `index.html` — Collection Worklist and interactive two-email compose flow
- `tabbed.html` — Alternative email overlay with two top tabs and one sequenced `Send both emails` action
- `detail.html` — Grovemart object page with the stacked two-email right-edge panel
- `detail-tabbed.html` — Grovemart object page with the tabbed, single-action right-edge panel
- `email-split-panel.css` / `email-split-panel.js` — Shared right-edge panel presentation and interaction logic
- `screenflow.html` — Linked overview of the nine required prototype states

## Persona
- **Jordan Lee (JL)** — Collection specialist reviewing and sending customer follow-ups.

## Domain and UX Rules
- The attachment limit is 10 MB per email.
- The system optimizes and performs the split automatically: 7 invoices in Email 1 and 3 in Email 2.
- Never ask the user to calculate sizes, remove invoices, download files, or build another email.
- Both emails belong to one collection action and can be sent independently.
- Sending Email 1 preserves Email 2 as pending. Cancelling after Email 1 is sent produces a resumable partial state on the worklist.
- The worklist Next Best Action becomes `Send remaining 3 invoices` after partial completion.

## URL States
- `?state=loading` — generation and attachment retrieval
- `?state=limit` — attachment limit detected and automatic split in progress
- `?state=ready` — both emails ready for review
- `?state=email1-sent` — first email sent, second pending
- `?state=complete` — all ten invoices sent
- `?state=partial` — worklist partial-completion state
- `?state=resume` — resumed Email 2 compose state
