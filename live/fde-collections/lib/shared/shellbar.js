/**
 * <app-shellbar> — shared shell bar component
 *
 * Attributes:
 *   title="..."           required  maps to ui5-shellbar primary-title
 *   show-search           boolean   show search field + Joule icon injection
 *   hide-menu             boolean   hide hamburger menu button (shown by default)
 *   hide-notifications    boolean   hide notifications icon (shown by default)
 *   hide-product-switch   boolean   hide product switcher (shown by default)
 *   avatar-initials="JD"  string    profile avatar initials (default "JD")
 *   avatar-src="https://" string    profile avatar image URL (overrides initials)
 *   logo-height="22px"    string    inline height on the SAP logo img
 *   base-path="../../"    string    relative path to Claude Code root (default "../../")
 *
 * Slots:
 *   <* slot="extra-items"> — any ui5-shellbar-item children are forwarded into
 *                            the shellbar items slot at the end of the items list
 *
 * Global changes: edit this file → all pages pick them up on reload.
 * Per-page overrides: set attributes or add slot="extra-items" children.
 */

(function () {
  const JOULE_PATHS =
    '<path d="M9.83145 7.75995C10.1914 6.67995 10.6814 6.19995 11.7614 5.82995C12.0814 5.72995 12.0814 5.27995 11.7614 5.16995C10.6814 4.80995 10.2014 4.31995 9.83145 3.23995C9.72145 2.92995 9.28144 2.92995 9.17144 3.23995C8.81144 4.31995 8.32144 4.79995 7.24144 5.16995C6.92144 5.26995 6.92144 5.71995 7.24144 5.82995C8.32144 6.18995 8.80144 6.67995 9.17144 7.75995C9.28144 8.06995 9.72145 8.06995 9.83145 7.75995Z" fill="currentColor"/>' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.35144 15.67C7.50144 15.88 7.74145 16 8.00145 16C8.26145 16 8.50145 15.88 8.65145 15.67L15.8514 5.67C16.0414 5.4 16.0514 5.03 15.8614 4.75L12.8614 0.35C12.7114 0.13 12.4614 0 12.2014 0H4.20144C3.96144 0 3.72144 0.11 3.57144 0.31L0.171445 4.71C-0.0485546 4.99 -0.0585531 5.38 0.151447 5.67L7.35144 15.67ZM8.00145 13.83L1.80144 5.22L4.59144 1.6H11.7714L14.2214 5.19L8.00145 13.83Z" fill="currentColor"/>';

  const HELP_PATHS =
    '<path d="M8 1.6C11.53 1.6 14.4 4.47 14.4 8C14.4 11.53 11.53 14.4 8 14.4C4.47 14.4 1.6 11.53 1.6 8C1.6 4.47 4.47 1.6 8 1.6ZM8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8.02 11C7.47 11 7.02 11.45 7.02 12C7.02 12.55 7.47 13 8.02 13C8.57 13 9.02 12.55 9.02 12C9.02 11.45 8.57 11 8.02 11ZM8 3C6.35 3 5 4.35 5 6C5 6.44 5.36 6.8 5.8 6.8C6.24 6.8 6.6 6.44 6.6 6C6.6 5.23 7.23 4.6 8 4.6C8.77 4.6 9.4 5.23 9.4 6C9.4 6.77 8.77 7.4 8 7.4C7.56 7.4 7.2 7.76 7.2 8.2V9.2C7.2 9.64 7.56 10 8 10C8.44 10 8.8 9.64 8.8 9.2V8.88C10.06 8.53 11 7.38 11 6C11 4.35 9.65 3 8 3Z" fill="currentColor"/>';

  const STYLES = `
    app-shellbar { display: block; }
    app-shellbar ui5-shellbar {
      padding: 0 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    #app-ps-popover { --_ui5_popup_content_padding: 1.5rem; }
    .app-ps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      padding: 1rem;
    }
    .app-ps-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      padding: 1rem 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 0.15s, border-color 0.15s;
      text-align: center;
    }
    .app-ps-item:hover { background: #eaecee; }
    .app-ps-item.active { background: #e8f4ff; border-color: #0070f2; }
    .app-ps-item img { width: 48px; height: 48px; }
    .app-ps-item span { font-family: "72", sans-serif; font-size: 0.875rem; color: #131e29; line-height: 1.3; }
  `;

  const PRODUCTS = [
    { icon: 'Business Suite Home.svg', label: 'SAP Start' },
    { icon: 'Cloud ERP.svg',           label: 'S/4HANA Cloud' },
    { icon: 'SuccessFactors.svg',      label: 'SuccessFactors' },
    { icon: 'Concur.svg',              label: 'Concur' },
    { icon: 'Sales Cloud.svg',         label: 'Sales Cloud' },
    { icon: 'Ariba Procurement.svg',   label: 'Ariba' },
    { icon: 'Business Data Cloud.svg', label: 'Business Data Cloud' },
  ];

  function injectStyles() {
    if (document.getElementById('app-shellbar-styles')) return;
    const style = document.createElement('style');
    style.id = 'app-shellbar-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  function injectJouleIcon(shellbarEl) {
    if (!shellbarEl || !shellbarEl.shadowRoot) { requestAnimationFrame(() => injectJouleIcon(shellbarEl)); return; }
    const icon = shellbarEl.shadowRoot.querySelector('ui5-icon[name="search"]');
    if (!icon || !icon.shadowRoot) { requestAnimationFrame(() => injectJouleIcon(shellbarEl)); return; }
    const svg = icon.shadowRoot.querySelector('svg');
    if (!svg) { requestAnimationFrame(() => injectJouleIcon(shellbarEl)); return; }
    svg.innerHTML = JOULE_PATHS;
  }

  function injectHelpIcon(shellbarEl) {
    if (!shellbarEl || !shellbarEl.shadowRoot) { requestAnimationFrame(() => injectHelpIcon(shellbarEl)); return; }
    // Walk: shellbar shadow → notifications button → its shadow → ui5-icon[bell] → its shadow → svg
    const notifBtn = shellbarEl.shadowRoot.querySelector('[data-ui5-stable="notifications"]') ||
                     shellbarEl.shadowRoot.querySelector('ui5-button[icon="bell"]');
    if (!notifBtn || !notifBtn.shadowRoot) { requestAnimationFrame(() => injectHelpIcon(shellbarEl)); return; }
    const iconEl = notifBtn.shadowRoot.querySelector('ui5-icon');
    if (!iconEl || !iconEl.shadowRoot) { requestAnimationFrame(() => injectHelpIcon(shellbarEl)); return; }
    const svg = iconEl.shadowRoot.querySelector('svg');
    if (!svg) { requestAnimationFrame(() => injectHelpIcon(shellbarEl)); return; }
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.innerHTML = HELP_PATHS;
  }

  class AppShellbar extends HTMLElement {
    connectedCallback() {
      injectStyles();

      const title             = this.getAttribute('title') || 'SAP';
      const showSearch        = this.hasAttribute('show-search');
      const hideMenu          = this.hasAttribute('hide-menu');
      const hideNotif         = this.hasAttribute('hide-notifications');
      const hideProductSwitch = this.hasAttribute('hide-product-switch');
      const avatarInitials    = this.getAttribute('avatar-initials') || 'JD';
      const avatarSrc         = this.getAttribute('avatar-src') || '';
      const logoHeight        = this.getAttribute('logo-height') || '';
      const basePath          = this.getAttribute('base-path') || '../../';

      // Collect extra-items children before we replace innerHTML
      const extraItems = Array.from(this.querySelectorAll('[slot="extra-items"]'));

      // Build ui5-shellbar attributes
      const searchAttr = showSearch ? 'show-search-field' : '';
      const notifAttr  = hideNotif  ? '' : 'show-notifications';
      const psAttr     = hideProductSwitch ? '' : 'show-product-switch';
      const logoStyle  = logoHeight ? ` style="height:${logoHeight}"` : '';
      const avatarSlot = avatarSrc
        ? `<ui5-avatar slot="profile" image="${avatarSrc}" color-scheme="Accent6"></ui5-avatar>`
        : `<ui5-avatar slot="profile" initials="${avatarInitials}" color-scheme="Accent6"></ui5-avatar>`;
      const menuSlot = hideMenu ? '' :
        `<ui5-button slot="startButton" design="Transparent" icon="menu2"></ui5-button>`;
      const searchSlot = showSearch
        ? `<ui5-input slot="searchField" placeholder="Search" show-clear-icon>
             <ui5-icon slot="icon" name="search"></ui5-icon>
           </ui5-input>`
        : '';

      // Product switcher items
      const psItems = PRODUCTS.map(p =>
        `<div class="app-ps-item" onclick="appPsSelect(this)">
           <img src="${basePath}lib/assets/app-icons/${p.icon}" alt="">
           <span>${p.label}</span>
         </div>`
      ).join('');

      const psPopover = hideProductSwitch ? '' : `
        <ui5-popover id="app-ps-popover" placement="Bottom" horizontal-align="End">
          <div class="app-ps-grid">${psItems}</div>
        </ui5-popover>`;

      this.innerHTML = `
        <ui5-shellbar
          primary-title="${title}"
          breakpoint-size="L"
          ${searchAttr}
          ${notifAttr}
          ${psAttr}>
          <img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"${logoStyle} alt="SAP">
          ${menuSlot}
          ${searchSlot}
          ${avatarSlot}
        </ui5-shellbar>
        ${psPopover}
      `;

      // Move extra-items children into the ui5-shellbar items slot
      const shellbarEl = this.querySelector('ui5-shellbar');
      const popover    = this.querySelector('#app-ps-popover');

      if (extraItems.length) {
        extraItems.forEach(el => {
          el.setAttribute('slot', 'items');
          shellbarEl.appendChild(el);
        });
      }

      // Wire product switch click → open popover
      if (!hideProductSwitch) {
        shellbarEl.addEventListener('product-switch-click', (e) => {
          popover.opener = e.detail.targetRef;
          popover.open = !popover.open;
        });
      }

      // Inject Joule icon into the search trigger button
      if (showSearch) injectJouleIcon(shellbarEl);

      // Wire help icon (notifications button) → open SAP Help in new tab
      if (!hideNotif) {
        document.addEventListener('notifications-click', function() {
          var a = document.createElement('a');
          a.href = 'https://help.sap.com/docs';
          a.target = '_blank';
          a.rel = 'noopener';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
        injectHelpIcon(shellbarEl);
      }
    }
  }

  // Global product switcher select handler (shared across all instances)
  window.appPsSelect = function (el) {
    document.querySelectorAll('.app-ps-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  };

  customElements.define('app-shellbar', AppShellbar);
})();
