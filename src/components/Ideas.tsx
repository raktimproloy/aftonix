import React from 'react';
import { motion } from 'framer-motion';

export function Ideas() {
  return (
    <section id="ideas" className="py-24 md:py-40 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h2 className="text-[10px] font-mono text-neon-purple tracking-[0.3em] uppercase mb-4">Incubator</h2>
            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6">
              PITCH YOUR <span className="text-neon-pink glow-text-pink">VISION</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-md font-sans leading-relaxed">
              Have a groundbreaking idea for the next big title? Submit your concept to the AFTONIX core. We are actively reviewing community pitches. If your idea aligns with our vision, our team will reach out to collaborate.
            </p>

            {/* Idea to Reality Visualizer */}
            <div className="mt-10 md:mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-row items-center gap-4 md:gap-6 justify-between max-w-md">
                
                {/* 1. The Idea (Wireframe/Scanning) */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                    <motion.div 
                       className="w-12 h-12 md:w-16 md:h-16 border border-dashed border-neon-purple/50 rounded-lg flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(192,38,211,0.1)]"
                       animate={{ rotate: 360 }}
                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                       <span className="text-neon-purple text-lg md:text-xl font-bold" style={{ transform: "rotate(0deg)" }}>?</span>
                       <motion.div 
                         className="absolute left-0 w-full h-[2px] bg-neon-purple shadow-[0_0_8px_rgba(192,38,211,0.8)]"
                         animate={{ top: ["0%", "100%", "0%"] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                       />
                    </motion.div>
                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 text-center">Raw Idea</span>
                </div>

                {/* 2. Pipeline connection (Particle transfer) */}
                <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden rounded-full min-w-[50px]">
                    <motion.div 
                      className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-neon-cyan to-neon-pink rounded-full"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* 3. The Reality (Solid game core) */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                    <motion.div 
                       className="w-12 h-12 md:w-16 md:h-16 bg-neon-cyan rounded-lg flex items-center justify-center relative"
                       animate={{ 
                         boxShadow: [
                           "0px 0px 15px rgba(34,211,238,0.4)", 
                           "0px 0px 40px rgba(34,211,238,0.8)", 
                           "0px 0px 15px rgba(34,211,238,0.4)"
                         ]
                       }}
                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                       {/* Subtle inner pulse */}
                       <motion.div 
                         className="absolute inset-0 border-2 border-white/50 rounded-lg"
                         animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                       />
                       <span className="text-black font-black uppercase text-xl md:text-2xl leading-none">A</span>
                    </motion.div>
                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neon-cyan font-bold text-center">Reality</span>
                </div>
            </div>

          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Callsign (Name)</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 backdrop-blur-md transition-all font-sans" 
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Frequency (Email)</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 backdrop-blur-md transition-all font-sans" 
                  placeholder="email@domain.com" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Project Title</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 backdrop-blur-md transition-all font-sans" 
                placeholder="Codename..." 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Core Concept & Details</label>
              <textarea 
                rows={5} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 backdrop-blur-md transition-all font-sans resize-none" 
                placeholder="Describe the gameplay loop, mechanics, and why it's unique..." 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all"
            >
              Submit Idea Payload
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
