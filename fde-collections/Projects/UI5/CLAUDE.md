# UI5 Showcase

## Purpose
This is a reference showcase for the prototyping platform — not a customer-facing project. It demonstrates available UI5 Web Components, Fiori patterns, design tokens, page scaffolds, and Fiori floorplan recreations.

## Structure
- `index.html` — Main showcase with sidebar nav (Components, Fiori Patterns, Resources, Templates, Floorplans)
- `template-*.html` — General-purpose page scaffolds (not tied to a specific Fiori floorplan)
- `floorplan-*.html` — Recreations of standard SAP Fiori floorplans using UI5 Web Components

## Templates
Templates are named with the `template-` prefix. Current templates:
- `template-home.html` — Home/dashboard page: collapsed icon-rail side nav, gradient hero banner, quick links tab bar (Messages/Pinned/etc.), multi-column card grid with work items list, linked accounts, requisitions table, workers table, empty state (ui5-illustrated-message), and in-progress items list
- `template-list-filter.html` — List with variant management control (saved views popover) and collapsible filter bar
- `template-list-kpi.html` — List with KPI summary tiles above the table
- `template-instances.html` — Master–detail layout: collapsible side nav list + detail pane with tabs
- `template-news-hub.html` — Portal/hub layout: collapsed side navigation (icon rail), side panel, hero banner, card grid
- `template-settings.html` — Settings / administration page: page header + custom tab bar (General, Connections, User Management), settings cards with form controls, connections table (plain HTML), user management cards
- `template-detail-two-column.html` — Two-column detail view: fixed sub-header with actions + meta strip, scrollable main column (KPI grid, line items table, attachments), fixed side column (tabcontainer with activity timeline + notes)
- `template-document-review.html` — Document review / change request: breadcrumb sub-header, 60/40 grid split, left side (requested changes table with diff arrows, supporting documents), right side (vertical workflow stepper, record information key-value list)

## Floorplans
Floorplans are named with the `floorplan-` prefix and correspond to standard SAP Fiori floorplan patterns:
- `floorplan-list-report.html` — filterable/searchable table of records
- `floorplan-object-page.html` — detail view for a single record
- `floorplan-worklist.html` — task-oriented list
- `floorplan-overview-page.html` — dashboard/KPI summary cards
- `floorplan-analytical-list-page.html` — chart + filterable table combo

## Adding Content
New component demos or patterns go as sections inside `index.html`. New floorplans and scaffolds go in this folder and are linked from the appropriate nav group in `index.html`.
