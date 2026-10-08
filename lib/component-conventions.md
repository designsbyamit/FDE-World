# UI5 Component Conventions

Fixes and usage rules discovered across projects. Apply these in every new page — never deviate without good reason.

---

## ui5-button

**Design hierarchy (always follow this):**
- `design="Emphasized"` — primary action (Save, Approve, Create)
- `design="Default"` — secondary action (Edit, Connect)
- `design="Transparent"` — tertiary / toolbar icon buttons (Cancel, Discard, icon-only)

**Button order in any button group:** positive/primary always on the LEFT, negative/cancel always on the RIGHT. E.g. `[Save] [Cancel]`, `[Approve] [Reject]`.

**Font fix (always apply):**
```css
ui5-button {
  --sapButton_FontFamily: "72", sans-serif;
}
ui5-button::part(text) {
  font-family: "72", sans-serif;
  font-weight: 400;
}
```
> Without this, button text renders in the browser default font instead of SAP 72.

---

## ui5-input

**Search fields — always use this structure:**
```html
<ui5-input placeholder="Search" show-clear-icon>
  <ui5-icon slot="icon" name="search"></ui5-icon>
</ui5-input>
```
- `show-clear-icon` is mandatory on all search/filter inputs.
- Always slot a `ui5-icon name="search"` for search inputs.

**Standard widths:**
- Toolbar search: `width: 200px`
- Filter bar fields: `width: 225px`
- Dialog/form inputs: `width: 100%`

---

## ui5-table

**Always use this full structure — no exceptions:**
```html
<ui5-table>
  <ui5-table-selection-multi slot="features"></ui5-table-selection-multi>
  <ui5-table-header-row slot="headerRow">
    <ui5-table-header-cell width="..." style="padding-inline-start: 1rem">First Column</ui5-table-header-cell>
    <ui5-table-header-cell width="...">Other Column</ui5-table-header-cell>
  </ui5-table-header-row>

  <ui5-table-row interactive>
    <ui5-table-cell style="padding-inline-start: 1rem">First cell value</ui5-table-cell>
    <ui5-table-cell>Other cell value</ui5-table-cell>
    <ui5-table-row-action-navigation slot="actions"></ui5-table-row-action-navigation>
  </ui5-table-row>
</ui5-table>
```

**The `padding-inline-start: 1rem` fix is mandatory** on the first `ui5-table-header-cell` AND the first `ui5-table-cell` in every row. Without it, first column text misaligns due to the auto-created checkbox column.

---

## ui5-shellbar

**Always use the `app-shellbar` custom wrapper** (never hand-code a shellbar directly):
```html
<app-shellbar title="Page Title" base-path="../../"></app-shellbar>
```

**Under the hood, `app-shellbar` always sets `breakpoint-size="L"`** on the inner `ui5-shellbar`. This is mandatory — without it the shellbar fails to detect its container width in static files and renders with no side padding.

**Sticky positioning** is applied automatically by `shellbar.js`. Do not override it.

**Available attributes on `app-shellbar`:**
- `title="..."` — required
- `base-path="../../"` — required, relative path to repo root
- `show-search` — shows search field with Joule icon
- `hide-menu` — hides hamburger button
- `hide-notifications` — hides notifications icon
- `hide-product-switch` — hides product switcher (omit popover from DOM entirely)
- `avatar-initials="JD"` — profile avatar initials
- `avatar-src="..."` — profile avatar image URL

---

## ui5-dialog

**Standard structure:**
```html
<ui5-dialog id="dlg-example" header-text="Dialog Title" style="max-width: 560px">
  <!-- content -->
  <div slot="footer" style="display:flex; justify-content:flex-end; align-items:center; gap:0.5rem; padding:0.5rem; width:100%; box-sizing:border-box;">
    <ui5-button design="Emphasized">Confirm</ui5-button>
    <ui5-button design="Transparent">Cancel</ui5-button>
  </div>
</ui5-dialog>
```

- Always set `max-width: 560px` to prevent full-screen stretch on large monitors.
- Footer buttons follow the same left=positive, right=negative order rule.

---

## ui5-textarea

**Height fill in flex containers requires shadow DOM injection:**
```javascript
const ta = document.querySelector('ui5-textarea');
const s = document.createElement('style');
s.textContent = ':host { height: 100%; } .ui5-textarea-root, textarea { height: 100% !important; box-sizing: border-box; font-family: "72", sans-serif !important; font-size: 0.875rem !important; }';
ta.appendChild(s);
```
> ui5-textarea does not inherit container height by default. This shadow DOM injection is the only reliable fix.

**Font fix (always apply when textarea is visible to the user):**
```css
ui5-textarea {
  --sapFontFamily: "72", sans-serif;
  --sapFontSize: 0.875rem;
}
```

---

## ui5-tabcontainer

**Tab-only navigation (hiding content pane):**
```css
ui5-tabcontainer::part(content) {
  display: none;
}
```
> Use when tabs are purely navigation controls and content is rendered elsewhere on the page.

**Tab with selected state:**
```html
<ui5-tab text="Overview" selected></ui5-tab>
<ui5-tab text="Details"></ui5-tab>
```

---

## ui5-breadcrumbs

**Always set `display: block` on the wrapper or the element itself:**
```css
.page-header ui5-breadcrumbs {
  display: block;
  margin-bottom: 0.4rem;
}
```
> Default inline display causes alignment issues in page headers.

---

## ui5-popover

**Standard pattern:**
```html
<ui5-popover id="pop-example" placement="Bottom" horizontal-align="Start" style="width: 280px">
  <!-- content -->
</ui5-popover>
```
- Always set explicit `width` to prevent overflow.
- `placement="Bottom"` is the standard default.
- Open via JS: `popover.opener = triggerEl; popover.open = true;`

---

## ui5-select / ui5-option

**Always use `ui5-option`, never native `<option>`:**
```html
<ui5-select>
  <ui5-option selected>Default Value</ui5-option>
  <ui5-option>Option A</ui5-option>
  <ui5-option>Option B</ui5-option>
</ui5-select>
```

---

## Global CSS conventions

**Always include SAP 72 font-face declarations** in every HTML file:
```css
@font-face { font-family: "72"; font-weight: 400; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Regular.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 700; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Bold.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 600; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Semibold.woff2") format("woff2"); }
@font-face { font-family: "72"; font-weight: 300; src: url("https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.33.0/content/Base/baseLib/baseTheme/fonts/72-Light.woff2") format("woff2"); }
```

**Always use SAP CSS tokens with hex fallbacks:**
```css
color: var(--sapTextColor, #131e29);
background: var(--sapBackgroundColor, #f5f6f7);
border-color: var(--sapList_BorderColor, #e5e5e5);
```

**Field labels** (text above inputs, form labels, filter bar labels) must always be `0.875rem` — never `0.75rem`. Use `0.75rem` only for secondary/helper text (timestamps, subtitles, KPI units):
```css
.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--sapContent_LabelColor, #556b82);
}
```

**Standard body — do NOT set font-size:**
```css
body {
  font-family: "72", sans-serif;
  background: var(--sapBackgroundColor, #f5f6f7);
  color: var(--sapTextColor, #131e29);
}
```
> Never set `font-size` on `body`, `html`, or via `--sapFontSize`. UI5 components use their own internal sizing — overriding it via body inheritance causes inputs, buttons, and text to render smaller than the Fiori spec. Apply explicit `font-size` only to custom non-UI5 elements (titles, labels, custom divs) where needed.
