(() => {
  const cfg=window.BARNSTUDIO_CONFIG||{};
  const publicHttps=(value)=>{try{const u=new URL(String(value||'').trim());return u.protocol==='https:'?u.href:'';}catch{return '';}};
  const down=publicHttps(cfg.downloadUrl);
  const discord=publicHttps(cfg.discordUrl);
  const donate=publicHttps(cfg.donateUrl);
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';
  const text=(fr,en)=>lang()==='en'?en:fr;
  const dialog=document.getElementById('noticeDialog');
  const dialogTitle=document.getElementById('noticeTitle');
  const dialogText=document.getElementById('noticeText');
  function closeNotice(){if(!dialog)return;try{if(dialog.open&&typeof dialog.close==='function')dialog.close();}catch{}dialog.removeAttribute('open');}
  function notice(title,message){
    dialogTitle.textContent=title;dialogText.textContent=message;
    try{if(typeof dialog.showModal==='function'&&!dialog.open){dialog.showModal();return;}}catch{}
    window.alert(title+'\n\n'+message);
  }
  document.getElementById('closeNotice')?.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();closeNotice();});
  dialog?.addEventListener('click',(e)=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))closeNotice();});
  for (const id of ['downloadTop','downloadMain']) {
    const el=document.getElementById(id);if(!el)continue;
    if(down){el.href=down;el.target='_blank';el.rel='noopener noreferrer';}
    else el.addEventListener('click',(e)=>{e.preventDefault();notice(text('Téléchargement indisponible','Download unavailable'),text('Pour obtenir l’installateur, contactez thebarncompagnie@gmail.com.','Email thebarncompagnie@gmail.com for the installer.'));});
  }
  const discordLink=document.getElementById('discordLink');
  if(discordLink){if(discord){discordLink.href=discord;discordLink.target='_blank';discordLink.rel='noopener noreferrer';}
  else discordLink.addEventListener('click',e=>{e.preventDefault();notice(text('Discord indisponible','Discord unavailable'),text('Contactez-nous par e-mail.','Please contact us via email.'));});}
  if(donate){document.querySelectorAll('a.donation').forEach(a=>{a.href=donate;a.target='_blank';a.rel='noopener noreferrer';});}
  const tabs=[...document.querySelectorAll('[role="tab"]')];
  function switchTab(name,historyUpdate=false){
    if(!['applications','outils'].includes(name))return;
    for(const t of tabs){const active=t.id==='tab-'+name;
      t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;
      document.getElementById('panel-'+t.id.replace('tab-','')).hidden=!active;}
    if(historyUpdate&&history.replaceState)history.replaceState(null,'','#'+name);
  }
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>switchTab(t.id.slice(4),true));
    t.addEventListener('keydown',(e)=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
      e.preventDefault();const next=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];next.focus();switchTab(next.id.slice(4),true);});});
  if(location.hash==='#outils')switchTab('outils');
  const countEl=document.getElementById('visitCount');
  const key=String(cfg.visitCounterKey||'barnmap-for-enfusion-visits');
  const counterBase='https://countapi.mileshilliard.com/api/v1';
  (async()=>{
    if(!countEl)return;
    try{
      const action=window.BARNSTUDIO_PREVIEW_MODE?'get':'hit';
      const resp=await fetch(counterBase+'/'+action+'/'+encodeURIComponent(key),{cache:'no-store'});
      if(!resp.ok)throw new Error('Counter unavailable');
      const payload=await resp.json();
      const value=Number(payload.value);
      if(!Number.isFinite(value)||value<0)throw new Error('Invalid counter');
      countEl.textContent=Math.round(value).toLocaleString(document.documentElement.lang==='en'?'en-GB':'fr-FR');
      countEl.dataset.value=String(Math.round(value));
    }catch{
      countEl.textContent='—';
      countEl.title=text('Compteur temporairement indisponible','Counter temporarily unavailable');
    }
  })();
  window.addEventListener('barnstudio-language-change',()=>{
    if(countEl?.dataset.value)countEl.textContent=Number(countEl.dataset.value).toLocaleString(lang()==='en'?'en-GB':'fr-FR');
  });
})();
