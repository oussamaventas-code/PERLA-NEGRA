import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { playClick } from '../utils/soundController';
import BookingForm from './BookingForm';

export default function Hero() {
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const socialRef = useRef(null);
  const bgRef = useRef(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  // El vídeo se sirve en móvil y escritorio; solo se sustituye por el póster
  // si el usuario tiene activada la preferencia de movimiento reducido
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShowVideo(!reducedMotion.matches);
    update();
    reducedMotion.addEventListener('change', update);
    return () => reducedMotion.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      bgRef.current,
      { scale: 1.12, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: 'power3.out' }
    )
      .fromTo(
        textRef.current.querySelectorAll('.reveal-line'),
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out' },
        '-=1.5'
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(
        btnRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(
        socialRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power3.out' },
        '-=0.7'
      );

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(bgRef.current, {
        x: xPercent * 25,
        y: yPercent * 25,
        rotation: xPercent * 0.5,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
    <section
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden flex flex-col px-8 md:px-24 select-none"
    >
      {/* Video Background with Parallax and Image Fallback */}
      <div
        ref={bgRef}
        className="absolute -inset-12 z-0 pointer-events-none overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {showVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
            poster="/hero-bg.webp"
          >
            <source src="/HERO/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/hero-bg.webp"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidiana via-obsidiana/80 to-obsidiana/30 z-0 pointer-events-none" />

      <div className="hero-content relative z-10 w-full max-w-5xl flex-1 flex flex-col justify-center pt-28 md:pt-24 pb-6">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-champagne/20 bg-obsidiana/35 px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-champagne/75 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_12px_rgba(201,168,76,0.8)]" />
          Estudio privado en Murcia
        </div>

        <h1
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9]"
        >
          <div className="overflow-hidden mb-1">
            <span className="block reveal-line">NO HACEMOS</span>
          </div>
          <div className="overflow-hidden mb-3">
            <span className="block reveal-line text-gradient">TATUAJES.</span>
          </div>
          <div className="overflow-hidden mt-6">
            <span className="block reveal-line font-drama italic text-champagne text-5xl md:text-7xl lg:text-9xl normal-case font-normal leading-[0.8] pr-4 py-2">
              cada detalle importa.
            </span>
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-10 md:mt-12 text-marfil/70 max-w-xl text-lg md:text-xl font-light leading-relaxed"
        >
          Más de una década convirtiendo ideas en arte permanente en un estudio privado,
          cuidado y diseñado para que cada pieza tenga intención.
        </p>

        <div
          ref={btnRef}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center"
        >
          <button
            onClick={() => setBookingOpen(true)}
            onMouseEnter={playClick}
            className="magnetic-btn px-8 py-4 bg-champagne text-obsidiana font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors duration-300 cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.25)] text-center"
          >
            Reservar consulta
          </button>
          <a
            href="#tatuajes"
            onMouseEnter={playClick}
            className="magnetic-btn px-8 py-4 border border-white/20 text-marfil font-bold uppercase text-sm tracking-widest hover:border-champagne hover:text-champagne transition-colors duration-300 cursor-pointer text-center"
          >
            Ver trabajos
          </a>
        </div>
      </div>

      <div
        ref={socialRef}
        className="relative z-10 w-full grid grid-cols-3 md:flex gap-4 md:gap-12 text-sm font-mono tracking-wider pb-10 md:pb-12"
      >
        <div className="flex flex-col">
          <span className="text-champagne font-bold text-xl">+33.9K</span>
          <span className="text-marfil/50 text-xs uppercase">seguidores</span>
        </div>
        <div className="flex flex-col">
          <span className="text-champagne font-bold text-xl">4.8</span>
          <span className="text-marfil/50 text-xs uppercase">Google</span>
        </div>
        <div className="flex flex-col">
          <span className="text-champagne font-bold text-xl">+215</span>
          <span className="text-marfil/50 text-xs uppercase">reseñas</span>
        </div>
      </div>
    </section>

    <BookingForm isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
