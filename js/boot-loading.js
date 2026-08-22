(() => {
  const overlay=document.getElementById('bootLoadingOverlay');
  const bar=document.getElementById('bootLoadingBar');
  const pct=document.getElementById('bootLoadingPct');
  const status=document.getElementById('bootLoadingStatus');
  const retry=document.getElementById('bootLoadingRetry');
  if(!overlay)return;

  let value=8,hidden=false,started=Date.now(),timer=null;
  const set=(n,text)=>{
    value=Math.max(value,Math.min(100,Math.round(n)));
    if(bar)bar.style.width=`${value}%`;
    if(pct)pct.textContent=`${value}%`;
    if(text&&status)status.textContent=text;
  };
  const show=(text='Loading your learning data, please wait....')=>{
    hidden=false;
    document.documentElement.classList.add('gbp-booting');
    overlay.hidden=false;
    overlay.setAttribute('aria-hidden','false');
    if(text&&status)status.textContent=text;
  };
  const hide=()=>{
    if(hidden)return;hidden=true;
    clearInterval(timer);
    set(100,'Ready');
    setTimeout(()=>{
      overlay.classList.add('gbp-boot-done');
      document.documentElement.classList.remove('gbp-booting');
      setTimeout(()=>{overlay.hidden=true;overlay.setAttribute('aria-hidden','true');},220);
    },180);
  };
  const moduleReady=()=>{
    const bank=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK:[];
    if(!bank.length)return false;
    const counts=new Map();
    for(const q of bank){const mid=Number(q?.moduleId);if(mid)counts.set(mid,(counts.get(mid)||0)+1);}
    const known=[...counts.keys()];
    if(known.length<24)return false;
    return known.every(mid=>(counts.get(mid)||0)>0);
  };
  const uiReady=()=>{
    const grid=document.getElementById('dashboardModuleGrid');
    const title=document.getElementById('heroTitle');
    return !!(grid&&title&&grid.children.length>0);
  };
  const check=()=>{
    const elapsed=Date.now()-started;
    if(document.readyState==='interactive'||document.readyState==='complete')set(36,'Restoring your settings....');
    if(Array.isArray(window.QUESTION_BANK)&&window.QUESTION_BANK.length)set(61,'Loading question bank....');
    if(moduleReady())set(82,'Preparing modules and questions....');
    if(uiReady())set(94,'Finalizing your workspace....');
    if(document.readyState==='complete'&&moduleReady()&&uiReady()&&elapsed>650){hide();return;}
    if(elapsed>14000&&!hidden){
      set(94,'Still preparing your workspace....');
      if(retry)retry.hidden=false;
    }
  };

  show();
  timer=setInterval(()=>{
    if(value<30)set(value+2,'Loading application....');
    else if(value<58)set(value+1,'Restoring your settings....');
    else if(value<80)set(value+1,'Loading question bank....');
    else if(value<93)set(value+.5,'Preparing modules and questions....');
    check();
  },180);
  document.addEventListener('DOMContentLoaded',check,{once:true});
  window.addEventListener('load',check,{once:true});
  retry?.addEventListener('click',()=>location.reload());

  window.GBPBootLoading={show,hide,set};
})();