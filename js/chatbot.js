// =========================================
// FRESHMARK — CHATBOT.JS  v3.0
// =========================================
// NUEVO en v3:
//  ✔ Detecta producto + cantidad en UN solo mensaje
//     ("quiero 2 leches", "dame 3 refrescos", "agrega vino tinto 750ml")
//  ✔ Catálogo real de FreshMark sincronizado con PRODUCTS de main.js
//  ✔ Agrega directamente al carrito real (llama a addToCart / cart[])
//  ✔ Responde preguntas sobre productos específicos (precio, disponibilidad)
//  ✔ Sugiere productos similares cuando no encuentra exacto
//  ✔ Historial de la sesión (recuerda lo que pidió antes)
//  ✔ Todas las mejoras de v2 conservadas
// =========================================

// ─────────────────────────────────────────
// 1. DATASET DE RESPUESTAS INFORMATIVAS
// ─────────────────────────────────────────
const DATASET = {
  menu:        `🛒 *Catálogo de FreshMark*\n\n📦 Abarrotes: Arroz, frijoles, aceite, pasta, salsas\n🥛 Lácteos: Leche, yogurt, quesos, mantequilla\n🥩 Carnes y Fríos: Jamón, salchichas, chorizo\n🍞 Panadería: Pan de caja, tortillas, galletas\n🥦 Frutas y Verduras: Producto fresco diario\n🥤 Bebidas: Refrescos, agua, jugos, leche\n🧴 Limpieza: Jabón, detergente, papel\n🍫 Snacks: Papas, dulces, chocolates\n\nEscribe *precios* para ver costos 🏷️`,
  categorias:  `📦 *Categorías disponibles:*\n\n🥛 Lácteos\n🥩 Carnes y Fríos\n🍞 Panadería\n🥦 Frutas y Verduras\n🧴 Limpieza y Hogar\n🥤 Bebidas\n🍫 Snacks y Dulces\n🧺 Abarrotes\n\nExplora el catálogo completo en nuestra tienda 🏪`,
  precios:     `💰 *Rangos de precios:*\n\n• Abarrotes: desde $15\n• Lácteos: desde $20\n• Bebidas: desde $12\n• Snacks: desde $10\n• Limpieza: desde $18\n• Carnes y Fríos: desde $35\n\n⚠️ Los precios pueden variar según temporada.`,
  horario:     `🕐 *Horario de atención:*\n\nLunes a Domingo: 8:00 am – 10:00 pm\n📅 Abiertos los 365 días del año\n\n¡Siempre disponibles para ti! 🙌`,
  domicilio:   `🚚 *Entrega a domicilio:*\n\n✅ Sí hacemos entregas a domicilio\n⏱ Tiempo estimado: 30 a 60 minutos\n💵 Pedido mínimo: $150\n📍 Zona de entrega: Ciudad de México\n🎁 Envío gratis en pedidos mayores a $400`,
  ubicacion:   `📍 *Nuestra ubicación:*\n\nAv. Insurgentes Sur 1234\nCol. Del Valle, Ciudad de México\n\n🗺️ A una cuadra del metro Del Valle\n⏰ Lun–Dom: 8am – 10pm`,
  contacto:    `📞 *Contáctanos:*\n\nTeléfono: (55) 1234-5678\nWhatsApp: (55) 1234-5678\nCorreo: contacto@freshmark.mx\n\n⏰ Atención en horario de servicio`,
  promociones: `🔥 *Promociones actuales:*\n\n🌿 Martes de frescura: 15% en frutas y verduras\n🧴 Combo limpieza: 3x2 en productos seleccionados\n💳 10% de descuento pagando con tarjeta\n📦 Envío gratis en pedidos mayores a $400\n🎂 Descuento especial en tu cumpleaños\n\n¡Aprovecha estas ofertas! 🎉`,
  pago:        `💳 *Formas de pago aceptadas:*\n\n💵 Efectivo (solo en tienda)\n💳 Tarjeta de débito/crédito (Visa, Mastercard, Amex)\n📲 Transferencia SPEI\n📱 Pago con QR\n\nTodos los pagos en línea son seguros ✅`,
  bebidas:     `🥤 *Bebidas disponibles:*\n\n• Agua 500ml: $12\n• Refresco 355ml: $18\n• Refresco 600ml: $25\n• Refresco 2L: $42\n• Jugo natural 1L: $35\n• Leche 1L: $28\n• Bebidas energéticas: $30`,
  extras:      `🎁 *Servicios adicionales:*\n\n📦 Empaque especial para regalo: +$20\n🧊 Bolsa térmica para productos fríos: +$15\n🚀 Envío express (menos de 2h): +$50\n🗒️ Nota personalizada: Gratis`,
  productos:   `🌟 *Productos más populares:*\n\n🥛 Leche Lala 1L\n🍞 Pan Bimbo\n🧴 Jabón Roma 900g\n🥚 Huevo blanco 12pz\n🍚 Arroz SOS 1kg\n🫘 Frijol Isadora 560g\n🧴 Aceite Nutrioli 900ml`,
  alergias:    `⚠️ *Información de alérgenos:*\n\nAlgunos productos pueden contener:\n• Gluten • Lácteos • Frutos secos • Soya\n\n🔍 Revisa la etiqueta de cada producto.`,
  tiempo:      `⏱ *Tiempos de entrega:*\n\n• Estándar: 30–60 minutos\n• Express: menos de 2 horas (+$50)\n• Recolección en tienda: 20–30 minutos`,
  recoleccion: `🏪 *Recoger en tienda:*\n\n✅ Puedes pasar a recoger tu pedido\n⏱ Preparación: 20–30 minutos\n📍 Av. Insurgentes Sur 1234, Col. Del Valle`,
  devolucion:  `↩️ *Política de devoluciones:*\n\n✅ Aceptamos devoluciones dentro de 24 horas\n📦 El producto debe estar sin abrir\n🧊 Productos perecederos sin devolución\n💳 Reembolso por el mismo método de pago`,
  nuevos:      `✨ *Productos nuevos:*\n\nActualizamos el catálogo constantemente.\nMira la sección *Productos Nuevos* en la página principal 🏠`,
};

