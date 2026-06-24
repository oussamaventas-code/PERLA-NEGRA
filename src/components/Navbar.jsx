import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { playClick, toggleMute, getMuteState, initAudio } from '../utils/soundController';
import { trackInstagramClick } from '../utils/analytics';
import BookingForm from './BookingForm';
import { STUDIO } from '../data/constants';


gsap.registerPlugin(ScrollTrigger);

// Inline Instagram SVG (lucide-react doesn’t bundle this icon)
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Navbar() {
  const navRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => getMuteState());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [bookingOpen, setBookingOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#tatuajes', label: 'Tatuajes' },
    { href: '#academia', label: 'Academia' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#contacto', label: 'Contacto' },
  ];

  // Bloquear el scroll de fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'glass-panel', targets: navRef.current },
      onToggle: (self) => {
        if (self.isActive) {
          gsap.to(navRef.current, { borderColor: 'rgba(201, 168, 76, 0.3)', duration: 0.3 });
        } else {
          gsap.to(navRef.current, { borderColor: 'transparent', duration: 0.3 });
        }
      }
    });
  }, []);

  const handleLinkHover = (e) => {
    playClick();
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setLineStyle({
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1
    });
  };

  const handleLinkLeave = () => {
    setLineStyle(prev => ({ ...prev, opacity: 0 }));
  };

  const handleAudioToggle = () => {
    // Initialize Web Audio context on user click
    initAudio();
    const muted = toggleMute();
    setIsMuted(muted);
    playClick();
  };

  return (
    <>
    {/* Backdrop del menú móvil: en portal porque el nav está transformado y un fixed interno se anclaría a él */}
    {isMenuOpen &&
      createPortal(
        <div
          className="fixed inset-0 z-[9980] bg-obsidiana/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />,
        document.body
      )}
    <nav
      ref={navRef}
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[9990] rounded-[1.75rem] md:rounded-full px-4 md:px-8 py-3 md:py-4 transition-all duration-300 border select-none ${
        isMenuOpen
          ? 'bg-secondary-900/95 backdrop-blur-xl border-champagne/25 shadow-2xl'
          : 'border-transparent'
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        {/* Brand logo */}
        <a href="#inicio" className="text-marfil font-bold text-lg md:text-xl tracking-widest uppercase flex flex-col leading-tight cursor-pointer">
          <span>Perla Negra</span>
          <span className="text-[10px] md:text-xs tracking-[0.28em] md:tracking-[0.3em] text-marfil/60">Tattoo</span>
        </a>

        {/* Navigation Links with Sliding Magnetic Line */}
        <div
          className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase relative py-2"
          onMouseLeave={handleLinkLeave}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={handleLinkHover}
              className="hover:text-champagne transition-colors py-1"
            >
              {link.label}
            </a>
          ))}

          {/* Sliding golden bar */}
          <div
            className="absolute bottom-0 h-[2px] bg-champagne rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${lineStyle.left}px`,
              width: `${lineStyle.width}px`,
              opacity: lineStyle.opacity,
            }}
          />
        </div>

        {/* Right controls (Instagram + Sound Toggle + CTA + Mobile Menu) */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Instagram */}
          <a
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Perla Negra"
            onMouseEnter={playClick}
            onClick={() => trackInstagramClick('navbar')}
            className="hidden md:flex p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-champagne/40 hover:bg-white/10 transition-all duration-300 items-center justify-center cursor-pointer group"
          >
            <InstagramIcon className="w-4 h-4 text-marfil/50 group-hover:text-champagne transition-colors" />
          </a>


          <button
            onClick={handleAudioToggle}
            onMouseEnter={playClick}
            className="relative group p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-champagne/40 hover:bg-white/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            title={isMuted ? "Activar sonido inmersivo" : "Silenciar sonido"}
            aria-label={isMuted ? "Activar sonido inmersivo" : "Silenciar sonido"}
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-marfil/50 group-hover:text-champagne transition-colors" />
            ) : (
              <div className="flex items-center gap-0.5">
                <Volume2 className="w-4 h-4 text-champagne" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-[1.5px] bg-champagne rounded-full animate-[soundWave_0.6s_ease-in-out_infinite_alternate]" />
                  <span className="w-[1.5px] bg-champagne rounded-full animate-[soundWave_0.8s_ease-in-out_infinite_alternate_0.2s] h-1.5" />
                  <span className="w-[1.5px] bg-champagne rounded-full animate-[soundWave_0.5s_ease-in-out_infinite_alternate_0.4s]" />
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => { setBookingOpen(true); playClick(); }}
            onMouseEnter={playClick}
            className="magnetic-btn hidden sm:inline-flex relative group overflow-hidden px-5 md:px-6 py-2.5 rounded-full bg-champagne text-obsidiana font-semibold uppercase text-[11px] md:text-xs tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] cursor-pointer"
          >
            <span className="relative z-10 pointer-events-none">Reservar</span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </button>

          <button
            onClick={() => {
              setIsMenuOpen((value) => !value);
              playClick();
            }}
            className="md:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-marfil hover:border-champagne/40 transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100 pt-5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="px-2 py-3 text-sm uppercase tracking-[0.2em] text-marfil/75 hover:text-champagne transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => { setIsMenuOpen(false); trackInstagramClick('mobile_menu'); }}
            className="flex items-center gap-3 px-2 py-3 text-sm uppercase tracking-[0.2em] text-marfil/75 hover:text-champagne transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Instagram
          </a>

          <button
            onClick={() => { setIsMenuOpen(false); setBookingOpen(true); playClick(); }}
            tabIndex={isMenuOpen ? 0 : -1}
            className="mt-2 text-center rounded-full bg-champagne px-5 py-3 text-xs font-bold uppercase tracking-widest text-obsidiana cursor-pointer"
          >
            Reservar consulta
          </button>
        </div>
      </div>

    </nav>

    <BookingForm isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
