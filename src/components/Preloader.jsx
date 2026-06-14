import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const logoPathRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = 'hidden';

    // SVG path drawing animation
    if (logoPathRef.current) {
      const length = logoPathRef.current.getTotalLength();
      gsap.set(logoPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(logoPathRef.current, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power1.inOut',
      });
    }

    // Number counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
      },
      onComplete: () => {
        // High-end shutter slide-up animation using clipPath
        gsap.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          },
        });
      },
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-obsidiana z-[99999] flex flex-col items-center justify-center select-none"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-[#12121A] via-transparent to-transparent pointer-events-none opacity-40" />

      {/* Luxury Monogram Logo */}
      <div className="relative mb-12 flex flex-col items-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]"
        >
          {/* Circular frame background */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="rgba(201, 168, 76, 0.1)"
            strokeWidth="1"
          />
          {/* Animated luxury letter mark (P + N stylized) */}
          <path
            ref={logoPathRef}
            d="M38 28V72M38 28H54C62 28 66 33 66 39C66 45 61 50 54 50H38M38 50L64 72"
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="mt-6 font-drama text-marfil tracking-[0.4em] uppercase text-sm leading-none opacity-80">
          Perla Negra
        </h1>
        <span className="mt-1.5 font-mono text-[9px] text-champagne/50 tracking-[0.55em] uppercase leading-none">
          Estudio Privado
        </span>
      </div>

      {/* Percentage Loader */}
      <div className="relative flex flex-col items-center">
        <span
          ref={percentRef}
          className="font-mono text-5xl md:text-6xl font-bold text-champagne tracking-tighter leading-none"
        >
          {String(percent).padStart(3, '0')}
        </span>
        <div className="w-24 h-[1px] bg-white/10 mt-4 overflow-hidden rounded-full">
          <div
            className="h-full bg-champagne transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="mt-3 font-mono text-[10px] text-marfil/30 tracking-widest uppercase">
          Inicializando Experiencia
        </span>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-10 text-[9px] font-mono text-marfil/25 tracking-widest uppercase">
        Molina de Segura · Murcia
      </div>
    </div>
  );
}
