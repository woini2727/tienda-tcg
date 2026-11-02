# Items

Una carpeta por producto, agrupadas por tipo:

```
items/
  play-booster-box/
    the-hobbit/
      descripcion.md   ← texto del detalle del producto
      foto.webp        ← foto optimizada que usa el sitio
```

## Fotos

- Dejá la foto original (cualquier tamaño o formato) en la carpeta del producto.
- Se optimiza a `foto.webp`: se recorta el fondo y se centra en un lienzo de 1200 × 900 px (4:3), ocupando hasta el 90% del alto o del ancho, para que todos los productos se vean del mismo tamaño.
- En `config.js`, el campo `imagen` apunta a `items/<tipo>/<producto>/foto.webp`.

## Descripciones

El texto de `descripcion.md` es el mismo que va en el campo `descripcion` de `config.js`.
