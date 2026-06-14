import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WITHOUT_ITEMS = [
  'Diseños genéricos',
  'Sin planificación',
  'Sin seguimiento',
  'Resultado incierto',
];

const WITH_ITEMS = [
  'Diseño exclusivo',
  'Equipo especializado',
  'Experiencia premium',
  'Resultado duradero',
];

export default function Comparison() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      const leftItems = leftColRef.current.querySelectorAll('.comparison-item') || [];
      gsap.fromTo(
        leftItems,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const rightItems = rightColRef.current.querySelectorAll('.comparison-item') || [];
      gsap.fromTo(
        rightItems,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <p className="text-champagne font-mono text-xs tracking-[0.3em] uppercase mb-6">
            La diferencia
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95]">
            <span className="text-gradient">No es lo mismo.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div
            ref={leftColRef}
            className="glass-panel rounded-2xl md:rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-marfil/30 font-mono text-xs tracking-[0.25em] uppercase mb-10">
                Sin Perla Negra
              </h3>

              <div className="space-y-6">
                {WITHOUT_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="comparison-item flex items-center gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400/70 text-sm font-bold">
                      ✕
                    </span>
                    <span className="text-marfil/35 text-base md:text-lg font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={rightColRef}
            className="glass-panel rounded-2xl md:rounded-3xl p-8 md:p-10 relative overflow-hidden border-champagne/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/[0.04] to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-champagne/[0.06] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-champagne font-mono text-xs tracking-[0.25em] uppercase mb-10">
                Con Perla Negra
              </h3>

              <div className="space-y-6">
                {WITH_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="comparison-item flex items-center gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-marfil text-base md:text-lg font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
