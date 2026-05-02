import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import SecurityAuditor from "./SecurityAuditor";

export default function SkillSection() {
  const { data } = usePortfolio();
  const categories = [
    { name: "Core Security", skills: data.skills.cybersecurity, color: 'text-brand-blue', bg: 'bg-brand-blue/5' },
    { name: "Engineering", skills: data.skills.development, color: 'text-brand-purple', bg: 'bg-brand-purple/5' },
    { name: "Languages", skills: data.skills.programming, color: 'text-white/80', bg: 'bg-white/5' },
    { name: "Architecture", skills: data.skills.databases, color: 'text-white/80', bg: 'bg-white/5' },
    { name: "Strategy", skills: data.skills.soft, color: 'text-white/80', bg: 'bg-white/5' },
  ];

  return (
    <section id="skills" className="py-24 px-10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-1/3">
            <span className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-2 block">Foundations</span>
            <h2 className="text-5xl font-black tracking-tighter text-white mb-8 leading-none">Technical <br/> Stack.</h2>
            <p className="text-white/60 leading-relaxed font-light mb-12">
              My engineering philosophy revolves around Zero-Trust architecture and defensive programming. 
              Every system I build is hardened from the ground up, combining standard security protocols with modern AI processing.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-4">Credentials</h4>
              {data.certifications.slice(0, 4).map((cert) => (
                <motion.div 
                  key={cert} 
                  whileHover={{ x: 10 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/5 text-[11px] text-white/50 font-mono italic hover:text-white hover:border-white/20 transition-all cursor-default"
                >
                  {cert}
                </motion.div>
              ))}
            </div>

            <SecurityAuditor />
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
            {categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card flex flex-col gap-6 group border-white/5 hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-black text-[11px] uppercase tracking-[0.2em] ${category.color}`}>
                    {category.name}
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:animate-pulse transition-all" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span 
                      key={skill} 
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="text-white/70 bg-white/5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/5 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
