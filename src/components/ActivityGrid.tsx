import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Users, Award, Calendar, ExternalLink, Trophy } from "lucide-react";

function ActivityCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card flex flex-col gap-4 group"
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border-brand-blue/20">
          <Users size={18} className="text-brand-blue" />
        </div>
        {item.period && (
          <span className="text-[9px] font-mono text-white/30 tracking-widest">{item.period}</span>
        )}
      </div>

      <div>
        <h4 className="text-white font-bold leading-tight mb-1">{item.role}</h4>
        <p className="text-brand-blue text-[10px] font-black uppercase tracking-[0.2em]">{item.org}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[9px] font-mono text-white/20 uppercase">
          <Calendar size={10} /> Certified
        </span>
        <ExternalLink size={12} className="text-white/10 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  );
}

export default function ActivityGrid() {
  const { data } = usePortfolio();

  return (
    <section id="activities" className="py-24 px-10 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-purple mb-2 block">Cocurricular</span>
            <h2 className="text-5xl font-black tracking-tighter text-white mb-8 leading-none">Leadership <br/> & Impact.</h2>
            <p className="text-white/40 text-sm leading-relaxed font-light mb-8">
              Leadership isn't just about management; it's about architecting human systems that scale. 
              My university initiatives focus on technical excellence and cultural preservation.
            </p>
            <div className="flex items-center gap-4 p-6 glass rounded-2xl border-brand-purple/20">
              <Trophy className="text-brand-purple" size={32} />
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest">Active Influence</p>
                <p className="text-[10px] text-white/40">Liaison & Development Strategy</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.leadership.map((item: any, i: number) => (
              <ActivityCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Cocurricular Highlights / Achievements */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-start-2 md:col-span-3 flex flex-wrap gap-4">
             {data.certifications.slice(3).map((cert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="px-6 py-4 glass !bg-white/[0.03] rounded-2xl border-white/5 hover:border-brand-purple/30 transition-all flex items-center gap-3 cursor-default"
                >
                  <Award size={16} className="text-brand-purple" />
                  <span className="text-[10px] font-bold text-white/60 tracking-tight">{cert}</span>
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
