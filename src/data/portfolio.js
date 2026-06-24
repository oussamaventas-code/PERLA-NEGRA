/**
 * Datos del portfolio — separa contenido de UI.
 * Para añadir o quitar piezas edita solo este archivo.
 */

export const CATEGORIES = [
  { id: 'all',       label: 'Todos' },
  { id: 'famosos',   label: 'Famosos' },
  { id: 'realismo',  label: 'Realismo' },
  { id: 'color',     label: 'Color' },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: '/portfolio/photo_1_2026-06-24_21-33-22.jpg',
    artist: 'Juande Gambín',
    category: 'famosos',
    title: 'James Rodríguez',
  },
  {
    id: 2,
    image: '/portfolio/photo_2_2026-06-24_21-33-22.jpg',
    artist: 'Juande Gambín',
    category: 'famosos',
    title: 'Nicky Jam',
  },
  {
    id: 3,
    image: '/portfolio/photo_4_2026-06-24_21-33-22.jpg',
    artist: 'Kore',
    category: 'realismo',
    title: 'Retrato Hiperrealista',
  },
  {
    id: 4,
    image: '/portfolio/photo_5_2026-06-24_21-33-22.jpg',
    artist: 'Kore',
    category: 'realismo',
    title: 'Guardianes',
  },
  {
    id: 5,
    image: '/portfolio/photo_3_2026-06-24_21-33-22.jpg',
    artist: 'Pablo',
    category: 'color',
    title: 'Dama Tradicional',
  },
];
