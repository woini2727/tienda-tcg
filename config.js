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
  // tipo: "Play Booster Box" | "Bundle" | "Precon" | "Folios"
  // estado: "disponible" | "preventa" | "agotado"
  // destacado: true muestra la etiqueta "Destacado" y resalta la tarjeta
  // moxfield: link a la lista del mazo (solo precons; dejalo "" si no aplica)
  // descripcion: texto que se muestra en el detalle del producto (copia de items/.../descripcion.md)
  // precio: número en USD, o null para mostrar "Consultar precio"
  // imagen: ruta a la foto, ej. "items/play-booster-box/the-hobbit/foto.webp"
  productos: [
    { nombre: "Play Booster Box - The Hobbit", tipo: "Play Booster Box", precio: 190, estado: "disponible", destacado: false, descripcion: "Caja sellada de 30 Play Boosters de The Hobbit, el set de Universes Beyond ambientado en la Tierra Media y el primero de esa línea que es legal en Standard. Cada sobre trae 14 cartas, con al menos una foil y una rara o mítica. Incluye además una carta foil de regalo dentro de la caja. Ideal para draft, sellado o para abrir en casa.", imagen: "items/play-booster-box/the-hobbit/foto.webp?v=2" },
    { nombre: "Play Booster Box - Reality Fracture", tipo: "Play Booster Box", precio: 220, estado: "disponible", destacado: true, descripcion: "Caja sellada de 30 Play Boosters de Reality Fracture, el último set de 2026 y el cierre de la historia de Jace Beleren. Cada sobre trae al menos una foil y una rara o mítica. Ideal para draft, sellado o para abrir en casa.", imagen: "items/play-booster-box/reality-fracture/foto.webp" },
    { nombre: "Play Booster Box - Avatar: The Last Airbender", tipo: "Play Booster Box", precio: 190, estado: "disponible", destacado: false, descripcion: "Caja sellada de 30 Play Boosters de Avatar: The Last Airbender, el set de Universes Beyond basado en la serie animada. Cada sobre trae 14 cartas, con al menos una foil. Trae las mecánicas de Earthbending, Airbending, Waterbending y Firebending. Ideal para draft, sellado o para abrir en casa.", imagen: "items/play-booster-box/avatar/foto.webp" },
    { nombre: "Bundle - Edición A", tipo: "Bundle", precio: 60, estado: "disponible", destacado: false, descripcion: "Bundle sellado. Descripción de ejemplo.", imagen: "" },
    { nombre: "Precon - Mazo A", tipo: "Precon", precio: 50, estado: "disponible", destacado: true, moxfield: "https://moxfield.com", descripcion: "Mazo preconstruido listo para jugar. Descripción de ejemplo.", imagen: "" },
    { nombre: "Folios - Dragon Shield", tipo: "Folios", precio: 25, estado: "disponible", destacado: false, descripcion: "Folios Dragon Shield para guardar tus cartas. Descripción de ejemplo.", imagen: "" },
  ],
};
