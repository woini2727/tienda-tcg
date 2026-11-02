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
    { nombre: "Bundle - Aetherdrift", tipo: "Bundle", precio: null, estado: "disponible", destacado: false, descripcion: "Bundle sellado de Aetherdrift, el set de carreras de Magic. Trae 9 Play Boosters de 14 cartas, 1 carta promo foil con arte alternativo exclusiva del Bundle, 40 tierras básicas (20 foil y 20 no foil, con 10 de arte completo), un contador de vidas grande, una caja para guardar cartas y 2 cartas de referencia.", imagen: "items/bundle/aetherdrift/foto.webp" },
    { nombre: "Precon - Final Fantasy Terra", tipo: "Precon", precio: 75, estado: "disponible", destacado: false, moxfield: "", descripcion: "Mazo «Revival Trance», basado en Final Fantasy VI, en rojo, blanco y negro. Tiene a Terra como comandante y su plan es llenar el cementerio y traer de vuelta a tus criaturas caídas. Mazo de Commander listo para jugar de la colección Final Fantasy: 100 cartas, 2 de ellas legendarias foil, un sobre de muestra de Collector Booster de 2 cartas, caja para el mazo, guía de estrategia y carta de referencia.", imagen: "items/precon/final-fantasy-terra/foto.webp" },
    { nombre: "Precon - Final Fantasy Tidus", tipo: "Precon", precio: 85, estado: "disponible", destacado: false, moxfield: "", descripcion: "Mazo «Counter Blitz», basado en Final Fantasy X, en verde, blanco y azul. Tiene a Tidus como comandante y su plan es poner contadores en tus criaturas y moverlos entre ellas. Mazo de Commander listo para jugar de la colección Final Fantasy: 100 cartas, 2 de ellas legendarias foil, un sobre de muestra de Collector Booster de 2 cartas, caja para el mazo, guía de estrategia y carta de referencia.", imagen: "items/precon/final-fantasy-tidus/foto.webp" },
    { nombre: "Precon - Final Fantasy Cloud", tipo: "Precon", precio: 90, estado: "disponible", destacado: false, moxfield: "", descripcion: "Mazo «Limit Break», basado en Final Fantasy VII, en rojo, verde y blanco. Tiene a Cloud como comandante y su plan es equipar armas para llevar a tus criaturas a 7 de fuerza o más. Mazo de Commander listo para jugar de la colección Final Fantasy: 100 cartas, 2 de ellas legendarias foil, un sobre de muestra de Collector Booster de 2 cartas, caja para el mazo, guía de estrategia y carta de referencia.", imagen: "items/precon/final-fantasy-cloud/foto.webp" },
    { nombre: "Precon - Duskmourn Jump Scare!", tipo: "Precon", precio: 85, estado: "disponible", destacado: false, moxfield: "", descripcion: "Mazo «Jump Scare!» con Zimone como comandante. Su plan gira en torno a jugar tierras y a sorprender a tus rivales con instantáneos tramposos y criaturas boca abajo (manifestar). Mazo de Commander listo para jugar de Duskmourn: House of Horror: 100 cartas (el comandante y otra legendaria en foil), 10 cartas de Esquema para jugar en modo Archenemy, 10 tokens de doble cara, carta de ayuda, caja para el mazo y un sobre de muestra de Collector Booster de 2 cartas.", imagen: "items/precon/duskmourn-jump-scare/foto.webp" },
    { nombre: "Precon - Duskmourn Death Toll", tipo: "Precon", precio: 85, estado: "disponible", destacado: false, moxfield: "", descripcion: "Mazo «Death Toll» con Winter como comandante. Su plan es llenar el cementerio con distintos tipos de cartas y reanimar monstruos desde ahí (delirio). Mazo de Commander listo para jugar de Duskmourn: House of Horror: 100 cartas (el comandante y otra legendaria en foil), 10 cartas de Esquema para jugar en modo Archenemy, 10 tokens de doble cara, carta de ayuda, caja para el mazo y un sobre de muestra de Collector Booster de 2 cartas.", imagen: "items/precon/duskmourn-death-toll/foto.webp" },
    { nombre: "Folios - Dragon Shield", tipo: "Folios", precio: 25, estado: "disponible", destacado: false, descripcion: "Folios Dragon Shield para guardar tus cartas. Descripción de ejemplo.", imagen: "" },
  ],
};