// ─────────────────────────────────────────
// 2. PALABRAS CLAVE → DATASET
// ─────────────────────────────────────────
const PALABRAS_CLAVE = {
  menu:        ["menu","catalogo","que tienen","que venden","carta","opciones","productos disponibles","que hay","que tienen"],
  categorias:  ["categoria","categorias","seccion","departamento","tipo de producto"],
  precios:     ["precio","precios","costo","cuanto cuesta","cuanto vale","cuestan","cobran","tarifa"],
  horario:     ["horario","hora","abierto","abren","cierran","horarios","atienden","dias","cuando abren"],
  domicilio:   ["domicilio","envio","llevan","delivery","reparto","a casa","a domicilio","mandan","envian a domicilio"],
  promociones: ["promo","promocion","descuento","oferta","2x1","combo","especial","barato","rebaja","tienen descuento"],
  ubicacion:   ["ubicacion","donde estan","direccion","como llegar","donde queda","sucursal"],
  pago:        ["pago","pagar","tarjeta","efectivo","transferencia","spei","metodo de pago","formas de pago","como pago"],
  bebidas:     ["bebidas disponibles","tipos de bebida","que bebidas tienen"],
  extras:      ["extra","adicional","empaque","regalo","express","servicio adicional","bolsa termica"],
  productos:   ["producto popular","populares","mas vendido","recomendado","destacado"],
  contacto:    ["contacto","telefono","llamar","numero de telefono","correo","email","whatsapp","comunicar"],
  alergias:    ["alergia","gluten","lactosa","intolerancia","alergeno","ingredientes","contiene"],
  tiempo:      ["cuanto tarda","tiempo de entrega","demora","espera","cuando llega","cuanto se tarda"],
  recoleccion: ["recoger","pasar a recoger","en tienda","lo recojo","paso a recoger","recojo en tienda"],
  devolucion:  ["devolucion","devolver","reembolso","politica de devolucion","cambio de producto"],
  nuevos:      ["nuevo","novedades","novedad","reciente","llego","ultimo","estreno","lanzamiento","que es nuevo"],
};

const SALUDOS    = ["hola","buenas","buenos","hey","hi","buen dia","buenas tardes","buenas noches","buenos dias","saludos","ola"];
const DESPEDIDAS = ["adios","bye","hasta luego","nos vemos","hasta pronto","chao","ciao"];
const MENU_AYUDA = ["ayuda","help","menu","inicio","volver","start","empezar","que puedes hacer","como funciona"];

const TYPOS = {
  "hoa":"hola","domicilo":"domicilio","pediro":"pedido","preicos":"precios",
  "envoi":"envio","diteccion":"direccion","cotalogo":"catalogo","telefno":"telefono",
  "horaro":"horario","recolecion":"recoleccion","aggrega":"agrega","agerga":"agrega",
  "quier":"quiero","qiero":"quiero","agraga":"agrega","metele":"agrega","echame":"agrega",
  "traeme":"agrega","llevame":"agrega","consigueme":"agrega","ponme":"agrega"
};

// ─────────────────────────────────────────
// 3. QUICK REPLIES
// ─────────────────────────────────────────
const QUICK_REPLIES = {
  bienvenida:   ["🛒 Ver catálogo","💰 Precios","🚚 Domicilio","🔥 Promociones"],
  post_info:    ["💳 Pago","📍 Ubicación","⏰ Horario","📞 Contacto"],
  post_carrito: ["🛒 Ver carrito","🔥 Promociones","➕ Agregar otro"],
  neutral:      ["🛒 Ver catálogo","💰 Precios","🚚 Domicilio","📞 Contacto"],
  confirmar:    ["✅ Sí, agregar","❌ Cancelar"],
};

// ─────────────────────────────────────────
// 4. SESIÓN CONVERSACIONAL
// ─────────────────────────────────────────
const SESSION_KEY = "fm_chat_session";

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : { state: "neutral", draft: {}, historial: [] };
  } catch { return { state: "neutral", draft: {}, historial: [] }; }
}

