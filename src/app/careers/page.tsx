"use client";

import { Zap, Sparkles, Target } from 'lucide-react';

export default function CareersPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <h4 className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">Join The Collective</h4>
        <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-20">
          Shape the <br />Extraordinary
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Zap, label: "Fast Paced" },
            { icon: Sparkles, label: "Luxury DNA" },
            { icon: Target, label: "Precision Work" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center text-center">
               <item.icon className="text-blue-500 mb-6" size={40} />
               <h3 className="font-black uppercase tracking-widest text-xs">{item.label}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] text-center">
           <h3 className="text-2xl font-bold uppercase mb-4">No Open Roles?</h3>
           <p className="text-gray-400 mb-8 max-w-md mx-auto">We are always looking for visionary curators, designers, and engineers.</p>
           <button className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] border-b border-blue-400/30 pb-2 hover:text-white hover:border-white transition-all">
             Send a speculative application
           </button>
        </div>
      </div>
    </main>
  );
}