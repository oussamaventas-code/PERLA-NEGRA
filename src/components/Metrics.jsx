import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 215, suffix: '+', label: 'Reseñas verificadas' },
  { value: 33.9, suffix: 'K', label: 'Seguidores', decimals: 1 },
  { value: 1700, suffix: '+', label: 'Publicaciones' },
  { value: 4.8, suffix: '', label: 'Valoración media', decimals: 1 },
];

export default function Metrics() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count-up animations for each metric
      metrics.forEach((metric, i) => {
        const numEl = numberRefs.current[i];
        if (!numEl) return;

        const counter = { val: 0 };
        const decimals = metric.decimals || 0;

        gsap.to(counter, {
          val: metric.value,
          duration: 2.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            numEl.textContent = counter.val.toFixed(decimals) + metric.suffix;
          },
        });
      });

      // Stagger-in animation for each metric card
      gsap.fromTo(
        itemRefs.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax for the background glow orbs
      gsap.to('.metrics-glow-1', {
        yPercent: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.metrics-glow-2', {
        yPercent: 25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-8 md:px-16 lg:px-24 bg-obsidiana overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/50 via-obsidiana to-obsidiana pointer-events-none" />
      <div className="metrics-glow-1 absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="metrics-glow-2 absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-champagne/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title label */}
        <div className="text-center mb-20 md:mb-28">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.4em] text-champagne/60 border border-champagne/15 rounded-full px-6 py-2">
            Números que hablan
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {/* Center cross separator lines */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-champagne/15 to-transparent" />
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />

          {metrics.map((metric, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="relative group"
            >
              {/* Mobile separator */}
              {i > 0 && (
                <div className="md:hidden w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />
              )}

              <div className="flex flex-col items-center justify-center py-16 md:py-24 lg:py-28 px-6 text-center">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-champagne/0 group-hover:bg-champagne/[0.02] transition-colors duration-700 pointer-events-none" />

                {/* Number */}
                <span
                  ref={(el) => (numberRefs.current[i] = el)}
                  className="text-7xl md:text-8xl lg:text-9xl font-mono font-bold text-gradient-gold leading-none tracking-tight"
                >
                  0{metric.suffix}
                </span>

                {/* Champagne glow behind number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-champagne/[0.04] rounded-full blur-[80px] pointer-events-none group-hover:bg-champagne/[0.07] transition-all duration-700" />

                {/* Label */}
                <span className="mt-5 text-xs md:text-sm uppercase tracking-[0.25em] text-marfil/50 font-light">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
