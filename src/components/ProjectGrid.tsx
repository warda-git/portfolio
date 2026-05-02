import { motion } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

type Project = any;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isGithub = project.link?.includes('github.com');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card group"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue">
          {project.category}
        </span>
        <div className="flex gap-4">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white transition-colors">
              {isGithub ? <Github size={18} /> : <ExternalLink size={18} />}
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
      <p className="text-sm text-white/40 italic mb-4">{project.subtitle}</p>
      
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-3 pt-6 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-brand-blue w-12 uppercase tracking-tighter">Stack</span>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a 
        href={project.link || "#"} 
        target="_blank" 
        rel="noreferrer"
        className="mt-8 flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all"
      >
        Deep Dive <ArrowUpRight size={14} />
      </a>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const { data } = usePortfolio();
  return (
    <section id="projects" className="py-24 px-10">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-2 block">Archive</span>
            <h2 className="text-5xl font-black tracking-tighter text-white">Selected Works.</h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs font-light">
            A curation of systems designed for security, scalability, and impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project: any, i: number) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
