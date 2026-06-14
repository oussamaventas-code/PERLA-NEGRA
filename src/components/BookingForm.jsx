import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, Send, ChevronDown } from 'lucide-react';
import { playClick } from '../utils/soundController';
import { trackWhatsAppClick } from '../utils/analytics';

const STYLES = ['Blackwork', 'Realismo', 'Microrealismo', 'Fine Line', 'Color', 'Cover Up', 'Otro'];
const ZONES = ['Brazo', 'Antebrazo', 'Muñeca', 'Mano', 'Pecho', 'Espalda', 'Costilla', 'Pierna', 'Tobillo / Pie', 'Cuello', 'Otro'];
const SIZES = ['Pequeño (< 5 cm)', 'Mediano (5–15 cm)', 'Grande (> 15 cm)', 'Proyecto completo'];
const ARTISTS = ['Sin preferencia', 'Juande Gambín', 'Kore', 'Pablo', 'Fabio Climent'];

const INITIAL = {
  nombre: '',
  estilo: '',
  zona: '',
  tamaño: '',
  artista: 'Sin preferencia',
  referencia: '',
  mensaje: '',
};

function Select({ id, label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.2em] font-mono text-marfil/50">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/5 border border-white/10 focus:border-champagne/50 text-marfil text-sm px-4 py-3 rounded-xl outline-none transition-colors duration-200 cursor-pointer"
        >
          <option value="" disabled className="bg-[#0D0D12]">Seleccionar…</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#0D0D12]">{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marfil/40 pointer-events-none" />
      </div>
    </div>
  );
}

export default function BookingForm({ isOpen, onClose, preArtist = '' }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [form, setForm] = useState({ ...INITIAL, artista: preArtist || 'Sin preferencia' });
  const [sent, setSent] = useState(false);

  // Sync de la prop preArtist durante el render (patrón recomendado por React,
  // evita el re-render en cascada de hacerlo en un efecto)
  const [prevArtist, setPrevArtist] = useState(preArtist);
  if (preArtist !== prevArtist) {
    setPrevArtist(preArtist);
    if (preArtist) setForm((f) => ({ ...f, artista: preArtist }));
  }

  // Animate in/out
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(panelRef.current, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5, ease: 'power4.out' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.35, ease: 'power3.in', onComplete: onClose });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35 });
  };

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `👋 Hola Perla Negra, quiero reservar una consulta.`,
      ``,
      `👤 *Nombre:* ${form.nombre}`,
      `🎨 *Estilo:* ${form.estilo}`,
      `📍 *Zona del cuerpo:* ${form.zona}`,
      `📏 *Tamaño:* ${form.tamaño}`,
      `🧑‍🎨 *Artista preferido:* ${form.artista}`,
      form.referencia ? `🖼️ *Referencia:* ${form.referencia}` : '',
      form.mensaje ? `💬 *Notas adicionales:* ${form.mensaje}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/34648750092?text=${encodeURIComponent(lines)}`;
    trackWhatsAppClick('booking_form');
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => { setSent(false); handleClose(); setForm({ ...INITIAL, artista: 'Sin preferencia' }); }, 2500);
  };

  const isValid = form.nombre && form.estilo && form.zona && form.tamaño;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9990] bg-obsidiana/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de reserva"
        className="fixed top-0 right-0 h-full w-full max-w-[520px] z-[9991] bg-secondary-900 border-l border-white/5 shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-secondary-900/90 backdrop-blur-md border-b border-white/5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-champagne/60 mb-0.5">Perla Negra Tattoo</p>
            <h2 className="text-xl font-bold tracking-tight text-marfil">Reservar consulta</h2>
          </div>
          <button
            onClick={handleClose}
            onMouseEnter={playClick}
            aria-label="Cerrar formulario"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-champagne/40 hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5 text-marfil/70" />
          </button>
        </div>

        {sent ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center h-[60vh] gap-6 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
              <Send className="w-7 h-7 text-champagne" />
            </div>
            <div>
              <p className="text-2xl font-bold text-marfil mb-2">¡Mensaje enviado!</p>
              <p className="text-marfil/50 text-sm">Te hemos abierto WhatsApp con tu consulta ya escrita. En breve te respondemos.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 py-8">
            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="booking-nombre" className="text-[11px] uppercase tracking-[0.2em] font-mono text-marfil/50">
                Tu nombre <span className="text-champagne">*</span>
              </label>
              <input
                id="booking-nombre"
                type="text"
                required
                value={form.nombre}
                onChange={(e) => set('nombre')(e.target.value)}
                placeholder="Ana García"
                className="bg-white/5 border border-white/10 focus:border-champagne/50 text-marfil text-sm px-4 py-3 rounded-xl outline-none transition-colors duration-200 placeholder:text-marfil/20"
              />
            </div>

            <Select id="booking-estilo" label="Estilo de tatuaje *" options={STYLES} value={form.estilo} onChange={set('estilo')} />
            <Select id="booking-zona" label="Zona del cuerpo *" options={ZONES} value={form.zona} onChange={set('zona')} />
            <Select id="booking-tamanio" label="Tamaño aproximado *" options={SIZES} value={form.tamaño} onChange={set('tamaño')} />
            <Select id="booking-artista" label="Artista preferido" options={ARTISTS} value={form.artista} onChange={set('artista')} />

            {/* Referencia */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="booking-referencia" className="text-[11px] uppercase tracking-[0.2em] font-mono text-marfil/50">
                Referencia / URL de imagen
              </label>
              <input
                id="booking-referencia"
                type="text"
                value={form.referencia}
                onChange={(e) => set('referencia')(e.target.value)}
                placeholder="https://pinterest.com/... o describe tu idea"
                className="bg-white/5 border border-white/10 focus:border-champagne/50 text-marfil text-sm px-4 py-3 rounded-xl outline-none transition-colors duration-200 placeholder:text-marfil/20"
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="booking-mensaje" className="text-[11px] uppercase tracking-[0.2em] font-mono text-marfil/50">
                Notas adicionales
              </label>
              <textarea
                id="booking-mensaje"
                rows={3}
                value={form.mensaje}
                onChange={(e) => set('mensaje')(e.target.value)}
                placeholder="Cualquier detalle que quieras añadir…"
                className="bg-white/5 border border-white/10 focus:border-champagne/50 text-marfil text-sm px-4 py-3 rounded-xl outline-none transition-colors duration-200 resize-none placeholder:text-marfil/20"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 pt-2">
              <p className="text-[11px] text-marfil/30 font-mono leading-relaxed">
                Al enviar, se abrirá WhatsApp con tu consulta ya escrita. Sin formularios, sin esperas.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              onMouseEnter={isValid ? playClick : undefined}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 cursor-pointer ${
                isValid
                  ? 'bg-champagne text-obsidiana hover:bg-white hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]'
                  : 'bg-white/5 text-marfil/20 border border-white/5 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              Enviar por WhatsApp
            </button>
          </form>
        )}
      </aside>
    </>,
    document.body
  );
}
