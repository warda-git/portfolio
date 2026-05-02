import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
  const { data } = usePortfolio();
  const nameParts = data.name.split(' ');
  const firstName = nameParts[0] || "WARDA";
  const lastName = nameParts.slice(1).join(' ') || "ASLAM.";

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center px-10 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-[1.5]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.9]">
                {firstName} <br />
                <span className="text-gradient uppercase">{lastName}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl mb-12 leading-relaxed font-light">
                {data.summary}
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href="#projects" 
                  className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-blue hover:text-white transition-all shadow-2xl shadow-brand-blue/20"
                >
                  View Archive
                </a>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-4 glass text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 group transition-all"
                >
                  Download PDF
                  <div className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative group">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="glass border border-white/20 p-12 rounded-[50px] relative overflow-hidden backdrop-blur-3xl"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-brand-purple animate-pulse rounded-full"></div>
                <span className="text-[10px] uppercase tracking-widest font-black text-brand-purple">Core Architecture</span>
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Secure_Ecosystems</h3>
              <p className="text-white/40 text-[13px] leading-relaxed mb-10 font-mono">
                {">"} INITIALIZING_THREAT_DETECTION... <br/>
                {">"} AI_MODEL: GEMINI_FLASH_2.0 <br/>
                {">"} SYSTEM_STATUS: HARDENED
              </p>
              <div className="flex flex-wrap gap-2">
                {['Security', 'Intelligence'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] uppercase font-bold tracking-widest text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
