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
│   ├── productos.js      ⚙️ Datos: precios, productos, WhatsApp, recargos
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
    descripcion: 'De limón, vainilla o chocolate...',
    presentacion: 'Molde grande',
    precio: 8500,                  // precio con harina común
    foto: 'assets/productos/budines.webp',
    alt: 'Budín de chocolate con baño de ganache'
  },
  // ...
];
```

Los precios de **integral** y **sin TACC** se calculan solos con los recargos de `CONFIG`:

```js
recargos: { comun: 0, integral: 0.10, sinTacc: 0.20 }
```

Ese `0.20` es +20 %. Para que integral y sin TACC salgan al mismo precio, igualá los valores.

> El resultado se redondea a múltiplos de 50 para que los precios queden lindos ($10.200, $8.500, etc.).

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
| `assets/productos/pepas.webp` | Pepas |
| `assets/productos/alfajores.webp` | Alfajores de maicena |
| `assets/productos/bizcochos.webp` | Bizcochos |
| `assets/productos/pasta-frola.webp` | Pasta frola |
| `assets/productos/tartas.webp` | Tartas saladas |

**Recomendación:** 900 × 1125 px (proporción 4:5), formato `.webp` o `.jpg`, menos de 200 KB.
Si usás `.jpg`, cambiá también la extensión en `js/productos.js`.

Fotos de fondo: `assets/fondo/hero.webp`, `harinas.webp`, `nosotros.webp`, `contacto.webp`.

> ⚠️ Las fotos actuales de productos y fondos son **de ejemplo (Unsplash)** y están para reemplazar.

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

- [ ] Precios reales y presentaciones (por docena, por kilo, molde chico/grande).
- [ ] Fotos propias de cada producto.
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
