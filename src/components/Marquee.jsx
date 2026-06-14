import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ITEMS = [
  "BALENCIAGA", "SAINT LAURENT", "VOGUE", "GQ", "HYPEBEAST", "BANG & OLUFSEN", 
  "AESOP", "APPLE", "THE WEEKND"
];

export default function Marquee() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      gsap.to(q(".marquee-track"), {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden border-y border-white/5 bg-secondary-900/50">
      <div ref={containerRef} className="flex whitespace-nowrap">
        <div className="marquee-track flex gap-12 md:gap-24 items-center pl-12 md:pl-24">
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="text-xl md:text-2xl font-sans tracking-[0.2em] text-marfil/20 font-medium hover:text-marfil/80 transition-colors duration-500 cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
