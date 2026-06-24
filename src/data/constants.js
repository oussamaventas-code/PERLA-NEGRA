/**
 * Constantes globales del estudio.
 * Cambia aquí y se propaga a toda la app.
 */

export const STUDIO = {
  name:        'Perla Negra Tattoo',
  phone:       '648750092',        // sin prefijo
  phoneE164:   '+34648750092',     // formato E.164
  phoneDisplay:'648 75 00 92',
  whatsapp:    '34648750092',      // para wa.me
  instagram:   'https://www.instagram.com/perlanegramurcia/',
  googleMaps:  'https://www.google.com/maps/search/?api=1&query=Perla+Negra+Tattoo+Molina+de+Segura',
  address: {
    street:   'Calle Profesor Joaquín Abellán',
    zip:      '30500',
    city:     'Molina de Segura',
    region:   'Murcia',
    country:  'ES',
  },
  hours: [
    { days: 'Lunes a Viernes', slots: ['11:30 – 14:00', '16:30 – 20:00'] },
  ],
  stats: {
    followers: '+33.9K',
    rating:    '4.8',
    reviews:   '+215',
  },
};

export const WHATSAPP_URL = (text = '') =>
  `https://wa.me/${STUDIO.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
