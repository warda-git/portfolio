import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { chatWithResume } from "../lib/gemini";
import { usePortfolio } from "../context/PortfolioContext";

export default function AIChatbot() {
  const { data } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: `Hello. I am ${data.name.split(' ')[0]}'s proprietary AI agent. How can I assist your inquiry today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    const aiResponse = await chatWithResume(userMessage, messages, data);
    setMessages(prev => [...prev, { role: "model", text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 glass p-4 rounded-2xl shadow-2xl flex items-center gap-3 group border-brand-blue/20"
      >
        <div className="relative">
          <MessageSquare size={24} className="text-brand-blue" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-purple rounded-full animate-ping" />
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black text-xs uppercase tracking-widest whitespace-nowrap">
          Agent Terminal
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] sm:w-[400px] h-[550px] bg-bg-deep/95 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border-brand-blue/30">
                  <Sparkles size={20} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xs uppercase tracking-widest">{data.name.split(' ')[0]}_AI_v1</h3>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    Online • Auth Established
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-white/20 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-white/5 border-white/10 text-white/40" : "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"}`}>
                      {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user" ? "bg-brand-blue text-white rounded-tr-none font-medium" : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-blue/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-brand-blue/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-brand-blue/40 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="flex gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10 focus-within:border-brand-blue/50 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Inquire about architecture..."
                  className="flex-1 bg-transparent border-none outline-none text-xs px-4 text-white placeholder:text-white/20 font-medium"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center rounded-xl hover:bg-brand-blue/80 transition-all shadow-lg shadow-brand-blue/20"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-4 text-[9px] text-white/20 text-center font-mono uppercase tracking-tighter">
                Gemini Multi-Modal Engine Enabled
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
