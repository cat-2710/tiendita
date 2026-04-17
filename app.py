from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
import pandas as pd
import csv
import os
from datetime import datetime

app = Flask(__name__)

# =========================================
# CONFIGURACIÓN DEL CHATBOT
# =========================================
NOMBRE_BOT = "FreshBot 🛒"
NOMBRE_TIENDA = "FreshMark"

MENU_BIENVENIDA = (
    f"¡Hola! Soy {NOMBRE_BOT} de *{NOMBRE_TIENDA}* 🛒\n\n"
    "¿En qué te puedo ayudar hoy?\n\n"
    "1️⃣  Ver el catálogo\n"
    "2️⃣  Precios\n"
    "3️⃣  Hacer un pedido\n"
    "4️⃣  Horario de atención\n"
    "5️⃣  Entrega a domicilio\n"
    "6️⃣  Promociones\n"
    "7️⃣  Ubicación\n"
    "8️⃣  Formas de pago\n"
    "9️⃣  Bebidas y extras\n"
    "0️⃣  Contacto\n\n"
    "Escribe el número o la palabra clave 👇"
)

# =========================================
# MAPA DE PALABRAS CLAVE → DATASET
# =========================================
PALABRAS_CLAVE = {
    "menu": [
        "menu", "menú", "1", "catalogo", "catálogo", "productos",
        "que tienen", "qué tienen", "carta", "que venden", "opciones"
    ],
    "categorias": [
        "categoria", "categorías", "categorias", "sección", "seccion",
        "departamento", "tipo de productos", "qué categorías"
    ],
    "precios": [
        "precio", "precios", "2", "costo", "cuánto", "cuanto",
        "vale", "cuestan", "cobran", "tarifa"
    ],
    "pedir": [
        "pedir", "3", "pedido", "ordenar", "orden", "quiero",
        "quiero pedir", "hacer pedido", "comprar", "añadir carrito"
    ],
    "horario": [
        "horario", "4", "hora", "abierto", "abren", "cierran",
        "horarios", "atienden", "cuándo", "dias"
    ],
    "domicilio": [
        "domicilio", "5", "entrega", "envío", "envio", "llevan",
        "delivery", "reparto", "a casa", "a domicilio", "mandan"
    ],
    "promociones": [
        "promo", "6", "promoción", "promocion", "descuento",
        "oferta", "2x1", "combo", "especial", "barato"
    ],
    "ubicacion": [
        "ubicación", "ubicacion", "7", "donde", "dónde",
        "dirección", "direccion", "cómo llegar", "como llegar"
    ],
    "pago": [
        "pago", "8", "pagar", "tarjeta", "efectivo",
        "transferencia", "spei", "como pagan", "métodos de pago"
    ],
    "bebidas": [
        "bebida", "9", "refresco", "agua", "jugo",
        "tomar", "beber", "leche", "sodas", "jugos"
    ],
    "extras": [
        "extra", "extras", "adicional", "agregar", "añadir",
        "servicio", "empaque", "regalo", "express"
    ],
    "productos": [
        "producto", "productos", "popular", "populares",
        "más vendido", "recomendado", "más pedido", "más solicitado"
    ],
    "contacto": [
        "contacto", "0", "teléfono", "telefono", "llamar",
        "número", "numero", "correo", "email", "whatsapp"
    ],
    "alergias": [
        "alergia", "alergias", "gluten", "lactosa",
        "intolerancia", "alérgeno", "alergeno", "ingredientes"
    ],
    "tiempo": [
        "tiempo", "cuánto tarda", "cuanto tarda", "tarda",
        "demora", "espera", "cuando llega", "cuanto se tarda"
    ],
    "recoleccion": [
        "recoleccion", "recolección", "recoger", "pasar",
        "en tienda", "sucursal", "lo recojo", "paso a recoger"
    ],
    "devolucion": [
        "devolucion", "devolución", "devolver", "reembolso",
        "regresa", "cambio", "cambiar", "política"
    ],
    "nuevos": [
        "nuevo", "nuevos", "novedades", "novedad", "reciente",
        "llegó", "llego", "último", "ultimo", "estreno"
    ],
}

# =========================================
# CARGAR DATASET DESDE CSV
# =========================================
def cargar_dataset() -> pd.DataFrame:
    ruta = os.path.join(os.path.dirname(__file__), "dataset.csv")
    df = pd.read_csv(ruta)
    return df

