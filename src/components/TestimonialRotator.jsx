import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Alejandra Romero',
    rating: 5,
    text: 'Una experiencia increíble de principio a fin. Desde la primera consulta sentí que entendían exactamente lo que quería. El resultado superó todas mis expectativas — cada línea, cada sombra, perfecto. No es un estudio de tatuajes más, es arte de verdad.',
  },
  {
    id: 2,
    name: 'Daniel Ortiz',
    rating: 5,
    text: 'Llevaba meses buscando un estudio que me diera confianza para mi primer tatuaje grande. En Perla Negra me explicaron todo el proceso, me mostraron bocetos previos y el cuidado post-tatuaje fue impecable. El resultado es espectacular, ya estoy planeando el siguiente.',
  },
  {
    id: 3,
    name: 'Sofía Castellanos',
    rating: 5,
    text: 'Me hicieron un microrealismo que parece una fotografía. La atención al detalle es obsesiva, en el mejor sentido. El estudio es impecable, la higiene perfecta y el trato totalmente profesional. Recomendable al 100%.',
  },
  {
    id: 4,
    name: 'Marcos Fernández',
    rating: 5,
    text: 'Quería cubrir un tatuaje antiguo y el resultado fue mágico. Transformaron algo que me avergonzaba en una obra de arte que ahora enseño con orgullo. El equipo es talentoso, cercano y muy profesional. Volveré seguro.',
  },
];

export default function TestimonialRotator() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (index === active) return;

      const el = cardRef.current;
      if (!el) {
        setActive(index);
        return;
      }

      gsap.to(el, {
        opacity: 0,
        y: 15,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setActive(index);
          gsap.fromTo(
            el,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
          );
        },
      });
    },
    [active]
  );

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % TESTIMONIALS.length;
        const el = cardRef.current;
        if (el) {
          gsap.to(el, {
            opacity: 0,
            y: 15,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              gsap.fromTo(
                el,
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
              );
            },
          });
        }
        return next;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

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

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <p className="text-champagne font-mono text-xs tracking-[0.3em] uppercase mb-6">
            Testimonios
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95]">
            <span className="text-gradient">Lo que dicen </span>
            <span className="font-drama italic text-champagne normal-case font-normal">
              de nosotros
            </span>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="glass-panel rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden border-champagne/10"
        >
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-champagne/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-champagne/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-champagne/20 text-7xl md:text-8xl font-drama italic leading-none select-none block -mb-4 md:-mb-6">
              &ldquo;
            </span>

            <blockquote className="text-marfil/90 text-lg md:text-xl lg:text-2xl font-drama italic font-normal leading-relaxed md:leading-relaxed min-h-[120px] md:min-h-[100px]">
              {current.text}
            </blockquote>

            <span className="text-champagne/20 text-7xl md:text-8xl font-drama italic leading-none select-none block text-right -mt-8 md:-mt-10">
              &rdquo;
            </span>

            <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-marfil font-bold text-base md:text-lg tracking-tight">
                  {current.name}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-champagne fill-champagne"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-marfil/50 text-xs font-medium tracking-wide">
                  Google Review
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-8 md:mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                resetTimer();
              }}
              className={`rounded-full transition-all duration-400 ${
                i === active ?
                   'w-8 h-2.5 bg-champagne shadow-[0_0_12px_rgba(201,168,76,0.4)]'
                  : 'w-2.5 h-2.5 bg-marfil/20 hover:bg-marfil/40'
              }`}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
