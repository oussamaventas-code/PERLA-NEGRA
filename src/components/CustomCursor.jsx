import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'drag', 'view', 'close'
  // Ref espejo para leer el tipo dentro de los listeners sin re-registrarlos
  const cursorTypeRef = useRef('default');

  useEffect(() => {
    // Si es un dispositivo táctil, no cargamos el cursor personalizado
    if (typeof window === 'undefined' || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Ocultar el puntero nativo
    document.documentElement.classList.add('cursor-none-all');
    
    // QuickTo de GSAP para un lag/inercia de movimiento ultra sedoso (como imán orgánico)
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power2.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power2.out" });
    
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    // Iniciar el cursor en una posición segura inicial para evitar saltos bruscos
    gsap.set(cursor, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(dot, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Caché de botones magnéticos en coordenadas de documento: evita
    // querySelectorAll + getBoundingClientRect en cada mousemove (reflows forzados)
    let magnets = [];
    const refreshMagnets = () => {
      magnets = Array.from(document.querySelectorAll('.magnetic-btn')).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          cx: rect.left + rect.width / 2 + window.scrollX,
          cy: rect.top + rect.height / 2 + window.scrollY,
          active: false,
        };
      });
    };
    refreshMagnets();
    // El layout puede moverse (preloader, imágenes, resize): refresco barato y espaciado
    window.addEventListener('resize', refreshMagnets);
    window.addEventListener('load', refreshMagnets);
    const magnetRefreshTimer = setInterval(refreshMagnets, 3000);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      xToCursor(clientX);
      yToCursor(clientY);
      xToDot(clientX);
      yToDot(clientY);

      const pageX = clientX + window.scrollX;
      const pageY = clientY + window.scrollY;
      let isNearAny = false;

      magnets.forEach((m) => {
        const dist = Math.hypot(pageX - m.cx, pageY - m.cy);

        if (dist < 65) {
          isNearAny = true;
          m.active = true;

          // Atraer el botón hacia el ratón
          gsap.to(m.el, {
            x: (pageX - m.cx) * 0.3,
            y: (pageY - m.cy) * 0.3,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });

          // Pegar el cursor levemente hacia el botón
          gsap.to(cursor, {
            scale: 1.3,
            borderColor: '#C9A84C',
            borderWidth: '1.5px',
            backgroundColor: 'rgba(201, 168, 76, 0.08)',
            duration: 0.3,
            overwrite: 'auto'
          });

          gsap.to(dot, {
            opacity: 0,
            duration: 0.2
          });
        } else if (m.active) {
          // Devolver el botón a su posición natural solo al salir del radio
          m.active = false;
          gsap.to(m.el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto'
          });
        }
      });

      if (!isNearAny && cursorTypeRef.current === 'default') {
        // Restaurar estado natural si no está cerca de un botón
        gsap.to(cursor, {
          scale: 1,
          borderColor: 'rgba(201, 168, 76, 0.4)',
          borderWidth: '1px',
          backgroundColor: 'transparent',
          duration: 0.3,
          overwrite: 'auto'
        });
        gsap.to(dot, {
          opacity: 1,
          duration: 0.2
        });
      }
    };

    const handleMouseOver = (e) => {
      // Comprobar si hay data-cursor en el nodo o sus ancestros directos
      const target = e.target.closest('[data-cursor]');
      const isButton = e.target.closest('button, a, input, select, textarea, .cursor-pointer');
      
      if (target) {
        const type = target.getAttribute('data-cursor');
        cursorTypeRef.current = type;
        setCursorType(type);
        if (type === 'drag') setCursorText('ARRASTRAR');
        else if (type === 'view') setCursorText('VER');
        else if (type === 'close') setCursorText('CERRAR');
        else setCursorText('');
      } else if (isButton) {
        cursorTypeRef.current = 'pointer';
        setCursorType('pointer');
        setCursorText('');
      } else {
        cursorTypeRef.current = 'default';
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', refreshMagnets);
      window.removeEventListener('load', refreshMagnets);
      clearInterval(magnetRefreshTimer);
      document.documentElement.classList.remove('cursor-none-all');
    };
  }, []);

  // Si no hay soporte táctil o dispositivo móvil, el render es vacío para evitar bugs en tablets
  if (typeof window !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0)) {
    return null;
  }

  // Estilos de visualización
  let cursorClass = "w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-champagne/40";
  let dotClass = "w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-champagne";

  if (cursorType === 'pointer') {
    cursorClass = "w-12 h-12 -translate-x-1/2 -translate-y-1/2 border border-champagne bg-champagne/[0.08] scale-100";
    dotClass = "w-0 h-0 opacity-0";
  } else if (cursorType === 'view' || cursorType === 'drag' || cursorType === 'close') {
    cursorClass = "w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-champagne border-transparent text-obsidiana font-mono font-bold text-[9px] tracking-widest flex items-center justify-center rounded-full scale-110 shadow-[0_0_20px_rgba(201,168,76,0.3)]";
    dotClass = "w-0 h-0 opacity-0";
  }

  return (
    <>
      {/* Outer tracking frame */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99999] transition-all duration-300 ease-out flex items-center justify-center ${cursorClass}`}
        style={{ willChange: 'transform' }}
      >
        {(cursorType === 'view' || cursorType === 'drag' || cursorType === 'close') && (
          <span className="animate-[cursorFadeIn_0.2s_ease-out]">{cursorText}</span>
        )}
      </div>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99999] transition-[width,height,opacity] duration-300 ${dotClass}`}
        style={{ willChange: 'transform' }}
      />

      <style>{`
        .cursor-none-all, .cursor-none-all * {
          cursor: none !important;
        }
        @keyframes cursorFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
