import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MessageSquare, Users, Image } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const KPIS = [
  {
    value: 4.8,
    suffix: '',
    label: 'Valoración media',
    icon: Star,
    decimals: 1,
    format: null,
  },
  {
    value: 215,
    suffix: '+',
    label: 'Reseñas verificadas',
    icon: MessageSquare,
    decimals: 0,
    format: null,
  },
  {
    value: 33900,
    suffix: '+',
    label: 'Seguidores',
    icon: Users,
    decimals: 0,
    format: (v) => {
      if (v >= 1000) return (v / 1000).toFixed(1) + 'K';
      return Math.round(v).toString();
    },
  },
  {
    value: 1700,
    suffix: '+',
    label: 'Publicaciones',
    icon: Image,
    decimals: 0,
    format: null,
  },
];

export default function Dashboard() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const countersRef = useRef([]);
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

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      KPIS.forEach((kpi, i) => {
        const el = countersRef.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: kpi.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (kpi.format) {
              el.textContent = kpi.format(obj.val) + kpi.suffix;
            } else if (kpi.decimals > 0) {
              el.textContent = obj.val.toFixed(kpi.decimals) + kpi.suffix;
            } else {
              el.textContent = Math.round(obj.val).toLocaleString('es-ES') + kpi.suffix;
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <p className="text-champagne font-mono text-xs tracking-[0.3em] uppercase mb-6">
            En cifras
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95]">
            <span className="text-gradient">Confianza </span>
            <span className="font-drama italic text-champagne normal-case font-normal">
              verificada
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {KPIS.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass-panel rounded-2xl md:rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-champagne/[0.04] rounded-full blur-2xl group-hover:bg-champagne/[0.08] transition-all duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-champagne/[0.07] border border-champagne/15 mb-5">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-champagne" />
                  </div>

                  <p
                    ref={(el) => (countersRef.current[i] = el)}
                    className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-champagne tracking-tight leading-none mb-3"
                  >
                    0
                  </p>

                  <p className="text-marfil/55 text-xs md:text-sm font-medium tracking-wide uppercase">
                    {kpi.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
