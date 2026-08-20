(() => {
  const KEY='generalBankingGeneratedV5';
  const BASE=window.QUESTION_BANK||[];
  const baseIds=new Set(BASE.map(q=>q.id));
  let generated=[];
  try{const x=JSON.parse(localStorage.getItem(KEY)||'[]'); if(Array.isArray(x)) generated=x.filter(q=>q&&q.id&&!baseIds.has(q.id));}catch(e){}
  BASE.push(...generated);
  const frames=[
    ['Dalam simulasi assessment, abaikan detail yang tidak relevan dan tentukan keputusan paling tepat.','Pilih jawaban paling defensible berdasarkan konsep modul.'],
    ['Seorang pejabat bank melakukan second-check atas kasus berikut.','Tentukan respons paling tepat, bukan sekadar yang terdengar paling aman.'],
    ['Dalam rapat evaluasi, empat alternatif diperdebatkan dan hanya satu paling konsisten dengan prinsip yang berlaku.','Pilih alternatif terbaik.'],
    ['Kasus ini memuat beberapa informasi pengalih perhatian. Fokus pada inti masalah.','Manakah pilihan paling tepat?'],
    ['Pada BRIDGE-style reasoning, peserta harus membedakan konsep yang sangat mirip.','Pilih jawaban yang paling presisi.'],
    ['Dalam quality review, jawaban tidak boleh dipilih hanya karena paling panjang atau komprehensif.','Gunakan konsep inti untuk memilih jawaban.'],
    ['Kasus berikut menguji pemahaman substansi, bukan hafalan kata kunci.','Pilih opsi yang paling sesuai dengan prinsip modul.'],
    ['Anggap fakta yang tidak disebutkan bersifat netral dan evaluasi hanya informasi yang tersedia.','Apa keputusan paling tepat?'],
    ['Beberapa opsi terlihat sama-sama masuk akal pada pandangan pertama.','Pilih satu yang paling tepat setelah membedakan detailnya.'],
    ['Tim kontrol sedang melakukan challenge terhadap keputusan awal unit bisnis.','Manakah kesimpulan yang paling kuat?'],
    ['Jawaban harus dapat dipertanggungjawabkan apabila diuji kembali oleh reviewer.','Pilih jawaban terbaik.'],
    ['Distractor berasal dari konsep yang berdekatan.','Identifikasi jawaban yang paling tepat.']
  ];
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const rank=q=>q.difficulty==='Expert'?5:q.difficulty==='Challenge'?4:String(q.difficulty).includes('Sulit')?3:2;
  const countFor=m=>generated.filter(q=>q.moduleId===m).length;
  function make(base,m,i){const f=frames[Math.floor(Math.random()*frames.length)],nonce=Date.now().toString(36)+Math.random().toString(36).slice(2,8);return {...base,id:`GEN-M${m}-${nonce}-${i}`,question:`${f[0]} ${base.question} ${f[1]}`,options:[...base.options],source:`${base.source} · Generated variant`,difficulty:rank(base)>=4?base.difficulty:'Sulit',skill:'Generated Variant',generated:true,baseId:base.id}}
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),2400)}
  function generate(m,amount=12){const current=countFor(m),limit=180;if(current>=limit)return toast(`Batas ${limit} soal generated untuk modul ini sudah tercapai.`);const n=Math.min(amount,limit-current);const pool=BASE.filter(q=>q.moduleId===m&&!q.generated).sort((a,b)=>rank(b)-rank(a));if(!pool.length)return toast('Bank soal dasar modul tidak ditemukan.');const top=pool.slice(0,Math.max(6,Math.ceil(pool.length*.65))),add=[];for(let i=0;i<n;i++)add.push(make(top[i%top.length]||pool[i%pool.length],m,current+i+1));add.forEach(q=>BASE.push(q));generated.push(...shuffle(add));localStorage.setItem(KEY,JSON.stringify(generated));inject();toast(`${n} soal baru ditambahkan. Total generated modul ini: ${countFor(m)}.`)}
  function inject(){document.querySelectorAll('.module-display-card').forEach(card=>{const start=card.querySelector('[data-module-start]');if(!start)return;const m=Number(start.dataset.moduleStart);let actions=card.querySelector('.module-card-actions');if(!actions){actions=document.createElement('div');actions.className='module-card-actions';start.parentNode.insertBefore(actions,start);actions.appendChild(start)}let btn=actions.querySelector('.module-generate');if(!btn){btn=document.createElement('button');btn.className='module-generate';btn.type='button';btn.textContent='＋ Generate new questions';btn.addEventListener('click',e=>{e.stopPropagation();generate(m)});actions.appendChild(btn)}const top=card.querySelector('.module-card-top');if(top){let badge=top.querySelector('.generated-badge');const c=countFor(m);if(c&&!badge){badge=document.createElement('span');badge.className='generated-badge';top.appendChild(badge)}if(badge)badge.textContent=`+${c} generated`;}const p=card.querySelector('p');if(p){const base=BASE.filter(q=>q.moduleId===m).length;p.textContent=p.textContent.replace(/^\d+ Soal/,`${base} Soal`)}})}
  document.addEventListener('DOMContentLoaded',()=>{
    const locked=document.getElementById('bridgeLockedNav'); if(locked) locked.addEventListener('click',()=>toast('BRIDGE Preparation adalah akses khusus. Menu ini tidak membuka halaman apa pun.'));
    const grid=document.getElementById('dashboardModuleGrid'); if(grid)new MutationObserver(inject).observe(grid,{childList:true,subtree:true});
    inject();
  });
})();
