# Tienda TCG

Sitio estático (HTML + CSS + JS, sin dependencias) para vender productos sellados de juegos de cartas coleccionables, con consultas por WhatsApp.

## Secciones

- Hero con llamadas a la acción
- Catálogo con filtros por tipo y botón “Consultar” (abre WhatsApp con el producto cargado)
- Promo por cantidad + descuento por USDT
- Cómo comprar (pasos, envíos y medios de pago)
- Preguntas frecuentes
- Contacto

## Personalizar

Todo se edita en **`config.js`**: nombre de la tienda, número de WhatsApp, usuario de Instagram, descuentos, zona de retiro y el catálogo de productos.

Para agregar fotos a los productos, subilas a una carpeta `img/` y poné la ruta en `imagen` (ej: `"img/caja-a.jpg"`).

## Ver en local

Abrí `index.html` en el navegador.

## Publicar con GitHub Pages

1. En el repo: **Settings → Pages**
2. Source: **Deploy from a branch** → branch `main`, carpeta `/ (root)`
3. Guardá. En un par de minutos queda en `https://woini2727.github.io/tienda-tcg/`
