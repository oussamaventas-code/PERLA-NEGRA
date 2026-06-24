import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Users, Compass, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: GraduationCap,
    title: 'Formación Profesional',
    description: 'Programa completo de técnicas avanzadas de tatuaje',
  },
  {
    icon: Users,
    title: 'Seminarios',
    description: 'Sesiones intensivas con artistas invitados internacionales',
  },
  {
    icon: Compass,
    title: 'Mentorías',
    description: 'Acompañamiento personalizado con nuestros artistas senior',
  },
  {
    icon: Palette,
    title: 'Prácticas',
    description: 'Experiencia real en un estudio profesional activo',
  },
];

export default function Academia() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const floatWrappersRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
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

      // Subtitle reveal
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards ScrollTrigger entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });

      // Cards floating animation — solo en escritorio y sin movimiento reducido.
      // En móvil mareaba (las tarjetas apiladas oscilando arriba/abajo en bucle).
      const canFloat =
        window.matchMedia('(min-width: 768px)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (canFloat) {
        floatWrappersRef.current.forEach((wrapper, i) => {
          if (!wrapper) return;
          gsap.to(wrapper, {
            y: '+=12',
            duration: 2.5 + i * 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      }

      // CTA reveal
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="academia"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-8 md:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-champagne/[0.03] blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-champagne/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-24 md:mb-32">
          <div className="inline-block mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-champagne/70 border border-champagne/20 px-5 py-2 rounded-full">
              Academia
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-drama italic text-marfil leading-[1.1] max-w-4xl mx-auto"
          >
            Aprende con quienes{' '}
            <span className="text-gradient-gold">viven del tatuaje.</span>
          </h2>

          <p
            ref={subtitleRef}
            className="mt-8 text-lg md:text-xl text-marfil/50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Formación profesional impartida por artistas en activo. Sin teoría vacía, solo
            conocimiento real desde el estudio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="cursor-default"
              >
                <div
                  ref={(el) => (floatWrappersRef.current[index] = el)}
                  className="h-full"
                >
                  <div className="group h-full glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col items-start transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5 hover:border-champagne/20 hover:shadow-[0_20px_60px_-15px_rgba(201,168,76,0.15)]">
                    <div className="w-14 h-14 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-8 group-hover:bg-champagne/20 group-hover:border-champagne/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-xl font-bold text-marfil mb-3 tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-marfil/50 leading-relaxed font-light flex-1">
                      {feature.description}
                    </p>

                    <div className="mt-8 w-full h-px bg-gradient-to-r from-champagne/20 via-champagne/5 to-transparent" />

                    <span className="mt-6 text-xs font-mono uppercase tracking-widest text-champagne/40 group-hover:text-champagne/70 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} className="text-center mt-20 md:mt-28">
          <button className="px-10 py-5 bg-champagne text-obsidiana font-bold uppercase text-sm tracking-widest hover:bg-white transition-all duration-500 rounded-full shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]">
            Solicitar información
          </button>
          <p className="mt-6 text-xs font-mono text-marfil/30 tracking-wider">
            PLAZAS LIMITADAS · PRÓXIMA CONVOCATORIA ABIERTA
          </p>
        </div>
      </div>
    </section>
  );
}
