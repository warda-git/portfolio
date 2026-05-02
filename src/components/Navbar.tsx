import { motion } from "motion/react";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#skills" },
    { name: "About", href: "#about" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/5 bg-bg-deep/80 backdrop-blur-3xl flex flex-col items-center py-10 z-50">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-12 h-12 glass border-brand-blue/30 rounded-2xl flex items-center justify-center font-black text-xs text-brand-blue mb-16 shadow-2xl shadow-brand-blue/10"
      >
        W_A
      </motion.div>
      
      <nav className="flex flex-col gap-12 text-[9px] uppercase tracking-[0.3em] font-black">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="rotate-90 origin-center whitespace-nowrap cursor-pointer text-white/30 hover:text-brand-blue hover:scale-110 transition-all py-10 relative group"
          >
            {item.name}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <div className="w-1 h-1 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
        </div>
        <div className="h-20 w-px bg-gradient-to-b from-brand-blue/50 to-transparent" />
      </div>
    </aside>
  );
}
