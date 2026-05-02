import { motion } from "motion/react";
import { Mail, Linkedin, MapPin, Github } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function About() {
  const { data } = usePortfolio();
  return (
    <section id="about" className="py-24 px-10 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-2 block">Story</span>
            <h2 className="text-5xl font-black tracking-tighter text-white uppercase">About {data.name.split(' ')[0]}.</h2>
            <div className="space-y-6 text-white/60 leading-relaxed text-lg font-light mt-8">
              <p>
                Currently pursuing {data.education[0].degree} at {data.education[0].institution}, I focus on building 
                resilient systems that bridge the gap between high-level application logic and 
                low-level security protocols.
              </p>
              <p>
                My experience leading initiatives like {data.leadership[0].role} has honed my ability to architect not just systems, but strategies for growth 
                and impact.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/5">
                <div>
                  <h4 className="text-brand-blue font-bold text-sm uppercase tracking-tighter mb-2">Education</h4>
                  <p className="text-sm font-medium">{data.education[0].degree}</p>
                  <p className="text-[10px] uppercase opacity-40 truncate">{data.education[0].institution}</p>
                </div>
                <div>
                  <h4 className="text-brand-purple font-bold text-sm uppercase tracking-tighter mb-2">Philosophy</h4>
                  <p className="text-sm font-medium">Zero-Trust</p>
                  <p className="text-[10px] uppercase opacity-40">Privacy First</p>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="lg:w-1/2">
            <div className="glass-card !bg-white/[0.02] border-brand-blue/10">
              <h3 className="text-2xl font-bold text-white mb-8">Establish Connection</h3>
              <div className="space-y-6 mb-12">
                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <Mail size={20} className="text-white/40 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest block mb-1">Secure Mail</span>
                    <span className="text-white font-medium group-hover:text-brand-blue transition-colors tracking-tight">{data.contact.email}</span>
                  </div>
                </a>
                <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-all">
                    <Linkedin size={20} className="text-white/40 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest block mb-1">Network</span>
                    <span className="text-white font-medium group-hover:text-brand-purple transition-colors truncate max-w-[200px]">warda-aslam</span>
                  </div>
                </a>
                {data.contact.github && (
                  <a href={data.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Github size={20} className="text-white/40 group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest block mb-1">Source Control</span>
                      <span className="text-white font-medium group-hover:text-brand-blue transition-colors truncate max-w-[200px]">warda-git</span>
                    </div>
                  </a>
                )}
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center">
                    <MapPin size={20} className="text-white/40" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest block mb-1">Base</span>
                    <span className="text-white font-medium">{data.location}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-white/5">
                Download PDF Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
