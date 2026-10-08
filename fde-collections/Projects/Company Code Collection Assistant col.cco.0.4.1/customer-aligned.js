(function(){
  const aiIcon='<span class="ai-spark">✦</span>';
  const collector=CollectorContext.current,collectorId=CollectorContext.currentId,assignedCodes=collector.codes;
  const scopeFilterOptions='<ui5-option value="all" selected>All Company Codes</ui5-option>'+assignedCodes.map(code=>'<ui5-option value="'+code+'">'+code+'</ui5-option>').join('');
  const emailPanel=document.getElementById('emailPanel');
  document.body.innerHTML=
  '<div class="detail-app">'+
    '<app-shellbar title="Collection Assistant" logo-height="22px" avatar-initials="'+collector.initials+'" hide-menu hide-product-switch base-path="../../"></app-shellbar>'+
    '<header class="detail-header">'+
      '<div class="detail-header-row"><div><div class="detail-breadcrumb"><a href="'+CollectorContext.withCollector('index.html')+'">'+collector.role+' Worklist</a><span>/</span><span>JKL Foods Limited</span></div><h1 class="detail-title">JKL Foods Limited</h1></div><ui5-button class="detail-close" design="Default" id="closeDetail">Close</ui5-button></div>'+
      '<div class="detail-meta"><div class="detail-meta-item"><span class="detail-meta-label">Customer Contact:</span><a href="#" id="primaryContact">m.purdy@jklfood.com</a>,&nbsp;<a href="#" id="moreContacts">2 more</a></div><div class="detail-meta-item">'+aiIcon+'<span class="detail-meta-label" style="margin-left:6px">Priority:</span><span class="priority-chip" id="detailPriority" tabindex="0" role="button" aria-describedby="detailPriorityTooltip">High</span></div></div>'+
    '</header>'+
    '<section class="detail-filter-card" id="detailFilterBar" aria-label="Filters"><div class="detail-filter-fields"><label class="detail-filter-field"><span class="detail-meta-label">Company Code:</span><ui5-select id="detailCompanyCodeFilter" accessible-name="Company Code">'+scopeFilterOptions+'</ui5-select></label><div class="detail-filter-actions"><ui5-button id="applyDetailFilters" design="Emphasized">Go</ui5-button></div></div></section>'+
    '<div class="detail-filter-toggle-row"><ui5-button id="detailFilterToggle" design="Default" icon="slim-arrow-up" tooltip="Collapse filters"></ui5-button><ui5-button id="detailFilterPin" design="Default" icon="pushpin-off" tooltip="Pin filters" accessible-name="Pin filters"></ui5-button></div>'+
    '<div class="detail-body">'+
      '<main class="detail-main">'+
        '<section class="figma-card insight-card-figma"><div class="figma-card-header">'+aiIcon+'<span>Insights and Recommendations</span><span class="scope-explanation"><ui5-icon name="group"></ui5-icon>Customer level · all 3 company codes</span></div><div class="insight-body-figma"><p class="insight-lead"><strong>Multiple invoices in extreme arrears (&gt;90 days)</strong></p><p>JKL Foods Limited has £95.26K overdue across 3 company codes. GB11 and GB95 account for most of the exposure and drive the High customer priority; the oldest invoice is 133 days overdue.</p><div class="action-box-figma"><h3>Next Best Action</h3><div id="nbaList" class="nba-list"></div></div></div></section>'+
        '<section class="figma-card account-card-figma"><nav class="detail-tabs" aria-label="Account details"><button class="detail-tab active" data-tab="overview">Account Overview</button><button class="detail-tab" data-tab="open">Open Items</button><button class="detail-tab" data-tab="payments">Payments/Reimbursements</button><button class="detail-tab" data-tab="disputes">Disputes</button></nav><div id="panel-overview" class="tab-panel-figma active"><section class="kpi-level"><h3>Customer-level KPIs</h3><div class="kpi-grid-figma customer-kpi-grid" id="customerKpis"></div></section><section class="kpi-level company-kpi-level"><h3 id="companyKpiTitle">Company-code KPIs · All Company Codes</h3><div class="kpi-grid-figma" id="companyKpis"></div></section><div class="aging-chart-wrap"><h3 class="aging-title">Aging Invoices</h3><div class="aging-chart"><div class="chart-y"><span class="chart-y-label">Total Amount</span><div class="chart-ticks"><span>50K</span><span>40K</span><span>30K</span><span>20K</span><span>10K</span></div></div><div class="chart-area" id="agingChart"><span class="chart-x-label">Days Overdue</span></div></div></div></div><div id="panel-open" class="tab-panel-figma"></div><div id="panel-payments" class="tab-panel-figma"></div><div id="panel-disputes" class="tab-panel-figma"></div></section>'+
      '</main>'+
      '<aside class="detail-side"><div class="side-title"><span>Account History</span></div><div class="history-range"><ui5-segmented-button id="historyRange"><ui5-segmented-button-item selected>3 Months</ui5-segmented-button-item><ui5-segmented-button-item>6 Months</ui5-segmented-button-item><ui5-segmented-button-item>9 Months</ui5-segmented-button-item><ui5-segmented-button-item>1 Year</ui5-segmented-button-item></ui5-segmented-button></div><div class="history-timeline" id="historyTimeline"></div></aside>'+
    '</div>'+
  '</div>'+
  '<ui5-popover id="contactsPop" placement="Bottom"><div class="contacts-pop"><div><strong>Murphy Purdy</strong><small>m.purdy@jklfood.com · All company codes</small></div><div><strong>Finance</strong><small>finance@jklfood.com · All company codes</small></div><div><strong>Emily Brown</strong><small>e.brown@jklfood.com · All company codes</small></div></div></ui5-popover>'+
  '<div id="detailPriorityTooltip" class="priority-rationale-tooltip" role="tooltip"><strong>High priority · customer level</strong>JKL Foods Limited has £95,261.93 overdue across 3 company codes. GB11 and GB95 account for most of the exposure and drive the priority. '+collector.role+' retains this holistic context while acting only on '+assignedCodes.join(' and ')+'.</div>';
  document.body.appendChild(emailPanel);

  const assignedAggregate=collectorId==='A'
    ?{label:'All Company Codes · 2 assigned',native:'GBP + EUR',overdue:'92,011.93',eom:'120,101.82',oldest:'133',blocked:'8,018.29',blockedCount:'2 orders',disputed:'34,200.00',disputeCount:'5 disputes',creditBalance:'7,500.00',arrear:'115',currency:'GBP'}
    :{label:'All Company Codes · 1 assigned',native:'GBP',overdue:'3,250.00',eom:'4,100.00',oldest:'12',blocked:'0.00',blockedCount:'0 orders',disputed:'450.00',disputeCount:'1 dispute',creditBalance:'500.00',arrear:'12',currency:'GBP'};
  const scopes={
    all:assignedAggregate,
    GB11:{label:'Code GB11',native:'GBP',overdue:'60,000.00',eom:'80,000.00',oldest:'133',blocked:'4,000.00',blockedCount:'1 order',disputed:'20,000.00',disputeCount:'3 disputes',creditBalance:'4,000.00',arrear:'133',currency:'GBP'},
    GB95:{label:'Code GB95',native:'EUR',overdue:'37,661.09',eom:'47,178.61',oldest:'96',blocked:'4,727.40',blockedCount:'1 order',disputed:'16,705.88',disputeCount:'2 disputes',creditBalance:'4,117.65',arrear:'96',currency:'EUR'},
    GB16:{label:'Code GB16',native:'GBP',overdue:'3,250.00',eom:'4,100.00',oldest:'12',blocked:'0.00',blockedCount:'0 orders',disputed:'450.00',disputeCount:'1 dispute',creditBalance:'500.00',arrear:'12',currency:'GBP'}
  };
  const emailInvoices={
    GB11:[
      ['90001894','PO-98765','19,503.26 GBP','12/15/2025','133'],['90007852','PO-43210','13,496.74 GBP','12/20/2025','83'],['90005731','PO-11223','10,000.00 GBP','12/30/2025','80'],['90001929','PO-34129','8,500.00 GBP','01/05/2026','78'],['90007523','PO-77824','8,500.00 GBP','01/15/2026','70']
    ],
    GB95:[
      ['90003141','PO-49281','12,000.00 EUR','12/20/2025','96'],['90006378','PO-61472','10,500.00 EUR','01/24/2026','61'],['90002382','PO-82734','5,161.09 EUR','02/12/2026','42'],['90005372','PO-93518','10,000.00 EUR','03/08/2026','18']
    ],
    GB16:[['90009616','PO-16021','3,250.00 GBP','03/20/2026','12']]
  };
  const openItems=[
    ['90001894','GB11','Invoice','Debit','133','01','01','19,503.26 GBP','12/15/2025',''],['90007852','GB11','Invoice','Debit','83','02','02','13,496.74 GBP','12/20/2025',''],['90005731','GB11','Invoice','Debit','80','03','03','10,000.00 GBP','12/30/2025',''],['90001929','GB11','Invoice','Debit','78','01','01','8,500.00 GBP','01/05/2026','X2'],['90007523','GB11','Credit Note','Credit','70','02','02','8,500.00 GBP','01/15/2026',''],
    ['90003141','GB95','Invoice','Debit','96','02','02','12,000.00 EUR','12/20/2025',''],['90006378','GB95','Invoice','Debit','61','04','04','10,500.00 EUR','01/24/2026','X1'],['90002382','GB95','Credit Note','Credit','42','03','03','5,161.09 EUR','02/12/2026',''],['90005372','GB95','Debit Memo','Debit','18','01','01','10,000.00 EUR','03/08/2026',''],
    ['90009616','GB16','Invoice','Debit','12','01','01','3,250.00 GBP','03/20/2026','']
  ];
  const payments=[
    ['92823','5100852147','02/21/2026','19,503.26 GBP','390.07 GBP','19,113.19 GBP','GB11'],['92823','5100853901','02/21/2026','13,496.74 GBP','269.93 GBP','13,226.81 GBP','GB11'],['92823','5100861247','02/21/2026','10,000.00 GBP','200.00 GBP','9,800.00 GBP','GB11'],['92823','5100874583','02/21/2026','8,500.00 GBP','170.00 GBP','8,330.00 GBP','GB11'],['92823','5100882016','02/21/2026','8,500.00 GBP','170.00 GBP','8,330.00 GBP','GB11'],['92823','5200896754','02/21/2026','12,000.00 EUR','240.00 EUR','11,760.00 EUR','GB95'],['92823','5200903128','02/21/2026','10,500.00 EUR','210.00 EUR','10,290.00 EUR','GB95'],['92823','5200917465','02/21/2026','5,161.09 EUR','103.22 EUR','5,057.87 EUR','GB95'],['92823','5200924803','02/21/2026','10,000.00 EUR','200.00 EUR','9,800.00 EUR','GB95'],['92823','5100961601','03/21/2026','500.00 GBP','0.00 GBP','500.00 GBP','GB16']
  ];
  const disputes=[
    ['DC10189','90001823','19,503.26 GBP','19,503.26 GBP','Open','Pricing Error','03/01/2026','Charlie Davis','GB11'],['DC10177','90001920','13,496.74 GBP','13,496.74 GBP','Open','Quantity Issue','02/28/2026','Alice Smith','GB11'],['DC10153','90007289','10,000.00 GBP','10,000.00 GBP','Open','Pricing Error','02/15/2026','Charlie Davis','GB11'],['DC10097','90008289','8,500.00 GBP','8,500.00 GBP','Open','Billing Error','02/01/2026','Alice Smith','GB11'],['DC10081','90003190','8,500.00 GBP','8,500.00 GBP','In Progress','Quantity Issue','01/21/2026','Charlie Davis','GB11'],['DC10072','90008941','12,000.00 EUR','12,000.00 EUR','Open','Delivery Shortage','01/08/2026','Bob Johnson','GB95'],['DC10066','90004811','10,500.00 EUR','10,500.00 EUR','Open','Quantity Issue','12/21/2025','Bob Johnson','GB95'],['DC10053','90007831','5,161.09 EUR','5,161.09 EUR','Open','Billing Error','12/10/2025','Alice Smith','GB95'],['DC10049','90006272','10,000.00 EUR','10,000.00 EUR','Open','Pricing Error','11/28/2025','Bob Johnson','GB95'],['DC10216','90009616','3,250.00 GBP','450.00 GBP','Open','Quantity Issue','03/22/2026','Priya Shah','GB16']
  ];
  const history=[
    {date:'Mar 22, 2026, 10:12:08 AM',scope:'GB16',body:'A <strong>payment reminder</strong> was prepared for the £3,250.00 overdue balance in company code <strong>GB16</strong>.'},
    {date:'Feb 01, 2026, 9:44:28 AM',scope:'GB11',body:'A <strong>credit limit reached</strong> email with the subject “Credit Limit Reached - JKL Foods Limited - 92823” was sent to <strong>m.purdy@jklfood.com, finance@jklfood.com, and e.brown@jklfood.com</strong> and cc’d to <strong>credit@pt.nestle.com.</strong>'},
    {date:'Jan 13, 2026, 2:20:15 PM',scope:'GB95',body:'A <strong>credit limit reached</strong> email with the subject “Credit Limit Reached - JKL Foods Limited - 92823” was sent to <strong>m.purdy@jklfood.com, finance@jklfood.com, and e.brown@jklfood.com.</strong>'},
    {date:'Jan 10, 2026, 2:27:02 PM',scope:'customer',body:'A <strong>remittance advice</strong> email with the subject “Remittance Advice - JKL Food Limited - 92823” was sent to <strong>finance@jklfood.com.</strong>'}
  ];
  let scope='all';
  function renderKpis(){
    const v=scopes[scope],currency=v.currency;
    const customerItems=[
      {value:'High',unit:'',label:'Customer Priority',negative:true},
      {value:'133',unit:'Days',label:'Oldest Overdue Item'},
      {value:'150,000.00',unit:'GBP',label:'Credit Limit'},
      {value:'95%',unit:'(142,489.01 GBP)',label:'Credit Utilization'}
    ];
    const companyItems=[
      {value:v.overdue,unit:currency,label:'Total Overdue Amount',negative:true},
      {value:v.eom,unit:currency,label:'Due by End of Month'},
      {value:v.blocked,unit:currency+' | '+v.blockedCount,label:'Blocked Order Amount'},
      {value:v.disputed,unit:currency+' | '+v.disputeCount,label:'Disputed Amount'},
      {value:v.creditBalance,unit:currency,label:'Credit Balance'},
      {value:v.arrear,unit:'Days',label:'Predicted Average Arrear Days'}
    ];
    document.getElementById('customerKpis').innerHTML=customerItems.map(item=>'<div class="kpi-tile-figma"><div class="kpi-value-figma '+(item.negative?'negative':'')+'">'+item.value+' <span class="kpi-unit">'+item.unit+'</span></div><div class="kpi-label-figma">'+item.label+'</div></div>').join('');
    document.getElementById('companyKpis').innerHTML=companyItems.map(item=>'<div class="kpi-tile-figma"><div class="kpi-value-figma '+(item.negative?'negative':'')+'">'+item.value+' <span class="kpi-unit">'+item.unit+'</span></div><div class="kpi-label-figma">'+item.label+'</div></div>').join('');
    document.getElementById('companyKpiTitle').textContent='Company-code KPIs · '+(scope==='all'?'All Company Codes':scope);
  }
  function renderChart(){
    const allSet=collectorId==='A'?[['9.1K',20],['41.3K',140],['10.8K',26],['30.8K',94]]:[['0',0],['0',0],['0',0],['3.25K',18]];
    const sets={all:allSet,GB11:[['8.0K',18],['25.0K',90],['9.0K',22],['18.0K',65]],GB95:[['1.3K',8],['19.2K',72],['2.1K',10],['15.1K',56]],GB16:[['0',0],['0',0],['0',0],['3.25K',18]]},labels=['>90','61-90','31-60','1-30'];
    document.getElementById('agingChart').innerHTML=sets[scope].map((bar,i)=>'<div class="bar-group" style="--bar-h:'+bar[1]+'px"><span class="bar-value">'+bar[0]+'</span><div class="bar" style="height:'+bar[1]+'px"></div><span class="bar-label">'+labels[i]+'</span></div>').join('')+'<span class="chart-x-label">Days Overdue</span>';
  }
  const filtered=(rows,idx)=>rows.filter(row=>scope==='all'?assignedCodes.includes(row[idx]):row[idx]===scope);
  function tablePanel(title,headers,rows,codeIndex,actions){
    const visible=filtered(rows,codeIndex);
    const visibleCodes=(scope==='all'?assignedCodes:[scope]).filter(code=>visible.some(row=>row[codeIndex]===code));
    const groups=visibleCodes.map((code,index)=>{const codeRows=visible.filter(row=>row[codeIndex]===code),groupId='code-group-'+title.toLowerCase().replace(/[^a-z]+/g,'-')+'-'+code;return '<section class="code-table-group"><button class="code-group-toggle" type="button" data-target="'+groupId+'" aria-expanded="true"><ui5-icon name="slim-arrow-down"></ui5-icon><strong>'+code+'</strong><span>'+codeRows.length+' item'+(codeRows.length===1?'':'s')+'</span></button><div class="code-group-content" id="'+groupId+'"><div class="detail-data-scroll"><table class="detail-data"><thead><tr><th>Company Code</th>'+headers.map(h=>'<th>'+h+'</th>').join('')+'<th></th></tr></thead><tbody>'+codeRows.map(row=>{const cells=[row[codeIndex],...row.filter((cell,i)=>i!==codeIndex)];return '<tr>'+cells.map((cell,i)=>'<td class="'+(i>5?'num':'')+'">'+cell+'</td>').join('')+'<td class="icon-cell"><ui5-icon name="message-popup"></ui5-icon></td></tr>'}).join('')+'</tbody></table></div></div></section>'}).join('');
    return '<div class="panel-toolbar"><strong>'+title+' ('+visible.length+')</strong><div class="panel-actions">'+(actions||'')+'<ui5-button design="Transparent" icon="action-settings" tooltip="Settings"></ui5-button></div></div>'+groups;
  }
  function renderTables(){
    document.getElementById('panel-open').innerHTML=tablePanel('Open Items',['Invoice','Document Type','Debit or Credit','Days Overdue','Division Code','Posting Key','Open Amount','Due Date','Flag'],openItems,1);
    document.getElementById('panel-payments').innerHTML=tablePanel('Payments & Reimbursements',['Customer ID','Document Number','Payment Date','Amount','Cash Discount','Arrears (Net Due Date)'],payments,6,'<ui5-button design="Transparent" icon="filter" tooltip="Filter"></ui5-button><ui5-button design="Transparent" icon="full-screen" tooltip="Fullscreen"></ui5-button>');
    document.getElementById('panel-disputes').innerHTML=tablePanel('Disputes',['Case ID','Invoice','Invoice Amount','Dispute Amount','Status','Reason Code','Creation Date','Processor'],disputes,8);
    document.querySelectorAll('.code-group-toggle').forEach(button=>button.addEventListener('click',()=>{const content=document.getElementById(button.dataset.target),expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));content.hidden=expanded;button.querySelector('ui5-icon').name=expanded?'slim-arrow-right':'slim-arrow-down'}));
  }
  function renderHistory(){
    document.getElementById('historyTimeline').innerHTML=history.filter(item=>item.scope==='customer'||(assignedCodes.includes(item.scope)&&(scope==='all'||item.scope===scope))).map(item=>'<article class="history-entry"><div class="timeline-mark"></div><div class="history-content"><div class="history-time">'+item.date+(item.scope==='customer'?'<span class="history-scope">All Company Codes</span>':'<span class="history-scope">Code '+item.scope+'</span>')+'</div><div class="history-text">'+item.body+'</div><div class="history-sender">Sent by '+collector.name.toLowerCase().replace(' ','.')+'@nestle.com</div><a href="#" class="history-link">View Email</a></div></article>').join('');
  }
  function renderNba(){
    const actions={
      GB11:{title:'Chase Blocked Orders',copy:'1 order is blocked while £60K is overdue. Contact the customer to resolve the balance and release the order.'},
      GB95:{title:'Send Credit Note Copies',copy:'€37.66K is overdue. Send the relevant EUR invoice and credit-note copies before following up.'},
      GB16:{title:'Send Friendly Reminder',copy:'£3.25K is overdue for 12 days. Send a friendly payment reminder for the relevant invoice.'}
    };
    const codes=scope==='all'?assignedCodes:[scope];
    document.getElementById('nbaList').innerHTML=codes.map(code=>'<article class="nba-code-row"><div><div class="nba-code-label">Company Code: '+code+'</div><strong>'+actions[code].title+'</strong><p>'+actions[code].copy+'</p></div><ui5-button class="nba-email" data-code="'+code+'" design="Default" icon="paper-plane">Send Email</ui5-button></article>').join('');
  }
  function render(){renderKpis();renderChart();renderTables();renderHistory();renderNba()}
  document.querySelectorAll('.detail-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.detail-tab').forEach(item=>item.classList.toggle('active',item===tab));document.querySelectorAll('.tab-panel-figma').forEach(panel=>panel.classList.toggle('active',panel.id==='panel-'+tab.dataset.tab))}));
  const scopeUrl=()=>CollectorContext.withCollector('customer.html?customer=92823'+(scope==='all'?'':'&company='+scope));
  const scopeFilter=document.getElementById('detailCompanyCodeFilter');
  function syncScopeFilter(){scopeFilter.querySelectorAll('ui5-option').forEach(option=>option.selected=option.value===scope)}
  function setScope(nextScope){scope=nextScope;syncScopeFilter();window.history.replaceState(null,'',scopeUrl());render()}
  document.getElementById('applyDetailFilters').addEventListener('click',()=>setScope(scopeFilter.selectedOption?.value||scopeFilter.value||'all'));
  scopeFilter.addEventListener('keydown',event=>{if(event.key==='Enter')setScope(scopeFilter.selectedOption?.value||scopeFilter.value||'all')});
  const filterBar=document.getElementById('detailFilterBar'),filterToggle=document.getElementById('detailFilterToggle'),filterPin=document.getElementById('detailFilterPin');
  function setFiltersCollapsed(collapsed){filterBar.classList.toggle('collapsed',collapsed);filterToggle.icon=collapsed?'slim-arrow-down':'slim-arrow-up';filterToggle.tooltip=collapsed?'Expand filters':'Collapse filters'}
  filterToggle.addEventListener('click',()=>setFiltersCollapsed(!filterBar.classList.contains('collapsed')));
  filterPin.addEventListener('click',()=>{const pinned=filterPin.getAttribute('aria-pressed')!=='true';filterPin.setAttribute('aria-pressed',String(pinned));filterPin.icon=pinned?'pushpin-on':'pushpin-off';filterPin.tooltip=pinned?'Unpin filters':'Pin filters';filterPin.accessibleName=pinned?'Unpin filters':'Pin filters';if(pinned)setFiltersCollapsed(false)});
  const requested=new URLSearchParams(location.search).get('company');if(requested)setScope(assignedCodes.includes(requested)?requested:assignedCodes[0]);else syncScopeFilter();
  document.getElementById('closeDetail').addEventListener('click',()=>location.href=CollectorContext.withCollector('index.html'));
  const contacts=document.getElementById('contactsPop');document.getElementById('moreContacts').addEventListener('click',event=>{event.preventDefault();contacts.opener=event.currentTarget;contacts.open=true});
  document.getElementById('primaryContact').addEventListener('click',event=>event.preventDefault());
  const priority=document.getElementById('detailPriority'),priorityTooltip=document.getElementById('detailPriorityTooltip');
  const showPriority=()=>{const rect=priority.getBoundingClientRect();priorityTooltip.classList.add('visible');const tip=priorityTooltip.getBoundingClientRect();priorityTooltip.style.left=Math.max(8,Math.min(window.innerWidth-tip.width-8,rect.left+rect.width/2-tip.width/2))+'px';priorityTooltip.style.top=rect.bottom+8+'px'};
  priority.addEventListener('mouseenter',showPriority);priority.addEventListener('mouseleave',()=>priorityTooltip.classList.remove('visible'));priority.addEventListener('focus',showPriority);priority.addEventListener('blur',()=>priorityTooltip.classList.remove('visible'));
  function openEmail(actionScope){const currency=scopes[actionScope].currency,amount=scopes[actionScope].overdue,rows=emailInvoices[actionScope].map(row=>'<tr><td>'+row[0]+'</td><td>'+row[1]+'</td><td>'+row[2]+'</td><td>'+row[2]+'</td><td>'+row[3]+'</td><td>'+row[4]+'</td></tr>').join(''),upcomingByCode={GB11:['90009191','3,000.00 GBP','04/19/2026','3'],GB95:['90009482','4,800.00 EUR','04/22/2026','6'],GB16:['90009682','850.00 GBP','04/25/2026','5']},upcoming=upcomingByCode[actionScope];document.getElementById('emailPanelHeader').textContent='Email JKL Foods Limited · Company code '+actionScope;document.getElementById('emailSubject').value=(actionScope==='GB16'?'Friendly reminder · ':'')+'Company code '+actionScope+' · overdue invoices';document.getElementById('emailMessage').innerHTML='<p>Good Morning,</p><p>Hope you are well and safe.</p><p>Please note that company code <strong>'+actionScope+'</strong> has overdue invoices totalling <strong>'+amount+' '+currency+'</strong>.<br>Please send us a proof of payment or remittance so that we can complete the follow-up.</p><h4>Overdue Invoices</h4><table><thead><tr><th>Invoice</th><th>Ext. Ref (PO)</th><th>Invoice Amount</th><th>Open Amount</th><th>Due Date</th><th>Days Overdue</th></tr></thead><tbody>'+rows+'</tbody></table><h4>Upcoming Invoices (Due in the next 7 days)</h4><table><thead><tr><th>Invoice</th><th>Invoice Amount</th><th>Open Amount</th><th>Due Date</th><th>Days Until Due</th></tr></thead><tbody><tr><td>'+upcoming[0]+'</td><td>'+upcoming[1]+'</td><td>'+upcoming[1]+'</td><td>'+upcoming[2]+'</td><td>'+upcoming[3]+'</td></tr></tbody></table><p>Kind regards,<br>'+collector.name+'</p>';emailPanel.classList.add('open');emailPanel.setAttribute('aria-hidden','false')}
  document.getElementById('nbaList').addEventListener('click',event=>{const button=event.target.closest('.nba-email');if(button)openEmail(button.dataset.code)});
  CollectorContext.mount();
  render();
})();
