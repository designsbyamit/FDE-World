(function(){
  const collectors={
    A:{id:'A',name:'Alan Morgan',role:'Collector A',initials:'AM',codes:['GB11','GB95']},
    B:{id:'B',name:'Priya Shah',role:'Collector B',initials:'PS',codes:['GB16']}
  };
  const params=new URLSearchParams(location.search);
  const currentId=collectors[params.get('collector')]?params.get('collector'):'A';
  const current=collectors[currentId];
  const withCollector=(href,id=currentId)=>{const url=new URL(href,location.href);url.searchParams.set('collector',id);return url.pathname.split('/').pop()+url.search};
  function mount(){
    document.getElementById('collectorMenu')?.remove();
    const pop=document.createElement('ui5-popover');
    pop.id='collectorMenu';pop.setAttribute('placement','Bottom');pop.setAttribute('horizontal-align','End');
    pop.innerHTML='<div class="collector-menu"><div class="collector-menu-label">Signed in as</div><div class="collector-current"><ui5-avatar initials="'+current.initials+'" color-scheme="Accent6"></ui5-avatar><div><strong>'+current.name+'</strong><span>'+current.role+' · '+current.codes.join(', ')+'</span></div></div><div class="collector-menu-label choose">Switch collector</div>'+Object.values(collectors).map(item=>'<button class="collector-option '+(item.id===currentId?'selected':'')+'" type="button" data-collector="'+item.id+'"><span class="collector-check">'+(item.id===currentId?'✓':'')+'</span><span><strong>'+item.role+' · '+item.name+'</strong><small>Assigned company codes: '+item.codes.join(', ')+'</small></span></button>').join('')+'</div>';
    document.body.appendChild(pop);
    const app=document.querySelector('app-shellbar'),shell=app?.querySelector('ui5-shellbar'),avatar=shell?.querySelector('ui5-avatar');
    if(avatar)avatar.initials=current.initials;
    if(shell)shell.addEventListener('profile-click',event=>{pop.opener=event.detail.targetRef;pop.open=true});
    pop.querySelectorAll('.collector-option').forEach(button=>button.addEventListener('click',()=>{location.href=withCollector('index.html',button.dataset.collector)}));
  }
  window.CollectorContext={collectors,currentId,current,withCollector,mount};
})();
