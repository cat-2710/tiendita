// ========== PROMO CAROUSEL ==========
let promoCurrentTab = 'offer';
let promoCurrentIdx = 0;
let promoAutoTimer = null;

function renderPromoBanners(){
  renderPromoSlides('offer');
}
function switchPromoTab(tab){
  promoCurrentTab = tab;
  promoCurrentIdx = 0;
  document.getElementById('ptOffers').classList.toggle('active', tab==='offer');
  document.getElementById('ptNew').classList.toggle('active', tab==='new');
  document.getElementById('promoCarouselTitle').textContent =
    tab==='offer' ? '🏷 Ofertas Exclusivas' : '🆕 Productos Nuevos';
  renderPromoSlides(tab);
}
function renderPromoSlides(tab){
  const list = PRODUCTS.filter(p => p.badge === tab);
  const slidesEl = document.getElementById('promoSlides');
  const dotsEl = document.getElementById('promoDots');
  if(!list.length){
    slidesEl.innerHTML = '<div style="padding:60px;text-align:center;color:#6b7280;font-size:16px;font-weight:700;">Sin productos en esta sección.</div>';
    dotsEl.innerHTML = '';
    return;
  }
  slidesEl.innerHTML = list.map((p,i) => {
    const pct = p.orig ? Math.round((1 - p.price/p.orig)*100) : null;
    const saving = p.orig ? (p.orig - p.price).toFixed(2) : null;
    const tagLabel = tab==='offer' ? 'Oferta' : 'Nuevo';
    const tagCls = tab==='offer' ? 'offer' : 'new';
    return `<div class="promo-slide ${i===0?'active':''}" id="pslide-${i}">
      <div class="ps-img">
        <img src="${p.img}" alt="${p.name}">
        ${pct ? `<span class="ps-pct-badge">-${pct}%</span>` : ''}
      </div>
      <div class="ps-info">
        <span class="ps-tag ${tagCls}">${tagLabel}</span>
        <div class="ps-name">${p.name}</div>
        <div class="ps-unit">${p.cat}</div>
        <div class="ps-prices">
          <span class="ps-price-sale">$${p.price.toFixed(2)}</span>
          ${p.orig ? `<span class="ps-price-orig">$${p.orig.toFixed(2)}</span>` : ''}
        </div>
        ${saving ? `<div class="ps-saving">Ahorras $${saving}</div>` : ''}
        <button class="ps-add-btn" onclick="addToCart(${p.id},'pqinp-${p.id}'); event.stopPropagation();">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h11v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H17c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.46 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          Agregar al carrito
          <input type="hidden" id="pqinp-${p.id}" value="1">
        </button>
      </div>
    </div>`;
  }).join('');
  dotsEl.innerHTML = list.map((_,i) =>
    `<button class="pc-dot ${i===0?'active':''}" id="pdot-${i}" onclick="promoGoTo(${i})"></button>`
  ).join('');
  promoCurrentIdx = 0;
  clearInterval(promoAutoTimer);
  promoAutoTimer = setInterval(() => promoNav(1), 4500);
}
function promoNav(dir){
  const list = PRODUCTS.filter(p => p.badge === promoCurrentTab);
  if(!list.length) return;
  const prev = promoCurrentIdx;
  promoCurrentIdx = (promoCurrentIdx + dir + list.length) % list.length;
  promoGoTo(promoCurrentIdx, prev);
}
function promoGoTo(idx, prevIdx){
  const list = PRODUCTS.filter(p => p.badge === promoCurrentTab);
  if(prevIdx === undefined) prevIdx = promoCurrentIdx;
  promoCurrentIdx = idx;
  list.forEach((_,i) => {
    const s = document.getElementById('pslide-'+i);
    const d = document.getElementById('pdot-'+i);
    if(s) s.classList.toggle('active', i===idx);
    if(d) d.classList.toggle('active', i===idx);
  });
  // reset timer
  clearInterval(promoAutoTimer);
  promoAutoTimer = setInterval(() => promoNav(1), 4500);
}