// ============================================================
//  CONFIGURACIÓN DE LA TIENDA — editá solo este archivo
// ============================================================
window.TIENDA = {
  nombre: "Refu TCG",
  tagline: "Productos sellados · singles · Argentina",
  subtitulo: "Productos sellados para jugadores y coleccionistas",
  descripcion: "Booster boxes, precons, bundles, preventas y singles. Envíos a todo el país.",

  // Número en formato internacional, sin "+", espacios ni guiones (ej: 5491112345678)
  whatsapp: "5491100000000",
  instagram: "tu_usuario", // sin @

  // Promo por cantidad (solo aplica a productos con promo: true)
  promo: {
    descuentoPorCajaExtra: 10, // USD que se descuentan por cada caja adicional
    maxCajasTabla: 5,
  },
  descuentoUSDT: 3, // % extra al pagar con USDT

  zonaRetiro: "CABA",

  // Catálogo — agregá, quitá o editá productos
  // estado: "disponible" | "preventa" | "agotado"
  productos: [
    { nombre: "Play Booster Box — Edición A", tipo: "Play Booster Box", precio: 150, estado: "disponible", promo: true, imagen: "" },
    { nombre: "Play Booster Box — Edición B", tipo: "Play Booster Box", precio: 160, estado: "preventa", promo: true, imagen: "" },
    { nombre: "Collector Booster Box — Edición A", tipo: "Collector Booster Box", precio: 320, estado: "disponible", promo: false, imagen: "" },
    { nombre: "Bundle — Edición A", tipo: "Bundle", precio: 60, estado: "agotado", promo: false, imagen: "" },
  ],
};
