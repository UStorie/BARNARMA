(() => {
  const read=()=>{try{return localStorage.getItem('barnstudio-language')==='en'?'en':'fr';}catch{return 'fr';}};
  const setLang=(lang)=>{
    lang=lang==='en'?'en':'fr';document.documentElement.lang=lang;
    const enTitle=document.querySelector('.legal-en h1');const frTitle=document.querySelector('.legal-fr h1');
    if(enTitle&&frTitle)document.title=(lang==='en'?enTitle.textContent:frTitle.textContent)+' | BARNSTUDIO';
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===lang)));
    document.querySelectorAll('[data-fr][data-en]').forEach(el=>el.textContent=lang==='en'?el.dataset.en:el.dataset.fr);
    try{localStorage.setItem('barnstudio-language',lang);}catch{}
  };
  document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.language)));
  setLang(read());
})();
