(() => {
  const overlay=document.getElementById('bootLoadingOverlay');
  const bar=document.getElementById('bootLoadingBar');
  const pct=document.getElementById('bootLoadingPct');
  const status=document.getElementById('bootLoadingStatus');
  const retry=document.getElementById('bootLoadingRetry');
  if(!overlay)return;

  const START_VALUE=5;
  const SOFT_CAP=97;
  const EXPECTED_MS=2800;
  const MIN_VISIBLE_MS=2200;
  const STALL_MS=14000;
  const started=performance.now();
  let value=START_VALUE;
  let hidden=false;
  let ready=false;
  let timer=null;
  let finishStarted=0;
  let customStatus='';

  const statusFor=n=>{
    if(customStatus)return customStatus;
    if(n<24)return 'Loading application....';
    if(n<47)return 'Restoring your settings....';
    if(n<70)return 'Loading question bank....';
    if(n<90)return 'Preparing modules and questions....';
    return ready?'Finalizing your workspace....':'Almost ready....';
  };

  const paint=(n,text)=>{
    value=Math.max(value,Math.min(100,n));
    const shown=Math.max(0,Math.min(100,Math.round(value)));
    if(bar)bar.style.width=`${value.toFixed(2)}%`;
    if(pct)pct.textContent=`${shown}%`;
    if(status)status.textContent=text||statusFor(value);
  };

  const show=(text='')=>{
    hidden=false;
    customStatus=text||'';
    document.documentElement.classList.add('gbp-booting');
    overlay.classList.remove('gbp-boot-done');
    overlay.hidden=false;
    overlay.setAttribute('aria-hidden','false');
    if(text&&status)status.textContent=text;
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

  const appReady=()=>document.readyState==='complete'&&moduleReady()&&uiReady();

  const complete=()=>{
    if(hidden)return;
    hidden=true;
    clearInterval(timer);
    paint(100,'Ready');
    setTimeout(()=>{
      overlay.classList.add('gbp-boot-done');
      document.documentElement.classList.remove('gbp-booting');
      setTimeout(()=>{
        overlay.hidden=true;
        overlay.setAttribute('aria-hidden','true');
      },220);
    },220);
  };

  const tick=()=>{
    if(hidden)return;
    const elapsed=performance.now()-started;
    ready=appReady();

    // Time-based progress: move continuously from 5% toward 94% over the
    // expected load window. Readiness never causes a visible percentage jump.
    const t=Math.max(0,Math.min(1,elapsed/EXPECTED_MS));
    const eased=1-Math.pow(1-t,1.35);
    let target=START_VALUE+(94-START_VALUE)*eased;

    // If loading takes longer than expected, keep creeping slowly instead of
    // appearing frozen at one percentage.
    if(elapsed>EXPECTED_MS){
      const extra=Math.min(1,(elapsed-EXPECTED_MS)/8000);
      target=94+(SOFT_CAP-94)*extra;
    }

    // Move in small steps so the percentage visibly counts upward.
    const delta=Math.max(.22,Math.min(1.65,(target-value)*.22));
    if(target>value)paint(Math.min(target,value+delta));
    else paint(value);

    if(ready&&elapsed>=MIN_VISIBLE_MS){
      if(!finishStarted)finishStarted=performance.now();
      customStatus='';
      const finishElapsed=performance.now()-finishStarted;
      const start=Math.max(value,94);
      const finishTarget=start+(100-start)*Math.min(1,finishElapsed/520);
      if(finishTarget>value)paint(Math.min(100,finishTarget),'Finalizing your workspace....');
      if(finishElapsed>=540){complete();return;}
    }

    if(elapsed>STALL_MS){
      customStatus='Still preparing your workspace....';
      if(status)status.textContent=customStatus;
      if(retry)retry.hidden=false;
    }
  };

  show();
  paint(START_VALUE,'Loading application....');
  timer=setInterval(tick,80);
  document.addEventListener('DOMContentLoaded',tick,{once:true});
  window.addEventListener('load',tick,{once:true});
  retry?.addEventListener('click',()=>location.reload());

  window.GBPBootLoading={
    show(text=''){
      customStatus=text||'';
      show(customStatus);
    },
    hide(){ready=true;if(!finishStarted)finishStarted=performance.now();},
    set(n,text){paint(Math.min(Number(n)||value,SOFT_CAP),text);}
  };
})();