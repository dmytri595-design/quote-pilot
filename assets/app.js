
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n)||0);
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__tt);window.__tt=setTimeout(()=>t.classList.remove('show'),1800)}
function setActive(){const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===p))}
document.addEventListener('DOMContentLoaded',setActive);
document.addEventListener('click',e=>{const t=e.target.closest('[data-toast]');if(t){e.preventDefault();toast(t.dataset.toast)}})
document.addEventListener('DOMContentLoaded',()=>{
  const v=document.querySelectorAll('[data-version]');v.forEach(x=>x.textContent='v0.4.0');
  const save=(key,val)=>localStorage.setItem(key,JSON.stringify(val));
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch(e){return fallback}};
  window.qpStorage={save,read};
});
