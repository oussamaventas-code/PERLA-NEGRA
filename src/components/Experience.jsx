import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, PenTool, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Consulta y Concepto',
    description:
      'Escuchamos tu historia, entendemos tu visión y diseñamos un concepto que refleje quién eres. Cada detalle se planifica con precisión.',
    Icon: MessageSquare,
  },
  {
    num: '02',
    title: 'Diseño Personalizado',
    description:
      'Nuestros artistas crean un diseño exclusivo para ti. Revisamos cada línea, cada sombra, hasta que sea perfecto.',
    Icon: PenTool,
  },
  {
    num: '03',
    title: 'Ejecución y Seguimiento',
    description:
      'Con técnica impecable, damos vida a tu pieza. Y después, te acompañamos en todo el proceso de cuidado.',
    Icon: CheckCircle,
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.experience-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Each card sticks and then gets replaced by the next
      cardRefs.current.forEach((card, i) => {
        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: 'top 15%',
          endTrigger: sectionRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        // Fade out and scale down current card when next card arrives
        if (i < steps.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            filter: 'blur(4px)',
            ease: 'none',
            scrollTrigger: {
              trigger: cardRefs.current[i + 1],
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative bg-obsidiana pb-[30vh]"
    >
      {/* Section Header */}
      <div className="experience-header text-center pt-32 pb-20 px-8">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.35em] text-champagne/60 mb-6">
          Nuestro proceso
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-drama italic text-champagne leading-[1.1]">
          La Experiencia
          <br />
          <span className="text-marfil">Perla Negra</span>
        </h2>
      </div>

      {/* Cards — each one pins independently */}
      <div className="relative px-6 md:px-16 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => (cardRefs.current[i] = el)}
            className="mb-[40vh] last:mb-0"
          >
            <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />

              {/* Giant step number */}
              <span className="absolute top-8 right-10 md:top-10 md:right-14 text-[8rem] md:text-[12rem] lg:text-[14rem] font-mono font-bold leading-none text-champagne/[0.06] select-none pointer-events-none">
                {step.num}
              </span>

              <div className="relative z-10 flex flex-col gap-8">
                {/* Icon + step number */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center">
                    <step.Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-sm text-champagne/70 tracking-widest uppercase">
                    Paso {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-marfil leading-[1.1]">
                  {step.title}
                </h3>

                {/* Separator */}
                <div className="w-20 h-px bg-gradient-to-r from-champagne/60 to-transparent" />

                {/* Description */}
                <p className="text-lg md:text-xl text-marfil/60 font-light max-w-2xl leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