function saveSession(s) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch {}
}

function resetSession() {
  const s = getSession();
  saveSession({ state: "neutral", draft: {}, historial: s.historial || [] });
}

// ─────────────────────────────────────────
// 5. NORMALIZACIÓN
// ─────────────────────────────────────────
function normalizar(texto) {
  if (!texto) return "";
  let t = texto.toLowerCase().trim();
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  t = t.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  t = t.split(" ").map(w => TYPOS[w] || w).join(" ");
  return t;
}

// ─────────────────────────────────────────
// 6. CATÁLOGO DE FRESHMARK
//    Usa PRODUCTS de main.js si existe, si no usa fallback interno
// ─────────────────────────────────────────
function getCatalogo() {
  try {
    if (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS) && PRODUCTS.length > 0) {
      // Normalizar formato de PRODUCTS de main.js
      return PRODUCTS.map(p => ({
        id:       p.id,
        name:     p.name || p.nombre || "",
        price:    p.price || p.precio || 0,
        category: p.category || p.categoria || "",
        emoji:    p.emoji || "🛒",
        img:      p.img || p.imagen || "",
      }));
    }
  } catch {}
  // Catálogo interno de respaldo
  return [
    { id:1,  name:"Leche Lala 1L",          price:28,  category:"Lácteos",          emoji:"🥛" },
    { id:2,  name:"Yogurt natural 1L",       price:35,  category:"Lácteos",          emoji:"🥛" },
    { id:3,  name:"Queso Oaxaca 400g",       price:65,  category:"Lácteos",          emoji:"🧀" },
    { id:4,  name:"Mantequilla 90g",         price:22,  category:"Lácteos",          emoji:"🧈" },
    { id:5,  name:"Jamón serrano 200g",      price:55,  category:"Carnes y Fríos",   emoji:"🥩" },
    { id:6,  name:"Salchichas 500g",         price:48,  category:"Carnes y Fríos",   emoji:"🌭" },
    { id:7,  name:"Chorizo 300g",            price:52,  category:"Carnes y Fríos",   emoji:"🥩" },
    { id:8,  name:"Pan Bimbo blanco",        price:32,  category:"Panadería",        emoji:"🍞" },
    { id:9,  name:"Tortillas maíz 1kg",      price:25,  category:"Panadería",        emoji:"🫓" },
    { id:10, name:"Galletas Marías 400g",    price:18,  category:"Panadería",        emoji:"🍪" },
    { id:11, name:"Arroz SOS 1kg",           price:28,  category:"Abarrotes",        emoji:"🍚" },
    { id:12, name:"Frijol negro 1kg",        price:32,  category:"Abarrotes",        emoji:"🫘" },
    { id:13, name:"Aceite Nutrioli 900ml",   price:45,  category:"Abarrotes",        emoji:"🫙" },
    { id:14, name:"Pasta spaghetti 500g",    price:20,  category:"Abarrotes",        emoji:"🍝" },
    { id:15, name:"Salsa Catsup 400g",       price:22,  category:"Abarrotes",        emoji:"🫙" },
    { id:16, name:"Agua 500ml",              price:12,  category:"Bebidas",          emoji:"💧" },
    { id:17, name:"Refresco Coca-Cola 2L",   price:42,  category:"Bebidas",          emoji:"🥤" },
    { id:18, name:"Jugo naranja 1L",         price:35,  category:"Bebidas",          emoji:"🍊" },
    { id:19, name:"Bebida energética",       price:30,  category:"Bebidas",          emoji:"⚡" },
    { id:20, name:"Jabón Roma 900g",         price:32,  category:"Limpieza",         emoji:"🧴" },
    { id:21, name:"Detergente Ariel 1kg",    price:58,  category:"Limpieza",         emoji:"🧺" },
    { id:22, name:"Papel higiénico 4pz",     price:35,  category:"Limpieza",         emoji:"🧻" },
    { id:23, name:"Papas Sabritas 45g",      price:14,  category:"Snacks",           emoji:"🍿" },
    { id:24, name:"Chocolate Abuelita",      price:28,  category:"Snacks",           emoji:"🍫" },
    { id:25, name:"Huevo blanco 12pz",       price:38,  category:"Frutas y Verduras",emoji:"🥚" },
    { id:26, name:"Plátanos 1kg",            price:22,  category:"Frutas y Verduras",emoji:"🍌" },
    { id:27, name:"Jitomate 1kg",            price:28,  category:"Frutas y Verduras",emoji:"🍅" },
    { id:28, name:"Cebolla 1kg",             price:18,  category:"Frutas y Verduras",emoji:"🧅" },
    { id:29, name:"Vino tinto 750ml",        price:120, category:"Bebidas",          emoji:"🍷" },
    { id:30, name:"Cerveza 6pz",             price:95,  category:"Bebidas",          emoji:"🍺" },
  ];
}

