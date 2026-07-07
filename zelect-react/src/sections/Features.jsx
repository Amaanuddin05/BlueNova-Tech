import { useEffect, useRef } from 'react';
import { Award, Target, Zap, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Staggered reveal for feature cards
    gsap.fromTo('.feature-card-item',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
        }
      }
    );
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const featureItems = [
    {
      icon: <Award className="w-6 h-6 text-[#00BFFF]" />,
      title: 'Creative Excellence',
      desc: 'We bring a unique blend of creativity and technical strategy to build memorable custom SaaS products.'
    },
    {
      icon: <Target className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Client Centric',
      desc: 'Your vision is our blueprint. We iterate fast and maintain continuous feedback loops.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#00BFFF]" />,
      title: 'Fast Delivery',
      desc: 'We optimize build pipelines and leverage modern architectures to ship production apps rapidly.'
    },
    {
      icon: <Users className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Expert Team',
      desc: 'Our senior developers and designers are veterans of top-tier global tech agencies.'
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/20"
    >
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#38BDF8]/5 to-transparent blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Why Us</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-black leading-none uppercase text-white tracking-tight">
              Why <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">Choose Us</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm">
            We merge high-end visual design with production-grade engineering to deliver outcomes that drive success.
          </p>
        </div>

        {/* Feature Cards Grid (Staggered offsets like Olyyx) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureItems.map((item, index) => (
            <div 
              key={index}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              className={`feature-card-item glow-card glass-panel rounded-3xl p-8 border border-[#1B3B2B]/50 transition-all duration-300 relative group overflow-hidden ${
                index % 2 === 0 ? 'lg:-translate-y-4' : 'lg:translate-y-4'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0E241D] border border-[#1B3B2B] flex items-center justify-center mb-6 group-hover:border-[#00BFFF]/50 group-hover:shadow-[0_0_12px_rgba(0,191,255,0.2)] transition-all">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-[#00BFFF] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
