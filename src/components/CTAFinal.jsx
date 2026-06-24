import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';
import { playClick } from '../utils/soundController';

gsap.registerPlugin(ScrollTrigger);

function FloatingParticles({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          baseX: Math.random() * canvas.offsetWidth,
          baseY: Math.random() * canvas.offsetHeight,
          size: Math.random() * 1.8 + 0.6,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.35 + 0.05,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Guardar coordenadas de ratón relativas al canvas
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        // Movimiento por inercia natural
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.012;

        // Repulsión física si el ratón está cerca
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 130) {
          const force = (130 - dist) / 130;
          const angle = Math.atan2(dy, dx);
          // Empujar la partícula en dirección opuesta
          p.x += Math.cos(angle) * force * 2.2;
          p.y += Math.sin(angle) * force * 2.2;
        }

        // Límites y wrapping del lienzo
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [canvasRef]);

  return null;
}

export default function CTAFinal() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        q('.cta-label'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        q('.cta-title'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        q('.cta-subtitle'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        q('.cta-btn'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          delay: 0.45,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidiana via-[#08080D] to-[#030305] z-0" />
      <div className="absolute inset-0 bg-gradient-radial from-champagne/[0.03] via-transparent to-transparent z-0" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />
      <FloatingParticles canvasRef={canvasRef} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-champagne/30 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span className="cta-label inline-block text-xs uppercase tracking-[0.5em] text-champagne/50 font-mono mb-8">
          Empieza hoy
        </span>

        <h2 className="cta-title text-4xl md:text-6xl lg:text-8xl font-drama italic text-marfil leading-[1.05] mb-8">
          Tu próxima pieza{' '}
          <br className="hidden md:block" />
          <span className="text-gradient-gold">empieza aquí.</span>
        </h2>

        <p className="cta-subtitle text-lg md:text-xl text-marfil/55 font-light max-w-2xl mx-auto mb-14">
          Reserva una consulta y transforma una idea en algo permanente.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="https://wa.me/34648750092?text=Hola%20Perla%20Negra%2C%20quiero%20reservar%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playClick}
            className="magnetic-btn cta-btn group relative px-10 py-5 bg-champagne text-obsidiana font-bold uppercase text-sm tracking-widest overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] cursor-pointer"
          >
            <span className="relative z-10 pointer-events-none">Reservar Consulta</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </a>

          <a
            href="https://wa.me/34648750092?text=Hola%20Perla%20Negra%2C%20quiero%20hablar%20con%20el%20equipo."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playClick}
            className="magnetic-btn cta-btn group flex items-center gap-3 px-10 py-5 border border-champagne/40 text-champagne font-bold uppercase text-sm tracking-widest transition-all duration-500 hover:bg-champagne hover:text-obsidiana hover:border-champagne hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] cursor-pointer"
          >
            <Phone className="w-4 h-4 pointer-events-none" strokeWidth={2} />
            <span className="pointer-events-none">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-transparent via-champagne/20 to-transparent" />
    </section>
  );
}
