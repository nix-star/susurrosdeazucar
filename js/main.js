/* ============================================================
   Susurros de Azúcar — interacciones
   ============================================================ */

(function () {
  'use strict';

  /* ---------- utilidades ---------- */

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const dinero = (valor) =>
    '$' + Math.round(valor).toLocaleString('es-AR', { maximumFractionDigits: 0 });

  const precioConHarina = (precio, variante) =>
    Math.round((precio * (1 + (CONFIG.recargos[variante] || 0))) / 50) * 50;

  const linkWhatsApp = (mensaje) =>
    'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(mensaje);

  const linkInstagram = () =>
    'https://instagram.com/' + CONFIG.instagram;

  /* ---------- datos de contacto en el HTML ---------- */

  function volcarConfig() {
    $$('[data-wa]').forEach((el) => {
      el.href = linkWhatsApp(el.dataset.wa || 'Hola! Quiero hacer un pedido.');
      el.target = '_blank';
      el.rel = 'noopener';
    });

    $$('[data-ig]').forEach((el) => {
      el.href = linkInstagram();
      el.target = '_blank';
      el.rel = 'noopener';
    });

    $$('[data-texto="whatsapp"]').forEach((el) => {
      el.textContent = CONFIG.whatsappVisible;
    });

    $$('[data-texto="instagram"]').forEach((el) => {
      el.textContent = '@' + CONFIG.instagram;
    });

    $$('[data-texto="minimo"]').forEach((el) => {
      el.textContent = dinero(CONFIG.pedidoMinimo);
    });

    $$('[data-texto="anticipacion"]').forEach((el) => {
      el.textContent = CONFIG.anticipacion;
    });

    $$('[data-anio]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- render de productos ---------- */

  function crearChip(variante, activo) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'chip';
    boton.dataset.variante = variante.id;
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
    boton.textContent = variante.nombre;
    return boton;
  }

  function crearTarjeta(producto, indice) {
    const articulo = document.createElement('article');
    articulo.className = 'card reveal';
    articulo.style.transitionDelay = (indice % 3) * 80 + 'ms';
    articulo.dataset.precio = producto.precio;
    articulo.dataset.nombre = producto.nombre;
    articulo.dataset.presentacion = producto.presentacion;

    const figura = document.createElement('figure');
    figura.className = 'card-media';
    const img = document.createElement('img');
    img.src = producto.foto;
    img.alt = producto.alt;
    img.loading = 'lazy';
    img.width = 900;
    img.height = 1125;
    figura.appendChild(img);

    const cuerpo = document.createElement('div');
    cuerpo.className = 'card-body';

    const titulo = document.createElement('h3');
    titulo.className = 'card-nombre';
    titulo.textContent = producto.nombre;

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = producto.descripcion;

    const fila = document.createElement('div');
    fila.className = 'card-precio-fila';

    const precio = document.createElement('span');
    precio.className = 'card-precio';
    precio.setAttribute('aria-live', 'polite');
    precio.textContent = dinero(precioConHarina(producto.precio, 'comun'));

    const pres = document.createElement('span');
    pres.className = 'card-presentacion';
    pres.textContent = producto.presentacion;

    fila.append(precio, pres);

    const chips = document.createElement('div');
    chips.className = 'chips';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', 'Tipo de harina para ' + producto.nombre);
    VARIANTES.forEach((v, i) => chips.appendChild(crearChip(v, i === 0)));

    const nota = document.createElement('p');
    nota.className = 'card-nota';
    nota.hidden = true;

    const cta = document.createElement('a');
    cta.className = 'card-cta';
    cta.href = linkWhatsApp('Hola! Quiero pedir ' + producto.nombre + '.');
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.innerHTML =
      '<span>Pedir por WhatsApp</span>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">' +
      '<path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';

    cuerpo.append(titulo, desc, fila, chips, nota, cta);
    articulo.append(figura, cuerpo);

    /* interacción de variantes */
    articulo.addEventListener('click', (evento) => {
      const chip = evento.target.closest('.chip');
      if (!chip) return;

      const valor = precioConHarina(producto.precio, chip.dataset.variante);
      const variante = VARIANTES.find((v) => v.id === chip.dataset.variante);

      $$('.chip', chips).forEach((c) =>
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false')
      );

      precio.textContent = dinero(valor);
      precio.classList.remove('precio-pulso');
      void precio.offsetWidth;
      precio.classList.add('precio-pulso');

      if (variante.nota) {
        nota.textContent = variante.nota;
        nota.hidden = false;
      } else {
        nota.hidden = true;
      }

      cta.href = linkWhatsApp(
        'Hola! Quiero pedir ' + producto.nombre +
        ' (' + variante.nombre + ') — ' + dinero(valor) +
        ', ' + producto.presentacion.toLowerCase() + '. ¿Tienen disponibilidad?'
      );
    });

    return articulo;
  }

  function renderProductos() {
    const contenedor = $('#lista-productos');
    if (!contenedor) return;

    CATEGORIAS.forEach((categoria) => {
      const productos = PRODUCTOS.filter((p) => p.categoria === categoria.id);
      if (!productos.length) return;

      const grupo = document.createElement('section');
      grupo.className = 'grupo-productos';
      grupo.id = categoria.id;

      const encabezado = document.createElement('div');
      encabezado.className = 'grupo-head reveal';
      encabezado.innerHTML =
        '<h3 class="grupo-titulo">' + categoria.nombre + '</h3>' +
        '<p class="grupo-bajada">' + categoria.bajada + '</p>';

      const grilla = document.createElement('div');
      grilla.className = 'grid-productos' + (productos.length === 1 ? ' grid-productos--solo' : '');
      productos.forEach((p, i) => grilla.appendChild(crearTarjeta(p, i)));

      grupo.append(encabezado, grilla);
      contenedor.appendChild(grupo);
    });
  }

  /* ---------- menú mobile ---------- */

  function iniciarMenu() {
    const boton = $('#menu-btn');
    const panel = $('#menu');
    if (!boton || !panel) return;

    const cerrar = () => {
      document.body.classList.remove('menu-abierto');
      boton.setAttribute('aria-expanded', 'false');
    };

    boton.addEventListener('click', () => {
      const abierto = document.body.classList.toggle('menu-abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    $$('a', panel).forEach((a) => a.addEventListener('click', cerrar));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrar();
    });
  }

  /* ---------- header con sombra ---------- */

  function iniciarHeader() {
    const header = $('.site-header');
    if (!header) return;
    const revisar = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    revisar();
    window.addEventListener('scroll', revisar, { passive: true });
  }

  /* ---------- aparición al scrollear ---------- */

  function iniciarReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((el) => observador.observe(el));
  }

  /* ---------- arranque ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    volcarConfig();
    renderProductos();
    iniciarMenu();
    iniciarHeader();
    iniciarReveal();
  });
})();
