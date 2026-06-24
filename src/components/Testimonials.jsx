import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Sara M.',
    text: 'Llevaba años buscando un estudio que entendiera lo que quería. Desde el primer momento, el equipo de Perla Negra captó mi visión. El resultado superó cualquier expectativa. Es mucho más que un tatuaje, es una obra de arte.',
    rating: 5,
    service: 'Realismo',
  },
  {
    name: 'Rubén T.',
    text: 'La experiencia completa fue impresionante. Desde la consulta inicial hasta el resultado final, cada paso fue profesional y cuidado. Juande es un verdadero artista. Ya estoy planificando mi próxima pieza.',
    rating: 5,
    service: 'Blackwork',
  },
  {
    name: 'Cristina L.',
    text: 'Tenía mucho miedo porque era mi primer tatuaje. El equipo me hizo sentir completamente segura. Me explicaron todo el proceso y el resultado es absolutamente perfecto. No podría estar más feliz.',
    rating: 5,
    service: 'Fine Line',
  },
  {
    name: 'Alejandro F.',
    text: 'He ido a muchos estudios, pero Perla Negra está en otro nivel. La atención al detalle, la higiene, el ambiente del estudio... todo transmite calidad. Mis dos mangas las he hecho aquí y no cambiaría por nada.',
    rating: 5,
    service: 'Manga completa',
  },
  {
    name: 'Miriam J.',
    text: 'La eliminación láser fue increíble. Tenía un tatuaje antiguo que me arrepentía y en pocas sesiones prácticamente desapareció. El equipo fue muy profesional y el proceso menos doloroso de lo que esperaba.',
    rating: 5,
    service: 'Eliminación Láser',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.context(() => {
      gsap.fromTo('.testimonials-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
    }, sectionRef);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: `-${current * 100}%`,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [current]);

  const next = () => setCurrent((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-obsidiana overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.03] via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="testimonials-header text-center mb-16 md:mb-24">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.35em] text-champagne/60 mb-6">Lo que dicen de nosotros</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            <span className="text-gradient">Voces </span>
            <span className="font-drama italic text-champagne normal-case font-normal">reales</span>
          </h2>
        </div>

        <div className="relative">
          {/* Carousel container */}
          <div className="overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            <div ref={trackRef} className="flex" style={{ width: `${TESTIMONIALS.length * 100}%` }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full px-2" style={{ flex: `0 0 ${100 / TESTIMONIALS.length}%` }}>
                  <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
                    {/* Decorative quote */}
                    <span className="absolute top-6 left-10 text-[8rem] md:text-[12rem] leading-none font-drama text-champagne/[0.06] select-none pointer-events-none">&ldquo;</span>
                    
                    <div className="relative z-10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-8">
                        {Array.from({ length: t.rating }, (_, j) => (
                          <Star key={j} className="w-5 h-5 fill-champagne text-champagne" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl lg:text-3xl font-drama italic text-marfil/90 leading-relaxed mb-10 max-w-4xl">
                        &ldquo;{t.text}&rdquo;
                      </blockquote>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-marfil font-semibold text-lg">{t.name}</p>
                        <p className="text-champagne/70 text-sm font-mono tracking-wider uppercase">{t.service}</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-xs text-marfil/50 font-mono">Reseña verificada</span>
                      </div>
                    </div>

                    {/* Background glow */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:border-champagne/40 hover:bg-white/5 transition-all duration-300 group">
              <ChevronLeft className="w-5 h-5 text-marfil/60 group-hover:text-champagne transition-colors" />
            </button>
            
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ?
                       'w-10 bg-champagne shadow-[0_0_10px_rgba(201,168,76,0.5)]'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button onClick={next} className="p-3 rounded-full border border-white/10 hover:border-champagne/40 hover:bg-white/5 transition-all duration-300 group">
              <ChevronRight className="w-5 h-5 text-marfil/60 group-hover:text-champagne transition-colors" />
            </button>
          </div>
          {/* Google Reviews CTA */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Perla+Negra+Tattoo+Molina+de+Segura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 hover:border-champagne/30 text-sm text-marfil/50 hover:text-champagne transition-all duration-300 font-mono group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Ver las <strong className="text-marfil group-hover:text-champagne transition-colors">215 reseñas</strong> en Google
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
