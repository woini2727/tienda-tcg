// ============================================================
//  CONFIGURACIÓN DE LA TIENDA — editá solo este archivo
// ============================================================
window.TIENDA = {
  nombre: "Refu TCG",
  tagline: "Productos sellados · singles · Argentina",
  subtitulo: "Productos sellados y singles para jugadores y coleccionistas",
  descripcion: "Booster boxes, precons, bundles, preventas y singles. Envíos a todo el país.",

  // Número en formato internacional, sin "+", espacios ni guiones (ej: 5491112345678)
  whatsapp: "5491100000000",
  instagram: "tu_usuario", // sin @

  // Listas de singles (Moxfield)
  singles: {
    baratas: "https://moxfield.com/binders/xQgWnq0XSEOPni7Ay_fThw",
    caras: "https://moxfield.com/binders/yM4DQ-CpKEubYs7r1G1v1A",
  },

  descuentoUSDT: 3, // % extra al pagar con USDT

  zonaRetiro: "CABA",

  // Catálogo — agregá, quitá o editá productos
  // tipo: "Play Booster Box" | "Bundle" | "Precon" | "Folio"
  // estado: "disponible" | "preventa" | "agotado"
  // destacado: true muestra la etiqueta "Destacado" y resalta la tarjeta
  // moxfield: link a la lista del mazo (solo precons; dejalo "" si no aplica)
  // descripcion: texto que se muestra en el detalle del producto
  productos: [
    { nombre: "Play Booster Box — Edición A", tipo: "Play Booster Box", precio: 150, estado: "disponible", destacado: true, descripcion: "Caja sellada de Play Boosters. Descripción de ejemplo.", imagen: "" },
    { nombre: "Play Booster Box — Edición B", tipo: "Play Booster Box", precio: 160, estado: "preventa", destacado: false, descripcion: "Caja sellada de Play Boosters en preventa. Descripción de ejemplo.", imagen: "" },
    { nombre: "Bundle — Edición A", tipo: "Bundle", precio: 60, estado: "disponible", destacado: false, descripcion: "Bundle sellado. Descripción de ejemplo.", imagen: "" },
    { nombre: "Precon — Mazo A", tipo: "Precon", precio: 50, estado: "disponible", destacado: true, moxfield: "https://moxfield.com", descripcion: "Mazo preconstruido listo para jugar. Descripción de ejemplo.", imagen: "" },
    { nombre: "Folio — 9 bolsillos", tipo: "Folio", precio: 25, estado: "disponible", destacado: false, descripcion: "Folio para guardar tus cartas. Descripción de ejemplo.", imagen: "" },
  ],
};
