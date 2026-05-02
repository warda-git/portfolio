import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Save, RotateCcw, X, Edit3 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { RESUME_DATA } from "../constants";

export default function AdminPanel() {
  const { data, updateData, setEditMode, isEditMode } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [tempData, setTempData] = useState(JSON.stringify(data, null, 2));

  useEffect(() => {
    setTempData(JSON.stringify(data, null, 2));
  }, [data]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(tempData);
      updateData(parsed);
      setIsOpen(false);
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  const handleReset = () => {
    if (confirm("Reset to default?")) {
      updateData(RESUME_DATA);
      localStorage.removeItem("portfolio_data");
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-8 z-[60] flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditMode(!isEditMode)}
          className={`p-4 rounded-2xl shadow-2xl transition-all border ${isEditMode ? 'bg-brand-blue text-white' : 'glass text-white/40 border-white/10'}`}
          title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        >
          <Edit3 size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-4 glass rounded-2xl shadow-2xl text-white/40 hover:text-white border-white/10 transition-all"
          title="Data Settings"
        >
          <Settings size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-y-0 left-0 w-full sm:w-[500px] bg-bg-deep/95 backdrop-blur-2xl border-r border-white/10 z-[70] flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-widest">Live Editor</h3>
                <p className="text-[10px] text-white/20 font-mono uppercase mt-1">Modify Portfolio Schema</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-6">
              <textarea
                value={tempData}
                onChange={(e) => setTempData(e.target.value)}
                className="w-full h-full bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-brand-blue outline-none focus:border-brand-blue/50 transition-all spellcheck-false"
                spellCheck={false}
              />
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5 grid grid-cols-2 gap-4">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white/40 hover:text-white rounded-xl border border-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <RotateCcw size={14} /> Reset
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 py-4 bg-brand-blue text-white rounded-xl shadow-lg shadow-brand-blue/20 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <Save size={14} /> Commit Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
