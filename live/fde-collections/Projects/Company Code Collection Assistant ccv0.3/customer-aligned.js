(function(){
  const aiIcon='<span class="ai-spark">✦</span>';
  const emailPanel=document.getElementById('emailPanel');
  document.body.innerHTML=
  '<div class="detail-app">'+
    '<app-shellbar title="Collection Assistant" logo-height="22px" avatar-initials="AL" hide-menu hide-product-switch base-path="../../"></app-shellbar>'+
    '<header class="detail-header">'+
      '<div class="detail-header-row"><div><div class="detail-breadcrumb"><a href="index.html">Collection Worklist</a><span>/</span><span>JKL Foods Limited</span></div><h1 class="detail-title">JKL Foods Limited</h1></div><ui5-button class="detail-close" design="Default" id="closeDetail">Close</ui5-button></div>'+
      '<div class="detail-meta"><div class="detail-meta-item"><span class="detail-meta-label">Customer Contact:</span><a href="#" id="primaryContact">m.purdy@jklfood.com</a>,&nbsp;<a href="#" id="moreContacts">2 more</a></div><div class="detail-meta-item">'+aiIcon+'<span class="detail-meta-label" style="margin-left:6px">Priority:</span><span class="priority-chip">High</span></div><div class="detail-meta-item"><span class="detail-meta-label">Company Code:</span><ui5-select id="detailScope" class="company-scope-select"><ui5-option value="all" selected>All Company Codes</ui5-option><ui5-option value="GB-11">GB-11</ui5-option><ui5-option value="GB-95">GB-95</ui5-option></ui5-select></div></div>'+ 
    '</header>'+
    '<div class="detail-body">'+
      '<main class="detail-main">'+
        '<section class="figma-card insight-card-figma"><div class="figma-card-header">'+aiIcon+'<span>Insights and Recommendations</span></div><div class="insight-body-figma"><p class="insight-lead"><strong>Multiple invoices in extreme arrears (&gt;90 days)</strong></p><p>Customer has £92K currently overdue across 9 invoices, with the oldest invoice overdue by 133 days. An additional £28K is due to become overdue by end of the month, increasing total exposure risk.</p><div class="action-box-figma"><p><strong id="nbaTitle">Select a company code for Next Best Action</strong><span id="nbaScope" class="history-scope">Company code required</span></p><p id="nbaCopy">Actions and outbound communication are always prepared for one company code.</p><div class="action-buttons-figma"><ui5-button id="sendEmailBtn" design="Default" icon="paper-plane" disabled>Send Email</ui5-button><ui5-button id="followUpBtn" design="Transparent" icon="task" disabled>Create Follow-Up Task</ui5-button></div></div></div></section>'+
        '<section class="figma-card account-card-figma"><nav class="detail-tabs" aria-label="Account details"><button class="detail-tab active" data-tab="overview">Account Overview</button><button class="detail-tab" data-tab="open">Open Items</button><button class="detail-tab" data-tab="payments">Payments/Reimbursements</button><button class="detail-tab" data-tab="disputes">Disputes</button></nav><div id="panel-overview" class="tab-panel-figma active"><div class="kpi-grid-figma" id="detailKpis"></div><div class="aging-chart-wrap"><h3 class="aging-title">Aging Invoices</h3><div class="aging-chart"><div class="chart-y"><span class="chart-y-label">Total Amount</span><div class="chart-ticks"><span>50K</span><span>40K</span><span>30K</span><span>20K</span><span>10K</span></div></div><div class="chart-area" id="agingChart"><span class="chart-x-label">Days Overdue</span></div></div></div></div><div id="panel-open" class="tab-panel-figma"></div><div id="panel-payments" class="tab-panel-figma"></div><div id="panel-disputes" class="tab-panel-figma"></div></section>'+
      '</main>'+
      '<aside class="detail-side"><div class="side-title"><span>Account History</span></div><div class="history-range"><ui5-segmented-button id="historyRange"><ui5-segmented-button-item selected>3 Months</ui5-segmented-button-item><ui5-segmented-button-item>6 Months</ui5-segmented-button-item><ui5-segmented-button-item>9 Months</ui5-segmented-button-item><ui5-segmented-button-item>1 Year</ui5-segmented-button-item></ui5-segmented-button></div><div class="history-timeline" id="historyTimeline"></div></aside>'+
    '</div>'+
  '</div>'+
  '<ui5-popover id="contactsPop" placement="Bottom"><div class="contacts-pop"><div><strong>Murphy Purdy</strong><small>m.purdy@jklfood.com · All company codes</small></div><div><strong>Finance</strong><small>finance@jklfood.com · All company codes</small></div><div><strong>Emily Brown</strong><small>e.brown@jklfood.com · All company codes</small></div></div></ui5-popover>';
  document.body.appendChild(emailPanel);

  const scopes={
    all:{label:'All codes',native:'GBP + EUR',overdue:'92,011.93',eom:'120,101.82',oldest:'133',blocked:'8.02K',blockedCount:'2 orders',disputed:'34.20K',disputeCount:'5 disputes',creditBalance:'7,500.00',arrear:'114',currency:'GBP'},
    'GB-11':{label:'Code GB-11',native:'GBP',overdue:'60,000.00',eom:'80,000.00',oldest:'133',blocked:'4,000.00',blockedCount:'1 order',disputed:'20,000.00',disputeCount:'3 disputes',creditBalance:'4,000.00',arrear:'133',currency:'GBP'},
    'GB-95':{label:'Code GB-95',native:'EUR',overdue:'37,661.09',eom:'47,178.61',oldest:'96',blocked:'4,727.40',blockedCount:'1 order',disputed:'16,705.88',disputeCount:'2 disputes',creditBalance:'4,117.65',arrear:'96',currency:'EUR'}
  };
  const emailInvoices={
    'GB-11':[
      ['90001894','PO-98765','19,503.26 GBP','12/15/2025','133'],['90007852','PO-43210','13,496.74 GBP','12/20/2025','83'],['90005731','PO-11223','10,000.00 GBP','12/30/2025','80'],['90001929','PO-34129','8,500.00 GBP','01/05/2026','78'],['90007523','PO-77824','8,500.00 GBP','01/15/2026','70']
    ],
    'GB-95':[
      ['90003141','PO-49281','12,000.00 EUR','12/20/2025','96'],['90006378','PO-61472','10,500.00 EUR','01/24/2026','61'],['90002382','PO-82734','5,161.09 EUR','02/12/2026','42'],['90005372','PO-93518','10,000.00 EUR','03/08/2026','18']
    ]
  };
  const openItems=[
    ['90001894','GB-11','Invoice','Debit','133','01','01','19,503.26 GBP','12/15/2025',''],['90007852','GB-11','Invoice','Debit','83','02','02','13,496.74 GBP','12/20/2025',''],['90005731','GB-11','Invoice','Debit','80','03','03','10,000.00 GBP','12/30/2025',''],['90001929','GB-11','Invoice','Debit','78','01','01','8,500.00 GBP','01/05/2026','X2'],['90007523','GB-11','Credit Note','Credit','70','02','02','8,500.00 GBP','01/15/2026',''],
    ['90003141','GB-95','Invoice','Debit','96','02','02','12,000.00 EUR','12/20/2025',''],['90006378','GB-95','Invoice','Debit','61','04','04','10,500.00 EUR','01/24/2026','X1'],['90002382','GB-95','Credit Note','Credit','42','03','03','5,161.09 EUR','02/12/2026',''],['90005372','GB-95','Debit Memo','Debit','18','01','01','10,000.00 EUR','03/08/2026','']
  ];
  const payments=[
    ['92823','5100852147','02/21/2026','19,503.26 GBP','390.07 GBP','19,113.19 GBP','GB-11'],['92823','5100853901','02/21/2026','13,496.74 GBP','269.93 GBP','13,226.81 GBP','GB-11'],['92823','5100861247','02/21/2026','10,000.00 GBP','200.00 GBP','9,800.00 GBP','GB-11'],['92823','5100874583','02/21/2026','8,500.00 GBP','170.00 GBP','8,330.00 GBP','GB-11'],['92823','5100882016','02/21/2026','8,500.00 GBP','170.00 GBP','8,330.00 GBP','GB-11'],['92823','5200896754','02/21/2026','12,000.00 EUR','240.00 EUR','11,760.00 EUR','GB-95'],['92823','5200903128','02/21/2026','10,500.00 EUR','210.00 EUR','10,290.00 EUR','GB-95'],['92823','5200917465','02/21/2026','5,161.09 EUR','103.22 EUR','5,057.87 EUR','GB-95'],['92823','5200924803','02/21/2026','10,000.00 EUR','200.00 EUR','9,800.00 EUR','GB-95']
  ];
  const disputes=[
    ['DC10189','90001823','19,503.26 GBP','19,503.26 GBP','Open','Pricing Error','03/01/2026','Charlie Davis','GB-11'],['DC10177','90001920','13,496.74 GBP','13,496.74 GBP','Open','Quantity Issue','02/28/2026','Alice Smith','GB-11'],['DC10153','90007289','10,000.00 GBP','10,000.00 GBP','Open','Pricing Error','02/15/2026','Charlie Davis','GB-11'],['DC10097','90008289','8,500.00 GBP','8,500.00 GBP','Open','Billing Error','02/01/2026','Alice Smith','GB-11'],['DC10081','90003190','8,500.00 GBP','8,500.00 GBP','In Progress','Quantity Issue','01/21/2026','Charlie Davis','GB-11'],['DC10072','90008941','12,000.00 EUR','12,000.00 EUR','Open','Delivery Shortage','01/08/2026','Bob Johnson','GB-95'],['DC10066','90004811','10,500.00 EUR','10,500.00 EUR','Open','Quantity Issue','12/21/2025','Bob Johnson','GB-95'],['DC10053','90007831','5,161.09 EUR','5,161.09 EUR','Open','Billing Error','12/10/2025','Alice Smith','GB-95'],['DC10049','90006272','10,000.00 EUR','10,000.00 EUR','Open','Pricing Error','11/28/2025','Bob Johnson','GB-95']
  ];
  const history=[
    {date:'Feb 01, 2026, 9:44:28 AM',scope:'GB-11',body:'A <strong>credit limit reached</strong> email with the subject “Credit Limit Reached - JKL Foods Limited - 92823” was sent to <strong>m.purdy@jklfood.com, finance@jklfood.com, and e.brown@jklfood.com</strong> and cc’d to <strong>credit@pt.nestle.com.</strong>'},
    {date:'Jan 13, 2026, 2:20:15 PM',scope:'GB-95',body:'A <strong>credit limit reached</strong> email with the subject “Credit Limit Reached - JKL Foods Limited - 92823” was sent to <strong>m.purdy@jklfood.com, finance@jklfood.com, and e.brown@jklfood.com.</strong>'},
    {date:'Jan 10, 2026, 2:27:02 PM',scope:'customer',body:'A <strong>remittance advice</strong> email with the subject “Remittance Advice - JKL Food Limited - 92823” was sent to <strong>finance@jklfood.com.</strong>'}
  ];
  let scope='all';
  const badge=(text,type)=>'<span class="scope-mini '+(type==='customer'?'customer':'')+'">'+text+'</span>';
  function renderKpis(){
    const v=scopes[scope],currency=v.currency;
    const items=[
      {value:v.overdue,unit:currency,label:'Total Overdue Amount',negative:true,scope:v.label},
      {value:v.eom,unit:currency,label:'Due by End of Month',scope:v.label},
      {value:v.oldest,unit:'Days',label:'Oldest Overdue Item',scope:'Customer',customer:true},
      {value:'150,000.00',unit:'GBP',label:'Credit Limit',scope:'Customer',customer:true},
      {value:'95%',unit:'(142,489.01 GBP)',label:'Credit Utilization',scope:'Customer',customer:true},
      {value:v.blocked,unit:currency+' | '+v.blockedCount,label:'Blocked Order Amount',scope:v.label},
      {value:v.disputed,unit:currency+' | '+v.disputeCount,label:'Disputed Amount',scope:v.label},
      {value:v.creditBalance,unit:currency,label:'Credit Balance',scope:v.label},
      {value:v.arrear,unit:'Days',label:'Predicted Average Arrear Days',scope:v.label}
    ];
    document.getElementById('detailKpis').innerHTML=items.map(item=>'<div class="kpi-tile-figma">'+badge(item.scope,item.customer?'customer':'code')+'<div class="kpi-value-figma '+(item.negative?'negative':'')+'">'+item.value+' <span class="kpi-unit">'+item.unit+'</span></div><div class="kpi-label-figma">'+item.label+'</div></div>').join('');
  }
  function renderChart(){
    const sets={all:[['9.1K',20],['41.3K',140],['10.8K',26],['30.8K',94]],'GB-11':[['8.0K',18],['25.0K',90],['9.0K',22],['18.0K',65]],'GB-95':[['1.3K',8],['19.2K',72],['2.1K',10],['15.1K',56]]},labels=['>90','61-90','31-60','1-30'];
    document.getElementById('agingChart').innerHTML=sets[scope].map((bar,i)=>'<div class="bar-group" style="--bar-h:'+bar[1]+'px"><span class="bar-value">'+bar[0]+'</span><div class="bar" style="height:'+bar[1]+'px"></div><span class="bar-label">'+labels[i]+'</span></div>').join('')+'<span class="chart-x-label">Days Overdue</span>';
  }
  const filtered=(rows,idx)=>scope==='all'?rows:rows.filter(row=>row[idx]===scope);
  function tablePanel(title,headers,rows,codeIndex,actions){
    const visible=filtered(rows,codeIndex);
    return '<div class="panel-toolbar"><strong>'+title+' ('+visible.length+')</strong><div class="panel-actions">'+(actions||'')+'<ui5-button design="Transparent" icon="action-settings" tooltip="Settings"></ui5-button></div></div><div class="detail-data-scroll"><table class="detail-data"><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'<th></th></tr></thead><tbody>'+visible.map(row=>'<tr>'+row.map((cell,i)=>'<td class="'+(i>5?'num':'')+'">'+cell+'</td>').join('')+'<td class="icon-cell"><ui5-icon name="message-popup"></ui5-icon></td></tr>').join('')+'</tbody></table></div>';
  }
  function renderTables(){
    document.getElementById('panel-open').innerHTML=tablePanel('Line Items',['Invoice','Company Code','Document Type','Debit or Credit','Days Overdue','Division Code','Posting Key','Open Amount','Due Date','Flag'],openItems,1);
    document.getElementById('panel-payments').innerHTML=tablePanel('Line Items',['Customer ID','Document Number','Payment Date','Amount','Cash Discount','Arrears (Net Due Date)','Company Code'],payments,6,'<ui5-button design="Transparent" icon="filter" tooltip="Filter"></ui5-button><ui5-button design="Transparent" icon="full-screen" tooltip="Fullscreen"></ui5-button>');
    document.getElementById('panel-disputes').innerHTML=tablePanel('Dispute Items',['Case ID','Invoice','Invoice Amount','Dispute Amount','Status','Reason Code','Creation Date','Processor','Company Code'],disputes,8);
  }
  function renderHistory(){
    document.getElementById('historyTimeline').innerHTML=history.filter(item=>scope==='all'||item.scope==='customer'||item.scope===scope).map(item=>'<article class="history-entry"><div class="timeline-mark"></div><div class="history-content"><div class="history-time">'+item.date+(item.scope==='customer'?'<span class="history-scope">Customer</span>':'<span class="history-scope">Code '+item.scope+'</span>')+'</div><div class="history-text">'+item.body+'</div><div class="history-sender">Send by jordan.lee@nestle.com</div><a href="#" class="history-link">View Email</a></div></article>').join('');
  }
  function renderNba(){
    const title=document.getElementById('nbaTitle'),copy=document.getElementById('nbaCopy'),tag=document.getElementById('nbaScope'),email=document.getElementById('sendEmailBtn'),task=document.getElementById('followUpBtn');
    if(scope==='all'){title.textContent='Next Best Action: Chase Blocked Orders';copy.textContent='1 order is blocked while £60K is overdue for company code GB-11. Contacting the customer may help resolve the balance and release the order.';tag.textContent='Code GB-11';email.disabled=false;task.disabled=false;return}
    title.textContent=scope==='GB-11'?'Next Best Action: Chase Blocked Orders':'Next Best Action: Send Credit Note Copies';copy.textContent=scope==='GB-11'?'1 order is blocked while £60K is overdue for company code GB-11. Contacting the customer may help resolve the balance and release the order.':'€37.66K is overdue for company code GB-95. Send the relevant EUR invoice and credit-note copies before following up.';tag.textContent='Code '+scope;email.disabled=false;task.disabled=false;
  }
  function render(){renderKpis();renderChart();renderTables();renderHistory();renderNba()}
  document.querySelectorAll('.detail-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.detail-tab').forEach(item=>item.classList.toggle('active',item===tab));document.querySelectorAll('.tab-panel-figma').forEach(panel=>panel.classList.toggle('active',panel.id==='panel-'+tab.dataset.tab))}));
  document.getElementById('detailScope').addEventListener('change',event=>{scope=event.currentTarget.selectedOption.value;window.history.replaceState(null,'','?customer=92823'+(scope==='all'?'':'&company='+scope));render()});
  const requested=new URLSearchParams(location.search).get('company');if(requested&&scopes[requested]){scope=requested;customElements.whenDefined('ui5-select').then(()=>{document.querySelector('#detailScope ui5-option[value="all"]').selected=false;document.querySelector('#detailScope ui5-option[value="'+requested+'"]').selected=true;render()})}
  document.getElementById('closeDetail').addEventListener('click',()=>location.href='index.html');
  const contacts=document.getElementById('contactsPop');document.getElementById('moreContacts').addEventListener('click',event=>{event.preventDefault();contacts.opener=event.currentTarget;contacts.open=true});
  document.getElementById('primaryContact').addEventListener('click',event=>event.preventDefault());
  document.getElementById('sendEmailBtn').addEventListener('click',()=>{const actionScope=scope==='all'?'GB-11':scope,currency=scopes[actionScope].currency,amount=scopes[actionScope].overdue,rows=emailInvoices[actionScope].map(row=>'<tr><td>'+row[0]+'</td><td>'+row[1]+'</td><td>'+row[2]+'</td><td>'+row[2]+'</td><td>'+row[3]+'</td><td>'+row[4]+'</td></tr>').join(''),upcoming=actionScope==='GB-11'?['90009191','3,000.00 GBP','04/19/2026','3']:['90009482','4,800.00 EUR','04/22/2026','6'];document.getElementById('emailPanelHeader').textContent='Email JKL Foods Limited · Company code '+actionScope;document.getElementById('emailSubject').value='Company code '+actionScope+' · overdue invoices';document.getElementById('emailMessage').innerHTML='<p>Good Morning,</p><p>Hope you are well and safe.</p><p>Please note that company code <strong>'+actionScope+'</strong> has overdue invoices totalling <strong>'+amount+' '+currency+'</strong>.<br>Please send us a proof of payment or remittance so that we can complete the follow-up.</p><h4>Overdue Invoices</h4><table><thead><tr><th>Invoice</th><th>Ext. Ref (PO)</th><th>Invoice Amount</th><th>Open Amount</th><th>Due Date</th><th>Days Overdue</th></tr></thead><tbody>'+rows+'</tbody></table><h4>Upcoming Invoices (Due in the next 7 days)</h4><table><thead><tr><th>Invoice</th><th>Invoice Amount</th><th>Open Amount</th><th>Due Date</th><th>Days Until Due</th></tr></thead><tbody><tr><td>'+upcoming[0]+'</td><td>'+upcoming[1]+'</td><td>'+upcoming[1]+'</td><td>'+upcoming[2]+'</td><td>'+upcoming[3]+'</td></tr></tbody></table><p>Kind regards,<br>Jordan Lee</p>';emailPanel.classList.add('open');emailPanel.setAttribute('aria-hidden','false')});
  render();
})();
