(function () {
  const T = window.TIENDA;
  const $$ = (s) => document.querySelectorAll(s);
  const wa = (msg) => `https://wa.me/${T.whatsapp}?text=${encodeURIComponent(msg)}`;

  // Textos generales
  document.title = T.nombre;
  $$("[data-nombre]").forEach((el) => (el.textContent = T.nombre));
  $$("[data-tagline]").forEach((el) => (el.textContent = T.tagline));
  $$("[data-subtitulo]").forEach((el) => (el.textContent = T.subtitulo));
  $$("[data-descripcion]").forEach((el) => (el.textContent = T.descripcion));
  $$("[data-zona]").forEach((el) => (el.textContent = T.zonaRetiro));
  $$("[data-usdt]").forEach((el) => (el.textContent = T.descuentoUSDT));
  $$("[data-instagram]").forEach((el) => (el.href = `https://instagram.com/${T.instagram}`));
  $$("[data-singles-baratas]").forEach((el) => (el.href = T.singles.baratas));
  $$("[data-singles-caras]").forEach((el) => (el.href = T.singles.caras));
  $$("[data-instagram-handle]").forEach((el) => (el.textContent = "@" + T.instagram));
  $$("[data-whatsapp]").forEach((el) => (el.href = wa(`Hola ${T.nombre}! Quería hacer una consulta.`)));

  // Catálogo
  const estados = { disponible: "Disponible", preventa: "Preventa", agotado: "Agotado" };
  const catalogo = document.getElementById("catalogo");
  const filtros = document.querySelector(".filters");
  const tipos = ["Todos", ...new Set(T.productos.map((p) => p.tipo))];

  function render(tipo) {
    const lista = tipo === "Todos" ? T.productos : T.productos.filter((p) => p.tipo === tipo);
    catalogo.innerHTML = "";
    lista.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product" + (p.destacado ? " product--destacado" : "");
      const agotado = p.estado === "agotado";
      card.innerHTML = `
        <div class="product__img">${p.imagen ? `<img src="${p.imagen}" alt="" loading="lazy">` : `<span>${p.tipo}</span>`}</div>
        <div class="product__body">
          <div class="tags">
            ${p.destacado ? '<span class="tag tag--destacado">★ Destacado</span>' : ""}
            <span class="tag tag--${p.estado}">${estados[p.estado] || p.estado}</span>
          </div>
          <h3></h3>
          <p class="product__type"></p>
          <p class="product__price">USD ${p.precio}</p>
          ${p.promo ? '<p class="product__promo">Participa de la promo por cantidad</p>' : ""}
          <a class="btn btn--primary btn--block ${agotado ? "btn--disabled" : ""}" target="_blank" rel="noopener"
             href="${wa(`Hola! Quería consultar por: ${p.nombre} (USD ${p.precio})`)}">${agotado ? "Avisame si vuelve" : "Consultar"}</a>
        </div>`;
      card.querySelector("h3").textContent = p.nombre;
      card.querySelector(".product__type").textContent = p.tipo;
      catalogo.appendChild(card);
    });
  }

  tipos.forEach((t, i) => {
    const b = document.createElement("button");
    b.textContent = t;
    b.className = "chip" + (i === 0 ? " is-active" : "");
    b.onclick = () => {
      filtros.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active");
      render(t);
    };
    filtros.appendChild(b);
  });
  render("Todos");

  // Promo
  const d = T.promo.descuentoPorCajaExtra;
  document.getElementById("promo-texto").textContent =
    `Por cada caja adicional a partir de la primera, descontamos USD ${d} del total. Podés combinar ediciones. Válido solo para Play Booster Boxes.`;
  document.getElementById("usdt-titulo").textContent = `Pagando con USDT: ${T.descuentoUSDT}% OFF extra`;
  const tbody = document.querySelector("#promo-tabla tbody");
  for (let n = 1; n <= T.promo.maxCajasTabla; n++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${n} ${n === 1 ? "caja" : "cajas"}</td><td>${n === 1 ? "Precio de lista" : `− USD ${(n - 1) * d}`}</td>`;
    tbody.appendChild(tr);
  }

  // Menú mobile
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  toggle.onclick = () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  };
  links.querySelectorAll("a").forEach((a) => (a.onclick = () => links.classList.remove("is-open")));
})();
