import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function Showcase() {
  const targetRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="showcase" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-mono text-neon-cyan tracking-[0.3em] uppercase mb-4">Classified Project Database</h2>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white mb-6">
            QUANTUM <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>BREACH</span>
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center lg:perspective-[2000px]">
          {/* DESKTOP 3D EFFECT */}
          <motion.div 
            ref={targetRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative hidden lg:block w-full aspect-video rounded-3xl group"
          >
            {/* The Background Layer */}
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-white/5 transition-all duration-300 group-hover:border-neon-cyan/30"
              style={{ transform: "translateZ(0px)" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
                alt="Quantum Breach" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
            </div>

            {/* The Floating Content Layer */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-16 text-center pointer-events-none"
              style={{ transform: "translateZ(80px)" }}
            >
               <div className="pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-3xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-[#0a0a0a]/90 hover:border-white/20 shadow-2xl">
                 <div className="flex items-center justify-center gap-3 mb-6">
                   <div className="h-[1px] w-8 bg-neon-pink"></div>
                   <span className="text-[10px] font-mono text-neon-pink uppercase tracking-[0.3em]">Project Overview</span>
                   <div className="h-[1px] w-8 bg-neon-pink"></div>
                 </div>
                 <p className="text-gray-300 text-base md:text-xl leading-relaxed font-sans mb-10">
                   A massive co-op tactical shooter set in a fractured digital dimension. Experience zero-gravity combat, seamless world-shifting mechanics, and ultra-responsive gunplay that pushes the boundaries of competitive multiplayer.
                 </p>
                 <div className="flex flex-wrap items-center justify-center gap-4">
                   <button className="px-8 py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">
                     View Trailer
                   </button>
                   <button className="px-8 py-4 border border-white/20 bg-white/5 text-white font-black uppercase tracking-tighter rounded-sm hover:bg-white/10 transition-all">
                     Join Playtest
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* MOBILE / TABLET SIMPLE VIEW */}
          <div className="flex lg:hidden flex-col w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
            <div className="relative w-full h-[250px] sm:h-[350px]">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
                alt="Quantum Breach" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent"></div>
            </div>
            <div className="p-6 sm:p-10 text-center relative z-10 -mt-20">
               <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
                 <div className="flex items-center justify-center gap-3 mb-4">
                   <div className="h-[1px] w-6 bg-neon-pink flex-1"></div>
                   <span className="text-[10px] font-mono text-neon-pink uppercase tracking-[0.2em] whitespace-nowrap">Project Overview</span>
                   <div className="h-[1px] w-6 bg-neon-pink flex-1"></div>
                 </div>
                 <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans mb-8">
                   A massive co-op tactical shooter set in a fractured digital dimension. Experience zero-gravity combat, seamless world-shifting mechanics, and ultra-responsive gunplay that pushes the boundaries of competitive multiplayer.
                 </p>
                 <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3">
                   <button className="px-6 py-3 sm:py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                     View Trailer
                   </button>
                   <button className="px-6 py-3 sm:py-4 border border-white/20 bg-white/5 text-white font-black uppercase tracking-tighter rounded-sm hover:bg-white/10 transition-all">
                     Join Playtest
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
