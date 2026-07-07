import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Features from './sections/Features';
import Projects from './sections/Projects';
import Services from './sections/Services';
import FAQ from './sections/FAQ';
import Blogs from './sections/Blogs';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ForestBackground from './components/ForestBackground';
import AudioToggle from './components/AudioToggle';

function App() {
  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#00BFFF]/30 selection:text-white relative">
      <ForestBackground />
      <AudioToggle />
      {/* Background fixed lines indicator */}
      <div className="bg-fixed-lines">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-4 border-l border-r border-[#1B3B2B]/20">
          <div className="border-r border-[#1B3B2B]/20 h-full"></div>
          <div className="border-r border-[#1B3B2B]/20 h-full"></div>
          <div className="border-r border-[#1B3B2B]/20 h-full"></div>
        </div>
      </div>

      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Brand Marquee */}
      <Marquee />

      {/* About Us typographic narrative */}
      <About />

      {/* Why Choose Us feature grid */}
      <Features />

      {/* Masterpieces projects showcases */}
      <Projects />

      {/* Services expansions */}
      <Services />

      {/* FAQs */}
      <FAQ />

      {/* Blogs grid */}
      <Blogs />

      {/* Footer & CTA */}
      <Footer />
    </div>
  );
}

export default App;
