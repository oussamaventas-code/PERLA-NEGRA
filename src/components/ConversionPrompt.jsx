import { useState } from 'react';
import { CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react';
import BookingForm from './BookingForm';
import { playClick } from '../utils/soundController';

const TRUST_POINTS = [
  {
    icon: MessageCircle,
    label: 'Consulta por WhatsApp',
    copy: 'Cuéntanos la idea y te orientamos antes de reservar.',
  },
  {
    icon: ShieldCheck,
    label: 'Presupuesto claro',
    copy: 'Te damos rango, tiempos y artista recomendado sin compromiso.',
  },
  {
    icon: CalendarCheck,
    label: 'Agenda privada',
    copy: 'Elegimos fecha cuando diseño, zona y tamaño están definidos.',
  },
];

export default function ConversionPrompt() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-secondary-900 px-6 py-16 md:px-16 lg:px-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-champagne/60">
            Siguiente paso
          </p>
          <h2 className="max-w-2xl text-3xl font-bold uppercase leading-[0.95] tracking-tighter text-marfil md:text-5xl">
            ¿Ya tienes una idea?
            <span className="block font-drama text-4xl font-normal italic normal-case text-champagne md:text-6xl">
              Hablemos antes de tatuar.
            </span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TRUST_POINTS.map(({ icon: Icon, label, copy }) => (
            <div key={label} className="border-l border-champagne/20 pl-5">
              <Icon className="mb-4 h-5 w-5 text-champagne" strokeWidth={1.8} />
              <h3 className="text-sm font-bold uppercase tracking-widest text-marfil">
                {label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marfil/50">
                {copy}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-start-2">
          <button
            onClick={() => {
              setBookingOpen(true);
              playClick();
            }}
            onMouseEnter={playClick}
            className="magnetic-btn w-full bg-champagne px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-obsidiana transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] md:w-auto"
          >
            Reservar consulta gratuita
          </button>
        </div>
      </div>

      <BookingForm isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
