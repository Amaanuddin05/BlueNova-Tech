import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, Play, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const btnRef = useRef(null);
  const imgContainerRef = useRef(null);
  const imageRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  // Load animation and scroll triggers
  useEffect(() => {
    // 1. Text reveals
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.hero-label-reveal',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
    );

    // Split text effect for headings
    const chars1 = title1Ref.current.querySelectorAll('.char');
    const chars2 = title2Ref.current.querySelectorAll('.char');

    tl.fromTo(chars1,
      { y: '100%', opacity: 0, filter: 'blur(5px)' },
      { y: '0%', opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.04 },
      '-=0.5'
    );

    tl.fromTo(chars2,
      { y: '100%', opacity: 0, filter: 'blur(5px)' },
      { y: '0%', opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.04 },
      '-=0.6'
    );

    tl.fromTo(descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.8, duration: 0.8 },
      '-=0.5'
    );

    tl.fromTo(btnRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    tl.fromTo(statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Floating cards zoom in
    tl.fromTo([card1Ref.current, card2Ref.current],
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.15 },
      '-=0.6'
    );

    // 2. Parallax zoom on the hero banner image
    gsap.fromTo(imageRef.current,
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // 3. Mouse move interactive parallax (tilt effect for floating cards)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(card1Ref.current, {
        x: xPos * 0.8,
        y: yPos * 0.8,
        rotationY: xPos * 0.2,
        rotationX: -yPos * 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.to(card2Ref.current, {
        x: -xPos * 1.2,
        y: -yPos * 1.2,
        rotationY: -xPos * 0.3,
        rotationX: yPos * 0.3,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split word strings helper for CSS-masked animation
  const splitString = (str) => {
    return str.split('').map((char, index) => (
      <span key={index} className="inline-block char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-transparent overflow-hidden flex flex-col justify-between pt-32 pb-16">
      
      {/* Background radial glowing orbs (Olyyx style) */}
      <div className="absolute top-[-10%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#00BFFF]/10 to-transparent blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#38BDF8]/8 to-transparent blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 my-auto">
        
        {/* Left Typography Block */}
        <div className="lg:col-span-8 flex flex-col justify-center items-start text-left">
          
          {/* Label with icon */}
          <div className="hero-label-reveal flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-8 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            <Play className="w-3.5 h-3.5 fill-[#00BFFF]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Design Without Limits</span>
          </div>

          {/* Large overlapping headings */}
          <h2 ref={title1Ref} className="text-[clamp(3.5rem,8vw,7.5rem)] font-display font-black leading-[0.9] text-white tracking-tight uppercase overflow-hidden mb-2">
            {splitString("DIGITAL")}
          </h2>
          <h1 ref={title2Ref} className="text-[clamp(3.5rem,8vw,7.5rem)] font-display font-black leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0] tracking-tight uppercase overflow-hidden mb-8 shadow-sm">
            {splitString("CREATIVE")}
          </h1>

          {/* Social review stats (Olyyx style) */}
          <div ref={statsRef} className="flex items-center gap-4 border-l border-[#1B3B2B] pl-6 mt-2">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full border-2 border-[#081C15] object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full border-2 border-[#081C15] object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full border-2 border-[#081C15] object-cover" alt="" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="flex text-[#00BFFF]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-xs font-bold text-white ml-1">4.8/5</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Based on 4k verified reviews</span>
            </div>
          </div>

        </div>

        {/* Right Content Block (visually asymmetrical composition) */}
        <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end text-left lg:text-right gap-6">
          <p ref={descRef} className="text-slate-300 text-sm md:text-base max-w-sm leading-relaxed">
            We connect creative imagination with digital reality with precision, building high-end interfaces that drive growth.
          </p>

          <div ref={btnRef} className="mt-2">
            <a 
              href="#" 
              className="relative inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-[#00BFFF] hover:bg-[#38BDF8] overflow-hidden group shadow-[0_10px_30px_rgba(0,191,255,0.3)] transition-all duration-300"
            >
              {/* Slide text effect */}
              <div className="relative h-4 overflow-hidden flex flex-col items-center">
                <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full text-black">
                  Start A Project
                </span>
                <span className="absolute top-0 left-0 transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-black">
                  Let's Begin
                </span>
              </div>
              
              <div className="relative w-4 h-4 overflow-hidden">
                <ArrowRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:-translate-y-full text-black" />
                <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-black" />
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Hero Bottom Image & Interactive Showcase (Subtle Parallax) */}
      <div ref={imgContainerRef} className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 relative">
        <div className="relative rounded-3xl overflow-hidden border border-[#1B3B2B]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-[320px] md:h-[500px]">
          {/* Main Showcase Image (placeholder replaced with beautiful gradient abstract canvas) */}
          <div 
            ref={imageRef} 
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')`
            }}
          >
            {/* Luminous lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081C15] via-[#081C15]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-[#00BFFF]/5 mix-blend-color-dodge"></div>
          </div>

          {/* Left Floating Card */}
          <div 
            ref={card1Ref} 
            className="absolute bottom-10 left-6 md:left-12 glass-panel p-5 rounded-2xl border border-[#1B3B2B]/80 max-w-xs shadow-2xl backdrop-blur-md hidden md:block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00BFFF]"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00BFFF]">Creative Engine</span>
            </div>
            <p className="text-white font-display font-bold text-sm leading-snug">
              "Redefining interaction paradigms for SaaS products worldwide."
            </p>
          </div>

          {/* Right Floating Card */}
          <div 
            ref={card2Ref} 
            className="absolute top-10 right-6 md:right-12 glass-panel p-5 rounded-2xl border border-[#1B3B2B]/80 max-w-xs shadow-2xl backdrop-blur-md hidden md:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Total Valuation</span>
            </div>
            <div className="text-white font-display font-black text-2xl mb-1">$45.8K</div>
            <div className="w-full h-1 bg-[#1B3B2B] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0] w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
