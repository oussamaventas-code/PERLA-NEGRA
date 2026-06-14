import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Cuánto cuesta un tatuaje en Perla Negra?',
    answer:
      'El precio varía según el tamaño, complejidad y ubicación del diseño. Ofrecemos presupuestos personalizados sin compromiso. Reserva una consulta gratuita y te daremos un precio exacto.',
  },
  {
    question: '¿Duele hacerse un tatuaje?',
    answer:
      'La sensación varía según la zona del cuerpo y la tolerancia personal. Nuestros artistas trabajan con técnicas que minimizan las molestias y te guiarán durante todo el proceso.',
  },
  {
    question: '¿Cómo debo cuidar mi tatuaje?',
    answer:
      'Te proporcionamos instrucciones detalladas de cuidado post-tatuaje. Incluye limpieza suave, hidratación específica y protección solar. Hacemos seguimiento durante todo el proceso de curación.',
  },
  {
    question: '¿Puedo traer mi propio diseño?',
    answer:
      '¡Por supuesto! Trabajamos con tu idea como punto de partida y nuestros artistas la adaptan para que funcione perfectamente como tatuaje, respetando tu visión original.',
  },
  {
    question: '¿Cuánto dura una sesión?',
    answer:
      'Depende del tamaño y complejidad. Desde 30 minutos para piezas pequeñas hasta sesiones de 6-8 horas para proyectos grandes. Planificamos cada sesión para tu comodidad.',
  },
  {
    question: '¿Ofrecéis financiación?',
    answer:
      'Sí, ofrecemos opciones de pago flexible para proyectos grandes. Consulta con nuestro equipo las condiciones disponibles.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(iconRef.current, {
        rotation: 180,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-item glass-panel rounded-[1.25rem] overflow-hidden transition-all duration-500 ${
        isOpen ? 'border-champagne/20' : 'hover:border-white/10'
      }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between gap-6 px-7 py-6 md:px-9 md:py-7 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <span className="text-xs font-mono text-champagne/40 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`text-base md:text-lg font-medium transition-colors duration-300 ${
              isOpen ? 'text-champagne' : 'text-marfil group-hover:text-champagne/80'
            }`}
          >
            {item.question}
          </span>
        </div>
        <div
          ref={iconRef}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen ?
               'bg-champagne/10 border-champagne/30'
              : 'bg-transparent border-white/10 group-hover:border-champagne/20'
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors duration-300 ${
              isOpen ? 'text-champagne' : 'text-marfil/40'
            }`}
            strokeWidth={2}
          />
        </div>
      </button>

      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="px-7 pb-7 md:px-9 md:pb-8 pl-[4.25rem] md:pl-[4.75rem]">
          <p className="text-sm md:text-[15px] text-marfil/50 font-light leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        q('.faq-heading'),
        { y: 50, opacity: 0 },
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
        q('.faq-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: q('.faq-list'),
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
      className="relative py-32 md:py-44 px-8 md:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-champagne/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="faq-heading inline-block text-xs uppercase tracking-[0.4em] text-champagne/60 font-mono mb-6">
            Resolvemos tus dudas
          </span>
          <h2 className="faq-heading text-4xl md:text-6xl lg:text-7xl font-drama italic text-marfil leading-[1.1]">
            Preguntas{' '}
            <span className="text-gradient-gold">Frecuentes</span>
          </h2>
        </div>

        <div className="faq-list flex flex-col gap-3">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
