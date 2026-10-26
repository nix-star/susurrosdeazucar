# Susurros de Azúcar — Landing page

Prototipo de landing de una página para **Susurros de Azúcar · Panadería & Repostería Artesanal**.
Sitio estático (HTML + CSS + JavaScript), sin dependencias ni build. Funciona abriendo `index.html`.

---

## Cómo verlo

**Opción 1 — doble clic**
Abrí `index.html` con el navegador. Las tipografías están embebidas en el CSS, así que se ve igual sin conexión.

**Opción 2 — servidor local** (recomendado para probar en el celular)

```bash
cd susurros-de-azucar
python3 -m http.server 8000
```

Y entrá a `http://localhost:8000`.

---

## Estructura

```
susurros-de-azucar/
├── index.html            Estructura y textos de la página
├── css/
│   ├── fuentes.css       Tipografías embebidas (base64)
│   └── styles.css        Todos los estilos, colores y responsive
├── js/
│   ├── productos.js      ⚙️ Datos: precios, productos, WhatsApp
│   └── main.js           Render de tarjetas, precios y menú
└── assets/
    ├── logo/             Logo original, versiones web, favicon y OG
    ├── fondo/            Fotos de fondo y patrón decorativo
    ├── productos/        Fotos de productos
    └── fonts/            Archivos de tipografía originales
```

---

## Cambiar precios y productos

Todo se edita en **`js/productos.js`**.

```js
const PRODUCTOS = [
  {
    id: 'budines',
    categoria: 'dulces',           // 'dulces' o 'salados'
    nombre: 'Budines',
    descripcion: 'De vainilla, manzana, marmolado...',
    presentacion: 'Molde chico',
    precios: { comun: 5000, integral: 7000, sinTacc: 7000 },
    foto: 'assets/productos/budines.webp',
    alt: 'Budines artesanales sobre un plato celeste'
  },
  // ...
];
```

Cada producto define **el precio de cada variante de harina** en `precios`:

| Valor | Qué significa |
|---|---|
| un número (`7000`) | variante disponible a ese precio |
| `null` | variante disponible, precio **a consultar** |
| ausente | variante **no disponible** (no se muestra el botón) |

Ejemplos:

```js
precios: { comun: 5000, integral: 7000, sinTacc: 7000 }  // las tres opciones
precios: { comun: 10000 }                                 // solo común (sin botones)
precios: { comun: 10000, integral: 12000, sinTacc: null } // sin TACC a consultar
```

Si un producto tiene una sola variante, los botones de harina no se muestran.
El botón de WhatsApp arma el mensaje con producto, presentación, harina y precio
(o pide consultar cuando el precio es `null`). No hay carrito.

> Para agregar un producto, copiá un bloque, cambiá el `id` (único) y la `categoria`.

### Productos con varias cantidades (pepas x12 / x6)

Cuando el mismo producto se vende en distintas presentaciones, se usa `opciones`
en lugar de `precios`. La primera opción queda seleccionada por defecto y el
selector aparece al lado del nombre:

```js
{
  id: 'pepas',
  nombre: 'Pepas',
  descripcion: 'Masa mantecosa y corazón de dulce de membrillo. Las de siempre.',
  foto: 'assets/productos/pepas.webp',
  opciones: [
    { id: 'docena', etiqueta: 'x12', presentacion: 'Docena',
      precios: { comun: 6000, integral: 7500, sinTacc: 7500 } },
    { id: 'media',  etiqueta: 'x6',  presentacion: 'Media docena',
      precios: { comun: 3500, integral: 4000, sinTacc: 4000 } }
  ]
}
```

Al cambiar de cantidad se actualizan precio, presentación y link de WhatsApp.
La harina elegida se conserva si la nueva opción también la ofrece.

### Cambiar el contacto

