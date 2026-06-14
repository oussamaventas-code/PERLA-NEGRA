import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Comparison from './components/Comparison';
import Dashboard from './components/Dashboard';
import TestimonialRotator from './components/TestimonialRotator';
import Academia from './components/Academia';
import Team from './components/Team';
import Experience from './components/Experience';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';
import LaserRemoval from './components/LaserRemoval';
import FAQ from './components/FAQ';
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

          {/* Manifiesto */}
          <Manifesto />

          {/* Precios orientativos */}
          <Pricing />

          {/* Portfolio Inmersivo */}
          <Portfolio />

          {/* Micro UI #1 — Comparador */}
          <Comparison />

          {/* Micro UI #2 — Dashboard KPIs */}
          <Dashboard />

          {/* Micro UI #3 — Testimonios Rotativos */}
          <TestimonialRotator />

          {/* Academia */}
          <Academia />

          {/* Equipo */}
          <Team />

          {/* Experiencia Perla Negra — Proceso Sticky Stack */}
          <Experience />

          {/* Métricas Gigantes */}
          <Metrics />

          {/* Testimonios Editoriales */}
          <Testimonials />

          {/* Eliminación Láser */}
          <LaserRemoval />

          {/* FAQ */}
          <FAQ />

          {/* CTA Final */}
          <CTAFinal />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
