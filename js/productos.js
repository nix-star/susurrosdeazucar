/* ============================================================
   Susurros de Azúcar — datos del sitio
   Editá este archivo para cambiar precios, productos o contacto.
   ============================================================ */

const CONFIG = {
  whatsapp: '5491159566791',        // número internacional, sin + ni espacios
  whatsappVisible: '11 5956 6791',  // cómo se muestra en pantalla
  instagram: 'susurros.azucar23',
  pedidoMinimo: 10000,
  anticipacion: '48 hs',
  // Recargos por tipo de harina (0.10 = +10%)
  recargos: {
    comun: 0,
    integral: 0.10,
    sinTacc: 0.20
  }
};

const VARIANTES = [
  { id: 'comun',   nombre: 'Común',    nota: '' },
  { id: 'integral', nombre: 'Integral', nota: 'Incluye recargo por harina integral' },
  { id: 'sinTacc', nombre: 'Sin TACC', nota: 'Incluye recargo sin TACC · apto celíacos' }
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
    descripcion: 'De limón, vainilla o chocolate. Masa húmeda, molde grande para compartir.',
    presentacion: 'Molde grande',
    precio: 8500,
    foto: 'assets/productos/budines.webp',
    alt: 'Budín de chocolate con baño de ganache'
  },
  {
    id: 'pepas',
    categoria: 'dulces',
    nombre: 'Pepas',
    descripcion: 'Masa mantecosa y corazón de dulce de membrillo. Las de siempre.',
    presentacion: 'Por seis',
    precio: 4500,
    foto: 'assets/productos/pepas.webp',
    alt: 'Pepas de membrillo recién horneadas'
  },
  {
    id: 'alfajores',
    categoria: 'dulces',
    nombre: 'Alfajores de maicena',
    descripcion: 'Se deshacen en la boca: dulce de leche y coco rallado.',
    presentacion: 'Por seis',
    precio: 5000,
    foto: 'assets/productos/alfajores.webp',
    alt: 'Alfajores de maicena rellenos de dulce de leche'
  },
  {
    id: 'bizcochos',
    categoria: 'dulces',
    nombre: 'Bizcochos',
    descripcion: 'De manteca o de grasa, crocantes y justos de sal. Para el mate de todos los días.',
    presentacion: '500 g',
    precio: 6000,
    foto: 'assets/productos/bizcochos.webp',
    alt: 'Bizcochos artesanales en una bandeja'
  },
  {
    id: 'pasta-frola',
    categoria: 'dulces',
    nombre: 'Pasta frola',
    descripcion: 'Membrillo o batata sobre masa quebrada. Clásica, con la medida justa de dulce.',
    presentacion: 'Molde de 20 cm',
    precio: 7500,
    foto: 'assets/productos/pasta-frola.webp',
    alt: 'Pasta frola con trama de masa y relleno de frutas'
  },
  {
    id: 'tartas',
    categoria: 'salados',
    nombre: 'Tartas saladas',
    descripcion: 'De verdura, jamón y queso o humita. Masa fina y relleno generoso.',
    presentacion: 'Entera, para cuatro',
    precio: 9000,
    foto: 'assets/productos/tartas.webp',
    alt: 'Tarta salada de verdura y tomate'
  }
];
