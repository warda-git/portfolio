import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import SkillSection from "./components/SkillSection";
import About from "./components/About";
import ActivityGrid from "./components/ActivityGrid";
import AIChatbot from "./components/AIChatbot";
import AdminPanel from "./components/AdminPanel";
import { PortfolioProvider } from "./context/PortfolioContext";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PortfolioProvider>
      <main className="relative min-h-screen bg-bg-deep flex">
        {/* Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[100] origin-left"
          style={{ scaleX }}
        />

        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Background Ambient Glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

        <Navbar />
        
        <div className="flex-1 ml-20">
          <header className="px-10 py-8 flex justify-between items-center sticky top-0 bg-bg-deep/80 backdrop-blur-sm z-40 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] tracking-widest uppercase border border-white/10 font-bold">
                Available for hire
              </span>
              <span className="text-xs text-white/40 font-mono tracking-tighter">Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-tighter font-bold">Cybersecurity Architect</p>
                <p className="text-[10px] font-mono text-brand-blue">v3.1.0_STABLE</p>
              </div>
              <a 
                href="#contact" 
                className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-lg shadow-white/5"
              >
                Contact Me
              </a>
            </div>
          </header>

          <Hero />
          <ProjectGrid />
          <SkillSection />
          <ActivityGrid />
          <About />
          
          {/* Footer */}
          <footer className="p-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 opacity-40">
            <div className="flex gap-10 text-[10px] font-mono tracking-widest mb-4 sm:mb-0">
              <span>LAT: 33.7294° N</span>
              <span>LON: 73.0497° E</span>
              <span className="hidden md:inline">SEC_LEVEL: CEH_FOUNDATION</span>
            </div>
            <div className="text-[10px] font-mono">
              &copy; {new Date().getFullYear()} DESIGNED BY WARDA ASLAM
            </div>
          </footer>
        </div>

        <AIChatbot />
        <AdminPanel />
      </main>
    </PortfolioProvider>
  );
}
