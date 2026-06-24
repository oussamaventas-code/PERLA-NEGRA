import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Target } from 'lucide-react';
import { playClick } from '../utils/soundController';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: 'Tecnología Avanzada',
    description: 'Equipamiento de última generación para resultados óptimos con el menor número de sesiones posible.',
  },
  {
    icon: ShieldCheck,
    title: 'Sin Cicatrices',
    description: 'Proceso seguro y profesional que respeta la integridad de tu piel en cada sesión.',
  },
  {
    icon: Target,
    title: 'Resultados Garantizados',
    description: 'Protocolo personalizado diseñado específicamente para tu tipo de piel y tinta.',
  },
];

export default function LaserRemoval() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const getPercentage = useCallback((clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.max(2, Math.min(98, pct));
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    playClick(); // micro-click al interactuar
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPos(getPercentage(clientX));
  }, [getPercentage]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPos(getPercentage(clientX));
  }, [getPercentage]);

  const handlePointerUp = useCallback(() => {
    if (isDragging.current) {
      playClick(); // micro-click al soltar
    }
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        q('.laser-heading'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        q('.laser-subtitle'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        q('.laser-slider-wrap'),
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        q('.benefit-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: q('.benefits-grid'),
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-8 md:px-24 bg-obsidiana overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-champagne/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="laser-heading inline-block text-xs uppercase tracking-[0.4em] text-champagne/60 font-mono mb-6">
            Servicio especializado
          </span>
          <h2 className="laser-heading text-4xl md:text-6xl lg:text-7xl font-drama italic text-marfil leading-[1.1]">
            Eliminación{' '}
            <span className="text-gradient-gold">Láser</span>
          </h2>
          <p className="laser-subtitle mt-6 text-lg md:text-xl text-marfil/50 font-light max-w-xl mx-auto">
            Corrección. Renovación. Nuevas oportunidades.
          </p>
        </div>

        {/* Outer wrap containing slider */}
        <div className="laser-slider-wrap glass-panel rounded-[2rem] p-3 md:p-4 max-w-4xl mx-auto">
          <div
            ref={sliderRef}
            data-cursor="drag"
            className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-[1.5rem] overflow-hidden select-none"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
          >
            <img
              src="/laser/after.webp"
              alt="Después del tratamiento láser"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%`, willChange: 'width' }}
            >
              <img
                src="/laser/before.webp"
                alt="Antes del tratamiento láser"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
                draggable={false}
              />
            </div>

            {/* Sliding divider with interactive golden halo */}
            <div
              className="absolute top-0 bottom-0 z-20"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)', willChange: 'left' }}
            >
              <div className="w-[2px] h-full bg-champagne shadow-[0_0_15px_rgba(201,168,76,0.8)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-champagne/95 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.6)] border border-white/20 transition-transform duration-300 hover:scale-110">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-obsidiana"
                >
                  <path
                    d="M6 10L2 10M2 10L4.5 7.5M2 10L4.5 12.5M14 10L18 10M18 10L15.5 7.5M18 10L15.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
              <span className="px-3 py-1.5 rounded-full bg-obsidiana/70 backdrop-blur-md text-[10px] md:text-xs font-mono uppercase tracking-widest text-marfil/80 border border-white/10">
                Antes
              </span>
            </div>
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
              <span className="px-3 py-1.5 rounded-full bg-obsidiana/70 backdrop-blur-md text-[10px] md:text-xs font-mono uppercase tracking-widest text-champagne border border-champagne/20">
                Después
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          {benefits.map((benefit) => {
            const IconComp = benefit.icon;
            return (
              <div
                key={benefit.title}
                onMouseEnter={playClick}
                className="benefit-card glass-panel rounded-[1.5rem] p-8 md:p-10 group hover:border-champagne/30 hover:shadow-[0_15px_40px_-15px_rgba(201,168,76,0.15)] transition-all duration-500 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-6 group-hover:bg-champagne/20 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-500">
                  <IconComp className="w-5 h-5 text-champagne" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-marfil mb-3 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-marfil/50 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
