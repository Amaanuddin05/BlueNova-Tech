import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/40">
      
      {/* Background radial glowing mesh */}
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#00BFFF]/5 to-transparent blur-[120px] pointer-events-none z-0"></div>

      {/* Main Olyyx-style Hero CTA Banner (Start A Project) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20 border-b border-[#1B3B2B]/40 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          <div className="max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#00BFFF] font-extrabold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-ping"></span>
              Ready to scale?
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black leading-none uppercase text-white tracking-tight">
              Let's create <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">something great</span>
            </h2>
          </div>

          <a 
            href="#" 
            className="relative inline-flex items-center gap-4 px-10 py-6 rounded-full font-bold text-sm uppercase tracking-wider text-black bg-[#00BFFF] hover:bg-[#38BDF8] overflow-hidden group shadow-[0_10px_35px_rgba(0,191,255,0.4)] transition-all duration-300"
          >
            <div className="relative h-4 overflow-hidden flex flex-col items-center">
              <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full text-black">
                Start A Project
              </span>
              <span className="absolute top-0 left-0 transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-black">
                Get In Touch
              </span>
            </div>
            
            <div className="relative w-4 h-4 overflow-hidden">
              <ArrowRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:-translate-y-full text-black" />
              <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-black" />
            </div>
          </a>

        </div>
      </div>

      {/* Multi-Column Links Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00BFFF] to-[#4CC9F0] flex items-center justify-center">
              <span className="text-black font-extrabold text-lg font-display">O</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              Olyyx
            </span>
          </a>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
            Olyyx is a creative agency turning visionary ideas into high-impact digital experiences through strategic design and tech.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all" aria-label="Twitter">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[#1B3B2B] flex items-center justify-center text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all" aria-label="GitHub">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Pages */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400 mb-6">Pages</h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blogs</a></li>
          </ul>
        </div>

        {/* Column 3: Utility */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400 mb-6">Utility</h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Faqs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Style Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelogs</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400 mb-6">Newsletter</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Subscribe to get latest design metrics and insights directly in your inbox.
          </p>
          <form className="flex flex-col gap-2.5">
            <input 
              type="email" 
              placeholder="your@email.com" 
              required
              className="px-4 py-3 rounded-full border border-[#1B3B2B] bg-[#0B1F18] text-white placeholder-slate-500 text-xs focus:border-[#00BFFF] focus:outline-none transition-colors"
            />
            <button 
              type="submit" 
              className="px-4 py-3 rounded-full bg-[#0E241D] hover:bg-[#00BFFF] hover:text-black text-white text-xs font-bold transition-all border border-[#1B3B2B]"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom copyright banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-8 border-t border-[#1B3B2B]/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 relative z-10">
        <div>&copy; 2026 Olyyx Technologies. All Rights Reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
}
