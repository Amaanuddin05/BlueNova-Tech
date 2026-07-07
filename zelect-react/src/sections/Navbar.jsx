import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Monitor scroll height to transition styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP slide-down load animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.1 }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <div ref={navRef} className="fixed top-0 left-0 w-full z-[1000] transition-all duration-300">
      
      {/* Background fixed lines indicator */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-5">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-4 border-l border-r border-[#1B3B2B]">
          <div className="border-r border-[#1B3B2B] h-full"></div>
          <div className="border-r border-[#1B3B2B] h-full"></div>
          <div className="border-r border-[#1B3B2B] h-full"></div>
        </div>
      </div>

      <nav className={`w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#081C15]/90 backdrop-blur-xl py-4 border-b border-[#1B3B2B]/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent py-7 border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group relative z-[1001]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00BFFF] to-[#4CC9F0] flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.4)]">
              <span className="text-black font-extrabold text-lg font-display">O</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white group-hover:text-[#00BFFF] transition-colors duration-300">
              Olyyx
            </span>
          </a>

          {/* Centered Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1.5 bg-[#0B1F18]/50 border border-[#1B3B2B]/50 rounded-full px-2.5 py-1.5 backdrop-blur-md">
            <li>
              <a href="#" className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors group">
                Home
                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#" className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors group">
                About
                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#" className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors group">
                Works
                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#" className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors group">
                Services
                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#" className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors group">
                Blogs
                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
          </ul>

          {/* Right Action Elements */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart Icon Button */}
            <button className="relative flex items-center justify-center p-3 rounded-full border border-[#1B3B2B]/60 hover:border-[#00BFFF]/80 text-white hover:text-[#00BFFF] bg-[#0B1F18]/40 hover:bg-[#0E241D] transition-all duration-300 group cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00BFFF] text-black font-extrabold text-[9px] flex items-center justify-center shadow-[0_0_8px_rgba(0,191,255,0.5)]">
                0
              </span>
            </button>

            {/* Custom Interactive Button (Olyyx style) */}
            <a 
              href="#" 
              className="relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#0B1F18] border border-[#1B3B2B] hover:border-[#00BFFF]/50 overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              {/* Slide text effect container */}
              <div className="relative h-4 overflow-hidden flex flex-col items-center">
                <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full text-[#ffffff]">
                  Start A Project
                </span>
                <span className="absolute top-0 left-0 transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-[#00BFFF]">
                  Start A Project
                </span>
              </div>
              
              {/* Arrow Slide motion */}
              <div className="relative w-4 h-4 overflow-hidden">
                <ArrowRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:-translate-y-full text-[#ffffff]" />
                <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-[#00BFFF]" />
              </div>
              
              <div className="absolute inset-0 bg-[#00BFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile Hamburguer Toggler */}
          <button 
            onClick={toggleMenu} 
            className="lg:hidden p-2 text-white hover:text-[#00BFFF] transition-colors relative z-[1001]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#081C15]/98 z-[999] lg:hidden flex flex-col justify-between p-10 pt-32 border-t border-[#1B3B2B]/40 animate-in fade-in duration-300">
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            <a href="#" className="font-display font-semibold text-3xl text-white hover:text-[#00BFFF] transition-colors duration-300">Home</a>
            <a href="#" className="font-display font-semibold text-3xl text-white hover:text-[#00BFFF] transition-colors duration-300">About</a>
            <a href="#" className="font-display font-semibold text-3xl text-white hover:text-[#00BFFF] transition-colors duration-300">Works</a>
            <a href="#" className="font-display font-semibold text-3xl text-white hover:text-[#00BFFF] transition-colors duration-300">Services</a>
            <a href="#" className="font-display font-semibold text-3xl text-white hover:text-[#00BFFF] transition-colors duration-300">Blogs</a>
          </div>

          {/* Drawer Actions */}
          <div className="flex flex-col gap-4 mt-auto">
            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-[#1B3B2B] text-white bg-[#0B1F18]">
              <ShoppingBag className="w-5 h-5" /> View Cart (0)
            </button>
            <a href="#" className="w-full text-center py-4 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0] text-black font-extrabold shadow-[0_0_20px_rgba(0,191,255,0.4)]">
              Start A Project
            </a>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all duration-300" aria-label="Dribbble">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-2c3.486 0 6.516-1.749 8.358-4.417-.384-.876-1.529-2.096-3.808-2.617-.678 1.839-1.584 3.535-2.671 4.965 2.879-.31 5.129-2.08 6.479-2.932zm-3.39 1.109c.89-.968 1.63-2.233 2.181-3.693-3.649-1.042-7.147-.282-8.528.093 1.258 2.052 3.421 3.328 6.347 3.6zm-5.462-5.07c1.353-.404 5.385-1.326 9.387-.044.025-.06.05-.121.074-.182 1.341-3.376 2.036-6.657 2.046-6.708-3.083-1.03-6.529.176-7.854.793-1.769 3.018-3.003 5.485-3.653 6.141zm15.438-2.855c2.327.464 3.738 1.488 4.07 1.8.847-1.815 1.344-3.855 1.344-6.012 0-3.957-1.666-7.51-4.321-9.989-1.056 2.628-2.585 5.539-5.187 8.337 2.215 2.062 3.644 4.544 4.094 5.864zm-5.69-5.594c2.196-2.385 3.533-4.851 4.412-7.16-2.518-1.76-5.59-2.802-8.913-2.802-1.921 0-3.753.351-5.452 1.002.83.214 3.644 1.096 6.309 3.996.671-.059 1.385-.059 2.083 0v.001c.547.047 1.066.126 1.561.238 0 0 0-.001 0-.001-.001.001-.001.001 0 0.001.001 0 .001.001.002.001s.001.001.002.001l-.004-.006c.334.097.666.216.997.359v.002c.002.001.003.001.005.002zm-6.284-3.329c-2.457-2.615-5.013-3.415-5.719-3.565-.632 1.637-.985 3.418-.985 5.282 0 1.954.385 3.812 1.08 5.508.411-.531 1.706-2.569 3.535-5.32 1.047-.456 2.091-.777 3.064-.993-2.42-2.336-4.66-2.822-4.992-2.909v-.003c.001 0 .001 0 .002.001l-.001.002c.005.001.011.002.016.003z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all duration-300" aria-label="Behance">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 14.249h-5.918c-.027.671.218 1.488.948 1.921.614.364 1.341.364 1.933.053.513-.271.802-.756.918-1.22h2.009c-.198 1.258-.967 2.233-2.073 2.76-1.127.535-2.446.505-3.541-.093-1.634-.89-2.368-2.671-2.28-4.47.086-1.782.997-3.385 2.585-4.103 1.478-.669 3.228-.485 4.426.47 1.066.85 1.547 2.193 1.493 3.535h-2.5v1.147zm-11.455-8.249c.801 0 1.597.16 2.227.67 1.109.897 1.353 2.457.734 3.666-.372.729-1.101 1.229-1.897 1.402.933.151 1.761.642 2.176 1.488.583 1.189.378 2.656-.639 3.593-.668.614-1.579.802-2.433.802h-4.713v-11.621h4.545zm7.537 6.249c.027-.614-.213-1.22-.727-1.541-.54-.336-1.233-.336-1.781-.027-.614.348-.847.962-.89 1.568h3.398zm-9.537-4.249h-2.545v2.85h2.545c.671 0 1.228-.403 1.228-1.425s-.557-1.425-1.228-1.425zm.309 4.85h-2.854v3.424h2.854c.783 0 1.396-.531 1.396-1.712s-.613-1.712-1.396-1.712zm11.146-7.85h-6v1h6v-1z"/></svg>
              </a>
            </div>
            <div className="text-center text-xs text-slate-500 mt-4">
              Designed by Flowdevz. Inspired by Olyyx.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
