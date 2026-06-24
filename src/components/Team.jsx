import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingForm from './BookingForm';
import { playClick } from '../utils/soundController';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Juande Gambín',
    role: 'Fundador & Artista',
    experience: '15 años',
    image: '/team/artist1.webp',
  },
  {
    name: 'Kore',
    role: 'Especialista en Realismo',
    experience: '8 años',
    image: '/team/artist2.webp',
  },
  {
    name: 'Pablo',
    role: 'Especialista en Blackwork',
    experience: '10 años',
    image: '/team/artist3.webp',
  },
  {
    name: 'Fabio Climent',
    role: 'Fine Line & Microrealismo',
    experience: '6 años',
    image: '/team/artist4.webp',
  },
];

export default function Team() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const [bookingArtist, setBookingArtist] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipo"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-8 md:px-24 bg-obsidiana overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-champagne/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-drama italic text-marfil leading-[0.95]"
          >
            Los{' '}
            <span className="text-gradient-gold">artistas</span>
          </h2>

          <p
            ref={subtitleRef}
            className="mt-8 text-lg md:text-xl text-marfil/50 max-w-xl mx-auto font-light leading-relaxed"
          >
            Cada artista aporta una visión única
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group glass-panel rounded-[2rem] overflow-hidden cursor-default transition-[border-color,box-shadow] duration-500 hover:border-champagne/30 hover:shadow-[0_0_50px_-10px_rgba(201,168,76,0.2)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidiana via-obsidiana/40 to-transparent opacity-80" />

                <div className="absolute top-5 right-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne/50 bg-obsidiana/60 backdrop-blur-sm border border-champagne/10 px-3 py-1.5 rounded-full">
                    {member.experience}
                  </span>
                </div>

              <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-xl md:text-2xl font-bold text-marfil tracking-tight leading-tight">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-champagne/80 font-light">
                    {member.role}
                  </p>

                  <div className="mt-5 w-10 h-px bg-champagne/30 group-hover:w-full transition-all duration-700 ease-out" />

                  <button
                    id={`reservar-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => { setBookingArtist(member.name); playClick(); }}
                    onMouseEnter={playClick}
                    className="mt-5 w-full py-2.5 rounded-xl border border-champagne/20 text-champagne/70 hover:bg-champagne hover:text-obsidiana hover:border-champagne text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    Reservar con {member.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingForm
        isOpen={bookingArtist !== null}
        onClose={() => setBookingArtist(null)}
        preArtist={bookingArtist || ''}
      />
    </section>
  );
}
