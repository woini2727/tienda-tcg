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
- Se optimiza a `foto.webp`: fondo transparente, lienzo cuadrado, hasta 1000 px, calidad 85.
- En `config.js`, el campo `imagen` apunta a `items/<tipo>/<producto>/foto.webp`.

## Descripciones

El texto de `descripcion.md` es el mismo que va en el campo `descripcion` de `config.js`.
