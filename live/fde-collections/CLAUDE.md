# Standing Instructions for All Projects

## Project-Level Configuration
Each project in `Projects/` has its own `CLAUDE.md` with project-specific context: personas, page inventory, domain rules, and navigation patterns. Always read the project-level `CLAUDE.md` before starting work on any project page.

When starting a new project, automatically create a `CLAUDE.md` in the project folder. As the project evolves, keep it up to date — add new pages, personas, domain rules, and decisions as they are established. Do not wait to be asked.

**Important:** `Projects/UI5/` is a platform showcase, not a real project. Do not add UI5 component instructions, conventions, or patterns to its `CLAUDE.md`. All UI5 Web Component rules live in this repo-level `CLAUDE.md` and in `lib/component-conventions.md`.

**Getting started:** The `Projects/` folder is not shared. Create your own project folders inside `Projects/` and add a `CLAUDE.md` to each one with your project-specific context.

## Engineering Standards
- The goal is to design and build concepts that engineers can actually implement. Practicality is a must — every design decision should be achievable with real SAP technology.
- Write code as if an engineer will use it as a starting point. Use semantic HTML, proper component attributes, and SAP design tokens throughout. Avoid shortcuts that would need to be undone later.
- If a UI5 Web Component is a close enough match for a pattern, use it — no need to ask. If something genuinely cannot be built with UI5 (no close equivalent exists), flag it explicitly before building: describe what it is, why there is no UI5 equivalent, and propose the fallback. Never silently substitute custom HTML for a UI5 component.

## Content Density
- Default: **Cozy** mode (SAP Fiori default). Do not add any density class to `<body>` — cozy is automatic.
- Compact mode: add `class="ui5-content-density-compact"` to `<body>`. This applies to all UI5 components on the page.
- Density is a **project-wide** setting — never change it on a per-component or per-page basis. If a designer asks to switch to compact, confirm that it will apply to all pages in the project before making the change.

## Font

UI5 does not load the SAP 72 font automatically. Include these `@font-face` declarations in every HTML file:

```css
@font-face { font-family: "72"; font-weight: 400; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Regular.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 700; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Bold.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 600; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Semibold.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 300; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Light.woff2") format("woff2"); }
```

Set the body font stack to: `font-family: "72", sans-serif;`

**Never set `font-size` on `body` or `html`.** UI5 components manage their own sizing internally — setting a body font-size causes inputs, buttons, and all UI5 components to render smaller than the Fiori spec. Apply explicit `font-size` only to custom non-UI5 elements (page titles, custom labels, layout divs).

## Design Token Mapping
When a design uses raw values (hex colors, px sizes, radii) that are not SAP tokens, always map them to the closest SAP Horizon token instead of using the raw value. This applies to:
- **Colors** — map to the nearest `--sap*` color token (e.g. a light blue tint → `--sapList_SelectionBackgroundColor`)
- **Spacing / padding / margins** — map to `--sapContent_Space_*` or standard Fiori spacing increments (0.25rem, 0.5rem, 1rem, 2rem)
- **Border radii** — map to `--sapField_BorderCornerRadius` (0.25rem), `--sapButton_BorderCornerRadius` (0.5rem), or `--sapTile_BorderCornerRadius` (1rem)
- **Border colors** — map to `--sapList_BorderColor`, `--sapField_BorderColor`, etc.
- **Shadows** — map to `--sapContent_Shadow0` through `--sapContent_Shadow3`
- **Font sizes / weights** — map to `--sapFontSize`, `--sapFontLargeSize`, `--sapFontHeader*Size`, etc.

Never use raw hex values or arbitrary px values that have a clear SAP token equivalent.

