import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { CyberMascot } from "./CyberMascot";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* 3D Canvas Background */}
      <div className="absolute top-0 right-0 w-full h-full lg:w-[55%] z-0 opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={1}
            color="#d946ef"
          />
          <Suspense fallback={null}>
            <CyberMascot />
            <Environment preset="night" />
            <ContactShadows
              position={[0, -3.5, 0]}
              opacity={0.4}
              scale={20}
              blur={2}
              far={4}
              color="#c026d3"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-md w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest text-neon-cyan font-bold">
              Now Live: Project Catalyst
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-white mb-6 mt-4">
            FORGING <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px white" }}
            >
              REALITIES
            </span>
            <br />
            <span className="text-neon-cyan shadow-neon-cyan glow-text text-4xl sm:text-6xl md:text-8xl">
              MULTIPLAYER
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
            We build immersive, high-octane multiplayer worlds. Enter the nexus
            and experience a new dimension of competitive gameplay.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
            <a
              href="#showcase"
              className="w-full sm:w-auto px-8 py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all relative z-10 flex items-center justify-center cursor-pointer"
            >
              Explore Games
            </a>

            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-black uppercase tracking-tighter rounded-sm hover:bg-white/10 transition-all relative z-10 flex items-center justify-center cursor-pointer"
            >
              Who We Are
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50 hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