# =========================================
# BUSCAR RESPUESTA EN EL CSV
# =========================================
def buscar_en_csv(clave: str) -> str:
    try:
        df = cargar_dataset()
        fila = df[df["pregunta"] == clave]
        if not fila.empty:
            return fila.iloc[0]["respuesta"].replace("\\n", "\n")
        return "No encontré información sobre eso. 🛒"
    except Exception as e:
        print(f"[ERROR al leer dataset]: {e}")
        return "Hubo un problema al leer la información. Intenta de nuevo."

# =========================================
# BUSCAR RESPUESTA SEGÚN EL MENSAJE
# =========================================
def buscar_respuesta(mensaje: str) -> str:
    texto = mensaje.lower().strip()

    # Saludos → mostrar menú
    saludos = ["hola", "buenas", "buenos", "hey", "hi", "buen dia",
                "buen día", "buenas tardes", "buenas noches", "buenos días"]
    if any(s in texto for s in saludos):
        return MENU_BIENVENIDA

    # Menú de ayuda
    if texto in ["ayuda", "help", "menú", "menu principal", "inicio", "volver"]:
        return MENU_BIENVENIDA

    # Despedidas
    despedidas = ["adios", "adiós", "bye", "hasta luego", "nos vemos", "gracias"]
    if any(d in texto for d in despedidas):
        return (
            f"¡Hasta luego! 👋 Gracias por visitar *{NOMBRE_TIENDA}*.\n"
            "¡Vuelve pronto para tus compras! 🛒"
        )

    # Buscar por palabras clave en el diccionario
    for clave, variantes in PALABRAS_CLAVE.items():
        if any(v in texto for v in variantes):
            guardar_interaccion(mensaje, clave)
            return buscar_en_csv(clave)

    # Si no entendió → guardar para aprender
    guardar_pregunta_nueva(mensaje)
    return (
        "Mmm, no entendí bien tu mensaje 🤔\n\n"
        "Tu pregunta fue registrada para mejorar el servicio.\n\n"
        "Puedes preguntarme sobre:\n"
        "🛒 catálogo | 💰 precios | 🕐 horario\n"
        "🚚 domicilio | 🔥 promociones | 📍 ubicación\n"
        "🔄 devoluciones | ✨ productos nuevos\n\n"
        "O escribe *menú* para ver todas las opciones."
    )

# =========================================
# GUARDAR INTERACCIONES (para estadísticas)
# =========================================
def guardar_interaccion(mensaje: str, clave: str):
    ruta = os.path.join(os.path.dirname(__file__), "interacciones.csv")
    existe = os.path.exists(ruta)
    with open(ruta, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not existe:
            writer.writerow(["fecha", "mensaje_usuario", "clave_detectada"])
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M"),
            mensaje,
            clave
        ])

# =========================================
# GUARDAR PREGUNTAS SIN RESPUESTA (el bot aprende)
# =========================================
def guardar_pregunta_nueva(mensaje: str):
    ruta = os.path.join(os.path.dirname(__file__), "preguntas_nuevas.csv")
    existe = os.path.exists(ruta)
    with open(ruta, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not existe:
            writer.writerow(["fecha", "pregunta", "respuesta"])
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M"),
            mensaje,
            "SIN RESPUESTA"
        ])
    print(f"[Nueva pregunta sin respuesta guardada]: {mensaje}")

# =========================================
# PRUEBA LOCAL
# =========================================
@app.route("/test", methods=["GET"])
def test():
    msg = request.args.get("msg", "hola")
    return buscar_respuesta(msg).replace("\n", "<br>")

# =========================================
# WEBHOOK DE WHATSAPP 
# =========================================
@app.route("/webhook", methods=["POST"])
def webhook():
    mensaje_entrante = request.values.get("Body", "").strip()
    numero = request.values.get("From", "desconocido")

    print(f"\n📩 Mensaje de {numero}: {mensaje_entrante}")

    respuesta_texto = buscar_respuesta(mensaje_entrante)
    respuesta = MessagingResponse()
    respuesta.message(respuesta_texto)
    return str(respuesta)

# =========================================
# INICIO
# =========================================
@app.route("/", methods=["GET"])
def inicio():
    return f"<h2>🛒 {NOMBRE_TIENDA} - Chatbot activo</h2><p>Versión 1.0</p>"

# =========================================
# EJECUCIÓN PRINCIPAL
# =========================================
if __name__ == "__main__":
    print(f"🛒 {NOMBRE_TIENDA} - Chatbot iniciado")
    print("🔗 Webhook disponible en: http://localhost:5000/webhook")
    print("🧪 Prueba local en:       http://localhost:5000/test?msg=hola")
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
