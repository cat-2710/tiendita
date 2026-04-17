// ========== DATA ==========
const PRODUCTS = [
  {
    id:1,
    name:'Coca-Cola 600ml',
    cat:'Bebidas',
    price:22,
    orig:null,
    img:'assets/productos/bebidas/CocaCola.jpg',
    badge:'hot',
    fav:true
  },
  {id:2,name:'Leche Entera 1L',cat:'Lácteos',price:25,orig:30,img:'assets/productos/lacteos/LecheEntera.jpg',badge:'offer',fav:true},
  {id:3,name:'Pan Blanco Bimbo',cat:'Panadería',price:35,orig:null,img: 'assets/productos/abarrotes/PanBimbo.jpg',badge:'',fav:false},
  {id:4,name:'Papas Sabritas',cat:'Botanas',price:16,orig:20,img:'assets/productos/botanas/PapasSabritas.jpg',badge:'offer',fav:true},
  {id:5,name:'Agua Natural 1.5L',cat:'Bebidas',price:14,orig:null,img:'assets/productos/bebidas/AguaNatural.jpg',badge:'',fav:false},
  {id:6,name:'Yogurt Fresa 150g',cat:'Lácteos',price:16,orig:null,img:'assets/productos/lacteos/YogurthFresa.jpg',badge:'new',fav:true},
  {id:7,name:'Huevo Blanco 12pz',cat:'Abarrotes',price:42,orig:null,img:'assets/productos/abarrotes/huevos.jpg',badge:'',fav:true},
  {id:8,name:'Jabón Dove 90g',cat:'Higiene',price:22,orig:28,img:'assets/productos/higiene/JabonDove.jpg',badge:'offer',fav:false},
  {id:9,name:'Manzana Roja kg',cat:'Frutas',price:32,orig:null,img:'assets/productos/frutas/ManzanaRoja.jpg',badge:'new',fav:false},
  {id:10,name:'Atún en Lata 140g',cat:'Abarrotes',price:22,orig:null,img:'assets/productos/abarrotes/AtunLata.jpg',badge:'',fav:false},
  {id:11,name:'Jugo de Naranja 1L',cat:'Bebidas',price:28,orig:35,img:'assets/productos/bebidas/JugoNaranja.jpg',badge:'offer',fav:true},
  {id:12,name:'Galletas Oreo 174g',cat:'Botanas',price:26,orig:null,img:'assets/productos/botanas/GalletasOreo.jpg',badge:'',fav:false},
  {id:13,name:'Detergente Roma 500g',cat:'Limpieza',price:18,orig:null,img:'assets/productos/limpieza/DetergenteRoma.jpg',badge:'',fav:false},
  {id:14,name:'Tomate Saladette kg',cat:'Verduras',price:20,orig:null,img:'assets/productos/verduras/TomateSaladette.jpg',badge:'new',fav:false},
  {id:15,name:'Vino Tinto 750ml',cat:'Vinos y Licores',price:120,orig:145,img:'assets/productos/vinos_licores/VinoTinto.jpg',badge:'offer',fav:false},
  {id:16,name:'Cepillo Dental',cat:'Higiene',price:15,orig:null,img:'assets/productos/higiene/CepilloDental.jpg',badge:'new',fav:false},
];

