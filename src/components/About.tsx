import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  ShieldCheck,
  Gamepad2,
  Cpu,
  Users,
  Target,
} from "lucide-react";

export function About() {
  const dragX = useMotionValue(0); // 0 to -600 (3 pages x 200)
  const dragStartX = useRef(0);
  const xOffset = useTransform(dragX, [-200, 0], ["50%", "0%"], { clamp: true });

  // Page 1 (Cover) Mappings
  const rotate1 = useTransform(dragX, [-200, 0], [-180, -35], { clamp: true });
  const z1 = useTransform(dragX, [-100, -99], [10, 40]);
  const overlay1 = useTransform(dragX, [-200, -100, 0], [0, 0.4, 0]);

  // Page 2 Mappings
  const rotate2 = useTransform(dragX, [-400, -200], [-180, -25], {
    clamp: true,
  });
  const z2 = useTransform(dragX, [-300, -299], [15, 35]);
  const overlay2 = useTransform(dragX, [-400, -300, -200], [0, 0.4, 0]);

  // Page 3 Mappings
  const rotate3 = useTransform(dragX, [-600, -400], [-180, -15], {
    clamp: true,
  });
  const z3 = useTransform(dragX, [-500, -499], [20, 30]);
  const overlay3 = useTransform(dragX, [-600, -500, -400], [0, 0.4, 0]);

  // Initial hint animation (snap to slightly open)
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(dragX, -80, { type: "spring", stiffness: 200, damping: 15 }).then(
        () => {
          animate(dragX, 0, { type: "spring", stiffness: 200, damping: 15 });
        },
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [dragX]);

  const handlePanStart = () => {
    dragStartX.current = dragX.get();
  };

  const handlePan = (e: any, info: any) => {
    let offset = info.offset.x;

    // Constrain visual drag so the user can only pull 1 page max per swipe distance
    if (offset < -200) offset = -200 - (-(offset + 200) * 0.1);
    if (offset > 200) offset = 200 + ((offset - 200) * 0.1);

    let newX = dragStartX.current + offset;

    if (newX > 0) {
      newX = newX * 0.2;
    } else if (newX < -600) {
      newX = -600 + (newX + 600) * 0.2;
    }

    dragX.set(newX);
  };

  const handlePanEnd = (e: any, info: any) => {
    const currentX = dragX.get();
    const startX = dragStartX.current;
    const diff = currentX - startX;

    let targetX = startX;

    // Force strictly 1 page swipe at a time
    if (diff < -50 || info.velocity.x < -300) {
      targetX = startX - 200;
    } else if (diff > 50 || info.velocity.x > 300) {
      targetX = startX + 200;
    } else {
      targetX = startX;
    }

    if (targetX > 0) targetX = 0;
    if (targetX < -600) targetX = -600;

    animate(dragX, targetX, { type: "spring", stiffness: 300, damping: 25 });
  };

  const snapToPage = (direction) => {
    const currentX = dragX.get();
    let snapTo = Math.round(currentX / 200) * 200;
    snapTo += direction * 200;
    if (snapTo > 0) snapTo = 0;
    if (snapTo < -600) snapTo = -600;
    animate(dragX, snapTo, { type: "spring", stiffness: 300, damping: 25 });
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent skew-x-12 translate-x-32 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-8 items-center">
          {/* TEXT CONTENT (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[10px] font-mono text-neon-pink tracking-[0.3em] uppercase mb-4">
              Studio Profile
            </h2>
            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6">
              CRAFTING{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                WORLDS
              </span>
            </h3>
            <div className="space-y-6 text-gray-400 text-base md:text-lg font-sans leading-relaxed">
              <p>
                AFTONIX is a vanguard game development studio forged by industry
                veterans. We design digital ecosystems that challenge players,
                inspire alliances, and redefine competitive multiplayer.
              </p>
              <p>
                Our philosophy is simple: gameplay is king. We blend striking
                aesthetics with ultra-tight mechanics to deliver experiences
                that players can't put down, powered by cutting-edge proprietary
                architecture.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-5xl font-black italic tracking-tighter text-white mb-2">
                  10<span className="text-neon-pink">+</span>
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  Titles Released
                </p>
              </div>
              <div>
                <h4 className="text-5xl font-black italic tracking-tighter text-white mb-2">
                  5M<span className="text-neon-cyan">+</span>
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  Active Players
                </p>
              </div>
            </div>
          </motion.div>

          {/* DRAGGABLE DOSSIER (Right Side - Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex w-full h-[550px] relative justify-center items-center perspective-[2000px] mt-0"
          >
            <motion.div 
              className="relative w-[280px] md:w-[320px] h-[380px] md:h-[460px] z-10"
              style={{ x: xOffset }}
            >
              {/* Spine */}
              <div className="absolute top-0 left-[-16px] w-[16px] h-full bg-[#111] rounded-l-xl z-0 border-y border-l border-white/5 shadow-[inset_-4px_0_10px_rgba(0,0,0,0.8)]" />

              {/* Base Back Cover (Inner Right) */}
              <div className="absolute inset-0 bg-[#060606] border border-white/10 rounded-r-2xl shadow-xl z-5 overflow-hidden flex flex-col justify-center p-8 text-center bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)]">
                <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-neon-cyan/20">
                  <Gamepad2 size={20} className="text-neon-cyan" />
                </div>
                <h4 className="text-[10px] text-neon-cyan font-mono uppercase tracking-[0.2em] mb-2">
                  Transmission End
                </h4>
                <h3 className="text-2xl font-black italic text-white uppercase mb-4">
                  Join the Vanguard
                </h3>
                <p className="text-gray-500 text-[10px] font-mono leading-relaxed mb-8">
                  Database review complete. Awaiting active recruit uplink.
                </p>
                <a
                  href="#ideas"
                  className="px-4 py-3 bg-white/5 border border-white/20 text-white rounded font-bold text-[10px] uppercase tracking-widest hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all block w-full relative z-20"
                >
                  Establish Link
                </a>
              </div>

              {/* PAGE 3 */}
              <motion.div
                style={{
                  rotateY: rotate3,
                  zIndex: z3,
                  transformOrigin: "left",
                  transformStyle: "preserve-3d",
                }}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                {/* Front */}
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-r-2xl border border-white/10 [backface-visibility:hidden] overflow-hidden shadow-[2px_0_10px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-neon-pink font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-6">
                      By The Numbers
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-3xl font-black text-white italic tracking-tighter">
                          10+ TITLES
                        </h5>
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                          Shipped Globally
                        </p>
                      </div>
                      <div>
                        <h5 className="text-3xl font-black text-white italic tracking-tighter">
                          5M+ PLAYERS
                        </h5>
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                          Active Community
                        </p>
                      </div>
                      <div>
                        <h5 className="text-3xl font-black text-white italic tracking-tighter text-neon-cyan glow-text">
                          0% LATENCY
                        </h5>
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                          Compromise
                        </p>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    style={{ opacity: overlay3 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 bg-[#080808] rounded-l-2xl border border-white/10 [backface-visibility:hidden] overflow-hidden shadow-[inset_-2px_0_10px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col justify-center"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-neon-cyan/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)] mx-auto">
                    <Users className="text-neon-cyan" size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase text-center italic tracking-tighter mb-2">
                    Avilash Lasker
                  </h3>
                  <p className="text-neon-cyan text-[10px] font-mono uppercase tracking-widest text-center mb-6">
                    Director / Lead Architect
                  </p>
                  <div className="p-4 bg-[#030303] border border-white/5 rounded-lg border-l-2 border-l-neon-pink">
                    <p className="text-gray-400 text-xs italic leading-relaxed">
                      "We engineer digital realities. Our singular focus is
                      hyper-responsive mechanics wrapped in a raw, striking
                      aesthetic."
                    </p>
                  </div>
                  <motion.div
                    style={{ opacity: overlay3 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* PAGE 2 */}
              <motion.div
                style={{
                  rotateY: rotate2,
                  zIndex: z2,
                  transformOrigin: "left",
                  transformStyle: "preserve-3d",
                }}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-r-2xl border border-white/10 [backface-visibility:hidden] overflow-hidden shadow-[4px_0_10px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col">
                  <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-6">
                    Studio Profile
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                    We don't follow trends. We architect the future of
                    competitive multiplayer. AFTONIX exists to push the
                    boundaries of real-time server response and visual fidelity.
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Every hit, every movement, every frame is optimized for
                    maximum impact.
                  </p>
                  <div className="mt-auto h-24 bg-white/5 rounded-lg border border-white/5 relative overflow-hidden flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <Cpu size={40} className="text-neon-pink" />
                    </div>
                    {/* Fake chart */}
                    <div className="w-full flex items-end gap-1 px-2 h-12">
                      {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80].map((h, i) => (
                        <div
                          key={i}
                          className="bg-neon-cyan/50 flex-1 rounded-t-sm"
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    style={{ opacity: overlay2 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-[#080808] rounded-l-2xl border border-white/10 [backface-visibility:hidden] overflow-hidden shadow-[inset_-4px_0_10px_rgba(0,0,0,0.8)] p-6 md:p-8"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <h4 className="text-neon-pink font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-6">
                    Proprietary Tech
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-[#030303] border border-white/5 rounded relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1 h-full bg-neon-cyan"></div>
                      <p className="text-white text-xs font-bold uppercase mb-1">
                        Core Engine v3.2
                      </p>
                      <p className="text-gray-500 text-[10px] font-mono">
                        Custom physics & rendering pipeline.
                      </p>
                    </div>
                    <div className="p-3 bg-[#030303] border border-white/5 rounded relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1 h-full bg-neon-purple"></div>
                      <p className="text-white text-xs font-bold uppercase mb-1">
                        Net-Code Z
                      </p>
                      <p className="text-gray-500 text-[10px] font-mono">
                        Sub-10ms server tick rollback.
                      </p>
                    </div>
                  </div>
                  <motion.div
                    style={{ opacity: overlay2 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* PAGE 1 (Cover) */}
              <motion.div
                style={{
                  rotateY: rotate1,
                  zIndex: z1,
                  transformOrigin: "left",
                  transformStyle: "preserve-3d",
                }}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                {/* Front Cover */}
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-r-2xl border-y border-white/10 border-r-[6px] border-r-[#222] shadow-[8px_0_20px_rgba(0,0,0,0.8)] [backface-visibility:hidden] flex flex-col items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.05)_0%,transparent_70%)]"></div>
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] relative z-10">
                    <span className="text-white font-black text-2xl">A</span>
                  </div>
                  <h3 className="text-white font-black italic tracking-tighter uppercase text-3xl md:text-4xl text-center relative z-10 leading-none">
                    Classified
                    <br />
                    Dossier
                  </h3>

                  <div className="mt-12 flex flex-col items-center gap-2 relative z-10">
                    <span className="text-[10px] font-mono text-neon-pink uppercase tracking-widest flex items-center gap-2 border border-neon-pink/30 px-3 py-1.5 rounded-full bg-neon-pink/5 shadow-[0_0_10px_rgba(217,70,239,0.1)]">
                      <ChevronLeft size={14} className="animate-pulse" /> Swipe
                      to Open
                    </span>
                  </div>
                  <motion.div
                    style={{ opacity: overlay1 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>

                {/* Back Cover (Inside Left) */}
                <div
                  className="absolute inset-0 bg-[#080808] rounded-l-2xl border-y border-white/10 border-l-[6px] border-l-[#111] shadow-[inset_-8px_0_20px_rgba(0,0,0,0.8)] [backface-visibility:hidden] p-6 md:p-8 flex flex-col"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="flex-1 border border-dashed border-white/10 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden bg-[#030303]">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    <h4 className="text-neon-pink font-mono text-[10px] uppercase tracking-[0.2em] relative z-10 text-center">
                      Security Scan
                    </h4>

                    <div className="relative z-10 text-center my-auto">
                      <div className="w-20 h-20 mx-auto border-4 border-white/5 rounded-full flex items-center justify-center mb-4 relative drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <motion.div
                          className="absolute inset-0 border-t-2 border-neon-cyan rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <ShieldCheck className="text-neon-cyan" size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 text-[10px] font-mono text-gray-500 uppercase w-full">
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span>Status:</span>{" "}
                        <span className="text-neon-cyan font-bold">
                          Verified
                        </span>
                      </p>
                      <p className="flex justify-between pt-2">
                        <span>Clearance:</span>{" "}
                        <span className="text-white font-bold">Level 4</span>
                      </p>
                    </div>
                  </div>
                  <motion.div
                    style={{ opacity: overlay1 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Invisible Pan Surface that spans both left and right sides of the open book */}
              <motion.div
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
                className="absolute inset-y-0 left-[-100%] right-0 w-[200%] h-full z-50 cursor-grab active:cursor-grabbing opacity-0 touch-pan-y"
              />

              {/* Page Navigation Controls (Below book, accessible click layer) */}
              <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex items-center gap-6 z-60 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                <button
                  onClick={() => snapToPage(-1)}
                  className="text-gray-500 hover:text-neon-cyan transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold">
                  Pages
                </span>
                <button
                  onClick={() => snapToPage(1)}
                  className="text-gray-500 hover:text-neon-pink transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
          {/* MOBILE DOSSIER VER. (Simple Stack for screens < lg) */}
          <div className="flex lg:hidden flex-col gap-6 mt-12">
            {/* Card 1: Operation Core */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Target size={120} />
              </div>
              <h4 className="text-neon-cyan font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-4">
                Operation Core
              </h4>
              <h5 className="text-2xl font-black italic tracking-tighter text-white uppercase mb-4 max-w-[80%] leading-tight">
                DOMINATE THE LADDER
              </h5>
              <p className="text-gray-400 text-xs font-sans leading-relaxed mb-4">
                We believe in skill-based matchmaking, zero-latency servers, and
                anti-cheat engines that act before the exploit occurs. Players
                trust our arenas.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                  Secure
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                  Global
                </span>
              </div>
            </div>

            {/* Card 2: Visual Engine */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Cpu size={120} />
              </div>
              <h4 className="text-neon-purple font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-4">
                Visual Engine
              </h4>
              <h5 className="text-2xl font-black italic tracking-tighter text-white uppercase mb-4 max-w-[80%] leading-tight">
                UNREAL FIDELITY
              </h5>
              <p className="text-gray-400 text-xs font-sans leading-relaxed mb-4">
                We harness the bleeding edge of render technology. No compromises on frame rates. We build bespoke engine modifications to ensure breathtaking environments.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-1 text-neon-purple rounded">
                  UE5 Custom
                </span>
              </div>
            </div>

            {/* Card 3: Metrics */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h4 className="text-neon-pink font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-6">
                By The Numbers
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-2xl font-black text-white italic tracking-tighter">
                    10+ TITLES
                  </h5>
                  <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                    Shipped Globally
                  </p>
                </div>
                <div>
                  <h5 className="text-2xl font-black text-white italic tracking-tighter">
                    5M+ PLAYERS
                  </h5>
                  <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                    Active Community
                  </p>
                </div>
                <div>
                  <h5 className="text-2xl font-black text-white italic tracking-tighter text-neon-cyan">
                    0% LATENCY
                  </h5>
                  <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                    Compromise
                  </p>
                </div>
              </div>
            </div>
            
            <a
              href="#ideas"
              className="px-4 py-3 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded font-bold text-xs uppercase tracking-widest hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all text-center mt-2 w-full"
            >
              Establish Link
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
