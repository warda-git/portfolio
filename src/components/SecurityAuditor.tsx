import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, ShieldAlert, Zap, Loader2, Code2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SAMPLE_CODE = `// Vulnerable PHP code
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
$result = $conn->query($query);`;

export default function SecurityAuditor() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const runAudit = async () => {
    setIsAuditing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this code for a cyber portfolio. 2 sentences. Why is it bad? How would Warda fix it? Code: ${SAMPLE_CODE}`,
        config: { temperature: 0.4 }
      });
      setReport(response.text || "Audit failed.");
    } catch (e) {
      setReport("SQL Injection vulnerability. Warda would use Prepared Statements and parameterized queries.");
    }
    setIsAuditing(false);
  };

  return (
    <div className="mt-12 glass-card !bg-white/[0.02] border-brand-purple/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="text-brand-purple" size={16} />
          <h4 className="text-white font-black text-[10px] uppercase tracking-widest leading-none">Security Lab</h4>
        </div>
        {!report && (
          <span className="text-[10px] text-white/20 font-mono">READY TO AUDIT</span>
        )}
      </div>
      
      <div className="bg-black/40 p-4 rounded-xl mb-4 font-mono text-[10px] text-zinc-500 border border-white/5 overflow-x-auto whitespace-pre">
        <code>{SAMPLE_CODE}</code>
      </div>

      {!report ? (
        <button 
          onClick={runAudit}
          disabled={isAuditing}
          className="w-full py-3 bg-brand-purple/10 text-brand-purple text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-brand-purple/20 flex items-center justify-center gap-2 hover:bg-brand-purple hover:text-white transition-all"
        >
          {isAuditing ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
          Initialize AI Audit
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2 text-red-400 font-black text-[10px] uppercase tracking-widest">
            <ShieldAlert size={12} /> Threat Detected
          </div>
          <p className="text-xs text-white/60 leading-relaxed italic">
            "{report}"
          </p>
          <button 
            onClick={() => setReport(null)}
            className="mt-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-tighter transition-colors"
          >
            Reset Auditor
          </button>
        </motion.div>
      )}
    </div>
  );
}
