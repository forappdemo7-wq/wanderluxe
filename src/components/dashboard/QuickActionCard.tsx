"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function QuickActionCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[32px] p-10 overflow-hidden h-full flex flex-col"
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Sparkle Icon */}
      <div className="inline-flex items-center gap-2 text-blue-400 mb-6">
        <Sparkles size={22} />
        <span className="uppercase text-xs font-black tracking-[0.125em]">Limited Time</span>
      </div>

      {/* Content */}
      <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-4">
        Last-minute<br />Getaway?
      </h3>

      <p className="text-zinc-400 text-[15px] leading-relaxed max-w-[280px] mb-10">
        Book any suite this weekend and enjoy 
        <span className="text-white font-semibold"> 15% off</span> + complimentary spa credit.
      </p>

      {/* CTA Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="mt-auto group/btn flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm w-fit hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl shadow-blue-950/50"
      >
        Explore Weekend Deals
        <ArrowRight 
          size={18} 
          className="group-hover/btn:translate-x-1 transition-transform" 
        />
      </motion.button>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}