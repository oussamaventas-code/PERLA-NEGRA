// Analytics utility — GA4 event tracking
// Replace G-XXXXXXXXXX with your real GA4 Measurement ID in index.html

/**
 * Track a WhatsApp conversion click
 * @param {string} source - where the click originated (e.g. 'booking_form', 'navbar', 'hero', 'footer')
 */
export function trackWhatsAppClick(source = 'unknown') {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'conversion',
      event_label: source,
    });
  }
}

/**
 * Track an Instagram link click
 */
export function trackInstagramClick(source = 'unknown') {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'instagram_click', {
      event_category: 'social',
      event_label: source,
    });
  }
}
