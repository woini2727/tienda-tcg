(function () {
  const T = window.TIENDA;
  const $$ = (s) => document.querySelectorAll(s);
  // ---- Analítica (GA4 / GTM / Clarity) ----
  const A = T.analytics || {};
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const cargar = (src) => { const sc = document.createElement("script"); sc.async = true; sc.src = src; document.head.appendChild(sc); };
  if (A.gtm) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    cargar(`https://www.googletagmanager.com/gtm.js?id=${A.gtm}`);
  } else if (A.ga4) {
    cargar(`https://www.googletagmanager.com/gtag/js?id=${A.ga4}`);
    gtag("js", new Date());
    gtag("config", A.ga4);
  }
  if (A.clarity) {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    cargar(`https://www.clarity.ms/tag/${A.clarity}`);
  }
  // Envía un evento a GA4 (directo) o a GTM (vía dataLayer)
  const track = (evento, params = {}) => {
    try {
      if (A.gtm) window.dataLayer.push({ event: evento, ...params });
      else gtag("event", evento, params);
      if (window.clarity && A.clarity) window.clarity("event", evento);
    } catch (e) {}
  };
  const itemGA = (p) => ({
    item_name: p.nombre,
    item_category: (Array.isArray(p.tipo) ? p.tipo : [p.tipo]).join(" / "),
    price: p.precio == null ? undefined : p.precio,
    currency: "USD",
  });

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
  $$("[data-whatsapp]").forEach((el) => el.addEventListener("click", () => track("consulta_whatsapp", { origen: el.className || "general" })));
  $$("[data-singles-baratas]").forEach((el) => el.addEventListener("click", () => track("ver_singles", { lista: "economicos", origen: el.className })));
  $$("[data-singles-caras]").forEach((el) => el.addEventListener("click", () => track("ver_singles", { lista: "premium", origen: el.className })));

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
  const ars = (usd) => "ARS $" + Math.round(usd * T.cotizacion).toLocaleString("es-AR");
  const precioTxt = (p) => (p.precio == null ? "Consultar precio" : ars(p.precio));
  // ARS como precio principal y USD debajo, más chico
  const precioHTML = (p) =>
    p.precio == null ? "Consultar precio" : `${ars(p.precio)}<span class="price-usd">USD $${p.precio}</span>`;
  const imgHTML = (p) => (p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : `<span>${tiposDe(p)[0]}</span>`);

  function render(tipo) {
    const filtrados = tipo === "Todos" ? T.productos : T.productos.filter((p) => tiposDe(p).includes(tipo));
    // Destacados primero, después el resto y al final los marcados con alFinal (orden de config.js)
    const agotado = (p) => p.estado === "agotado";
    const final = (p) => p.alFinal || agotado(p);
    const lista = [
      ...filtrados.filter((p) => p.destacado && !final(p)),
      ...filtrados.filter((p) => !p.destacado && !final(p)),
      ...filtrados.filter((p) => p.alFinal && !agotado(p)),
      ...filtrados.filter(agotado),
    ];
    catalogo.innerHTML = "";
    filasMostradas = T.filasVisibles || 5;
    lista.forEach((p) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "product" + (p.destacado ? " product--destacado" : "") + (p.estado === "agotado" ? " product--agotado" : "");
      card.setAttribute("aria-label", `Ver detalle de ${p.nombre}`);
      card.innerHTML = `
        <div class="product__img">${imgHTML(p)}</div>
        <div class="product__body">
          <div class="tags">${tagsHTML(p)}</div>
          <h3></h3>
          <p class="product__type"></p>
          <p class="product__price">${precioHTML(p)}</p>
        </div>`;
      card.querySelector("h3").textContent = p.nombre;
      card.querySelector(".product__type").textContent = tiposDe(p).join(" · ");
      card.onclick = () => {
        track("select_item", { item_list_name: tipo, items: [itemGA(p)] });
        abrirModal(p);
      };
      catalogo.appendChild(card);
    });
    limitarFilas();
  }

  // "Ver más": muestra de a N filas según cuántas columnas entran en pantalla
  const verMas = document.getElementById("ver-mas");
  let filasMostradas = T.filasVisibles || 5;
  const columnas = () => getComputedStyle(catalogo).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
  function limitarFilas() {
    const cards = [...catalogo.children];
    const max = columnas() * filasMostradas;
    cards.forEach((c, i) => (c.hidden = i >= max));
    verMas.hidden = cards.length <= max;
  }
  verMas.onclick = () => {
    track("ver_mas_productos", { filas: filasMostradas });
    filasMostradas += T.filasVisibles || 5;
    limitarFilas();
  };
  window.addEventListener("resize", limitarFilas);

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
    $("modal-price").innerHTML = precioHTML(p);
    const desc = $("modal-desc");
    const more = $("modal-more");
    desc.textContent = p.descripcion || "";
    desc.classList.add("is-clamped");
    more.setAttribute("aria-expanded", "false");
    more.innerHTML = 'Ver más <span aria-hidden="true">▾</span>';
    const mox = $("modal-moxfield");
    mox.hidden = !p.moxfield;
    if (p.moxfield) {
      mox.href = p.moxfield;
      const sitio = /moxfield\.com/.test(p.moxfield) ? " en Moxfield" : /secretlair\.wizards\.com/.test(p.moxfield) ? " en Secret Lair" : /mtggoldfish\.com/.test(p.moxfield) ? " en MTGGoldfish" : /magic\.wizards\.com/.test(p.moxfield) ? " en Wizards" : "";
      mox.textContent = `Ver lista del mazo${sitio} ↗`;
    }
    const cta = $("modal-cta");
    const agotado = p.estado === "agotado";
    cta.textContent = agotado ? "Avisame si vuelve" : "Consultar por WhatsApp";
    cta.classList.toggle("btn--disabled", agotado);
    cta.href = wa(agotado ? `Hola! Avisame si vuelve: ${p.nombre}` : `Hola! Quería consultar por: ${p.nombre}` + (p.precio == null ? "" : ` (${ars(p.precio)} / USD $${p.precio})`));
    track("view_item", { currency: "USD", value: p.precio || 0, items: [itemGA(p)] });
    cta.onclick = () => track(agotado ? "avisame_si_vuelve" : "consulta_whatsapp", { currency: "USD", value: p.precio || 0, items: [itemGA(p)], producto: p.nombre });
    mox.onclick = () => track("ver_lista_mazo", { producto: p.nombre, destino: p.moxfield });
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
      track("filtro_categoria", { categoria: t });
      filtros.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active");
      render(t);
    };
    filtros.appendChild(b);
  });
  render("Todos");

  // Switch de tema claro / oscuro
  const sw = document.querySelector(".theme-switch");
  const aplicarTema = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    sw.setAttribute("aria-checked", String(t === "light"));
    sw.setAttribute("aria-label", t === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
  };
  aplicarTema(document.documentElement.getAttribute("data-theme") || "dark");
  sw.onclick = () => {
    const t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    aplicarTema(t);
    try { localStorage.setItem("tema", t); } catch (e) {}
  };

  // Menú mobile
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  toggle.onclick = () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  };
  links.querySelectorAll("a").forEach((a) => (a.onclick = () => links.classList.remove("is-open")));
})();
