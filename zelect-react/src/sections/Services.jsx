import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, ArrowUpRight } from 'lucide-react';

export default function Services() {
  const [openService, setOpenService] = useState(0);

  const serviceList = [
    {
      title: 'Brand Identity Design',
      desc: 'We craft unique visual stories and professional brand guidelines that ensure your business stands out. From logos to complete design systems.',
      features: ['Logo Design & Icons', 'Color Palette & Typography', 'Stationery & Business Cards', 'Brand Style Guides'],
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'UI/UX Strategy & Design',
      desc: 'Our team creates intuitive, user-friendly digital interfaces that provide seamless experiences across every modern device platform.',
      features: ['User Research & Personas', 'Wireframing & Prototyping', 'High-Fidelity Interface Design', 'Usability Testing'],
      img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Custom Web Development',
      desc: 'We build high-performance, fast-loading React websites that are fully optimized for SEO and modern responsive behavior.',
      features: ['React & NextJS builds', 'Tailwind CSS & CSS Modifiers', 'GSAP & Webgl Motion Design', 'SEO & Headless CMS Integration'],
      img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Digital Marketing & Growth',
      desc: 'We execute data-driven digital marketing campaigns that maximize customer engagement and scale conversion metrics globally.',
      features: ['SEO Audit & Optimization', 'Social Media Branding', 'Content Marketing Strategy', 'Performance Analytics'],
      img: 'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/20">
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#00BFFF]/5 to-transparent blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Services</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-black leading-none uppercase text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">Expertise</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm">
            We provide end-to-end creative solutions tailored to your brand, ensuring every digital touchpoint resonates with excellence.
          </p>
        </div>

        {/* Services Accordion List (Olyyx style) */}
        <div className="flex flex-col border-t border-[#1B3B2B]/40">
          {serviceList.map((service, index) => {
            const isOpen = openService === index;
            return (
              <div 
                key={index} 
                className="border-b border-[#1B3B2B]/40 py-8 transition-all duration-300"
              >
                <div 
                  onClick={() => setOpenService(isOpen ? null : index)}
                  className="flex justify-between items-center cursor-pointer group"
                >
                  <h3 className={`text-xl md:text-2xl font-display font-bold uppercase tracking-wide transition-all ${
                    isOpen ? 'text-[#00BFFF]' : 'text-white hover:text-[#00BFFF]'
                  }`}>
                    {service.title}
                  </h3>
                  <button className="w-10 h-10 rounded-full border border-[#1B3B2B] hover:border-[#00BFFF] flex items-center justify-center text-white hover:text-[#00BFFF] transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>

                {/* Collapsible content */}
                {isOpen && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 pt-6 border-t border-[#1B3B2B]/20 animate-in fade-in slide-in-from-top-4 duration-300">
                    
                    {/* Left: Text & Features list */}
                    <div className="lg:col-span-7 space-y-6">
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                        {service.desc}
                      </p>
                      
                      <ul className="grid grid-cols-2 gap-4">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Media showcase card */}
                    <div className="lg:col-span-5 flex justify-end">
                      <div className="relative rounded-2xl overflow-hidden border border-[#1B3B2B]/80 max-w-sm shadow-xl w-full aspect-[16/10]">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081C15]/40 to-transparent"></div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
