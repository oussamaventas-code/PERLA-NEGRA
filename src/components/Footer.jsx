import { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import LegalModal from './LegalModal';
import { trackInstagramClick, trackWhatsAppClick } from '../utils/analytics';

// Inline Instagram SVG
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(null); // null | 'aviso' | 'privacidad'

  return (
    <footer className="bg-[#000000] text-marfil px-8 md:px-24 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-champagne/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        {/* Logo and Status */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-2 text-gradient-gold">
              Perla Negra
            </div>
            <div className="text-sm tracking-[0.5em] text-marfil/50 uppercase">
              Tattoo Studio
            </div>
          </div>
          <div className="mt-24 flex items-center gap-3 text-xs font-mono text-marfil/40">
            <div className="w-2 h-2 rounded-full bg-champagne animate-pulse shadow-[0_0_10px_rgba(201,168,76,0.8)]"></div>
            AGENDA ABIERTA
          </div>
        </div>

        {/* Address + Maps */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-marfil/40 mb-6 font-mono">Ubicación</h4>
          <p className="text-sm font-light leading-relaxed text-marfil/80">
            Calle Profesor Joaquín Abellán<br />
            30500<br />
            Molina de Segura<br />
            Murcia
          </p>
          {/* Google Maps embed */}
          <div className="mt-6 rounded-xl overflow-hidden border border-white/5">
            <iframe
              title="Ubicación Perla Negra Tattoo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.5!2d-1.2073!3d38.0645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6505b6b6b6b6b6%3A0x0!2sCalle%20Profesor%20Joaqu%C3%ADn%20Abell%C3%A1n%2C%2030500%20Molina%20de%20Segura%2C%20Murcia!5e0!3m2!1ses!2ses!4v1000000000000"
              width="100%"
              height="140"
              style={{ border: 0, filter: 'grayscale(1) invert(0.85) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Perla+Negra+Tattoo%2C+Calle+Profesor+Joaqu%C3%ADn+Abell%C3%A1n%2C+30500+Molina+de+Segura%2C+Murcia"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-champagne/70 hover:text-champagne transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            Cómo llegar →
          </a>
          <div className="mt-10">
            <h4 className="text-xs uppercase tracking-widest text-marfil/40 mb-4 font-mono">Contacto</h4>
            <a href="tel:+34648750092" className="text-lg font-mono text-champagne hover:text-white transition-colors cursor-pointer">
              648 75 00 92
            </a>
            <a
              href="https://wa.me/34648750092?text=Hola%20Perla%20Negra%2C%20quiero%20reservar%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('footer')}
              className="mt-4 inline-flex rounded-full border border-champagne/30 px-5 py-2 text-xs font-bold uppercase tracking-widest text-champagne hover:bg-champagne hover:text-obsidiana transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Hours + Social + Legal */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-marfil/40 mb-6 font-mono">Horario</h4>
          <p className="text-sm font-light leading-relaxed text-marfil/80">
            Lunes a Viernes<br />
            <span className="text-marfil">11:30 - 14:00</span><br />
            <span className="text-marfil">16:30 - 20:00</span>
          </p>

          {/* Social */}
          <div className="mt-10">
            <h4 className="text-xs uppercase tracking-widest text-marfil/40 mb-4 font-mono">Síguenos</h4>
            <a
              href="https://www.instagram.com/perlanegramurcia/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstagramClick('footer')}
              className="inline-flex items-center gap-2.5 text-sm text-marfil/70 hover:text-champagne transition-colors group"
            >
              <span className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-champagne/40 transition-colors">
                <InstagramIcon className="w-3.5 h-3.5" />
              </span>
              @perlanegramurcia
            </a>
          </div>

          {/* Google Reviews */}
          <div className="mt-8">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Perla+Negra+Tattoo+Molina+de+Segura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-marfil/40 hover:text-champagne/70 transition-colors font-mono"
            >
              <ExternalLink className="w-3 h-3" />
              Ver las 215 reseñas en Google
            </a>
          </div>

          <div className="mt-10">
            <h4 className="text-xs uppercase tracking-widest text-marfil/40 mb-4 font-mono">Legal</h4>
            <div className="flex flex-col gap-2 items-start text-xs text-marfil/50">
              <button onClick={() => setLegalOpen('aviso')} className="hover:text-champagne transition-colors">Aviso Legal</button>
              <button onClick={() => setLegalOpen('privacidad')} className="hover:text-champagne transition-colors">Política de Privacidad</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-xs text-marfil/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Perla Negra Tattoo. Todos los derechos reservados.</p>
        <p className="font-mono">DISEÑADO PARA LA ETERNIDAD</p>
      </div>

      <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />
    </footer>
  );
}