// ─────────────────────────────────────────
// 7. BÚSQUEDA DE PRODUCTO EN CATÁLOGO
// ─────────────────────────────────────────
function buscarProductoEnCatalogo(query) {
  const q = normalizar(query);
  const qTokens = q.split(" ").filter(t => t.length > 2);
  if (!qTokens.length) return null;

  const catalogo = getCatalogo();
  let mejorProducto = null;
  let mejorScore = 0;

  for (const p of catalogo) {
    const nombre = normalizar(p.name);
    const cat    = normalizar(p.category || "");

    // Coincidencia exacta de substring
    if (nombre.includes(q) || q.includes(nombre)) {
      const score = 10 + nombre.length;
      if (score > mejorScore) { mejorScore = score; mejorProducto = p; }
      continue;
    }

    // Coincidencia por tokens
    const nTokens = nombre.split(" ");
    const matchNombre = qTokens.filter(qt =>
      nTokens.some(nt => nt.includes(qt) || qt.includes(nt))
    ).length;
    const matchCat = qTokens.filter(qt => cat.includes(qt)).length;
    const score = matchNombre * 3 + matchCat;

    if (score > mejorScore && score >= 2) {
      mejorScore = score;
      mejorProducto = p;
    }
  }

  return mejorProducto ? { producto: mejorProducto, score: mejorScore } : null;
}