```js
const CONFIG = {
  whatsapp: '5491159566791',        // ← número internacional, sin + ni espacios
  whatsappVisible: '11 5956 6791',  // ← cómo se muestra
  instagram: 'susurros.azucar23',
  pedidoMinimo: 10000,
  anticipacion: '48 hs'
};
```

El número de WhatsApp, el Instagram, el pedido mínimo y la anticipación se actualizan en toda la página automáticamente.

---

## Cambiar las fotos

Reemplazá el archivo manteniendo **el mismo nombre** y no hay que tocar código:

| Archivo | Producto |
|---|---|
| `assets/productos/budines.webp` | Budines |
| `assets/productos/pepas.webp` | Pepas (x12 y x6) |
| `assets/productos/alfajores.webp` | Alfajores de maicena |
| `assets/productos/bizcochitos.webp` | Bizcochitos de grasa |
| `assets/productos/pasta-frola.webp` | Pasta frola |
| `assets/productos/tartas.webp` | Tartas saladas |

**Recomendación:** 900 × 1125 px (proporción 4:5), formato `.webp` o `.jpg`, menos de 200 KB.
Si usás `.jpg`, cambiá también la extensión en `js/productos.js`.
Las fotos se recortan solas al centro del contenedor (`object-fit: cover`).

Fotos de fondo: `assets/fondo/hero.webp`, `harinas.webp`, `nosotros.webp`, `contacto.webp`.

> Las fotos de budines, pepas, bizcochitos y tartas son las que envió la marca
> (recortadas a 4:5 para sacar los textos promocionales).
> **Alfajores sigue con foto de ejemplo (Unsplash)**.
> La pasta frola usa una foto real de **Raulete_CM** (Flickr, CC BY-SA 2.0),
> recortada a 4:5; el crédito está en el footer. Reemplazala por una propia
> cuando la tengas y borrá esa línea del footer.

---

## Logo y redes sociales

- `assets/logo/logo-original.jpeg` — archivo original recibido.
- `assets/logo/logo-hero.webp` — logo recortado y con fondo transparente (hero).
- `assets/logo/logo-wordmark.webp` — solo la tipografía (header y footer).
- `assets/logo/favicon.png` — ícono de pestaña.
- `assets/logo/og-image.png` — imagen que aparece al compartir el link (1200 × 630).

---

## Publicar gratis

**Netlify** (lo más simple): entrá a [netlify.com/drop](https://app.netlify.com/drop) y arrastrá la carpeta `susurros-de-azucar`. Queda online en segundos.

**Vercel / GitHub Pages**: subís la carpeta a un repositorio y la conectás. No hace falta configuración especial: es un sitio estático.

Cuando tengas dominio propio (ej. `susurrosdeazucar.com.ar`), se conecta desde el panel del hosting.

---

## Pendientes para la versión final

- [x] Precios reales y presentaciones.
- [x] Fotos propias de budines, pepas, bizcochitos y tartas.
- [x] Precio de pasta frola ($12.000, solo común).
- [ ] Fotos propias de alfajores y pasta frola (hoy son de ejemplo).
- [ ] Precio de la tarta sin TACC (figura como “Consultar”).
- [ ] Logo en alta resolución (SVG o PNG 2000 px).
- [ ] Zona de envío y costo.
- [ ] Confirmar si los alfajores de maicena son sin TACC de por sí.
- [ ] Reemplazar la URL relativa de Open Graph por la definitiva al publicar.

---

## Notas técnicas

- Sin frameworks ni dependencias: solo 3 archivos propios (`index.html`, `styles.css`, `main.js`) + datos.
- Las tipografías son **Great Vibes**, **Cormorant Garamond** y **Karla** (Google Fonts, licencia OFL), embebidas para que el sitio funcione sin internet.
- Accesibilidad: contraste, foco visible, `aria-pressed` en los selectores de harina, `aria-live` en el precio y respeto por `prefers-reduced-motion`.
- Responsive probado en 390 px y 1440 px, sin scroll horizontal.
