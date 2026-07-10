"use client";

import { Zap, Wind, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JetsPage() {
  const jets = [
    {
      label: "Global 7500",
      range: "7,700 nm",
      speed: "Mach 0.925",
      description: "The longest-range business jet in the world with ultimate cabin flexibility.",
      color: "from-blue-400 to-cyan-300",
    },
    {
      label: "Gulfstream G700",
      range: "7,500 nm",
      speed: "Mach 0.925",
      description: "The new flagship of ultra-long-range travel featuring panoramic windows.",
      color: "from-violet-400 to-purple-300",
    },
    {
      label: "Citation Longitude",
      range: "3,500 nm",
      speed: "Mach 0.84",
      description: "Exceptional performance and revolutionary quietness in the midsize class.",
      color: "from-amber-400 to-orange-300",
    },
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-32 px-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Ambient background effects - lowered opacity to prevent washing out text */}
      <div className="absolute top-1/4 -left-40 w-[800px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[700px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Title */}
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[8rem] lg:text-[9.5rem] font-black uppercase tracking-[-0.04em] leading-[0.85] mb-8"
          >
            Beyond <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_10px_10px_rgba(56,189,248,0.2)]">
              The Clouds
            </span>
          </motion.h1>

          <p className="max-w-md text-xl text-white/60 font-light tracking-wide leading-relaxed">
            Ultra-long-range private jets that redefine what’s possible in the sky.
          </p>
        </div>

        {/* Jets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {jets.map((jet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${jet.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-bold tracking-tight text-white">{jet.label}</h3>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <p className="text-white/50 mb-12 leading-relaxed min-h-[60px]">
                  {jet.description}
                </p>

                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <Wind className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] uppercase tracking-[2px] text-white/40 font-bold">Max Range</span>
                    </div>
                    <span className="text-xl font-semibold tabular-nums text-white/90">{jet.range}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] uppercase tracking-[2px] text-white/40 font-bold">Max Speed</span>
                    </div>
                    <span className="text-xl font-semibold tabular-nums text-white/90">{jet.speed}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] uppercase tracking-[2px] text-white/40 font-bold">Safety</span>
                    </div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Class Leading</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="mt-24 text-center">
          <button className="group relative px-12 py-6 bg-white text-black rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all duration-500 flex items-center gap-4 mx-auto overflow-hidden">
            <span className="relative z-10">Explore the Fleet</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </main>
  );
}