function buscarSimilares(query, excluirId) {
  const q = normalizar(query);
  const qTokens = q.split(" ").filter(t => t.length > 2);

  return getCatalogo()
    .filter(p => p.id !== excluirId)
    .map(p => {
      const nombre  = normalizar(p.name);
      const nTokens = nombre.split(" ");
      const score   = qTokens.filter(qt =>
        nTokens.some(nt => nt.includes(qt) || qt.includes(nt))
      ).length;
      return { producto: p, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.producto);
}

// ─────────────────────────────────────────
// 8. EXTRACCIÓN DE PEDIDO DE UNA SOLA FRASE
//    "quiero 2 leches"        → { cantidad:2, query:"leche" }
//    "agrega vino tinto 750"  → { cantidad:1, query:"vino tinto 750" }
// ─────────────────────────────────────────
const VERBOS_PEDIDO = [
  "quiero","dame","pon","ponme","agrega","agregame","manda","mandame",
  "necesito","pide","ordena","compra","comprame","anade","anades","metele",
  "echame","trae","traeme","consigue","quisiera","me gustaria","me das",
  "me puedes dar","me traes","llevame","agregar","pedir"
];

function extraerPedidoDeTexto(texto) {
  const t = normalizar(texto);
  const tieneVerbo = VERBOS_PEDIDO.some(v => {
    const vn = normalizar(v);
    return t === vn || t.startsWith(vn + " ") || t.includes(" " + vn + " ");
  });
  if (!tieneVerbo) return null;

  const numerosEscritos = { uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10 };
  let cantidad = 1;
  let textoSinNum = t;

  // Buscar número en dígitos (solo 1-99, no ml/g que son parte del nombre)
  const matchNum = t.match(/\b([1-9][0-9]?)\b(?!\s*(ml|g|kg|l|lt|pz|pzs))/);
  if (matchNum) {
    cantidad = parseInt(matchNum[1]);
    textoSinNum = t.replace(matchNum[0], " ");
  } else {
    for (const [palabra, num] of Object.entries(numerosEscritos)) {
      if (t.includes(" " + palabra + " ") || t.startsWith(palabra + " ")) {
        cantidad = num;
        textoSinNum = t.replace(new RegExp("\\b" + palabra + "\\b"), " ");
        break;
      }
    }
  }

  // Quitar verbos y palabras de relleno
  const relleno = [
    ...VERBOS_PEDIDO.map(v => normalizar(v)),
    "al carrito","del carrito","en el carrito","por favor","porfavor","favor",
    "gracias","pls","please","un","una","unos","unas","de","al","mi","me"
  ];

  let queryProducto = textoSinNum;
  for (const p of relleno) {
    queryProducto = queryProducto.replace(new RegExp("\\b" + p.replace(/\s+/g," \\b"), "g"), " ");
  }
  queryProducto = queryProducto.replace(/\s+/g, " ").trim();

  return queryProducto.length >= 2 ? { cantidad, query: queryProducto } : null;
}

// ─────────────────────────────────────────
// 9. AGREGAR AL CARRITO REAL DE FRESHMARK
// ─────────────────────────────────────────
function agregarAlCarritoReal(producto, cantidad) {
  try {
    if (typeof addToCart === "function") {
      for (let i = 0; i < cantidad; i++) addToCart(producto.id);
      return true;
    }
    if (typeof cart !== "undefined" && typeof syncCartCounts === "function") {
      const existente = cart.find(c => c.id === producto.id);
      if (existente) {
        existente.qty += cantidad;
      } else {
        cart.push({ id: producto.id, name: producto.name, price: producto.price, qty: cantidad, img: producto.img || "" });
      }
      syncCartCounts();
      return true;
    }
  } catch (e) {
    console.warn("[FreshBot] Error al agregar al carrito:", e);
  }
  return false;
}

// ─────────────────────────────────────────
// 10. MATCHING DE INTENCIONES INFORMATIVAS
// ─────────────────────────────────────────
function detectarIntencion(texto) {
  const t = normalizar(texto);
  const tokens = t.split(" ");
  let mejorClave = null;
  let mejorScore = 0;

  for (const [clave, variantes] of Object.entries(PALABRAS_CLAVE)) {
    for (const v of variantes) {
      const vNorm = normalizar(v);
      if (t.includes(vNorm)) {
        const score = vNorm.split(" ").length * 2;
        if (score > mejorScore) { mejorScore = score; mejorClave = clave; }
        continue;
      }
      const vTokens = vNorm.split(" ");
      const matchCount = vTokens.filter(vt => tokens.includes(vt)).length;
      if (matchCount > 0) {
        const score = matchCount / vTokens.length;
        if (score > mejorScore) { mejorScore = score; mejorClave = clave; }
      }
    }
  }
  return mejorScore > 0 ? mejorClave : null;
}

// ─────────────────────────────────────────
// 11. MOTOR PRINCIPAL DE RESPUESTA
// ─────────────────────────────────────────
function buscarRespuesta(textoOriginal) {
  const t = normalizar(textoOriginal);
  const session = getSession();

  // — Despedidas —
  if (DESPEDIDAS.some(d => t.includes(normalizar(d)))) {
    resetSession();
    const nombre = getNombreUsuario();
    return {
      texto: `¡Hasta luego${nombre ? ", " + nombre : ""}! 👋 Gracias por visitar *FreshMark*.\n¡Vuelve pronto! 🛒`,
      chips: null,
    };
  }

  // — Cancelar flujo activo —
  if (session.state !== "neutral" && ["cancelar","cancel","salir","no quiero","olvida","detener","no"].some(p => t === p || t.startsWith(p + " "))) {
    resetSession();
    return { texto: "De acuerdo, cancelé el pedido. 😊 ¿En qué más puedo ayudarte?", chips: QUICK_REPLIES.neutral };
  }

  // ── ESTADO: confirmar_producto ──────────────────────────────────
  if (session.state === "confirmar_producto") {
    const { producto, cantidad } = session.draft;

    const esConfirmar = ["si","sí","ok","dale","yes","confirmar","claro","va","sale","adelante","agrega","correcto","exacto"].some(p => t.includes(p));
    const esCancelar  = ["no","nope","cancel","cancelar","otro","cambiar","incorrecto"].some(p => t.includes(p));

    if (esConfirmar) {
      const exito = agregarAlCarritoReal(producto, cantidad);
      const historial = session.historial || [];
      historial.push({ nombre: producto.name, cantidad, precio: producto.price });
      saveSession({ state: "neutral", draft: {}, historial });

      const resumen = historial.length > 1
        ? `\n\n📋 *Pedido de esta sesión:*\n${historial.map(h => `• ${h.cantidad}x ${h.nombre} — $${h.precio * h.cantidad}`).join("\n")}`
        : "";

      return {
        texto: exito
          ? `✅ ¡Listo! Agregué *${cantidad}x ${producto.name}* ($${(producto.price * cantidad).toFixed(2)}) a tu carrito. 🛒${resumen}\n\n¿Deseas agregar algo más?`
          : `✅ Anotado: *${cantidad}x ${producto.name}*. Dirígete al carrito para finalizar. 🛒${resumen}`,
        chips: QUICK_REPLIES.post_carrito,
        accion: "pulsar_carrito",
      };
    }

    if (esCancelar) {
      resetSession();
      return { texto: "Sin problema. ¿Qué producto deseas pedir? 🛒", chips: null };
    }

    // Si escribió otra cosa estando en confirmar → tratar como nuevo mensaje
    resetSession();
    return buscarRespuesta(textoOriginal);
  }

  // ── ESTADO: esperando_cantidad ───────────────────────────────────
  if (session.state === "esperando_cantidad") {
    // Escapar si es pregunta informativa
    const escapar = detectarIntencion(textoOriginal);
    if (escapar) { resetSession(); return buscarRespuesta(textoOriginal); }

    const num = parseInt(t.replace(/[^\d]/g, ""));
    if (!num || num < 1 || num > 99) {
      return { texto: "¿Cuántas unidades deseas? Escribe un número (ej: *2*) 🔢", chips: ["1","2","3","5","10"] };
    }
    const { producto } = session.draft;
    session.draft.cantidad = num;
    session.state = "confirmar_producto";
    saveSession(session);
    return {
      texto: `¿Confirmas agregar *${num}x ${producto.name}* a tu carrito?\n💰 Total: *$${(producto.price * num).toFixed(2)}*`,
      chips: QUICK_REPLIES.confirmar,
    };
  }

  // ── ESTADO: esperando_producto (flujo guiado) ────────────────────
  if (session.state === "esperando_producto") {
    const escapar = detectarIntencion(textoOriginal);
    if (escapar) { resetSession(); return buscarRespuesta(textoOriginal); }

    const res = buscarProductoEnCatalogo(textoOriginal);
    if (res) {
      session.state = "esperando_cantidad";
      session.draft = { producto: res.producto };
      saveSession(session);
      return {
        texto: `Encontré: *${res.producto.emoji} ${res.producto.name}* — $${res.producto.price} 🛒\n¿Cuántas unidades deseas?`,
        chips: ["1","2","3","5","10"],
      };
    }
    const similares = buscarSimilares(textoOriginal);
    if (similares.length) {
      return {
        texto: `No encontré ese producto exactamente 😅\n\n¿Quizás buscas:\n${similares.map(s => `${s.emoji} ${s.name} — $${s.price}`).join("\n")}?`,
        chips: similares.map(s => `${s.emoji} ${s.name}`),
      };
    }
    return { texto: "No encontré ese producto. Intenta con otro nombre o escribe *catálogo* para verlos todos. 🛒", chips: null };
  }

  // ── DETECCIÓN INTELIGENTE EN UNA SOLA FRASE ──────────────────────
  const pedidoDetectado = extraerPedidoDeTexto(textoOriginal);
  if (pedidoDetectado) {
    const { cantidad, query } = pedidoDetectado;
    const resultado = buscarProductoEnCatalogo(query);

    if (resultado) {
      const { producto, score } = resultado;
      session.state = "confirmar_producto";
      session.draft = { producto, cantidad };
      saveSession(session);

      const similares = score < 5 ? buscarSimilares(query, producto.id).slice(0, 2) : [];
      const sugs = similares.length
        ? `\n\nSi no es este, también tenemos:\n${similares.map(s => `${s.emoji} ${s.name} — $${s.price}`).join("\n")}`
        : "";

      const confianzaAlta = score >= 5;
      return {
        texto: confianzaAlta
          ? `Encontré: *${producto.emoji} ${producto.name}* — $${producto.price}\n\n¿Confirmas agregar *${cantidad}* al carrito?\n💰 Total: *$${(producto.price * cantidad).toFixed(2)}*`
          : `Creo que buscas: *${producto.emoji} ${producto.name}* — $${producto.price}${sugs}\n\n¿Es correcto? ¿Agrego *${cantidad}* al carrito?`,
        chips: QUICK_REPLIES.confirmar,
      };
    }

    // No encontró el producto
    const similares = buscarSimilares(query);
    if (similares.length) {
      return {
        texto: `No encontré exactamente "*${query}*" en el catálogo 😅\n\n¿Quizás buscas:\n${similares.map(s => `${s.emoji} ${s.name} — $${s.price}`).join("\n")}?`,
        chips: similares.map(s => `${s.emoji} ${s.name}`),
      };
    }
    return {
      texto: `No encontré "*${query}*" en el catálogo 😅\n\nEscribe *catálogo* para ver todos los productos, o pregunta por categoría (ej: *bebidas*, *lácteos*, *snacks*).`,
      chips: ["🛒 Ver catálogo","🥤 Bebidas","🥛 Lácteos","🍫 Snacks"],
    };
  }

  // ── PREGUNTAS SOBRE PRECIO O DISPONIBILIDAD ─────────────────────
  const esPreguntaProducto = ["cuanto cuesta","precio de","tienen","hay","disponible","cuanto vale","cuanto es"].some(p => t.includes(p));
  if (esPreguntaProducto) {
    let queryP = t;
    ["cuanto cuesta","precio de","tienen","hay","disponible","cuanto vale","cuanto es","el precio","tienen el"].forEach(p => {
      queryP = queryP.replace(new RegExp("\\b" + p + "\\b", "g"), " ");
    });
    queryP = queryP.replace(/\s+/g," ").trim();
    if (queryP.length >= 2) {
      const res = buscarProductoEnCatalogo(queryP);
      if (res) {
        const p = res.producto;
        return {
          texto: `${p.emoji} *${p.name}*\n💰 Precio: *$${p.price}*\n📦 Categoría: ${p.category}\n\n¿Lo agrego a tu carrito?`,
          chips: ["✅ Sí, agregar 1","❌ No gracias"],
          accion: `agregar_${p.id}_1`,
        };
      }
    }
  }

  // ── SALUDOS / MENÚ ──────────────────────────────────────────────
  if (SALUDOS.some(s => t.includes(normalizar(s))) || MENU_AYUDA.includes(t)) {
    const nombre = getNombreUsuario();
    resetSession();
    return {
      texto: `¡Hola${nombre ? ", *" + nombre + "*" : ""}! 👋 Soy *FreshBot* de *FreshMark* 🛒\n\nPuedes pedirme directamente:\n_"quiero 2 leches"_\n_"agrega vino tinto al carrito"_\n_"precio del arroz"_\n\n¿En qué te ayudo?`,
      chips: QUICK_REPLIES.bienvenida,
    };
  }

  // ── INTENCIÓN DE PEDIDO SIN ESPECIFICAR QUÉ ─────────────────────
  const soloVerbo = VERBOS_PEDIDO.some(v => {
    const vn = normalizar(v);
    return t === vn || t === "hacer un pedido" || t === "quiero pedir" || t === "quiero comprar algo";
  });
  if (soloVerbo) {
    session.state = "esperando_producto";
    saveSession(session);
    const top5 = getCatalogo().slice(0, 5);
    return {
      texto: `¡Con gusto! 🛒 ¿Qué producto deseas ordenar?\n\nAlgunos populares:\n${top5.map(p => `${p.emoji} ${p.name} — $${p.price}`).join("\n")}\n\n_Escribe el nombre o *cancelar* para salir_`,
      chips: null,
    };
  }

  // ── CHIP "Agregar otro" ─────────────────────────────────────────
  if (["agregar otro","otro producto","agregar otro producto"].includes(t)) {
    session.state = "esperando_producto";
    saveSession(session);
    return { texto: "¿Qué otro producto deseas agregar? 🛒", chips: null };
  }

  // ── VER CARRITO ─────────────────────────────────────────────────
  if (["carrito","ver carrito","mi carrito","abrir carrito"].some(p => t.includes(p))) {
    return { texto: "¡Aquí tienes tu carrito! 🛒", chips: null, accion: "abrir_carrito" };
  }

  // ── INTENCIONES INFORMATIVAS GENERALES ──────────────────────────
  const intencion = detectarIntencion(textoOriginal);
  if (intencion && DATASET[intencion]) {
    guardarInteraccion(textoOriginal, intencion);
    return {
      texto: DATASET[intencion],
      chips: ["menu","categorias","productos"].includes(intencion) ? QUICK_REPLIES.post_info : QUICK_REPLIES.neutral,
    };
  }

  // ── FALLBACK ────────────────────────────────────────────────────
  guardarPreguntaNueva(textoOriginal);
  return {
    texto: `Mmm, no entendí bien 🤔\n\nPuedes decirme:\n• _"quiero 2 leches"_ 🥛\n• _"agrega vino tinto"_ 🍷\n• _"precio del arroz"_ 💰\n• _"horario"_, _"domicilio"_, _"promociones"_\n\nO escribe *menú* para más opciones.`,
    chips: QUICK_REPLIES.neutral,
  };
}

// ─────────────────────────────────────────
// 12. UTILIDADES
// ─────────────────────────────────────────
function getNombreUsuario() {
  try {
    const stored = localStorage.getItem("fm_users");
    const activeEmail = localStorage.getItem("fm_current");
    if (stored && activeEmail) {
      const users = JSON.parse(stored);
      const user = users.find(u => u.email === activeEmail);
      if (user && user.name) return user.name;
    }
    const nameEl = document.getElementById("userNameDisplay");
    if (nameEl && nameEl.textContent.trim()) return nameEl.textContent.trim();
  } catch {}
  return null;
}

function guardarInteraccion(mensaje, clave) {
  try {
    const key = "fm_interacciones";
    const lista = JSON.parse(localStorage.getItem(key) || "[]");
    lista.push({ fecha: new Date().toLocaleString("es-MX"), mensaje, clave });
    if (lista.length > 200) lista.splice(0, lista.length - 200);
    localStorage.setItem(key, JSON.stringify(lista));
  } catch {}
}

function guardarPreguntaNueva(pregunta) {
  try {
    const key = "fm_preguntas_nuevas";
    const lista = JSON.parse(localStorage.getItem(key) || "[]");
    lista.push({ fecha: new Date().toLocaleString("es-MX"), pregunta, respuesta: "SIN RESPUESTA" });
    if (lista.length > 200) lista.splice(0, lista.length - 200);
    localStorage.setItem(key, JSON.stringify(lista));
  } catch {}
}

function horaActual() {
  return new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

// ─────────────────────────────────────────
// 13. RENDERIZADO DE MENSAJES
// ─────────────────────────────────────────
function renderTexto(texto) {
  return texto
    .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
    .replace(/_\((.+?)\)_/g, "<em style='opacity:.7;font-size:12px'>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}

function agregarMensaje(texto, quien) {
  const box = document.getElementById("chatMessages");
  if (!box) return;
  const wrap = document.createElement("div");
  wrap.className = `chat-msg ${quien}`;
  const burbuja = document.createElement("div");
  burbuja.className = "chat-bubble";
  burbuja.innerHTML = renderTexto(texto);
  const ts = document.createElement("div");
  ts.className = "chat-ts";
  ts.textContent = horaActual();
  wrap.appendChild(burbuja);
  wrap.appendChild(ts);
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
}

function mostrarChips(chips, accion) {
  if (!chips || !chips.length) return;
  const box = document.getElementById("chatMessages");
  if (!box) return;

  const wrap = document.createElement("div");
  wrap.className = "chat-chips";

  chips.forEach(label => {
    const btn = document.createElement("button");
    btn.className = "chat-chip";
    btn.textContent = label;
    btn.onclick = () => {
      wrap.remove();

      // Chip "Ver carrito"
      if (label.toLowerCase().includes("carrito") && !label.includes("gregar")) {
        agregarMensaje(label, "user");
        setTimeout(() => {
          if (typeof openCart === "function") openCart();
          agregarMensaje("¡Aquí tienes tu carrito! 🛒 Revisa y finaliza tu compra.", "bot");
        }, 300);
        return;
      }

      // Chip de precio directo: "✅ Sí, agregar 1"
      if (accion && accion.startsWith("agregar_") && label.includes("Sí")) {
        const partes = accion.split("_");
        const pid = parseInt(partes[1]);
        const qty = parseInt(partes[2]) || 1;
        const prod = getCatalogo().find(p => p.id === pid);
        if (prod) {
          agregarMensaje(label, "user");
          const s = getSession();
          s.state = "confirmar_producto";
          s.draft = { producto: prod, cantidad: qty };
          saveSession(s);
          setTimeout(() => procesarYEnviar("si"), 300);
          return;
        }
      }

      procesarYEnviar(label);
    };
    wrap.appendChild(btn);
  });

  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
}

function mostrarTyping() {
  const box = document.getElementById("chatMessages");
  if (!box) return null;
  const wrap = document.createElement("div");
  wrap.className = "chat-msg bot";
  wrap.id = "chatTyping";
  const burbuja = document.createElement("div");
  burbuja.className = "chat-bubble typing-indicator";
  burbuja.innerHTML = "<span></span><span></span><span></span>";
  wrap.appendChild(burbuja);
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
  return wrap;
}

// ─────────────────────────────────────────
// 14. ENVÍO DE MENSAJES
// ─────────────────────────────────────────
function procesarYEnviar(texto) {
  const t = texto.trim();
  if (!t) return;
  document.querySelectorAll(".chat-chips").forEach(el => el.remove());
  agregarMensaje(t, "user");
  const typing = mostrarTyping();
  const delay = 350 + Math.min(t.length * 8, 500);
  setTimeout(() => {
    if (typing) typing.remove();
    const resultado = buscarRespuesta(t);
    if (resultado.accion === "abrir_carrito" && typeof openCart === "function") openCart();
    if (resultado.accion === "pulsar_carrito" && typeof syncCartCounts === "function") syncCartCounts();
    agregarMensaje(resultado.texto, "bot");
    if (resultado.chips) mostrarChips(resultado.chips, resultado.accion);
  }, delay);
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const texto = input.value.trim();
  if (!texto) return;
  input.value = "";
  procesarYEnviar(texto);
}

// ─────────────────────────────────────────
// 15. TOGGLE DEL CHAT
// ─────────────────────────────────────────
function toggleChat() {
  const box = document.getElementById("chatbotBox");
  if (!box) return;
  const estaOculto = box.classList.contains("hidden");

  if (estaOculto) {
    box.classList.remove("hidden");
    const msgs = document.getElementById("chatMessages");
    if (msgs && msgs.children.length === 0) {
      setTimeout(() => {
        const nombre = getNombreUsuario();
        const saludo = nombre
          ? `¡Hola, *${nombre}*! 👋 Soy *FreshBot* de *FreshMark* 🛒\n\nPuedes pedirme directamente:\n_"quiero 2 leches"_, _"agrega vino al carrito"_\n\n¿En qué te ayudo?`
          : `¡Hola! 👋 Soy *FreshBot* de *FreshMark* 🛒\n\nPuedes pedirme directamente:\n_"quiero 2 leches"_, _"agrega vino al carrito"_\n\n¿En qué te ayudo?`;
        agregarMensaje(saludo, "bot");
        mostrarChips(QUICK_REPLIES.bienvenida, null);
      }, 300);
    }
    setTimeout(() => { const inp = document.getElementById("chatInput"); if (inp) inp.focus(); }, 350);
  } else {
    box.classList.add("hidden");
  }
}

// ─────────────────────────────────────────
// 16. ESTILOS ADICIONALES (auto-inyectados)
// ─────────────────────────────────────────
(function inyectarEstilos() {
  if (document.getElementById("fm-chatbot-extra-css")) return;
  const style = document.createElement("style");
  style.id = "fm-chatbot-extra-css";
  style.textContent = `
    .chat-ts { font-size:10px; color:var(--text2,#9ca3af); margin-top:3px; padding:0 4px; align-self:flex-end; }
    .chat-msg.user .chat-ts { text-align:right; }
    .chat-msg.bot  .chat-ts { text-align:left;  }

    .chat-chips { display:flex; flex-wrap:wrap; gap:6px; padding:2px 4px 8px; align-self:flex-start; max-width:100%; }
    .chat-chip {
      background:var(--card,#fff); color:#16a34a; border:1.5px solid #16a34a;
      border-radius:20px; padding:5px 13px; font-size:12.5px; font-weight:600;
      cursor:pointer; font-family:'Nunito',sans-serif; transition:background .15s,color .15s; white-space:nowrap;
    }
    .chat-chip:hover { background:#16a34a; color:#fff; }
    [data-theme="dark"] .chat-chip { background:#1e2130; color:#4ade80; border-color:#4ade80; }
    [data-theme="dark"] .chat-chip:hover { background:#4ade80; color:#0f1117; }

    .chat-msg { animation:chatFadeIn .2s ease; }
    @keyframes chatFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  `;
  document.head.appendChild(style);
})();