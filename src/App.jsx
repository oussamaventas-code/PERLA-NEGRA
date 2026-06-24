import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import ConversionPrompt from './components/ConversionPrompt';
import TestimonialRotator from './components/TestimonialRotator';
import Academia from './components/Academia';
import AcademiaVideo from './components/AcademiaVideo';
import Team from './components/Team';
import Experience from './components/Experience';
import LaserRemoval from './components/LaserRemoval';
import FAQ from './components/FAQ';
import VideoShowcase from './components/VideoShowcase';
// Módulos ocultados (no encajan con un estudio de tatuajes); los archivos siguen
// disponibles por si se quieren recuperar:
// import Comparison from './components/Comparison';
// import Dashboard from './components/Dashboard';
import CTAFinal from './components/CTAFinal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

function App() {
  // La intro solo se muestra una vez por sesión; en navegaciones repetidas entra directo
  const [isPreloading, setIsPreloading] = useState(
    () => !sessionStorage.getItem('pn-intro-vista')
  );

  return (
    <>
      {/* Noise overlay visible throughout the luxury experience */}
      <div className="noise-overlay"></div>

      {/* Cinematic intro loader */}
      {isPreloading && (
        <Preloader
          onComplete={() => {
            sessionStorage.setItem('pn-intro-vista', '1');
            setIsPreloading(false);
          }}
        />
      )}

      {/* High-end interactive cursor */}
      <CustomCursor />

      {/* Main website page wrapper */}
      <div 
        style={{ 
          opacity: isPreloading ? 0 : 1,
          visibility: isPreloading ? 'hidden' : 'visible',
          transition: 'opacity 0.8s ease'
        }}
      >
        <Navbar />
        <main>
          {/* Hero Cinematográfico */}
          <Hero />

          {/* Marquee de confianza */}
          <Marquee />

          {/* Portfolio Inmersivo — prueba social (incluye famosos), va arriba */}
          <Portfolio />

          {/* Manifiesto */}
          <Manifesto />

          {/* Equipo */}
          <Team />

          {/* Academia */}
          <Academia />

          {/* Vídeo vertical de la academia */}
          <AcademiaVideo />

          {/* Experiencia Perla Negra — Proceso Sticky Stack */}
          <Experience />

          {/* Precios orientativos */}
          <Pricing />

          {/* Testimonios Rotativos */}
          <TestimonialRotator />

          {/* Eliminación Láser */}
          <LaserRemoval />

          {/* Sección de vídeo — el estudio en movimiento */}
          <VideoShowcase />

          {/* FAQ */}
          <FAQ />

          {/* Refuerzo de conversión + CTA Final */}
          <ConversionPrompt />
          <CTAFinal />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
