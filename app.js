const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P=[['soup','Mushroom Soup','Starters',7,'Velvety mushroom soup with warm bread.'],['shrimp','Coconut Shrimp Soup','Starters',9,'Creamy coconut broth, shrimp, lime and chili.'],['wings','Grilled Wings','Starters',10,'Glazed wings with lime and dipping sauce.'],
['noodles','Shrimp Pasta','Mains',12,'Spaghetti tossed with shrimp and vegetables.'],['penne','Penne Arrabbiata','Mains',11,'Penne in spicy tomato sauce with fresh basil.'],['chicken','Steak (Chicken)','Mains',18,'Seared chicken with roasted vegetables.'],['beef','Steak (Beef)','Mains',20,'Grilled beef on creamy mash with herbs.'],['ribeye','Ribeye Steak','Mains',24,'Thick-cut ribeye, rosemary and pan juices.'],
['waffle','Waffle','Desserts',6,'Warm waffle with berries and sauce.'],['cake','Berry Cake','Desserts',5,'Rich chocolate cake with fresh strawberries.'],['cookies','Cookies','Desserts',4,'Chocolate cookies baked in small batches.'],['fruits','Fruits','Desserts',3,'Seasonal berries and citrus with honey.']];
const G=['room','soup','ribeye','cake','sign2','penne','wings','shrimp','waffle','sign1','chicken','fruits','noodles','cookies','beef'];
const ld=(k,d)=>{try{return JSON.parse(localStorage[k])??d}catch{return d}};
let cart=ld('qc',{}),wish=ld('qw',[]),user=ld('qu',null),cat='All',q='',mode='cart';
const sv=()=>{try{localStorage.qc=JSON.stringify(cart);localStorage.qw=JSON.stringify(wish);localStorage.qu=JSON.stringify(user)}catch{}};
const f=id=>P.find(p=>p[0]===id),first=()=>user.name.split(' ')[0];
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2800)}
function menu(){$('#grid').innerHTML=P.filter(p=>(cat==='All'||p[2]===cat)&&p[1].toLowerCase().includes(q)).map((p,i)=>`<article class="card" style="animation-delay:${i*50}ms"><div class="ph"><img src="images/${p[0]}.jpg" alt="${p[1]}" loading="lazy"><button class="heart${wish.includes(p[0])?' on':''}" data-w="${p[0]}" aria-label="Save ${p[1]}">♥</button></div><div class="cb"><h3>${p[1]}</h3><p>${p[4]}</p><div class="cr"><b>$${p[3]}</b><button class="btn sm" data-a="${p[0]}">Add</button></div></div></article>`).join('')||'<p class="empty">No dishes found.</p>'}
function drawer(m){mode=m;renderD();$('#dr').classList.add('open');$('#ov').classList.add('on')}
function renderD(){const el=$('#dbody'),ft=$('#dfoot');$('#dt').textContent=mode==='cart'?'Your order':'Wishlist';
if(mode==='cart'){const ids=Object.keys(cart);let s=0;el.innerHTML=ids.map(id=>{const p=f(id);s+=p[3]*cart[id];return`<div class="li"><img src="images/${id}.jpg" alt=""><div><b>${p[1]}</b><span>$${p[3]}</span></div><div class="q"><button data-m="${id}" aria-label="Less">−</button><output>${cart[id]}</output><button data-p="${id}" aria-label="More">+</button></div></div>`}).join('')||'<p class="empty">Your order is empty.</p>';
ft.innerHTML=ids.length?`<div class="tot"><span>Total</span><b>$${s}</b></div><button class="btn" id="chk">Checkout</button>`:''}
else{el.innerHTML=wish.map(id=>{const p=f(id);return`<div class="li"><img src="images/${id}.jpg" alt=""><div><b>${p[1]}</b><span>$${p[3]}</span></div><div class="q"><button data-a="${id}" aria-label="Add to order">+</button><button data-x="${id}" aria-label="Remove">✕</button></div></div>`}).join('')||'<p class="empty">Tap the heart on a dish to save it here.</p>';ft.innerHTML=''}}
function upd(){sv();$$('.heart').forEach(h=>h.classList.toggle('on',wish.includes(h.dataset.w)));
$('#cw').textContent=wish.length;$('#cc').textContent=Object.values(cart).reduce((a,b)=>a+b,0);$('#ba').textContent=user?'Hi, '+first():'Login';
if($('#dr').classList.contains('open'))renderD()}
function closeAll(){$$('.dr,.md,.lb').forEach(x=>x.classList.remove('open'));$('#ov').classList.remove('on')}
function authOpen(){$('#md').classList.add('open');$('#ov').classList.add('on')}
document.addEventListener('click',e=>{const g=s=>e.target.closest(s);let b;
if(b=g('[data-cat]')){cat=b.dataset.cat;$$('[data-cat]').forEach(c=>c.classList.toggle('on',c===b));menu()}
else if(b=g('[data-w]')){const i=b.dataset.w;wish=wish.includes(i)?wish.filter(x=>x!==i):[...wish,i];upd();toast(wish.includes(i)?'Saved to wishlist':'Removed from wishlist')}
else if(b=g('[data-a]')){const i=b.dataset.a;cart[i]=Math.min(9,(cart[i]||0)+1);upd();toast('Added to your order')}
else if(b=g('[data-p]')){const i=b.dataset.p;cart[i]=Math.min(9,cart[i]+1);upd()}
else if(b=g('[data-m]')){const i=b.dataset.m;if(--cart[i]<=0)delete cart[i];upd()}
else if(b=g('[data-x]')){wish=wish.filter(x=>x!==b.dataset.x);upd()}
else if(b=g('[data-tab]')){$$('[data-tab]').forEach(c=>c.classList.toggle('on',c===b));$('#fl').hidden=b.dataset.tab!=='fl';$('#fr').hidden=b.dataset.tab!=='fr'}
else if(g('#chk')){if(!user){closeAll();authOpen();toast('Please log in to place your order');return}cart={};upd();closeAll();toast('Thank you, '+first()+'! Your order is with the kitchen.')}
else if(g('#bc'))drawer('cart');else if(g('#bw'))drawer('wish');
else if(g('#ba')){if(user){user=null;upd();toast('You are logged out')}else authOpen()}
else if(g('.gal img')){const l=$('#lb');l.firstElementChild.src=e.target.src;l.classList.add('open')}
else if(g('.close')||g('#ov')||g('#lb'))closeAll();
else if(g('.burger'))$('#links').classList.toggle('open');
if(g('#links a'))$('#links').classList.remove('open')});
addEventListener('keydown',e=>e.key==='Escape'&&closeAll());
$('#q').oninput=e=>{q=e.target.value.toLowerCase().trim();menu()};
$('#fr').onsubmit=e=>{e.preventDefault();const t=e.target;user={name:t.n.value.trim(),email:t.e.value.toLowerCase()};const u=ld('qus',[]).filter(x=>x.email!==user.email);try{localStorage.qus=JSON.stringify([...u,user])}catch{}closeAll();upd();toast('Welcome, '+first()+'!')};
$('#fl').onsubmit=e=>{e.preventDefault();const m=ld('qus',[]).find(x=>x.email===e.target.e.value.toLowerCase());if(!m){toast('No account with that email. Please register.');return}user=m;closeAll();upd();toast('Welcome back, '+first()+'!')};
$('#rf').d.min=new Date().toISOString().slice(0,10);
$('#rf').onsubmit=e=>{e.preventDefault();const t=e.target;$('#rmsg').textContent=`Table for ${t.g.value} on ${t.d.value} at ${t.t.value} requested. We will confirm by phone.`;toast('Reservation request sent');t.reset()};
$('#cf').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Message sent. Thank you!')};
$('#gal').innerHTML=G.map(i=>`<img src="images/${i}.jpg" alt="Qasim Restaurant photo" loading="lazy">`).join('');
addEventListener('scroll',()=>{const h=document.documentElement;$('#nav').classList.toggle('s',scrollY>40);$('#bar').style.width=scrollY/(h.scrollHeight-innerHeight)*100+'%'},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const t=x.target;io.unobserve(t);if(t.dataset.n){const n=+t.dataset.n,s=performance.now();(function a(now){const k=Math.min((now-s)/1400,1);t.textContent=Math.round(n*k)+(t.dataset.s||'');if(k<1)requestAnimationFrame(a)})(s)}else t.classList.add('in')}),{threshold:.15});
$$('.r,[data-n]').forEach(x=>io.observe(x));
menu();upd();
