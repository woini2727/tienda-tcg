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
  const estados = { disponible: "Disponible", preventa: "Preventa", agotado: "Agotado", "como-nuevo": "Como nuevo" };
  const catalogo = document.getElementById("catalogo");
  const filtros = document.querySelector(".filters");
  const tiposDe = (p) => (Array.isArray(p.tipo) ? p.tipo : [p.tipo]);
  const usadas = new Set(T.productos.flatMap(tiposDe));
  const orden = (T.categorias || []).filter((c) => usadas.has(c));
  const tipos = ["Todos", ...orden, ...[...usadas].filter((c) => !orden.includes(c))];

  const tagsHTML = (p) =>
    (p.destacado ? '<span class="tag tag--destacado">★ Destacado</span>' : "") +
    `<span class="tag tag--${p.estado}">${estados[p.estado] || p.estado}</span>`;
  const precioTxt = (p) => (p.precio == null ? "Consultar precio" : `USD ${p.precio}`);
  const imgHTML = (p) => (p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : `<span>${tiposDe(p)[0]}</span>`);

  function render(tipo) {
    const filtrados = tipo === "Todos" ? T.productos : T.productos.filter((p) => tiposDe(p).includes(tipo));
    // Destacados primero, después el resto y al final los marcados con alFinal (orden de config.js)
    const lista = [
      ...filtrados.filter((p) => p.destacado && !p.alFinal),
      ...filtrados.filter((p) => !p.destacado && !p.alFinal),
      ...filtrados.filter((p) => p.alFinal),
    ];
    catalogo.innerHTML = "";
    lista.forEach((p) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "product" + (p.destacado ? " product--destacado" : "");
      card.setAttribute("aria-label", `Ver detalle de ${p.nombre}`);
      card.innerHTML = `
        <div class="product__img">${imgHTML(p)}</div>
        <div class="product__body">
          <div class="tags">${tagsHTML(p)}</div>
          <h3></h3>
          <p class="product__type"></p>
          <p class="product__price">${precioTxt(p)}</p>
        </div>`;
      card.querySelector("h3").textContent = p.nombre;
      card.querySelector(".product__type").textContent = tiposDe(p).join(" · ");
      card.onclick = () => abrirModal(p);
      catalogo.appendChild(card);
    });
  }

  // Modal de detalle
  const modal = document.getElementById("modal");
  const $ = (id) => document.getElementById(id);
  let ultimoFoco = null;

  function abrirModal(p) {
    ultimoFoco = document.activeElement;
    $("modal-type").textContent = tiposDe(p).join(" · ");
    $("modal-title").textContent = p.nombre;
    $("modal-tags").innerHTML = tagsHTML(p);
    $("modal-img").innerHTML = imgHTML(p);
    $("modal-price").textContent = precioTxt(p);
    const desc = $("modal-desc");
    const more = $("modal-more");
    desc.textContent = p.descripcion || "";
    desc.classList.add("is-clamped");
    more.setAttribute("aria-expanded", "false");
    more.innerHTML = 'Ver más <span aria-hidden="true">▾</span>';
    const mox = $("modal-moxfield");
    mox.hidden = !p.moxfield;
    if (p.moxfield) mox.href = p.moxfield;
    const cta = $("modal-cta");
    const agotado = p.estado === "agotado";
    cta.textContent = agotado ? "Avisame si vuelve" : "Consultar por WhatsApp";
    cta.classList.toggle("btn--disabled", agotado);
    cta.href = wa(agotado ? `Hola! Avisame si vuelve: ${p.nombre}` : `Hola! Quería consultar por: ${p.nombre}` + (p.precio == null ? "" : ` (USD ${p.precio})`));
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    // Mostrar "Ver más" solo si el texto supera las 3 líneas
    more.hidden = desc.scrollHeight <= desc.clientHeight + 1;
    modal.querySelector(".modal__close").focus();
  }

  $("modal-more").onclick = () => {
    const desc = $("modal-desc");
    const more = $("modal-more");
    const abierto = desc.classList.toggle("is-clamped") === false;
    more.setAttribute("aria-expanded", String(abierto));
    more.innerHTML = abierto ? 'Ver menos <span aria-hidden="true">▴</span>' : 'Ver más <span aria-hidden="true">▾</span>';
  };

  function cerrarModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (ultimoFoco) ultimoFoco.focus();
  }

  modal.querySelectorAll("[data-close]").forEach((el) => (el.onclick = cerrarModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) cerrarModal();
  });

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

  // Menú mobile
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  toggle.onclick = () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  };
  links.querySelectorAll("a").forEach((a) => (a.onclick = () => links.classList.remove("is-open")));
})();
