(function () {
  const invoices = [
    { no:'51004821', date:'08/03/2026', po:'N/A', due:'07/03/2026', days:'75', amount:'£18,420.00', size:'2.46 MB' },
    { no:'51005294', date:'08/10/2026', po:'N/A', due:'07/10/2026', days:'68', amount:'£14,875.50', size:'1.31 MB' },
    { no:'51006117', date:'08/14/2026', po:'N/A', due:'07/14/2026', days:'64', amount:'£12,240.00', size:'1.28 MB' },
    { no:'51006742', date:'08/19/2026', po:'N/A', due:'07/19/2026', days:'59', amount:'£11,965.42', size:'1.44 MB' },
    { no:'51007108', date:'08/23/2026', po:'N/A', due:'07/23/2026', days:'55', amount:'£9,850.00', size:'1.17 MB' },
    { no:'51007883', date:'08/28/2026', po:'N/A', due:'07/28/2026', days:'50', amount:'£8,992.00', size:'1.22 MB' },
    { no:'51008156', date:'09/01/2026', po:'N/A', due:'08/01/2026', days:'46', amount:'£7,480.00', size:'1.03 MB' },
    { no:'51008492', date:'09/04/2026', po:'N/A', due:'08/04/2026', days:'43', amount:'£4,220.00', size:'1.36 MB' },
    { no:'51008731', date:'09/07/2026', po:'N/A', due:'08/07/2026', days:'40', amount:'£3,485.00', size:'1.19 MB' },
    { no:'51008964', date:'09/09/2026', po:'N/A', due:'08/09/2026', days:'38', amount:'£2,200.00', size:'1.24 MB' }
  ];
  const maxAttachmentMB = 10;
  const attachmentState = {
    1: { included: new Set(invoices.slice(0, 7).map(item => item.no)), files: [], notice: '' },
    2: { included: new Set(invoices.slice(7).map(item => item.no)), files: [], notice: '' }
  };
  let sentParts = new Set();
  let flowTimer;

  function panel() { return document.getElementById('collectionEmailPanel'); }
  function body() { return document.getElementById('splitPanelBody'); }
  function mode() { return panel().dataset.layout || 'stacked'; }
  function storageKey() { return mode() === 'tabs' ? 'collection-email-tabs-state' : 'collection-email-split-state'; }

  function baseItems(number) { return number === 1 ? invoices.slice(0, 7) : invoices.slice(7); }
  function itemKey(item) { return item.manual ? item.key : item.no; }
  function itemName(item) { return item.manual ? item.name : `Invoice ${item.no}.pdf`; }
  function itemSize(item) { return item.sizeMB == null ? parseFloat(item.size) : item.sizeMB; }
  function allItems(number) { return baseItems(number).concat(attachmentState[number].files); }
  function selectedItems(number) {
    const selected = attachmentState[number].included;
    return allItems(number).filter(item => selected.has(itemKey(item)));
  }
  function attachmentTotal(number) { return selectedItems(number).reduce((sum, item) => sum + itemSize(item), 0); }
  function formatSize(size) { return `${size.toFixed(2)} MB`; }

  function attachmentTable(number, locked) {
    const state = attachmentState[number];
    const items = allItems(number);
    const selectedCount = selectedItems(number).length;
    const total = attachmentTotal(number);
    const atLimit = total >= maxAttachmentMB - 0.001;
    const allSelected = selectedCount === items.length;
    const someSelected = selectedCount > 0 && !allSelected;
    const tableRows = items.map(item => {
      const key = itemKey(item);
      const selected = state.included.has(key);
      const linkAction = item.manual ? `openSplitManualFile(${number},'${key}')` : `openSplitInvoicePdf('${item.no}')`;
      return `<tr><td class="select"><ui5-checkbox accessible-name="Include ${itemName(item)}" ${selected ? 'checked' : ''} ${locked ? 'disabled' : ''} onchange="toggleSplitAttachment(${number},'${key}',this.checked)"></ui5-checkbox></td><td><a class="split-file-link" href="#" target="_blank" aria-label="Open ${itemName(item)} in a new tab" onclick="return ${linkAction}"><ui5-icon name="pdf-attachment"></ui5-icon><span>${itemName(item)}</span></a></td><td>${item.manual ? '—' : item.date}</td><td class="amount">${item.manual ? '—' : item.amount}</td><td class="size">${formatSize(itemSize(item))}</td></tr>`;
    }).join('');
    const notice = state.notice ? `<div class="split-attachment-notice">${state.notice}</div>` : '';
    return `<div class="split-attachment-header"><span>Attachments (${selectedCount} included)</span><span class="split-attachment-total">${formatSize(total)} of 10 MB</span></div><div class="split-attachment-table-wrap"><table class="split-attachment-table"><thead><tr><th class="select"><ui5-checkbox accessible-name="Include all attachments" ${allSelected ? 'checked' : ''} ${someSelected ? 'indeterminate' : ''} ${locked ? 'disabled' : ''} onchange="toggleAllSplitAttachments(${number},this.checked)"></ui5-checkbox></th><th>File Name</th><th>Invoice Date</th><th class="amount">Amount</th><th class="size">File Size</th></tr></thead><tbody>${tableRows}</tbody></table></div><div class="split-attachment-actions"><input id="splitFileInput${number}" type="file" accept="application/pdf,.pdf" hidden onchange="handleSplitFileAdd(${number},this)"><ui5-button design="Transparent" icon="add" ${locked || atLimit ? 'disabled' : ''} onclick="document.getElementById('splitFileInput${number}').click()">Add file</ui5-button><span>${atLimit ? '10 MB limit reached' : `${formatSize(maxAttachmentMB - total)} available`}</span></div>${notice}`;
  }

  function invoiceTable(items) {
    const tableRows = items.map(item => `<tr><td>${item.no}</td><td>${item.po}</td><td class="amount">${item.amount}</td><td>${item.due}</td><td>${item.days}</td></tr>`).join('');
    return `<div class="split-invoice-table-wrap"><table class="split-invoice-table"><thead><tr><th>Invoice</th><th>Invoice Ext. Ref. (PO)</th><th class="amount">Open Amount</th><th>Due Date</th><th>Overdue Days</th></tr></thead><tbody>${tableRows}</tbody></table></div>`;
  }

  function message(number, items) {
    const invoiceItems = items.filter(item => !item.manual);
    const introduction = number === 1
      ? `Please find attached ${invoiceItems.length} of the 10 outstanding invoices listed below. The remaining invoices will arrive separately as part of this same collection follow-up.`
      : `As referenced in our previous email, please find attached ${invoiceItems.length} remaining outstanding invoice${invoiceItems.length === 1 ? '' : 's'} listed below.`;
    return `Hello Accounts Payable Team,<br><br>${introduction}${invoiceTable(invoiceItems)}Please confirm the payment status or provide an expected payment date. Let me know if you need any clarification or supporting documentation.<br><br>Kind regards,<br>Jordan Lee`;
  }

  function emailContent(number, locked) {
    const first = number === 1;
    const items = selectedItems(number);
    const subject = first ? 'Outstanding invoices — Grovemart Retail Group (1 of 2)' : 'Remaining outstanding invoices — Grovemart Retail Group (2 of 2)';
    return `<div class="split-email-meta"><span class="split-email-meta-label">To</span><span>s.mitchell@grovemart.co.uk</span><span class="split-email-meta-label">Subject</span><span>${subject}</span></div><div class="split-email-copy">${message(number, items)}</div>${attachmentTable(number, locked)}`;
  }

  function infoBox() {
    return `<div class="split-info-box"><ui5-icon name="information"></ui5-icon><div class="split-info-text">The 10 invoices total 13.70 MB. The system prepared 7 invoices in Email 1 and the remaining 3 in Email 2, keeping both below the 10 MB limit.</div></div>`;
  }

  function busyDots(compact) {
    return `<span class="split-busy-dots${compact ? ' compact' : ''}"><span class="split-busy-dot"></span><span class="split-busy-dot"></span><span class="split-busy-dot"></span></span>`;
  }

  function stackedCard(number) {
    const sent = sentParts.has(number);
    const count = number === 1 ? 7 : 3;
    return `<section class="split-email-card ${sent ? 'sent' : ''}"><div class="split-email-header"><div class="split-email-heading"><span class="split-sequence-badge">${sent ? '✓' : number}</span><div><div class="split-email-title">Email ${number} — ${count} invoices</div><div class="split-email-subtitle">${sent ? 'Sent successfully' : number === 1 ? 'Ready to send first' : 'Ready · linked to Email 1'}</div></div></div>${sent ? '<ui5-tag design="Positive">Sent</ui5-tag>' : `<ui5-button design="Emphasized" icon="paper-plane" onclick="sendSplitPart(${number})">Send Email ${number}</ui5-button>`}</div><div class="split-email-content">${emailContent(number, sent)}</div></section>`;
  }

  function renderStacked() {
    setFooterPrimary(false);
    const status = sentParts.has(1) && !sentParts.has(2) ? `<div class="split-status"><ui5-icon name="information"></ui5-icon><div><div class="split-status-title">Email 1 sent · Email 2 pending</div><div class="split-status-text">7 invoices were sent successfully. The remaining 3 are preserved below.</div></div></div>` : infoBox();
    body().innerHTML = status + stackedCard(1) + stackedCard(2);
  }

  function renderTabs(activeNumber) {
    const active = activeNumber || 1;
    setFooterPrimary(true);
    body().innerHTML = infoBox() + `<div class="split-tabs-card"><ui5-tabcontainer id="splitEmailTabs"><ui5-tab text="Email 1 · 7 invoices" ${active === 1 ? 'selected' : ''}></ui5-tab><ui5-tab text="Email 2 · 3 invoices" ${active === 2 ? 'selected' : ''}></ui5-tab></ui5-tabcontainer><section id="splitTab1" class="split-tab-panel" ${active === 1 ? '' : 'hidden'}>${emailContent(1, false)}</section><section id="splitTab2" class="split-tab-panel" ${active === 2 ? '' : 'hidden'}>${emailContent(2, false)}</section></div>`;
    const tabs = document.getElementById('splitEmailTabs');
    tabs.addEventListener('tab-select', event => {
      const index = Array.from(tabs.querySelectorAll('ui5-tab')).indexOf(event.detail.tab);
      document.getElementById('splitTab1').hidden = index !== 0;
      document.getElementById('splitTab2').hidden = index !== 1;
    });
  }

  function renderReady() { mode() === 'tabs' ? renderTabs() : renderStacked(); }

  function resetAttachments() {
    attachmentState[1] = { included: new Set(invoices.slice(0, 7).map(item => item.no)), files: [], notice: '' };
    attachmentState[2] = { included: new Set(invoices.slice(7).map(item => item.no)), files: [], notice: '' };
  }

  function refreshEmailEditor(number) { mode() === 'tabs' ? renderTabs(number) : renderStacked(); }

  function setFooterPrimary(visible) {
    const button = document.getElementById('splitFooterPrimary');
    if (button) button.style.display = visible ? '' : 'none';
  }

  function renderLoading(limit) {
    setFooterPrimary(false);
    body().innerHTML = `<div class="split-loading">${busyDots(false)}<div class="split-loading-title">${limit ? 'Preparing two linked emails' : 'Preparing your collection email'}</div><div class="split-loading-text">${limit ? 'The attachment limit is being handled automatically.' : 'Generating content and fetching invoices.'}</div><div class="split-loading-steps"><div class="split-loading-step done"><span class="split-step-dot">✓</span>Generate email content</div><div class="split-loading-step ${limit ? 'done' : 'active'}"><span class="split-step-dot">${limit ? '✓' : '2'}</span>Fetch 10 invoice attachments</div><div class="split-loading-step ${limit ? 'active' : ''}"><span class="split-step-dot">3</span>Optimize attachments for delivery</div></div>${limit ? infoBox() : ''}</div>`;
  }

  function showPanelFrame() {
    const shellbar = document.querySelector('app-shellbar ui5-shellbar') || document.querySelector('ui5-shellbar');
    panel().style.top = ((shellbar ? shellbar.getBoundingClientRect().bottom : 44) + 1) + 'px';
    panel().classList.add('open');
  }

  function openPanel() {
    clearTimeout(flowTimer);
    showPanelFrame();
    if (localStorage.getItem(storageKey()) === 'partial' && mode() === 'stacked') { sentParts = new Set([1]); renderStacked(); return; }
    sentParts = new Set();
    resetAttachments();
    renderLoading(false);
    flowTimer = setTimeout(() => { renderLoading(true); flowTimer = setTimeout(renderReady, 1200); }, 900);
  }

  function closePanel() {
    clearTimeout(flowTimer);
    if (mode() === 'stacked' && sentParts.size === 1) {
      localStorage.setItem(storageKey(), 'partial');
      setPendingAction();
    }
    panel().classList.remove('open');
  }

  function setPendingAction() {
    const card = document.getElementById('email-action-card');
    if (!card) return;
    card.querySelector('strong').textContent = 'Next Best Action: Send Remaining 3 Invoices';
    const paragraph = card.querySelectorAll('p')[1];
    if (paragraph) paragraph.textContent = '7 of 10 invoices have been sent. The remaining 3 invoices are preserved and ready to send.';
    const button = document.getElementById('sendSplitEmailBtn');
    if (button) button.textContent = 'Send Remaining 3 Invoices';
  }

  function completeFlow() {
    setFooterPrimary(false);
    localStorage.removeItem(storageKey());
    body().innerHTML = `<div class="split-complete"><div class="split-complete-icon"><ui5-icon name="complete"></ui5-icon></div><div class="split-complete-title">Collection follow-up completed</div><div class="split-complete-text">All 10 invoices have been sent across 2 emails${mode() === 'tabs' ? ' in sequence with one action' : ''}.</div><ui5-button design="Emphasized" onclick="closeSplitComplete()">Done</ui5-button></div>`;
  }

  function renderProgress(stage) {
    setFooterPrimary(false);
    body().innerHTML = `<div class="split-sequence-progress"><div class="split-progress-title">Sending both emails</div><div class="split-progress-text">No further action is needed. The system is preserving the delivery sequence.</div><div class="split-progress-list"><div class="split-progress-item">${stage > 1 ? '<ui5-icon name="accept"></ui5-icon>' : busyDots(true)}<span><strong>Email 1 · 7 invoices</strong><br>${stage > 1 ? 'Sent successfully' : 'Sending first…'}</span></div><div class="split-progress-item">${stage > 2 ? '<ui5-icon name="accept"></ui5-icon>' : stage > 1 ? busyDots(true) : '<span class="split-step-dot">2</span>'}<span><strong>Email 2 · 3 invoices</strong><br>${stage > 2 ? 'Sent successfully' : stage > 1 ? 'Sending now…' : 'Queued to send next'}</span></div></div></div>`;
  }

  window.openSplitEmailPanel = openPanel;
  window.closeSplitEmailPanel = closePanel;
  window.closeSplitComplete = function () { panel().classList.remove('open'); };
  window.sendSplitPart = function (number) { sentParts.add(number); sentParts.size === 2 ? completeFlow() : renderStacked(); };
  window.toggleSplitAttachment = function (number, key, checked) {
    checked ? attachmentState[number].included.add(key) : attachmentState[number].included.delete(key);
    attachmentState[number].notice = '';
    refreshEmailEditor(number);
  };
  window.toggleAllSplitAttachments = function (number, checked) {
    const selected = attachmentState[number].included;
    selected.clear();
    if (checked) allItems(number).forEach(item => selected.add(itemKey(item)));
    attachmentState[number].notice = '';
    refreshEmailEditor(number);
  };
  window.handleSplitFileAdd = function (number, input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const sizeMB = Math.max(file.size / (1024 * 1024), 0.01);
    const state = attachmentState[number];
    if (attachmentTotal(number) + sizeMB > maxAttachmentMB) {
      state.notice = `${file.name} was not added because it would exceed the 10 MB attachment limit.`;
      input.value = '';
      refreshEmailEditor(number);
      return;
    }
    const key = `manual-${Date.now()}`;
    state.files.push({ key, name:file.name, sizeMB, manual:true, file });
    state.included.add(key);
    state.notice = `${file.name} added to Email ${number}.`;
    refreshEmailEditor(number);
  };
  window.openSplitManualFile = function (number, key) {
    const item = attachmentState[number].files.find(file => file.key === key);
    if (item && item.file) window.open(URL.createObjectURL(item.file), '_blank', 'noopener');
    return false;
  };
  window.openSplitInvoicePdf = function (number) {
    const pdf = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length 92>>stream\nBT /F1 18 Tf 72 720 Td (Invoice ${number}) Tj 0 -30 Td /F1 12 Tf (Grovemart Retail Group) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type:'application/pdf' }));
    window.open(url, '_blank', 'noopener');
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return false;
  };
  window.sendBothSplitEmails = function () {
    renderProgress(1);
    flowTimer = setTimeout(() => { renderProgress(2); flowTimer = setTimeout(() => { renderProgress(3); flowTimer = setTimeout(completeFlow, 600); }, 950); }, 950);
  };

  window.addEventListener('load', () => {
    const button = document.getElementById('sendSplitEmailBtn');
    if (button) button.addEventListener('click', openPanel);
    if (localStorage.getItem(storageKey()) === 'partial' && mode() === 'stacked') setPendingAction();
    const params = new URLSearchParams(location.search);
    const requestedState = params.get('emailState');
    if (requestedState) {
      showPanelFrame();
      if (requestedState === 'loading') renderLoading(false);
      if (requestedState === 'limit') renderLoading(true);
      if (requestedState === 'ready') { sentParts = new Set(); resetAttachments(); renderReady(); }
      if (requestedState === 'sent1') { sentParts = new Set([1]); renderStacked(); }
      if (requestedState === 'complete') completeFlow();
    } else if (params.get('email') === 'open') openPanel();
  });
})();
