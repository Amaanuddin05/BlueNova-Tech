import { ArrowUpRight } from 'lucide-react';

export default function Blogs() {
  const posts = [
    {
      date: 'June 28, 2026',
      title: 'Top 10 Django Patterns Every Developer Should Know',
      desc: 'Learn the architectural patterns that senior engineers use daily to build robust, scalable server side systems.',
      category: 'Development',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
    },
    {
      date: 'June 22, 2026',
      title: 'Designing Enterprise Dashboards: A Complete Guide',
      desc: 'How to design data-rich dashboards that are both beautiful and functional for complex B2B SaaS products.',
      category: 'Design',
      img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80'
    },
    {
      date: 'June 15, 2026',
      title: 'How to Ace Your First Technical Tech Interview',
      desc: 'Tips from our placement team on cracking competitive coding interviews at global software firms.',
      category: 'Careers',
      img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-[#1B3B2B]/20">
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#38BDF8]/5 to-transparent blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3B2B] bg-[#0B1F18]/80 text-[#00BFFF] mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Resources</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-black leading-none uppercase text-white tracking-tight">
              Latest from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#4CC9F0]">the blog</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm">
            Insights, tutorials, and career advice from our expert engineering and design teams.
          </p>
        </div>

        {/* Blogs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-3xl overflow-hidden border border-[#1B3B2B]/50 transition-all duration-300 hover:border-[#00BFFF]/40 hover:-translate-y-2 group shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,191,255,0.1)] flex flex-col h-full"
            >
              {/* Media image container */}
              <div className="aspect-[16/9] overflow-hidden relative border-b border-[#1B3B2B]/40">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#081C15] border border-[#1B3B2B] rounded-full text-[10px] text-[#00BFFF] font-bold">
                  {post.category}
                </span>
              </div>

              {/* Text content details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-400 font-semibold">{post.date}</span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00BFFF] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1B3B2B]/20 flex items-center gap-1 text-xs text-[#00BFFF] font-bold">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
