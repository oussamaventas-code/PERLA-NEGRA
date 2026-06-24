import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  // En pantallas pequeñas o con movimiento reducido mostramos el póster en vez del vídeo
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShowVideo(desktop.matches && !reducedMotion.matches);
    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        q('.vs-reveal'),
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
        q('.vs-frame'),
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
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
      id="video"
      className="relative w-full py-28 md:py-40 px-8 md:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidiana via-[#08080D] to-obsidiana z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <span className="vs-reveal inline-block text-xs uppercase tracking-[0.5em] text-champagne/50 font-mono mb-6">
            Detrás del arte
          </span>
          <h2 className="vs-reveal text-4xl md:text-6xl lg:text-7xl font-drama italic text-marfil leading-[1.05]">
            El estudio <span className="text-gradient-gold">en movimiento.</span>
          </h2>
        </div>

        <div className="vs-frame relative aspect-[2.35/1] w-full overflow-hidden rounded-sm border border-champagne/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          {showVideo ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-top"
              poster="/hero-bg.webp"
            >
              <source src="/HERO/video-2.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src="/hero-bg.webp"
              alt="Estudio Perla Negra"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidiana/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