## UI Components
- **Always use UI5 Web Components when available. Never use browser-native elements or plain HTML alternatives if a UI5 equivalent exists — no exceptions.**
- Use UI5 Web Components (`ui5-*`) for: breadcrumbs, buttons, select/dropdowns, inputs, checkboxes, tags, avatars, icons, panels, dialogs
- Never use plain `<select>` — use `ui5-select` + `ui5-option`
- Never use plain `<input type="checkbox">` — use `ui5-checkbox`
- Never use plain `<input type="text">` for filter/form fields — use `ui5-input`
- For toolbar search fields, use `ui5-input` with `show-clear-icon` and a slotted `<ui5-icon slot="icon" name="search">`. The icon may render top-aligned in Safari due to shadow DOM — accept this, do not work around it with plain HTML.
- Fiori button hierarchy: Primary = `design="Emphasized"`, Secondary = `design="Default"` (outlined), Tertiary = `design="Transparent"` (no border, no background)
- Button size: for buttons inside table cells or other dense UI areas, wrap the container in `<div class="ui5-content-density-compact">` (or apply the class directly on the `ui5-table`). Do not apply compact density page-wide unless the whole project uses it. `ui5-button` has no `size` attribute — density class is the correct mechanism.
- Button order in toolbars and action bars: positive/primary action always on the **left**, negative/cancel/dismiss action always on the **right**. Example: `[Save] [Cancel]`, `[Approve] [Escalate] [Back]`. This applies to dialogs, footer bars, form actions, and any button group.
- Use plain HTML + CSS for: grids, cards, layouts, pagination
- Use `ui5-shellbar` for the shell bar — **always, on every page, no exceptions**. Never hand-code a shell bar with plain HTML. Always include `breakpoint-size="L"` — without it the component fails to detect its container width in static files and renders with no side padding. Key attributes: `primary-title`, `show-search-field`, `show-notifications`, `show-product-switch`, `show-menu-button` (hamburger — toggle per project). Key slots: `logo` (img), `searchField` (ui5-input), `profile` (ui5-avatar), `items` (ui5-shellbar-item for custom icon buttons). Add `position: sticky; top: 0; z-index: 100` via CSS.
- Always use `ui5-table` for tabular data. Use `ui5-table-header-row` + `ui5-table-header-cell` (with `width` attribute) for the header, `ui5-table-row` (with `interactive` attribute) + `ui5-table-cell` for rows, `ui5-table-selection-multi` in the `features` slot for checkboxes, and `ui5-table-row-action-navigation` in the `actions` slot for the navigation chevron. Always add `style="padding-inline-start: 1rem"` to the first `ui5-table-header-cell` and to the first `ui5-table-cell` in every row.

## Icons
- Prefer inline SVG over PNG or external icon fonts
- Use SAP-provided SVG icons when supplied; do not substitute generic Material or other icons

## Images / Assets
- Copy assets from Desktop or other locations into the project folder before referencing them
- Use relative paths (never absolute `/` paths) so the project works on GitHub Pages

## Interactions
- Add hover states to all clickable cards (subtle lift: `transform: translateY(-3px)` + box-shadow)
- Navigation between pages uses `onclick="location.href='...'"`
- Keep interactions simple and realistic — avoid over-engineering

## Code Style
- Plain HTML + CSS for visual prototypes (no frameworks, no build tools)
- One HTML file per screen
- Inline styles only for one-off overrides; use classes for everything reusable
- No JavaScript unless needed for navigation or simple interactions
- No comments in code unless logic is non-obvious

## GitHub Pages
- Always use relative paths for assets and the UI5 bundle
- UI5 bundle path from a project subfolder: `../../lib/ui5-bundle/ui5-bundle.js`

## Floorplans
When a new page matches a standard SAP Fiori floorplan pattern, **always start from the corresponding floorplan file in `Projects/UI5/` — do not wait to be asked.** Available floorplans: List Report, Object Page, Worklist, Overview Page, Analytical List Page. If no floorplan matches, check whether a page template in `Projects/UI5/` (prefix: `template-`) is a close enough starting point before building from scratch.

Read the relevant floorplan file before building. Project pages (in `Projects/`) use these paths:
- UI5 bundle: `../../lib/ui5-bundle/ui5-bundle.js`
- Shellbar: `../../lib/shared/shellbar.js`
- Shellbar base-path: `../../`

## Component Conventions

`lib/component-conventions.md` is the source of truth for how each UI5 component must be used — including known rendering fixes, required CSS overrides, and mandatory structural patterns. **Read this file before building any new page or component.** Apply all relevant conventions automatically without being asked.

## Screenflows

A screenflow is a single HTML file (`screenflow.html`) that documents the full user journey for a project as a scrollable canvas of screen thumbnails connected by arrows. Not every project needs one — add it only when asked.

### File and path
- One file per project: `screenflow.html` in the project folder
- UI5 bundle path: `../../lib/ui5-bundle/ui5-bundle.js` (same as all project pages)
- Favicon: `../../lib/assets/favicon.ico`

