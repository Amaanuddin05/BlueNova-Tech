import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger to shift the marquee track on scroll
    gsap.to(trackRef.current, {
      xPercent: -15, // Extra offset shift based on scroll
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }, []);

  const logos = [
    { name: 'Stripe', style: 'text-white' },
    { name: 'Linear', style: 'text-[#00BFFF]' },
    { name: 'Vercel', style: 'text-white font-mono' },
    { name: 'Framer', style: 'text-[#38BDF8]' },
    { name: 'Webflow', style: 'text-white' },
    { name: 'Notion', style: 'text-[#00BFFF] font-serif' },
    { name: 'Figma', style: 'text-white' },
  ];

  // Repeat logos to make sure the track is filled
  const doubleLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 bg-[#0B1F18] border-y border-[#1B3B2B]/40 overflow-hidden z-10"
    >
      {/* Background soft glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#081C15] via-transparent to-[#081C15] pointer-events-none z-10"></div>
      
      <div className="w-full flex items-center justify-center">
        {/* Infinite scrolling track container */}
        <div className="marquee-wrapper overflow-hidden flex w-full relative">
          
          <div 
            ref={trackRef} 
            className="flex gap-16 items-center whitespace-nowrap will-change-transform duration-100"
          >
            {doubleLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 select-none opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 group"
              >
                {/* Visual indicator / custom logo mark */}
                <div className="w-2 h-2 rounded-full bg-[#00BFFF] group-hover:shadow-[0_0_8px_rgba(0,191,255,0.8)] transition-all"></div>
                <span className={`text-sm md:text-lg font-display font-extrabold uppercase tracking-widest ${logo.style}`}>
                  {logo.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Dynamic CSS marquee loop keyframe added to support infinite layout */}
      <style>{`
        .marquee-wrapper {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}</style>
    </section>
  );
}
