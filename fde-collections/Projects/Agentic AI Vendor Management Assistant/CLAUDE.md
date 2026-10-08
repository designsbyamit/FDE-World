# Agentic AI Vendor Management Assistant

## Project Overview
A prototype demonstrating an AI agent that manages vendor master data change requests. The agent performs deterministic risk classification, OCR verification of supporting documents, and routes requests to human reviewers when needed.

## Pages
- `vendor-change-requests.html` — Worklist of all vendor change requests (reviewer view)
- `rep-request-detail.html` — Detail page for a single change request (reviewer view)
  - `state=approve-dialog` — approval confirmation dialog open (used in screenflow)
  - `state=approved` — post-approval state: green banner, buttons hidden, timeline steps green
- `vendor-profile.html` — Vendor self-service profile page (vendor/supplier view)
- `email-action-required.html` — Email inbox showing action-required notifications
- `what-happens-next.html` — Confirmation screen shown to vendor after submission

## Persona
- **Linda Wei (LW)** — The human reviewer. Avatar initials: `LW`. All shellbars in this project use `avatar-initials="LW"`.

## Domain Rules
- Risk classification is **field-level** and deterministic: Bank Account, IBAN, SWIFT, VAT Number, Tax ID = High; Email, Address, Phone = Medium; everything else = Low.
- Color is **reserved for OCR errors only** — do not use color for risk level indicators.
- Risk counts are shown as plain text: e.g. "2 High, 3 Medium". Low risk is not shown.
- Supporting documents are only requested for Medium and High risk fields.
- Trustpair verification only runs for High risk fields.

## Navigation / URL params
- Worklist rows pass `?vendor=NAME` to `rep-request-detail.html`
- Detail page reads vendor name from URL param; falls back to "Meridian Supply Co."
- Per-vendor fallback data is keyed by vendor name in `vendorFallbacks` object

## Detail page URL states (`?state=`)
Used by screenflow iframes to show specific UI states without interaction:
- `approve-dialog` — approval confirmation dialog open
- `approved` — green banner, buttons hidden, Awaiting Approval + Update MDG steps green
- `reject-dialog` — reject dialog open
- `rejected` — red banner, buttons hidden, Awaiting Approval step green
- `escalate-dialog` — escalate dialog open
- `escalated` — orange banner, buttons hidden, Awaiting Approval step green
- `ocr-confirm-dialog` — "Confirm Document Match" dialog open (Atlas vendor)
- `ocr-confirmed` — OCR + Routing steps green, Trustpair pending, no action buttons, confirmation text shown
- `ocr-flag-dialog` — "Flag Discrepancy" dialog open (Atlas vendor)
- `ocr-flagged` — OCR step green, amber strip updated with flagged message, no action buttons
- `account-history` — Account History tab open in the side panel (Agent Runs hidden)

## Error / Unhappy Path (Atlas Consulting Partners)
- Atlas row shows orange warning icon + "Review and Correct" in the worklist
- On detail page: Bank Account Number has `ocr: true` — triggers amber message strip, highlighted cell, warning OCR Check step in timeline, and "Confirm Match" / "Flag Discrepancy" buttons instead of Approve/Reject
