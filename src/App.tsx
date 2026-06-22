import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, MessageSquare, Github } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { Ideas } from './components/Ideas';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Simulate heavy 3D asset loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative w-48 sm:w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-8">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              />
            </div>
            <h1 className="font-display text-lg sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white animate-pulse text-center px-4">
              Initializing AFTONIX
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#050505] min-h-screen selection:bg-neon-cyan/30 selection:text-white relative overflow-hidden font-sans">
        {/* Ambient Gradients - Frosted Glass specific */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-neon-pink/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 w-full h-full flex flex-col">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Showcase />
            <Ideas />
          </main>
          
          {/* Footer */}
          <footer className="py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                © {new Date().getFullYear()} AFTONIX. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-neon-pink transition-colors" aria-label="Discord">
                  <MessageSquare size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
