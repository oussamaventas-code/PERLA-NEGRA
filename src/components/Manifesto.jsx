import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  const text1 = "La mayoría de estudios venden tatuajes.";
  const text2 = "Nosotros construimos símbolos que cuentan historias.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const words = q(".manifesto-word");
      
      // Apple-like scroll text reveal: words light up in place dynamically as you scroll
      gsap.fromTo(
        words,
        { 
          opacity: 0.08,
          filter: 'blur(3px)',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.25,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 55%",
            scrub: 0.8,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = (text, isGold = false) => {
    return text.split(' ').map((word, index) => (
      <span 
        key={index} 
        className={`inline-block manifesto-word mr-3 md:mr-4 lg:mr-6 transition-colors duration-300 ${
          isGold ? 'text-champagne font-drama italic normal-case font-normal' : 'text-marfil'
        }`}
        style={{ willChange: 'opacity, filter' }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-40 md:py-56 px-8 md:px-24 bg-obsidiana flex items-center justify-center min-h-[90vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.015] via-transparent to-transparent pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl w-full text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[1.3] md:leading-[1.2] text-marfil select-none">
          {/* First part - dimmed white text */}
          <div className="mb-10 text-marfil/30 flex flex-wrap justify-center">
            {renderWords(text1)}
          </div>
          {/* Second part - champagne gold italic text */}
          <div className="flex flex-wrap justify-center">
            {renderWords(text2, true)}
          </div>
        </h2>
      </div>
    </section>
  );
}
