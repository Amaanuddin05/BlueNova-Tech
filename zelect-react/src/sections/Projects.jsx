import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    // ScrollTrigger to scale image containers
    const projectCards = containerRef.current.querySelectorAll('.project-card-wrapper');
    projectCards.forEach(card => {
      const img = card.querySelector('.project-img');
      gsap.fromTo(img,
        { scale: 1.1 },
        {
          scale: 1.0,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }, []);

  const projects = [
    {
      num: '01/04',
      title: 'Apex Nexus',
      tag: 'UI/UX Design',
      date: '20.05.2026',
      desc: 'An intuitive fintech interface designed to simplify complex digital transactions while maintaining a sleek and professional appearance.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02/04',
      title: 'Lumina Concept',
      tag: 'Brand Identity',
      date: '15.05.2026',
      desc: 'Turning complex ideas into smooth digital experiences with smart design and technology that links brands to people.',
      img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03/04',
      title: 'EcoSphere',
      tag: 'Web Development',
      date: '08.05.2026',
      desc: 'A high-performance, eco-friendly web platform built with optimized code to ensure lightning-fast speeds and global accessibility.',
      img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04/04',
      title: 'Velocity X',
      tag: 'Brand Strategy',
      date: '01.05.2026',
      desc: 'We executed a data-driven marketing campaign that maximized engagement and scaled brand presence across all social channels.',
      img: 'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/20"
    >
      <div className="absolute top-[30%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#00BFFF]/5 to-transparent blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Projects</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-black leading-none uppercase text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">Masterpieces</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm">
            Discover how we turn complex product concepts into seamless, award-winning user interfaces.
          </p>
        </div>

        {/* Tab switcher layout for desktop & simple listing on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: project details based on active state */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[350px]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#00BFFF] font-display">
                  {projects[activeProject].num}
                </span>
                <span className="h-[1px] w-8 bg-[#1B3B2B]"></span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {projects[activeProject].tag}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
                {projects[activeProject].title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {projects[activeProject].desc}
              </p>
            </div>

            {/* Quick switcher buttons list */}
            <div className="flex flex-col gap-3 mt-8">
              {projects.map((proj, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`text-left text-xs uppercase tracking-widest font-extrabold py-3 border-b transition-all duration-300 flex justify-between items-center ${
                    activeProject === index 
                      ? 'border-[#00BFFF] text-[#00BFFF] pl-2' 
                      : 'border-[#1B3B2B]/40 text-slate-500 hover:text-white'
                  }`}
                >
                  <span>{proj.title}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                    activeProject === index ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: project media wrapper */}
          <div className="lg:col-span-8">
            <div className="project-card-wrapper relative rounded-3xl overflow-hidden border border-[#1B3B2B]/80 group shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] max-w-2xl mx-auto">
              
              <img 
                src={projects[activeProject].img} 
                alt={projects[activeProject].title} 
                className="project-img w-full h-full object-cover project-img transition-transform duration-700 ease-out group-hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#081C15] via-transparent to-transparent opacity-80"></div>
              
              {/* Animated reveal details overlay (Olyyx detail view button) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <a 
                  href="#"
                  className="w-24 h-24 rounded-full bg-[#00BFFF] text-black font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center text-center shadow-[0_0_30px_rgba(0,191,255,0.6)] hover:scale-110 transition-transform"
                >
                  View<br/>Details
                </a>
              </div>

              {/* Floating year stamp */}
              <div className="absolute bottom-6 right-6 px-3 py-1 bg-[#0B1F18] border border-[#1B3B2B] rounded-full text-[10px] text-slate-400 font-bold">
                {projects[activeProject].date}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