### Canvas and layout
- Background: `#dde1e7`
- Canvas padding: `72px 48px 80px`; `min-width: 3600px` (horizontal scroll for wide flows)
- Flows are separated by a `section-divider` (`1px` line, `rgba(0,0,0,0.12)`)
- Each flow section has `margin-bottom: 72px`

### Toolbar
- Fixed bar at top, `44px` tall, background `#2c2c2c`
- Shows project title and a legend: Vendor (purple `#5b21b6`), Reviewer (blue `#0369a1`), System/Agent (green `#15803d`), Navigation arrow (pink `#e91e8c`), Optional/Conditional dashed arrow
- A **"View Prototype"** button sits flush right (use `flex: 1` spacer before it). Clicking it opens the first screen of the flow in a new tab. Button style: white background, `#1a1a2e` text, `border-radius: 4px`, `padding: 5px 14px`, hover darkens to `#e8e8f0`.

### Screen thumbnails
- Container: `280px × 175px`, `border-radius: 6px`, `overflow: hidden`
- Shadow: `0 2px 8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.08)`
- Hover: `translateY(-3px)` + `0 8px 24px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)`
- iframe inside: `1280px × 800px`, scaled to `0.21875` (= 280/1280), `transform-origin: top left`, `pointer-events: none`
- Transparent overlay div (`screen-frame-overlay`) captures clicks and opens the page in a new tab
- Label above frame: `0.8125rem`, `font-weight: 600`, `color: #1a1a2e`, with a 9px persona-coloured dot
- Caption below frame: `0.6875rem`, `color: #1a1a2e`, `max-width: 280px`, `line-height: 1.4`

### Connectors (arrows)
- Colour: `#e91e8c` throughout — navigation arrows, branch verticals, branch arms
- Solid arrow: `arrow-shaft` (2px tall div) + `arrow-head` (CSS border triangle, 5px × 8px)
- Dashed arrow: `arrow-shaft.dashed` using `repeating-linear-gradient`
- Connectors are wrapped in `.connector` with `margin-top: 113px` (vertically centres on the iframe midpoint) and `padding: 0 6px`
- Where a branch starts, the connector before the branch column uses `margin-top: 147px` (113px + ~34px for sub-flow title height)

### T-junction branching
Use the CSS `branch-col-wrap` pattern — never the old absolute-positioned stem approach.

**Structure:**
```html
<div class="connector" style="margin-top:147px;">…arrow…</div>
<div class="branch-col-wrap" id="FLOW-branch-col">
  <div class="branch-col-vert" id="FLOW-branch-vert"></div>
  <div class="branch-col-rows">
    <div class="branch-col-row">
      <div class="branch-col-row-content">
        <!-- sub-flow title + screens -->
      </div>
    </div>
    <!-- repeat for each branch -->
  </div>
</div>
```

- `.branch-col-vert` draws the vertical spine via `::before` using CSS custom properties `--vert-top` and `--vert-height` set by JS
- `.branch-col-row::before` draws the horizontal arm (52px wide, 2px tall) at `top: 113px` relative to the row
- `.branch-col-row::after` draws the arrowhead at the end of the arm
- `.branch-col-row-content` has `padding-left: 60px` to clear the spine + arm
- `.branch-col-rows` uses `gap: 48px` between rows
- Spine height is set by `drawVert(colId)` in JS, driven by a `ResizeObserver` on `.canvas` and `load` events on all iframes — no fixed timeouts

### Flow and sub-flow titles
Three levels:
- **Main flow** (`.flow-section-title`): `1.375rem`, `font-weight: 700`, dark badge `#1a1a2e` — e.g. `<span>FLOW 1</span> Vendor Experience`
- **Sub-flow** (`.sub-flow-title`): `1rem`, `font-weight: 700`, same dark badge — e.g. `<span>Flow 1a</span> Low Risk Field Changes`
- **Third-level** (`.sub-flow-title-3`): `0.8125rem`, `font-weight: 700`, slightly lighter badge `#3d3d5c` — e.g. `<span>Flow 3a-i</span> Approve`

### Persona colours (dot on screen label)
- Vendor: `#5b21b6`
- Reviewer: `#0369a1`
- System / Agent: `#15803d`
- Default (unassigned): `#9ca3af`
