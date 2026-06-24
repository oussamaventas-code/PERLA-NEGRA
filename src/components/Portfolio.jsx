import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { playClick } from '../utils/soundController';
import { CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolio';
import { STUDIO } from '../data/constants';
import { trackInstagramClick } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

// SVG inline — lucide-react v1.x no incluye Instagram
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Portfolio() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const lightbox = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(() => setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length), [filteredItems.length]);
  const nextLightbox = useCallback(() => setLightboxIndex((i) => (i + 1) % filteredItems.length), [filteredItems.length]);

  // Animate cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.portfolio-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all',
      }
    );
  }, [activeFilter, filteredItems.length]);

  // Header reveal on scroll
  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, nextLightbox, prevLightbox, closeLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section
      id="tatuajes"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <p className="text-champagne font-mono text-xs tracking-[0.3em] uppercase mb-6">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
            <span className="text-gradient">Nuestro </span>
            <span className="font-drama italic text-champagne normal-case font-normal">
              Arte
            </span>
          </h2>
          <p className="mt-6 text-marfil/50 text-lg md:text-xl font-light max-w-lg mx-auto">
            Cada pieza cuenta una historia
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14 md:mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              onMouseEnter={playClick}
              className={`px-5 py-2.5 text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-400 rounded-full border ${
                activeFilter === cat.id ?
                   'bg-champagne text-obsidiana border-champagne shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                  : 'bg-transparent text-marfil/60 border-white/10 hover:border-champagne/40 hover:text-marfil'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-cursor="view"
              onMouseEnter={playClick}
              className="portfolio-card group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => openLightbox(filteredItems.indexOf(item))}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const inner = e.currentTarget.querySelector('.card-inner');
                if (inner) {
                  inner.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
                }
              }}
              onMouseLeave={(e) => {
                const inner = e.currentTarget.querySelector('.card-inner');
                if (inner) {
                  inner.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                }
              }}
            >
              <div
                className="card-inner transition-transform duration-500 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 group-hover:border-champagne/40 transition-colors duration-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-obsidiana via-obsidiana/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_60px_rgba(201,168,76,0.15)]" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-champagne font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.category}
                    </p>
                    <h3 className="text-marfil text-lg md:text-xl font-bold tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-marfil/50 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      por {item.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-14 md:mt-20 flex justify-center">
          <a
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playClick}
            onClick={() => trackInstagramClick('portfolio')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-champagne/40 hover:bg-white/5 transition-all duration-300"
          >
            <span className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-champagne/30 group-hover:bg-champagne/10 transition-all duration-300">
              <InstagramIcon className="w-4 h-4 text-marfil/50 group-hover:text-champagne transition-colors" />
            </span>
            <span className="text-sm font-mono text-marfil/60 group-hover:text-champagne transition-colors tracking-wider">
              Ver más en{' '}
              <strong className="text-marfil group-hover:text-champagne transition-colors">@perlanegramurcia</strong>
            </span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          data-cursor="close"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-obsidiana/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]" />

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); playClick(); }}
            onMouseEnter={playClick}
            className="magnetic-btn absolute top-6 right-6 z-[9999] p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-champagne/40 transition-all duration-300 group cursor-pointer"
          >
            <X className="w-6 h-6 text-marfil group-hover:text-champagne transition-colors pointer-events-none" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[9999] text-xs font-mono text-marfil/55 tracking-widest">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); playClick(); }}
            onMouseEnter={playClick}
            className="absolute left-4 md:left-8 z-[9999] p-3 rounded-full bg-white/5 border border-white/10 hover:border-champagne/40 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-marfil/60 group-hover:text-champagne transition-colors" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); playClick(); }}
            onMouseEnter={playClick}
            className="absolute right-4 md:right-8 z-[9999] p-3 rounded-full bg-white/5 border border-white/10 hover:border-champagne/40 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-marfil/60 group-hover:text-champagne transition-colors" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] mx-16 animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidiana/90 to-transparent rounded-b-2xl">
              <p className="text-champagne font-mono text-xs tracking-[0.2em] uppercase mb-1">
                {lightbox.category}
              </p>
              <h3 className="text-marfil text-2xl font-bold tracking-tight">
                {lightbox.title}
              </h3>
              <p className="text-marfil/60 text-sm mt-1">
                por {lightbox.artist}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
