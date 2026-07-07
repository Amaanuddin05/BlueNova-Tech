import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What types of creative projects do you accept?',
      a: 'We work primarily with tech startups, scale-ups, and established brands. We specialize in digital product design, web applications, custom marketing assets, and brand design guidelines.'
    },
    {
      q: 'What is your standard design and build timeline?',
      a: 'A typical project spans 4 to 8 weeks. This includes the strategy phase, custom UI/UX design wireframes, client feedback loops, and production deployment using high-performance React builds.'
    },
    {
      q: 'Do you offer hybrid and remote collaboration?',
      a: 'Yes, we are a global creative agency. We work remotely with tools like Figma, Slack, and Zoom, and maintain regular sprint reviews and communication channels.'
    },
    {
      q: 'Can you help redesign an existing product?',
      a: 'Absolutely. We conduct code and visual reviews of your current product, identify usability gaps, and implement complete layout, styling, and design system upgrades.'
    }
  ];

  return (
    <section className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/20">
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#00BFFF]/5 to-transparent blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Title info */}
        <div className="lg:col-span-5 flex flex-col justify-start items-start">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Support</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-display font-black leading-tight uppercase text-white tracking-tight">
            Frequently Asked <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm mt-6 max-w-sm">
            Everything you need to know about our collaboration, process, and creative timelines.
          </p>
        </div>

        {/* Right Column: FAQ Accordion deck */}
        <div className="lg:col-span-7 flex flex-col border-t border-[#1B3B2B]/40">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="border-b border-[#1B3B2B]/40 py-6 transition-all duration-300"
              >
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex justify-between items-center cursor-pointer group"
                >
                  <h4 className={`text-base md:text-lg font-display font-semibold transition-all ${
                    isOpen ? 'text-[#00BFFF]' : 'text-white hover:text-[#00BFFF]'
                  }`}>
                    {faq.q}
                  </h4>
                  <button className="w-8 h-8 rounded-full border border-[#1B3B2B] hover:border-[#00BFFF] flex items-center justify-center text-white hover:text-[#00BFFF] transition-all">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Collapsible FAQ details */}
                {isOpen && (
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