const CATEGORIES = [
  {key:'all',label:'Todos',emoji:'🏪',img:'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=60',desc:'Todos los productos de la tienda'},
  {key:'Bebidas',label:'Bebidas',emoji:'🥤',img:'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=1200&q=60',desc:'Refrescos, aguas, jugos y más'},
  {key:'Lácteos',label:'Lácteos',emoji:'🥛',img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=60',desc:'Leche, yogurt, queso y crema'},
  {key:'Frutas',label:'Frutas',emoji:'🍎',img:'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1200&q=60',desc:'Frutas frescas del día'},
  {key:'Verduras',label:'Verduras',emoji:'🥦',img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=60',desc:'Verduras frescas y naturales'},
  {key:'Abarrotes',label:'Abarrotes',emoji:'🥫',img:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=60',desc:'Enlatados, pastas, arroz y más'},
  {key:'Limpieza',label:'Limpieza',emoji:'🧹',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=60',desc:'Productos de limpieza del hogar'},
  {key:'Higiene',label:'Higiene personal',emoji:'🧴',img:'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=1200&q=60',desc:'Cuidado personal y salud'},
  {key:'Botanas',label:'Botanas',emoji:'🍿',img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&q=60',desc:'Snacks, papas y galletas'},
  {key:'Vinos y Licores',label:'Vinos y Licores',emoji:'🍷',img:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=60',desc:'Vinos, cervezas y licores'},
  {key:'Otros',label:'Otros',emoji:'🛒',img:'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=60',desc:'Otros productos variados'},
];

const FAQS = [
  {q:'¿Cómo realizo un pedido?',a:'Agrega los productos al carrito, haz clic en "Continuar con el pedido", completa tus datos y confirma.'},
  {q:'¿Cuánto tarda la entrega a domicilio?',a:'Entre 30 y 60 minutos dependiendo de tu zona. Puedes elegir fecha y hora al hacer el pedido.'},
  {q:'¿Puedo recoger mi pedido en la tienda?',a:'Sí. Elige "Recoger en tienda" al finalizar. Nuestra dirección es: Av. Insurgentes Sur 1234, Col. Del Valle, CDMX. Lun–Dom 8am–10pm.'},
  {q:'¿Qué métodos de pago aceptan?',a:'Tarjetas Visa, Mastercard y American Express. Próximamente efectivo y transferencias.'},
  {q:'¿Cómo cancelo un pedido?',a:'Durante el proceso haz clic en "Cancelar pedido". Si ya confirmaste, contáctanos al (55) 1234-5678.'},
  {q:'¿Tienen envío gratis?',a:'¡Sí! Envío gratis en pedidos mayores a $200. Para pedidos menores el costo es $35.'},
  {q:'¿Cómo veo mis pedidos anteriores?',a:'Abre el carrito y selecciona la pestaña "Mis pedidos".'},
  {q:'¿Los precios ya incluyen impuestos?',a:'Sí, todos los precios mostrados incluyen los impuestos correspondientes.'},
  {q:'¿Cómo contacto al servicio al cliente?',a:'Llámanos al (55) 1234-5678 o escríbenos a contacto@freshmark.mx. Atención Lun–Dom 8am–10pm.'},
  {q:'¿Puedo modificar un pedido ya realizado?',a:'No es posible modificar un pedido confirmado. Contáctanos rápidamente si hay un error.'},
];

let users = JSON.parse(localStorage.getItem('fm_users') || '[]');
let currentUser = null;
let cart = [];
let myOrders = [];
let currentCat = 'all';
let currentCartTab = 'cart';

// ========== AUTH ==========
function isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function showRegister(){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('registerPage').classList.remove('hidden');
}
function showLogin(){
  document.getElementById('registerPage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}
function doRegister(){
  const name=document.getElementById('regName').value.trim();
  const email=document.getElementById('regEmail').value.trim();
  const age=parseInt(document.getElementById('regAge').value);
  const pass=document.getElementById('regPass').value;
  const pass2=document.getElementById('regPass2').value;
  const errEl=document.getElementById('regError');
  const emailInp=document.getElementById('regEmail');
  errEl.style.display='none'; emailInp.classList.remove('invalid');
  if(!name||!email||!age||!pass||!pass2){showErr(errEl,'Todos los campos son obligatorios.');return;}
  if(!isValidEmail(email)){emailInp.classList.add('invalid');showErr(errEl,'Correo inválido. Debe tener @ y un dominio (ej: tu@correo.com).');return;}
  if(age<1||age>100){showErr(errEl,'La edad debe ser entre 1 y 100 años.');return;}
  if(pass.length<6){showErr(errEl,'La contraseña debe tener al menos 6 caracteres.');return;}
  if(pass!==pass2){showErr(errEl,'Las contraseñas no coinciden.');return;}
  if(users.find(u=>u.email===email)){showErr(errEl,'Este correo ya está registrado.');return;}
  users.push({name,email,age,pass});
  localStorage.setItem('fm_users',JSON.stringify(users));
  showToast('✅ Cuenta creada. ¡Ya puedes iniciar sesión!','success');
  setTimeout(showLogin,1200);
}


// ================= CHATBOT =================

function toggleChat() {
    document.getElementById("chatbot-box").classList.toggle("hidden");
}

function agregarMensaje(texto, tipo) {
    const chat = document.getElementById("chatbot-mensajes");

    const msg = document.createElement("div");
    msg.style.marginBottom = "8px";

    if (tipo === "user") {
        msg.style.textAlign = "right";
        msg.innerHTML = "<b>Tú:</b> " + texto;
    } else {
        msg.innerHTML = "<b>Bot:</b> " + texto;
    }

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

async function enviarChat() {
    const input = document.getElementById("chatbot-input");
    const mensaje = input.value.trim();

    if (!mensaje) return;

    agregarMensaje(mensaje, "user");
    input.value = "";

    try {
        const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        const data = await res.json();

        agregarMensaje(data.respuesta, "bot");

    } catch (error) {
        agregarMensaje("Error al conectar con el servidor", "bot");
    }
}
function doLogin(){
  const email=document.getElementById('loginEmail').value.trim();
  const pass=document.getElementById('loginPass').value;
  const errEl=document.getElementById('loginError');
  const emailInp=document.getElementById('loginEmail');
  errEl.style.display='none'; emailInp.classList.remove('invalid');
  if(!isValidEmail(email)){emailInp.classList.add('invalid');showErr(errEl,'El formato del correo no es válido.');return;}
  const user=users.find(u=>u.email===email&&u.pass===pass);
  if(!user){showErr(errEl,'Correo o contraseña incorrectos.');return;}
  currentUser=user;
  myOrders=JSON.parse(localStorage.getItem('fm_orders_'+email)||'[]');
  loadMainPage();
}
function doLogout(){
  currentUser=null; cart=[];
  hideAllPages();
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('loginEmail').value='';
  document.getElementById('loginPass').value='';
}
function showErr(el,msg){el.textContent=msg;el.style.display='block';}

// ========== PAGE NAVIGATION ==========
function hideAllPages(){
  ['loginPage','registerPage','mainPage','searchResultsPage','orderPage','receiptPage','myOrdersPage','helpPage']
    .forEach(id=>document.getElementById(id).classList.add('hidden'));
  closeCart();
}
function goHome(){
  hideAllPages();
  document.getElementById('mainPage').classList.remove('hidden');
  syncCartCounts();
}
function loadMainPage(){
  hideAllPages();
  document.getElementById('mainPage').classList.remove('hidden');
  document.getElementById('userNameDisplay').textContent=currentUser.name;
  document.getElementById('userAvatar').textContent=currentUser.name[0].toUpperCase();
  renderPromoBanners();
  renderCatBar();
  renderFavorites();
  renderProducts(PRODUCTS,'productsGrid');
  syncCartCounts();
  showToast(`👋 ¡Bienvenido(a), ${currentUser.name}! Ingresaste correctamente.`,'success');
}

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
    tab==='offer' ? 'Ofertas Exclusivas' : 'Productos Nuevos';
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
  clearInterval(promoAutoTimer);
  promoAutoTimer = setInterval(() => promoNav(1), 4500);
}

// ========== CATEGORIES ==========
function renderCatBar(){
  document.getElementById('catBarInner').innerHTML=CATEGORIES.map(c=>`
    <button class="cat-btn ${c.key===currentCat?'active':''}" onclick="selectCat('${c.key}')">
      <span class="cat-emoji">${c.emoji}</span>${c.label}
    </button>
  `).join('');
}
function selectCat(key){
  currentCat=key;
  renderCatBar();
  const catData=CATEGORIES.find(c=>c.key===key);
  const banner=document.getElementById('catBanner');
  const favsSection=document.getElementById('favsSection');
  if(key==='all'){
    banner.classList.add('hidden');
    favsSection.classList.remove('hidden');
    renderProducts(PRODUCTS,'productsGrid');
    document.getElementById('productsTitle').textContent='🛒 Catálogo de productos';
  } else {
    banner.classList.remove('hidden');
    document.getElementById('catBannerImg').src=catData.img;
    document.getElementById('catBannerTitle').textContent=catData.emoji+' '+catData.label;
    document.getElementById('catBannerDesc').textContent=catData.desc;
    favsSection.classList.add('hidden');
    const coreCats=['Bebidas','Lácteos','Frutas','Verduras','Abarrotes','Limpieza','Higiene','Botanas','Vinos y Licores'];
    const filtered=key==='Otros'
      ?PRODUCTS.filter(p=>!coreCats.includes(p.cat))
      :PRODUCTS.filter(p=>p.cat===key);
    renderProducts(filtered,'productsGrid');
    document.getElementById('productsTitle').textContent=catData.emoji+' '+catData.label;
  }
}

// ========== PRODUCTS ==========
function renderFavorites(){
  const favs=PRODUCTS.filter(p=>p.fav);
  document.getElementById('favCarousel').innerHTML=favs.map(p=>`
    <div class="fav-card" onclick="scrollToProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="fav-info">
        <div class="fav-name">${p.name}</div>
        <div class="fav-price">$${p.price}.00</div>
      </div>
    </div>
  `).join('');
}
function productCardHTML(p,pfx=''){
  const priceHtml=p.orig
    ?`<div class="prod-price-orig">$${p.orig}.00</div><div class="prod-price offer">$${p.price}.00</div>`
    :`<div class="prod-price">$${p.price}.00</div>`;
  const badgeHtml=p.badge?`<span class="prod-badge badge-${p.badge}">${p.badge==='hot'?'🔥 Popular':p.badge==='new'?'Nuevo':'Oferta'}</span>`:'';
  return `
  <div class="product-card" id="${pfx}prod-${p.id}">
    <div class="prod-img">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      ${badgeHtml}
    </div>
    <div class="prod-body">
      <div class="prod-name">${p.name}</div>
      <div class="prod-cat">${p.cat}</div>
      <div class="prod-price-wrap">${priceHtml}</div>
      <div class="prod-controls">
        <button class="qty-btn" onclick="changeQty('${pfx}qinp-${p.id}',-1)">−</button>
        <input class="qty-input" type="number" value="1" min="1" max="100" id="${pfx}qinp-${p.id}">
        <button class="qty-btn" onclick="changeQty('${pfx}qinp-${p.id}',1)">+</button>
      </div>
      <button class="add-cart-btn" onclick="addToCart(${p.id},'${pfx}qinp-${p.id}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h11v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H17c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.46 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        Agregar al carrito
      </button>
    </div>
  </div>`;
}
function renderProducts(list,gridId,pfx=''){
  const el=document.getElementById(gridId);
  el.innerHTML=list.length
    ?list.map(p=>productCardHTML(p,pfx)).join('')
    :`<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text2);font-size:16px;font-weight:700;">Sin productos en esta categoría.</div>`;
}
function changeQty(inputId, delta) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  let val = Math.max(1, parseInt(inp.value || 1) + delta);
  if (val > 100) {
    showToast('⚠️ Máximo 100 unidades por producto.', 'warning');
    val = 100;
  }
  inp.value = val;
}

// ========== AGREGAR AL CARRITO (con validaciones) ==========
function addToCart(id, inputId) {
  const p = PRODUCTS.find(x => x.id === id);
  const inp = document.getElementById(inputId);
  const qty = inp ? parseInt(inp.value) : 1;

  // Validación: cantidad 0 o vacía
  if (!qty || qty <= 0) {
    showToast('⚠️ La cantidad debe ser mayor a 0.', 'warning');
    return;
  }

  // Validación: cantidad mayor a 100
  if (qty > 100) {
    showToast('⚠️ No puedes agregar más de 100 unidades por producto.', 'warning');
    if (inp) inp.value = 100;
    return;
  }

  // Validación: total en carrito no supera 100 para ese producto
  const ex = cart.find(c => c.id === id);
  const currentQty = ex ? ex.qty : 0;
  if (currentQty + qty > 100) {
    const disponible = 100 - currentQty;
    if (disponible <= 0) {
      showToast(`❌ Ya tienes el máximo de 100 unidades de "${p.name}" en el carrito.`, 'warning');
    } else {
      showToast(`⚠️ Solo puedes agregar ${disponible} unidad(es) más de "${p.name}". Límite: 100.`, 'warning');
    }
    return;
  }

  if (ex) ex.qty += qty;
  else cart.push({ ...p, qty });

  syncCartCounts();
  showToast(`🛒 "${p.name}" agregado al carrito.`, 'success');
} 

function scrollToProduct(id){
  goHome();
  setTimeout(()=>{const el=document.getElementById(`prod-${id}`);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});},250);
}

// ========== SEARCH ==========
function filterSearchDrop(inputId,dropId){
  const val=document.getElementById(inputId).value;
  const dr=document.getElementById(dropId);
  if(!val.trim()){dr.classList.add('hidden');return;}
  const res=PRODUCTS.filter(p=>p.name.toLowerCase().includes(val.toLowerCase())||p.cat.toLowerCase().includes(val.toLowerCase())).slice(0,6);
  if(!res.length){dr.innerHTML='<div style="padding:12px 16px;font-size:13px;color:var(--text2);">Sin resultados</div>';dr.classList.remove('hidden');return;}
  dr.innerHTML=res.map(p=>`
    <div class="search-result-item" onclick="doSearchPage('${p.name}')">
      <img src="${p.img}" alt="${p.name}">
      <div><div class="sri-name">${p.name}</div><div class="sri-price">$${p.price}.00 – ${p.cat}</div></div>
    </div>
  `).join('');
  dr.classList.remove('hidden');
}
function doSearchPage(val){
  if(!val||!val.trim())return;
  const q=val.trim().toLowerCase();
  const res=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q));
  hideAllPages();
  document.getElementById('searchResultsPage').classList.remove('hidden');
  document.getElementById('searchInput2').value=val;
  document.getElementById('srAvatar').textContent=currentUser?currentUser.name[0].toUpperCase():'U';
  document.getElementById('srName').textContent=currentUser?currentUser.name:'';
  document.getElementById('srTitle').textContent=res.length
    ?`🔍 "${val}" — ${res.length} resultado${res.length!==1?'s':''}`
    :`🔍 Sin resultados para "${val}"`;
  if(res.length){
    renderProducts(res,'srGrid','sr_');
  } else {
    document.getElementById('srGrid').innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:50px;color:var(--text2);"><div style="font-size:48px;margin-bottom:14px;">🔍</div><div style="font-size:17px;font-weight:700;">Sin resultados para "${val}"</div><div style="font-size:14px;margin-top:6px;">Intenta otro término o explora las categorías.</div></div>`;
  }
  syncCartCounts();
  ['searchDrop1','searchDrop2'].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.add('hidden');});
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.search-bar')){
    ['searchDrop1','searchDrop2'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.add('hidden');});
  }
});

