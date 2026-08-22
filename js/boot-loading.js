(() => {
  const overlay=document.getElementById('bootLoadingOverlay');
  const bar=document.getElementById('bootLoadingBar');
  const pct=document.getElementById('bootLoadingPct');
  const status=document.getElementById('bootLoadingStatus');
  const retry=document.getElementById('bootLoadingRetry');
  if(!overlay)return;

  const EXPECTED_IDS=Array.from({length:11},(_,i)=>25+i);
  let value=5,hidden=false,ready=false,timer=null,finishTimer=null;
  const started=Date.now();
  const paint=(n,text)=>{value=Math.max(value,Math.min(100,Math.round(n)));if(bar)bar.style.width=`${value}%`;if(pct)pct.textContent=`${value}%`;if(text&&status)status.textContent=text;};
  const stage=()=>value<25?'Loading application....':value<50?'Restoring your settings....':value<72?'Loading question bank....':value<90?'Preparing NUPMK & BRIDGE modules....':'Finalizing your workspace....';
  const moduleReady=()=>{const bank=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK:[];if(!bank.length)return false;const counts=new Map();for(const q of bank){const mid=Number(q?.moduleId);if(mid)counts.set(mid,(counts.get(mid)||0)+1)}return EXPECTED_IDS.every(mid=>(counts.get(mid)||0)>=25)};
  const uiReady=()=>!!(document.getElementById('dashboardModuleGrid')?.children?.length&&document.getElementById('heroTitle'));

  const show=(text='')=>{hidden=false;document.documentElement.classList.add('gbp-booting');overlay.classList.remove('gbp-boot-done');overlay.hidden=false;overlay.setAttribute('aria-hidden','false');if(text&&status)status.textContent=text};
  const complete=()=>{if(hidden)return;hidden=true;clearInterval(timer);clearInterval(finishTimer);paint(100,'Ready');setTimeout(()=>{overlay.classList.add('gbp-boot-done');document.documentElement.classList.remove('gbp-booting');setTimeout(()=>{overlay.hidden=true;overlay.setAttribute('aria-hidden','true')},180)},160)};
  const startFinish=()=>{if(finishTimer)return;finishTimer=setInterval(()=>{paint(Math.min(100,value+3),'Finalizing your workspace....');if(value>=100)complete()},70)};
  const tick=()=>{
    if(hidden)return;
    ready=document.readyState==='complete'&&moduleReady()&&uiReady();
    if(ready&&Date.now()-started>550){startFinish();return}
    if(value<88)paint(value+(value<35?2:value<70?1:1),stage());
    else if(value<94)paint(value+1,'Almost ready....');
    if(Date.now()-started>12000){if(status)status.textContent='Still preparing your workspace....';if(retry)retry.hidden=false}
  };

  show();paint(5,'Loading application....');timer=setInterval(tick,160);
  document.addEventListener('DOMContentLoaded',tick,{once:true});window.addEventListener('load',tick,{once:true});retry?.addEventListener('click',()=>location.reload());
  window.GBPBootLoading={show,hide:startFinish,set:(n,text)=>paint(Math.min(Number(n)||value,94),text)};
})();