import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger to highlight words on scroll (Olyyx style)
    const words = textRef.current.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { opacity: 0.15, color: '#1B3B2B' },
      {
        opacity: 1,
        color: '#FFFFFF',
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        }
      }
    );

    // Specific highlight classes for keywords
    const highlights = textRef.current.querySelectorAll('.highlight-word');
    gsap.fromTo(highlights,
      { color: '#1B3B2B', textShadow: '0 0 0px rgba(0, 191, 255, 0)' },
      {
        color: '#00BFFF',
        textShadow: '0 0 15px rgba(0, 191, 255, 0.4)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 bg-transparent overflow-hidden z-10"
    >
      {/* Background radial highlight orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#00BFFF]/5 to-transparent blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side: Section Label info */}
        <div className="lg:col-span-3 flex flex-col justify-start items-start">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-pulse"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest">About Us</span>
          </div>
          <h3 className="font-display font-bold text-lg text-slate-400 uppercase tracking-widest hidden lg:block mt-2">
            The Vision
          </h3>
        </div>

        {/* Right Side: Typographic composition with animated scroll-highlights */}
        <div className="lg:col-span-9 flex flex-col justify-start items-start gap-12">
          
          <h2 
            ref={textRef} 
            className="text-[clamp(1.8rem,4vw,3.5rem)] font-display font-bold leading-snug tracking-tight text-left"
          >
            {/* Split paragraph into targetable span structures */}
            {"Olyyx is a ".split(' ').map((w, i) => <span key={`w1-${i}`} className="reveal-word inline-block mr-3">{w}</span>)}
            <span className="highlight-word inline-block mr-3 transition-all duration-300 font-black">dynamic agency</span>
            {"turning ".split(' ').map((w, i) => <span key={`w2-${i}`} className="reveal-word inline-block mr-3">{w}</span>)}
            <span className="highlight-word inline-block mr-3 transition-all duration-300 font-black">visionary ideas</span>
            {"into ".split(' ').map((w, i) => <span key={`w3-${i}`} className="reveal-word inline-block mr-3">{w}</span>)}
            <span className="highlight-word inline-block mr-3 transition-all duration-300 font-black">impactful digital experiences</span>
            {"through ".split(' ').map((w, i) => <span key={`w4-${i}`} className="reveal-word inline-block mr-3">{w}</span>)}
            <span className="highlight-word inline-block mr-3 transition-all duration-300 font-black">innovative design</span>
            {"and engineering solutions that scale global brands.".split(' ').map((w, i) => <span key={`w5-${i}`} className="reveal-word inline-block mr-3">{w}</span>)}
          </h2>

          {/* Interactive Button */}
          <div className="reveal">
            <a 
              href="#" 
              className="relative inline-flex items-center gap-3 px-8 py-4.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#0B1F18] border border-[#1B3B2B] hover:border-[#00BFFF]/50 overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <div className="relative h-4 overflow-hidden flex flex-col items-center">
                <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full text-[#ffffff]">
                  Learn More
                </span>
                <span className="absolute top-0 left-0 transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-[#00BFFF]">
                  Our Story
                </span>
              </div>
              
              <div className="relative w-4 h-4 overflow-hidden">
                <ArrowRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:-translate-y-full text-[#ffffff]" />
                <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-[#00BFFF]" />
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
