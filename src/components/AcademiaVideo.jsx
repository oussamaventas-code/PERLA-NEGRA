import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Ruta del vídeo vertical de la academia. Coloca el archivo en: public/academia/academia.mp4
const ACADEMIA_VIDEO = '/academia/academia.mp4';

export default function AcademiaVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  // Respeta la preferencia de movimiento reducido: si está activa, no se autorreproduce
  const [reduced, setReduced] = useState(false);
  // El vídeo arranca en silencio (requisito del autoplay); el usuario activa el sonido
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    // Al activar el sonido, asegurarse de que el vídeo está reproduciéndose
    if (!next) v.play().catch(() => {});
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      gsap.fromTo(
        q('.av-reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo(
        q('.av-frame'),
        { y: 70, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="academia-video"
      className="relative w-full py-28 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      {/* Fondo ambiental: copia desenfocada del vídeo que rellena los laterales en PC.
          Oculto en móvil para no gastar recursos (allí el vídeo ya ocupa el ancho). */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-3xl scale-125 hidden md:block pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={ACADEMIA_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidiana via-obsidiana/85 to-obsidiana z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <span className="av-reveal inline-block text-xs uppercase tracking-[0.5em] text-champagne/50 font-mono mb-6">
            La academia en acción
          </span>
          <h2 className="av-reveal text-4xl md:text-5xl lg:text-6xl font-drama italic text-marfil leading-[1.05] mb-6">
            Aprende del <span className="text-gradient-gold">estudio.</span>
          </h2>
          <p className="av-reveal text-lg text-marfil/50 font-light max-w-md mx-auto lg:mx-0">
            Nuestros alumnos formándose junto a artistas profesionales en un estudio
            activo. Así se vive la formación en Perla Negra.
          </p>
        </div>

        {/* Vídeo vertical (formato móvil 9:16) */}
        <div className="av-frame relative w-full max-w-[300px] md:max-w-[340px] mx-auto lg:mx-0 shrink-0">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-champagne/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay={!reduced}
              loop
              muted={muted}
              playsInline
              controls={reduced}
            >
              <source src={ACADEMIA_VIDEO} type="video/mp4" />
            </video>

            {/* Botón de sonido (estilo Instagram/TikTok) */}
            {!reduced && (
              <button
                onClick={toggleSound}
                aria-label={muted ? 'Activar sonido' : 'Silenciar'}
                className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-obsidiana/60 backdrop-blur-md border border-white/15 text-marfil hover:text-champagne hover:border-champagne/50 transition-all duration-300 cursor-pointer"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5 pointer-events-none" />
                ) : (
                  <Volume2 className="w-5 h-5 pointer-events-none" />
                )}
              </button>
            )}
          </div>
          {/* Halo dorado sutil detrás del marco */}
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-champagne/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
