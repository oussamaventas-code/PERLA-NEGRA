import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Clock, Star } from 'lucide-react';
import { playClick } from '../utils/soundController';
import BookingForm from './BookingForm';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    icon: Zap,
    label: 'Pieza pequeña',
    from: '80',
    unit: '€',
    desc: 'Diseños de hasta 5 cm. Perfectos para muñeca, tobillo o detrás de la oreja.',
    details: ['Fine line, minimalistas', 'Sesión única (30–60 min)', 'Señal de reserva: 30€'],
  },
  {
    icon: Clock,
    label: 'Sesión por horas',
    from: '150',
    unit: '€/h',
    desc: 'La tarifa más flexible. Proyectos medianos y grandes facturados por tiempo real de trabajo.',
    details: ['Sesiones de 3–6 horas', 'Proyectos medianos y grandes', 'Señal de reserva: 50€'],
    featured: true,
  },
  {
    icon: Star,
    label: 'Proyecto completo',
    from: 'A medida',
    unit: '',
    desc: 'Mangas, espaldas completas y proyectos de largo alcance. Presupuesto personalizado sin compromiso.',
    details: ['Varias sesiones planificadas', 'Seguimiento continuo', 'Consulta gratuita incluida'],
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-header', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.pricing-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="precios"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-8 md:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-champagne/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="pricing-header text-center mb-20">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.4em] text-champagne/60 mb-6">
            Inversión
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            <span className="text-gradient">Precios </span>
            <span className="font-drama italic text-champagne normal-case font-normal">orientativos</span>
          </h2>
          <p className="mt-6 text-marfil/50 text-lg md:text-xl font-light max-w-xl mx-auto">
            Cada pieza es única. El precio final depende del tamaño, complejidad y tiempo.
            La consulta siempre es gratuita y sin compromiso.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.label}
                className={`pricing-card relative flex flex-col rounded-[2rem] p-8 md:p-10 transition-all duration-500 ${
                  plan.featured
                    ? 'bg-champagne/10 border border-champagne/30 shadow-[0_0_60px_-20px_rgba(201,168,76,0.3)]'
                    : 'glass-panel hover:border-champagne/20'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-champagne text-obsidiana text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Más solicitado
                  </div>
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${plan.featured ? 'bg-champagne/20' : 'bg-white/5'}`}>
                  <Icon className={`w-5 h-5 ${plan.featured ? 'text-champagne' : 'text-marfil/60'}`} />
                </div>

                <p className="text-xs font-mono uppercase tracking-[0.25em] text-marfil/55 mb-2">{plan.label}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  {plan.unit && plan.unit !== '€/h' && (
                    <span className="text-marfil/55 text-sm">desde</span>
                  )}
                  <span className={`text-4xl md:text-5xl font-bold tracking-tighter ${plan.featured ? 'text-champagne' : 'text-marfil'}`}>
                    {plan.from}
                  </span>
                  {plan.unit && (
                    <span className="text-marfil/55 text-lg">{plan.unit}</span>
                  )}
                </div>

                <p className="text-marfil/60 text-sm leading-relaxed mb-8 flex-1">{plan.desc}</p>

                <ul className="space-y-2.5 mb-10">
                  {plan.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-marfil/70">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? 'bg-champagne' : 'bg-champagne/40'}`} />
                      {d}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setBookingOpen(true)}
                  onMouseEnter={playClick}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    plan.featured
                      ? 'bg-champagne text-obsidiana hover:bg-white hover:shadow-[0_0_25px_rgba(201,168,76,0.4)]'
                      : 'border border-white/10 text-marfil/70 hover:border-champagne/40 hover:text-champagne'
                  }`}
                >
                  Solicitar consulta
                </button>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs font-mono text-marfil/25 mt-10 tracking-wider">
          * Los precios son orientativos. El presupuesto exacto se confirma en la consulta gratuita.
        </p>
      </div>

      <BookingForm isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
