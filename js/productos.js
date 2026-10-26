/* ============================================================
   Susurros de Azúcar — datos del sitio
   Editá este archivo para cambiar precios, productos o contacto.
   ============================================================ */

const CONFIG = {
  whatsapp: '5491159566791',        // número internacional, sin + ni espacios
  whatsappVisible: '11 5956 6791',  // cómo se muestra en pantalla
  instagram: 'susurros.azucar23',
  pedidoMinimo: 10000,
  anticipacion: '48 hs'
};

/* Para cada producto, "precios" define qué variantes se ofrecen:
   - un número  → variante disponible con ese precio
   - null       → variante disponible, precio a consultar
   - ausente    → variante no disponible (no se muestra)
   Ej: { comun: 5000, integral: 7000 } = solo común e integral.

   Si un producto se vende en varias cantidades (ej. pepas x12 / x6),
   se usa "opciones": un array con presentacion, etiqueta y precios.
   La primera opción queda seleccionada por defecto. */

const VARIANTES = [
  { id: 'comun',   nombre: 'Común',    nota: '' },
  { id: 'integral', nombre: 'Integral', nota: '' },
  { id: 'sinTacc', nombre: 'Sin TACC', nota: 'Apto celíacos' }
];

const CATEGORIAS = [
  { id: 'dulces',  nombre: 'Dulces',  bajada: 'Para la merienda, el mate y las visitas.' },
  { id: 'salados', nombre: 'Salados', bajada: 'Para resolver la mesa sin pensarlo dos veces.' }
];

const PRODUCTOS = [
  {
    id: 'budines',
    categoria: 'dulces',
    nombre: 'Budines',
    descripcion: 'De vainilla, manzana, marmolado, naranja o limón. Masa húmeda y generosa.',
    presentacion: 'Molde chico',
    precios: { comun: 5000, integral: 7000, sinTacc: 7000 },
    foto: 'assets/productos/budines.webp',
    alt: 'Budines artesanales sobre un plato celeste'
  },
  {
    id: 'pepas',
    categoria: 'dulces',
    nombre: 'Pepas',
    descripcion: 'Masa mantecosa y corazón de dulce de membrillo. Las de siempre.',
    foto: 'assets/productos/pepas.webp',
    alt: 'Pepas de membrillo recién horneadas sobre un plato',
    opciones: [
      {
        id: 'docena',
        etiqueta: 'x12',
        presentacion: 'Docena',
        precios: { comun: 6000, integral: 7500, sinTacc: 7500 }
      },
      {
        id: 'media',
        etiqueta: 'x6',
        presentacion: 'Media docena',
        precios: { comun: 3500, integral: 4000, sinTacc: 4000 }
      }
    ]
  },
  {
    id: 'alfajores',
    categoria: 'dulces',
    nombre: 'Alfajores de maicena',
    descripcion: 'Se deshacen en la boca: dulce de leche y coco rallado.',
    presentacion: '8 unidades',
    precios: { comun: 10000 },
    foto: 'assets/productos/alfajores.webp',
    alt: 'Alfajores de maicena rellenos de dulce de leche'
  },
  {
    id: 'bizcochitos',
    categoria: 'dulces',
    nombre: 'Bizcochitos de grasa',
    descripcion: 'Crocantes, justos de sal y con sabor de panadería de barrio.',
    presentacion: 'Bolsita de 8',
    precios: { comun: 4500 },
    foto: 'assets/productos/bizcochitos.webp',
    alt: 'Bizcochitos de grasa en su bolsita'
  },
  {
    id: 'tartas',
    categoria: 'salados',
    nombre: 'Tartas saladas',
    descripcion: 'De verdura, jamón y queso o humita. Masa fina y relleno generoso.',
    presentacion: 'Entera',
    precios: { comun: 10000, integral: 12000, sinTacc: null },
    foto: 'assets/productos/tartas.webp',
    alt: 'Tarta salada de verdura recién horneada'
  },
  {
    id: 'pasta-frola',
    categoria: 'dulces',
    nombre: 'Pasta frola',
    descripcion: 'Membrillo, batata o mitad y mitad sobre masa quebrada. Clásica, con la medida justa de dulce.',
    presentacion: 'Molde de 20 cm',
    precios: { comun: 12000 },
    foto: 'assets/productos/pasta-frola.webp',
    alt: 'Pasta frola de membrillo con tapa enrejada'
  }
];
