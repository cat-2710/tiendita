// ========== DATA ==========
const PRODUCTS = [
  {id:1,name:'Coca-Cola 600ml',cat:'Bebidas',price:22,orig:null,img:'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',badge:'hot',fav:true},
  {id:2,name:'Leche Entera 1L',cat:'Lácteos',price:25,orig:30,img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',badge:'offer',fav:true},
  {id:3,name:'Pan Blanco Bimbo',cat:'Panadería',price:35,orig:null,img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',badge:'',fav:false},
  {id:4,name:'Papas Sabritas',cat:'Botanas',price:16,orig:20,img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',badge:'offer',fav:true},
  {id:5,name:'Agua Natural 1.5L',cat:'Bebidas',price:14,orig:null,img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',badge:'',fav:false},
  {id:6,name:'Yogurt Fresa 150g',cat:'Lácteos',price:16,orig:null,img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',badge:'new',fav:true},
  {id:7,name:'Huevo Blanco 12pz',cat:'Abarrotes',price:42,orig:null,img:'https://images.unsplash.com/photo-1518569656558-1f25e69d2fd4?w=400&q=80',badge:'',fav:true},
  {id:8,name:'Jabón Dove 90g',cat:'Higiene',price:22,orig:28,img:'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',badge:'offer',fav:false},
  {id:9,name:'Manzana Roja kg',cat:'Frutas',price:32,orig:null,img:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',badge:'new',fav:false},
  {id:10,name:'Atún en Lata 140g',cat:'Abarrotes',price:22,orig:null,img:'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80',badge:'',fav:false},
  {id:11,name:'Jugo de Naranja 1L',cat:'Bebidas',price:28,orig:35,img:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',badge:'offer',fav:true},
  {id:12,name:'Galletas Oreo 174g',cat:'Botanas',price:26,orig:null,img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',badge:'',fav:false},
  {id:13,name:'Detergente Roma 500g',cat:'Limpieza',price:18,orig:null,img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',badge:'',fav:false},
  {id:14,name:'Tomate Saladette kg',cat:'Verduras',price:20,orig:null,img:'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&q=80',badge:'new',fav:false},
  {id:15,name:'Vino Tinto 750ml',cat:'Vinos y Licores',price:120,orig:145,img:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',badge:'offer',fav:false},
  {id:16,name:'Cepillo Dental',cat:'Higiene',price:15,orig:null,img:'https://images.unsplash.com/photo-1559590169-1948b3f400f3?w=400&q=80',badge:'new',fav:false},
];

const CATEGORIES = [
  {key:'all',label:'Todos',emoji:'🏪',img:'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=60',desc:'Todos los productos de la tienda'},
  {key:'Bebidas',label:'Bebidas',emoji:'🥤',img:'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=1200&q=60',desc:'Refrescos, aguas, jugos y más'},
  {key:'Lácteos',label:'Lácteos',emoji:'🥛',img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=60',desc:'Leche, yogurt, queso y crema'},
  {key:'Frutas',label:'Frutas',emoji:'🍎',img:'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1200&q=60',desc:'Frutas frescas del día'},
  {key:'Verduras',label:'Verduras',emoji:'🥦',img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=60',desc:'Verduras frescas y naturales'},
  {key:'Abarrotes',label:'Abarrotes',emoji:'🥫',img:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=60',desc:'Enlatados, pastas, arroz y más'},
  {key:'Limpieza',label:'Limpieza',emoji:'🧹',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=60',desc:'Productos de limpieza del hogar'},
  {key:'Higiene',label:'Higiene personal',emoji:'🧴',img:'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',desc:'Cuidado personal y salud'},
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