// ========== CART ==========
function openCart(){
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  switchCartTab(currentCartTab);
}
function closeCart(){
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
}
function switchCartTab(tab){
  currentCartTab=tab;
  document.getElementById('ctCart').classList.toggle('active',tab==='cart');
  document.getElementById('ctOrders').classList.toggle('active',tab==='orders');
  const footer=document.getElementById('cartFooter');
  if(tab==='cart'){
    footer.style.display='';
    renderCartItems();
  } else {
    footer.style.display='none';
    renderOrdersPanel();
  }
}
function renderCartItems(){
  const el=document.getElementById('cartPanel');
  if(!cart.length){
    el.innerHTML=`<div class="cart-empty"><div class="ce-icon">🛒</div><p>Tu carrito está vacío</p></div>`;
    return;
  }
  el.innerHTML=cart.map(item=>`
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="ci-controls">
          <button class="ci-btn" onclick="cartQty(${item.id},-1)">−</button>
          <span class="ci-num">${item.qty}</span>
          <button class="ci-btn" onclick="cartQty(${item.id},1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="ci-price">$${(item.price*item.qty).toFixed(2)}</span>
        <button class="ci-del" onclick="removeFromCart(${item.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}
function renderOrdersPanel(){
  const el=document.getElementById('cartPanel');
  if(!myOrders.length){
    el.innerHTML=`<div class="cart-empty"><div class="ce-icon">📦</div><p>No tienes pedidos aún.</p></div>`;
    return;
  }
  el.innerHTML=myOrders.slice().reverse().slice(0,4).map(o=>`
    <div class="order-card" style="margin-bottom:10px;">
      <div class="oc-header">
        <div><div class="oc-folio">${o.folio}</div><div class="oc-date">${o.date}</div></div>
        <span class="oc-status processing">En proceso</span>
      </div>
      <div class="oc-items">${o.items.map(i=>`${i.qty}x ${i.name}`).join(' · ')}</div>
      <div class="oc-total">$${o.total.toFixed(2)}</div>
    </div>
  `).join('')
  +`<div style="text-align:center;padding:8px;"><button style="background:none;border:none;color:var(--blue);font-weight:700;cursor:pointer;font-size:13px;" onclick="closeCart();showMyOrders()">Ver todos mis pedidos →</button></div>`;
}
function cartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty > 100) {
    showToast('⚠️ Máximo 100 unidades por producto.', 'warning');
    return;
  }
  item.qty = Math.max(1, newQty);
  syncCartCounts();
  renderCartItems();
}
function removeFromCart(id){
  const item=cart.find(c=>c.id===id);
  cart=cart.filter(c=>c.id!==id);
  syncCartCounts();
  renderCartItems();
  if(item)showToast(`🗑 "${item.name}" eliminado.`,'warning');
}
function clearCart(){
  cart=[];
  syncCartCounts();
  renderCartItems();
  showToast('🗑 Carrito vaciado.','warning');
}
function syncCartCounts(){
  const n=cart.reduce((s,i)=>s+i.qty,0);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  ['cartCount','cartCount2'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){
      el.textContent=n;
      el.style.display=n===0?'none':'inline-block';
    }
  });
  const ct=document.getElementById('cartTotal');if(ct)ct.textContent=`$${total.toFixed(2)}`;
}
function goToOrder(){
  if(!cart.length){showToast('⚠️ Tu carrito está vacío.','warning');return;}
  closeCart();
  hideAllPages();
  document.getElementById('orderPage').classList.remove('hidden');
  ['domClientName','tiendaUserName'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=currentUser.name;});
  const d=new Date(); d.setDate(d.getDate()+2);
  const ds=d.toISOString().split('T')[0];
  ['domDate','tiendaDate'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=ds;});
  ['domTime','tiendaTime'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='14:00';});
  renderOrderSummaries();
}

// ========== ORDER ==========
function switchOrderTab(tab){
  ['domicilio','tienda'].forEach(t=>{
    document.getElementById('op'+t.charAt(0).toUpperCase()+t.slice(1)).classList.toggle('active',t===tab);
    document.getElementById('ot'+t.charAt(0).toUpperCase()+t.slice(1)).classList.toggle('active',t===tab);
  });
}
function renderOrderSummaries(){
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping=subtotal>=200?0:35;
  const total=subtotal+shipping;
  const html=`
    <div class="osb-title">Resumen del pedido</div>
    ${cart.map(i=>`
      <div class="osb-item">
        <div class="oi-left">
          <span class="oi-qty">${i.qty}</span>
          <span class="oi-name">${i.name}</span>
        </div>
        <span class="oi-price">$${(i.price*i.qty).toFixed(2)}</span>
      </div>
    `).join('')}
    <hr class="osb-divider">
    <div class="osb-total-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="osb-total-row shipping"><span>Envío${shipping===0?' (¡Gratis en pedidos +$200!)':''}</span><span>${shipping===0?'$0.00':'$'+shipping.toFixed(2)}</span></div>
    <div class="osb-total-row grand"><span>Total</span><span>$${total.toFixed(2)}</span></div>
  `;
  ['osmDom','osmTienda'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML=html;});
}
function openOrderModal(type){
  if(type==='confirm') document.getElementById('confirmModal').classList.add('open');
  else document.getElementById('cancelModal').classList.add('open');
}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function confirmOrder(){
  closeModal('confirmModal');
  document.getElementById('successModal').classList.add('open');
}
function doCancelOrder(){
  closeModal('cancelModal');
  cart=[];syncCartCounts();
  goHome();
  showToast('❌ Pedido cancelado.','warning');
}

// ========== RECEIPT ==========
function showReceipt(){
  hideAllPages();
  document.getElementById('receiptPage').classList.remove('hidden');
  const folio='FM-'+Date.now().toString().slice(-6);
  document.getElementById('receiptFolio').textContent='#'+folio;
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping=subtotal>=200?0:35;
  const total=subtotal+shipping;
  const orderData={folio:'#'+folio,date:new Date().toLocaleDateString('es-MX'),items:cart.map(i=>({...i})),total};
  myOrders.push(orderData);
  localStorage.setItem('fm_orders_'+currentUser.email,JSON.stringify(myOrders));
  document.getElementById('receiptItemsList').innerHTML=cart.map(i=>`
    <div class="r-item">
      <div class="ri-l">
        <span class="ri-q">${i.qty}</span>
        <div><div class="ri-n">${i.name}</div><div class="ri-u">$${i.price.toFixed(2)} c/u</div></div>
      </div>
      <div class="ri-t">$${(i.price*i.qty).toFixed(2)}</div>
    </div>
  `).join('');
  document.getElementById('receiptTotals').innerHTML=`
    <div class="r-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="r-row ship"><span>Envío${shipping===0?' (Gratis)':''}</span><span>${shipping===0?'$0.00':'$'+shipping.toFixed(2)}</span></div>
    <div class="r-row grand"><span>TOTAL</span><span>$${total.toFixed(2)}</span></div>
  `;
  console.log(`[FreshMark] Confirmación de pedido #${folio} enviada a ${currentUser.email}`);
  cart=[]; syncCartCounts();
}

// ========== MY ORDERS PAGE ==========
function showMyOrders(){
  hideAllPages();
  document.getElementById('myOrdersPage').classList.remove('hidden');
  const el=document.getElementById('myOrdersList');
  if(!myOrders.length){
    el.innerHTML=`<div style="text-align:center;padding:60px 20px;color:var(--text2);">
      <div style="font-size:54px;margin-bottom:14px;">📦</div>
      <div style="font-size:17px;font-weight:700;">No tienes pedidos aún.</div>
      <div style="font-size:13px;margin-top:8px;">¡Realiza tu primera compra en FreshMark!</div>
    </div>`;
    return;
  }
  el.innerHTML=myOrders.slice().reverse().map(o=>`
    <div class="order-card">
      <div class="oc-header">
        <div><div class="oc-folio">${o.folio}</div><div class="oc-date">${o.date}</div></div>
        <span class="oc-status processing">En proceso</span>
      </div>
      <div class="oc-items">${o.items.map(i=>`${i.qty}x ${i.name}`).join(' · ')}</div>
      <div class="oc-total">Total: $${o.total.toFixed(2)}</div>
    </div>
  `).join('');
}

// ========== HELP ==========
function showHelp(){
  hideAllPages();
  document.getElementById('helpPage').classList.remove('hidden');
  document.getElementById('faqList').innerHTML=FAQS.map((f,i)=>`
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(${i})">${f.q}<span class="faq-arrow">▼</span></button>
      <div class="faq-a" id="faq-${i}">${f.a}</div>
    </div>
  `).join('');
}
function toggleFaq(i){
  document.querySelectorAll('.faq-q')[i].classList.toggle('open');
  document.getElementById('faq-'+i).classList.toggle('open');
}

// ========== DARK MODE ==========
function toggleDark(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.documentElement.setAttribute('data-theme',isDark?'light':'dark');
  localStorage.setItem('fm_theme',isDark?'light':'dark');
}
(function(){
  const saved=localStorage.getItem('fm_theme');
  if(saved)document.documentElement.setAttribute('data-theme',saved);
})();

// ========== CVV TOGGLE ==========
function toggleCvv(inputId,btn){
  const inp=document.getElementById(inputId);
  if(inp.type==='password'){inp.type='text';btn.textContent='🙈';}
  else{inp.type='password';btn.textContent='👁';}
}

// ========== TOAST ==========
function showToast(msg,type='info'){
  const old=document.querySelector('.toast'); if(old)old.remove();
  const t=document.createElement('div');
  t.className=`toast ${type}`; t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),3500);
}

// ========== CARD FORMAT ==========
function formatCard(inp){
  let v=inp.value.replace(/\D/g,'').substring(0,16);
  inp.value=v.replace(/(.{4})/g,'$1 ').trim();
}
function formatExp(inp){
  let v=inp.value.replace(/\D/g,'');
  if(v.length>=3)v=v.substring(0,2)+'/'+v.substring(2,4);
  inp.value=v;
}

document.querySelectorAll('.search-bar input').forEach(input => {
  const searchBar = input.closest('.search-bar');

  input.addEventListener('focus', () => {
    searchBar.classList.add('active');
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      searchBar.classList.remove('active');
    }, 200);
  });
});

searchInput.addEventListener('focus', () => {
  searchBar.classList.add('active');
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    searchBar.classList.remove('active');
  }, 200);
});